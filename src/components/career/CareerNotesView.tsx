import { Card3D } from '@/components/ui/card-3d';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Rocket, Trophy, BookOpen, Lightbulb, Target } from 'lucide-react';

interface CareerNotes {
  beginner: {
    whatIs: string;
    basicConcepts: string[];
    requiredSkills: string[];
    examples: string[];
  };
  intermediate: {
    coreConcepts: string[];
    toolsTech: string[];
    realWorld: string[];
    explanations: string[];
  };
  advanced: {
    industryPractices: string[];
    realProjects: string[];
    advancedTools: string[];
    careerGrowth: string[];
  };
}

interface CareerNotesViewProps {
  notes: CareerNotes;
  careerTitle: string;
}

export function CareerNotesView({ notes, careerTitle }: CareerNotesViewProps) {
  const renderList = (items: string[], icon: React.ReactNode) => (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="p-4 bg-accent rounded-lg border-l-4 border-primary">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex-shrink-0">{icon}</div>
            <div className="flex-1">
              <p className="text-sm leading-relaxed whitespace-pre-line">{item}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-2">Complete Learning Notes</h2>
        <p className="text-muted-foreground">
          Structured curriculum from beginner to advanced for {careerTitle}
        </p>
      </div>

      <Tabs defaultValue="beginner" className="space-y-6">
        <TabsList className="glass-card w-full justify-start overflow-x-auto">
          <TabsTrigger value="beginner" className="gap-2">
            <GraduationCap className="h-4 w-4" />
            Beginner
          </TabsTrigger>
          <TabsTrigger value="intermediate" className="gap-2">
            <Rocket className="h-4 w-4" />
            Intermediate
          </TabsTrigger>
          <TabsTrigger value="advanced" className="gap-2">
            <Trophy className="h-4 w-4" />
            Advanced
          </TabsTrigger>
        </TabsList>

        {/* Beginner Level */}
        <TabsContent value="beginner" className="space-y-6">
          <Card3D hover={false} className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-2 border-green-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Beginner Level</h3>
                <p className="text-sm text-muted-foreground">Foundation and fundamentals (0-6 months)</p>
              </div>
            </div>
          </Card3D>

          {/* What Is */}
          <Card3D hover={false}>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-bold">What is {careerTitle}?</h3>
            </div>
            <div className="prose prose-sm max-w-none">
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {notes.beginner.whatIs}
              </p>
            </div>
          </Card3D>

          {/* Basic Concepts */}
          <Card3D hover={false}>
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              <h3 className="text-xl font-bold">Basic Concepts</h3>
            </div>
            {renderList(notes.beginner.basicConcepts, <span className="text-yellow-500">💡</span>)}
          </Card3D>

          {/* Required Skills */}
          <Card3D hover={false}>
            <div className="flex items-center gap-2 mb-4">
              <Target className="h-5 w-5 text-blue-500" />
              <h3 className="text-xl font-bold">Required Skills</h3>
            </div>
            {renderList(notes.beginner.requiredSkills, <span className="text-blue-500">🎯</span>)}
          </Card3D>

          {/* Examples */}
          <Card3D hover={false}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📝</span>
              <h3 className="text-xl font-bold">Practical Examples</h3>
            </div>
            {renderList(notes.beginner.examples, <span className="text-green-500">✓</span>)}
          </Card3D>
        </TabsContent>

        {/* Intermediate Level */}
        <TabsContent value="intermediate" className="space-y-6">
          <Card3D hover={false} className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-2 border-blue-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                <Rocket className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Intermediate Level</h3>
                <p className="text-sm text-muted-foreground">Core skills and real-world application (6-18 months)</p>
              </div>
            </div>
          </Card3D>

          {/* Core Concepts */}
          <Card3D hover={false}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎓</span>
              <h3 className="text-xl font-bold">Core Concepts</h3>
            </div>
            {renderList(notes.intermediate.coreConcepts, <span className="text-blue-500">📚</span>)}
          </Card3D>

          {/* Tools & Technologies */}
          <Card3D hover={false}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🛠️</span>
              <h3 className="text-xl font-bold">Tools & Technologies</h3>
            </div>
            {renderList(notes.intermediate.toolsTech, <span className="text-purple-500">⚙️</span>)}
          </Card3D>

          {/* Real-World Usage */}
          <Card3D hover={false}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌍</span>
              <h3 className="text-xl font-bold">Real-World Applications</h3>
            </div>
            {renderList(notes.intermediate.realWorld, <span className="text-green-500">🚀</span>)}
          </Card3D>

          {/* Explanations */}
          <Card3D hover={false}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">💬</span>
              <h3 className="text-xl font-bold">Key Explanations</h3>
            </div>
            {renderList(notes.intermediate.explanations, <span className="text-orange-500">💡</span>)}
          </Card3D>
        </TabsContent>

        {/* Advanced Level */}
        <TabsContent value="advanced" className="space-y-6">
          <Card3D hover={false} className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-2 border-purple-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Advanced Level</h3>
                <p className="text-sm text-muted-foreground">Industry expertise and career growth (18+ months)</p>
              </div>
            </div>
          </Card3D>

          {/* Industry Practices */}
          <Card3D hover={false}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🏢</span>
              <h3 className="text-xl font-bold">Industry Practices</h3>
            </div>
            {renderList(notes.advanced.industryPractices, <span className="text-purple-500">⭐</span>)}
          </Card3D>

          {/* Real Projects */}
          <Card3D hover={false}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎯</span>
              <h3 className="text-xl font-bold">Real-World Projects</h3>
            </div>
            {renderList(notes.advanced.realProjects, <span className="text-blue-500">🔥</span>)}
          </Card3D>

          {/* Advanced Tools */}
          <Card3D hover={false}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔧</span>
              <h3 className="text-xl font-bold">Advanced Tools</h3>
            </div>
            {renderList(notes.advanced.advancedTools, <span className="text-green-500">⚡</span>)}
          </Card3D>

          {/* Career Growth */}
          <Card3D hover={false}>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">📈</span>
              <h3 className="text-xl font-bold">Career Growth Path</h3>
            </div>
            {renderList(notes.advanced.careerGrowth, <span className="text-pink-500">🚀</span>)}
          </Card3D>
        </TabsContent>
      </Tabs>
    </div>
  );
}
