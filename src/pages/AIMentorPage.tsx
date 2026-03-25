import { useState, useRef, useEffect } from 'react';
import { Layout } from '@/components/layouts/Layout';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/db/supabase';
import { toast } from 'sonner';
import { Send, Bot, User, StopCircle, Upload, Image as ImageIcon, FileText, File, Sparkles, Search, Brain, Plus } from 'lucide-react';
import { Streamdown } from 'streamdown';
import { ChatHistory } from '@/components/ai-mentor/ChatHistory';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export default function AIMentorPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadedImageData, setUploadedImageData] = useState<string | null>(null);
  const [currentMode, setCurrentMode] = useState<'normal' | 'create-image' | 'deep-research' | 'thinking'>('normal');
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Save message to database
  const saveMessageToHistory = async (role: 'user' | 'model', content: string) => {
    if (!user) return;

    try {
      // If no current conversation, create new one
      let conversationId = currentConversationId;
      if (!conversationId) {
        conversationId = crypto.randomUUID();
        setCurrentConversationId(conversationId);
      }

      await supabase.from('chat_history').insert({
        user_id: user.id,
        conversation_id: conversationId,
        role,
        message: content,
        has_image: role === 'user' && !!uploadedImageData
      } as any);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  };

  // Load conversation from history
  const loadConversation = async (conversationId: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .eq('conversation_id', conversationId)
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      const loadedMessages: Message[] = (data as any[]).map((msg: any) => ({
        role: msg.role as 'user' | 'model',
        content: msg.message
      }));

      setMessages(loadedMessages);
      setCurrentConversationId(conversationId);
      toast.success('Conversation loaded');
    } catch (error: any) {
      console.error('Error loading conversation:', error);
      toast.error('Failed to load conversation');
    }
  };

  // Start new chat
  const startNewChat = () => {
    setMessages([]);
    setCurrentConversationId(null);
    setUploadedFile(null);
    setUploadedImageData(null);
    setCurrentMode('normal');
    toast.success('Started new chat');
  };

  const stopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setLoading(false);
      toast.info('Response generation stopped');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Unsupported file type. Please upload images, PDFs, or documents.');
      return;
    }

    setUploadedFile(file);
    
    // Convert image to base64 for API
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        // Remove data URL prefix
        const base64Data = base64.split(',')[1];
        setUploadedImageData(base64Data);
        toast.success(`Image "${file.name}" uploaded successfully!`);
        
        // Show options for what to do with the image
        const optionsMessage = `I've uploaded an image. Please analyze what you see in this image and help me understand it.\n\n` +
          `You can also:\n` +
          `• Generate Notes from this\n` +
          `• Create a Summary\n` +
          `• Generate a Quiz\n` +
          `• Explain the concepts shown\n\n` +
          `What would you like me to do?`;
        
        setMessages(prev => [...prev, { role: 'model', content: optionsMessage }]);
      };
      reader.readAsDataURL(file);
    } else {
      toast.success(`File "${file.name}" uploaded successfully!`);
      
      const fileType = file.type === 'application/pdf' ? 'PDF' : 'document';
      const optionsMessage = `I've uploaded a ${fileType}. What would you like me to do with it?\n\n` +
        `Options:\n` +
        `• Generate Notes\n` +
        `• Create Summary\n` +
        `• Create Quiz\n` +
        (file.name.toLowerCase().includes('resume') || file.name.toLowerCase().includes('cv') ? 
          `• Analyze Resume (Score + Suggestions)\n` : '') +
        `\nJust type what you'd like!`;
      
      setMessages(prev => [...prev, { role: 'model', content: optionsMessage }]);
    }
  };

  const handleSpecialAction = (action: 'create-image' | 'deep-research' | 'thinking') => {
    setCurrentMode(action);
    let prompt = '';
    switch (action) {
      case 'create-image':
        prompt = 'I want to create a visual concept. Please describe what you\'d like to visualize (e.g., "software architecture diagram", "data flow visualization", "UX design process"). I\'ll provide a detailed visual description and concept breakdown.';
        break;
      case 'deep-research':
        prompt = 'I\'m ready to do deep research on any topic. What would you like me to research in detail? I\'ll provide comprehensive information with examples, use cases, and real-world applications.';
        break;
      case 'thinking':
        prompt = 'I\'m in thinking mode - I\'ll break down complex problems step-by-step with detailed reasoning. What problem or concept would you like me to analyze?';
        break;
    }
    setMessages(prev => [...prev, { role: 'model', content: prompt }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    // Save user message to history
    await saveMessageToHistory('user', userMessage);

    // Create new AbortController for this request
    abortControllerRef.current = new AbortController();

    try {
      // Build conversation history with image if uploaded
      const conversationHistory = messages.map((msg) => ({
        role: msg.role,
        parts: [{ text: msg.content }],
      }));

      // Add current user message with image if available
      const currentMessageParts: any[] = [{ text: userMessage }];
      
      if (uploadedImageData && uploadedFile) {
        currentMessageParts.push({
          inlineData: {
            mimeType: uploadedFile.type,
            data: uploadedImageData
          }
        });
        // Clear uploaded image after sending
        setUploadedImageData(null);
        setUploadedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      }

      conversationHistory.push({
        role: 'user' as const,
        parts: currentMessageParts,
      });

      // Get the function URL and call it directly with fetch to handle streaming
      const { data: { session } } = await supabase.auth.getSession();
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
      const functionUrl = `${supabaseUrl}/functions/v1/ai-mentor-chat`;
      
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`,
        },
        body: JSON.stringify({ 
          messages: conversationHistory,
          mode: currentMode
        }),
        signal: abortControllerRef.current.signal,
      });

      // Reset mode after sending
      if (currentMode !== 'normal') {
        setCurrentMode('normal');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Check if it's a fallback error (service unavailable)
        if (errorData.fallback) {
          // Provide a helpful fallback response
          const fallbackResponse = `I apologize, but I'm experiencing temporary connectivity issues. However, I can still help you! 

Here's what I can suggest based on your question:

${userMessage.toLowerCase().includes('resume') ? 
  '**Resume Tips:**\n- Use clear, concise language\n- Highlight achievements with numbers\n- Tailor to each job application\n- Keep it to 1-2 pages\n- Use action verbs' :
  userMessage.toLowerCase().includes('code') || userMessage.toLowerCase().includes('programming') ?
  '**Coding Best Practices:**\n- Write clean, readable code\n- Use meaningful variable names\n- Comment complex logic\n- Test your code thoroughly\n- Follow coding standards' :
  userMessage.toLowerCase().includes('career') ?
  '**Career Advice:**\n- Build a strong portfolio\n- Network with professionals\n- Keep learning new skills\n- Seek mentorship\n- Stay updated with industry trends' :
  '**General Learning Tips:**\n- Break down complex topics\n- Practice regularly\n- Learn by doing projects\n- Teach others to reinforce learning\n- Stay consistent'
}

Would you like more specific guidance on any of these points?`;

          setMessages((prev) => [...prev, { role: 'model', content: fallbackResponse }]);
          setLoading(false);
          return;
        }
        
        throw new Error(errorData.error || 'Service temporarily unavailable. Please try again later.');
      }

      if (!response.body) {
        throw new Error('No response stream available');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';

      setMessages((prev) => [...prev, { role: 'model', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const jsonData = JSON.parse(line.slice(6));
              const text = jsonData.candidates?.[0]?.content?.parts?.[0]?.text;
              if (text) {
                accumulatedText += text;
                setMessages((prev) => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1].content = accumulatedText;
                  return newMessages;
                });
              }
            } catch (e) {
              // Ignore parsing errors for incomplete chunks
            }
          }
        }
      }
      
      // Save AI response to history
      const finalMessages = messages;
      if (finalMessages.length > 0) {
        const lastMessage = finalMessages[finalMessages.length - 1];
        if (lastMessage.role === 'model' && lastMessage.content) {
          await saveMessageToHistory('model', lastMessage.content);
        }
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      // Don't show error if user aborted
      if (error.name === 'AbortError') {
        return;
      }
      
      // Provide helpful fallback response instead of error
      const fallbackResponse = `I'm having trouble connecting right now, but I'm here to help! 

Based on your question, here are some quick tips:

• **For coding questions**: Break down the problem, write pseudocode first, then implement
• **For career advice**: Focus on building skills, networking, and creating a strong portfolio
• **For study help**: Use active learning techniques, practice regularly, and teach others

Please try asking your question again, or rephrase it for better results. I'm here to help! 🚀`;

      setMessages((prev) => {
        const newMessages = [...prev];
        if (newMessages[newMessages.length - 1].role === 'model' && !newMessages[newMessages.length - 1].content) {
          newMessages[newMessages.length - 1].content = fallbackResponse;
        } else {
          newMessages.push({ role: 'model', content: fallbackResponse });
        }
        return newMessages;
      });
      
      // Save fallback response to history
      await saveMessageToHistory('model', fallbackResponse);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">AI Mentor Chat</h1>
            <p className="text-muted-foreground">
              Get instant help with coding, career advice, and study planning
            </p>
          </div>
          <div className="flex gap-2">
            <ChatHistory
              onLoadConversation={loadConversation}
              onNewChat={startNewChat}
              currentConversationId={currentConversationId}
            />
            <Button onClick={startNewChat} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Chat
            </Button>
          </div>
        </div>

        <Card3D hover={false} className="flex flex-col h-[600px]">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <Bot className="h-16 w-16 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">Welcome to AI Mentor!</h3>
                <p className="text-muted-foreground mb-4">
                  Ask me anything about coding, career planning, or study tips.
                </p>
                
                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2 justify-center mt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSpecialAction('create-image')}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Create Image
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSpecialAction('deep-research')}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Deep Research
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleSpecialAction('thinking')}
                  >
                    <Brain className="h-4 w-4 mr-2" />
                    Thinking Mode
                  </Button>
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'model' && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-accent text-accent-foreground'
                    }`}
                  >
                    {message.role === 'model' ? (
                      <Streamdown>{message.content}</Streamdown>
                    ) : (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <User className="h-5 w-5 text-secondary" />
                    </div>
                  )}
                </div>
              ))
            )}
            {loading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="bg-accent text-accent-foreground rounded-2xl px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-100" />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Uploaded File Display */}
            {uploadedFile && (
              <div className="flex items-center gap-2 p-2 bg-accent rounded-lg">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-sm flex-1 truncate">{uploadedFile.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setUploadedFile(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                >
                  ✕
                </Button>
              </div>
            )}
            
            {/* Action Buttons Row */}
            <div className="flex gap-2 flex-wrap">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleSpecialAction('create-image')}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Create Image
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleSpecialAction('deep-research')}
              >
                <Search className="h-4 w-4 mr-2" />
                Deep Research
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleSpecialAction('thinking')}
              >
                <Brain className="h-4 w-4 mr-2" />
                Thinking Mode
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything... (e.g., 'Explain React hooks', 'Career advice for data analyst', 'Help with my resume')"
                className="resize-none"
                rows={2}
                disabled={loading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <div className="flex flex-col gap-2">
                <Button type="submit" size="icon" disabled={loading || !input.trim()} className="h-auto">
                  <Send className="h-5 w-5" />
                </Button>
                {loading && (
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    onClick={stopGeneration}
                    className="h-auto"
                    title="Stop generation"
                  >
                    <StopCircle className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground">
              💡 Tip: Upload images, PDFs, or documents for analysis. Ask for notes, summaries, quizzes, or resume reviews!
            </p>
          </form>
        </Card3D>
      </div>
    </Layout>
  );
}
