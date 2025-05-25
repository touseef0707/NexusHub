'use client';

import { useState } from 'react';
import { Bell, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample notification data for demo purposes
const DEMO_NOTIFICATIONS = [
  {
    id: '1',
    title: 'New comment',
    message: 'John Doe commented on your project',
    timestamp: new Date().toISOString(),
    read: false,
  },
  {
    id: '2',
    title: 'Task updated',
    message: 'Task "Create wireframes" was marked as completed',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    read: true,
  },
  {
    id: '3',
    title: 'New team member',
    message: 'Jane Smith joined the project',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    read: false,
  }
];

export const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const handleClearNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="relative">
      <button
        onClick={toggleNotifications}
        className="relative p-2 text-foreground hover:text-primary focus:outline-none"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-destructive rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-card/80 backdrop-blur-sm rounded-md shadow-lg overflow-hidden z-50 border border-border">
          <div className="p-3 bg-muted/90 backdrop-blur-sm flex justify-between items-center">
            <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
            <button
              onClick={handleClearAll}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Clear all
            </button>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-border flex items-start ${
                    !notification.read ? 'bg-primary/10' : ''
                  }`}
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{notification.title}</h4>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground/70 mt-1">
                      {formatTimestamp(notification.timestamp)}
                    </p>
                  </div>
                  <button
                    onClick={() => handleClearNotification(notification.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="p-3 bg-muted/90 backdrop-blur-sm text-center">
            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}; 