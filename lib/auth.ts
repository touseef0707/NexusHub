import { auth as clerkAuth } from '@clerk/nextjs/server';
import { headers } from 'next/headers';

export async function auth() {
  // Ensure headers are properly awaited
  const headersList = headers();
  
  // Call the original auth function
  return await clerkAuth();
} 