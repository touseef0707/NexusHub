"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { staticProjects } from '@/app/data/projects';

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

interface ProjectsContextType {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  getProjectById: (projectId: string) => Project | undefined;
}

const ProjectsContext = createContext<ProjectsContextType | undefined>(undefined);

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      // Use static projects data
      setProjects(staticProjects);
      setError(null);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch projects');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const getProjectById = (projectId: string) => {
    return projects.find(project => project.projectId === projectId);
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchProjects();
    }
  }, [isLoaded, isSignedIn]);

  return (
    <ProjectsContext.Provider value={{ projects, loading, error, fetchProjects, getProjectById }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectsProvider');
  }
  return context;
} 