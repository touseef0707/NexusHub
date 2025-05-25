import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define routes that should be public
const publicRoutes = [
  "/",
  "/api/webhooks/mux",
  "/api/webhooks/clerk",
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

// Create a matcher for public routes
const isPublicRoute = createRouteMatcher(publicRoutes);

export default clerkMiddleware((auth, req) => {
  // Skip authentication for public routes
  if (isPublicRoute(req)) {
    return;
  }
  // Protect all other routes
  auth().protect();
});

export const config = {
  matcher: [
    // Skip all static files
    "/((?!_next|.*\\..*).*)",
    // Run on all API routes
    "/api/(.*)",
  ],
}; 