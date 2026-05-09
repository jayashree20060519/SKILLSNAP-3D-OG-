import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/db/supabase';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

type Assignment = {
  id: string;
  title: string;
  description: string | null;
  subject: string;
  due_date: string;
  status: string;
  priority: string;
};

export function AssignmentTracker() {
  const { user } = useAuth();

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    subject: '',
    due_date: '',
    priority: 'medium',
  });

  // ✅ LOAD DATA SAFELY
  useEffect(() => {
    if (!user?.id) return;
    fetchAssignments();
  }, [user]);

  const fetchAssignments = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('assignments')
      .select('*')
      .eq('user_id', user!.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.log(error);
      toast.error('Failed to load assignments');
    } else {
      setAssignments(data || []);
    }

    setLoading(false);
  };

  // ✅ CREATE FIXED (MAIN FIX HERE 🔥)
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error('User not found');
      return;
    }

    const { error } = await supabase.from('assignments').insert([
      {
        user_id: user.id,
        title: form.title,
        description: form.description || '',
        subject: form.subject,
        due_date: new Date(form.due_date).toISOString(), // 🔥 FIX
        status: 'pending',
        priority: form.priority,
      },
    ]);

    if (error) {
      console.log('CREATE ERROR:', error);
      toast.error(error.message || 'Create failed');
      return;
    }

    toast.success('Assignment created ✔');
    setOpen(false);

    setForm({
      title: '',
      description: '',
      subject: '',
      due_date: '',
      priority: 'medium',
    });

    fetchAssignments();
  };

  // ✅ DELETE FIXED
  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('assignments')
      .delete()
      .eq('id', id);

    if (error) {
      console.log(error);
      toast.error('Delete failed');
      return;
    }

    toast.success('Deleted ✔');
    fetchAssignments();
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Assignments</h2>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Assignment</DialogTitle>
            </DialogHeader>

            <form onSubmit={handleCreate} className="space-y-3">

              <Input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
              />

              <Input
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                required
              />

              <Textarea
                placeholder="Description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />

              <Input
                type="datetime-local"
                value={form.due_date}
                onChange={(e) => setForm({ ...form, due_date: e.target.value })}
                required
              />

              <Select
                value={form.priority}
                onValueChange={(value) => setForm({ ...form, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>

              <Button type="submit" className="w-full">
                Create
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* LIST */}
      {assignments.length === 0 ? (
        <Card3D className="p-6 text-center">
          No assignments yet
        </Card3D>
      ) : (
        assignments.map((a) => (
          <Card3D key={a.id} className="p-4 space-y-2">

            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{a.title}</h3>
                <p className="text-sm text-muted-foreground">{a.subject}</p>
              </div>

              <Button variant="ghost" onClick={() => handleDelete(a.id)}>
                <Trash2 size={16} />
              </Button>
            </div>

            {a.description && (
              <p className="text-sm">{a.description}</p>
            )}

            <p className="text-xs text-muted-foreground">
              Due: {format(new Date(a.due_date), 'PPP p')}
            </p>

          </Card3D>
        ))
      )}
    </div>
  );
}
