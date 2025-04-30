
import { SecurityEvent } from '../types/securityTypes';

// Helper to create a date object n minutes in the past or future
const getDateOffset = (minutesOffset: number): Date => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + minutesOffset);
  return date;
};

// Generate security events for the last 6 hours, with some anomalies
export const generateSecurityEvents = (): SecurityEvent[] => {
  const events: SecurityEvent[] = [];
  
  // Current time event (always normal)
  events.push({
    id: 'current',
    timestamp: new Date(),
    isAnomaly: false,
    imageUrl: '/camera-feed-normal-1.jpg',
    location: '前門',
    description: '正常活動'
  });
  
  // Generate past events (last 6 hours, 10 minute intervals)
  for (let i = 1; i <= 36; i++) {
    const minutesAgo = i * 10;
    // Add anomalies at specific times
    const isAnomaly = [2, 8, 15, 22, 29].includes(i);
    
    events.push({
      id: `past-${i}`,
      timestamp: getDateOffset(-minutesAgo),
      isAnomaly,
      imageUrl: isAnomaly 
        ? `/camera-feed-anomaly-${(i % 3) + 1}.jpg` 
        : `/camera-feed-normal-${(i % 5) + 1}.jpg`,
      location: i % 3 === 0 ? '後門' : i % 2 === 0 ? '側門' : '前門',
      description: isAnomaly ? '檢測到異常活動' : '正常活動'
    });
  }
  
  return events;
};

// Sample live camera feeds
export const cameraFeeds = [
  { id: 'cam1', name: '前門', status: 'online' },
  { id: 'cam2', name: '側門', status: 'online' },
  { id: 'cam3', name: '後門', status: 'online' },
  { id: 'cam4', name: '車庫', status: 'offline' },
  { id: 'cam5', name: '花園', status: 'online' }
];
