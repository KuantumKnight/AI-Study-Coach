import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Brain, CheckCircle, XCircle, Trophy } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (score: number, xp: number, coins: number) => void;
}

const sampleQuestions: Question[] = [
  // General Knowledge Questions
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  {
    id: 3,
    question: "Who painted the Mona Lisa?",
    options: ["Van Gogh", "Picasso", "Da Vinci", "Monet"],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: 3
  },
  {
    id: 5,
    question: "Which country is known as the Land of the Rising Sun?",
    options: ["China", "Japan", "Korea", "Thailand"],
    correctAnswer: 1
  },
  {
    id: 6,
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2
  },
  {
    id: 7,
    question: "Which gas makes up most of Earth's atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: 2
  },
  {
    id: 8,
    question: "What is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "Liechtenstein", "San Marino"],
    correctAnswer: 1
  },
  {
    id: 9,
    question: "Which element has the atomic number 1?",
    options: ["Helium", "Hydrogen", "Lithium", "Carbon"],
    correctAnswer: 1
  },
  {
    id: 10,
    question: "What is the currency of Japan?",
    options: ["Won", "Yuan", "Yen", "Baht"],
    correctAnswer: 2
  },
  {
    id: 11,
    question: "Which mountain is the highest in the world?",
    options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
    correctAnswer: 1
  },
  {
    id: 12,
    question: "What is the largest mammal in the world?",
    options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correctAnswer: 1
  },
  {
    id: 13,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Mercury", "Earth", "Mars"],
    correctAnswer: 1
  },
  {
    id: 14,
    question: "What is the longest river in the world?",
    options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    correctAnswer: 1
  },
  {
    id: 15,
    question: "Which country has the most natural lakes?",
    options: ["Russia", "Canada", "Finland", "United States"],
    correctAnswer: 1
  },
  {
    id: 16,
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Quartz"],
    correctAnswer: 2
  },
  {
    id: 17,
    question: "Which organ produces insulin?",
    options: ["Liver", "Pancreas", "Kidney", "Stomach"],
    correctAnswer: 1
  },
  {
    id: 18,
    question: "What is the speed of light in vacuum?",
    options: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
    correctAnswer: 0
  },
  {
    id: 19,
    question: "Which country is home to the kangaroo?",
    options: ["New Zealand", "Australia", "South Africa", "Brazil"],
    correctAnswer: 1
  },
  {
    id: 20,
    question: "What is the largest desert in the world?",
    options: ["Gobi", "Sahara", "Antarctic", "Arabian"],
    correctAnswer: 2
  },
  // Math Questions
  {
    id: 21,
    question: "What is 15 × 8?",
    options: ["120", "110", "130", "140"],
    correctAnswer: 0
  },
  {
    id: 22,
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    correctAnswer: 2
  },
  {
    id: 23,
    question: "What is 25% of 200?",
    options: ["40", "50", "60", "75"],
    correctAnswer: 1
  },
  {
    id: 24,
    question: "What is 7² + 3²?",
    options: ["58", "52", "49", "56"],
    correctAnswer: 0
  },
  {
    id: 25,
    question: "What is the value of π (pi) to 2 decimal places?",
    options: ["3.14", "3.15", "3.16", "3.13"],
    correctAnswer: 0
  },
  {
    id: 26,
    question: "What is 144 ÷ 12?",
    options: ["10", "11", "12", "13"],
    correctAnswer: 2
  },
  {
    id: 27,
    question: "What is 5! (5 factorial)?",
    options: ["100", "120", "150", "200"],
    correctAnswer: 1
  },
  {
    id: 28,
    question: "What is the area of a circle with radius 7? (Use π = 22/7)",
    options: ["154", "147", "161", "168"],
    correctAnswer: 0
  },
  {
    id: 29,
    question: "What is 2³ + 3²?",
    options: ["15", "17", "19", "21"],
    correctAnswer: 1
  },
  {
    id: 30,
    question: "What is the next number in the sequence: 2, 4, 8, 16, ?",
    options: ["24", "32", "28", "20"],
    correctAnswer: 1
  },
  {
    id: 31,
    question: "What is 1/2 + 1/4?",
    options: ["1/6", "2/6", "3/4", "1/4"],
    correctAnswer: 2
  },
  {
    id: 32,
    question: "What is the perimeter of a square with side length 5?",
    options: ["20", "25", "15", "10"],
    correctAnswer: 0
  },
  {
    id: 33,
    question: "What is 3 × 4 + 2 × 5?",
    options: ["22", "24", "26", "28"],
    correctAnswer: 0
  },
  {
    id: 34,
    question: "What is the greatest common factor of 12 and 18?",
    options: ["3", "6", "9", "12"],
    correctAnswer: 1
  },
  {
    id: 35,
    question: "What is 0.5 × 0.2?",
    options: ["0.1", "0.01", "1.0", "0.2"],
    correctAnswer: 0
  },
  {
    id: 36,
    question: "What is the slope of the line y = 2x + 3?",
    options: ["2", "3", "5", "1"],
    correctAnswer: 0
  },
  {
    id: 37,
    question: "What is 10% of 150?",
    options: ["10", "15", "20", "25"],
    correctAnswer: 1
  },
  {
    id: 38,
    question: "What is the volume of a cube with side length 3?",
    options: ["9", "18", "27", "36"],
    correctAnswer: 2
  },
  {
    id: 39,
    question: "What is 2 + 2 × 3?",
    options: ["8", "12", "10", "6"],
    correctAnswer: 0
  },
  {
    id: 40,
    question: "What is the median of 1, 3, 5, 7, 9?",
    options: ["3", "5", "7", "9"],
    correctAnswer: 1
  }
];

