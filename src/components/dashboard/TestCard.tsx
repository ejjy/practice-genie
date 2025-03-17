
import React from 'react';
import { Clock, Tag } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TestCardProps {
  title: string;
  description: string;
  duration: number; // in minutes
  questions: number;
  tags?: string[];
  difficulty?: 'easy' | 'medium' | 'hard';
  onClick?: () => void;
  variant?: 'default' | 'featured';
}

const TestCard = ({
  title,
  description,
  duration,
  questions,
  tags = [],
  difficulty = 'medium',
  onClick,
  variant = 'default'
}: TestCardProps) => {
  const difficultyColor = {
    easy: 'bg-green-100 text-green-700',
    medium: 'bg-amber-100 text-amber-700',
    hard: 'bg-red-100 text-red-700'
  };
  
  const difficultyLabel = {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard'
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-200 hover:shadow-md", 
      variant === 'featured' && "border-practico-200 bg-gradient-to-br from-practico-50 to-white"
    )}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{description}</p>
          </div>
          
          {variant === 'featured' && (
            <Badge variant="outline" className="bg-practico-100 text-practico-700 border-practico-200">
              Featured
            </Badge>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2 mb-4">
          {tags.map((tag) => (
            <div key={tag} className="flex items-center text-xs text-muted-foreground">
              <Tag className="mr-1 h-3 w-3" />
              {tag}
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{duration} min</span>
            </div>
            <div className="text-sm">
              {questions} questions
            </div>
          </div>
          
          <Badge variant="outline" className={difficultyColor[difficulty]}>
            {difficultyLabel[difficulty]}
          </Badge>
        </div>
      </CardContent>
      
      <CardFooter className="bg-muted/50 px-6 py-3">
        <Button onClick={onClick} variant={variant === 'featured' ? 'default' : 'outline'} className="w-full">
          Start Test
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TestCard;
