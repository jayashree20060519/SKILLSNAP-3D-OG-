import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth, validatePassword } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Sparkles, Mail, Lock, User, Eye, EyeOff, Chrome, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const isSignUp = searchParams.get('signup') === 'true';
  const [mode, setMode] = useState<'login' | 'signup'>(isSignUp ? 'signup' : 'login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<{
    hasLength: boolean;
    hasUppercase: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
  }>({
    hasLength: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecial: false,
  });
  const { signInWithEmail, signUpWithEmail } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Update password strength indicator
  const updatePasswordStrength = (pwd: string) => {
    setPasswordStrength({
      hasLength: pwd.length >= 8,
      hasUppercase: /[A-Z]/.test(pwd),
      hasNumber: /[0-9]/.test(pwd),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (mode === 'signup') {
      updatePasswordStrength(newPassword);
    }
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      toast.error('Invalid email format. Please enter a valid email address.');
      return;
    }

    if (mode === 'signup') {
      const validation = validatePassword(password);
      if (!validation.valid) {
        toast.error(validation.message);
        return;
      }

      if (!fullName.trim()) {
        toast.error('Please enter your full name');
        return;
      }
    }

    setLoading(true);

    try {
      if (mode === 'signup') {
        const { error } = await signUpWithEmail(email, password, fullName);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Account created successfully! You can now sign in.');
          // Auto-login after signup (if email verification is disabled)
          setTimeout(() => {
            setMode('login');
            toast.info('Please sign in with your new account');
          }, 1500);
        }
      } else {
        const { error } = await signInWithEmail(email, password);
        if (error) {
          toast.error(error.message);
        } else {
          toast.success('Logged in successfully!');
          setTimeout(() => navigate('/dashboard'), 500);
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setEmail('');
    setPassword('');
    setFullName('');
    setPasswordStrength({
      hasLength: false,
      hasUppercase: false,
      hasNumber: false,
      hasSpecial: false,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-width-md"
      >
        <Card className="border-2 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-2xl">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold gradient-text">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-base">
              {mode === 'login' 
                ? 'Sign in to continue your learning journey' 
                : 'Join SkillSnap 3D and start learning today'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={loading}
                    required
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  disabled={loading}
                  required
                />
                  autoComplete="email"
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={mode === 'signup' ? 'Create a strong password' : '••••••••'}
                    value={password}
                    onChange={handlePasswordChange}
                    disabled={loading}
                    required
                    autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {mode === 'signup' && password.length > 0 && (
                  <div className="mt-2 space-y-1 text-xs">
                    <div className={`flex items-center gap-2 ${passwordStrength.hasLength ? 'text-green-600' : 'text-muted-foreground'}`}>
                      <span>{passwordStrength.hasLength ? '✓' : '○'}</span>
                      <span>At least 8 characters</span>
                    </div>
                    <div className={`flex items-center gap-2 ${passwordStrength.hasUppercase ? 'text-green-600' : 'text-muted-foreground'}`}>
                      <span>{passwordStrength.hasUppercase ? '✓' : '○'}</span>
                      <span>At least 1 uppercase letter</span>
                    </div>
                    <div className={`flex items-center gap-2 ${passwordStrength.hasNumber ? 'text-green-600' : 'text-muted-foreground'}`}>
                      <span>{passwordStrength.hasNumber ? '✓' : '○'}</span>
                      <span>At least 1 number</span>
                    </div>
                    <div className={`flex items-center gap-2 ${passwordStrength.hasSpecial ? 'text-green-600' : 'text-muted-foreground'}`}>
                      <span>{passwordStrength.hasSpecial ? '✓' : '○'}</span>
                      <span>At least 1 special character</span>
                    </div>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                  </span>
                ) : (
                  mode === 'login' ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">
                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              </span>
              <button
                type="button"
                onClick={toggleMode}
                className="text-primary hover:underline font-medium"
                disabled={loading}
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ← Back to Home
              </button>
            </div>
          </CardContent>
        </Card>

        {mode === 'signup' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 p-4 bg-muted/50 rounded-lg border"
          >
            <h3 className="font-semibold mb-2 text-sm">Password Requirements:</h3>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>✓ Minimum 8 characters</li>
              <li>✓ At least 1 uppercase letter (A-Z)</li>
              <li>✓ At least 1 number (0-9)</li>
              <li>✓ At least 1 special character (!@#$%^&*)</li>
            </ul>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
