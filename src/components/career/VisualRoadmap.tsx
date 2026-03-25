import { Card3D } from '@/components/ui/card-3d';
import { GraduationCap, BookOpen, Code, Briefcase, Trophy, Rocket } from 'lucide-react';

interface RoadmapStage {
  icon: React.ElementType;
  title: string;
  description: string;
  duration: string;
  color: string;
  items: string[];
}

interface VisualRoadmapProps {
  stages: RoadmapStage[];
}

export function VisualRoadmap({ stages }: VisualRoadmapProps) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-2">Your Learning Journey</h2>
        <p className="text-muted-foreground">Follow this path to become a professional</p>
      </div>

      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 via-blue-500 to-purple-500 hidden md:block" />

        {/* Stages */}
        <div className="space-y-8">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            return (
              <div key={index} className="relative">
                {/* Icon Circle */}
                <div className={`absolute left-0 w-16 h-16 rounded-full ${stage.color} flex items-center justify-center z-10 hidden md:flex`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>

                {/* Content Card */}
                <div className="md:ml-24">
                  <Card3D hover={false} className={`border-l-4 ${stage.color.replace('bg-', 'border-')}`}>
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-full ${stage.color} flex items-center justify-center md:hidden`}>
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold">{stage.title}</h3>
                            <p className="text-sm text-muted-foreground">{stage.duration}</p>
                          </div>
                        </div>
                        <span className="text-2xl font-bold text-muted-foreground/30">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground">{stage.description}</p>

                      {/* Items */}
                      <div className="space-y-2">
                        {stage.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-2 p-2 bg-accent rounded-lg">
                            <span className="text-primary mt-1">✓</span>
                            <span className="text-sm flex-1">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card3D>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Success Message */}
      <Card3D hover={false} className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border-2 border-primary">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold">You're Ready!</h3>
          <p className="text-muted-foreground">
            Complete this journey and you'll be job-ready with industry-relevant skills
          </p>
        </div>
      </Card3D>
    </div>
  );
}

// Default roadmap stages
export const defaultRoadmapStages: RoadmapStage[] = [
  {
    icon: GraduationCap,
    title: 'Foundation',
    description: 'Build strong fundamentals and understand core concepts',
    duration: '2-3 months',
    color: 'bg-green-500',
    items: [
      'Learn programming basics',
      'Understand data structures',
      'Practice problem-solving',
      'Build simple projects'
    ]
  },
  {
    icon: BookOpen,
    title: 'Learning Phase',
    description: 'Deep dive into technologies and frameworks',
    duration: '3-4 months',
    color: 'bg-blue-500',
    items: [
      'Master frameworks and tools',
      'Study design patterns',
      'Learn best practices',
      'Work on guided projects'
    ]
  },
  {
    icon: Code,
    title: 'Practice & Build',
    description: 'Apply knowledge through real projects',
    duration: '3-4 months',
    color: 'bg-purple-500',
    items: [
      'Build portfolio projects',
      'Contribute to open source',
      'Solve coding challenges',
      'Create full-stack applications'
    ]
  },
  {
    icon: Briefcase,
    title: 'Internship/Freelance',
    description: 'Gain real-world experience',
    duration: '3-6 months',
    color: 'bg-orange-500',
    items: [
      'Apply for internships',
      'Take freelance projects',
      'Work with teams',
      'Build professional network'
    ]
  },
  {
    icon: Rocket,
    title: 'Job Ready',
    description: 'Prepare for interviews and land your dream job',
    duration: '1-2 months',
    color: 'bg-pink-500',
    items: [
      'Polish resume and portfolio',
      'Practice interview questions',
      'Apply to companies',
      'Negotiate offers'
    ]
  }
];
