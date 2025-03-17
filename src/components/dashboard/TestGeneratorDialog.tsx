
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogClose 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Check, BookOpen } from 'lucide-react';

// Mock data for exam types - in a real app, this would come from an API
const EXAM_TYPES = [
  { id: 'upsc', name: 'UPSC Civil Services' },
  { id: 'ssc-cgl', name: 'SSC CGL' },
  { id: 'ssc-chsl', name: 'SSC CHSL' },
  { id: 'ibps-po', name: 'IBPS PO' },
  { id: 'ibps-clerk', name: 'IBPS Clerk' },
  { id: 'rrb-ntpc', name: 'RRB NTPC' },
  { id: 'rrb-group-d', name: 'RRB Group D' },
  { id: 'sbi-po', name: 'SBI PO' },
  { id: 'neet', name: 'NEET' },
  { id: 'jee-main', name: 'JEE Main' },
  { id: 'ctet', name: 'CTET' },
];

// Mock question type for demonstration
type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

type TestGeneratorDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const TestGeneratorDialog = ({ open, onOpenChange }: TestGeneratorDialogProps) => {
  const { toast } = useToast();
  const [examType, setExamType] = useState('');
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(10);
  const [timeAllowed, setTimeAllowed] = useState(15);
  const [isGenerating, setIsGenerating] = useState(false);
  const [testGenerated, setTestGenerated] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  // Function to handle form submission
  const handleGenerateTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      // In a real app, this would be an API call to generate questions
      // Mock data for demonstration
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      const mockQuestions: Question[] = Array.from({ length: numQuestions }).map((_, index) => ({
        id: index + 1,
        text: `Sample question ${index + 1} for ${topic} in ${EXAM_TYPES.find(e => e.id === examType)?.name}?`,
        options: [
          `Option A for question ${index + 1}`,
          `Option B for question ${index + 1}`,
          `Option C for question ${index + 1}`,
          `Option D for question ${index + 1}`,
        ],
        correctAnswer: Math.floor(Math.random() * 4),
        explanation: `This is the explanation for question ${index + 1}. It explains the concept in detail and why the correct answer is the right choice.`,
      }));
      
      setQuestions(mockQuestions);
      setTestGenerated(true);
      setTimeRemaining(timeAllowed * 60);
      setTimerActive(true);
      
      toast({
        title: "Test Generated",
        description: `${numQuestions} questions on ${topic} for ${EXAM_TYPES.find(e => e.id === examType)?.name} have been created.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate test. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  // Function to handle answer selection
  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  // Function to submit test
  const handleSubmitTest = () => {
    setShowAnswers(true);
    setTimerActive(false);
    
    // Calculate score
    const totalQuestions = questions.length;
    const correctAnswers = questions.filter(q => 
      selectedAnswers[q.id] === q.correctAnswer
    ).length;
    
    toast({
      title: "Test Submitted",
      description: `You scored ${correctAnswers} out of ${totalQuestions}.`,
    });
  };

  // Function to reset the dialog state
  const handleReset = () => {
    setTestGenerated(false);
    setShowAnswers(false);
    setSelectedAnswers({});
    setTimerActive(false);
    setQuestions([]);
  };

  // Effect for the timer
  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (timerActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            setTimerActive(false);
            handleSubmitTest();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, timeRemaining]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen) {
        handleReset();
      }
      onOpenChange(newOpen);
    }}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        {!testGenerated ? (
          <>
            <DialogHeader>
              <DialogTitle>Generate AI Practice Test</DialogTitle>
              <DialogDescription>
                Create a custom test with AI-generated questions based on your preferences.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleGenerateTest} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="examType">Exam Type</Label>
                <Select 
                  value={examType} 
                  onValueChange={setExamType}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an exam type" />
                  </SelectTrigger>
                  <SelectContent>
                    {EXAM_TYPES.map(exam => (
                      <SelectItem key={exam.id} value={exam.id}>
                        {exam.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Input 
                  id="topic" 
                  value={topic} 
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter a specific topic (e.g., Indian History, Quantitative Aptitude)"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="numQuestions">Number of Questions</Label>
                  <Input 
                    id="numQuestions" 
                    type="number" 
                    min={5} 
                    max={50} 
                    value={numQuestions} 
                    onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeAllowed">Time Allowed (minutes)</Label>
                  <Input 
                    id="timeAllowed" 
                    type="number" 
                    min={5} 
                    max={180} 
                    value={timeAllowed} 
                    onChange={(e) => setTimeAllowed(parseInt(e.target.value))}
                    required
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button type="submit" disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>Generate Test</>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center">
                <span>{topic} - {EXAM_TYPES.find(e => e.id === examType)?.name}</span>
                {timerActive && (
                  <span className="text-base bg-practico-100 text-practico-800 px-3 py-1 rounded-md font-mono">
                    {formatTime(timeRemaining)}
                  </span>
                )}
              </DialogTitle>
              <DialogDescription>
                {numQuestions} questions • {timeAllowed} minutes
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {questions.map((question, qIndex) => (
                <div key={question.id} className="space-y-3 border-b pb-4 last:border-0">
                  <p className="font-medium">
                    <span className="text-practico-600 mr-2">{qIndex + 1}.</span> 
                    {question.text}
                  </p>
                  
                  <div className="space-y-2 pl-6">
                    {question.options.map((option, oIndex) => (
                      <div 
                        key={oIndex} 
                        className={`
                          flex items-start p-2 rounded-md cursor-pointer
                          ${selectedAnswers[question.id] === oIndex ? 'bg-practico-50 border border-practico-300' : 'hover:bg-gray-50'}
                          ${showAnswers && oIndex === question.correctAnswer ? 'bg-green-50 border border-green-300' : ''}
                          ${showAnswers && selectedAnswers[question.id] === oIndex && oIndex !== question.correctAnswer ? 'bg-red-50 border border-red-300' : ''}
                        `}
                        onClick={() => !showAnswers && handleAnswerSelect(question.id, oIndex)}
                      >
                        <div className="flex-shrink-0 mr-2 mt-0.5">
                          {showAnswers && oIndex === question.correctAnswer ? (
                            <Check className="h-5 w-5 text-green-600" />
                          ) : (
                            <div className={`h-5 w-5 rounded-full border ${selectedAnswers[question.id] === oIndex ? 'bg-practico-500 border-practico-600' : 'border-gray-400'}`}>
                              {selectedAnswers[question.id] === oIndex && !showAnswers && (
                                <div className="h-3 w-3 m-0.5 rounded-full bg-white"></div>
                              )}
                            </div>
                          )}
                        </div>
                        <div>{option}</div>
                      </div>
                    ))}
                  </div>
                  
                  {showAnswers && (
                    <div className="mt-2 pl-6 text-sm bg-amber-50 p-3 rounded-md border border-amber-200">
                      <p className="font-semibold text-amber-800 mb-1">Explanation:</p>
                      <p className="text-gray-700">{question.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:justify-between w-full">
              {!showAnswers ? (
                <Button onClick={handleSubmitTest} className="w-full sm:w-auto">
                  Submit Test
                </Button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2 w-full">
                  <Button variant="outline" onClick={handleReset} className="w-full sm:w-auto">
                    Create New Test
                  </Button>
                  <DialogClose asChild>
                    <Button variant="outline" className="w-full sm:w-auto">
                      Close
                    </Button>
                  </DialogClose>
                </div>
              )}
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TestGeneratorDialog;
