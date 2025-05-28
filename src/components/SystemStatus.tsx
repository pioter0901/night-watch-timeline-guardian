
import React from 'react';
import { SystemStatus as SystemStatusType } from '@/types/securityTypes';
import { formatFullTime } from '@/utils/timeUtils';
import { Shield, Camera, Zap, AlertTriangle } from 'lucide-react';

interface SystemStatusProps {
  status: SystemStatusType;
}

const SystemStatus: React.FC<SystemStatusProps> = ({ status }) => {
  return (
    <div className="space-y-4">
      <div className="border-b border-security-muted/30 mb-3 pb-2">
        <h2 className="text-xl font-semibold">系統狀態</h2>
        <p className="text-sm text-security-muted">
          最後更新: {formatFullTime(status.lastUpdate)}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Cameras Status */}
        <div className="bg-security-dark rounded-md p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Camera className="h-5 w-5 mr-2 text-blue-400" />
              <span className="text-sm font-medium">攝影機</span>
            </div>
            <span className={`text-sm ${status.cameras.online === status.cameras.total ? 'text-green-400' : 'text-yellow-400'}`}>
              {status.cameras.online}/{status.cameras.total}
            </span>
          </div>
          <div className="w-full bg-security-muted/20 rounded-full h-2">
            <div 
              className="bg-blue-400 h-2 rounded-full" 
              style={{ width: `${(status.cameras.online / status.cameras.total) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Sensors Status */}
        <div className="bg-security-dark rounded-md p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Zap className="h-5 w-5 mr-2 text-green-400" />
              <span className="text-sm font-medium">感應器</span>
            </div>
            <span className={`text-sm ${status.sensors.active === status.sensors.total ? 'text-green-400' : 'text-yellow-400'}`}>
              {status.sensors.active}/{status.sensors.total}
            </span>
          </div>
          <div className="w-full bg-security-muted/20 rounded-full h-2">
            <div 
              className="bg-green-400 h-2 rounded-full" 
              style={{ width: `${(status.sensors.active / status.sensors.total) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Alerts Status */}
        <div className="bg-security-dark rounded-md p-4 col-span-2">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-security-anomaly" />
              <span className="text-sm font-medium">未處理警報</span>
            </div>
            <span className={`text-sm ${status.alerts.unresolved === 0 ? 'text-green-400' : 'text-security-anomaly'}`}>
              {status.alerts.unresolved}
            </span>
          </div>
          {status.alerts.unresolved > 0 && (
            <div className="text-xs text-security-anomaly">
              需要立即處理 {status.alerts.unresolved} 個警報
            </div>
          )}
        </div>

        {/* System Health */}
        <div className="bg-security-dark rounded-md p-4 col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-400" />
              <span className="text-sm font-medium">系統健康度</span>
            </div>
            <span className="text-sm text-green-400">良好</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;
