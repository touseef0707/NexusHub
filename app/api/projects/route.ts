import { NextRequest, NextResponse } from "next/server";
import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoDbClient } from "@/lib/aws-config";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest) {
  try {
    const { userId, orgId } = await req.json();
    
    // Check if user is authenticated
    if (!userId || !orgId) {
      return NextResponse.json(
        { error: "userId and orgId are required" },
        { status: 400 }
      );
    }

    // Query projects for the organization using the orgId-index
    const params = {
      TableName: "nexushub-organization-projects",
      IndexName: "orgId-index",
      KeyConditionExpression: "orgId = :orgId",
      ExpressionAttributeValues: {
        ":orgId": orgId
      }
    };

    const result = await dynamoDbClient.send(new QueryCommand(params));

    return NextResponse.json(
      { 
        success: true,
        projects: result.Items || []
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId, orgId, title, description, status, deadline, thumbnail } = await req.json();
    
    // Check if user is authenticated
    if (!userId || !orgId) {
      return NextResponse.json(
        { error: "userId and orgId are required" },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    // Generate a unique ID for the project
    const projectId = uuidv4();
    const createdAt = new Date().toISOString();

    // Create project object
    const project = {
      projectId,  // Partition key
      orgId,      // GSI partition key
      createdBy: userId,
      title,
      description: description || "",
      status: status || "planning",
      deadline: deadline || null,
      thumbnail: thumbnail || "",
      createdAt,
      updatedAt: createdAt,
      progress: 0,
      teamSize: 1,
      starred: false
    };

    // Store in DynamoDB
    const params = {
      TableName: "nexushub-organization-projects",
      Item: project
    };

    await dynamoDbClient.send(new PutCommand(params));

    return NextResponse.json(
      { 
        success: true,
        project 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
} 