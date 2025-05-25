'use server';

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type UserWithMeta = {
  publicMetadata?: {
    role?: string;
  };
  [key: string]: any;
};

export default async function DashboardPage({ params }: { params: { orgId: string } }) {
  // Get the current user
  const user = await currentUser();
  
  // Redirect if not authenticated
  if (!user) {
    redirect('/');
  }

  // Get the organization ID from params
  const orgId = params.orgId;
  
  // Get user's role from public metadata
  const userWithMeta = user as UserWithMeta;
  const userRole = userWithMeta.publicMetadata?.role as string || 'creator';
  
  // Create organization-specific links
  const orgPrefix = `/org/${orgId}`;
  
  return (
    <div>
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold leading-7  sm:truncate sm:text-3xl sm:tracking-tight">
          Dashboard
        </h1>
        <div className="mt-3 flex sm:ml-4 sm:mt-0">
          {userRole === 'creator' && (
            <Link href={`${orgPrefix}/projects/new`}>
              <button type="button" className="inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                <svg
                  className="-ml-1 mr-2 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                New Project
              </button>
            </Link>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Stats Cards */}
        {/* Projects */}
        <div className=" overflow-hidden shadow border rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0  rounded-md p-3">
                <svg
                  className="h-6 w-6 text-primary-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active Projects</dt>
                  <dd>
                    <div className="text-lg font-medium ">0</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className=" px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link href={`${orgPrefix}/projects`} className="font-medium text-primary-600 hover:text-primary-500">
                View all projects
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className=" overflow-hidden shadow border rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0  rounded-md p-3">
                <svg
                  className="h-6 w-6 text-primary-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Recent Activity</dt>
                  <dd>
                    <div className="text-lg font-medium ">No recent activity</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className=" px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link href="#" className="font-medium text-primary-600 hover:text-primary-500">
                View notifications
              </Link>
            </div>
          </div>
        </div>
        
        {/* Storage Usage */}
        <div className=" overflow-hidden shadow border rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0  rounded-md p-3">
                <svg
                  className="h-6 w-6 text-primary-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Storage Usage</dt>
                  <dd>
                    <div className="text-lg font-medium ">0 MB / 5 GB</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className=" px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link href="#" className="font-medium text-primary-600 hover:text-primary-500">
                Manage storage
              </Link>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-8 text-base font-semibold leading-6 ">Quick Access</h2>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Quick access cards */}
        <Card>
          <CardHeader>
            <CardTitle>Create a new project</CardTitle>
            <CardDescription>Set up a new video collaboration project</CardDescription>
          </CardHeader>
          <CardContent>
            Start from scratch or use one of our templates to kickstart your YouTube video production.
          </CardContent>
          <CardFooter>
            <Link href={`${orgPrefix}/projects/new`} className="w-full">
              <button className="w-full bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-600 transition-colors">
                Get Started
              </button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Manage Organization</CardTitle>
            <CardDescription>Configure organization settings</CardDescription>
          </CardHeader>
          <CardContent>
            Customize your organization's profile, billing details, and branding settings.
          </CardContent>
          <CardFooter>
            <Link href={`${orgPrefix}/settings`} className="w-full">
              <button className="w-full bg-card text-foreground border border-border px-4 py-2 rounded-md hover:bg-accent transition-colors">
                Go to Settings
              </button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Browse Projects</CardTitle>
            <CardDescription>View all your active projects</CardDescription>
          </CardHeader>
          <CardContent>
            See all your ongoing projects and their current status in one place.
          </CardContent>
          <CardFooter>
            <Link href={`${orgPrefix}/projects`} className="w-full">
              <button className="w-full bg-card text-foreground border border-border px-4 py-2 rounded-md hover:bg-accent transition-colors">
                View Projects
              </button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 