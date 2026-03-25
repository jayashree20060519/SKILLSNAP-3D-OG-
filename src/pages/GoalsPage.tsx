import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layouts/Layout';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { goalApi } from '@/db/api';
import type { Goal } from '@/types';
import { toast } from 'sonner';
import { Plus, Trash2, Target } from 'lucide-react';

export default function GoalsPage() {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    target_date: '',
    progress: '0',
  });

  useEffect(() => {
    if (user) {
      loadGoals();
    }
  }, [user]);

  const loadGoals = async () => {
    try {
      const data = await goalApi.getGoals(user!.id);
      setGoals(data);
    } catch (error) {
      toast.error('Failed to load goals');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await goalApi.createGoal({
        user_id: user!.id,
        title: formData.title,
        description: formData.description || null,
        category: formData.category,
        target_date: formData.target_date || null,
        progress: parseInt(formData.progress),
        status: 'active',
      });
      toast.success('Goal created successfully');
      setDialogOpen(false);
      setFormData({ title: '', description: '', category: '', target_date: '', progress: '0' });
      loadGoals();
    } catch (error) {
      toast.error('Failed to create goal');
    }
  };

  const handleProgressUpdate = async (id: string, progress: number) => {
    try {
      const status = progress >= 100 ? 'completed' : 'active';
      await goalApi.updateGoal(id, { progress, status });
      toast.success('Progress updated');
      loadGoals();
    } catch (error) {
      toast.error('Failed to update progress');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await goalApi.deleteGoal(id);
      toast.success('Goal deleted');
      loadGoals();
    } catch (error) {
      toast.error('Failed to delete goal');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-8">Loading goals...</div>
        </div>
      </Layout>
    );
  }

  const activeGoals = goals.filter(g => g.status === 'active');
  const completedGoals = goals.filter(g => g.status === 'completed');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Daily Goals</h1>
          <p className="text-muted-foreground">Set and track your daily objectives</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">{activeGoals.length}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-secondary">{completedGoals.length}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Goal</DialogTitle>
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
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Study, Exercise, Project"
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
                  <Label htmlFor="target_date">Target Date</Label>
                  <Input
                    id="target_date"
                    type="date"
                    value={formData.target_date}
                    onChange={(e) => setFormData({ ...formData, target_date: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full">Create Goal</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {goals.length === 0 ? (
          <Card3D hover={false} className="text-center py-12">
            <Target className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No goals yet. Create your first goal!</p>
          </Card3D>
        ) : (
          <div className="space-y-6">
            {activeGoals.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Active Goals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeGoals.map((goal) => (
                    <Card3D key={goal.id} hover={false} className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{goal.title}</h3>
                          <p className="text-sm text-muted-foreground">{goal.category}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(goal.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      {goal.description && (
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                      )}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span className="font-medium">{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} className="h-2" />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleProgressUpdate(goal.id, Math.max(0, goal.progress - 10))}
                          >
                            -10%
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleProgressUpdate(goal.id, Math.min(100, goal.progress + 10))}
                          >
                            +10%
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => handleProgressUpdate(goal.id, 100)}
                          >
                            Complete
                          </Button>
                        </div>
                      </div>
                    </Card3D>
                  ))}
                </div>
              </div>
            )}

            {completedGoals.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Completed Goals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {completedGoals.map((goal) => (
                    <Card3D key={goal.id} hover={false} className="space-y-3 opacity-75">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg line-through">{goal.title}</h3>
                          <p className="text-sm text-muted-foreground">{goal.category}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(goal.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <Target className="h-4 w-4" />
                        <span>Completed!</span>
                      </div>
                    </Card3D>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
