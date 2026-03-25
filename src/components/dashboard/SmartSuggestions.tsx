import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, BookOpen, Target, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Suggestion {
  id: string;
  title: string;
  description: string;
  reason: string;
  action: string;
  link: string;
  icon: React.ReactNode;
  priority: 'high' | 'medium' | 'low';
}

const suggestions: Suggestion[] = [
  {
    id: 'next-skill',
    title: 'Learn React Hooks',
    description: 'Based on your progress in Full Stack Development, React Hooks is the next logical step.',
    reason: 'You completed React basics with 85% score',
    action: 'Start Learning',
    link: '/career/full-stack-developer',
    icon: <TrendingUp className="h-5 w-5" />,
    priority: 'high'
  },
  {
    id: 'practice-more',
    title: 'Practice Data Structures',
    description: 'You haven\'t practiced algorithms in 3 days. Keep your skills sharp!',
    reason: 'Maintain your learning momentum',
    action: 'View Challenges',
    link: '/career/software-engineer',
    icon: <Target className="h-5 w-5" />,
    priority: 'high'
  },
  {
    id: 'explore-career',
    title: 'Explore UX Design',
    description: 'You might enjoy UX Design based on your interest in user interfaces.',
    reason: 'Complements your Full Stack skills',
    action: 'Explore Career',
    link: '/career/ux-designer',
    icon: <Sparkles className="h-5 w-5" />,
    priority: 'medium'
  },
  {
    id: 'complete-notes',
    title: 'Complete Advanced Notes',
    description: 'Finish the advanced section of Software Engineering to unlock new challenges.',
    reason: '2 sections remaining',
    action: 'Continue Reading',
    link: '/career/software-engineer',
    icon: <BookOpen className="h-5 w-5" />,
    priority: 'medium'
  }
];

export function SmartSuggestions() {
  const navigate = useNavigate();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'from-red-500 to-orange-500';
      case 'medium': return 'from-blue-500 to-cyan-500';
      case 'low': return 'from-gray-500 to-slate-500';
      default: return 'from-primary to-secondary';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-blue-500';
      case 'low': return 'bg-gray-500';
      default: return 'bg-primary';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold gradient-text mb-2">Smart Suggestions</h2>
        <p className="text-muted-foreground">
          Personalized recommendations based on your learning activity
        </p>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <Card3D key={suggestion.id} hover={false}>
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getPriorityColor(suggestion.priority)} flex items-center justify-center text-white flex-shrink-0`}>
                {suggestion.icon}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-lg mb-1">{suggestion.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{suggestion.description}</p>
                  </div>
                  <Badge className={`${getPriorityBadge(suggestion.priority)} text-white`}>
                    {suggestion.priority}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{suggestion.reason}</span>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(suggestion.link)}
                  className="mt-2"
                >
                  {suggestion.action}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card3D>
        ))}
      </div>

      <Card3D hover={false} className="bg-gradient-to-r from-purple-500/10 to-pink-500/10">
        <div className="text-center space-y-3">
          <Sparkles className="h-12 w-12 mx-auto text-primary" />
          <h3 className="text-xl font-bold">Want More Personalized Advice?</h3>
          <p className="text-sm text-muted-foreground">
            Chat with our AI Mentor for customized learning recommendations
          </p>
          <Button variant="outline" onClick={() => navigate('/ai-mentor')}>
            Ask AI Mentor
          </Button>
        </div>
      </Card3D>
    </div>
  );
}
