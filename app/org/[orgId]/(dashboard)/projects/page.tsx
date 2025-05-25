import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from "@/components/ui/progress";
import { 
  Search, 
  Filter,
  Clock,
} from 'lucide-react';
import { CreateProjectForm } from '@/components/projects/create-project-form';
import { auth } from "@clerk/nextjs/server";
import { staticProjects } from "@/app/data/projects";
import { ProjectCard } from '@/components/projects/project-card';

interface Project {
  projectId: string;
  orgId: string;
  title: string;
  description: string;
  status: 'planning' | 'in-progress' | 'completed';
  deadline: string;
  teamSize: number;
  starred?: boolean;
  thumbnail?: string;
  progress?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Define a type for the page props
interface ProjectsPageProps {
  params: {
    orgId: string;
  };
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  // Use orgId from route params as fallback
  const { orgId: clerkOrgId } = auth();
  const orgId = clerkOrgId || params.orgId;
  
  if (!orgId) {
    return null;
  }
  
  // Filter static projects to only include the first three projects (IDs 1-3)
  const allProjects = [...staticProjects]
    .filter(project => ["1", "2", "3"].includes(project.projectId))
    .sort((a, b) => {
      if (a.starred && !b.starred) return -1;
      if (!a.starred && b.starred) return 1;
      return 0;
    });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-2">
            Manage and track all your YouTube video projects.
          </p>
        </div>
        <CreateProjectForm />
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

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="starred">Starred</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects.map((project) => (
              <ProjectCard key={project.projectId} project={project} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="in-progress" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects
              .filter((project) => project.status === 'in-progress')
              .map((project) => (
                <ProjectCard key={project.projectId} project={project} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="planning" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects
              .filter((project) => project.status === 'planning')
              .map((project) => (
                <ProjectCard key={project.projectId} project={project} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects
              .filter((project) => project.status === 'completed')
              .map((project) => (
                <ProjectCard key={project.projectId} project={project} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="starred" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allProjects
              .filter((project) => project.starred)
              .map((project) => (
                <ProjectCard key={project.projectId} project={project} />
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
            <div className="text-3xl font-bold">{allProjects.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {allProjects.length} total projects
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {allProjects.filter(p => p.status === 'in-progress').length}
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                {Math.round((allProjects.filter(p => p.status === 'in-progress').length / allProjects.length) * 100)}% of total projects
              </p>
              <Progress value={Math.round((allProjects.filter(p => p.status === 'in-progress').length / allProjects.length) * 100)} className="h-1" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {allProjects.filter(p => p.status === 'completed').length}
            </div>
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">
                {Math.round((allProjects.filter(p => p.status === 'completed').length / allProjects.length) * 100)}% of total projects
              </p>
              <Progress value={Math.round((allProjects.filter(p => p.status === 'completed').length / allProjects.length) * 100)} className="h-1" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 