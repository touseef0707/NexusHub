'use client';

import { useOrganizationContext } from '@/components/providers/organization-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';

export function OrganizationList() {
  const { userMemberships, isLoaded, setActive } = useOrganizationContext();
  const router = useRouter();

  const handleOrganizationClick = async (organizationId: string) => {
    try {
      if (setActive) {
        await setActive({ organization: organizationId });
      }
      router.push(`/org/${organizationId}/dashboard`);
    } catch (error) {
      console.error('Failed to set active organization:', error);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const hasOrganizations = userMemberships?.data && userMemberships.data.length > 0;

  return (
    <div className="space-y-6">
      {!hasOrganizations ? (
        <Card className="border border-border">
          <CardHeader>
            <CardTitle>No Channels Connected</CardTitle>
            <CardDescription>
              You currently do not have any channels connected. Click on the "Add Channel" button to connect your YouTube channels and manage your projects and teams for each channel.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href="/organizations/new">
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Channel
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userMemberships.data.map((membership) => (
            <Card 
              key={membership.organization.id} 
              className="border border-border hover:border-primary cursor-pointer transition-all"
              onClick={() => handleOrganizationClick(membership.organization.id)}
            >
              <CardHeader className="pb-2">
                <CardTitle>{membership.organization.name}</CardTitle>
                <CardDescription>
                  {membership.role}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  {membership.organization.membersCount} member{membership.organization.membersCount !== 1 ? 's' : ''}
                </p>
              </CardContent>
            </Card>
          ))}
          <Card className="border border-dashed border-border hover:border-primary cursor-pointer transition-all h-full flex flex-col justify-center items-center p-6">
            <Link href="/organizations/new" className="h-full w-full flex flex-col items-center justify-center">
              <PlusCircle className="h-12 w-12 mb-4 text-muted-foreground" />
              <p className="text-muted-foreground font-medium">Add New Channel</p>
            </Link>
          </Card>
        </div>
      )}
    </div>
  );
} 