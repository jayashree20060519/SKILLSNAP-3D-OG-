import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card3D } from '@/components/ui/card-3d';
import { Sparkles, Rocket, Brain, Target } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function LandingPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const handleSignUp = () => {
    navigate('/login?signup=true');
  };

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="text-center space-y-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-12 w-12 text-primary animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-bold gradient-text">
              SkillSnap 3D
            </h1>
          </div>
          
          <p className="text-2xl md:text-3xl text-muted-foreground max-w-3xl mx-auto">
            Your AI-Powered Student Productivity Hub
          </p>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Manage your academic life and career growth in one futuristic platform. 
            Track assignments, plan your career, chat with AI mentor, and achieve your goals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button size="lg" className="text-lg px-8 py-6 glow" onClick={handleGetStarted}>
              Get Started Free
            </Button>
            {!user && (
              <>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6" onClick={handleSignUp}>
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>

        {/* 3D Dashboard Preview */}
        <div className="mt-20 perspective-1000">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card3D className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Rocket className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">University Hub</h3>
              <p className="text-muted-foreground">
                Track assignments, exams, notes, and timetable all in one place
              </p>
            </Card3D>

            <Card3D className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center">
                <Brain className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold">AI Mentor</h3>
              <p className="text-muted-foreground">
                Get instant help with coding, career advice, and study planning
              </p>
            </Card3D>

            <Card3D className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Career Growth</h3>
              <p className="text-muted-foreground">
                Discover jobs, build skills, and plan your career path
              </p>
            </Card3D>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
          Everything You Need to Succeed
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { title: 'Assignment Tracker', desc: 'Never miss a deadline' },
            { title: 'Exam Countdown', desc: 'Stay prepared' },
            { title: 'Notes Manager', desc: 'Organize your knowledge' },
            { title: 'Class Timetable', desc: 'Plan your day' },
            { title: 'CGPA Calculator', desc: 'Track your grades' },
            { title: 'Job Opportunities', desc: 'Find internships' },
            { title: 'Skill Progress', desc: 'Level up your skills' },
            { title: 'Daily Goals', desc: 'Stay motivated' },
          ].map((feature, index) => (
            <Card3D key={index} className="text-center space-y-2">
              <h4 className="font-semibold text-lg">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </Card3D>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Card3D className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">
            Ready to Transform Your Student Life?
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of students who are already using SkillSnap 3D to achieve their goals
          </p>
          <Button size="lg" className="text-lg px-8 py-6 glow" asChild>
            <Link to="/login?signup=true">Start Your Journey Today</Link>
          </Button>
        </Card3D>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 SkillSnap 3D. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
