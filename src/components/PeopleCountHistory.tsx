
import React from 'react';
import { PersonCount } from '@/types/securityTypes';
import { formatFullTime } from '@/utils/timeUtils';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Users } from 'lucide-react';

interface PeopleCountHistoryProps {
  sessions: PersonCount[];
  onSelectSession: (session: PersonCount) => void;
  selectedSession: PersonCount | null;
}

const PeopleCountHistory: React.FC<PeopleCountHistoryProps> = ({ 
  sessions, 
  onSelectSession,
  selectedSession
}) => {
  if (sessions.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-security-muted">
        <div className="text-center p-4">
          <p className="mb-2">尚無計數紀錄</p>
          <p className="text-sm">請按下「開始計數」按鈕開始一個新的計數工作</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>時間</TableHead>
            <TableHead>地點</TableHead>
            <TableHead className="text-right">人數</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sessions.map((session) => (
            <TableRow 
              key={session.id} 
              className={`cursor-pointer ${selectedSession?.id === session.id ? 'bg-security-muted/30' : ''}`}
              onClick={() => onSelectSession(session)}
            >
              <TableCell>{formatFullTime(session.timestamp)}</TableCell>
              <TableCell>{session.location}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end">
                  <Users className="h-4 w-4 mr-1 text-security-muted" />
                  {session.count}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PeopleCountHistory;
