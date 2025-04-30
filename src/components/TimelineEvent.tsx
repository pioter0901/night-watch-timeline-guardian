
import React from 'react';
import { SecurityEvent } from '@/types/securityTypes';
import { formatTime } from '@/utils/timeUtils';
import { cn } from '@/lib/utils';

interface TimelineEventProps {
  event: SecurityEvent;
  isActive: boolean;
  onClick: (event: SecurityEvent) => void;
}

const TimelineEvent: React.FC<TimelineEventProps> = ({ 
  event, 
  isActive,
  onClick
}) => {
  const handleClick = () => {
    onClick(event);
  };

  return (
    <div 
      className={cn(
        "timeline-event p-3 mb-2 rounded-md cursor-pointer",
        event.isAnomaly ? "bg-security-anomaly/90 text-white" : "bg-security-dark text-security-normal",
        isActive ? "ring-2 ring-white" : ""
      )}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <div className="font-semibold">{formatTime(event.timestamp)}</div>
        <div className="text-sm">{event.location}</div>
      </div>
      <div className="text-xs mt-1 opacity-80">
        {event.description}
      </div>
    </div>
  );
};

export default TimelineEvent;
