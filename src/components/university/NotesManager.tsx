import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { noteApi } from '@/db/api';
import type { Note } from '@/types';
import { toast } from 'sonner';
import { Plus, Trash2, Edit, FileText } from 'lucide-react';
import { format } from 'date-fns';

export function NotesManager() {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    subject: '',
    tags: '',
  });

  useEffect(() => {
    if (user) {
      loadNotes();
    }
  }, [user]);

  useEffect(() => {
    if (editingNote) {
      setFormData({
        title: editingNote.title,
        content: editingNote.content,
        subject: editingNote.subject || '',
        tags: editingNote.tags?.join(', ') || '',
      });
      setDialogOpen(true);
    }
  }, [editingNote]);

  const loadNotes = async () => {
    try {
      const data = await noteApi.getNotes(user!.id);
      setNotes(data);
    } catch (error) {
      toast.error('Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tags = formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : null;
      
      if (editingNote) {
        await noteApi.updateNote(editingNote.id, {
          title: formData.title,
          content: formData.content,
          subject: formData.subject || null,
          tags,
        });
        toast.success('Note updated successfully');
      } else {
        await noteApi.createNote({
          user_id: user!.id,
          title: formData.title,
          content: formData.content,
          subject: formData.subject || null,
          tags,
        });
        toast.success('Note created successfully');
      }
      
      setDialogOpen(false);
      setEditingNote(null);
      setFormData({ title: '', content: '', subject: '', tags: '' });
      loadNotes();
    } catch (error) {
      toast.error('Failed to save note');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await noteApi.deleteNote(id);
      toast.success('Note deleted');
      loadNotes();
    } catch (error) {
      toast.error('Failed to delete note');
    }
  };

  const handleDialogClose = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setEditingNote(null);
      setFormData({ title: '', content: '', subject: '', tags: '' });
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading notes...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Notes Manager</h2>
        <Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Note
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingNote ? 'Edit Note' : 'Create New Note'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g., important, exam, review"
                />
              </div>
              <Button type="submit" className="w-full">
                {editingNote ? 'Update Note' : 'Create Note'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {notes.length === 0 ? (
        <Card3D hover={false} className="text-center py-12">
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">No notes yet. Create your first note!</p>
        </Card3D>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <Card3D key={note.id} hover={false} className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{note.title}</h3>
                  {note.subject && (
                    <p className="text-sm text-muted-foreground">{note.subject}</p>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingNote(note)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(note.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {note.content}
              </p>
              {note.tags && note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {note.tags.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Updated: {format(new Date(note.updated_at), 'MMM dd, yyyy')}
              </p>
            </Card3D>
          ))}
        </div>
      )}
    </div>
  );
}
