
import React from 'react';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  textVisible?: boolean;
}

const Logo: React.FC<LogoProps> = ({ 
  className, 
  size = 'md', 
  textVisible = true
}) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="practico-gradient p-2 rounded-lg">
        <BookOpen className={cn('text-white', sizeClasses[size])} />
      </div>
      {textVisible && (
        <div className={cn('font-bold tracking-tight', textSizeClasses[size])}>
          <span className="practico-gradient-text">Practico</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
