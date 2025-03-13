import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = params;
  const { userId } = await auth();
  const user = await currentUser();
  
  // Get user's role from public metadata
  const userRole = user?.publicMetadata?.role as string || 'creator';
  
  // Mock project data (in a real app, this would come from a database)
  const project = {
    id: params.id,
    title: 'Sample Project',
    description: 'This is a sample project for demonstration purposes.',
    status: 'In Progress',
    createdAt: new Date().toISOString(),
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    creator: {
      id: 'creator-123',
      name: 'John Doe',
    },
    editors: [
      {
        id: 'editor-123',
        name: 'Jane Smith',
      },
    ],
    tasks: [
      {
        id: 'task-1',
        title: 'Script Review',
        status: 'Completed',
        assignedTo: 'creator-123',
      },
      {
        id: 'task-2',
        title: 'Video Editing',
        status: 'In Progress',
        assignedTo: 'editor-123',
      },
      {
        id: 'task-3',
        title: 'Final Review',
        status: 'Not Started',
        assignedTo: 'creator-123',
      },
    ],
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Project ID: {project.id}
                </p>
              </div>
              <div className="flex space-x-3">
                <Link href="/dashboard">
                  <Button variant="outline">Back to Dashboard</Button>
                </Link>
                {userRole === 'creator' && (
                  <Button>Edit Project</Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Details */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">Project Details</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Details and information about the project.
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {project.status}
                      </span>
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Created by</dt>
                    <dd className="mt-1 text-sm text-gray-900">{project.creator.name}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Created at</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Deadline</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(project.deadline).toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Description</dt>
                    <dd className="mt-1 text-sm text-gray-900">{project.description}</dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Tasks */}
            <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h2 className="text-lg leading-6 font-medium text-gray-900">Tasks</h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Project tasks and their status.
                  </p>
                </div>
                {userRole === 'creator' && (
                  <Button size="sm">Add Task</Button>
                )}
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  {project.tasks.map((task) => (
                    <li key={task.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            {task.status === 'Completed' ? (
                              <svg
                                className="h-5 w-5 text-green-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : task.status === 'In Progress' ? (
                              <svg
                                className="h-5 w-5 text-yellow-500"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="h-5 w-5 text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{task.title}</p>
                            <p className="text-sm text-gray-500">
                              Assigned to:{' '}
                              {task.assignedTo === 'creator-123'
                                ? project.creator.name
                                : project.editors.find((e) => e.id === task.assignedTo)?.name}
                            </p>
                          </div>
                        </div>
                        <div>
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              task.status === 'Completed'
                                ? 'bg-green-100 text-green-800'
                                : task.status === 'In Progress'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {task.status}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Team */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h2 className="text-lg leading-6 font-medium text-gray-900">Team</h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    People working on this project.
                  </p>
                </div>
                {userRole === 'creator' && (
                  <Button size="sm" variant="outline">Invite</Button>
                )}
              </div>
              <div className="border-t border-gray-200">
                <ul className="divide-y divide-gray-200">
                  <li className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 font-medium">
                            {project.creator.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{project.creator.name}</p>
                          <p className="text-sm text-gray-500">Creator</p>
                        </div>
                      </div>
                    </div>
                  </li>
                  {project.editors.map((editor) => (
                    <li key={editor.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 font-medium">
                              {editor.name.charAt(0)}
                            </span>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{editor.name}</p>
                            <p className="text-sm text-gray-500">Editor</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Comments */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">Comments</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Project discussion and feedback.
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 font-medium">
                          {project.creator.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2 sm:px-6 sm:py-4">
                      <div className="sm:flex sm:justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{project.creator.name}</p>
                          <p className="text-xs text-gray-500">
                            {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>Let's get started on this project!</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 font-medium">
                          {user?.firstName?.charAt(0) || 'U'}
                        </span>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div>
                        <textarea
                          id="comment"
                          name="comment"
                          rows={3}
                          className="shadow-sm block w-full focus:ring-primary-500 focus:border-primary-500 sm:text-sm border border-gray-300 rounded-md"
                          placeholder="Add a comment..."
                        ></textarea>
                      </div>
                      <div className="mt-3 flex items-center justify-end">
                        <Button type="submit" size="sm">
                          Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 