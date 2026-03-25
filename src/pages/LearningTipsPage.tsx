import { useState } from 'react';
import { Layout } from '@/components/layouts/Layout';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { Lightbulb, BookOpen, Brain, Target, Zap, RefreshCw } from 'lucide-react';

const learningTips = [
  {
    category: 'Memory Techniques',
    icon: Brain,
    tips: [
      'Use the Memory Palace technique: Associate information with locations in a familiar place',
      'Create acronyms and mnemonics to remember lists and sequences',
      'Teach what you learn to someone else - it reinforces your understanding',
      'Use spaced repetition: Review material at increasing intervals (1 day, 3 days, 1 week, 1 month)',
      'Connect new information to what you already know',
    ],
  },
  {
    category: 'Study Strategies',
    icon: BookOpen,
    tips: [
      'Study in 25-50 minute blocks with 5-10 minute breaks (Pomodoro Technique)',
      'Eliminate distractions: Turn off phone notifications and social media',
      'Study the hardest subjects when your energy is highest',
      'Use active recall: Test yourself instead of just re-reading',
      'Create summary sheets and mind maps for complex topics',
    ],
  },
  {
    category: 'Focus & Productivity',
    icon: Target,
    tips: [
      'Start with the most challenging task when your mind is fresh',
      'Use the 2-minute rule: If it takes less than 2 minutes, do it now',
      'Break large projects into smaller, manageable tasks',
      'Set specific, measurable goals for each study session',
      'Use time-blocking to schedule your day in advance',
    ],
  },
  {
    category: 'Learning Optimization',
    icon: Zap,
    tips: [
      'Get 7-9 hours of sleep - sleep consolidates memories',
      'Exercise regularly - it improves brain function and memory',
      'Stay hydrated - dehydration impairs cognitive performance',
      'Take handwritten notes - it improves retention over typing',
      'Practice retrieval: Close your book and write what you remember',
    ],
  },
];

const motivationalQuotes = [
  {
    quote: 'The expert in anything was once a beginner.',
    author: 'Helen Hayes',
  },
  {
    quote: 'Education is the most powerful weapon which you can use to change the world.',
    author: 'Nelson Mandela',
  },
  {
    quote: 'The beautiful thing about learning is that no one can take it away from you.',
    author: 'B.B. King',
  },
  {
    quote: 'Success is the sum of small efforts repeated day in and day out.',
    author: 'Robert Collier',
  },
  {
    quote: 'The only way to do great work is to love what you do.',
    author: 'Steve Jobs',
  },
  {
    quote: 'Learning never exhausts the mind.',
    author: 'Leonardo da Vinci',
  },
  {
    quote: 'The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.',
    author: 'Brian Herbert',
  },
  {
    quote: 'Don\'t let what you cannot do interfere with what you can do.',
    author: 'John Wooden',
  },
];

export default function LearningTipsPage() {
  const [currentQuote, setCurrentQuote] = useState(0);

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Learning Tips</h1>
          <p className="text-muted-foreground">Proven strategies to boost your learning effectiveness</p>
        </div>

        {/* Motivational Quote */}
        <Card3D hover={false} className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="text-center space-y-4">
            <Lightbulb className="h-12 w-12 text-primary mx-auto" />
            <blockquote className="text-2xl font-semibold italic">
              "{motivationalQuotes[currentQuote].quote}"
            </blockquote>
            <p className="text-muted-foreground">— {motivationalQuotes[currentQuote].author}</p>
            <Button onClick={nextQuote} variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Next Quote
            </Button>
          </div>
        </Card3D>

        {/* Learning Tips by Category */}
        <div className="space-y-6">
          {learningTips.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card3D key={index} hover={false}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold">{category.category}</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {category.tips.map((tip, tipIndex) => (
                    <div key={tipIndex} className="flex items-start gap-3 p-4 bg-accent rounded-lg">
                      <span className="text-primary font-bold">{tipIndex + 1}.</span>
                      <p className="text-sm text-muted-foreground">{tip}</p>
                    </div>
                  ))}
                </div>
              </Card3D>
            );
          })}
        </div>

        {/* Quick Tips */}
        <div className="mt-8">
          <Card3D hover={false}>
            <h2 className="text-2xl font-bold mb-6">Quick Daily Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-green-500/10 rounded-lg text-center">
                <div className="text-3xl mb-2">🌅</div>
                <h3 className="font-bold mb-1">Morning Routine</h3>
                <p className="text-xs text-muted-foreground">Review yesterday's notes for 10 minutes</p>
              </div>
              <div className="p-4 bg-blue-500/10 rounded-lg text-center">
                <div className="text-3xl mb-2">💧</div>
                <h3 className="font-bold mb-1">Stay Hydrated</h3>
                <p className="text-xs text-muted-foreground">Drink water every hour while studying</p>
              </div>
              <div className="p-4 bg-purple-500/10 rounded-lg text-center">
                <div className="text-3xl mb-2">🚶</div>
                <h3 className="font-bold mb-1">Take Breaks</h3>
                <p className="text-xs text-muted-foreground">Walk for 5 minutes every hour</p>
              </div>
              <div className="p-4 bg-orange-500/10 rounded-lg text-center">
                <div className="text-3xl mb-2">😴</div>
                <h3 className="font-bold mb-1">Sleep Well</h3>
                <p className="text-xs text-muted-foreground">7-9 hours for optimal brain function</p>
              </div>
            </div>
          </Card3D>
        </div>

        {/* Study Environment Tips */}
        <div className="mt-8">
          <Card3D hover={false}>
            <h2 className="text-2xl font-bold mb-6">Create the Perfect Study Environment</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h3 className="font-bold text-lg">🪑 Physical Setup</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Comfortable chair with good back support</li>
                  <li>• Proper lighting to reduce eye strain</li>
                  <li>• Clean, organized desk space</li>
                  <li>• Room temperature around 20-22°C</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-lg">🔇 Minimize Distractions</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Turn off phone notifications</li>
                  <li>• Use website blockers for social media</li>
                  <li>• Inform family/roommates of study time</li>
                  <li>• Use noise-canceling headphones</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-lg">🎵 Background Sound</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Lo-fi music or white noise</li>
                  <li>• Nature sounds (rain, ocean waves)</li>
                  <li>• Binaural beats for focus</li>
                  <li>• Complete silence if preferred</li>
                </ul>
              </div>
            </div>
          </Card3D>
        </div>

        {/* Learning Resources */}
        <div className="mt-8">
          <Card3D hover={false}>
            <h2 className="text-2xl font-bold mb-6">Recommended Learning Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="https://www.coursera.org/learn/learning-how-to-learn"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <h3 className="font-bold mb-2">📚 Learning How to Learn</h3>
                <p className="text-sm text-muted-foreground">
                  Free Coursera course on effective learning techniques
                </p>
              </a>
              <a
                href="https://www.khanacademy.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <h3 className="font-bold mb-2">🎓 Khan Academy</h3>
                <p className="text-sm text-muted-foreground">
                  Free courses on various subjects with practice exercises
                </p>
              </a>
              <a
                href="https://www.notion.so/templates"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <h3 className="font-bold mb-2">📝 Notion Templates</h3>
                <p className="text-sm text-muted-foreground">
                  Study planners and note-taking templates
                </p>
              </a>
              <a
                href="https://www.youtube.com/c/ThomasFrankExplains"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <h3 className="font-bold mb-2">🎥 Thomas Frank</h3>
                <p className="text-sm text-muted-foreground">
                  YouTube channel with productivity and study tips
                </p>
              </a>
            </div>
          </Card3D>
        </div>
      </div>
    </Layout>
  );
}
