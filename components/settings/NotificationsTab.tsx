'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export function NotificationsTab() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [emailNotifications, setEmailNotifications] = useState({
    comments: true,
    projects: true,
    team: true,
  });
  
  const [appNotifications, setAppNotifications] = useState({
    comments: true,
    tasks: true,
  });

  const handleEmailNotificationChange = (key: keyof typeof emailNotifications) => {
    setEmailNotifications({
      ...emailNotifications,
      [key]: !emailNotifications[key],
    });
  };

  const handleAppNotificationChange = (key: keyof typeof appNotifications) => {
    setAppNotifications({
      ...appNotifications,
      [key]: !appNotifications[key],
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    setSuccessMessage('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage('Notification preferences updated successfully!');
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>
          Manage how and when you receive notifications.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="email-comments" 
                checked={emailNotifications.comments}
                onCheckedChange={() => handleEmailNotificationChange('comments')}
              />
              <div className="space-y-1 leading-none">
                <Label
                  htmlFor="email-comments"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Comments
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when someone comments on your project.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="email-projects" 
                checked={emailNotifications.projects}
                onCheckedChange={() => handleEmailNotificationChange('projects')}
              />
              <div className="space-y-1 leading-none">
                <Label
                  htmlFor="email-projects"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Projects
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when a project is updated or completed.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="email-team" 
                checked={emailNotifications.team}
                onCheckedChange={() => handleEmailNotificationChange('team')}
              />
              <div className="space-y-1 leading-none">
                <Label
                  htmlFor="email-team"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Team
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get notified when someone joins or leaves your team.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4">In-App Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="app-comments" 
                checked={appNotifications.comments}
                onCheckedChange={() => handleAppNotificationChange('comments')}
              />
              <div className="space-y-1 leading-none">
                <Label
                  htmlFor="app-comments"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Comments
                </Label>
                <p className="text-sm text-muted-foreground">
                  Show notifications for new comments.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="app-tasks" 
                checked={appNotifications.tasks}
                onCheckedChange={() => handleAppNotificationChange('tasks')}
              />
              <div className="space-y-1 leading-none">
                <Label
                  htmlFor="app-tasks"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Tasks
                </Label>
                <p className="text-sm text-muted-foreground">
                  Show notifications for task assignments and updates.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {successMessage && (
          <div className="bg-green-50 text-green-800 px-4 py-2 rounded-md text-sm">
            {successMessage}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save Preferences"}
        </Button>
      </CardFooter>
    </Card>
  );
} 