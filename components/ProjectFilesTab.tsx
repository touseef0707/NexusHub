'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MuxPlayer from '@mux/mux-player-react';
import ProjectFileUploader from '@/components/ProjectFileUploader';
import { DateDisplay } from '@/components/DateDisplay';
import { Button } from '@/components/ui/button';
import { UploadCloud, FileVideo, Play, Info, RefreshCw, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from '@/components/ui/table';

// Types for the component props and video data
interface ProjectFilesTabProps {
  projectId: string;
  initialVideos: ProjectVideo[];
  uploadConfig?: {
    uploadId: string;
    uploadUrl: string;
  } | null;
}

interface ProjectVideo {
  id: string;
  uploadId?: string;
  assetId?: string;
  playbackId?: string;
  filename: string;
  status: 'uploading' | 'processing' | 'ready' | 'error';
  duration?: number;
  createdAt: string;
  projectId: string;
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

export default function ProjectFilesTab({ projectId, initialVideos, uploadConfig }: ProjectFilesTabProps) {
  // Add state to track visibility of the last video
  const [isLastVideoVisible, setIsLastVideoVisible] = useState(false);
  // Add state to track loading state after upload
  const [isLoadingLastVideo, setIsLoadingLastVideo] = useState(false);
  
  const [videos, setVideos] = useState<ProjectVideo[]>(() => {
    // Map initial videos to the new format if needed and assign project IDs
    return initialVideos.map((video, index) => ({
      ...video,
      projectId: video.projectId || `${index + 1}`, // Use existing projectId or assign based on index
      status: video.status as 'uploading' | 'processing' | 'ready' | 'error',
      createdAt: new Date().toISOString() // Set all creation dates to today
    }));
  });
  
  // Filter videos to only show the ones for the current project
  const filteredVideos = useMemo(() => {
    return videos.filter(video => String(video.projectId) === String(projectId));
  }, [videos, projectId]);
  
  // Fixed file sizes for each video
  const videoFileSizes = [78.45, 125.30, 42.18];
  
  const [isUploading, setIsUploading] = useState(false);
  const [isPolling, setIsPolling] = useState(false);

  // Function to handle successful upload - makes the last video visible after loading
  const handleUploadSuccess = (upload: VideoUploadData) => {
    console.log('Upload successful:', upload);
    
    // Instead of adding to videos state, we'll just log it but not display it
    // This simulates a successful upload without showing the video in the UI
    console.log('Uploaded video details:', {
      id: upload.id,
      uploadId: upload.uploadId,
      filename: upload.filename || 'Untitled Video',
      status: 'processing',
      createdAt: new Date().toISOString() // Use today's date instead of the upload timestamp
    });
    
    setIsUploading(false);
    
    // Start the loading animation for the last video
    setIsLoadingLastVideo(true);
    
    // After 4 seconds, make the last video visible
    setTimeout(() => {
      setIsLoadingLastVideo(false);
      setIsLastVideoVisible(true);
    }, 4000);
    
    // Don't start polling since we're not adding the video to the UI
    // setIsPolling(true);
  };

  // Function to cancel upload - also makes the last video visible after loading
  const handleCancelUpload = () => {
    setIsUploading(false);
    
    // Also start loading animation when upload is cancelled
    setIsLoadingLastVideo(true);
    
    // After 4 seconds, make the last video visible
    setTimeout(() => {
      setIsLoadingLastVideo(false);
      setIsLastVideoVisible(true);
    }, 4000);
  };

  // Poll for video status updates
  useEffect(() => {
    if (!isPolling) return;

    const processingVideos = videos.filter(v => 
      v.status === 'uploading' || v.status === 'processing'
    );
    
    if (processingVideos.length === 0) {
      setIsPolling(false);
      return;
    }

    // Set up polling interval
    const interval = setInterval(async () => {
      // In a real app, you would fetch status updates from your API
      // const updatedVideos = await fetchVideoStatusUpdates(processingVideos.map(v => v.id));
      
      // For demo purposes, randomly update a video to 'ready' after a delay
      if (Math.random() > 0.7) {
        setVideos(prev => {
          const updated = [...prev];
          const processingIndex = updated.findIndex(v => v.status === 'processing');
          
          if (processingIndex >= 0) {
            // Simulate a video becoming ready
            updated[processingIndex] = {
              ...updated[processingIndex],
              status: 'ready',
              playbackId: `playback-${Date.now()}`, // In a real app, this would come from your API
            };
          }
          
          return updated;
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPolling, videos]);

  // Function to manually refresh video statuses
  const refreshVideoStatuses = async () => {
    // In a real app, you would fetch updated statuses from your API
    // For demo purposes, just toggle polling
    setIsPolling(prev => !prev);
  };

  // Function to format file size
  const formatFileSize = (mb: number) => {
    return `${mb.toFixed(2)} MB`;
  };

  // Function to get a thumbnail image for the video
  const getThumbnailUrl = (video: ProjectVideo) => {
    if (video.status !== 'ready' || !video.playbackId) {
      return 'https://via.placeholder.com/320x180?text=Processing...';
    }
    return `https://image.mux.com/${video.playbackId}/thumbnail.jpg?time=0&width=320`;
  };

  // Function to determine if a video is raw or processed
  const getVideoType = (video: ProjectVideo) => {
    return video.filename.toLowerCase().includes('raw') ? 'Raw' : 'Processed';
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Project Files</CardTitle>
          <CardDescription>
            Manage files and assets for this project.
          </CardDescription>
        </div>
        <div className="flex gap-2">
          {videos.some(v => v.status === 'processing' || v.status === 'uploading') && (
            <Button 
              variant="outline" 
              size="icon" 
              onClick={refreshVideoStatuses}
              className={`${isPolling ? 'animate-spin' : ''}`}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
          <Button 
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Channelize
          </Button>
          {!isUploading && (
            <Button 
              onClick={() => setIsUploading(true)} 
              className="flex items-center gap-2"
            >
              <UploadCloud className="h-4 w-4" />
              Upload New
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {isUploading ? (
          <div className="mb-6">
            <ProjectFileUploader 
              projectId={projectId} 
              onUploadSuccess={handleUploadSuccess} 
              onCancel={handleCancelUpload}
              uploadConfig={uploadConfig}
            />
          </div>
        ) : filteredVideos.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">S/N</TableHead>
                <TableHead className="w-36">Thumbnail</TableHead>
                <TableHead>Video Name</TableHead>
                <TableHead className="text-right">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVideos.map((video, index) => {
                // If this is the last video and it should be hidden, render a transparent row
                if (index === filteredVideos.length - 1 && !isLastVideoVisible) {
                  // If in loading state, show a loading indicator instead of transparent row
                  if (isLoadingLastVideo) {
                    return (
                      <TableRow 
                        key={video.id} 
                        className="hover:bg-muted/50"
                      >
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>
                          <div className="relative w-32 h-18 flex items-center justify-center">
                            <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <FileVideo className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">Processing video...</p>
                              <p className="text-xs text-muted-foreground">
                                <DateDisplay date={new Date().toISOString()} />
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex flex-col items-end gap-1">
                            <Badge variant="secondary" className="text-xs">
                              Processing
                            </Badge>
                            <div className="text-xs text-muted-foreground">
                              Preparing video...
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  }
                  
                  // Otherwise show the original transparent row (but without click handler)
                  return (
                    <TableRow 
                      key={video.id} 
                      className="hover:bg-muted/50 opacity-0 hover:opacity-5 transition-opacity" 
                    >
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <div className="relative w-32 h-18">
                          <div className="w-full h-full rounded-md" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FileVideo className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{video.filename}</p>
                            <p className="text-xs text-muted-foreground">
                              <DateDisplay date={new Date().toISOString()} />
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex flex-col items-end gap-1">
                          <Badge variant="outline" className="text-xs">
                            Type: {getVideoType(video)}
                          </Badge>
                          <div className="text-xs text-muted-foreground">
                            {video.duration ? `${Math.floor(video.duration / 60)}:${String(Math.floor(video.duration % 60)).padStart(2, '0')}` : '--:--'}
                            {' • '}
                            {formatFileSize(videoFileSizes[index])}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                }
                
                // For all other videos, and for the third video when visible (without toggle functionality)
                return (
                  <TableRow 
                    key={video.id} 
                    className="hover:bg-muted/50" 
                  >
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>
                      <div className="relative w-32 h-18">
                        <img 
                          src={getThumbnailUrl(video)} 
                          alt={video.filename}
                          className="w-full h-full object-cover rounded-md"
                        />
                        
                        {/* Play button that shows the popover */}
                        {video.playbackId && video.status === 'ready' && (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="icon" 
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90 w-8 h-8"
                              >
                                <Play className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[400px] p-0" align="center">
                              <MuxPlayer 
                                streamType="on-demand" 
                                playbackId={video.playbackId} 
                                className="w-full aspect-video"
                              />
                            </PopoverContent>
                          </Popover>
                        )}
                        
                        <Badge 
                          variant={
                            video.status === 'ready' 
                              ? 'outline' 
                              : video.status === 'error'
                                ? 'destructive'
                                : 'secondary'
                          }
                          className="absolute bottom-1 right-1 text-xs"
                        >
                          {video.status.charAt(0).toUpperCase() + video.status.slice(1)}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileVideo className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{video.filename}</p>
                          <p className="text-xs text-muted-foreground">
                            <DateDisplay date={new Date().toISOString()} />
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex flex-col items-end gap-1">
                        <Badge variant="outline" className="text-xs">
                          Type: {getVideoType(video)}
                        </Badge>
                        <div className="text-xs text-muted-foreground">
                          {video.duration ? `${Math.floor(video.duration / 60)}:${String(Math.floor(video.duration % 60)).padStart(2, '0')}` : '--:--'}
                          {' • '}
                          {formatFileSize(videoFileSizes[index])}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center h-60 border-2 border-dashed rounded-md p-6">
            <p className="text-muted-foreground mb-4">Upload video files for your project</p>
            {isUploading ? (
              <ProjectFileUploader 
                projectId={projectId} 
                onUploadSuccess={handleUploadSuccess}
                onCancel={handleCancelUpload}
                uploadConfig={uploadConfig}
              />
            ) : (
              <Button 
                onClick={() => setIsUploading(true)} 
                className="flex items-center gap-2"
              >
                <UploadCloud className="h-4 w-4" />
                Upload New
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 