import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Sparkles, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const isSignUp = searchParams.get('signup') === 'true';
  const [mode, setMode] = useState<'login' | 'signup'>(isSignUp ? 'signup' : 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signInWithEmail, signUpWithEmail } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim().toLowerCase());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password || (mode === 'signup' && !fullName.trim())) {
      toast.error('Please fill in all fields');
      return;
    }
    if (!validateEmail(cleanEmail)) {
      toast.error('Invalid email format');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'signup') {
        const { error } = await signUpWithEmail(cleanEmail, password, fullName);
        if (error) toast.error(error.message);
        else {
          toast.success('Account created! Please sign in.');
          setTimeout(() => {
            setMode('login');
            setPassword('');
            setShowPassword(false);
          }, 1200);
        }
      } else {
        const { error } = await signInWithEmail(cleanEmail, password);
        if (error) toast.error(error.message);
        else {
          toast.success('Logged in successfully!');
          setTimeout(() => navigate('/dashboard'), 500);
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setEmail('');
    setPassword('');
    setFullName('');
    setShowPassword(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md">
        <Card className="border-2 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-2xl">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>

            <CardTitle className="text-3xl font-bold gradient-text">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</CardTitle>

            <CardDescription className="text-base">
              {mode === 'login' ? 'Sign in to continue your learning journey' : 'Join SkillSnap 3D and start learning today'}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    <User className="h-4 w-4 inline mr-2" /> Full Name
                  </Label>
                  <Input id="fullName" type="text" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">
                  <Mail className="h-4 w-4 inline mr-2" /> Email
                </Label>
                <Input id="email" type="text" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  <Lock className="h-4 w-4 inline mr-2" /> Password
                </Label>
                <div className="relative">
                  <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required className="pr-12" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground z-10">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (mode === 'login' ? 'Signing In...' : 'Creating Account...') : mode === 'login' ? 'Sign In' : 'Create Account'}
              </Button>

              <div className="text-center text-sm text-muted-foreground pt-2">
                {mode === 'login' ? (
                  <>
                    Don&apos;t have an account?{' '}
                    <button type="button" onClick={toggleMode} className="text-primary font-medium hover:underline">
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button type="button" onClick={toggleMode} className="text-primary font-medium hover:underline">
                      Back to Sign In
                    </button>
                  </>
                )}
              </div>

              <div className="text-center text-sm pt-1">
                <Link to="/" className="text-muted-foreground hover:text-primary hover:underline">
                  ← Back to Home
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}