'use client';

import { UserButton, OrganizationSwitcher, useOrganization } from '@clerk/nextjs';
import Link from 'next/link';
import { ReactNode } from 'react';
import { Notifications } from '@/components/ui/Notifications';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { 
  Home, 
  FolderKanban,
  LayoutDashboard, 
  Users, 
  Settings, 
  Menu 
} from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { organization } = useOrganization();
  
  // Extract organization ID from the path if available
  const getOrgIdFromPath = () => {
    const segments = pathname.split('/').filter(segment => segment);
    if (segments.length >= 2 && segments[0] === 'org') {
      return segments[1];
    }
    return null;
  };
  
  // Get the organization ID either from the Clerk hook or from the URL path
  const orgId = organization?.id || getOrgIdFromPath();
  
  // Create organization-specific links
  const orgPrefix = orgId ? `/org/${orgId}` : '';
  
  // Extract the current path suffix after the orgId
  const getCurrentPathSuffix = () => {
    // Split the path by '/' and remove empty segments
    const segments = pathname.split('/').filter(segment => segment);
    
    // The first segment should be 'org', the second should be the orgId
    if (segments.length >= 2 && segments[0] === 'org') {
      // Return everything after the orgId, or 'dashboard' if nothing follows
      return segments.slice(2).join('/') || 'dashboard';
    }
    
    return 'dashboard';
  };
  
  // Create the redirect URL template for organization switching
  const afterSelectUrl = `/org/:id/${getCurrentPathSuffix()}`;
  
  // Helper to determine if a link is active
  const isActiveLink = (path: string) => {
    if (!path) return false;
    return pathname.includes(path);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-card border-r border-border">
          <div className="flex items-center flex-shrink-0 px-4">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-blue-500 text-transparent bg-clip-text">NexusHub</span>
            </Link>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              <Link
                href="/"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-foreground hover:bg-accent/80 transition-colors"
              >
                <Home className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                Home
              </Link>

              <Link
                href={`${orgPrefix}/`}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActiveLink('/dashboard') 
                    ? 'bg-accent text-foreground' 
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                } transition-colors`}
              >
                <LayoutDashboard className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                Dashboard
              </Link>

              <Link
                href={`${orgPrefix}/projects`}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActiveLink('/projects') 
                    ? 'bg-accent text-foreground' 
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                } transition-colors`}
              >
                <FolderKanban className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                Projects
              </Link>

              <Link
                href={`${orgPrefix}/settings`}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActiveLink('/settings') 
                    ? 'bg-accent text-foreground' 
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                } transition-colors`}
              >
                <Settings className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                Settings
              </Link>
            </nav>
          </div>
          <div className="flex-shrink-0 flex flex-col border-t border-border p-4 space-y-3">
            <div className="flex items-center">
              <div>
                <UserButton />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-foreground">
                  My Account
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        <div className="bg-card shadow">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="md:hidden flex items-center">
                  <button
                    type="button"
                    className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
                  >
                    <span className="sr-only">Open sidebar</span>
                    <Menu className="h-6 w-6" />
                  </button>
                </div>
                <div className="flex-shrink-0 flex items-center md:hidden">
                  <Link href="/" className="flex items-center">
                    <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-blue-500 text-transparent bg-clip-text">NexusHub</span>
                  </Link>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <OrganizationSwitcher 
                    hidePersonal
                    afterSelectOrganizationUrl={afterSelectUrl}
                    appearance={{
                      elements: {
                        organizationSwitcherTrigger: "border border-border bg-background/80 backdrop-blur-sm rounded-md p-2",
                        organizationPreview: "text-foreground",
                        organizationSwitcherPopoverCard: "bg-background border-border",
                        organizationSwitcherPopoverAction: "text-foreground hover:bg-secondary",
                        organizationSwitcherPopoverActionButton: "text-muted-foreground hover:text-foreground",
                        organizationSwitcherPopoverActionButtonIcon: "text-muted-foreground",
                        organizationSwitcherPopoverActionButtonText: "text-foreground",
                        organizationSwitcherPopoverFooter: "border-t border-border"
                      }
                    }}
                  />
                </div>
                <ThemeToggle />
                <Notifications />
                <div className="ml-3 md:hidden">
                  <UserButton />
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 