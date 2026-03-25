import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export function Card3D({ children, className, onClick, hover = true }: Card3DProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'glass-card rounded-2xl p-6 shadow-card transition-all duration-300 transform-3d',
        hover && 'hover:shadow-hover hover:-translate-y-2 hover:scale-105 cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}
