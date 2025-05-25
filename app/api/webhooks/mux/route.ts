import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import crypto from 'crypto';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

// Initialize DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
});

const docClient = DynamoDBDocumentClient.from(client);

// Table name
const TABLE_NAME = 'nexushub-project-videos';

// Function to verify webhook signature
function verifySignature(signature: string | null, payload: string): boolean {
  if (!signature) return false;
  
  const webhookSecret = process.env.MUX_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('MUX_WEBHOOK_SECRET environment variable is not set');
    return false;
  }

  // Parse the signature header
  const [timestamp, signatureHash] = signature.split(',');
  const timestampValue = timestamp.split('=')[1];
  const signatureValue = signatureHash.split('=')[1];

  // Create the signature string
  const signatureData = `${timestampValue}.${payload}`;
  
  // Compute the HMAC
  const hmac = crypto.createHmac('sha256', webhookSecret);
  hmac.update(signatureData);
  const expectedSignature = hmac.digest('hex');

  // Compare signatures
  return crypto.timingSafeEqual(
    Buffer.from(signatureValue),
    Buffer.from(expectedSignature)
  );
}

export async function POST(request: Request) {
  // Get the raw request body
  const rawBody = await request.text();
  
  // Verify the webhook signature
  const headersList = await headers();
  const signature = headersList.get('mux-signature');
  if (!verifySignature(signature, rawBody)) {
    console.error('Invalid Mux webhook signature');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  try {
    const event = JSON.parse(rawBody);
    const eventType = event.type;
    
    console.log(`Received Mux webhook: ${eventType}`);

    // Handle different event types
    switch (eventType) {
      case 'video.upload.asset_created': {
        const uploadId = event.data.upload_id;
        const assetId = event.data.asset_id;
        const filename = event.data?.filename || `video-${Date.now()}.mp4`;
        const timestamp = new Date().toISOString();

        console.log(`Asset created: ${assetId} for upload: ${uploadId}`);
        
        // Create the initial database record
        await docClient.send(new UpdateCommand({
          TableName: TABLE_NAME,
          Key: { assetId: assetId },
          UpdateExpression: 'SET uploadId = :uploadId, filename = :filename, #status = :status, createdAt = :createdAt, updatedAt = :updatedAt',
          ExpressionAttributeNames: {
            '#status': 'status' // status is a reserved word in DynamoDB
          },
          ExpressionAttributeValues: {
            ':uploadId': uploadId,
            ':filename': filename,
            ':status': 'processing',
            ':createdAt': timestamp,
            ':updatedAt': timestamp
          },
          ReturnValues: 'ALL_NEW'
        }));
        
        break;
      }

      case 'video.asset.ready': {
        const assetId = event.data.id;
        const playbackId = event.data.playback_ids?.[0]?.id;
        const duration = event.data.duration;

        console.log(`Asset ready: ${assetId} with playback ID: ${playbackId}`);
        
        // Update the database with playback_id and status
        await docClient.send(new UpdateCommand({
          TableName: TABLE_NAME,
          Key: { assetId: assetId },
          UpdateExpression: 'SET playbackId = :playbackId, #status = :status, duration = :duration, updatedAt = :updatedAt',
          ExpressionAttributeNames: {
            '#status': 'status'
          },
          ExpressionAttributeValues: {
            ':playbackId': playbackId,
            ':status': 'ready',
            ':duration': duration || null,
            ':updatedAt': new Date().toISOString()
          },
          ReturnValues: 'ALL_NEW'
        }));
        
        break;
      }

      case 'video.asset.deleted': {
        const assetId = event.data.id;
        
        console.log(`Asset deleted: ${assetId}`);
        
        // Delete the record from the database
        await docClient.send(new DeleteCommand({
          TableName: TABLE_NAME,
          Key: { assetId: assetId }
        }));
        
        break;
      }

      case 'video.asset.errored': {
        const assetId = event.data.id;
        
        console.log(`Asset error: ${assetId}, message: ${event.data.error?.message || 'Unknown error'}`);
        
        // Update the database with error status
        await docClient.send(new UpdateCommand({
          TableName: TABLE_NAME,
          Key: { assetId: assetId },
          UpdateExpression: 'SET #status = :status, errorMessage = :errorMessage, updatedAt = :updatedAt',
          ExpressionAttributeNames: {
            '#status': 'status'
          },
          ExpressionAttributeValues: {
            ':status': 'error',
            ':errorMessage': event.data.error?.message || 'Unknown error',
            ':updatedAt': new Date().toISOString()
          }
        }));
        
        break;
      }

      // Handle other events as needed
      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
} 