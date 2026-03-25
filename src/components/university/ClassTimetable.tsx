import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { timetableApi } from '@/db/api';
import type { Timetable } from '@/types';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function ClassTimetable() {
  const { user } = useAuth();
  const [timetable, setTimetable] = useState<Timetable[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    course_name: '',
    course_code: '',
    day_of_week: '1',
    start_time: '',
    end_time: '',
    location: '',
    instructor: '',
  });

  useEffect(() => {
    if (user) {
      loadTimetable();
    }
  }, [user]);

  const loadTimetable = async () => {
    try {
      const data = await timetableApi.getTimetable(user!.id);
      setTimetable(data);
    } catch (error) {
      toast.error('Failed to load timetable');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await timetableApi.createTimetableEntry({
        user_id: user!.id,
        course_name: formData.course_name,
        course_code: formData.course_code || null,
        day_of_week: parseInt(formData.day_of_week),
        start_time: formData.start_time,
        end_time: formData.end_time,
        location: formData.location || null,
        instructor: formData.instructor || null,
      });
      toast.success('Class added successfully');
      setDialogOpen(false);
      setFormData({
        course_name: '',
        course_code: '',
        day_of_week: '1',
        start_time: '',
        end_time: '',
        location: '',
        instructor: '',
      });
      loadTimetable();
    } catch (error) {
      toast.error('Failed to add class');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await timetableApi.deleteTimetableEntry(id);
      toast.success('Class deleted');
      loadTimetable();
    } catch (error) {
      toast.error('Failed to delete class');
    }
  };

  const groupByDay = () => {
    const grouped: { [key: number]: Timetable[] } = {};
    timetable.forEach((entry) => {
      if (!grouped[entry.day_of_week]) {
        grouped[entry.day_of_week] = [];
      }
      grouped[entry.day_of_week].push(entry);
    });
    return grouped;
  };

  if (loading) {
    return <div className="text-center py-8">Loading timetable...</div>;
  }

  const groupedTimetable = groupByDay();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Class Timetable</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="course_name">Course Name</Label>
                <Input
                  id="course_name"
                  value={formData.course_name}
                  onChange={(e) => setFormData({ ...formData, course_name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course_code">Course Code</Label>
                <Input
                  id="course_code"
                  value={formData.course_code}
                  onChange={(e) => setFormData({ ...formData, course_code: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="day_of_week">Day of Week</Label>
                <Select value={formData.day_of_week} onValueChange={(value) => setFormData({ ...formData, day_of_week: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DAYS.map((day, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start_time">Start Time</Label>
                  <Input
                    id="start_time"
                    type="time"
                    value={formData.start_time}
                    onChange={(e) => setFormData({ ...formData, start_time: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_time">End Time</Label>
                  <Input
                    id="end_time"
                    type="time"
                    value={formData.end_time}
                    onChange={(e) => setFormData({ ...formData, end_time: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                />
              </div>
              <Button type="submit" className="w-full">Add Class</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {timetable.length === 0 ? (
        <Card3D hover={false} className="text-center py-12">
          <p className="text-muted-foreground">No classes scheduled. Add your first class!</p>
        </Card3D>
      ) : (
        <div className="space-y-4">
          {DAYS.map((day, dayIndex) => {
            const dayClasses = groupedTimetable[dayIndex] || [];
            if (dayClasses.length === 0) return null;

            return (
              <Card3D key={dayIndex} hover={false} className="space-y-3">
                <h3 className="text-xl font-bold text-primary">{day}</h3>
                <div className="space-y-2">
                  {dayClasses.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex justify-between items-start p-3 rounded-lg bg-accent/50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{entry.course_name}</span>
                          {entry.course_code && (
                            <span className="text-xs text-muted-foreground">
                              ({entry.course_code})
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {entry.start_time} - {entry.end_time}
                        </p>
                        {entry.location && (
                          <p className="text-sm text-muted-foreground">📍 {entry.location}</p>
                        )}
                        {entry.instructor && (
                          <p className="text-sm text-muted-foreground">👤 {entry.instructor}</p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(entry.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card3D>
            );
          })}
        </div>
      )}
    </div>
  );
}
