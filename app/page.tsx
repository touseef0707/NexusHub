import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Streamline Your YouTube Collaboration
                </h1>
                <p className="text-xl mb-8">
                  NexusHub connects YouTubers with video editors for seamless collaboration on video projects.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <SignedOut>

                    <SignUpButton mode="modal">
                      <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                        Get Started
                      </Button>
                    </SignUpButton>
                  </SignedOut>
                  <Link href="/about">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/20 hover:bg-primary-foreground/10">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="relative h-96 w-full">
                  <Image
                    src="/hero-image.png"
                    alt="NexusHub Platform"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Everything You Need for YouTube Collaboration
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                NexusHub provides all the tools you need to manage your video projects efficiently.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-card p-8 rounded-lg shadow-md border">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Team Collaboration
                </h3>
                <p className="text-muted-foreground">
                  Invite editors to your organization and assign them to specific projects with customizable permissions.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-card p-8 rounded-lg shadow-md border">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Project Workspaces
                </h3>
                <p className="text-muted-foreground">
                  Dedicated workspaces for each video project with all the tools and resources needed for collaboration.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-card p-8 rounded-lg shadow-md border">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Real-time Notifications
                </h3>
                <p className="text-muted-foreground">
                  Stay updated with real-time notifications about project updates, comments, and deadlines.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Transform Your YouTube Workflow?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Join thousands of YouTubers and video editors who are already using NexusHub to streamline their collaboration.
            </p>
            <SignedOut>
            <SignInButton mode="modal">
              <Button size="lg">
                Get Started for Free
              </Button>
            </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">Visit Your Dashboard</Link>
              </Button>
            </SignedIn>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}