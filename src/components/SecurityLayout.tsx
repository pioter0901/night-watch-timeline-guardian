
import React from 'react';
import CameraFeed from './CameraFeed';
import Timeline from './Timeline';
import EventDetail from './EventDetail';
import PeopleCounter from './PeopleCounter';
import PeopleCountHistory from './PeopleCountHistory';
import PeopleCountDetail from './PeopleCountDetail';
import SystemStatus from './SystemStatus';
import SecurityAlerts from './SecurityAlerts';
import { SecurityEvent, PersonCount, SecurityAlert, SystemStatus as SystemStatusType } from '@/types/securityTypes';
import { cameraFeeds } from '@/data/securityData';

interface SecurityLayoutProps {
  mode: 'security' | 'counting';
  securityView: 'monitoring' | 'alerts' | 'status';
  events: SecurityEvent[];
  selectedEvent: SecurityEvent | null;
  onSelectEvent: (event: SecurityEvent) => void;
  countSessions: PersonCount[];
  selectedSession: PersonCount | null;
  onCountingSessionComplete: (session: PersonCount) => void;
  onSelectSession: (session: PersonCount) => void;
  alerts: SecurityAlert[];
  onAcknowledgeAlert: (alertId: string) => void;
  systemStatus: SystemStatusType;
}

const SecurityLayout: React.FC<SecurityLayoutProps> = ({
  mode,
  securityView,
  events,
  selectedEvent,
  onSelectEvent,
  countSessions,
  selectedSession,
  onCountingSessionComplete,
  onSelectSession,
  alerts,
  onAcknowledgeAlert,
  systemStatus
}) => {
  if (mode === 'security') {
    return (
      <>
        {/* Left panel - Camera feeds */}
        <div className="w-full md:w-1/3 border-r border-security-muted/20 p-4">
          <div className="border-b border-security-muted/30 mb-3 pb-2">
            <h2 className="text-xl font-semibold">即時監控</h2>
            <p className="text-sm text-security-muted">
              {cameraFeeds.filter(camera => camera.status === 'online').length} / {cameraFeeds.length} 攝影機在線
            </p>
          </div>
          
          <div className="overflow-y-auto h-[calc(100%-3.5rem)]">
            {cameraFeeds.map((camera) => (
              <CameraFeed 
                key={camera.id}
                name={camera.name}
                status={camera.status as 'online' | 'offline'}
                isActive={camera.id === 'cam1'}
              />
            ))}
          </div>
        </div>
        
        {/* Middle panel - Timeline/Alerts/Status */}
        <div className="w-full md:w-1/3 border-r border-security-muted/20 p-4">
          {securityView === 'monitoring' && (
            <Timeline 
              events={events}
              selectedEvent={selectedEvent}
              onSelectEvent={onSelectEvent}
            />
          )}
          {securityView === 'alerts' && (
            <SecurityAlerts 
              alerts={alerts}
              onAcknowledge={onAcknowledgeAlert}
            />
          )}
          {securityView === 'status' && (
            <SystemStatus status={systemStatus} />
          )}
        </div>
        
        {/* Right panel - Event details */}
        <div className="w-full md:w-1/3 p-4">
          <EventDetail event={selectedEvent} />
        </div>
      </>
    );
  }

  return (
    <>
      {/* Left panel - People Counter */}
      <div className="w-full md:w-1/3 border-r border-security-muted/20 p-4">
        <PeopleCounter onSessionComplete={onCountingSessionComplete} />
      </div>
      
      <div className="w-full md:w-1/3 border-r border-security-muted/20 p-4">
        <div className="border-b border-security-muted/30 mb-3 pb-2">
          <h2 className="text-xl font-semibold">計數歷史紀錄</h2>
          <p className="text-sm text-security-muted">
            共 {countSessions.length} 筆記錄
          </p>
        </div>
        <div className="h-[calc(100%-3.5rem)]">
          <PeopleCountHistory 
            sessions={countSessions} 
            onSelectSession={onSelectSession}
            selectedSession={selectedSession}
          />
        </div>
      </div>
      
      <div className="w-full md:w-1/3 p-4">
        <PeopleCountDetail session={selectedSession} />
      </div>
    </>
  );
};

export default SecurityLayout;
