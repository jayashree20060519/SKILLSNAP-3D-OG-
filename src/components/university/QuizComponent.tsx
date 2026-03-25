import { useState } from 'react';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Brain, Clock, Trophy, RotateCcw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
}

const quizQuestions: Record<string, Question[]> = {
  'cloud-computing': [
    {
      id: 1,
      question: 'What does IaaS stand for in cloud computing?',
      options: ['Internet as a Service', 'Infrastructure as a Service', 'Integration as a Service', 'Information as a Service'],
      correctAnswer: 1,
      subject: 'Cloud Computing',
    },
    {
      id: 2,
      question: 'Which cloud deployment model is accessible to the general public?',
      options: ['Private Cloud', 'Public Cloud', 'Hybrid Cloud', 'Community Cloud'],
      correctAnswer: 1,
      subject: 'Cloud Computing',
    },
    {
      id: 3,
      question: 'What is the main advantage of cloud computing?',
      options: ['Higher costs', 'Limited scalability', 'On-demand resource availability', 'Reduced security'],
      correctAnswer: 2,
      subject: 'Cloud Computing',
    },
    {
      id: 4,
      question: 'Which service model provides the most control to users?',
      options: ['SaaS', 'PaaS', 'IaaS', 'FaaS'],
      correctAnswer: 2,
      subject: 'Cloud Computing',
    },
    {
      id: 5,
      question: 'What is virtualization in cloud computing?',
      options: ['Creating physical servers', 'Creating virtual versions of resources', 'Deleting data', 'Encrypting files'],
      correctAnswer: 1,
      subject: 'Cloud Computing',
    },
  ],
  'iot': [
    {
      id: 1,
      question: 'What does IoT stand for?',
      options: ['Internet of Things', 'Integration of Technology', 'Interface of Tools', 'Internet of Technology'],
      correctAnswer: 0,
      subject: 'IoT',
    },
    {
      id: 2,
      question: 'Which protocol is commonly used in IoT for low-power communication?',
      options: ['HTTP', 'MQTT', 'FTP', 'SMTP'],
      correctAnswer: 1,
      subject: 'IoT',
    },
    {
      id: 3,
      question: 'What is a sensor in IoT?',
      options: ['A device that processes data', 'A device that detects physical changes', 'A storage device', 'A display device'],
      correctAnswer: 1,
      subject: 'IoT',
    },
    {
      id: 4,
      question: 'Which layer of IoT architecture handles data processing?',
      options: ['Perception Layer', 'Network Layer', 'Application Layer', 'Processing Layer'],
      correctAnswer: 3,
      subject: 'IoT',
    },
    {
      id: 5,
      question: 'What is edge computing in IoT?',
      options: ['Computing at the cloud', 'Computing near the data source', 'Computing on mobile devices', 'Computing on servers'],
      correctAnswer: 1,
      subject: 'IoT',
    },
  ],
  'advanced-networking': [
    {
      id: 1,
      question: 'What layer of the OSI model handles routing?',
      options: ['Physical Layer', 'Data Link Layer', 'Network Layer', 'Transport Layer'],
      correctAnswer: 2,
      subject: 'Networking',
    },
    {
      id: 2,
      question: 'What does TCP stand for?',
      options: ['Transfer Control Protocol', 'Transmission Control Protocol', 'Transport Connection Protocol', 'Technical Control Protocol'],
      correctAnswer: 1,
      subject: 'Networking',
    },
    {
      id: 3,
      question: 'Which IP address class is used for large networks?',
      options: ['Class A', 'Class B', 'Class C', 'Class D'],
      correctAnswer: 0,
      subject: 'Networking',
    },
    {
      id: 4,
      question: 'What is the purpose of a firewall?',
      options: ['Speed up network', 'Filter network traffic', 'Store data', 'Display websites'],
      correctAnswer: 1,
      subject: 'Networking',
    },
    {
      id: 5,
      question: 'What does DNS stand for?',
      options: ['Domain Name System', 'Data Network Service', 'Digital Name Server', 'Domain Network System'],
      correctAnswer: 0,
      subject: 'Networking',
    },
  ],
};

export function QuizComponent() {
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = (subject: string) => {
    setSelectedSubject(subject);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(60);
    
    // Start timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswer = () => {
    if (selectedAnswer === null) return;

    const questions = quizQuestions[selectedSubject!];
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    setShowResult(true);
    setQuizStarted(false);
  };

  const resetQuiz = () => {
    setSelectedSubject(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setTimeLeft(60);
    setQuizStarted(false);
  };

  if (!selectedSubject) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Subject Quiz</h2>
          <p className="text-muted-foreground">Choose a subject to start the quiz (5 questions, 60 seconds)</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card3D className="cursor-pointer hover:scale-105 transition-transform" onClick={() => startQuiz('cloud-computing')}>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center">
                <Brain className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold">Cloud Computing</h3>
              <Button className="w-full" asChild>
                <span>Start Quiz</span>
              </Button>
            </div>
          </Card3D>

          <Card3D className="cursor-pointer hover:scale-105 transition-transform" onClick={() => startQuiz('iot')}>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-purple-500/20 flex items-center justify-center">
                <Brain className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold">IoT</h3>
              <Button className="w-full" asChild>
                <span>Start Quiz</span>
              </Button>
            </div>
          </Card3D>

          <Card3D className="cursor-pointer hover:scale-105 transition-transform" onClick={() => startQuiz('advanced-networking')}>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-500/20 flex items-center justify-center">
                <Brain className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold">Advanced Networking</h3>
              <Button className="w-full" asChild>
                <span>Start Quiz</span>
              </Button>
            </div>
          </Card3D>
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = (score / 5) * 100;
    return (
      <Card3D className="max-w-2xl mx-auto text-center space-y-6 p-8">
        <Trophy className="h-20 w-20 mx-auto text-yellow-500" />
        <h2 className="text-3xl font-bold">Quiz Complete!</h2>
        <div className="space-y-2">
          <p className="text-5xl font-bold text-primary">{score}/5</p>
          <p className="text-xl text-muted-foreground">{percentage}% Correct</p>
        </div>
        <Progress value={percentage} className="h-4" />
        <div className="flex gap-4 justify-center">
          <Button onClick={resetQuiz} variant="outline">
            <RotateCcw className="h-4 w-4 mr-2" />
            Try Another Subject
          </Button>
          <Button onClick={() => startQuiz(selectedSubject)}>
            Retake Quiz
          </Button>
        </div>
      </Card3D>
    );
  }

  const questions = quizQuestions[selectedSubject];
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card3D hover={false} className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <span className="text-2xl font-bold">{timeLeft}s</span>
          </div>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
        <Progress value={progress} className="h-2 mb-6" />

        <div className="space-y-6">
          <h3 className="text-xl font-semibold">{question.question}</h3>

          <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => setSelectedAnswer(Number(value))}>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-4 rounded-lg border hover:bg-accent cursor-pointer">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>

          <div className="flex gap-4">
            <Button onClick={resetQuiz} variant="outline" className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleAnswer} disabled={selectedAnswer === null} className="flex-1">
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          </div>
        </div>
      </Card3D>
    </div>
  );
}
