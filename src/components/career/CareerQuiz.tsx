import { useState } from 'react';
import { Card3D } from '@/components/ui/card-3d';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, Trophy, RotateCcw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface CareerQuizProps {
  career: string;
  questions: Question[];
}

export function CareerQuiz({ career, questions }: CareerQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers(new Array(questions.length).fill(null));
    setShowExplanation(false);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 60;

    return (
      <Card3D hover={false}>
        <div className="text-center space-y-6">
          <div className={`w-24 h-24 mx-auto rounded-full ${passed ? 'bg-green-500/20' : 'bg-orange-500/20'} flex items-center justify-center`}>
            <Trophy className={`h-12 w-12 ${passed ? 'text-green-500' : 'text-orange-500'}`} />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-2">Quiz Complete!</h2>
            <p className="text-muted-foreground">
              You scored {score} out of {questions.length} ({percentage.toFixed(0)}%)
            </p>
          </div>

          <div className="p-6 bg-accent rounded-lg">
            <div className="text-4xl font-bold mb-2">{percentage.toFixed(0)}%</div>
            <Progress value={percentage} className="h-3" />
            <p className="text-sm text-muted-foreground mt-2">
              {passed ? '🎉 Great job! You passed!' : '💪 Keep practicing to improve!'}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Performance Breakdown:</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <p className="text-green-600 font-bold">{score} Correct</p>
              </div>
              <div className="p-3 bg-red-500/10 rounded-lg">
                <p className="text-red-600 font-bold">{questions.length - score} Incorrect</p>
              </div>
            </div>
          </div>

          <Button onClick={resetQuiz} className="w-full">
            <RotateCcw className="h-4 w-4 mr-2" />
            Retake Quiz
          </Button>
        </div>
      </Card3D>
    );
  }

  const question = questions[currentQuestion];

  return (
    <Card3D hover={false}>
      <div className="space-y-6">
        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">Question {currentQuestion + 1} of {questions.length}</span>
            <span className="text-muted-foreground">{progress.toFixed(0)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <div>
          <h3 className="text-xl font-bold mb-4">{question.question}</h3>
          
          <RadioGroup value={selectedAnswer?.toString()} onValueChange={(value) => handleAnswerSelect(parseInt(value))}>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedAnswer === index ? 'border-primary bg-primary/5' : 'hover:bg-accent'
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                >
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={`p-4 rounded-lg border-l-4 ${
            selectedAnswer === question.correctAnswer 
              ? 'bg-green-500/10 border-green-500' 
              : 'bg-red-500/10 border-red-500'
          }`}>
            <div className="flex items-start gap-2 mb-2">
              {selectedAnswer === question.correctAnswer ? (
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-semibold mb-1">
                  {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect'}
                </p>
                <p className="text-sm text-muted-foreground">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex-1"
          >
            Previous
          </Button>
          
          {!showExplanation && selectedAnswer !== null && (
            <Button
              variant="outline"
              onClick={() => setShowExplanation(true)}
              className="flex-1"
            >
              Check Answer
            </Button>
          )}
          
          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="flex-1"
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </div>
    </Card3D>
  );
}
