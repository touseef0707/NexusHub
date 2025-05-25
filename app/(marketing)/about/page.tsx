import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SignedIn, SignedOut, SignUpButton } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'About NexusHub | YouTube Collaboration Platform',
  description: 'Learn about NexusHub, the all-in-one platform for YouTube creators and video editors to collaborate seamlessly.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-red-500 to-blue-500 text-transparent bg-clip-text">
          About NexusHub
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Empowering creators and editors to collaborate seamlessly in the digital content ecosystem.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-muted-foreground mb-4">
            NexusHub was born from a simple observation: YouTube creators and video editors
            lacked a dedicated platform to collaborate efficiently. In 2023, our team of
            passionate developers and content creators came together to solve this problem.
          </p>
          <p className="text-muted-foreground mb-4">
            We've experienced firsthand the challenges of managing projects across multiple
            platforms, tracking revisions, and maintaining clear communication. NexusHub
            is our solution - a unified workspace where creativity thrives through
            seamless collaboration.
          </p>
          <p className="text-muted-foreground">
            Today, NexusHub serves thousands of creators and editors worldwide, helping them
            produce better content faster while building stronger professional relationships.
          </p>
        </div>
        <div className="bg-card rounded-lg p-8 shadow-lg border border-border">
          <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
          <p className="text-muted-foreground mb-6">
            To empower digital content creators with tools that simplify collaboration,
            streamline workflows, and foster creativity.
          </p>
          <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
          <p className="text-muted-foreground">
            A world where creators and their teams can focus on what matters most -
            creating amazing content that inspires and entertains.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="bg-card rounded-lg overflow-hidden shadow-md border border-border">
            <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-6xl text-white">👨‍💻</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Alex Johnson</h3>
              <p className="text-sm text-muted-foreground mb-4">Founder & CEO</p>
              <p className="text-muted-foreground">
                Former YouTube creator with over 1M subscribers, Alex founded NexusHub
                to solve the collaboration challenges he faced with his editing team.
              </p>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="bg-card rounded-lg overflow-hidden shadow-md border border-border">
            <div className="h-48 bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center">
              <span className="text-6xl text-white">👩‍💻</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Sarah Chen</h3>
              <p className="text-sm text-muted-foreground mb-4">CTO</p>
              <p className="text-muted-foreground">
                With 10+ years in software development, Sarah leads our engineering team
                in building a platform that's both powerful and intuitive.
              </p>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="bg-card rounded-lg overflow-hidden shadow-md border border-border">
            <div className="h-48 bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
              <span className="text-6xl text-white">🎨</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Miguel Rodriguez</h3>
              <p className="text-sm text-muted-foreground mb-4">Head of Design</p>
              <p className="text-muted-foreground">
                Miguel brings his experience as both a video editor and UX designer
                to create an interface that feels natural to creative professionals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-card rounded-lg shadow-md border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Innovation</h3>
            <p className="text-muted-foreground">
              We're constantly pushing the boundaries of what's possible in creative collaboration.
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg shadow-md border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Community</h3>
            <p className="text-muted-foreground">
              We believe in the power of connection and building strong relationships between creators and editors.
            </p>
          </div>

          <div className="p-6 bg-card rounded-lg shadow-md border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Trust</h3>
            <p className="text-muted-foreground">
              We're committed to building a secure platform where your creative work and data are protected.
            </p>
          </div>
        </div>
      </div>

      {/* Organizations Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Organizations for YouTube Channels</h2>
        <p className="text-lg text-muted-foreground text-center mb-10 max-w-3xl mx-auto">
          Manage multiple YouTube channels efficiently with our organization feature. Create dedicated workspaces for each channel and collaborate seamlessly with your team.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="p-6 bg-card rounded-lg shadow-md border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Channel Management</h3>
            <p className="text-muted-foreground mb-4">
              Create separate organizations for each of your YouTube channels to keep projects, team members, and resources organized.
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 pl-4">
              <li>Dedicated workspace for each channel</li>
              <li>Channel-specific projects and tasks</li>
              <li>Customized workflows per channel</li>
            </ul>
          </div>
          
          <div className="p-6 bg-card rounded-lg shadow-md border border-border">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Team Collaboration</h3>
            <p className="text-muted-foreground mb-4">
              Invite team members to specific channel organizations and assign appropriate roles and permissions.
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 pl-4">
              <li>Role-based access control</li>
              <li>Channel-specific team management</li>
              <li>Seamless collaboration between creators and editors</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-md border border-border">
          <h3 className="text-xl font-bold mb-4 text-center">How to Get Started with Organizations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mb-3">1</div>
              <h4 className="font-semibold mb-2">Create an Organization</h4>
              <p className="text-muted-foreground text-sm">Create a new organization for your YouTube channel through the dashboard dropdown menu.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mb-3">2</div>
              <h4 className="font-semibold mb-2">Invite Team Members</h4>
              <p className="text-muted-foreground text-sm">Add editors, designers, and other team members to your organization with appropriate roles.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mb-3">3</div>
              <h4 className="font-semibold mb-2">Create Projects</h4>
              <p className="text-muted-foreground text-sm">Start creating projects specific to your YouTube channel and collaborate with your team.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-card p-10 rounded-xl shadow-lg border border-border">
        <h2 className="text-3xl font-bold mb-6">Ready to transform your creative workflow?</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of creators and editors who are already using NexusHub to collaborate more effectively.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <SignedOut>
            <Button asChild size="lg">
              <SignUpButton mode="modal">
                Get Started
              </SignUpButton>
            </Button>
          </SignedOut>
          <SignedIn>
            <Button asChild size="lg">
              <Link href="/organizations">Go to Organizations</Link>
            </Button>
          </SignedIn>

          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 