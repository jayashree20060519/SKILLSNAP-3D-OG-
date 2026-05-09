import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/db/supabase';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

export function ExamCountdown() {
  const { user } = useAuth();

  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState({
    title: '',
    subject: '',
    exam_date: '',
    location: '',
    notes: '',
  });

  // LOAD
  useEffect(() => {
    if (!user?.id) return;
    fetchExams();
  }, [user]);

  const fetchExams = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('exams')
      .select('*')
      .eq('user_id', user!.id)
      .order('exam_date', { ascending: true });

    if (error) {
      console.log(error);
      toast.error('Load failed');
    } else {
      setExams(data || []);
    }

    setLoading(false);
  };

  // CREATE
  const createExam = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error('User missing');
      return;
    }

    const { error } = await supabase.from('exams').insert([
      {
        user_id: user.id,
        title: form.title,
        subject: form.subject,
        exam_date: new Date(form.exam_date).toISOString(),
        location: form.location || null,
        notes: form.notes || null,
      },
    ]);

    if (error) {
      console.log("CREATE ERROR:", error);
      toast.error(error.message || 'Create failed');
      return;
    }

    toast.success('Exam added ✔');
    setOpen(false);

    setForm({
      title: '',
      subject: '',
      exam_date: '',
      location: '',
      notes: '',
    });

    fetchExams();
  };

  // DELETE
  const deleteExam = async (id: string) => {
    const { error } = await supabase
      .from('exams')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Delete failed');
      return;
    }

    toast.success('Deleted ✔');
    fetchExams();
  };

  const getDays = (date: string) =>
    differenceInDays(new Date(date), new Date());

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Exams</h2>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Exam
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Exam</DialogTitle>
            </DialogHeader>

            <form onSubmit={createExam} className="space-y-3">

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

              <Input
                type="datetime-local"
                value={form.exam_date}
                onChange={(e) => setForm({ ...form, exam_date: e.target.value })}
                required
              />

              <Input
                placeholder="Location"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />

              <Textarea
                placeholder="Notes"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />

              <Button type="submit" className="w-full">
                Save
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* LIST */}
      {exams.length === 0 ? (
        <Card3D className="text-center p-8">
          No exams yet
        </Card3D>
      ) : (
        exams.map((e) => {
          const days = getDays(e.exam_date);

          return (
            <Card3D key={e.id} className="p-4 space-y-2">

              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">{e.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {e.subject}
                  </p>
                </div>

                <Button variant="ghost" onClick={() => deleteExam(e.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-sm">
                {format(new Date(e.exam_date), 'PPP p')}
              </p>

              <div className="text-center p-3 bg-muted rounded">
                <p className="font-bold text-xl">
                  {days < 0 ? 'Past' : `${days} days`}
                </p>
              </div>

              {e.notes && (
                <p className="text-sm text-muted-foreground">
                  {e.notes}
                </p>
              )}
            </Card3D>
          );
        })
      )}
    </div>
  );
}
