import { useNavigate } from 'react-router-dom';
import { Card3D } from '@/components/ui/card-3d';
import { Cloud, Cpu, Network, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const subjects = [
  {
    id: 'cloud-computing',
    title: 'Cloud Computing',
    description: 'Learn about cloud infrastructure, services, and deployment models',
    icon: Cloud,
    color: 'text-blue-500',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'iot',
    title: 'Internet of Things (IoT)',
    description: 'Explore connected devices, sensors, and smart systems',
    icon: Cpu,
    color: 'text-purple-500',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'advanced-networking',
    title: 'Advanced Networking',
    description: 'Master network protocols, security, and infrastructure',
    icon: Network,
    color: 'text-green-500',
    gradient: 'from-green-500 to-emerald-500',
  },
];

export function SubjectCards() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Subject Modules</h2>
          <p className="text-muted-foreground">Explore interactive 3D learning materials</p>
        </div>
        <Button variant="outline" onClick={() => navigate('/university?tab=quiz')}>
          <BookOpen className="h-4 w-4 mr-2" />
          Start Quiz
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject) => {
          const Icon = subject.icon;
          return (
            <Card3D
              key={subject.id}
              className="cursor-pointer group"
              onClick={() => navigate(`/subject/${subject.id}`)}
            >
              <div className="space-y-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${subject.gradient} p-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{subject.title}</h3>
                  <p className="text-sm text-muted-foreground">{subject.description}</p>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  asChild
                >
                  <span>View Details →</span>
                </Button>
              </div>
            </Card3D>
          );
        })}
      </div>
    </div>
  );
}
