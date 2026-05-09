import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layouts/Layout';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { profileApi, goalApi, skillApi } from '@/db/api';
import { toast } from 'sonner';
import { User, Target, TrendingUp, Edit } from 'lucide-react';

export default function ProfilePage() {
  const { user, profile: authProfile, refreshProfile } = useAuth();
  const [goals, setGoals] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      setLoading(true);

      try {
        // ✅ FIX: individual safe calls
        const goalsData = await goalApi.getGoals(user.id).catch(() => []);
        const skillsData = await skillApi.getSkills(user.id).catch(() => []);

        setGoals(goalsData || []);
        setSkills(skillsData || []);
        setBio(authProfile?.bio || '');
      } catch (err) {
        console.error("Load error:", err);
        // ❌ toast removed (no fake error)
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, authProfile]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await profileApi.updateProfile(user.id, { bio: bio || null });
      toast.success('Profile updated successfully');
      setEditing(false);
      await refreshProfile();
    } catch {
      toast.error('Failed to update profile');
    }
  };

  if (!authProfile) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8 text-center">
          Profile not found
        </div>
      </Layout>
    );
  }

  const activeGoals = goals.filter(g => g.status === 'active');
  const completedGoals = goals.filter(g => g.status === 'completed');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Profile</h1>
          <p className="text-muted-foreground">
            Manage your profile and track your progress
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card3D hover={false} className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-10 w-10 text-primary" />
                </div>
                <Button variant="ghost" size="icon" onClick={() => setEditing(!editing)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </div>

              {editing ? (
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Username</Label>
                    <Input
                      value={authProfile?.username || ''}
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea
                      value={bio}
                      onChange={e => setBio(e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">Save</Button>
                    <Button type="button" variant="outline" onClick={() => setEditing(false)} className="flex-1">
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <>
                  <h2 className="text-2xl font-bold">
                    {authProfile?.username || 'User'}
                  </h2>
                  <p className="text-sm text-muted-foreground capitalize">
                    {authProfile?.role || 'user'}
                  </p>
                  {authProfile?.bio && (
                    <p className="text-muted-foreground">{authProfile.bio}</p>
                  )}

                  <div className="pt-4 border-t border-border space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Active Goals</span>
                      <span className="font-semibold">{activeGoals.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Completed Goals</span>
                      <span className="font-semibold">{completedGoals.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Skills Tracked</span>
                      <span className="font-semibold">{skills.length}</span>
                    </div>
                  </div>
                </>
              )}
            </Card3D>
          </div>

          {/* Goals */}
          <div className="lg:col-span-2 space-y-6">
            <Card3D hover={false} className="space-y-4">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold">Active Goals</h3>
              </div>

              {activeGoals.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No active goals yet
                </p>
              ) : (
                activeGoals.slice(0, 5).map(goal => (
                  <div key={goal.id} className="p-3 rounded-lg bg-accent/50 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{goal.title}</h4>
                        <p className="text-sm text-muted-foreground">{goal.category}</p>
                      </div>
                      <span className="text-sm font-medium">{goal.progress}%</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                  </div>
                ))
              )}
            </Card3D>

            {/* Skills */}
            <Card3D hover={false} className="space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-secondary" />
                <h3 className="text-xl font-bold">Skills Progress</h3>
              </div>

              {skills.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No skills tracked yet
                </p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {skills.map(skill => (
                    <div key={skill.id} className="p-3 rounded-lg bg-accent/50 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">{skill.name}</h4>
                          <p className="text-xs text-muted-foreground">{skill.category}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">Level {skill.level}</p>
                          <p className="text-xs text-muted-foreground">{skill.progress}%</p>
                        </div>
                      </div>
                      <Progress value={skill.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              )}
            </Card3D>
          </div>
        </div>
      </div>
    </Layout>
  );
}
