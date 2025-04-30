
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('zh-TW', { 
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatFullTime = (date: Date): string => {
  return date.toLocaleString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

export const isCurrentHour = (date: Date): boolean => {
  const now = new Date();
  return date.getHours() === now.getHours() && 
         date.getDate() === now.getDate() &&
         date.getMonth() === now.getMonth() &&
         date.getFullYear() === now.getFullYear();
};
