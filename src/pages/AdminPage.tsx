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
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface Analytics {
  total_users: number;
  new_users_7d: number;
  new_users_30d: number;
  active_users_today: number;
  active_users_7d: number;
  active_users_30d: number;
}

interface UserDetail {
  id: string;
  username: string;
  email: string | null;
  role: string;
  created_at: string;
  last_activity?: string;
  activity_count?: number;
}

interface ActivityData {
  activity_type: string;
  count: number;
}

export default function AdminPage() {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [users, setUsers] = useState<UserDetail[]>([]);
  const [activityData, setActivityData] = useState<ActivityData[]>([]);
  const [userGrowthData, setUserGrowthData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is admin
    if (profile && profile.role !== 'admin') {
      toast.error('Access denied. Admin only.');
      navigate('/dashboard');
      return;
    }

    if (profile?.role === 'admin') {
      loadAdminData();
    }
  }, [profile, navigate]);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      // Load analytics summary using RPC function
      const { data: analyticsData, error: analyticsError } = await supabase
        .rpc('get_admin_analytics', {} as any) as { data: any; error: any };

      if (analyticsError) throw analyticsError;
      
      if (analyticsData && Array.isArray(analyticsData) && analyticsData.length > 0) {
        setAnalytics(analyticsData[0] as Analytics);
      }

      // Load all users with activity info
      const { data: usersData, error: usersError } = await supabase
        .from('profiles')
        .select(`
          id,
          username,
          email,
          role,
          created_at
        `)
        .order('created_at', { ascending: false });

      if (usersError) throw usersError;

      // Get activity count for each user
      const usersWithActivity = await Promise.all(
        ((usersData as any[]) || []).map(async (user: any) => {
          const { count } = await supabase
            .from('user_activity')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id);

          const { data: lastActivity } = await supabase
            .from('user_activity')
            .select('created_at')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

          return {
            ...user,
            activity_count: count || 0,
            last_activity: (lastActivity as any)?.created_at
          };
        })
      );

      setUsers(usersWithActivity);

      // Load activity breakdown
      const { data: activityBreakdown, error: activityError } = await supabase
        .from('user_activity')
        .select('activity_type');

      if (!activityError && activityBreakdown) {
        const activityCounts = (activityBreakdown as any[]).reduce((acc: Record<string, number>, curr: any) => {
          acc[curr.activity_type] = (acc[curr.activity_type] || 0) + 1;
          return acc;
        }, {});

        const formattedActivity = Object.entries(activityCounts).map(([type, count]) => ({
          activity_type: type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
          count: count as number
        }));

        setActivityData(formattedActivity);
      }

      // Generate user growth data (last 7 days)
      const growthData = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];

        const { count } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .lte('created_at', `${dateStr}T23:59:59`);

        growthData.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          users: count || 0
        });
      }

      setUserGrowthData(growthData);

    } catch (error: any) {
      console.error('Error loading admin data:', error);
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  if (!profile || profile.role !== 'admin') {
    return null;
  }

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
      </Layout>
    );
  }

  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2 flex items-center gap-3">
              <Shield className="h-10 w-10 text-primary" />
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">Monitor platform analytics and user activity</p>
          </div>
          <Button onClick={loadAdminData} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card3D hover={false} className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold">{analytics?.total_users || 0}</p>
              </div>
            </div>
          </Card3D>

          <Card3D hover={false} className="bg-gradient-to-br from-green-500/10 to-emerald-500/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Today</p>
                <p className="text-3xl font-bold">{analytics?.active_users_today || 0}</p>
              </div>
            </div>
          </Card3D>

          <Card3D hover={false} className="bg-gradient-to-br from-purple-500/10 to-pink-500/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">New Users (7d)</p>
                <p className="text-3xl font-bold">{analytics?.new_users_7d || 0}</p>
              </div>
            </div>
          </Card3D>

          <Card3D hover={false} className="bg-gradient-to-br from-orange-500/10 to-red-500/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active (7d)</p>
                <p className="text-3xl font-bold">{analytics?.active_users_7d || 0}</p>
              </div>
            </div>
          </Card3D>

          <Card3D hover={false} className="bg-gradient-to-br from-indigo-500/10 to-blue-500/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-indigo-500 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">New Users (30d)</p>
                <p className="text-3xl font-bold">{analytics?.new_users_30d || 0}</p>
              </div>
            </div>
          </Card3D>

          <Card3D hover={false} className="bg-gradient-to-br from-pink-500/10 to-rose-500/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-pink-500 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active (30d)</p>
                <p className="text-3xl font-bold">{analytics?.active_users_30d || 0}</p>
              </div>
            </div>
          </Card3D>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Growth Chart */}
          <Card3D hover={false}>
            <h2 className="text-xl font-bold mb-4">User Growth (Last 7 Days)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#667eea" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card3D>

          {/* Activity Breakdown Chart */}
          <Card3D hover={false}>
            <h2 className="text-xl font-bold mb-4">Feature Usage</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="activity_type" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#764ba2" />
              </BarChart>
            </ResponsiveContainer>
          </Card3D>
        </div>

        {/* User List */}
        <Card3D hover={false}>
          <h2 className="text-2xl font-bold mb-4">All Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Username</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Role</th>
                  <th className="text-left py-3 px-4">Joined</th>
                  <th className="text-left py-3 px-4">Activity Count</th>
                  <th className="text-left py-3 px-4">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-accent/50 transition-colors">
                    <td className="py-3 px-4 font-medium">{user.username}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{user.email || 'N/A'}</td>
                    <td className="py-3 px-4">
                      <Badge variant={user.role === 'admin' ? 'default' : 'outline'}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <Badge variant="outline">{user.activity_count || 0}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {user.last_activity 
                        ? new Date(user.last_activity).toLocaleDateString()
                        : 'Never'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card3D>
      </div>
    </Layout>
  );
}
