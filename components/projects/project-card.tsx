"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
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
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from "@/components/ui/progress";
import { 
  MoreHorizontal, 
  Calendar, 
  Star,
  StarOff
} from 'lucide-react';

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

export function ProjectCard({ project }: { project: Project }) {
  // Use projectId to determine avatar type (boy/girl)
  const avatarType = parseInt(project.projectId) % 2 === 0 ? 'girl' : 'boy';
  const avatarUrl = `https://avatar.iran.liara.run/public/${avatarType}`;

  return (
    <Card className="border border-border hover:border-primary transition-all">
      {project.thumbnail && (
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-background/50 hover:bg-background/80 backdrop-blur-sm"
            onClick={() => {
              // Handle star toggle
              console.log('Toggle star for project:', project.projectId);
            }}
          >
            {project.starred ? (
              <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
            ) : (
              <StarOff className="h-6 w-6 text-muted-foreground hover:text-yellow-400" />
            )}
          </Button>
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">
            <Link href={`/org/${project.orgId}/project/${project.projectId}`} className="hover:underline">
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
                <Link href={`/org/${project.orgId}/project/${project.projectId}`} className="flex w-full">
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
      <CardContent className="space-y-3">
        {project.progress !== undefined && (
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span>{project.progress}%</span>
            </div>
            <Progress 
              value={project.progress} 
              className={`h-1.5 ${project.status === 'completed' ? '[&>div]:bg-green-500' : project.status === 'in-progress' ? '[&>div]:bg-blue-500' : '[&>div]:bg-orange-500'}`}
            />
          </div>
        )}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {new Date(project.deadline).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={project.status === 'completed' ? 'default' : 'secondary'}>
              {project.status}
            </Badge>
            <Avatar className="h-6 w-6">
              <AvatarImage src={avatarUrl} alt="Project avatar" />
              <AvatarFallback>{project.title[0]}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 