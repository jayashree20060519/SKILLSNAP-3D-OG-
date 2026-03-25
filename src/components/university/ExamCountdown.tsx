import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { examApi } from '@/db/api';
import type { Exam } from '@/types';
import { toast } from 'sonner';
import { Plus, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

export function ExamCountdown() {
  const { user } = useAuth();
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    exam_date: '',
    location: '',
    notes: '',
  });

  useEffect(() => {
    if (user) {
      loadExams();
    }
  }, [user]);

  const loadExams = async () => {
    try {
      const data = await examApi.getExams(user!.id);
      setExams(data);
    } catch (error) {
      toast.error('Failed to load exams');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await examApi.createExam({
        user_id: user!.id,
        title: formData.title,
        subject: formData.subject,
        exam_date: formData.exam_date,
        location: formData.location || null,
        notes: formData.notes || null,
      });
      toast.success('Exam added successfully');
      setDialogOpen(false);
      setFormData({ title: '', subject: '', exam_date: '', location: '', notes: '' });
      loadExams();
    } catch (error) {
      toast.error('Failed to add exam');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await examApi.deleteExam(id);
      toast.success('Exam deleted');
      loadExams();
    } catch (error) {
      toast.error('Failed to delete exam');
    }
  };

  const getDaysUntil = (examDate: string) => {
    return differenceInDays(new Date(examDate), new Date());
  };

  if (loading) {
    return <div className="text-center py-8">Loading exams...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Exam Countdown</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Exam
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Exam</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Exam Title</Label>
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
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="exam_date">Exam Date & Time</Label>
                <Input
                  id="exam_date"
                  type="datetime-local"
                  value={formData.exam_date}
                  onChange={(e) => setFormData({ ...formData, exam_date: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">Add Exam</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {exams.length === 0 ? (
        <Card3D hover={false} className="text-center py-12">
          <p className="text-muted-foreground">No upcoming exams. Add one to start tracking!</p>
        </Card3D>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exams.map((exam) => {
            const daysUntil = getDaysUntil(exam.exam_date);
            return (
              <Card3D key={exam.id} hover={false} className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{exam.title}</h3>
                    <p className="text-sm text-muted-foreground">{exam.subject}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(exam.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarIcon className="h-4 w-4" />
                  {format(new Date(exam.exam_date), 'MMM dd, yyyy HH:mm')}
                </div>
                {exam.location && (
                  <p className="text-sm text-muted-foreground">📍 {exam.location}</p>
                )}
                <div className={`text-center py-3 rounded-lg ${
                  daysUntil < 0 ? 'bg-muted' : daysUntil <= 7 ? 'bg-destructive/10' : 'bg-primary/10'
                }`}>
                  <p className="text-2xl font-bold">
                    {daysUntil < 0 ? 'Past' : daysUntil === 0 ? 'Today!' : `${daysUntil} days`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {daysUntil < 0 ? 'Exam completed' : 'until exam'}
                  </p>
                </div>
                {exam.notes && (
                  <p className="text-sm text-muted-foreground border-t border-border pt-2">
                    {exam.notes}
                  </p>
                )}
              </Card3D>
            );
          })}
        </div>
      )}
    </div>
  );
}
