import { NextRequest, NextResponse } from 'next/server';
import { WebhookEvent } from '@clerk/nextjs/server';
import { Webhook } from 'svix';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

// Define our own interface for Lambda client until we install the dependency
interface LambdaClientType {
  send: (command: any) => Promise<any>;
}

// Replace the placeholder Lambda client
const lambdaClient = new LambdaClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

// Interface for filtered user data
interface FilteredUserData {
  userId: string;
  imageUrl: string;
  username: string | null;
  firstName: string;
  lastName: string;
  createdAt: number;
  updatedAt: number;
  role: string;
}

// Interface for Clerk user data
interface ClerkUserData {
  id: string;
  image_url?: string;
  profile_image_url?: string;
  username?: string | null;
  first_name?: string;
  last_name?: string;
  created_at: number;
  updated_at: number;
  [key: string]: any; // Allow for other properties
}

export async function POST(req: NextRequest) {
  // Get the request body
  const payload = await req.json();
  
  // Retrieve the headers directly from the request
  const svixId = req.headers.get('svix-id');
  const svixTimestamp = req.headers.get('svix-timestamp');
  const svixSignature = req.headers.get('svix-signature');

  // If there are no SVIX headers, return a 400 error
  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json(
      { error: 'Error: Missing SVIX headers' },
      { status: 400 }
    );
  }

  // Create an object with the SVIX headers
  const svixHeaders = {
    'svix-id': svixId,
    'svix-timestamp': svixTimestamp,
    'svix-signature': svixSignature,
  };

  // Get the webhook secret from environment variables
  const webhookSecret = process.env.CLERK_USER_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('Error: Missing Clerk webhook secret');
    return NextResponse.json(
      { error: 'Error: Server misconfiguration' },
      { status: 500 }
    );
  }

  // Verify the webhook payload
  let event: WebhookEvent;
  try {
    const webhook = new Webhook(webhookSecret);
    event = webhook.verify(JSON.stringify(payload), svixHeaders) as WebhookEvent;
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return NextResponse.json(
      { error: 'Error: Invalid webhook signature' },
      { status: 400 }
    );
  }

  // Extract event type and data
  const eventType = event.type;
  
  // Process different event types
  try {
    if (eventType === 'user.created' || eventType === 'user.updated') {
      // Cast the data to our ClerkUserData interface
      const userData = event.data as ClerkUserData;
      
      // Filter user data to include only the required fields
      const filteredUserData: FilteredUserData = {
        userId: userData.id,
        imageUrl: userData.image_url || userData.profile_image_url || '',
        username: userData.username || null,
        firstName: userData.first_name || '',
        lastName: userData.last_name || '',
        createdAt: userData.created_at,
        updatedAt: userData.updated_at,
        role: 'member' // Default role
      };
      
      if (eventType === 'user.created') {
        console.log('User created:', filteredUserData.userId);
        await invokeLambda('userCreated', filteredUserData);
      } else {
        console.log('User updated:', filteredUserData.userId);
        await invokeLambda('userUpdated', filteredUserData);
      }
    } else if (eventType === 'user.deleted') {
      const userId = (event.data as { id: string }).id;
      console.log('User deleted:', userId);
      // For deletion, we only need to send the user ID
      await invokeLambda('userDeleted', { userId });
    } else {
      console.log('Unhandled user event type:', eventType);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Error processing webhook' },
      { status: 500 }
    );
  }
}

async function invokeLambda(functionName: string, data: any) {
  const lambdaFunctionPrefix = process.env.LAMBDA_FUNCTION_PREFIX || 'nexushub-dev';
  const fullFunctionName = `${lambdaFunctionPrefix}-${functionName}`;

  const payload = {
    body: JSON.stringify(data),
    source: 'clerk.webhook'
  };

  console.log(`Sending filtered data to Lambda: ${JSON.stringify(data)}`);

  const command = new InvokeCommand({
    FunctionName: fullFunctionName,
    InvocationType: 'Event', // Asynchronous invocation
    Payload: JSON.stringify(payload),
  });

  try {
    const response = await lambdaClient.send(command);
    console.log(`Lambda function ${fullFunctionName} invoked successfully`);
    return response;
  } catch (error) {
    console.error(`Error invoking Lambda function ${fullFunctionName}:`, error);
    throw error;
  }
}
