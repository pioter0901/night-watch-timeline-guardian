
import React from 'react';
import { SecurityAlert } from '@/types/securityTypes';
import { formatFullTime } from '@/utils/timeUtils';
import { AlertTriangle, Info, Shield, Check } from 'lucide-react';
import { Button } from './ui/button';

interface SecurityAlertsProps {
  alerts: SecurityAlert[];
  onAcknowledge: (alertId: string) => void;
}

const SecurityAlerts: React.FC<SecurityAlertsProps> = ({ alerts, onAcknowledge }) => {
  const getAlertIcon = (type: SecurityAlert['type']) => {
    switch (type) {
      case 'danger':
        return <AlertTriangle className="h-5 w-5 text-red-400" />;
      case 'warning':
        return <Shield className="h-5 w-5 text-yellow-400" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  const getAlertColor = (type: SecurityAlert['type']) => {
    switch (type) {
      case 'danger':
        return 'border-red-400/50 bg-red-400/10';
      case 'warning':
        return 'border-yellow-400/50 bg-yellow-400/10';
      case 'info':
        return 'border-blue-400/50 bg-blue-400/10';
    }
  };

  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged);
  const acknowledgedAlerts = alerts.filter(alert => alert.acknowledged);

  return (
    <div className="h-full overflow-y-auto">
      <div className="border-b border-security-muted/30 mb-3 pb-2">
        <h2 className="text-xl font-semibold">安全警報</h2>
        <p className="text-sm text-security-muted">
          {unacknowledgedAlerts.length} 個未處理警報
        </p>
      </div>

      <div className="space-y-4">
        {/* Unacknowledged Alerts */}
        {unacknowledgedAlerts.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-security-anomaly mb-2">需要處理</h3>
            <div className="space-y-2">
              {unacknowledgedAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`border rounded-md p-3 ${getAlertColor(alert.type)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{alert.title}</h4>
                        <p className="text-sm text-security-muted mt-1">{alert.message}</p>
                        <p className="text-xs text-security-muted mt-2">
                          {formatFullTime(alert.timestamp)}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onAcknowledge(alert.id)}
                      className="ml-2"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      確認
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Acknowledged Alerts */}
        {acknowledgedAlerts.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-green-400 mb-2">已處理</h3>
            <div className="space-y-2">
              {acknowledgedAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="border border-security-muted/30 bg-security-dark/50 rounded-md p-3 opacity-60"
                >
                  <div className="flex items-start space-x-3">
                    <Check className="h-5 w-5 text-green-400" />
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{alert.title}</h4>
                      <p className="text-sm text-security-muted mt-1">{alert.message}</p>
                      <p className="text-xs text-security-muted mt-2">
                        {formatFullTime(alert.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {alerts.length === 0 && (
          <div className="text-center py-8 text-security-muted">
            <Shield className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>目前沒有安全警報</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityAlerts;
