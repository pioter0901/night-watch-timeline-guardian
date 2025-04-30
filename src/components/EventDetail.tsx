
import React from 'react';
import { SecurityEvent } from '@/types/securityTypes';
import { formatFullTime } from '@/utils/timeUtils';

interface EventDetailProps {
  event: SecurityEvent | null;
}

const EventDetail: React.FC<EventDetailProps> = ({ event }) => {
  if (!event) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-security-muted">
        <div className="text-center p-4">
          <p className="mb-2">請點選時間軸上的事件查看詳情</p>
          <p className="text-sm">紅色代表異常事件</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-security-muted/30 mb-3 pb-2">
        <h2 className="text-xl font-semibold text-white">
          {event.isAnomaly ? '異常事件' : '正常事件'}
        </h2>
        <p className="text-sm text-security-muted">{event.location}</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Event image */}
        <div className="bg-security-dark rounded-md overflow-hidden mb-4">
          <div className="aspect-video bg-gradient-to-br from-security-dark to-black p-4 flex items-center justify-center">
            <div className="w-full h-full relative border border-security-muted/20 overflow-hidden">
              <div className="absolute inset-0 bg-security-dark/50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                {event.isAnomaly ? (
                  <div className="animate-pulse text-security-anomaly font-bold">
                    檢測到異常活動
                  </div>
                ) : (
                  <div className="text-security-muted text-sm">
                    正常活動
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Event details */}
        <div className="bg-security-dark rounded-md p-4">
          <h3 className={event.isAnomaly ? "text-security-anomaly font-medium" : "text-white"}>
            {event.description}
          </h3>
          
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-security-muted">位置:</span>
              <span>{event.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-security-muted">時間:</span>
              <span>{formatFullTime(event.timestamp)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-security-muted">狀態:</span>
              <span className={event.isAnomaly ? "text-security-anomaly" : "text-green-400"}>
                {event.isAnomaly ? '異常' : '正常'}
              </span>
            </div>
          </div>
          
          {event.isAnomaly && (
            <div className="mt-6">
              <button className="w-full bg-security-anomaly text-white py-2 rounded-md font-medium">
                通報此事件
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
