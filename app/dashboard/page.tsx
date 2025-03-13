import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();
  
  // Get user's role from public metadata
  const userRole = user?.publicMetadata?.role as string || 'creator';
  
  return (
    <div>
      <div className="border-b border-gray-200 pb-5 sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold leading-7  sm:truncate sm:text-3xl sm:tracking-tight">
          Dashboard
        </h1>
        <div className="mt-3 flex sm:ml-4 sm:mt-0">
          {userRole === 'creator' && (
            <Link href="/dashboard/projects/new">
              <Button>
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
              </Button>
            </Link>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-medium ">Welcome, {user?.firstName || 'User'}!</h2>
        <p className="mt-1 text-sm text-gray-500">
          {userRole === 'creator'
            ? 'Manage your video projects and collaborate with editors.'
            : 'View and work on projects assigned to you.'}
        </p>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Active Projects */}
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
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
              <Link href="/dashboard/projects" className="font-medium text-primary-600 hover:text-primary-500">
                View all projects
              </Link>
            </div>
          </div>
        </div>

        {/* Team Members */}
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Team Members</dt>
                  <dd>
                    <div className="text-lg font-medium ">0</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className=" px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link href="/dashboard/team" className="font-medium text-primary-600 hover:text-primary-500">
                Manage team
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="overflow-hidden shadow border rounded-lg">
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
                    <div className="text-lg font-medium ">0</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className=" px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link href="/dashboard/activity" className="font-medium text-primary-600 hover:text-primary-500">
                View all activity
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="mt-8">
        <h2 className="text-lg font-medium ">Recent Projects</h2>
        <div className="mt-4  shadow border overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            <li>
              <div className="px-4 py-4 flex items-center sm:px-6">
                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                  <div className="truncate">
                    <div className="flex text-sm">
                      <p className="font-medium text-primary-600 truncate">No projects found</p>
                    </div>
                    <div className="mt-2 flex">
                      <div className="flex items-center text-sm text-gray-500">
                        <p>
                          {userRole === 'creator'
                            ? 'Create your first project to get started'
                            : 'You have no assigned projects yet'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 