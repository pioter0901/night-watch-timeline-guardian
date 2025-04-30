
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Play, Stop, Users } from 'lucide-react';
import { formatFullTime } from '@/utils/timeUtils';
import { PersonCount } from '@/types/securityTypes';

interface PeopleCounterProps {
  onSessionComplete: (session: PersonCount) => void;
}

const PeopleCounter: React.FC<PeopleCounterProps> = ({ onSessionComplete }) => {
  const [isCounting, setIsCounting] = useState(false);
  const [count, setCount] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);

  const handleStartCounting = () => {
    setIsCounting(true);
    setCount(0);
    setSessionStartTime(new Date());
  };

  const handleStopCounting = () => {
    if (!isCounting || !sessionStartTime) return;
    
    setIsCounting(false);
    
    // Generate mock images for the counted people
    // In a real implementation, these would come from camera feeds
    const mockImages = Array(count).fill('')
      .map((_, i) => `/mock-person-${i + 1}.jpg`);
    
    const session: PersonCount = {
      id: `count-${Date.now()}`,
      timestamp: new Date(),
      count,
      images: mockImages,
      location: '主入口',
    };
    
    onSessionComplete(session);
  };

  // Simulate counting (in a real system this would be triggered by actual detections)
  const handleSimulateDetection = () => {
    if (isCounting) {
      setCount(prev => prev + 1);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-security-muted/30 mb-3 pb-2">
        <h2 className="text-xl font-semibold">日間人員計數</h2>
        <p className="text-sm text-security-muted">
          {isCounting ? '計數中...' : '準備開始計數'}
        </p>
      </div>
      
      <div className="flex-1 flex flex-col">
        {/* Counter display */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-6xl font-bold mb-4 flex items-center">
            <Users className="h-10 w-10 mr-3 text-security-muted" />
            <span>{count}</span>
          </div>
          
          {sessionStartTime && (
            <div className="text-sm text-security-muted">
              開始時間: {formatFullTime(sessionStartTime)}
            </div>
          )}
        </div>
        
        {/* Controls */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <Button
            className="flex-1"
            variant={isCounting ? "outline" : "default"}
            disabled={isCounting}
            onClick={handleStartCounting}
          >
            <Play className="mr-2" /> 開始計數
          </Button>
          
          <Button
            className="flex-1"
            variant={!isCounting ? "outline" : "destructive"}
            disabled={!isCounting}
            onClick={handleStopCounting}
          >
            <Stop className="mr-2" /> 結束計數
          </Button>
        </div>
        
        {isCounting && (
          <Button
            className="mt-4"
            variant="secondary"
            onClick={handleSimulateDetection}
          >
            模擬檢測到人員
          </Button>
        )}
      </div>
    </div>
  );
};

export default PeopleCounter;
