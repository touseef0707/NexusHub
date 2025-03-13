import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';

export default async function SettingsPage() {
  const { userId } = await auth();
  const user = await currentUser();
  
  // Get user's role from public metadata
  const userRole = user?.publicMetadata?.role as string || 'creator';
  
  return (
    <div>
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          Settings
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="mt-6">
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="bg-white py-6 px-4 sm:p-6">
            <div>
              <h2 className="text-lg font-medium leading-6 text-gray-900">Profile</h2>
              <p className="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-6">
              <div className="col-span-4 sm:col-span-2">
                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    defaultValue={user?.firstName || ''}
                    disabled
                  />
                </div>
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    defaultValue={user?.lastName || ''}
                    disabled
                  />
                </div>
              </div>

              <div className="col-span-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    defaultValue={user?.emailAddresses[0]?.emailAddress || ''}
                    disabled
                  />
                </div>
              </div>

              <div className="col-span-4">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="role"
                    id="role"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    defaultValue={userRole === 'creator' ? 'YouTuber (Creator)' : 'Video Editor'}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <Link href="https://accounts.clerk.dev/account">
              <Button type="button">
                Manage Account
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {userRole === 'creator' && (
        <div className="mt-6">
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="bg-white py-6 px-4 sm:p-6">
              <div>
                <h2 className="text-lg font-medium leading-6 text-gray-900">YouTube Integration</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Connect your YouTube account to access your channel data.
                </p>
              </div>

              <div className="mt-6">
                <div className="flex items-center">
                  <div className="bg-red-100 rounded-full p-3">
                    <svg
                      className="h-6 w-6 text-red-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900">YouTube Account</h3>
                    <p className="text-sm text-gray-500">Not connected</p>
                  </div>
                  <div className="ml-auto">
                    <Button>
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="bg-white py-6 px-4 sm:p-6">
            <div>
              <h2 className="text-lg font-medium leading-6 text-gray-900">Notifications</h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage how you receive notifications.
              </p>
            </div>

            <div className="mt-6">
              <fieldset>
                <legend className="text-base font-medium text-gray-900">By Email</legend>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="comments" className="font-medium text-gray-700">
                        Comments
                      </label>
                      <p className="text-gray-500">Get notified when someone comments on your project.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="projects"
                        name="projects"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        defaultChecked
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="projects" className="font-medium text-gray-700">
                        Projects
                      </label>
                      <p className="text-gray-500">Get notified when a project is updated or completed.</p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <Button type="button">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 