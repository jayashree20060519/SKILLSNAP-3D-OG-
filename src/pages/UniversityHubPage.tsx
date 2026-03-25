import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layouts/Layout';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Calendar, FileText, Clock, Calculator, Brain } from 'lucide-react';
import { AssignmentTracker } from '@/components/university/AssignmentTracker';
import { ExamCountdown } from '@/components/university/ExamCountdown';
import { SubjectCards } from '@/components/university/SubjectCards';
import { ClassTimetable } from '@/components/university/ClassTimetable';
import { CGPACalculator } from '@/components/university/CGPACalculator';
import { QuizComponent } from '@/components/university/QuizComponent';

export default function UniversityHubPage() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('assignments');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">University Hub</h1>
          <p className="text-muted-foreground">Manage your academic life in one place</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="glass-card w-full justify-start overflow-x-auto">
            <TabsTrigger value="assignments" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Assignments
            </TabsTrigger>
            <TabsTrigger value="exams" className="gap-2">
              <Calendar className="h-4 w-4" />
              Exams
            </TabsTrigger>
            <TabsTrigger value="notes" className="gap-2">
              <FileText className="h-4 w-4" />
              Subjects
            </TabsTrigger>
            <TabsTrigger value="quiz" className="gap-2">
              <Brain className="h-4 w-4" />
              Quiz
            </TabsTrigger>
            <TabsTrigger value="timetable" className="gap-2">
              <Clock className="h-4 w-4" />
              Timetable
            </TabsTrigger>
            <TabsTrigger value="cgpa" className="gap-2">
              <Calculator className="h-4 w-4" />
              CGPA
            </TabsTrigger>
          </TabsList>

          <TabsContent value="assignments">
            <AssignmentTracker />
          </TabsContent>

          <TabsContent value="exams">
            <ExamCountdown />
          </TabsContent>

          <TabsContent value="notes">
            <SubjectCards />
          </TabsContent>

          <TabsContent value="quiz">
            <QuizComponent />
          </TabsContent>

          <TabsContent value="timetable">
            <ClassTimetable />
          </TabsContent>

          <TabsContent value="cgpa">
            <CGPACalculator />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
