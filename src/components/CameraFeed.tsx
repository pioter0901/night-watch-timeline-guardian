
import React from 'react';
import { cn } from '@/lib/utils';

interface CameraFeedProps {
  name: string;
  status: 'online' | 'offline';
  isActive?: boolean;
  className?: string;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ 
  name, 
  status, 
  isActive = false,
  className
}) => {
  return (
    <div 
      className={cn(
        "relative rounded-md overflow-hidden mb-4 cursor-pointer transition-all duration-300",
        isActive ? "border-2 border-white" : "border border-security-muted/30",
        className
      )}
    >
      {status === 'offline' && (
        <div className="absolute inset-0 bg-security-dark/80 flex items-center justify-center z-10">
          <span className="text-security-muted font-medium">離線中</span>
        </div>
      )}
      
      <div className="aspect-video bg-security-dark flex items-center justify-center">
        {status === 'online' ? (
          <>
            {/* Simulated static camera feed */}
            <div className="w-full h-full bg-gradient-to-br from-security-dark to-black p-4 flex items-center justify-center">
              <div className="w-full h-full relative border border-security-muted/20 overflow-hidden">
                <div className="absolute inset-0 bg-security-dark/50"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-pulse-subtle">
                    <div className="h-2 w-12 bg-security-muted/40 mb-2 rounded-full"></div>
                    <div className="h-1 w-20 bg-security-muted/30 mb-6 rounded-full"></div>
                    <div className="h-24 w-32 border border-security-muted/30 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs text-security-muted/60">{name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-2 left-2 z-10">
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                <span className="text-xs text-security-muted">{name}</span>
              </div>
            </div>
          </>
        ) : (
          <span className="text-security-muted">無訊號</span>
        )}
      </div>
    </div>
  );
};

export default CameraFeed;
