'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import MuxUploader from '@mux/mux-uploader-react';
import { Upload, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Define interfaces for the component props and video data
interface ProjectFileUploaderProps {
  projectId: string;
  onUploadSuccess: (upload: VideoUploadData) => void;
  onCancel?: () => void;
  uploadConfig?: {
    uploadId: string;
    uploadUrl: string;
  } | null;
}

interface VideoUploadData {
  id: string;
  uploadId: string;
  filename?: string;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  assetId?: string;
  playbackId?: string;
  createdAt: string;
}

export default function ProjectFileUploader({ projectId, onUploadSuccess, onCancel, uploadConfig }: ProjectFileUploaderProps) {
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [uploadId, setUploadId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Initialize with provided uploadConfig if available
  useEffect(() => {
    if (uploadConfig) {
      setUploadUrl(uploadConfig.uploadUrl);
      setUploadId(uploadConfig.uploadId);
    }
  }, [uploadConfig]);

  const getUploadUrl = async () => {
    // If we already have a pre-generated upload URL from the page component, use it
    if (uploadConfig) {
      setUploadUrl(uploadConfig.uploadUrl);
      setUploadId(uploadConfig.uploadId);
      return;
    }

    // Otherwise, fetch a new one (as fallback)
    setIsLoading(true);
    setUploadError(null);
    try {
      const response = await fetch(`/api/projects/${projectId}/upload-url`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: Failed to get upload URL`);
      }
      
      const data = await response.json();
      setUploadUrl(data.uploadUrl);
      setUploadId(data.uploadId);
    } catch (error) {
      console.error('Error getting upload URL:', error);
      setUploadError('Failed to initialize upload. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize upload on component mount if not provided via uploadConfig
  useEffect(() => {
    if (!uploadConfig) {
      getUploadUrl();
    }
  }, [projectId, uploadConfig]);

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Upload New Video</CardTitle>
          {onCancel && (
            <Button variant="ghost" size="icon" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <CardDescription>
          Upload video files for your project
        </CardDescription>
      </CardHeader>
      <CardContent>
        {uploadError && (
          <div className="bg-destructive/10 text-destructive rounded-md p-3 mb-4 text-sm">
            {uploadError}
            <Button variant="link" className="p-0 h-auto ml-2" onClick={getUploadUrl}>
              Try again
            </Button>
          </div>
        )}
        
        {!uploadUrl || !uploadId ? (
          <div className="flex items-center justify-center h-32 border-2 border-dashed rounded-md">
            <Button 
              onClick={getUploadUrl} 
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              {isLoading ? 'Preparing Upload...' : 'Initialize Upload'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-md p-4 bg-muted/50">
              <p className="text-sm text-center mb-3">
                Click below to select files or drag and drop your video here
              </p>
              <MuxUploader 
                endpoint={uploadUrl} 
                onSuccess={(event) => {
                  // Create a new video entry with the upload ID
                  const newVideo: VideoUploadData = {
                    id: `video-${Date.now()}`,
                    uploadId: uploadId,
                    filename: `video-${Date.now()}.mp4`, // Simplified for demo purposes
                    status: 'processing',
                    createdAt: new Date().toISOString()
                  };
                  
                  onUploadSuccess(newVideo);
                  setUploadUrl(null);
                  setUploadId(null);
                }}
                className="w-full !min-h-[100px]"
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Supported formats: MP4, MOV, AVI, MKV (Max 2GB)
      </CardFooter>
    </Card>
  );
} 