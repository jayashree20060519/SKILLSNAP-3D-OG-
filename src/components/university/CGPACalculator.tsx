import { useState } from 'react';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: number;
}

export function CGPACalculator() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseName, setCourseName] = useState('');
  const [credits, setCredits] = useState('');
  const [grade, setGrade] = useState('');

  const addCourse = () => {
    if (!courseName || !credits || !grade) return;
    
    const newCourse: Course = {
      id: Date.now().toString(),
      name: courseName,
      credits: parseFloat(credits),
      grade: parseFloat(grade),
    };
    
    setCourses([...courses, newCourse]);
    setCourseName('');
    setCredits('');
    setGrade('');
  };

  const removeCourse = (id: string) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const calculateCGPA = () => {
    if (courses.length === 0) return 0;
    
    const totalPoints = courses.reduce((sum, course) => sum + (course.credits * course.grade), 0);
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : 0;
  };

  const getGradeColor = (cgpa: number) => {
    if (cgpa >= 3.5) return 'text-primary';
    if (cgpa >= 3.0) return 'text-secondary';
    if (cgpa >= 2.5) return 'text-muted-foreground';
    return 'text-destructive';
  };

  const cgpa = parseFloat(calculateCGPA().toString());

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">CGPA Calculator</h2>

      <Card3D hover={false} className="space-y-4">
        <h3 className="text-lg font-semibold">Add Course</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="course_name">Course Name</Label>
            <Input
              id="course_name"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
              placeholder="e.g., Data Structures"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="credits">Credits</Label>
            <Input
              id="credits"
              type="number"
              step="0.5"
              min="0"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              placeholder="3"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="grade">Grade (0-4)</Label>
            <Input
              id="grade"
              type="number"
              step="0.1"
              min="0"
              max="4"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="3.5"
            />
          </div>
        </div>
        <Button onClick={addCourse} className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Add Course
        </Button>
      </Card3D>

      {courses.length > 0 && (
        <>
          <Card3D hover={false} className="space-y-4">
            <h3 className="text-lg font-semibold">Your Courses</h3>
            <div className="space-y-2">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="flex justify-between items-center p-3 rounded-lg bg-accent/50"
                >
                  <div className="flex-1">
                    <p className="font-medium">{course.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Credits: {course.credits} | Grade: {course.grade}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeCourse(course.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </Card3D>

          <Card3D hover={false} className="text-center space-y-4">
            <h3 className="text-lg font-semibold">Your CGPA</h3>
            <div className={`text-6xl font-bold ${getGradeColor(cgpa)}`}>
              {cgpa}
            </div>
            <div className="text-sm text-muted-foreground">
              <p>Total Credits: {courses.reduce((sum, c) => sum + c.credits, 0)}</p>
              <p>Total Courses: {courses.length}</p>
            </div>
            <div className="pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground mb-2">Grade Scale:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                <div>A: 3.5-4.0</div>
                <div>B: 3.0-3.49</div>
                <div>C: 2.5-2.99</div>
                <div>D: 2.0-2.49</div>
              </div>
            </div>
          </Card3D>
        </>
      )}

      {courses.length === 0 && (
        <Card3D hover={false} className="text-center py-12">
          <p className="text-muted-foreground">Add courses to calculate your CGPA</p>
        </Card3D>
      )}
    </div>
  );
}
