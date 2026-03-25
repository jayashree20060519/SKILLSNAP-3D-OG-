import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layouts/Layout';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { skillApi } from '@/db/api';
import type { Skill } from '@/types';
import { toast } from 'sonner';
import { Plus, Trash2, TrendingUp } from 'lucide-react';

export default function SkillsPage() {
  const { user } = useAuth();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    level: '1',
    progress: '0',
  });

  useEffect(() => {
    if (user) {
      loadSkills();
    }
  }, [user]);

  const loadSkills = async () => {
    try {
      const data = await skillApi.getSkills(user!.id);
      setSkills(data);
    } catch (error) {
      toast.error('Failed to load skills');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await skillApi.createSkill({
        user_id: user!.id,
        name: formData.name,
        category: formData.category,
        level: parseInt(formData.level),
        progress: parseInt(formData.progress),
      });
      toast.success('Skill added successfully');
      setDialogOpen(false);
      setFormData({ name: '', category: '', level: '1', progress: '0' });
      loadSkills();
    } catch (error) {
      toast.error('Failed to add skill');
    }
  };

  const handleProgressUpdate = async (id: string, progress: number) => {
    try {
      await skillApi.updateSkill(id, { progress });
      toast.success('Progress updated');
      loadSkills();
    } catch (error) {
      toast.error('Failed to update progress');
    }
  };

  const handleLevelUp = async (id: string, currentLevel: number) => {
    try {
      const newLevel = Math.min(5, currentLevel + 1);
      await skillApi.updateSkill(id, { level: newLevel, progress: 0 });
      toast.success('Level up! 🎉');
      loadSkills();
    } catch (error) {
      toast.error('Failed to level up');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await skillApi.deleteSkill(id);
      toast.success('Skill deleted');
      loadSkills();
    } catch (error) {
      toast.error('Failed to delete skill');
    }
  };

  const groupByCategory = () => {
    const grouped: { [key: string]: Skill[] } = {};
    skills.forEach((skill) => {
      if (!grouped[skill.category]) {
        grouped[skill.category] = [];
      }
      grouped[skill.category].push(skill);
    });
    return grouped;
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-8">Loading skills...</div>
        </div>
      </Layout>
    );
  }

  const groupedSkills = groupByCategory();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Skill Progress Tracker</h1>
          <p className="text-muted-foreground">Monitor your skill development journey</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">{skills.length}</p>
            <p className="text-sm text-muted-foreground">Skills Tracked</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Skill
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Skill</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Skill Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Python Programming"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Programming, Design, Language"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="level">Current Level (1-5)</Label>
                  <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 - Beginner</SelectItem>
                      <SelectItem value="2">2 - Elementary</SelectItem>
                      <SelectItem value="3">3 - Intermediate</SelectItem>
                      <SelectItem value="4">4 - Advanced</SelectItem>
                      <SelectItem value="5">5 - Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="progress">Progress (%)</Label>
                  <Input
                    id="progress"
                    type="number"
                    min="0"
                    max="100"
                    value={formData.progress}
                    onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full">Add Skill</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {skills.length === 0 ? (
          <Card3D hover={false} className="text-center py-12">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No skills tracked yet. Add your first skill!</p>
          </Card3D>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold mb-4">{category}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categorySkills.map((skill) => (
                    <Card3D key={skill.id} hover={false} className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{skill.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            Level {skill.level} / 5
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(skill.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress to next level</span>
                          <span className="font-medium">{skill.progress}%</span>
                        </div>
                        <Progress value={skill.progress} className="h-2" />
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleProgressUpdate(skill.id, Math.max(0, skill.progress - 10))}
                          >
                            -10%
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleProgressUpdate(skill.id, Math.min(100, skill.progress + 10))}
                          >
                            +10%
                          </Button>
                          {skill.level < 5 && (
                            <Button
                              size="sm"
                              className="flex-1"
                              onClick={() => handleLevelUp(skill.id, skill.level)}
                              disabled={skill.progress < 100}
                            >
                              Level Up
                            </Button>
                          )}
                        </div>
                      </div>

                      {skill.level === 5 && skill.progress === 100 && (
                        <div className="text-center py-2 rounded-lg bg-primary/10 text-primary font-semibold">
                          🏆 Master Level Achieved!
                        </div>
                      )}
                    </Card3D>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
