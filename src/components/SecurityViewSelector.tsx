
import React from 'react';
import { Activity, AlertTriangle, Shield } from "lucide-react";

interface SecurityViewSelectorProps {
  securityView: 'monitoring' | 'alerts' | 'status';
  onViewChange: (view: 'monitoring' | 'alerts' | 'status') => void;
  unacknowledgedAlertsCount: number;
}

const SecurityViewSelector: React.FC<SecurityViewSelectorProps> = ({ 
  securityView, 
  onViewChange, 
  unacknowledgedAlertsCount 
}) => {
  return (
    <div className="ml-6 flex space-x-2">
      <button 
        className={`px-2 py-1 rounded text-xs ${securityView === 'monitoring' ? 'bg-blue-500 text-white' : 'text-security-muted hover:text-white'}`}
        onClick={() => onViewChange('monitoring')}
      >
        <Activity className="h-3 w-3 inline mr-1" />
        監控
      </button>
      <button 
        className={`px-2 py-1 rounded text-xs relative ${securityView === 'alerts' ? 'bg-red-500 text-white' : 'text-security-muted hover:text-white'}`}
        onClick={() => onViewChange('alerts')}
      >
        <AlertTriangle className="h-3 w-3 inline mr-1" />
        警報
        {unacknowledgedAlertsCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {unacknowledgedAlertsCount}
          </span>
        )}
      </button>
      <button 
        className={`px-2 py-1 rounded text-xs ${securityView === 'status' ? 'bg-green-500 text-white' : 'text-security-muted hover:text-white'}`}
        onClick={() => onViewChange('status')}
      >
        <Shield className="h-3 w-3 inline mr-1" />
        狀態
      </button>
    </div>
  );
};

export default SecurityViewSelector;
