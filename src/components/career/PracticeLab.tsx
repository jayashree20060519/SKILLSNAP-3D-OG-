import { useState } from 'react';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Play, RotateCcw, CheckCircle, Code, Lightbulb } from 'lucide-react';
import { toast } from 'sonner';

interface PracticeChallenge {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeEstimate: string;
  tasks: string[];
  hints: string[];
}

interface PracticeLabProps {
  challenges: PracticeChallenge[];
  careerType: string;
}

export function PracticeLab({ challenges, careerType }: PracticeLabProps) {
  const [selectedChallenge, setSelectedChallenge] = useState<number | null>(null);
  const [code, setCode] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const handleRunCode = () => {
    toast.success('Code executed! Check your browser console for output.');
    try {
      // eslint-disable-next-line no-eval
      eval(code);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error(`Error: ${errorMessage}`);
    }
  };

  const toggleTaskComplete = (taskIndex: number) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskIndex)) {
      newCompleted.delete(taskIndex);
    } else {
      newCompleted.add(taskIndex);
    }
    setCompletedTasks(newCompleted);
  };

  const resetChallenge = () => {
    setCode('');
    setCompletedTasks(new Set());
    setShowHints(false);
    toast.info('Challenge reset');
  };

  if (selectedChallenge === null) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold gradient-text mb-2">Practice Lab</h2>
          <p className="text-muted-foreground">
            Build real projects and master your skills through hands-on practice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {challenges.map((challenge, index) => (
            <Card3D
              key={index}
              className="cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setSelectedChallenge(index)}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {challenge.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className={`${getDifficultyColor(challenge.difficulty)} text-white`}>
                    {challenge.difficulty.toUpperCase()}
                  </Badge>
                  <Badge variant="outline">
                    ⏱️ {challenge.timeEstimate}
                  </Badge>
                  <Badge variant="outline">
                    ✓ {challenge.tasks.length} tasks
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

  const challenge = challenges[selectedChallenge];
  const progress = (completedTasks.size / challenge.tasks.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            onClick={() => {
              setSelectedChallenge(null);
              resetChallenge();
            }}
          >
            ← Back to Challenges
          </Button>
          <h2 className="text-2xl font-bold mt-2">{challenge.title}</h2>
          <p className="text-muted-foreground">{challenge.description}</p>
        </div>
        <div className="flex gap-2">
          <Badge className={`${getDifficultyColor(challenge.difficulty)} text-white`}>
            {challenge.difficulty.toUpperCase()}
          </Badge>
          <Badge variant="outline">⏱️ {challenge.timeEstimate}</Badge>
        </div>
      </div>

      {/* Progress */}
      <Card3D hover={false}>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Progress</span>
            <span className="text-muted-foreground">
              {completedTasks.size} / {challenge.tasks.length} tasks completed
            </span>
          </div>
          <div className="h-2 bg-accent rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </Card3D>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks */}
        <Card3D hover={false}>
          <h3 className="text-lg font-bold mb-4">Tasks Checklist</h3>
          <div className="space-y-2">
            {challenge.tasks.map((task, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  completedTasks.has(index)
                    ? 'bg-green-500/10 border-green-500'
                    : 'bg-accent hover:bg-accent/70'
                }`}
                onClick={() => toggleTaskComplete(index)}
              >
                <div className="mt-0.5">
                  {completedTasks.has(index) ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                  )}
                </div>
                <span className={`text-sm flex-1 ${completedTasks.has(index) ? 'line-through text-muted-foreground' : ''}`}>
                  {task}
                </span>
              </div>
            ))}
          </div>

          {/* Hints */}
          <div className="mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowHints(!showHints)}
              className="w-full"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              {showHints ? 'Hide Hints' : 'Show Hints'}
            </Button>

            {showHints && (
              <div className="mt-4 space-y-2">
                {challenge.hints.map((hint, index) => (
                  <div key={index} className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-sm">
                    <span className="font-semibold text-yellow-600">💡 Hint {index + 1}:</span> {hint}
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card3D>

        {/* Code Editor */}
        <Card3D hover={false}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold">Code Editor</h3>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={resetChallenge}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                {careerType !== 'ux-designer' && (
                  <Button size="sm" onClick={handleRunCode}>
                    <Play className="h-4 w-4 mr-2" />
                    Run
                  </Button>
                )}
              </div>
            </div>

            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono text-sm min-h-[400px] bg-slate-950 text-green-400"
              placeholder={
                careerType === 'ux-designer'
                  ? 'Describe your design approach, tools you\'ll use, and key decisions...'
                  : '// Write your code here...\n\nconsole.log("Hello, World!");'
              }
            />

            <div className="p-3 bg-accent rounded-lg text-sm text-muted-foreground">
              <p>
                <strong>Tip:</strong>{' '}
                {careerType === 'ux-designer'
                  ? 'Document your design process, wireframes, and rationale. Use Figma for actual design work.'
                  : 'Use console.log() to debug. Check browser console (F12) for output. Test your code incrementally.'}
              </p>
            </div>
          </div>
        </Card3D>
      </div>

      {/* Completion */}
      {progress === 100 && (
        <Card3D hover={false} className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-2 border-green-500">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold">Challenge Complete! 🎉</h3>
            <p className="text-muted-foreground">
              Great job! You've completed all tasks. Try the next challenge to continue learning.
            </p>
            <Button
              onClick={() => {
                if (selectedChallenge < challenges.length - 1) {
                  setSelectedChallenge(selectedChallenge + 1);
                  resetChallenge();
                } else {
                  setSelectedChallenge(null);
                  resetChallenge();
                }
              }}
            >
              {selectedChallenge < challenges.length - 1 ? 'Next Challenge' : 'Back to Challenges'}
            </Button>
          </div>
        </Card3D>
      )}
    </div>
  );
}
