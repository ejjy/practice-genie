
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
import { Loader2, Check, BookOpen, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const EXAM_TYPES = [
  { id: 'fmge', name: 'MCI FMGE Exam' },
  { id: 'upsc-cse', name: 'UPSC Civil Services (Prelims)' },
  { id: 'ssc-cgl', name: 'SSC CGL' },
  { id: 'ssc-chsl', name: 'SSC CHSL' },
  { id: 'ssc-gd', name: 'SSC GD/Constable' },
  { id: 'ibps-po', name: 'IBPS PO' },
  { id: 'ibps-clerk', name: 'IBPS Clerk' },
  { id: 'ibps-so', name: 'IBPS SO' },
  { id: 'sbi-po', name: 'SBI PO' },
  { id: 'sbi-clerk', name: 'SBI Clerk' },
  { id: 'rbi-grade-b', name: 'RBI Grade B' },
  { id: 'rrb-ntpc', name: 'RRB NTPC' },
  { id: 'rrb-alp', name: 'RRB ALP' },
  { id: 'rrb-group-d', name: 'RRB Group D' },
  { id: 'cat', name: 'CAT (Common Admission Test)' },
  { id: 'mat', name: 'MAT (Management Aptitude Test)' },
  { id: 'cmat', name: 'CMAT (Common Management Admission Test)' },
  { id: 'jee-main', name: 'JEE Main' },
  { id: 'neet', name: 'NEET-UG' },
  { id: 'gate', name: 'GATE' },
];

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
  const [functionError, setFunctionError] = useState<string | null>(null);

  const handleGenerateTest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setFunctionError(null);
    
    try {
      console.log('Calling generate-ai-test function with:', { examType, topic, numQuestions });
      
      // Check if we have the Supabase configuration
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://rkvdrcpzfdbkoouxbtwp.supabase.co";
      console.log('Using Supabase URL:', supabaseUrl);
      console.log('Supabase anon key available:', !!import.meta.env.VITE_SUPABASE_ANON_KEY || 'Using fallback key');
      
      const requestBody = { 
        examType, 
        topic, 
        numQuestions: parseInt(String(numQuestions)) 
      };
      
      console.log('Request body:', JSON.stringify(requestBody));
      
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('generate-ai-test', {
        body: requestBody,
      });
      
      console.log('Function response:', JSON.stringify({ data, error }));
      
      if (error) {
        console.error('Supabase function error:', error);
        setFunctionError(error.message || 'Failed to generate test');
        throw new Error(error.message || 'Failed to generate test');
      }
      
      if (!data) {
        console.error('No data returned from function');
        setFunctionError('No data returned from the test generator');
        throw new Error('No data returned from the function');
      }
      
      if (!data.questions || !Array.isArray(data.questions)) {
        console.error('Invalid response format:', data);
        setFunctionError('Invalid response format from the test generator');
        throw new Error('Invalid response format: questions array is missing or not an array');
      }
      
      if (data.questions.length === 0) {
        console.error('Empty questions array returned');
        setFunctionError('No questions were generated. Please try again.');
        throw new Error('No questions generated');
      }
      
      console.log(`Successfully received ${data.questions.length} questions:`, data.questions);
      
      setQuestions(data.questions);
      setTestGenerated(true);
      setTimeRemaining(timeAllowed * 60);
      setTimerActive(true);
      
      toast({
        title: "Test Generated",
        description: `${data.questions.length} questions on ${topic} for ${EXAM_TYPES.find(e => e.id === examType)?.name} have been created.`,
      });
    } catch (error) {
      console.error("Error generating test:", error);
      
      toast({
        title: "Error Generating Test",
        description: error instanceof Error ? error.message : "Failed to generate test. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmitTest = () => {
    setShowAnswers(true);
    setTimerActive(false);
    
    const totalQuestions = questions.length;
    const correctAnswers = questions.filter(q => 
      selectedAnswers[q.id] === q.correctAnswer
    ).length;
    
    toast({
      title: "Test Submitted",
      description: `You scored ${correctAnswers} out of ${totalQuestions}.`,
    });
  };

  const handleReset = () => {
    setTestGenerated(false);
    setShowAnswers(false);
    setSelectedAnswers({});
    setTimerActive(false);
    setQuestions([]);
  };

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

              {functionError && (
                <div className="p-3 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600 mt-0.5" />
                  <div>
                    <p className="font-semibold">Error:</p>
                    <p>{functionError}</p>
                  </div>
                </div>
              )}
              
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
