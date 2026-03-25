import { useState, useEffect, useRef } from 'react';
import { Layout } from '@/components/layouts/Layout';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function StudyTimerPage() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            if (minutes === 0) {
              // Timer completed
              setIsRunning(false);
              toast.success('Study session completed! Great job! 🎉');
              setTotalStudyTime((prev) => prev + 25);
              return 0;
            } else {
              setMinutes((prevMinutes) => prevMinutes - 1);
              return 59;
            }
          } else {
            return prevSeconds - 1;
          }
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, minutes]);

  const handleStart = () => {
    setIsRunning(true);
    toast.success('Study session started! Focus time! 📚');
  };

  const handlePause = () => {
    setIsRunning(false);
    toast.info('Study session paused. Take a breath! ⏸️');
  };

  const handleReset = () => {
    setIsRunning(false);
    setMinutes(25);
    setSeconds(0);
    toast.info('Timer reset to 25 minutes');
  };

  const setPresetTime = (mins: number) => {
    if (!isRunning) {
      setMinutes(mins);
      setSeconds(0);
    }
  };

  const formatTime = (mins: number, secs: number) => {
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const progress = ((25 * 60 - (minutes * 60 + seconds)) / (25 * 60)) * 100;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Study Timer</h1>
          <p className="text-muted-foreground">Stay focused with the Pomodoro technique</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Timer */}
          <div className="lg:col-span-2">
            <Card3D hover={false} className="text-center space-y-8">
              <div className="relative">
                {/* Circular Progress */}
                <div className="relative w-64 h-64 mx-auto">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="128"
                      cy="128"
                      r="120"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-accent"
                    />
                    <circle
                      cx="128"
                      cy="128"
                      r="120"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 120}`}
                      strokeDashoffset={`${2 * Math.PI * 120 * (1 - progress / 100)}`}
                      className="text-primary transition-all duration-1000"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div>
                      <div className="text-6xl font-bold gradient-text">
                        {formatTime(minutes, seconds)}
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        {isRunning ? 'Focus Time' : 'Ready to Start'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex gap-4 justify-center">
                {!isRunning ? (
                  <Button size="lg" onClick={handleStart} className="gap-2">
                    <Play className="h-5 w-5" />
                    Start
                  </Button>
                ) : (
                  <Button size="lg" onClick={handlePause} variant="secondary" className="gap-2">
                    <Pause className="h-5 w-5" />
                    Pause
                  </Button>
                )}
                <Button size="lg" onClick={handleReset} variant="outline" className="gap-2">
                  <RotateCcw className="h-5 w-5" />
                  Reset
                </Button>
              </div>

              {/* Preset Times */}
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">Quick Presets:</p>
                <div className="flex gap-3 justify-center flex-wrap">
                  {[15, 25, 45, 60].map((time) => (
                    <Button
                      key={time}
                      variant={minutes === time && seconds === 0 ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPresetTime(time)}
                      disabled={isRunning}
                    >
                      {time} min
                    </Button>
                  ))}
                </div>
              </div>
            </Card3D>
          </div>

          {/* Stats & Tips */}
          <div className="space-y-6">
            {/* Stats */}
            <Card3D hover={false}>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Today's Stats
              </h2>
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Total Study Time</p>
                  <p className="text-3xl font-bold text-primary">{totalStudyTime} min</p>
                </div>
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <p className="text-sm text-muted-foreground">Sessions Completed</p>
                  <p className="text-3xl font-bold text-secondary">{Math.floor(totalStudyTime / 25)}</p>
                </div>
              </div>
            </Card3D>

            {/* Pomodoro Tips */}
            <Card3D hover={false}>
              <h2 className="text-xl font-bold mb-4">Pomodoro Tips</h2>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Work for 25 minutes without distractions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Take a 5-minute break after each session</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>After 4 sessions, take a longer 15-30 minute break</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Turn off notifications during focus time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Keep a glass of water nearby</span>
                </li>
              </ul>
            </Card3D>
          </div>
        </div>

        {/* Study Techniques */}
        <div className="mt-8">
          <Card3D hover={false}>
            <h2 className="text-2xl font-bold mb-6">Effective Study Techniques</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-accent rounded-lg">
                <h3 className="font-bold mb-2">🎯 Active Recall</h3>
                <p className="text-sm text-muted-foreground">
                  Test yourself frequently instead of just re-reading notes
                </p>
              </div>
              <div className="p-4 bg-accent rounded-lg">
                <h3 className="font-bold mb-2">📝 Spaced Repetition</h3>
                <p className="text-sm text-muted-foreground">
                  Review material at increasing intervals over time
                </p>
              </div>
              <div className="p-4 bg-accent rounded-lg">
                <h3 className="font-bold mb-2">🧠 Feynman Technique</h3>
                <p className="text-sm text-muted-foreground">
                  Explain concepts in simple terms as if teaching someone
                </p>
              </div>
            </div>
          </Card3D>
        </div>
      </div>
    </Layout>
  );
}