export const QuizModal = ({ open, onOpenChange, onComplete }: QuizModalProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(10).fill(null));

  // Select 10 random questions when quiz starts
  const getRandomQuestions = () => {
    const shuffled = [...sampleQuestions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 10);
  };

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / 10) * 100;

  // Initialize quiz questions when modal opens
  useEffect(() => {
    if (open && quizQuestions.length === 0) {
      setQuizQuestions(getRandomQuestions());
    }
  }, [open, quizQuestions.length]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (!answered) {
      setSelectedAnswer(answerIndex);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !question) return;
    
    setAnswered(true);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (selectedAnswer === question.correctAnswer) {
      setScore(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestion < 9) { // 10 questions total (0-9)
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setAnswered(false);
      } else {
        // Quiz complete
        const finalScore = selectedAnswer === question.correctAnswer ? score + 1 : score;
        const xpEarned = finalScore * 50;
        const coinsEarned = finalScore * 25;
        setShowResult(true);
        onComplete(finalScore, xpEarned, coinsEarned);
      }
    }, 1500);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnswered(false);
    setAnswers(new Array(10).fill(null));
    setQuizQuestions(getRandomQuestions());
  };

  const handleClose = () => {
    resetQuiz();
    onOpenChange(false);
  };

  if (!question) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md bg-gradient-secondary text-white border-0">
          <div className="text-center p-6">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <h2 className="text-xl font-bold">Loading Quiz...</h2>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (showResult) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md bg-gradient-success text-white border-0">
          <div className="text-center p-6">
            <Trophy className="w-20 h-20 text-accent mx-auto mb-6 animate-bounce-subtle" />
            <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
            <div className="space-y-4">
              <div className="text-6xl font-bold text-accent animate-pulse-reward">
                {score}/10
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/10 rounded-lg">
                  <p className="text-sm opacity-75">XP Earned</p>
                  <p className="text-2xl font-bold text-accent">+{score * 50}</p>
                </div>
                <div className="p-4 bg-white/10 rounded-lg">
                  <p className="text-sm opacity-75">Coins Earned</p>
                  <p className="text-2xl font-bold text-accent">+{score * 25}</p>
                </div>
              </div>
              <Button 
                onClick={handleClose} 
                className="bg-white text-success hover:bg-white/90 w-full mt-6"
              >
                Continue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-gradient-secondary text-white border-0">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <Brain className="w-8 h-8 mr-3 text-accent" />
            Knowledge Quiz
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="text-sm opacity-75">Question {currentQuestion + 1} of 10</span>
            <span className="text-sm font-medium">{Math.round(progress)}% Complete</span>
          </div>
          
          <Progress value={progress} className="h-2" />

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
            <h3 className="text-xl font-semibold mb-6">{question.question}</h3>
            
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left justify-start p-4 h-auto border-white/20 text-white hover:bg-primary/20 transition-all ${
                    selectedAnswer === index 
                      ? answered 
                        ? index === question.correctAnswer 
                          ? 'bg-success/20 border-success' 
                          : 'bg-destructive/20 border-destructive'
                        : 'bg-white/20 border-white/40'
                      : answered && index === question.correctAnswer
                        ? 'bg-success/20 border-success'
                        : ''
                  }`}
                  disabled={answered}
                >
                  <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                  <span>{option}</span>
                  {answered && selectedAnswer === index && (
                    <div className="ml-auto">
                      {index === question.correctAnswer ? (
                        <CheckCircle className="w-6 h-6 text-success" />
                      ) : (
                        <XCircle className="w-6 h-6 text-destructive" />
                      )}
                    </div>
                  )}
                  {answered && index === question.correctAnswer && selectedAnswer !== index && (
                    <CheckCircle className="w-6 h-6 text-success ml-auto" />
                  )}
                </Button>
              ))}
            </div>
          </Card>

          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="border-white/20 text-white hover:bg-primary/20"
            >
              Cancel Quiz
            </Button>
            <Button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null || answered}
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-reward"
            >
              {answered ? 'Processing...' : 'Submit Answer'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};