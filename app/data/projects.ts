export interface Project {
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

export const staticProjects: Project[] = [
  {
    projectId: "1",
    orgId: "default",
    title: "Cooking Masterclass Series",
    description: "Create a series of cooking tutorials featuring international cuisines and techniques",
    status: "in-progress",
    deadline: "2025-04-15",
    teamSize: 3,
    starred: true,
    thumbnail: "/sample_thumbnails/cook.jpg",
    progress: 65,
    createdAt: "2025-04-01",
    updatedAt: "2025-05-15"
  },
  {
    projectId: "2",
    orgId: "default",
    title: "DIY Home Projects",
    description: "Weekly DIY tutorials for home improvement and decoration projects",
    status: "planning",
    deadline: "2025-05-30",
    teamSize: 2,
    thumbnail: "/sample_thumbnails/diy.jpg",
    progress: 30,
    createdAt: "2025-04-15",
    updatedAt: "2025-05-10"
  },
  {
    projectId: "3",
    orgId: "default",
    title: "Fitness Journey Vlog",
    description: "Document a 90-day fitness transformation journey with workout routines and nutrition tips",
    status: "completed",
    deadline: "2025-05-28",
    teamSize: 1,
    thumbnail: "/sample_thumbnails/fitness.jpg",
    progress: 100,
    createdAt: "2025-01-01",
    updatedAt: "2025-05-28"
  },
  {
    projectId: "4",
    orgId: "default",
    title: "Tech Gadget Reviews",
    description: "In-depth reviews and tutorials for the latest tech gadgets and accessories",
    status: "in-progress",
    deadline: "2025-04-30",
    teamSize: 4,
    starred: true,
    thumbnail: "/sample_thumbnails/gadget.jpg",
    progress: 45,
    createdAt: "2025-04-20",
    updatedAt: "2025-05-15"
  },
  {
    projectId: "5",
    orgId: "default",
    title: "Gaming Highlights",
    description: "Weekly gaming highlights, tips, and tricks for popular games",
    status: "planning",
    deadline: "2025-05-15",
    teamSize: 2,
    thumbnail: "/sample_thumbnails/gaming.jpg",
    progress: 20,
    createdAt: "2025-05-01",
    updatedAt: "2025-05-15"
  },
  {
    projectId: "6",
    orgId: "default",
    title: "Daily Life Vlog",
    description: "Share daily life experiences, travel adventures, and lifestyle content",
    status: "in-progress",
    deadline: "2025-04-20",
    teamSize: 2,
    thumbnail: "/sample_thumbnails/vlog.jpg",
    progress: 40,
    createdAt: "2025-04-25",
    updatedAt: "2025-05-15"
  }
]; 