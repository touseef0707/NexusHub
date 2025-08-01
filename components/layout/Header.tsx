'use client';
import Link from 'next/link';
import { UserButton, SignedIn, SignedOut, SignInButton, OrganizationSwitcher, useOrganization } from '@clerk/nextjs';
import { Button } from '../ui/button';
import { ThemeToggle } from '../ui/theme-toggle';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
  const { organization, isLoaded } = useOrganization();
  const pathname = usePathname();
  const router = useRouter();
  
  const isOrgSelected = isLoaded && organization !== null;
  const orgId = organization?.id;
  const dashboardHref = isOrgSelected ? `/org/${orgId}/` : '#';
  
  const handleOrganizationChange = (orgId: string) => {
    if (orgId && pathname.includes('/org/')) {
      router.push(`/org/${orgId}/`);
    }
  };
  
  return (
    <header className="bg-background border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-red-500 to-blue-500 text-transparent bg-clip-text">NexusHub</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-foreground hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full">
              Home
            </Link>
            <Link href="/pricing" className="text-foreground hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full">
              Pricing
            </Link>
            <Link href="/about" className="text-foreground hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full">
              About
            </Link>
            <Link href="/contact" className="text-foreground hover:text-primary relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all hover:after:w-full">
              Contact
            </Link>
            <SignedIn>
              <Link 
                href={dashboardHref}
                className={`${isOrgSelected 
                  ? 'text-foreground hover:text-primary cursor-pointer' 
                  : 'text-muted-foreground cursor-not-allowed'} 
                  relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 
                  ${isOrgSelected ? 'after:bg-primary after:transition-all hover:after:w-full' : ''}`}
                onClick={(e) => !isOrgSelected && e.preventDefault()}
              >
                Dashboard
              </Link>
            </SignedIn>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <SignedIn>
              <div className="hidden md:block">
                <OrganizationSwitcher 
                  hidePersonal
                  afterSelectOrganizationUrl={`/org/:id/`}
                />
              </div>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline">Sign In / Sign Up</Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 