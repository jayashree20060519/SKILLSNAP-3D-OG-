import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Layout } from '@/components/layouts/Layout';
import { Card3D } from '@/components/ui/card-3d';
import {
  BookOpen, Briefcase, MessageSquare, Timer, Target, TrendingUp,
  Calendar, Lightbulb, FileText, Trophy, Zap, Sparkles, Video,
} from 'lucide-react';

const dashboardCards = [
  { title: 'University Hub', description: 'Manage assignments, exams, notes & timetable', icon: BookOpen, path: '/university', color: 'text-primary' },
  { title: 'Career Hub', description: 'Plan your career path & build skills', icon: Briefcase, path: '/career', color: 'text-secondary' },
  { title: 'Job Opportunities', description: 'Discover internships & job openings', icon: TrendingUp, path: '/jobs', color: 'text-primary' },
  { title: 'AI Mentor Chat', description: 'Get instant help with coding & career', icon: MessageSquare, path: '/ai-mentor', color: 'text-secondary' },
  { title: 'Resume Builder', description: 'Create your professional resume', icon: FileText, path: '/resume-builder', color: 'text-primary' },
  { title: 'Study Timer', description: 'Track your study sessions', icon: Timer, path: '/study-timer', color: 'text-secondary' },
  { title: 'Learning Tips', description: 'Improve your study techniques', icon: Lightbulb, path: '/learning-tips', color: 'text-primary' },
  { title: 'Learning Videos', description: 'Watch curated tutorials & courses', icon: Video, path: '/videos', color: 'text-purple-500' },
  { title: 'Daily Goals', description: 'Set and track your daily objectives', icon: Target, path: '/goals', color: 'text-secondary' },
  { title: 'Skill Progress', description: 'Monitor your skill development', icon: Calendar, path: '/progress', color: 'text-primary' },
  { title: 'Daily Challenge', description: 'Complete today\'s coding challenge', icon: Zap, path: '/daily-challenge', color: 'text-yellow-500' },
  { title: 'Achievements', description: 'View your badges and milestones', icon: Trophy, path: '/achievements', color: 'text-orange-500' },
  { title: 'Smart Suggestions', description: 'Personalized learning recommendations', icon: Sparkles, path: '/suggestions', color: 'text-purple-500' },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const { profile } = useAuth(); // ✅ Get current user profile

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Welcome, {profile?.full_name || profile?.username || 'User'}
          </h1>
          <p className="text-muted-foreground capitalize">
            Role: {profile?.role || 'user'}
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dashboardCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Card3D
                key={idx}
                className="space-y-4 cursor-pointer"
                onClick={() => card.path && navigate(card.path)}
              >
                <div className={`w-12 h-12 rounded-xl bg-accent flex items-center justify-center ${card.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </div>
              </Card3D>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}