# Role-Based Authentication Setup

This guide explains how to implement and use role-based authentication in your portfolio dashboard.

## Overview

The dashboard is protected with role-based access control. Only users with the `admin` role can access the dashboard.

## Components & Utilities

### 1. **Auth Utilities** (`lib/auth.ts`)

- `getIsAdmin()` - Check if current user is admin
- `protectAdminRoute()` - Server-side route protection (redirects non-admin to home)
- `getUserRole()` - Get current user's role from Clerk

### 2. **AdminGuard Component** (`components/auth/AdminGuard.tsx`)

Client-side wrapper for protecting components that require admin access.

```tsx
import { AdminGuard } from "@/components/auth";

export default function AdminPanel() {
  return (
    <AdminGuard fallback={<div>Access Denied</div>}>
      <YourComponent />
    </AdminGuard>
  );
}
```

## Setting Up Admin Role

### Step 1: Configure Clerk Metadata

To grant admin access to a user:

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Navigate to **Users**
3. Select the user you want to make admin
4. Click **User metadata**
5. Add the following JSON:
   ```json
   {
     "role": "admin"
   }
   ```
6. Click **Save**

### Step 2: Current Setup

- **Middleware** (`proxy.ts`) - Protects `/dashboard/*` routes (requires authentication)
- **Dashboard Layout** (`app/dashboard/layout.tsx`) - Server-side admin check with `protectAdminRoute()`
- **Subsequent Routes** - All dashboard routes inherit protection from layout

## How It Works

1. **Authentication Check**: Handled by Clerk middleware - any user trying to access `/dashboard/*` must be logged in
2. **Authorization Check**: `protectAdminRoute()` in the dashboard layout checks if user has admin role
3. **Non-Admin Users**: Redirected to home page `/`

## Usage Examples

### Protecting an Entire Route
Already implemented in `app/dashboard/layout.tsx`:
```tsx
const DashboardLayout = async ({ children }) => {
  await protectAdminRoute();
  // ... rest of component
};
```

### Protecting a Component
```tsx
import { AdminGuard } from "@/components/auth";

export default function SensitiveComponent() {
  return (
    <AdminGuard>
      <SecretContent />
    </AdminGuard>
  );
}
```

### Checking Role Programmatically
```tsx
import { getIsAdmin, getUserRole } from "@/lib";

export default async function MyComponent() {
  const isAdmin = await getIsAdmin();
  const role = await getUserRole();

  if (!isAdmin) {
    return <div>Not authorized</div>;
  }

  return <div>Admin content</div>;
}
```

## Environment Variables

Ensure Clerk is properly configured with these environment variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## Security Notes

- Role metadata is stored in Clerk's user metadata
- The role is accessible via `sessionClaims.metadata.role`
- Always validate on the server side using `protectAdminRoute()`
- Client-side checks with `AdminGuard` should be supplemented with server-side validation
- Never rely solely on client-side checks for security

## Future Enhancements

- [ ] Multiple roles (editor, viewer, etc.)
- [ ] Granular permissions
- [ ] Audit logging for admin actions
- [ ] Role-based API routes
- [ ] Admin activity dashboard
