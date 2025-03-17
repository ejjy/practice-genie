
import React, { useState } from 'react';
import { Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import TestCard from '@/components/dashboard/TestCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const TestsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficulty, setDifficulty] = useState('all');
  const { toast } = useToast();
  
  const handleStartTest = () => {
    toast({
      title: "Test Started",
      description: "Your test has begun. Good luck!",
    });
    // In a real app, we'd navigate to the test page
  };

  // Mock test data
  const dailyTests = [
    {
      id: 1,
      title: "Daily General Aptitude",
      description: "10 questions tailored to your performance level.",
      duration: 15,
      questions: 10,
      tags: ['Quantitative', 'Reasoning', 'General Knowledge'],
      difficulty: 'medium' as const,
    },
    {
      id: 2,
      title: "Vocabulary Builder",
      description: "Improve your word power with this daily vocabulary test.",
      duration: 10,
      questions: 20,
      tags: ['English', 'Vocabulary'],
      difficulty: 'easy' as const,
    },
    {
      id: 3,
      title: "Current Affairs",
      description: "Stay updated with recent events and news.",
      duration: 15,
      questions: 15,
      tags: ['GK', 'Current Affairs'],
      difficulty: 'medium' as const,
    },
  ];
  
  const mockTests = [
    {
      id: 4,
      title: "SSC CGL 2023 Mock #1",
      description: "Full-length mock test based on the SSC CGL exam pattern.",
      duration: 120,
      questions: 100,
      tags: ['SSC CGL', 'Full Mock'],
      difficulty: 'hard' as const,
    },
    {
      id: 5,
      title: "SSC CGL 2023 Mock #2",
      description: "Second full-length mock test with increased difficulty.",
      duration: 120,
      questions: 100,
      tags: ['SSC CGL', 'Full Mock'],
      difficulty: 'hard' as const,
    },
    {
      id: 6,
      title: "UPSC Prelims Sample Test",
      description: "Sample test based on UPSC Civil Services Prelims pattern.",
      duration: 120,
      questions: 100,
      tags: ['UPSC', 'Civil Services'],
      difficulty: 'hard' as const,
    },
  ];
  
  const topicTests = [
    {
      id: 7,
      title: "Quantitative Aptitude",
      description: "Focused practice on numerical ability and data interpretation.",
      duration: 45,
      questions: 30,
      tags: ['Quantitative', 'Math'],
      difficulty: 'medium' as const,
    },
    {
      id: 8,
      title: "Logical Reasoning",
      description: "Practice logical and analytical reasoning questions.",
      duration: 30,
      questions: 25,
      tags: ['Reasoning', 'Logic'],
      difficulty: 'medium' as const,
    },
    {
      id: 9,
      title: "General English",
      description: "Improve your English grammar, vocabulary, and comprehension.",
      duration: 40,
      questions: 40,
      tags: ['English', 'Grammar'],
      difficulty: 'easy' as const,
    },
  ];

  // Filter function
  const filterTests = (tests: typeof dailyTests) => {
    return tests.filter(test => {
      const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          test.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          test.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesDifficulty = difficulty === 'all' || test.difficulty === difficulty;
      
      return matchesSearch && matchesDifficulty;
    });
  };

  const filteredDailyTests = filterTests(dailyTests);
  const filteredMockTests = filterTests(mockTests);
  const filteredTopicTests = filterTests(topicTests);

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Practice Tests</h1>
          <p className="text-muted-foreground mt-1">
            Personalized tests based on your performance and goals
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full sm:w-[250px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tests..."
              className="pl-8 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select
              value={difficulty}
              onValueChange={setDifficulty}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="daily" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="daily">Daily Practice</TabsTrigger>
          <TabsTrigger value="mock">Mock Tests</TabsTrigger>
          <TabsTrigger value="topic">Topic-wise</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="space-y-4">
          {filteredDailyTests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredDailyTests.map((test) => (
                <TestCard
                  key={test.id}
                  title={test.title}
                  description={test.description}
                  duration={test.duration}
                  questions={test.questions}
                  tags={test.tags}
                  difficulty={test.difficulty}
                  onClick={handleStartTest}
                  variant={test.id === 1 ? 'featured' : 'default'}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No tests match your search criteria.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchQuery('');
                  setDifficulty('all');
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="mock" className="space-y-4">
          {filteredMockTests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMockTests.map((test) => (
                <TestCard
                  key={test.id}
                  title={test.title}
                  description={test.description}
                  duration={test.duration}
                  questions={test.questions}
                  tags={test.tags}
                  difficulty={test.difficulty}
                  onClick={handleStartTest}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No tests match your search criteria.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchQuery('');
                  setDifficulty('all');
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="topic" className="space-y-4">
          {filteredTopicTests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTopicTests.map((test) => (
                <TestCard
                  key={test.id}
                  title={test.title}
                  description={test.description}
                  duration={test.duration}
                  questions={test.questions}
                  tags={test.tags}
                  difficulty={test.difficulty}
                  onClick={handleStartTest}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No tests match your search criteria.</p>
              <Button 
                variant="link" 
                onClick={() => {
                  setSearchQuery('');
                  setDifficulty('all');
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TestsPage;
