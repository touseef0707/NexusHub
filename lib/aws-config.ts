// Add type declarations for AWS modules
declare module '@aws-sdk/client-dynamodb';
declare module '@aws-sdk/lib-dynamodb';

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Initialize the DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

// Create a document client from the DynamoDB client
const dynamoDbClient = DynamoDBDocumentClient.from(client);

export { dynamoDbClient }; 