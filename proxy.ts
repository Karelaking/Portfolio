import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

/**
 * Middleware for Clerk authentication.
 * 
 * Protected routes require authentication.
 * Role-based access control is handled at the route level using protectAdminRoute().
 * 
 * To grant admin role to a user:
 * 1. Go to Clerk Dashboard
 * 2. Select the user
 * 3. Click "User metadata"
 * 4. Add: { "role": "admin" }
 * 5. Save
 */
export default clerkMiddleware((auth, request) => {
  if (isProtectedRoute(request)) {
    auth.protect();
  }
});

export const config = {
  matcher: ["/dashboard/:path*"],
};
