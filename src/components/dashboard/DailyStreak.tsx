
import React from 'react';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface DailyStreakProps {
  currentStreak: number;
  bestStreak: number;
  daysCompleted: number;
}

const DailyStreak = ({ currentStreak, bestStreak, daysCompleted }: DailyStreakProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
        <Calendar className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-end gap-2">
          <div className="text-2xl font-bold">{currentStreak} days</div>
          <div className="text-xs text-muted-foreground">(Best: {bestStreak} days)</div>
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-xs">
            <span>Progress this month</span>
            <span className="font-medium">{daysCompleted}/30 days</span>
          </div>
          <Progress value={(daysCompleted / 30) * 100} className="h-2" />
        </div>
        
        <div className="mt-4 grid grid-cols-7 gap-1">
          {Array.from({ length: 7 }).map((_, i) => {
            const day = ['S', 'M', 'T', 'W', 'T', 'F', 'S'][i];
            const isCompleted = i < 5; // Mock data: complete first 5 days
            
            return (
              <div 
                key={i}
                className={`text-center p-1 rounded-sm text-xs ${
                  isCompleted 
                    ? 'bg-practico-100 text-practico-700 font-medium' 
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default DailyStreak;
