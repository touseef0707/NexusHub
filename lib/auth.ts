import { auth as clerkAuth } from '@clerk/nextjs/server';

export function auth() {
  return clerkAuth();
}