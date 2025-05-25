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
  const webhookSecret = process.env.CLERK_ORG_GEN_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('Error: Missing Clerk organization general webhook secret');
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
  
  console.log(`Received organization webhook event: ${eventType}`);
  
  // Process different event types
  try {
    switch (eventType) {
      case 'organization.created':
        // Extract data directly from the top-level event
        // The data field in the webhook payload contains the organization information
        console.log('Organization created event received:', eventType);
        
        // Use type assertion to handle the organization data structure
        const orgData = data as {
          id: string;
          created_by: string;
          name: string;
          created_at: number;
        };
        
        // Extract the necessary fields
        await invokeLambda('organizationCreated', {
          operation: 'create',
          data: {
            orgId: orgData.id,
            orgAdmin: orgData.created_by,
            orgName: orgData.name,
            createdAt: new Date(orgData.created_at).toISOString(), // Convert timestamp to ISO string
            members: [orgData.created_by] // Initialize members array with creator
          }
        });
        break;
      case 'organization.updated':
        // Extract data directly from the top-level event
        console.log('Organization updated event received:', eventType);
        
        // Use type assertion to handle the organization data structure
        const updatedOrgData = data as {
          id: string;
          name: string;
          updated_at: number;
        };
        
        await invokeLambda('organizationUpdated', {
          operation: 'update',
          data: {
            orgId: updatedOrgData.id,
            orgName: updatedOrgData.name,
            updatedAt: new Date(updatedOrgData.updated_at).toISOString()
          }
        });
        break;
      case 'organization.deleted':
        // Extract data directly from the top-level event
        console.log('Organization deleted event received:', eventType);
        
        // Use type assertion for the minimal data needed
        const deletedOrgData = data as { id: string };
        
        await invokeLambda('organizationDeleted', {
          operation: 'delete',
          data: {
            orgId: deletedOrgData.id
          }
        });
        break;
      case 'organizationMembership.created':
        // Extract data from payload
        console.log('Organization membership created event received:', eventType);
        
        // In membership events, data will have both organization and user fields
        if ('organization' in data && 'public_user_data' in data) {
          const memberData = {
            orgId: data.organization.id,
            userId: data.public_user_data.user_id,
            role: data.role || 'member'
          };
          
          console.log('Organization membership created:', memberData.userId, 'in org:', memberData.orgId);
          await invokeLambda('organizationMembershipUpdated', {
            operation: 'addMember',
            data: memberData
          });
        }
        break;
      case 'organizationMembership.deleted':
        // Extract data from payload
        console.log('Organization membership deleted event received:', eventType);
        
        if ('organization' in data && 'public_user_data' in data) {
          const memberData = {
            orgId: data.organization.id,
            userId: data.public_user_data.user_id
          };
          
          console.log('Organization membership deleted:', memberData.userId, 'from org:', memberData.orgId);
          await invokeLambda('organizationMembershipUpdated', {
            operation: 'removeMember',
            data: memberData
          });
        }
        break;
      default:
        console.log(`Unhandled organization event type: ${eventType}`);
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

  console.log(`Sending organization data to Lambda: ${JSON.stringify(data)}`);

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
