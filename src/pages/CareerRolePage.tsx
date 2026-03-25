import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layouts/Layout';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  BookOpen, 
  Code, 
  Zap, 
  Map, 
  Video, 
  ExternalLink,
  DollarSign,
  GraduationCap,
  Rocket,
  Trophy,
  Target,
  Briefcase
} from 'lucide-react';
import { careersData } from '@/data/completeCareerData';
import { CareerNotesView } from '@/components/career/CareerNotesView';
import { PracticeLab } from '@/components/career/PracticeLab';
import { HackathonMode } from '@/components/career/HackathonMode';
import { VisualRoadmap } from '@/components/career/VisualRoadmap';

export default function CareerRolePage() {
  const { roleId } = useParams<{ roleId: string }>();
  const navigate = useNavigate();

  const career = roleId ? careersData[roleId] : null;

  if (!career) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card3D>
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Career Not Found</h2>
              <p className="text-muted-foreground">The career path you're looking for doesn't exist.</p>
              <Button onClick={() => navigate('/career')}>
                Back to Career Hub
              </Button>
            </div>
          </Card3D>
        </div>
      </Layout>
    );
  }

  // Convert roadmap data to VisualRoadmap format
  const roadmapStages = career.roadmap.map((stage) => ({
    icon: stage.icon === 'GraduationCap' ? GraduationCap :
          stage.icon === 'Code' ? Code :
          stage.icon === 'Rocket' ? Rocket :
          stage.icon === 'Target' ? Target :
          stage.icon === 'Briefcase' ? Briefcase :
          stage.icon === 'Layout' ? BookOpen :
          stage.icon === 'Zap' ? Zap :
          stage.icon === 'Server' ? Code :
          stage.icon === 'Layers' ? Code :
          stage.icon === 'Database' ? Code :
          stage.icon === 'BarChart' ? Trophy :
          stage.icon === 'Palette' ? Trophy :
          GraduationCap,
    title: stage.stage,
    description: stage.outcome,
    duration: stage.duration,
    color: stage.stage.includes('Foundation') || stage.stage.includes('Beginner') ? 'bg-green-500' :
           stage.stage.includes('Core') || stage.stage.includes('SQL') || stage.stage.includes('Frontend') ? 'bg-blue-500' :
           stage.stage.includes('Advanced') || stage.stage.includes('Visualization') || stage.stage.includes('Backend') ? 'bg-purple-500' :
           stage.stage.includes('Specialization') || stage.stage.includes('Python') || stage.stage.includes('Integration') ? 'bg-orange-500' :
           stage.stage.includes('Job') || stage.stage.includes('Design') ? 'bg-pink-500' :
           'bg-primary',
    items: [...stage.skills, ...stage.tools]
  }));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/career')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Career Hub
          </Button>

          <Card3D hover={false} className={`bg-gradient-to-r ${career.gradient} bg-opacity-10 border-2`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-4xl font-bold mb-2">{career.title}</h1>
                <p className="text-lg text-muted-foreground mb-4">{career.description}</p>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    Entry: {career.salary.entry}
                  </Badge>
                  <Badge variant="outline" className="text-blue-600 border-blue-600">
                    Mid: {career.salary.mid}
                  </Badge>
                  <Badge variant="outline" className="text-purple-600 border-purple-600">
                    Senior: {career.salary.senior}
                  </Badge>
                </div>
              </div>
              <div className={`hidden md:block w-20 h-20 rounded-2xl bg-gradient-to-br ${career.gradient} p-5 flex items-center justify-center`}>
                {career.icon === 'Code' && <Code className="h-10 w-10 text-white" />}
                {career.icon === 'BarChart' && <Trophy className="h-10 w-10 text-white" />}
                {career.icon === 'Layers' && <Code className="h-10 w-10 text-white" />}
                {career.icon === 'Palette' && <Trophy className="h-10 w-10 text-white" />}
              </div>
            </div>
          </Card3D>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="glass-card w-full justify-start overflow-x-auto flex-wrap h-auto">
            <TabsTrigger value="overview" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="notes" className="gap-2">
              <GraduationCap className="h-4 w-4" />
              Notes
            </TabsTrigger>
            <TabsTrigger value="practice" className="gap-2">
              <Code className="h-4 w-4" />
              Practice Lab
            </TabsTrigger>
            <TabsTrigger value="hackathon" className="gap-2">
              <Zap className="h-4 w-4" />
              Hackathon
            </TabsTrigger>
            <TabsTrigger value="roadmap" className="gap-2">
              <Map className="h-4 w-4" />
              Roadmap
            </TabsTrigger>
            <TabsTrigger value="videos" className="gap-2">
              <Video className="h-4 w-4" />
              Videos
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card3D hover={false}>
              <h2 className="text-2xl font-bold mb-4">About This Career</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {career.notes.beginner.whatIs}
              </p>
            </Card3D>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card3D hover={false}>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="font-bold">Learning Path</h3>
                  <p className="text-sm text-muted-foreground">
                    {career.roadmap.length} stages from beginner to expert
                  </p>
                </div>
              </Card3D>

              <Card3D hover={false}>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Code className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="font-bold">Practice Challenges</h3>
                  <p className="text-sm text-muted-foreground">
                    {career.practiceChallenges.length} hands-on projects to build
                  </p>
                </div>
              </Card3D>

              <Card3D hover={false}>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Video className="h-6 w-6 text-purple-500" />
                  </div>
                  <h3 className="font-bold">Video Resources</h3>
                  <p className="text-sm text-muted-foreground">
                    {career.videos.length} curated learning videos
                  </p>
                </div>
              </Card3D>
            </div>

            {/* Salary Overview */}
            <Card3D hover={false}>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-green-500" />
                Salary Overview (Indian Market)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                  <p className="text-sm text-muted-foreground mb-1">Entry Level (0-2 years)</p>
                  <p className="text-2xl font-bold text-green-600">{career.salary.entry}</p>
                </div>
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <p className="text-sm text-muted-foreground mb-1">Mid Level (3-7 years)</p>
                  <p className="text-2xl font-bold text-blue-600">{career.salary.mid}</p>
                </div>
                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <p className="text-sm text-muted-foreground mb-1">Senior Level (8+ years)</p>
                  <p className="text-2xl font-bold text-purple-600">{career.salary.senior}</p>
                </div>
              </div>
            </Card3D>

            {/* Call to Action */}
            <Card3D hover={false} className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">Ready to Start Your Journey?</h2>
                <p className="text-muted-foreground">
                  Explore comprehensive notes, practice with real projects, and master {career.title}
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button onClick={() => {
                    const notesTab = document.querySelector('[value="notes"]') as HTMLElement;
                    notesTab?.click();
                  }}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Start Learning
                  </Button>
                  <Button variant="outline" onClick={() => {
                    const practiceTab = document.querySelector('[value="practice"]') as HTMLElement;
                    practiceTab?.click();
                  }}>
                    <Code className="h-4 w-4 mr-2" />
                    Practice Now
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/ai-mentor')}>
                    Ask AI Mentor
                  </Button>
                </div>
              </div>
            </Card3D>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes">
            <CareerNotesView notes={career.notes} careerTitle={career.title} />
          </TabsContent>

          {/* Practice Lab Tab */}
          <TabsContent value="practice">
            <PracticeLab challenges={career.practiceChallenges} careerType={career.id} />
          </TabsContent>

          {/* Hackathon Mode Tab */}
          <TabsContent value="hackathon">
            <HackathonMode challenges={career.hackathonChallenges} />
          </TabsContent>

          {/* Roadmap Tab */}
          <TabsContent value="roadmap">
            <VisualRoadmap stages={roadmapStages} />
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold gradient-text mb-2">Learning Videos</h2>
              <p className="text-muted-foreground">
                Curated video resources to accelerate your learning journey
              </p>
            </div>

            {career.videos && career.videos.filter(v => v.videoId && v.videoId.trim()).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {career.videos.filter(v => v.videoId && v.videoId.trim()).map((video, index) => (
                  <Card3D key={index} hover={false}>
                    <div className="space-y-4">
                      {/* Video Embed */}
                      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                          className="absolute top-0 left-0 w-full h-full rounded-lg"
                          src={`https://www.youtube.com/embed/${video.videoId}`}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>

                      {/* Video Info */}
                      <div>
                        <h3 className="font-bold mb-2">{video.title}</h3>
                        
                        {/* Why This Video is Useful */}
                        <div className="mb-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                          <p className="text-sm font-semibold text-blue-600 mb-1">💡 Why watch this:</p>
                          <p className="text-sm text-muted-foreground">{video.description}</p>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline">⏱️ {video.duration}</Badge>
                          <a
                            href={`https://www.youtube.com/watch?v=${video.videoId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-primary transition-colors"
                          >
                            Watch on YouTube
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </Card3D>
                ))}
              </div>
            ) : (
              <Card3D hover={false} className="text-center py-12">
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-muted flex items-center justify-center">
                    <Video className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Video Resources Coming Soon</h3>
                    <p className="text-muted-foreground max-w-md mx-auto">
                      We're curating the best video tutorials for this career path. Check back soon!
                    </p>
                  </div>
                </div>
              </Card3D>
            )}

            {/* Additional Resources */}
            <Card3D hover={false} className="bg-gradient-to-r from-blue-500/10 to-purple-500/10">
              <div className="text-center space-y-3">
                <Video className="h-12 w-12 mx-auto text-primary" />
                <h3 className="text-xl font-bold">Want More Resources?</h3>
                <p className="text-sm text-muted-foreground">
                  Check out our AI Mentor for personalized learning recommendations
                </p>
                <Button variant="outline" onClick={() => navigate('/ai-mentor')}>
                  Ask AI Mentor
                </Button>
              </div>
            </Card3D>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
