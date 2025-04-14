import { useEffect } from 'react';
import { Progress } from '@/components/ui/progress';

interface TimerProps {
  timeLeft: number;
  onTimeUp: () => void;
}

export function Timer({ timeLeft, onTimeUp }: TimerProps) {
  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-sm">
        <span>Time Remaining</span>
        <span>{timeLeft} seconds</span>
      </div>
      <Progress value={(timeLeft / 30) * 100} className="h-2" />
    </div>
  );
}