
import React from 'react';
import { Clock } from "lucide-react";

interface SecurityHeaderProps {
  currentTime: string;
}

const SecurityHeader: React.FC<SecurityHeaderProps> = ({ currentTime }) => {
  return (
    <header className="h-14 border-b border-security-muted/20 flex items-center justify-between px-4">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">智慧保全系統</h1>
      </div>
      <div className="flex items-center">
        <Clock className="h-4 w-4 mr-2" />
        <span className="font-mono">{currentTime}</span>
      </div>
    </header>
  );
};

export default SecurityHeader;
