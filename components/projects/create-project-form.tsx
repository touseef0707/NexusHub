"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CalendarIcon, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/components/ui/use-toast";

// Helper function to format dates
function formatDate(date: Date | undefined): string {
  if (!date) return "";
  
  // Format as "Month Day, Year" (e.g., "January 1, 2023")
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Helper function to format ISO string
function toISOString(date: Date | undefined): string {
  if (!date) return "";
  return date.toISOString();
}

interface FormData {
  title: string;
  description: string;
  status: string;
  deadline: string;
  thumbnail: string;
}

export function CreateProjectForm() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Partial<Record<keyof FormData, string>>>({});
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(undefined);
  
  const [formData, setFormData] = React.useState<FormData>({
    title: "",
    description: "",
    status: "planning",
    deadline: "",
    thumbnail: ""
  });

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.title || formData.title.length < 2) {
      newErrors.title = "Title must be at least 2 characters.";
    }
    
    if (formData.thumbnail && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.thumbnail)) {
      newErrors.thumbnail = "Please enter a valid URL.";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, status: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    setFormData(prev => ({ 
      ...prev, 
      deadline: date ? toISOString(date) : "" 
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const isValid = validateForm();
    if (!isValid) return;
    
    setIsLoading(true);

    try {
      // Get orgId from the URL
      const pathParts = window.location.pathname.split('/');
      const orgId = pathParts[2]; // /org/[orgId]/projects

      // Call API to create project
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: process.env.NEXT_PUBLIC_CLERK_USER_ID,
          orgId: orgId,
          ...formData,
          deadline: toISOString(selectedDate)
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create project');
      }

      // Reset form and close dialog
      setFormData({
        title: "",
        description: "",
        status: "planning",
        deadline: "",
        thumbnail: ""
      });
      setSelectedDate(undefined);
      setOpen(false);
      toast({
        title: "Success!",
        description: "Your project has been created.",
      });
      router.refresh();
    } catch (error) {
      console.error("Error creating project:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create project",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Project</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px] w-full p-6 overflow-y-auto max-h-[95vh]">
        <DialogHeader className="text-center mb-4">
          <DialogTitle className="text-xl">Create New Project</DialogTitle>
          <DialogDescription>
            Fill out the form below to create a new YouTube project.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Text Inputs */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className={cn(errors.title ? "text-destructive" : "")}>
                  Project Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter project title"
                  value={formData.title}
                  onChange={handleChange}
                  className={cn(errors.title ? "border-destructive" : "")}
                  required
                />
                {errors.title && (
                  <p className="text-sm font-medium text-destructive">{errors.title}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Enter project description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={handleSelectChange}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planning">Planning</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="selected-date">Deadline</Label>
                  <div
                    id="selected-date"
                    className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm"
                  >
                    {selectedDate ? (
                      <span className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                        {formatDate(selectedDate)}
                      </span>
                    ) : (
                      <span className="flex items-center text-muted-foreground">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        No date selected
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="thumbnail" className={cn(errors.thumbnail ? "text-destructive" : "")}>
                  Thumbnail URL
                </Label>
                <Input
                  id="thumbnail"
                  name="thumbnail"
                  placeholder="Enter thumbnail URL (optional)"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  className={cn(errors.thumbnail ? "border-destructive" : "")}
                />
                {errors.thumbnail && (
                  <p className="text-sm font-medium text-destructive">{errors.thumbnail}</p>
                )}
                <p className="text-sm text-muted-foreground">
                  Provide a URL to the thumbnail image for your project.
                </p>
              </div>
            </div>
            
            {/* Right Column - Calendar & Create Button */}
            <div className="flex flex-col items-center space-y-8">
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateChange}
                  className="rounded-md border shadow-sm"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full max-w-[200px] mt-auto"
              >
                {isLoading ? "Creating..." : "Create Project"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 