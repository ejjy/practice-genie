
import React from 'react';
import { Activity, Award, BarChart3, BookOpen, CalendarDays } from 'lucide-react';
import WelcomeHeader from '@/components/dashboard/WelcomeHeader';
import StatsCard from '@/components/dashboard/StatsCard';
import DailyStreak from '@/components/dashboard/DailyStreak';
import TestCard from '@/components/dashboard/TestCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Dashboard = () => {
  const { toast } = useToast();
  const userName = "Rahul"; // This would come from authentication in a real app
  
  const handleStartTest = () => {
    toast({
      title: "Test Started",
      description: "Your daily practice test has begun. Good luck!",
    });
    // In a real app, we'd navigate to the test page
  };

  return (
    <div>
      <WelcomeHeader userName={userName} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard 
          title="Tests Completed" 
          value="24" 
          description="Last 30 days" 
          icon={BookOpen}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard 
          title="Avg. Score" 
          value="76%" 
          description="Last 30 days" 
          icon={Activity}
          trend={{ value: 4, isPositive: true }}
        />
        <StatsCard 
          title="Weekly Rank" 
          value="#42" 
          description="Out of 1,024 students" 
          icon={Award}
          trend={{ value: 6, isPositive: false }}
        />
        <DailyStreak currentStreak={7} bestStreak={15} daysCompleted={22} />
      </div>
      
      <div className="space-y-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Today's Practice</h2>
            <Button variant="outline" size="sm">
              View All
              <CalendarDays className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <TestCard
                title="Daily General Aptitude"
                description="10 questions tailored to your performance level."
                duration={15}
                questions={10}
                tags={['Quantitative', 'Reasoning', 'General Knowledge']}
                difficulty="medium"
                onClick={handleStartTest}
                variant="featured"
              />
            </div>
            
            <div className="bg-white p-6 border rounded-lg">
              <h3 className="font-semibold mb-3">Performance Insights</h3>
              <div className="space-y-4">
                <div className="p-3 bg-muted rounded-md">
                  <div className="flex items-start">
                    <BarChart3 className="h-5 w-5 text-practico-600 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Focus on Verbal Reasoning</p>
                      <p className="text-xs text-muted-foreground">
                        Your scores in this area are 15% below your average
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-muted rounded-md">
                  <div className="flex items-start">
                    <BarChart3 className="h-5 w-5 text-practico-600 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Strength in Data Interpretation</p>
                      <p className="text-xs text-muted-foreground">
                        You consistently score above 85% in this category
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-muted rounded-md">
                  <div className="flex items-start">
                    <CalendarDays className="h-5 w-5 text-practico-600 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Study Consistency</p>
                      <p className="text-xs text-muted-foreground">
                        You've studied for 7 consecutive days. Keep it up!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recommended Mock Tests</h2>
            <Button variant="outline" size="sm">
              View All
              <BookOpen className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <TestCard
              title="SSC CGL 2023 Mock #3"
              description="Full-length mock test based on the SSC CGL exam pattern."
              duration={120}
              questions={100}
              tags={['SSC CGL', 'Full Mock']}
              difficulty="hard"
              onClick={handleStartTest}
            />
            <TestCard
              title="Quantitative Aptitude"
              description="Focused practice on numerical ability and data interpretation."
              duration={45}
              questions={30}
              tags={['Quantitative', 'Math']}
              difficulty="medium"
              onClick={handleStartTest}
            />
            <TestCard
              title="General Awareness"
              description="Test your knowledge of current affairs and general knowledge."
              duration={30}
              questions={50}
              tags={['GK', 'Current Affairs']}
              difficulty="easy"
              onClick={handleStartTest}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
