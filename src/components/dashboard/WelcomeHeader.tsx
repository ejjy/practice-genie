
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface WelcomeHeaderProps {
  userName: string;
}

const WelcomeHeader = ({ userName }: WelcomeHeaderProps) => {
  const currentTime = new Date().getHours();
  
  let greeting = 'Good evening';
  if (currentTime < 12) {
    greeting = 'Good morning';
  } else if (currentTime < 18) {
    greeting = 'Good afternoon';
  }

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold">{greeting}, {userName}</h1>
        <p className="text-muted-foreground mt-1">Ready for today's practice?</p>
      </div>
      
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-practico-600 text-white text-[10px] flex items-center justify-center">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px]">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="py-2 cursor-pointer">
              <div>
                <div className="font-medium">New mock test available</div>
                <div className="text-sm text-muted-foreground">SSC CGL 2023 Mock #4 is now available</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2 cursor-pointer">
              <div>
                <div className="font-medium">Daily streak achieved!</div>
                <div className="text-sm text-muted-foreground">You've completed 7 days of practice</div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="py-2 cursor-pointer">
              <div>
                <div className="font-medium">Weekly report ready</div>
                <div className="text-sm text-muted-foreground">Your performance report for last week is ready</div>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <div className="h-9 w-9 rounded-full bg-practico-200 flex items-center justify-center font-medium text-practico-700">
          {userName.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
