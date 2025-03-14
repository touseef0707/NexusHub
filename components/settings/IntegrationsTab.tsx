'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Youtube } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  connected: boolean;
  bgColor: string;
}

export function IntegrationsTab() {
  const [statusMessage, setStatusMessage] = useState('');
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'youtube',
      name: 'YouTube',
      description: 'Connect your YouTube account to access your channel data.',
      icon: <Youtube className="h-6 w-6 text-red-600" />,
      connected: false,
      bgColor: 'bg-red-100',
    },
    {
      id: 'facebook',
      name: 'Facebook',
      description: 'Share your content directly to Facebook.',
      icon: (
        <svg className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
        </svg>
      ),
      connected: false,
      bgColor: 'bg-blue-100',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      description: 'Share your content directly to Instagram.',
      icon: (
        <svg className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
        </svg>
      ),
      connected: false,
      bgColor: 'bg-purple-100',
    },
  ]);

  const handleConnect = (id: string) => {
    // Simulate connecting to the service
    const integration = integrations.find((i) => i.id === id);
    const isConnecting = integration ? !integration.connected : false;
    
    setIntegrations(
      integrations.map((integration) =>
        integration.id === id
          ? { ...integration, connected: !integration.connected }
          : integration
      )
    );

    if (integration) {
      const message = isConnecting 
        ? `Connected to ${integration.name} successfully!` 
        : `Disconnected from ${integration.name} successfully!`;
      
      setStatusMessage(message);
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setStatusMessage('');
      }, 3000);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
        <CardDescription>
          Connect your accounts to enhance your workflow.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {statusMessage && (
          <div className="bg-green-50 text-green-800 px-4 py-2 rounded-md text-sm mb-4">
            {statusMessage}
          </div>
        )}
        
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center gap-4">
              <div className={`${integration.bgColor} p-3 rounded-full`}>
                {integration.icon}
              </div>
              <div>
                <h3 className="font-medium">{integration.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {integration.description}
                </p>
              </div>
            </div>
            <Button
              variant={integration.connected ? "outline" : "default"}
              onClick={() => handleConnect(integration.id)}
            >
              {integration.connected ? "Disconnect" : "Connect"}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
} 