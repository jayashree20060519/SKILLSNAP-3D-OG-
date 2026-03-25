import { Card3D } from '@/components/ui/card-3d';
import { Badge } from '@/components/ui/badge';
import { Trophy, Zap, Target, Star, Award, Flame } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  total?: number;
}

const achievements: Achievement[] = [
  {
    id: 'fast-learner',
    title: 'Fast Learner',
    description: 'Complete 5 practice challenges in one day',
    icon: <Zap className="h-6 w-6" />,
    unlocked: false,
    progress: 2,
    total: 5
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Score 100% on 3 different quizzes',
    icon: <Trophy className="h-6 w-6" />,
    unlocked: false,
    progress: 1,
    total: 3
  },
  {
    id: 'consistent-user',
    title: 'Consistent User',
    description: 'Use SkillSnap 3D for 7 days in a row',
    icon: <Flame className="h-6 w-6" />,
    unlocked: false,
    progress: 4,
    total: 7
  },
  {
    id: 'code-warrior',
    title: 'Code Warrior',
    description: 'Complete all hackathon challenges',
    icon: <Target className="h-6 w-6" />,
    unlocked: false,
    progress: 3,
    total: 12
  },
  {
    id: 'knowledge-seeker',
    title: 'Knowledge Seeker',
    description: 'Read all notes for one career path',
    icon: <Star className="h-6 w-6" />,
    unlocked: true
  },
  {
    id: 'career-explorer',
    title: 'Career Explorer',
    description: 'Explore all 4 career paths',
    icon: <Award className="h-6 w-6" />,
    unlocked: false,
    progress: 2,
    total: 4
  }
];

export function AchievementSystem() {
  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold gradient-text mb-2">Achievements</h2>
        <p className="text-muted-foreground">
          Unlock badges as you learn and grow
        </p>
        <div className="mt-4">
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
            {unlockedCount} / {totalCount} Unlocked
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <Card3D
            key={achievement.id}
            hover={false}
            className={`relative ${
              achievement.unlocked
                ? 'bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-2 border-yellow-500'
                : 'opacity-75'
            }`}
          >
            {achievement.unlocked && (
              <div className="absolute top-2 right-2">
                <Badge className="bg-yellow-500 text-white">
                  ✓ Unlocked
                </Badge>
              </div>
            )}
            
            <div className="space-y-3">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
                achievement.unlocked
                  ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {achievement.icon}
              </div>
              
              <div className="text-center">
                <h3 className="font-bold text-lg mb-1">{achievement.title}</h3>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
              
              {!achievement.unlocked && achievement.progress !== undefined && achievement.total !== undefined && (
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{achievement.progress} / {achievement.total}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all"
                      style={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </Card3D>
        ))}
      </div>
    </div>
  );
}
