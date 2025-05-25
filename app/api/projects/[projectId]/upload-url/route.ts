import { NextResponse } from 'next/server';
import Mux from '@mux/mux-node';

// Initialize Mux API client with credentials from env.local
const muxClient = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET
});

interface RouteParams {
  params: {
    projectId: string;
  };
}

export async function POST(request: Request, { params }: RouteParams) {
  const { projectId } = params;
  
  try {
    // Extract the creator ID from the request if provided
    const { creatorId } = await request.json().catch(() => ({ creatorId: 'unknown' }));

    // Create a new upload URL with Mux
    const upload = await muxClient.video.uploads.create({
      new_asset_settings: {
        playback_policy: ['public']
      } as any,
      cors_origin: '*'
    });

    // Return the upload ID and URL from Mux
    return NextResponse.json({ 
      uploadId: upload.id,
      uploadUrl: upload.url
    });
  } catch (error) {
    console.error('Error creating upload URL:', error);
    return NextResponse.json(
      { error: 'Failed to create upload URL' },
      { status: 500 }
    );
  }
} 