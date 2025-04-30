
import React, { useRef, useEffect } from 'react';
import { SecurityEvent } from '@/types/securityTypes';
import TimelineEvent from './TimelineEvent';
import { isCurrentHour, formatTime } from '@/utils/timeUtils';

interface TimelineProps {
  events: SecurityEvent[];
  selectedEvent: SecurityEvent | null;
  onSelectEvent: (event: SecurityEvent) => void;
}

const Timeline: React.FC<TimelineProps> = ({ 
  events, 
  selectedEvent,
  onSelectEvent
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to top on initial render to show current time
  useEffect(() => {
    if (timelineRef.current) {
      timelineRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-security-muted/30 mb-3 pb-2">
        <h2 className="text-xl font-semibold text-white">時間軸</h2>
        <p className="text-sm text-security-muted">即時和歷史事件</p>
      </div>

      {/* Current time indicator */}
      <div className="bg-security-dark/50 p-3 mb-4 rounded-md border-l-4 border-green-500">
        <div className="text-green-400 font-semibold">現在時間</div>
        <div className="text-2xl font-bold text-white">{formatTime(new Date())}</div>
      </div>
      
      {/* Timeline events */}
      <div 
        ref={timelineRef} 
        className="flex-1 overflow-y-auto pr-2"
      >
        {events.map((event) => (
          <TimelineEvent 
            key={event.id} 
            event={event} 
            isActive={selectedEvent?.id === event.id}
            onClick={onSelectEvent}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
