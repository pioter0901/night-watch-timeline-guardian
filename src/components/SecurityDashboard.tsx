
import React, { useState, useEffect } from 'react';
import SecurityHeader from './SecurityHeader';
import SecurityModeSelector from './SecurityModeSelector';
import SecurityViewSelector from './SecurityViewSelector';
import SecurityLayout from './SecurityLayout';
import { SecurityEvent, PersonCount, SecurityAlert, SystemStatus as SystemStatusType } from '@/types/securityTypes';
import { generateSecurityEvents, generateSecurityAlerts, getSystemStatus } from '@/data/securityData';
import { useToast } from '@/hooks/use-toast';

const SecurityDashboard: React.FC = () => {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [mode, setMode] = useState<'security' | 'counting'>('security');
  const [securityView, setSecurityView] = useState<'monitoring' | 'alerts' | 'status'>('monitoring');
  const [countSessions, setCountSessions] = useState<PersonCount[]>([]);
  const [selectedSession, setSelectedSession] = useState<PersonCount | null>(null);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [systemStatus, setSystemStatus] = useState<SystemStatusType>(getSystemStatus());
  const { toast } = useToast();
  
  // Initialize events data
  useEffect(() => {
    const securityEvents = generateSecurityEvents();
    setEvents(securityEvents);
    setAlerts(generateSecurityAlerts());
    
    // Initialize with latest event
    if (securityEvents.length > 0) {
      const anomalies = securityEvents.filter(event => event.isAnomaly);
      if (anomalies.length > 0) {
        setSelectedEvent(anomalies[0]);
      }
    }
    
    // Update current time every second
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('zh-TW', { 
          hour: '2-digit', 
          minute: '2-digit',
          second: '2-digit'
        })
      );
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSelectEvent = (event: SecurityEvent) => {
    setSelectedEvent(event);
  };

  const handleCountingSessionComplete = (session: PersonCount) => {
    setCountSessions(prev => [session, ...prev]);
    setSelectedSession(session);
  };

  const handleSelectSession = (session: PersonCount) => {
    setSelectedSession(session);
  };

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, acknowledged: true }
        : alert
    ));
    
    toast({
      title: "警報已確認",
      description: "警報已標記為已處理",
    });
  };

  const unacknowledgedAlertsCount = alerts.filter(alert => !alert.acknowledged).length;

  return (
    <div className="h-screen w-screen bg-security-bg text-white">
      {/* Header */}
      <header className="h-14 border-b border-security-muted/20 flex items-center justify-between px-4">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">智慧保全系統</h1>
          
          <SecurityModeSelector mode={mode} onModeChange={setMode} />

          {mode === 'security' && (
            <SecurityViewSelector 
              securityView={securityView}
              onViewChange={setSecurityView}
              unacknowledgedAlertsCount={unacknowledgedAlertsCount}
            />
          )}
        </div>
        <SecurityHeader currentTime={currentTime} />
      </header>
      
      {/* Main layout */}
      <div className="h-[calc(100vh-3.5rem)] flex flex-col md:flex-row">
        <SecurityLayout 
          mode={mode}
          securityView={securityView}
          events={events}
          selectedEvent={selectedEvent}
          onSelectEvent={handleSelectEvent}
          countSessions={countSessions}
          selectedSession={selectedSession}
          onCountingSessionComplete={handleCountingSessionComplete}
          onSelectSession={handleSelectSession}
          alerts={alerts}
          onAcknowledgeAlert={handleAcknowledgeAlert}
          systemStatus={systemStatus}
        />
      </div>
    </div>
  );
};

export default SecurityDashboard;
