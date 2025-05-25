import { Metadata } from 'next';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { ProfileTab } from '@/components/settings/ProfileTab';
import { AccountTab } from '@/components/settings/AccountTab';
import { NotificationsTab } from '@/components/settings/NotificationsTab';
import { IntegrationsTab } from '@/components/settings/IntegrationsTab';
import { BillingTab } from '@/components/settings/BillingTab';

export const metadata: Metadata = {
  title: 'Settings | NexusHub',
  description: 'Manage your account settings and preferences.',
};

export default function SettingsPage() {
  // Mock user data for components that still need it
  // In a real app, this would come from authentication
  const user = {
    role: 'creator',
  };
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-6 space-y-6">
          <ProfileTab />
        </TabsContent>
        
        {/* Account Tab */}
        <TabsContent value="account" className="mt-6 space-y-6">
          <AccountTab user={user} />
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-6 space-y-6">
          <NotificationsTab />
        </TabsContent>
        
        {/* Integrations Tab */}
        <TabsContent value="integrations" className="mt-6 space-y-6">
          <IntegrationsTab />
        </TabsContent>
        
        {/* Billing Tab */}
        <TabsContent value="billing" className="mt-6 space-y-6">
          <BillingTab />
        </TabsContent>
      </Tabs>
    </div>
  );
} 