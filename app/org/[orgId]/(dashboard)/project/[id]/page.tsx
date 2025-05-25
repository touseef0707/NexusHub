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
import { Progress } from "@/components/ui/progress";
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
import { DateDisplay } from '@/components/DateDisplay';
import { staticProjects } from '@/app/data/projects';
import ProjectFilesTab from '@/components/ProjectFilesTab';
import Mux from '@mux/mux-node';


interface ProjectPageProps {
  params: {
    id: string;
    orgId: string;
  };
}

// Add this interface near the top of the file with the other interfaces
interface MuxUploadResult {
  id: string;
  status: string;
  filename?: string;
  [key: string]: any;
}

// Initialize Mux API client
const muxClient = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET
});

export const generateMetadata = async ({ params }: ProjectPageProps): Promise<Metadata> => {
  const { id } = await params;
  const project = staticProjects.find(p => p.projectId === id);
  return {
    title: `${project?.title || 'Project'} | NexusHub`,
    description: project?.description || 'View and manage your project details',
  };
};

// Add this helper function at the top level
function getRandomAvatar(userId: string) {
  // Use the last character of the ID to determine gender
  const isGirl = parseInt(userId.slice(-1)) % 2 === 0;
  const gender = isGirl ? 'girl' : 'boy';
  return `https://avatar.iran.liara.run/public/${gender}?username=${userId}`;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id, orgId } = await params;
  
  // Find the project from static data
  const project = staticProjects.find(p => p.projectId === id && p.orgId === orgId);
  
  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh]">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <Link href={`/org/${orgId}/projects`}>
          <Button variant="outline">Back to Projects</Button>
        </Link>
      </div>
    );
  }

  // Generate Mux upload URL for this project
  let uploadConfig = null;
  try {
    const upload = await muxClient.video.uploads.create({
      new_asset_settings: {
        playback_policy: ['public']
      } as any,
      cors_origin: '*'
    });
    
    uploadConfig = {
      uploadId: upload.id,
      uploadUrl: upload.url
    };
  } catch (error) {
    console.error('Error creating Mux upload URL:', error);
    // Continue rendering the page even if upload URL generation fails
  }

  // Mock team data (in a real app, this would come from a database)
  const teamData = {
    creator: {
      id: 'user-1',
      name: 'Alex Johnson',
      email: 'alex@example.com',
      initials: 'AJ',
    },
    team: [
      {
        id: 'user-2',
        name: 'Sarah Chen',
        email: 'sarah@example.com',
        role: 'Editor',
        initials: 'SC',
      },
      {
        id: 'user-3',
        name: 'Miguel Rodriguez',
        email: 'miguel@example.com',
        role: 'Videographer',
        initials: 'MR',
      },
      {
        id: 'user-4',
        name: 'Emma Wilson',
        email: 'emma@example.com',
        role: 'Content Writer',
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
          initials: 'SC',
        },
        content: "I've added some transitions to speed up the intro. Check out the latest version!",
        timestamp: '2023-06-17T09:15:00Z',
      },
    ],
    // Add mock videos array
    videos: [
      {
        id: 'video-1',
        uploadId: 'upload-123',
        assetId: 'Yd01fKwp5UoOMQyzL3vrmN027Hu8T3eEzs1jcJPCpBeLo',
        playbackId: 'qvbCpWvMeXF00VYIL4TI202kdMHi1cKh1DEIdI02IxFReg',
        filename: 'Episode 1 - Introduction.mp4',
        status: 'ready' as const,
        duration: 10.00,
        createdAt: new Date().toISOString(),
        projectId: 1
      },
      {
        id: 'video-2',
        uploadId: 'upload-124',
        assetId: 'in4xJ7ip56dXpG2cO8KWd62ELLZR01027uE5AYCCAQo300',
        playbackId: '487XyfU8pggGYGv7O02dEzFJM02imHfy4bGyg4jT49V9w',
        filename: 'Episode 2 - Getting Started.mp4',
        status: 'ready' as const,
        duration: 10.00,
        createdAt: new Date().toISOString(),
        projectId: 1
      },
      {
        id: 'video-3',
        uploadId: 'upload-125',
        assetId: 'Rc5p2dG3QRB3HnThfHMwP3MkGaswu9gUdO9fwuqlBdo',
        playbackId: '00uwl00YH3a6vqR01gJR9dz00ou6d011WEwsW3bdpUga01NB4',
        filename: 'Behind the Scenes - Setup.mp4',
        status: 'ready' as const,
        duration: 10.00,
        createdAt: new Date().toISOString(),
        projectId: 1
      },
      {
        id: 'video-4',
        uploadId: 'upload-126',
        assetId: 'n6wGa02Iaz502C9csFcThL139702VObEyCspmrUfK0100NLg',
        playbackId: 'iA7m9jBQLTml3AInN02nt1ZQjOjMOc8T12ut73m4cQl8',
        filename: 'Diy Ideas.mp4',
        status: 'ready' as const,
        duration: 10.00,
        createdAt: new Date().toISOString(),
        projectId: 2
      },
    ]
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href={`/org/${orgId}/projects`}>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
            <p className="text-muted-foreground mt-1">
              Project ID: {project.projectId}
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
                <p className="text-sm font-medium">{teamData.creator.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Created on</p>
                <p className="text-sm font-medium">
                  <DateDisplay date={project.createdAt || ''} />
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Deadline</p>
                <p className="text-sm font-medium">
                  <DateDisplay date={project.deadline} />
                </p>
              </div>
            </div>
            
            <div className="space-y-1 mb-6">
              <p className="text-sm text-muted-foreground">Description</p>
              <p className="text-sm">{project.description}</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{project.progress || 0}%</span>
              </div>
              <Progress 
                value={project.progress || 0} 
                className={`h-2 ${
                  project.status === 'completed' 
                    ? '[&>div]:bg-green-500' 
                    : project.status === 'in-progress' 
                      ? '[&>div]:bg-blue-500' 
                      : '[&>div]:bg-orange-500'
                }`}
              />
            </div>
          </CardContent>
        </Card>

        {/* Team Members Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Members
            </CardTitle>
            <CardDescription>
              {project.teamSize} members working on this project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Project Creator */}
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={getRandomAvatar(teamData.creator.id)} alt={teamData.creator.name} />
                  <AvatarFallback>{teamData.creator.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{teamData.creator.name}</p>
                  <p className="text-xs text-muted-foreground">Project Creator</p>
                </div>
              </div>

              {/* Team Members */}
              {teamData.team.map((member) => (
                <div key={member.id} className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={getRandomAvatar(member.id)} alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}

              {/* Add Member Button */}
              <Button variant="outline" className="w-full mt-4">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Team Member
              </Button>
            </div>
          </CardContent>
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
                  {teamData.tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-muted-foreground">{task.description}</p>
                          <div className="mt-2">
                            <Progress 
                              value={task.status === 'completed' ? 100 : task.status === 'in-progress' ? 50 : 0} 
                              className={`h-1.5 ${
                                task.status === 'completed' 
                                  ? '[&>div]:bg-green-500' 
                                  : task.status === 'in-progress' 
                                    ? '[&>div]:bg-blue-500' 
                                    : '[&>div]:bg-orange-500'
                              }`}
                            />
                          </div>
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
                        {task.assignedTo === teamData.creator.id 
                          ? teamData.creator.name 
                          : teamData.team.find(m => m.id === task.assignedTo)?.name}
                      </TableCell>
                      <TableCell>
                        <DateDisplay date={task.dueDate} />
                      </TableCell>
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
                {teamData.comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    <Avatar>
                      <AvatarImage src={getRandomAvatar(comment.user.id)} alt={comment.user.name} />
                      <AvatarFallback>{comment.user.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{comment.user.name}</span>
                        <span className="text-xs text-muted-foreground">
                          <DateDisplay date={comment.timestamp} showTime />
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
          <ProjectFilesTab 
            projectId={id} 
            initialVideos={teamData.videos as any}
            uploadConfig={uploadConfig}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
} 