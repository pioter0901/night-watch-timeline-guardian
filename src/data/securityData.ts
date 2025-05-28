
import { SecurityEvent, SecurityAlert, SystemStatus } from '../types/securityTypes';

// Helper to create a date object n minutes in the past or future
const getDateOffset = (minutesOffset: number): Date => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + minutesOffset);
  return date;
};

// Generate security events for the last 6 hours, with more variety
export const generateSecurityEvents = (): SecurityEvent[] => {
  const events: SecurityEvent[] = [];
  
  const eventTypes = ['motion', 'intrusion', 'noise', 'door', 'window', 'system'] as const;
  const locations = ['前門', '後門', '側門', '車庫', '花園', '一樓大廳', '二樓走廊', '地下室'];
  const severities = ['low', 'medium', 'high', 'critical'] as const;
  
  // Current time event (always normal)
  events.push({
    id: 'current',
    timestamp: new Date(),
    isAnomaly: false,
    imageUrl: '/camera-feed-normal-1.jpg',
    location: '前門',
    description: '正常活動',
    severity: 'low',
    eventType: 'motion',
    resolved: true
  });
  
  // Generate past events (last 6 hours, 8 minute intervals)
  for (let i = 1; i <= 45; i++) {
    const minutesAgo = i * 8;
    // Add anomalies at specific times with different types
    const isAnomaly = [3, 7, 12, 18, 25, 31, 38, 42].includes(i);
    const eventType = eventTypes[i % eventTypes.length];
    const location = locations[i % locations.length];
    
    let severity: 'low' | 'medium' | 'high' | 'critical' = 'low';
    let description = '正常活動';
    
    if (isAnomaly) {
      switch (eventType) {
        case 'intrusion':
          severity = 'critical';
          description = '檢測到未授權入侵';
          break;
        case 'fire':
          severity = 'critical';
          description = '火災警報觸發';
          break;
        case 'noise':
          severity = 'medium';
          description = '異常噪音檢測';
          break;
        case 'door':
          severity = 'high';
          description = '門禁異常開啟';
          break;
        case 'window':
          severity = 'medium';
          description = '窗戶感應器觸發';
          break;
        case 'system':
          severity = 'low';
          description = '系統異常警告';
          break;
        default:
          severity = 'medium';
          description = '檢測到異常活動';
      }
    }
    
    events.push({
      id: `past-${i}`,
      timestamp: getDateOffset(-minutesAgo),
      isAnomaly,
      imageUrl: isAnomaly 
        ? `/camera-feed-anomaly-${(i % 3) + 1}.jpg` 
        : `/camera-feed-normal-${(i % 5) + 1}.jpg`,
      location,
      description,
      severity,
      eventType,
      resolved: !isAnomaly || Math.random() > 0.3
    });
  }
  
  return events;
};

// Generate security alerts
export const generateSecurityAlerts = (): SecurityAlert[] => {
  return [
    {
      id: 'alert-1',
      timestamp: getDateOffset(-15),
      title: '多次入侵嘗試',
      message: '前門在過去30分鐘內檢測到3次未授權訪問嘗試',
      type: 'danger',
      acknowledged: false
    },
    {
      id: 'alert-2',
      timestamp: getDateOffset(-45),
      title: '攝影機離線',
      message: '車庫攝影機已離線超過1小時',
      type: 'warning',
      acknowledged: false
    },
    {
      id: 'alert-3',
      timestamp: getDateOffset(-120),
      title: '系統維護提醒',
      message: '建議在下週進行例行系統檢查',
      type: 'info',
      acknowledged: true
    }
  ];
};

// System status
export const getSystemStatus = (): SystemStatus => {
  return {
    cameras: {
      online: 4,
      total: 5
    },
    sensors: {
      active: 12,
      total: 15
    },
    alerts: {
      unresolved: 2,
      total: 8
    },
    lastUpdate: new Date()
  };
};

// Sample live camera feeds with more details
export const cameraFeeds = [
  { id: 'cam1', name: '前門', status: 'online', quality: 'HD', recording: true },
  { id: 'cam2', name: '側門', status: 'online', quality: 'HD', recording: true },
  { id: 'cam3', name: '後門', status: 'online', quality: 'HD', recording: false },
  { id: 'cam4', name: '車庫', status: 'offline', quality: 'SD', recording: false },
  { id: 'cam5', name: '花園', status: 'online', quality: 'HD', recording: true }
];
