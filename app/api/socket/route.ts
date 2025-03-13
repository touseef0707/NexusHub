import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: Request) {
  try {
    const session = await auth();
    
    if (!session.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    return new NextResponse(JSON.stringify({
      message: "Notification service placeholder",
      info: "Real-time notifications will be implemented with AWS SNS in the future",
      userId: session.userId
    }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('API error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session.userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    
    // Just log the notification request for now
    console.log('Notification request received:', body);

    return new NextResponse(JSON.stringify({
      success: true,
      message: 'Notification request received (placeholder)'
    }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error processing notification:', error);
    return new NextResponse('Error processing notification', { status: 500 });
  }
} 