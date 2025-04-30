
export interface SecurityEvent {
  id: string;
  timestamp: Date;
  isAnomaly: boolean;
  imageUrl: string;
  location: string;
  description: string;
}
