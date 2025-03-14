import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define routes that should be public
const publicRoutes = [
  "/",
  "/api/webhook",
  "/about",
  "/contact",
  "/pricing",
  "/privacy",
  "/terms",
  "/cookies",
  "/gdpr",
  "/blog",
  "/help",
  "/tutorials",
  "/api"
];

// Create a matcher for protected routes (all routes not in publicRoutes)
const isProtectedRoute = createRouteMatcher([
  "/((?!_next|api|webhook|about|contact|pricing|privacy|terms|cookies|gdpr|blog|help|tutorials|\\.).*)/"
]);

export default clerkMiddleware((auth, req) => {
  // Protect routes that aren't in the public routes list
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}; 