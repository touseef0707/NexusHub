import { UserButton } from '@clerk/nextjs';
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

export default function DashboardLayout({ children }: { children: ReactNode }) {
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
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-foreground bg-accent transition-colors hover:bg-accent/80"
              >
                <Home className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                Home
              </Link>

              <Link
                href="/dashboard"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-foreground bg-accent transition-colors hover:bg-accent/80"
              >
                <LayoutDashboard className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                Dashboard
              </Link>

              <Link
                href="/dashboard/projects"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                <FolderKanban className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                Projects
              </Link>

              <Link
                href="/dashboard/team"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                <Users className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                Team
              </Link>

              <Link
                href="/dashboard/settings"
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
              >
                <Settings className="mr-3 h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                Settings
              </Link>
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-border p-4">
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