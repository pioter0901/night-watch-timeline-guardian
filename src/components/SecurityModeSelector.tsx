
import React from 'react';

interface SecurityModeSelectorProps {
  mode: 'security' | 'counting';
  onModeChange: (mode: 'security' | 'counting') => void;
}

const SecurityModeSelector: React.FC<SecurityModeSelectorProps> = ({ mode, onModeChange }) => {
  return (
    <div className="ml-6 flex space-x-4">
      <button 
        className={`px-3 py-1 rounded-md text-sm ${mode === 'security' ? 'bg-security-muted/30 text-white' : 'text-security-muted hover:text-white'}`}
        onClick={() => onModeChange('security')}
      >
        夜間監控
      </button>
      <button 
        className={`px-3 py-1 rounded-md text-sm ${mode === 'counting' ? 'bg-security-muted/30 text-white' : 'text-security-muted hover:text-white'}`}
        onClick={() => onModeChange('counting')}
      >
        日間人員計數
      </button>
    </div>
  );
};

export default SecurityModeSelector;
