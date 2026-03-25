// @ts-nocheck
import { useState, Suspense, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layouts/Layout';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, BookOpen, Box, Lightbulb, Cpu, CheckCircle, Briefcase, MessageSquare } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { subjectContents } from '@/data/subjectContent';

// Lazy load 3D components for performance
const CloudComputingDiagram = lazy(() => import('@/components/3d/CloudComputingDiagram').then(m => ({ default: m.CloudComputingDiagram })));
const NetworkingDiagram = lazy(() => import('@/components/3d/NetworkingDiagram').then(m => ({ default: m.NetworkingDiagram })));
const IoTDiagram = lazy(() => import('@/components/3d/IoTDiagram').then(m => ({ default: m.IoTDiagram })));

export default function SubjectDetailPage() {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();
  const [selectedNode, setSelectedNode] = useState<any>(null);

  const subject = subjectId ? subjectContents[subjectId] : null;

  if (!subject) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card3D className="text-center py-12">
            <p className="text-muted-foreground">Subject not found</p>
            <Button onClick={() => navigate('/university')} className="mt-4">
              Back to University Hub
            </Button>
          </Card3D>
        </div>
      </Layout>
    );
  }

  const get3DDiagram = () => {
    switch (subjectId) {
      case 'cloud-computing':
        return <CloudComputingDiagram onNodeClick={setSelectedNode} />;
      case 'advanced-networking':
        return <NetworkingDiagram onNodeClick={setSelectedNode} />;
      case 'iot':
        return <IoTDiagram onNodeClick={setSelectedNode} />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={() => navigate('/university')} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to University Hub
        </Button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">{subject.title}</h1>
          <p className="text-muted-foreground text-lg">{subject.description}</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="3d-visualization">3D Visualization</TabsTrigger>
            <TabsTrigger value="deep-dive">Deep Dive</TabsTrigger>
            <TabsTrigger value="interview">Interview Prep</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Introduction */}
            <Card3D hover={false}>
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Introduction</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {subject.introduction}
              </p>
            </Card3D>

            {/* Core Concepts */}
            <Card3D hover={false}>
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="h-6 w-6 text-secondary" />
                <h2 className="text-2xl font-bold">Core Concepts</h2>
              </div>
              <div className="space-y-6">
                {subject.coreConcepts.map((concept, index) => (
                  <div key={index} className="p-4 bg-accent rounded-lg">
                    <h3 className="text-xl font-bold mb-3 text-primary">{concept.title}</h3>
                    <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {concept.content}
                    </p>
                  </div>
                ))}
              </div>
            </Card3D>

            {/* Real-World Examples */}
            <Card3D hover={false}>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Real-World Examples</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {subject.realWorldExamples.map((example, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                    <p className="text-sm text-muted-foreground">{example}</p>
                  </div>
                ))}
              </div>
            </Card3D>
          </TabsContent>

          {/* 3D Visualization Tab */}
          <TabsContent value="3d-visualization" className="space-y-6">
            <Card3D hover={false}>
              <div className="flex items-center gap-2 mb-4">
                <Box className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Interactive 3D Architecture</h2>
              </div>
              <p className="text-muted-foreground mb-4">
                Explore the architecture interactively. Click on components to learn more. Use mouse to rotate, zoom, and pan.
              </p>
              
              {/* 3D Canvas */}
              <div className="w-full h-[500px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden">
                <Suspense fallback={
                  <div className="w-full h-full flex items-center justify-center text-white">
                    Loading 3D Visualization...
                  </div>
                }>
                  <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
                    <OrbitControls enableDamping dampingFactor={0.05} />
                    {get3DDiagram()}
                  </Canvas>
                </Suspense>
              </div>

              {/* Selected Node Info */}
              {selectedNode && (
                <div className="mt-4 p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
                  <h3 className="font-bold text-lg mb-2">{selectedNode.label}</h3>
                  <p className="text-sm text-muted-foreground">{selectedNode.description}</p>
                </div>
              )}

              {/* Controls Info */}
              <div className="mt-4 p-4 bg-accent rounded-lg">
                <h3 className="font-semibold mb-2">Controls:</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>🖱️ <strong>Left Click + Drag</strong>: Rotate view</li>
                  <li>🖱️ <strong>Right Click + Drag</strong>: Pan view</li>
                  <li>🖱️ <strong>Scroll Wheel</strong>: Zoom in/out</li>
                  <li>🖱️ <strong>Click on Components</strong>: View details</li>
                </ul>
              </div>
            </Card3D>
          </TabsContent>

          {/* Deep Dive Tab */}
          <TabsContent value="deep-dive" className="space-y-6">
            {/* Architecture */}
            <Card3D hover={false}>
              <div className="flex items-center gap-2 mb-4">
                <Cpu className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Architecture</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {subject.architecture.content}
              </p>
            </Card3D>

            {/* Components */}
            <Card3D hover={false}>
              <h2 className="text-2xl font-bold mb-4">Key Components</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subject.components.map((component, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-accent transition-colors">
                    <h3 className="font-bold text-lg mb-2 text-primary">{component.name}</h3>
                    <p className="text-sm text-muted-foreground">{component.description}</p>
                  </div>
                ))}
              </div>
            </Card3D>

            {/* How It Works */}
            <Card3D hover={false}>
              <h2 className="text-2xl font-bold mb-4">How It Works</h2>
              <div className="space-y-4">
                {subject.howItWorks.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card3D>

            {/* Advantages & Limitations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card3D hover={false}>
                <h2 className="text-2xl font-bold mb-4 text-green-600">Advantages</h2>
                <ul className="space-y-2">
                  {subject.advantages.map((advantage, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{advantage}</span>
                    </li>
                  ))}
                </ul>
              </Card3D>

              <Card3D hover={false}>
                <h2 className="text-2xl font-bold mb-4 text-orange-600">Limitations</h2>
                <ul className="space-y-2">
                  {subject.limitations.map((limitation, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-orange-600 flex-shrink-0">⚠️</span>
                      <span className="text-sm text-muted-foreground">{limitation}</span>
                    </li>
                  ))}
                </ul>
              </Card3D>
            </div>

            {/* Use Cases */}
            <Card3D hover={false}>
              <h2 className="text-2xl font-bold mb-4">Industry Use Cases</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {subject.useCases.map((useCase, index) => (
                  <div key={index} className="p-3 bg-accent rounded-lg">
                    <p className="text-sm text-muted-foreground">{useCase}</p>
                  </div>
                ))}
              </div>
            </Card3D>
          </TabsContent>

          {/* Interview Prep Tab */}
          <TabsContent value="interview" className="space-y-6">
            <Card3D hover={false}>
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Interview-Level Understanding</h2>
              </div>
              <p className="text-muted-foreground mb-6">
                Master these key points to ace technical interviews and demonstrate deep understanding.
              </p>
              <div className="space-y-4">
                {subject.interviewPoints.map((point, index) => (
                  <div key={index} className="p-4 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </span>
                      <p className="text-muted-foreground flex-1">{point}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card3D>

            {/* Call to Action */}
            <Card3D hover={false} className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <div className="text-center space-y-4">
                <h2 className="text-2xl font-bold">Ready to Test Your Knowledge?</h2>
                <p className="text-muted-foreground">
                  Take the quiz to assess your understanding and identify areas for improvement.
                </p>
                <Button onClick={() => navigate(`/university/${subjectId}`)}>
                  Take Quiz
                </Button>
              </div>
            </Card3D>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
