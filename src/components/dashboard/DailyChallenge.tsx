import { useState } from 'react';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Code, Trophy, CheckCircle, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  points: number;
  hint: string;
}

const dailyChallenges: Challenge[] = [
  {
    id: 'day-1',
    title: 'Reverse a String',
    description: 'Write a function that takes a string as input and returns the string reversed. Example: "hello" → "olleh"',
    difficulty: 'easy',
    category: 'Coding',
    points: 10,
    hint: 'You can use array methods like split(), reverse(), and join()'
  },
  {
    id: 'day-2',
    title: 'Find Duplicate Numbers',
    description: 'Given an array of numbers, find and return all duplicate numbers. Example: [1,2,3,2,4,3] → [2,3]',
    difficulty: 'medium',
    category: 'Coding',
    points: 20,
    hint: 'Use a Set or object to track seen numbers'
  },
  {
    id: 'day-3',
    title: 'Calculate Fibonacci',
    description: 'Write a function to calculate the nth Fibonacci number. Example: fib(6) → 8 (sequence: 0,1,1,2,3,5,8)',
    difficulty: 'medium',
    category: 'Coding',
    points: 20,
    hint: 'Consider using recursion or dynamic programming'
  },
  {
    id: 'day-4',
    title: 'Design a Login Form',
    description: 'Create a user-friendly login form with email and password fields. Consider accessibility and user experience.',
    difficulty: 'easy',
    category: 'Design',
    points: 15,
    hint: 'Include proper labels, error states, and a clear call-to-action'
  },
  {
    id: 'day-5',
    title: 'Explain REST API',
    description: 'In your own words, explain what a REST API is and give an example of how it\'s used in real applications.',
    difficulty: 'easy',
    category: 'Concept',
    points: 10,
    hint: 'Think about HTTP methods (GET, POST, PUT, DELETE) and how websites communicate with servers'
  }
];

export function DailyChallenge() {
  const today = new Date().getDay(); // 0-6 (Sunday-Saturday)
  const todayChallenge = dailyChallenges[today % dailyChallenges.length];
  
  const [solution, setSolution] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleSubmit = () => {
    if (!solution.trim()) {
      toast.error('Please write your solution before submitting!');
      return;
    }

    setSubmitted(true);
    toast.success(`Challenge completed! You earned ${todayChallenge.points} points! 🎉`);
  };

  if (submitted) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold gradient-text mb-2">Daily Challenge</h2>
          <p className="text-muted-foreground">
            Come back tomorrow for a new challenge!
          </p>
        </div>

        <Card3D hover={false} className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-2 border-green-500">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Challenge Complete! 🎉</h3>
              <p className="text-muted-foreground mb-4">
                Great job! You earned {todayChallenge.points} points today.
              </p>
              <Badge className="bg-green-500 text-white text-lg px-4 py-2">
                <Trophy className="h-5 w-5 mr-2" />
                +{todayChallenge.points} Points
              </Badge>
            </div>
          </div>
        </Card3D>

        <Card3D hover={false}>
          <h3 className="font-bold mb-3">Your Solution:</h3>
          <div className="p-4 bg-slate-950 rounded-lg">
            <pre className="text-sm text-green-400 whitespace-pre-wrap font-mono">
              {solution}
            </pre>
          </div>
        </Card3D>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold gradient-text mb-2">Daily Challenge</h2>
        <p className="text-muted-foreground">
          Complete today's challenge to earn points and improve your skills
        </p>
      </div>

      <Card3D hover={false} className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2">{todayChallenge.title}</h3>
              <p className="text-muted-foreground mb-3">{todayChallenge.description}</p>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <Badge className={`${getDifficultyColor(todayChallenge.difficulty)} text-white`}>
              {todayChallenge.difficulty.toUpperCase()}
            </Badge>
            <Badge variant="outline">{todayChallenge.category}</Badge>
            <Badge variant="outline">
              <Trophy className="h-3 w-3 mr-1" />
              {todayChallenge.points} points
            </Badge>
          </div>
        </div>
      </Card3D>

      <Card3D hover={false}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              Your Solution
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHint(!showHint)}
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </Button>
          </div>

          {showHint && (
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-sm">
                <span className="font-semibold text-yellow-600">💡 Hint:</span> {todayChallenge.hint}
              </p>
            </div>
          )}

          <Textarea
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            className="font-mono text-sm min-h-[300px] bg-slate-950 text-green-400"
            placeholder={
              todayChallenge.category === 'Coding'
                ? '// Write your code here...\n\nfunction solution() {\n  // Your implementation\n}'
                : todayChallenge.category === 'Design'
                ? 'Describe your design approach, key elements, and user experience considerations...'
                : 'Write your explanation here...'
            }
          />

          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              💡 Tip: Take your time and think through the problem before coding
            </p>
            <Button onClick={handleSubmit} size="lg">
              <CheckCircle className="h-5 w-5 mr-2" />
              Submit Solution
            </Button>
          </div>
        </div>
      </Card3D>

      <Card3D hover={false} className="bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="text-center space-y-2">
          <Trophy className="h-10 w-10 mx-auto text-primary" />
          <h3 className="font-bold">Daily Streak</h3>
          <p className="text-3xl font-bold text-primary">4 Days</p>
          <p className="text-sm text-muted-foreground">
            Keep it up! Complete challenges daily to maintain your streak
          </p>
        </div>
      </Card3D>
    </div>
  );
}
