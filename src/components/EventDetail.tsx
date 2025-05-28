
import React from 'react';
import { SecurityEvent } from '@/types/securityTypes';
import { formatFullTime } from '@/utils/timeUtils';
import { AlertTriangle, CheckCircle, Clock, MapPin, Tag } from 'lucide-react';
import { Button } from './ui/button';

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

  const getSeverityColor = (severity: SecurityEvent['severity']) => {
    switch (severity) {
      case 'critical':
        return 'text-red-400 bg-red-400/20';
      case 'high':
        return 'text-orange-400 bg-orange-400/20';
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/20';
      case 'low':
        return 'text-green-400 bg-green-400/20';
    }
  };

  const getSeverityText = (severity: SecurityEvent['severity']) => {
    switch (severity) {
      case 'critical':
        return '緊急';
      case 'high':
        return '高';
      case 'medium':
        return '中';
      case 'low':
        return '低';
    }
  };

  const getEventTypeText = (eventType: SecurityEvent['eventType']) => {
    switch (eventType) {
      case 'motion':
        return '動作偵測';
      case 'intrusion':
        return '入侵偵測';
      case 'noise':
        return '聲音偵測';
      case 'fire':
        return '火災警報';
      case 'door':
        return '門禁感應';
      case 'window':
        return '窗戶感應';
      case 'system':
        return '系統事件';
      default:
        return '未知事件';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-security-muted/30 mb-3 pb-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">
            {event.isAnomaly ? '異常事件' : '正常事件'}
          </h2>
          <div className="flex items-center space-x-2">
            {event.resolved ? (
              <CheckCircle className="h-5 w-5 text-green-400" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-security-anomaly" />
            )}
          </div>
        </div>
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
                    {getEventTypeText(event.eventType)}
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
          
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-security-muted" />
                <span className="text-security-muted">位置:</span>
              </div>
              <span>{event.location}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-security-muted" />
                <span className="text-security-muted">時間:</span>
              </div>
              <span>{formatFullTime(event.timestamp)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Tag className="h-4 w-4 mr-2 text-security-muted" />
                <span className="text-security-muted">類型:</span>
              </div>
              <span>{getEventTypeText(event.eventType)}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-security-muted">嚴重程度:</span>
              <span className={`px-2 py-1 rounded text-xs ${getSeverityColor(event.severity)}`}>
                {getSeverityText(event.severity)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-security-muted">狀態:</span>
              <span className={event.resolved ? "text-green-400" : "text-security-anomaly"}>
                {event.resolved ? '已處理' : '待處理'}
              </span>
            </div>
          </div>
          
          <div className="mt-6 space-y-2">
            {event.isAnomaly && !event.resolved && (
              <Button className="w-full bg-security-anomaly text-white hover:bg-security-anomaly/80">
                立即處理事件
              </Button>
            )}
            <Button variant="outline" className="w-full">
              查看完整報告
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
