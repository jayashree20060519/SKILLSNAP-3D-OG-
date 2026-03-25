import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { assignmentApi } from '@/db/api';
import type { Assignment } from '@/types';
import { toast } from 'sonner';
import { Plus, Trash2, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

export function AssignmentTracker() {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    due_date: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
  });

  useEffect(() => {
    if (user) {
      loadAssignments();
    }
  }, [user]);

  const loadAssignments = async () => {
    try {
      const data = await assignmentApi.getAssignments(user!.id);
      setAssignments(data);
    } catch (error) {
      toast.error('Failed to load assignments');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await assignmentApi.createAssignment({
        user_id: user!.id,
        title: formData.title,
        description: formData.description || null,
        subject: formData.subject,
        due_date: formData.due_date,
        status: 'pending',
        priority: formData.priority,
      });
      toast.success('Assignment created successfully');
      setDialogOpen(false);
      setFormData({ title: '', description: '', subject: '', due_date: '', priority: 'medium' });
      loadAssignments();
    } catch (error) {
      toast.error('Failed to create assignment');
    }
  };

  const handleStatusChange = async (id: string, status: 'pending' | 'in-progress' | 'completed') => {
    try {
      await assignmentApi.updateAssignment(id, { status });
      toast.success('Status updated');
      loadAssignments();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await assignmentApi.deleteAssignment(id);
      toast.success('Assignment deleted');
      loadAssignments();
    } catch (error) {
      toast.error('Failed to delete assignment');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-secondary text-secondary-foreground';
      case 'low': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-primary text-primary-foreground';
      case 'in-progress': return 'bg-secondary text-secondary-foreground';
      case 'pending': return 'bg-muted text-muted-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading assignments...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Assignment Tracker</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Assignment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
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
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="due_date">Due Date</Label>
                <Input
                  id="due_date"
                  type="datetime-local"
                  value={formData.due_date}
                  onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select value={formData.priority} onValueChange={(value: any) => setFormData({ ...formData, priority: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">Create Assignment</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {assignments.length === 0 ? (
        <Card3D hover={false} className="text-center py-12">
          <p className="text-muted-foreground">No assignments yet. Create your first one!</p>
        </Card3D>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assignments.map((assignment) => (
            <Card3D key={assignment.id} hover={false} className="space-y-3">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{assignment.title}</h3>
                  <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                </div>
                <div className="flex gap-2">
                  <Badge className={getPriorityColor(assignment.priority)}>
                    {assignment.priority}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(assignment.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {assignment.description && (
                <p className="text-sm text-muted-foreground">{assignment.description}</p>
              )}
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Due: {format(new Date(assignment.due_date), 'MMM dd, yyyy HH:mm')}
                </p>
                <Select value={assignment.status} onValueChange={(value) => handleStatusChange(assignment.id, value as 'pending' | 'in-progress' | 'completed')}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </Card3D>
          ))}
        </div>
      )}
    </div>
  );
}
