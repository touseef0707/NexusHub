import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  ArrowLeft, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Edit, 
  MoreHorizontal, 
  PlusCircle, 
  Share2, 
  Users 
} from 'lucide-react';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export const generateMetadata = ({ params }: ProjectPageProps): Metadata => {
  return {
    title: `Project Details | NexusHub`,
    description: 'View and manage your project details',
  };
};

export default function ProjectPage({ params }: ProjectPageProps) {
  const { id } = params;
  
  // Mock project data (in a real app, this would come from a database)
  // This would be fetched based on the project ID from the URL
  const project = {
    id,
    title: 'Summer Vlog Series',
    description: 'A series of travel vlogs for the summer season, featuring destinations across Europe and Asia.',
    status: 'in-progress',
    createdAt: '2023-06-15T10:30:00Z',
    deadline: '2023-07-15T23:59:59Z',
    progress: 65,
    teamSize: 4,
    starred: true,
    thumbnail: '/sample_thumbnails/vlog.jpg',
    creator: {
      id: 'user-1',
      name: 'Alex Johnson',
      email: 'alex@example.com',
      avatar: '/avatars/alex.png',
      initials: 'AJ',
    },
    team: [
      {
        id: 'user-2',
        name: 'Sarah Chen',
        email: 'sarah@example.com',
        role: 'Editor',
        avatar: '/avatars/sarah.png',
        initials: 'SC',
      },
      {
        id: 'user-3',
        name: 'Miguel Rodriguez',
        email: 'miguel@example.com',
        role: 'Videographer',
        avatar: '/avatars/miguel.png',
        initials: 'MR',
      },
      {
        id: 'user-4',
        name: 'Emma Wilson',
        email: 'emma@example.com',
        role: 'Content Writer',
        avatar: '/avatars/emma.png',
        initials: 'EW',
      },
    ],
    tasks: [
      {
        id: 'task-1',
        title: 'Script Review',
        description: 'Review and finalize the script for the first episode',
        status: 'completed',
        assignedTo: 'user-1',
        dueDate: '2023-06-20T23:59:59Z',
      },
      {
        id: 'task-2',
        title: 'Video Editing - Episode 1',
        description: 'Edit raw footage for the first episode',
        status: 'in-progress',
        assignedTo: 'user-2',
        dueDate: '2023-06-25T23:59:59Z',
      },
      {
        id: 'task-3',
        title: 'Thumbnail Design',
        description: 'Create eye-catching thumbnails for all episodes',
        status: 'in-progress',
        assignedTo: 'user-3',
        dueDate: '2023-06-30T23:59:59Z',
      },
      {
        id: 'task-4',
        title: 'Final Review',
        description: 'Final review of the first episode before publishing',
        status: 'not-started',
        assignedTo: 'user-1',
        dueDate: '2023-07-05T23:59:59Z',
      },
    ],
    comments: [
      {
        id: 'comment-1',
        user: {
          id: 'user-1',
          name: 'Alex Johnson',
          avatar: '/avatars/alex.png',
          initials: 'AJ',
        },
        content: "Let's focus on making the intro more engaging. The current version feels a bit slow.",
        timestamp: '2023-06-16T14:30:00Z',
      },
      {
        id: 'comment-2',
        user: {
          id: 'user-2',
          name: 'Sarah Chen',
          avatar: '/avatars/sarah.png',
          initials: 'SC',
        },
        content: "I've added some transitions to speed up the intro. Check out the latest version!",
        timestamp: '2023-06-17T09:15:00Z',
      },
    ],
  };

  // Helper function to format dates
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/projects">
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
            <p className="text-muted-foreground mt-1">
              Project ID: {project.id}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
          <Button className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            <span>Edit Project</span>
          </Button>
        </div>
      </div>

      {/* Project Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Project Overview</CardTitle>
            <CardDescription>
              Details and information about the project.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Status</p>
                <Badge variant={
                  project.status === 'completed' 
                    ? 'outline' 
                    : project.status === 'in-progress' 
                      ? 'default' 
                      : 'secondary'
                }>
                  {project.status === 'in-progress' 
                    ? 'In Progress' 
                    : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Created by</p>
                <p className="text-sm font-medium">{project.creator.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Created on</p>
                <p className="text-sm font-medium">{formatDate(project.createdAt)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Deadline</p>
                <p className="text-sm font-medium">{formatDate(project.deadline)}</p>
              </div>
            </div>
            
            <div className="space-y-1 mb-6">
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="text-sm">{project.description}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${
                    project.status === 'completed' 
                      ? 'bg-green-500' 
                      : 'bg-primary'
                  }`}
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Team</CardTitle>
            <CardDescription>
              People working on this project.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={project.creator.avatar} alt={project.creator.name} />
                  <AvatarFallback>{project.creator.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{project.creator.name}</p>
                  <p className="text-xs text-muted-foreground">Project Creator</p>
                </div>
              </div>
              
              {project.team.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full flex items-center gap-2">
              <PlusCircle className="h-4 w-4" />
              <span>Invite Team Member</span>
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Tabs for Tasks and Comments */}
      <Tabs defaultValue="tasks" className="w-full">
        <TabsList>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tasks" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Project Tasks</CardTitle>
                <CardDescription>
                  Manage and track tasks for this project.
                </CardDescription>
              </div>
              <Button size="sm" className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>Add Task</span>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Task</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {project.tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          task.status === 'completed' 
                            ? 'outline' 
                            : task.status === 'in-progress' 
                              ? 'default' 
                              : 'secondary'
                        }>
                          {task.status === 'in-progress' 
                            ? 'In Progress' 
                            : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {task.assignedTo === project.creator.id 
                          ? project.creator.name 
                          : project.team.find(m => m.id === task.assignedTo)?.name}
                      </TableCell>
                      <TableCell>{formatDate(task.dueDate)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-background/80 backdrop-blur-sm border-border">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Edit Task</DropdownMenuItem>
                            <DropdownMenuItem>Change Status</DropdownMenuItem>
                            <DropdownMenuItem>Reassign</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">Delete Task</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Comments & Discussion</CardTitle>
              <CardDescription>
                Collaborate and discuss the project with your team.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {project.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{comment.user.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(comment.timestamp)} at {new Date(comment.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex gap-4">
                  <Avatar>
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <Textarea placeholder="Add a comment..." className="min-h-[100px]" />
                    <div className="flex justify-end">
                      <Button>Post Comment</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="files" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Project Files</CardTitle>
                <CardDescription>
                  Manage files and assets for this project.
                </CardDescription>
              </div>
              <Button size="sm" className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>Upload File</span>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-md">
                <p className="text-muted-foreground">No files uploaded yet</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 