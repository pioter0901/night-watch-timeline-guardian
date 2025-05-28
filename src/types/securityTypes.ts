
export interface SecurityEvent {
  id: string;
  timestamp: Date;
  isAnomaly: boolean;
  imageUrl: string;
  location: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  eventType: 'motion' | 'intrusion' | 'noise' | 'fire' | 'door' | 'window' | 'system';
  resolved: boolean;
}

export interface PersonCount {
  id: string;
  timestamp: Date;
  count: number;
  images: string[];
  location: string;
}

export interface SecurityAlert {
  id: string;
  timestamp: Date;
  title: string;
  message: string;
  type: 'warning' | 'danger' | 'info';
  acknowledged: boolean;
}

export interface SystemStatus {
  cameras: {
    online: number;
    total: number;
  };
  sensors: {
    active: number;
    total: number;
  };
  alerts: {
    unresolved: number;
    total: number;
  };
  lastUpdate: Date;
}
