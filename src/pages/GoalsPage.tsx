import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layouts/Layout';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/db/supabase';
import { toast } from 'sonner';
import { Plus, Trash2, Target } from 'lucide-react';

export default function GoalsPage() {
  const { user } = useAuth();
  const [goals, setGoals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    target_date: '',
  });

  useEffect(() => {
    if (user) loadGoals();
  }, [user]);

  // ✅ LOAD GOALS
  const loadGoals = async () => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setGoals(data || []);
    } catch (err) {
      toast.error('Failed to load goals');
    } finally {
      setLoading(false);
    }
  };

  // ✅ CREATE GOAL (FIXED)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data: { user: authUser }, error: userError } =
        await supabase.auth.getUser();

      if (userError || !authUser) {
        toast.error('User not logged in');
        return;
      }

      const { error } = await supabase.from('goals').insert([
        {
          user_id: authUser.id,
          title: formData.title,
          description: formData.description || null,
          category: formData.category,
          target_date: formData.target_date || null,
          progress: 0,
          status: 'active',
        },
      ]);

      if (error) {
        console.log(error);
        toast.error(error.message || 'Failed to create goal');
        return;
      }

      toast.success('Goal created successfully');
      setDialogOpen(false);

      setFormData({
        title: '',
        description: '',
        category: '',
        target_date: '',
      });

      loadGoals();
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong');
    }
  };

  // ✅ UPDATE PROGRESS
  const updateProgress = async (id: string, progress: number) => {
    const status = progress >= 100 ? 'completed' : 'active';

    const { error } = await supabase
      .from('goals')
      .update({ progress, status })
      .eq('id', id);

    if (error) {
      toast.error('Failed to update');
      return;
    }

    loadGoals();
  };

  // ✅ DELETE
  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', id);

    if (error) {
      toast.error('Failed to delete');
      return;
    }

    toast.success('Deleted');
    loadGoals();
  };

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-10">Loading goals...</div>
      </Layout>
    );
  }

  const activeGoals = goals.filter(g => g.status === 'active');
  const completedGoals = goals.filter(g => g.status === 'completed');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">

        {/* HEADER */}
        <div className="flex justify-between mb-6">
          <h1 className="text-3xl font-bold">Goals</h1>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Goal
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Goal</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4">

                <Input
                  placeholder="Title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />

                <Input
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                />

                <Textarea
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />

                <Input
                  type="date"
                  value={formData.target_date}
                  onChange={(e) =>
                    setFormData({ ...formData, target_date: e.target.value })
                  }
                />

                <Button type="submit" className="w-full">
                  Create
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* EMPTY */}
        {goals.length === 0 ? (
          <Card3D className="text-center py-10">
            <Target className="mx-auto mb-3" />
            No goals yet
          </Card3D>
        ) : (
          <div className="space-y-6">

            {/* ACTIVE */}
            {activeGoals.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-3">Active</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {activeGoals.map((goal) => (
                    <Card3D key={goal.id} className="space-y-3">

                      <div className="flex justify-between">
                        <h3>{goal.title}</h3>

                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => handleDelete(goal.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <p className="text-sm text-gray-500">
                        {goal.category}
                      </p>

                      <Progress value={goal.progress} />

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() =>
                            updateProgress(goal.id, Math.max(0, goal.progress - 10))
                          }
                        >
                          -10%
                        </Button>

                        <Button
                          size="sm"
                          onClick={() =>
                            updateProgress(goal.id, Math.min(100, goal.progress + 10))
                          }
                        >
                          +10%
                        </Button>

                        <Button
                          size="sm"
                          onClick={() => updateProgress(goal.id, 100)}
                        >
                          Done
                        </Button>
                      </div>
                    </Card3D>
                  ))}
                </div>
              </div>
            )}

            {/* COMPLETED */}
            {completedGoals.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-3">Completed</h2>

                <div className="grid md:grid-cols-2 gap-4">
                  {completedGoals.map((goal) => (
                    <Card3D key={goal.id} className="opacity-70">

                      <h3 className="line-through">{goal.title}</h3>

                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDelete(goal.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>

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
