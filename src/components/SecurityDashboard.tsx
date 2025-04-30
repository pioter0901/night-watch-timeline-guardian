
import React, { useState, useEffect } from 'react';
import CameraFeed from './CameraFeed';
import Timeline from './Timeline';
import EventDetail from './EventDetail';
import PeopleCounter from './PeopleCounter';
import PeopleCountHistory from './PeopleCountHistory';
import PeopleCountDetail from './PeopleCountDetail';
import { SecurityEvent, PersonCount } from '@/types/securityTypes';
import { generateSecurityEvents, cameraFeeds } from '@/data/securityData';
import { Clock } from "lucide-react";

const SecurityDashboard: React.FC = () => {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(null);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [mode, setMode] = useState<'security' | 'counting'>('security');
  const [countSessions, setCountSessions] = useState<PersonCount[]>([]);
  const [selectedSession, setSelectedSession] = useState<PersonCount | null>(null);
  
  // Initialize events data
  useEffect(() => {
    const securityEvents = generateSecurityEvents();
    setEvents(securityEvents);
    
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

  return (
    <div className="h-screen w-screen bg-security-bg text-white">
      {/* Header */}
      <header className="h-14 border-b border-security-muted/20 flex items-center justify-between px-4">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">夜間保全系統</h1>
          
          <div className="ml-6 flex space-x-4">
            <button 
              className={`px-3 py-1 rounded-md text-sm ${mode === 'security' ? 'bg-security-muted/30 text-white' : 'text-security-muted hover:text-white'}`}
              onClick={() => setMode('security')}
            >
              夜間監控
            </button>
            <button 
              className={`px-3 py-1 rounded-md text-sm ${mode === 'counting' ? 'bg-security-muted/30 text-white' : 'text-security-muted hover:text-white'}`}
              onClick={() => setMode('counting')}
            >
              日間人員計數
            </button>
          </div>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          <span className="font-mono">{currentTime}</span>
        </div>
      </header>
      
      {/* Main layout */}
      <div className="h-[calc(100vh-3.5rem)] flex flex-col md:flex-row">
        {mode === 'security' ? (
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
            
            {/* Middle panel - Timeline */}
            <div className="w-full md:w-1/3 border-r border-security-muted/20 p-4">
              <Timeline 
                events={events}
                selectedEvent={selectedEvent}
                onSelectEvent={handleSelectEvent}
              />
            </div>
            
            {/* Right panel - Event details */}
            <div className="w-full md:w-1/3 p-4">
              <EventDetail event={selectedEvent} />
            </div>
          </>
        ) : (
          <>
            {/* Left panel - People Counter */}
            <div className="w-full md:w-1/3 border-r border-security-muted/20 p-4">
              <PeopleCounter onSessionComplete={handleCountingSessionComplete} />
            </div>
            
            {/* Middle panel - Count History */}
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
                  onSelectSession={handleSelectSession}
                  selectedSession={selectedSession}
                />
              </div>
            </div>
            
            {/* Right panel - Count details */}
            <div className="w-full md:w-1/3 p-4">
              <PeopleCountDetail session={selectedSession} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SecurityDashboard;
