
import React from 'react';
import { PersonCount } from '@/types/securityTypes';
import { formatFullTime } from '@/utils/timeUtils';
import { Users } from 'lucide-react';

interface PeopleCountDetailProps {
  session: PersonCount | null;
}

const PeopleCountDetail: React.FC<PeopleCountDetailProps> = ({ session }) => {
  if (!session) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-security-muted">
        <div className="text-center p-4">
          <p className="mb-2">請點選左側計數紀錄查看詳情</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-security-muted/30 mb-3 pb-2">
        <h2 className="text-xl font-semibold">計數詳情</h2>
        <p className="text-sm text-security-muted">{session.location}</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Session details */}
        <div className="bg-security-dark rounded-md p-4 mb-4">
          <h3 className="text-white font-medium flex items-center">
            <Users className="h-5 w-5 mr-2" />
            檢測到 {session.count} 人
          </h3>
          
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-security-muted">地點:</span>
              <span>{session.location}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-security-muted">時間:</span>
              <span>{formatFullTime(session.timestamp)}</span>
            </div>
          </div>
        </div>

        {/* Images grid */}
        <div className="mt-4">
          <h3 className="text-lg font-medium mb-3">通過人員照片</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-2 gap-3">
            {/* In a real system these would be actual photos, here we're just showing placeholders */}
            {session.count > 0 ? (
              Array(session.count)
                .fill('')
                .map((_, i) => (
                  <div 
                    key={i} 
                    className="aspect-square bg-security-dark border border-security-muted/20 rounded-md overflow-hidden"
                  >
                    <div className="h-full w-full flex items-center justify-center text-security-muted text-xs">
                      人員 #{i + 1}
                    </div>
                  </div>
                ))
            ) : (
              <div className="col-span-2 text-security-muted text-center py-4">
                無照片可顯示
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeopleCountDetail;
