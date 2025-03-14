'use client';

import { useUser } from '@clerk/nextjs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { InfoIcon } from 'lucide-react';

export function ProfileTab() {
  // Get user data from Clerk
  const { user, isLoaded } = useUser();
  
  // Extract user details or provide fallbacks
  const firstName = user?.firstName || '';
  const lastName = user?.lastName || '';
  const email = user?.primaryEmailAddress?.emailAddress || '';
  const imageUrl = user?.imageUrl || '';
  const initials = user ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}` : '';

  if (!isLoaded) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Loading your profile information...
          </CardDescription>
        </CardHeader>
        <CardContent className="h-64 flex items-center justify-center">
          <div className="animate-pulse h-8 w-32 bg-muted rounded"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          View your profile information as it appears across the platform.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start gap-6">
          <Avatar className="h-20 w-20 flex-shrink-0">
            <AvatarImage src={imageUrl} alt={`${firstName} ${lastName}`} />
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          
          <div className="bg-muted/50 p-3 rounded-md flex items-start gap-2 text-sm text-muted-foreground flex-1">
            <InfoIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <p>
              To update your profile information, click on the user icon at the bottom left of the screen.
              Profile details are managed through Clerk authentication service.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input 
              id="firstName" 
              value={firstName} 
              disabled
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              id="lastName" 
              value={lastName} 
              disabled
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" value={email} disabled />
            <p className="text-xs text-muted-foreground mt-1">
              Your email address is used for sign-in and notifications.
            </p>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea 
              id="bio" 
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Your bio will appear here"
              value={user?.publicMetadata?.bio as string || ''}
              disabled
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 