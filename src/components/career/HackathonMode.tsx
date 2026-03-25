import { useState, useEffect } from 'react';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Timer, Zap, Trophy, RotateCcw, Send, Download, Award } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface HackathonChallenge {
  title: string;
  description: string;
  timeLimit: number; // in minutes
  requirements: string[];
}

interface HackathonModeProps {
  challenges: HackathonChallenge[];
}

export function HackathonMode({ challenges }: HackathonModeProps) {
  const { profile } = useAuth();
  const [selectedChallenge, setSelectedChallenge] = useState<HackathonChallenge | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [solution, setSolution] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            toast.error('Time\'s up! ⏰');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const startChallenge = (challenge: HackathonChallenge) => {
    setSelectedChallenge(challenge);
    setTimeLeft(challenge.timeLimit * 60);
    setIsActive(true);
    setSolution('');
    setSubmitted(false);
    toast.success(`Challenge started! You have ${challenge.timeLimit} minutes.`);
  };

  const selectRandomChallenge = () => {
    const randomIndex = Math.floor(Math.random() * challenges.length);
    startChallenge(challenges[randomIndex]);
  };

  const handleSubmit = () => {
    if (!solution.trim()) {
      toast.error('Please write your solution before submitting!');
      return;
    }

    setIsActive(false);
    setSubmitted(true);
    
    const timeSpent = selectedChallenge!.timeLimit * 60 - timeLeft;
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    
    // Calculate score based on time efficiency and solution length
    const timeEfficiency = (timeLeft / (selectedChallenge!.timeLimit * 60)) * 50;
    const solutionQuality = Math.min((solution.length / 100) * 50, 50);
    const calculatedScore = Math.round(timeEfficiency + solutionQuality);
    setScore(calculatedScore);
    
    toast.success(`Submitted! Time taken: ${minutes}m ${seconds}s | Score: ${calculatedScore}/100`);
  };

  const generateCertificate = () => {
    if (!selectedChallenge || !profile) return;

    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) return;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(1, '#764ba2');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 10;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

    // Inner border
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 60px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE OF ACHIEVEMENT', canvas.width / 2, 150);

    // Subtitle
    ctx.font = '30px Arial';
    ctx.fillText('Hackathon Challenge Completion', canvas.width / 2, 210);

    // Decorative line
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(300, 240);
    ctx.lineTo(900, 240);
    ctx.stroke();

    // Recipient
    ctx.font = '25px Arial';
    ctx.fillText('This is to certify that', canvas.width / 2, 300);

    ctx.font = 'bold 45px Arial';
    ctx.fillStyle = '#ffd700';
    ctx.fillText(profile.email?.split('@')[0] || 'Student', canvas.width / 2, 360);

    // Achievement text
    ctx.fillStyle = '#ffffff';
    ctx.font = '25px Arial';
    ctx.fillText('has successfully completed the', canvas.width / 2, 420);

    ctx.font = 'bold 35px Arial';
    ctx.fillStyle = '#ffd700';
    ctx.fillText(selectedChallenge.title, canvas.width / 2, 470);

    // Score
    ctx.fillStyle = '#ffffff';
    ctx.font = '30px Arial';
    ctx.fillText(`with a score of ${score}/100`, canvas.width / 2, 530);

    // Date
    const today = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    ctx.font = '22px Arial';
    ctx.fillText(`Completed on ${today}`, canvas.width / 2, 590);

    // Footer
    ctx.font = 'italic 20px Arial';
    ctx.fillStyle = '#e0e0e0';
    ctx.fillText('SkillSnap 3D - Your AI-Powered Student Productivity Hub', canvas.width / 2, 720);

    // Download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${selectedChallenge.title.replace(/\s+/g, '_')}_Certificate.png`;
        a.click();
        URL.revokeObjectURL(url);
        toast.success('Certificate downloaded!');
      }
    });
  };

  const resetChallenge = () => {
    setSelectedChallenge(null);
    setIsActive(false);
    setTimeLeft(0);
    setSolution('');
    setSubmitted(false);
    setScore(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (!selectedChallenge) return 'text-muted-foreground';
    const percentage = (timeLeft / (selectedChallenge.timeLimit * 60)) * 100;
    if (percentage > 50) return 'text-green-500';
    if (percentage > 25) return 'text-yellow-500';
    return 'text-red-500';
  };

  if (!selectedChallenge) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
            <Zap className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold gradient-text mb-2">Hackathon Mode 🔥</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Test your skills under pressure! Choose a challenge or get a random one. 
            Race against the clock to build something amazing.
          </p>
        </div>

        {/* Random Challenge Button */}
        <Card3D hover={false} className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-2 border-orange-500">
          <div className="text-center space-y-4">
            <Zap className="h-12 w-12 mx-auto text-orange-500" />
            <div>
              <h3 className="text-xl font-bold mb-2">Feeling Lucky?</h3>
              <p className="text-sm text-muted-foreground">
                Get a random challenge and start immediately!
              </p>
            </div>
            <Button
              size="lg"
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              onClick={selectRandomChallenge}
            >
              <Zap className="h-5 w-5 mr-2" />
              Random Challenge
            </Button>
          </div>
        </Card3D>

        {/* Challenge List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge, index) => (
            <Card3D
              key={index}
              className="cursor-pointer hover:scale-105 transition-transform"
              onClick={() => startChallenge(challenge)}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2">{challenge.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {challenge.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-orange-500 border-orange-500">
                    <Timer className="h-3 w-3 mr-1" />
                    {challenge.timeLimit} min
                  </Badge>
                  <Badge variant="outline">
                    {challenge.requirements.length} requirements
                  </Badge>
                </div>

                <Button className="w-full" variant="outline" asChild>
                  <span>Start Challenge →</span>
                </Button>
              </div>
            </Card3D>
          ))}
        </div>
      </div>
    );
  }

  if (submitted) {
    const timeSpent = selectedChallenge.timeLimit * 60 - timeLeft;
    const percentage = ((selectedChallenge.timeLimit * 60 - timeSpent) / (selectedChallenge.timeLimit * 60)) * 100;
    const passed = percentage > 0; // Submitted before time ran out

    return (
      <div className="space-y-6">
        <Card3D hover={false}>
          <div className="text-center space-y-6">
            <div className={`w-24 h-24 mx-auto rounded-full ${passed ? 'bg-green-500/20' : 'bg-orange-500/20'} flex items-center justify-center`}>
              <Trophy className={`h-12 w-12 ${passed ? 'text-green-500' : 'text-orange-500'}`} />
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-2">Challenge Completed! 🎉</h2>
              <p className="text-muted-foreground">
                Time taken: {Math.floor(timeSpent / 60)}m {timeSpent % 60}s
              </p>
              <p className="text-2xl font-bold text-primary mt-2">
                Score: {score}/100
              </p>
            </div>

            <div className="p-6 bg-accent rounded-lg max-w-md mx-auto">
              <h3 className="font-semibold mb-3">Feedback:</h3>
              <div className="space-y-2 text-sm text-left">
                <p>✅ Solution submitted successfully</p>
                <p>⏱️ Time management: {percentage > 50 ? 'Excellent' : percentage > 25 ? 'Good' : 'Could improve'}</p>
                <p>🏆 Score: {score >= 80 ? 'Outstanding!' : score >= 60 ? 'Great job!' : 'Keep practicing!'}</p>
                <p>💡 Next step: Review your solution and refine it</p>
                <p>🚀 Keep practicing to improve your speed!</p>
              </div>
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                onClick={generateCertificate}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                <Award className="h-4 w-4 mr-2" />
                Download Certificate
              </Button>
              <Button onClick={resetChallenge} variant="outline">
                Back to Challenges
              </Button>
              <Button variant="outline" onClick={selectRandomChallenge}>
                <Zap className="h-4 w-4 mr-2" />
                Try Another
              </Button>
            </div>
          </div>
        </Card3D>

        {/* Solution Preview */}
        <Card3D hover={false}>
          <h3 className="text-lg font-bold mb-4">Your Solution:</h3>
          <div className="p-4 bg-slate-950 rounded-lg">
            <pre className="text-sm text-green-400 whitespace-pre-wrap font-mono">
              {solution || 'No solution provided'}
            </pre>
          </div>
        </Card3D>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Timer */}
      <Card3D hover={false} className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-2 border-orange-500">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">{selectedChallenge.title}</h2>
            <p className="text-sm text-muted-foreground">{selectedChallenge.description}</p>
          </div>
          <div className="text-center">
            <div className={`text-4xl font-bold font-mono ${getTimeColor()}`}>
              {formatTime(timeLeft)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Time Remaining</p>
          </div>
        </div>
      </Card3D>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Requirements */}
        <Card3D hover={false} className="lg:col-span-1">
          <h3 className="text-lg font-bold mb-4">Requirements</h3>
          <div className="space-y-2">
            {selectedChallenge.requirements.map((req, index) => (
              <div key={index} className="flex items-start gap-2 p-2 bg-accent rounded-lg">
                <span className="text-orange-500 font-bold">{index + 1}.</span>
                <span className="text-sm flex-1">{req}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => {
                setIsActive(!isActive);
                toast.info(isActive ? 'Timer paused' : 'Timer resumed');
              }}
            >
              {isActive ? '⏸️ Pause Timer' : '▶️ Resume Timer'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={resetChallenge}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Quit Challenge
            </Button>
          </div>
        </Card3D>

        {/* Solution Area */}
        <Card3D hover={false} className="lg:col-span-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Your Solution</h3>
              <Button onClick={handleSubmit} disabled={!isActive}>
                <Send className="h-4 w-4 mr-2" />
                Submit Solution
              </Button>
            </div>

            <Textarea
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              className="font-mono text-sm min-h-[500px] bg-slate-950 text-green-400"
              placeholder="// Start coding your solution here...

// Tips:
// - Read all requirements carefully
// - Plan before coding
// - Test as you build
// - Don't forget edge cases

console.log('Let\\'s build something amazing!');"
              disabled={!isActive}
            />

            <div className="p-3 bg-accent rounded-lg text-sm">
              <p className="text-muted-foreground">
                <strong>💡 Tip:</strong> Focus on meeting the requirements first. 
                You can always refine and optimize later. Good luck! 🚀
              </p>
            </div>
          </div>
        </Card3D>
      </div>
    </div>
  );
}
