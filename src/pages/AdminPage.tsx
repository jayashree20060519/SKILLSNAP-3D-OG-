import { useState, useEffect } from 'react';
import { Layout } from '@/components/layouts/Layout';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Activity, 
  TrendingUp, 
  BarChart3,
  UserCheck,
  Calendar,
  Shield,
  RefreshCw
} from 'lucide-react';
import { supabase } from '@/db/supabase';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function AdminPage() {
  const { profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [analytics, setAnalytics] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [activityData, setActivityData] = useState<any[]>([]);
  const [userGrowthData, setUserGrowthData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = profile?.role?.trim()?.toLowerCase() === 'admin';

  // ✅ FIXED AUTH CHECK
  useEffect(() => {
    if (authLoading || !profile) return;

    if (!isAdmin) {
      toast.error('Access denied');
      navigate('/dashboard');
      return;
    }

    loadAdminData();
  }, [profile, authLoading]);

  // 🔥 LOAD DATA
  const loadAdminData = async () => {
    setLoading(true);
    try {
      // Users
      const { data: usersData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      setUsers(usersData || []);

      // Activity breakdown
      const { data: activity } = await supabase
        .from('user_activity')
        .select('activity_type');

      if (activity) {
        const counts: any = {};
        activity.forEach((a: any) => {
          counts[a.activity_type] = (counts[a.activity_type] || 0) + 1;
        });

        setActivityData(
          Object.entries(counts).map(([k, v]) => ({
            activity_type: k,
            count: v
          }))
        );
      }

      // Growth
      const growth = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);

        const { count } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        growth.push({
          date: date.toLocaleDateString(),
          users: count || 0
        });
      }

      setUserGrowthData(growth);

    } catch (err) {
      toast.error('Load failed');
    } finally {
      setLoading(false);
    }
  };

  // 🔥 ROLE CHANGE
  const handleRoleChange = async (user: any) => {
    try {
      const newRole = user.role === 'admin' ? 'user' : 'admin';

      await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', user.id);

      toast.success('Role updated');
      loadAdminData();
    } catch {
      toast.error('Role update failed');
    }
  };

  // 🔥 DELETE USER
  const handleDeleteUser = async (id: string) => {
    if (!confirm('Delete user?')) return;

    try {
      await supabase
        .from('profiles')
        .delete()
        .eq('id', id);

      toast.success('User deleted');
      loadAdminData();
    } catch {
      toast.error('Delete failed');
    }
  };

  if (authLoading || loading || !profile) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-96">
          <RefreshCw className="animate-spin" />
        </div>
      </Layout>
    );
  }

  if (!isAdmin) return null;

  return (
    <Layout>
      <div className="container mx-auto p-6">

        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Shield /> Admin Dashboard
        </h1>

        {/* USERS TABLE */}
        <Card3D hover={false}>
          <h2 className="text-xl font-bold mb-4">Users</h2>

          <table className="w-full">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.username}</td>
                  <td>{u.email}</td>
                  <td>
                    <Badge>{u.role}</Badge>
                  </td>
                  <td className="flex gap-2">
                    <Button size="sm" onClick={() => handleRoleChange(u)}>
                      Toggle Role
                    </Button>

                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteUser(u.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card3D>

        {/* CHARTS */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">

          <Card3D>
            <h2>User Growth</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={userGrowthData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Card3D>

          <Card3D>
            <h2>Activity</h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={activityData}>
                <XAxis dataKey="activity_type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </Card3D>

        </div>

      </div>
    </Layout>
  );
}
