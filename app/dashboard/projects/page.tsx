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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  PlusCircle, 
  Search, 
  MoreHorizontal, 
  Calendar, 
  Users, 
  Clock,
  Star,
  StarOff,
  Filter
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Projects | NexusHub',
  description: 'Manage your YouTube collaboration projects.',
};

// Mock projects data
const projects = [
  {
    id: '1',
    title: 'Summer Vlog Series',
    description: 'A series of travel vlogs for the summer season.',
    status: 'in-progress',
    dueDate: 'Jul 15, 2023',
    teamSize: 4,
    progress: 65,
    starred: true,
    thumbnail: '/sample_thumbnails/vlog.jpg',
  },
  {
    id: '2',
    title: 'Product Review: Tech Gadgets',
    description: 'Comprehensive reviews of the latest tech gadgets.',
    status: 'planning',
    dueDate: 'Aug 10, 2023',
    teamSize: 2,
    progress: 20,
    starred: true,
    thumbnail: '/sample_thumbnails/gadget.jpg',
  },
  {
    id: '3',
    title: 'Cooking Tutorial Series',
    description: 'Step-by-step cooking tutorials for beginners.',
    status: 'completed',
    dueDate: 'Jun 30, 2023',
    teamSize: 3,
    progress: 100,
    starred: false,
    thumbnail: '/sample_thumbnails/cook.jpg',
  },
  {
    id: '4', 
    title: 'Fitness Challenge',
    description: '30-day fitness challenge with daily workout videos.',
    status: 'in-progress',
    dueDate: 'Jul 25, 2023',
    teamSize: 2,
    progress: 50,
    starred: false,
    thumbnail: '/sample_thumbnails/fitness.jpg',
  },
  {
    id: '5',
    title: 'Gaming Walkthrough',
    description: 'Complete walkthrough of the latest RPG game.',
    status: 'planning',
    dueDate: 'Aug 20, 2023',
    teamSize: 1,
    progress: 10,
    starred: false,
    thumbnail: '/sample_thumbnails/gaming.jpg',
  },
  {
    id: '6',
    title: 'DIY Home Decor',
    description: 'Creative DIY projects for home decoration.',
    status: 'completed',
    dueDate: 'Jun 15, 2023',
    teamSize: 2,
    progress: 100,
    starred: false,
    thumbnail: '/sample_thumbnails/diy.jpg',
  },
];

// Project card component
function ProjectCard({ project }: { project: typeof projects[0] }) {
  return (
    <Card className="overflow-hidden">
      <div className="h-40 bg-muted relative">
        <Link href={`/dashboard/project/${project.id}`} className="absolute inset-0 z-10">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            {project.thumbnail ? (
              <img 
                src={project.thumbnail} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <span>No Thumbnail</span>
            )}
          </div>
        </Link>
        <div className="absolute top-2 right-2 z-20">
          <Button variant="ghost" size="icon" className="bg-background/80 backdrop-blur-sm">
            {project.starred ? (
              <Star className="h-4 w-4 text-yellow-500" />
            ) : (
              <StarOff className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="absolute bottom-2 left-2">
          <Badge 
            variant={
              project.status === 'completed' 
                ? 'outline' 
                : project.status === 'in-progress' 
                  ? 'default' 
                  : 'secondary'
            }
          >
            {project.status === 'in-progress' 
              ? 'In Progress' 
              : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">
            <Link href={`/dashboard/project/${project.id}`} className="hover:underline">
              {project.title}
            </Link>
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-background/80 backdrop-blur-sm border-border">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Edit Project</DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={`/dashboard/project/${project.id}`} className="flex w-full">
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Share Project</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Delete Project</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
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
      <CardFooter className="pt-2">
        <div className="flex justify-between items-center w-full text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{project.dueDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{project.teamSize}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function ProjectsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-2">
            Manage and track all your YouTube video projects.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          <span>New Project</span>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search projects..." className="pl-8" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>Recent</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="starred">Starred</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="in-progress" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((project) => project.status === 'in-progress')
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="planning" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((project) => project.status === 'planning')
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((project) => project.status === 'completed')
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="starred" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((project) => project.starred)
              .map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{projects.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {projects.filter(p => p.status === 'in-progress').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {Math.round((projects.filter(p => p.status === 'in-progress').length / projects.length) * 100)}% of total projects
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {projects.filter(p => p.status === 'completed').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +1 from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest updates from your projects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Users className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Sarah Chen joined "Summer Vlog Series"</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">"Cooking Tutorial Series" marked as completed</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <PlusCircle className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">New project "Fitness Challenge" created</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm" className="w-full">View All Activity</Button>
        </CardFooter>
      </Card>
    </div>
  );
} 