'use client';

interface DateDisplayProps {
  date: string;
  showTime?: boolean;
}

export function DateDisplay({ date, showTime = false }: DateDisplayProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  if (!showTime) {
    return <>{formattedDate}</>;
  }

  const formattedTime = new Date(date).toLocaleTimeString([], { 
    hour: '2-digit',
    minute: '2-digit'
  });

  return <>{formattedDate} at {formattedTime}</>;
} 