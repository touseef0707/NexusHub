import { NextRequest, NextResponse } from 'next/server';
import { WebhookEvent } from '@clerk/nextjs/server';
import { Webhook } from 'svix';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

// Initialize AWS Lambda client
const lambdaClient = new LambdaClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

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
  const webhookSecret = process.env.CLERK_ORG_MEMBERSHIP_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('Error: Missing Clerk organization membership webhook secret');
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
  const data = event.data;
  
  console.log(`Received membership webhook event: ${eventType}`);
  
  // Process different event types
  try {
    switch (eventType) {
      case 'organizationMembership.created':
        if ('organization' in data && 'public_user_data' in data) {
          console.log('Membership created:', data.public_user_data.user_id, 'in org:', data.organization.id);
          await invokeLambda('organizationMembershipUpdated', {
            operation: 'addMember',
            data: {
              membershipId: data.id,
              orgId: data.organization.id,
              userId: data.public_user_data.user_id,
              role: data.role || 'member'
            }
          });
        }
        break;
      case 'organizationMembership.updated':
        if ('organization' in data && 'public_user_data' in data) {
          console.log('Membership updated:', data.public_user_data.user_id, 'in org:', data.organization.id);
          await invokeLambda('organizationMembershipUpdated', {
            operation: 'updateMember',
            data: {
              orgId: data.organization.id,
              userId: data.public_user_data.user_id,
              role: data.role,
              updatedAt: new Date().toISOString()
            }
          });
        }
        break;
      case 'organizationMembership.deleted':
        if ('organization' in data && 'public_user_data' in data) {
          console.log('Membership deleted:', data.public_user_data.user_id, 'from org:', data.organization.id);
          await invokeLambda('organizationMembershipUpdated', {
            operation: 'removeMember',
            data: {
              orgId: data.organization.id,
              userId: data.public_user_data.user_id
            }
          });
        }
        break;
      default:
        console.log(`Unhandled membership event type: ${eventType}`);
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

  console.log(`Sending membership data to Lambda: ${JSON.stringify(data)}`);

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
