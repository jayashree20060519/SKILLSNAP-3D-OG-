import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layouts/Layout';
import { Card3D } from '@/components/ui/card-3d';
import { Lightbulb, Target, TrendingUp, Award, Code, BarChart, Users, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

const careerPaths = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    description: 'Build applications and systems that power the digital world',
    skills: ['Programming', 'Problem Solving', 'Algorithms'],
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    description: 'Analyze data and extract insights to drive business decisions',
    skills: ['Python', 'Statistics', 'SQL'],
    icon: BarChart,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 'full-stack-developer',
    title: 'Full Stack Developer',
    description: 'Build complete web applications from frontend to backend',
    skills: ['React', 'Node.js', 'Databases'],
    icon: Users,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'ux-designer',
    title: 'UX Designer',
    description: 'Design intuitive and beautiful user experiences',
    skills: ['Design', 'User Research', 'Prototyping'],
    icon: Palette,
    color: 'from-orange-500 to-red-500',
  },
];

const skillRecommendations = [
  { id: 'python-programming', name: 'Python Programming', category: 'Technical', importance: 'High', icon: '🐍' },
  { id: 'problem-solving', name: 'Problem Solving', category: 'Technical', importance: 'High', icon: '🧩' },
  { id: 'interview-preparation', name: 'Interview Preparation', category: 'Career', importance: 'High', icon: '💼' },
  { id: 'communication', name: 'Communication', category: 'Soft Skills', importance: 'High', icon: '💬' },
  { id: 'leadership', name: 'Leadership', category: 'Soft Skills', importance: 'Medium', icon: '👥' },
  { id: 'time-management', name: 'Time Management', category: 'Soft Skills', importance: 'High', icon: '⏰' },
];

const resumeTips = [
  'Keep it concise - 1-2 pages maximum',
  'Use action verbs to describe achievements',
  'Quantify your accomplishments with numbers',
  'Tailor your resume for each job application',
  'Include relevant projects and internships',
  'Proofread carefully for errors',
];

const internshipSuggestions = [
  'Apply early - many companies recruit 6-12 months in advance',
  'Network with alumni and professionals in your field',
  'Build a strong online presence (LinkedIn, GitHub)',
  'Prepare for technical interviews with practice',
  'Consider remote internships for more opportunities',
  'Follow up after applications and interviews',
];

export default function CareerHubPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Career Hub</h1>
          <p className="text-muted-foreground">Plan your career path and build essential skills</p>
        </div>

        <div className="space-y-8">
          {/* Career Paths */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Career Paths</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {careerPaths.map((path) => {
                const Icon = path.icon;
                return (
                  <Card3D
                    key={path.id}
                    className="cursor-pointer group"
                    onClick={() => navigate(`/career/${path.id}`)}
                  >
                    <div className="space-y-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${path.color} p-4 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{path.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{path.description}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Key Skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {path.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" asChild>
                        <span>View Details →</span>
                      </Button>
                    </div>
                  </Card3D>
                );
              })}
            </div>
          </section>

          {/* Skill Recommendations */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-6 w-6 text-secondary" />
              <h2 className="text-2xl font-bold">Skill Recommendations</h2>
            </div>
            <Card3D hover={false} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {skillRecommendations.map((skill) => (
                  <div
                    key={skill.id}
                    onClick={() => navigate(`/skill/${skill.id}`)}
                    className="p-4 rounded-lg bg-accent/50 space-y-2 cursor-pointer hover:bg-accent transition-colors group"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{skill.icon}</span>
                        <h4 className="font-semibold group-hover:text-primary transition-colors">{skill.name}</h4>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          skill.importance === 'High'
                            ? 'bg-primary/10 text-primary'
                            : 'bg-secondary/10 text-secondary'
                        }`}
                      >
                        {skill.importance}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{skill.category}</p>
                    <p className="text-xs text-muted-foreground">Click to learn more →</p>
                  </div>
                ))}
              </div>
            </Card3D>
          </section>

          {/* Resume Tips */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Resume Tips</h2>
            </div>
            <Card3D hover={false} className="space-y-3">
              {resumeTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-primary">{index + 1}</span>
                  </div>
                  <p className="text-muted-foreground">{tip}</p>
                </div>
              ))}
            </Card3D>
          </section>

          {/* Internship Suggestions */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-6 w-6 text-secondary" />
              <h2 className="text-2xl font-bold">Internship Suggestions</h2>
            </div>
            <Card3D hover={false} className="space-y-3">
              {internshipSuggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-secondary">{index + 1}</span>
                  </div>
                  <p className="text-muted-foreground">{suggestion}</p>
                </div>
              ))}
            </Card3D>
          </section>
        </div>
      </div>
    </Layout>
  );
}
