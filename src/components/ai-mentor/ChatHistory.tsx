import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { History, Search, Trash2, Edit2, Plus, MessageSquare } from 'lucide-react';
import { supabase } from '@/db/supabase';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface ConversationSummary {
  conversation_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  message_count: number;
  first_message: string;
}

interface ChatHistoryProps {
  onLoadConversation: (conversationId: string) => void;
  onNewChat: () => void;
  currentConversationId: string | null;
}

export function ChatHistory({ onLoadConversation, onNewChat, currentConversationId }: ChatHistoryProps) {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<ConversationSummary[]>([]);
  const [filteredConversations, setFilteredConversations] = useState<ConversationSummary[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');

  useEffect(() => {
    if (user) {
      loadConversations();
    }
  }, [user]);

  useEffect(() => {
    // Filter conversations based on search query
    if (searchQuery.trim()) {
      const filtered = conversations.filter(conv =>
        conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.first_message.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredConversations(filtered);
    } else {
      setFilteredConversations(conversations);
    }
  }, [searchQuery, conversations]);

  const loadConversations = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .rpc('get_conversation_summaries', { p_user_id: user.id } as any);

      if (error) throw error;

      setConversations((data as ConversationSummary[]) || []);
      setFilteredConversations((data as ConversationSummary[]) || []);
    } catch (error: any) {
      console.error('Error loading conversations:', error);
      toast.error('Failed to load chat history');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteConversation = async () => {
    if (!conversationToDelete || !user) return;

    try {
      const { error } = await supabase
        .rpc('delete_conversation', {
          p_conversation_id: conversationToDelete,
          p_user_id: user.id
        } as any);

      if (error) throw error;

      toast.success('Conversation deleted');
      loadConversations();

      // If deleted current conversation, start new chat
      if (conversationToDelete === currentConversationId) {
        onNewChat();
      }
    } catch (error: any) {
      console.error('Error deleting conversation:', error);
      toast.error('Failed to delete conversation');
    } finally {
      setDeleteDialogOpen(false);
      setConversationToDelete(null);
    }
  };

  const handleUpdateTitle = async (conversationId: string) => {
    if (!user || !editTitle.trim()) return;

    try {
      const { error } = await supabase
        .rpc('update_conversation_title', {
          p_conversation_id: conversationId,
          p_user_id: user.id,
          p_title: editTitle.trim()
        } as any);

      if (error) throw error;

      toast.success('Title updated');
      loadConversations();
      setEditingId(null);
      setEditTitle('');
    } catch (error: any) {
      console.error('Error updating title:', error);
      toast.error('Failed to update title');
    }
  };

  const startEdit = (conv: ConversationSummary) => {
    setEditingId(conv.conversation_id);
    setEditTitle(conv.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle('');
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm">
            <History className="h-4 w-4 mr-2" />
            History
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 sm:w-96">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Chat History
            </SheetTitle>
          </SheetHeader>

          <div className="mt-6 space-y-4">
            {/* New Chat Button */}
            <Button onClick={onNewChat} className="w-full" variant="default">
              <Plus className="h-4 w-4 mr-2" />
              New Chat
            </Button>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Conversations List */}
            <ScrollArea className="h-[calc(100vh-240px)]">
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading...
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {searchQuery ? 'No conversations found' : 'No previous chats'}
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredConversations.map((conv) => (
                    <div
                      key={conv.conversation_id}
                      className={`p-3 rounded-lg border transition-colors ${
                        currentConversationId === conv.conversation_id
                          ? 'bg-primary/10 border-primary'
                          : 'hover:bg-accent border-border'
                      }`}
                    >
                      {editingId === conv.conversation_id ? (
                        <div className="space-y-2">
                          <Input
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleUpdateTitle(conv.conversation_id);
                              } else if (e.key === 'Escape') {
                                cancelEdit();
                              }
                            }}
                            autoFocus
                          />
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleUpdateTitle(conv.conversation_id)}
                            >
                              Save
                            </Button>
                            <Button size="sm" variant="outline" onClick={cancelEdit}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div
                            className="cursor-pointer"
                            onClick={() => onLoadConversation(conv.conversation_id)}
                          >
                            <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                              {conv.title || 'Untitled Conversation'}
                            </h3>
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                              {conv.first_message}
                            </p>
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="text-xs">
                                {conv.message_count} messages
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {new Date(conv.updated_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-1 mt-2">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => startEdit(conv)}
                              className="h-7 px-2"
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setConversationToDelete(conv.conversation_id);
                                setDeleteDialogOpen(true);
                              }}
                              className="h-7 px-2 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Conversation?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the conversation
              and all its messages.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConversation}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
