
import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';

interface CountdownButtonProps {
  onConfirm: () => void;
  children: React.ReactNode;
  countdown?: number;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
  disabled?: boolean;
}

const CountdownButton: React.FC<CountdownButtonProps> = ({
  onConfirm,
  children,
  countdown = 3,
  variant = 'default',
  className = '',
  disabled = false
}) => {
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [timeLeft, setTimeLeft] = useState(countdown);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isCountingDown && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsCountingDown(false);
            onConfirm();
            return countdown;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isCountingDown, timeLeft, onConfirm, countdown]);

  const handleClick = () => {
    if (disabled) return;
    
    if (!isCountingDown) {
      setIsCountingDown(true);
      setTimeLeft(countdown);
    } else {
      // 取消倒數
      setIsCountingDown(false);
      setTimeLeft(countdown);
    }
  };

  return (
    <Button
      variant={variant}
      className={className}
      onClick={handleClick}
      disabled={disabled}
    >
      {isCountingDown ? `${timeLeft}秒後執行...` : children}
    </Button>
  );
};

export default CountdownButton;
