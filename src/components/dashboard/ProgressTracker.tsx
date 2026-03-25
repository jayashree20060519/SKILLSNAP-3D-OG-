import { Card3D } from '@/components/ui/card-3d';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Code, BarChart, Layers, Palette, CheckCircle } from 'lucide-react';

interface SkillProgress {
  name: string;
  category: string;
  progress: number;
  icon: React.ReactNode;
  color: string;
}

const skillsProgress: SkillProgress[] = [
  {
    name: 'Software Engineering',
    category: 'Technical',
    progress: 65,
    icon: <Code className="h-5 w-5" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Data Analysis',
    category: 'Technical',
    progress: 45,
    icon: <BarChart className="h-5 w-5" />,
    color: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Full Stack Development',
    category: 'Technical',
    progress: 80,
    icon: <Layers className="h-5 w-5" />,
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'UX Design',
    category: 'Design',
    progress: 30,
    icon: <Palette className="h-5 w-5" />,
    color: 'from-orange-500 to-red-500'
  }
];

interface SubjectProgress {
  name: string;
  completion: number;
  tasksCompleted: number;
  totalTasks: number;
}

const subjectsProgress: SubjectProgress[] = [
  { name: 'Data Structures', completion: 85, tasksCompleted: 17, totalTasks: 20 },
  { name: 'Web Development', completion: 70, tasksCompleted: 14, totalTasks: 20 },
  { name: 'Database Systems', completion: 60, tasksCompleted: 12, totalTasks: 20 },
  { name: 'Advanced Networking', completion: 45, tasksCompleted: 9, totalTasks: 20 },
  { name: 'Machine Learning', completion: 25, tasksCompleted: 5, totalTasks: 20 }
];

export function ProgressTracker() {
  const overallProgress = Math.round(
    subjectsProgress.reduce((sum, subject) => sum + subject.completion, 0) / subjectsProgress.length
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold gradient-text mb-2">Your Progress</h2>
        <p className="text-muted-foreground">
          Track your learning journey across all subjects and skills
        </p>
      </div>

      {/* Overall Progress */}
      <Card3D hover={false} className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-3xl font-bold text-white">{overallProgress}%</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-1">Overall Progress</h3>
            <p className="text-muted-foreground">Keep up the great work!</p>
          </div>
        </div>
      </Card3D>

      {/* Skills Progress */}
      <div>
        <h3 className="text-xl font-bold mb-4">Career Skills</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillsProgress.map((skill) => (
            <Card3D key={skill.name} hover={false}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center text-white`}>
                      {skill.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold">{skill.name}</h4>
                      <Badge variant="outline" className="text-xs">{skill.category}</Badge>
                    </div>
                  </div>
                  <span className="text-2xl font-bold">{skill.progress}%</span>
                </div>
                <Progress value={skill.progress} className="h-2" />
              </div>
            </Card3D>
          ))}
        </div>
      </div>

      {/* Subject Progress */}
      <div>
        <h3 className="text-xl font-bold mb-4">Subject Completion</h3>
        <Card3D hover={false}>
          <div className="space-y-4">
            {subjectsProgress.map((subject) => (
              <div key={subject.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {subject.completion === 100 && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    <span className="font-medium">{subject.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">
                      {subject.tasksCompleted} / {subject.totalTasks} tasks
                    </span>
                    <span className="font-bold text-primary">{subject.completion}%</span>
                  </div>
                </div>
                <Progress value={subject.completion} className="h-2" />
              </div>
            ))}
          </div>
        </Card3D>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card3D hover={false} className="text-center">
          <div className="text-3xl font-bold text-primary mb-1">57</div>
          <div className="text-sm text-muted-foreground">Tasks Completed</div>
        </Card3D>
        <Card3D hover={false} className="text-center">
          <div className="text-3xl font-bold text-green-500 mb-1">12</div>
          <div className="text-sm text-muted-foreground">Challenges Done</div>
        </Card3D>
        <Card3D hover={false} className="text-center">
          <div className="text-3xl font-bold text-orange-500 mb-1">4</div>
          <div className="text-sm text-muted-foreground">Day Streak</div>
        </Card3D>
        <Card3D hover={false} className="text-center">
          <div className="text-3xl font-bold text-purple-500 mb-1">18h</div>
          <div className="text-sm text-muted-foreground">Study Time</div>
        </Card3D>
      </div>
    </div>
  );
}
