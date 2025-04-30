
export interface SecurityEvent {
  id: string;
  timestamp: Date;
  isAnomaly: boolean;
  imageUrl: string;
  location: string;
  description: string;
}

export interface PersonCount {
  id: string;
  timestamp: Date;
  count: number;
  images: string[];
  location: string;
}
