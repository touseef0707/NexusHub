'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, LogOut, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface AccountTabProps {
  user: {
    role: string;
  };
}

export function AccountTab({ user }: AccountTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>
          Manage your account preferences and security settings.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="role">Account Type</Label>
          <Input 
            id="role" 
            value={user.role === 'creator' ? 'YouTuber (Creator)' : 'Video Editor'} 
            disabled 
          />
          <p className="text-xs text-muted-foreground mt-1">
            Your account type determines your permissions and available features.
          </p>
        </div>
        
        <div className="border-t pt-6">
          <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5 text-muted-foreground" />
            <span>Security</span>
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Password</h4>
                <p className="text-sm text-muted-foreground">
                  Change your password to keep your account secure.
                </p>
              </div>
              <Button variant="outline">Change Password</Button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account.
                </p>
              </div>
              <Button variant="outline">Enable 2FA</Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="text-destructive hover:bg-destructive/10">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
        <Link href="https://accounts.clerk.dev/account" target="_blank">
          <Button variant="outline" className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            <span>Manage Account</span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
} 