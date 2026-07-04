import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
} from "./lib/authUtils"; // Adjust path
import { getCookie } from "./services/auth/tokenHandler"; // Adjust path
import { UserRole } from "./types/user.interface";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Get Token and Role
  const accessToken = (await getCookie("accessToken")) || null;
  let userRole: UserRole | null = null;

  if (accessToken) {
    try {
      // Use decode for speed in Middleware (Edge Runtime)
      const decoded = jwt.decode(accessToken) as JwtPayload;
      userRole = decoded?.role as UserRole;
    } catch (error) {
      // If token is totally invalid, treat as guest
      console.error("Token decode error", error);
    }
  }

  if(!accessToken && (pathname.startsWith('/my-generations') || pathname.startsWith('/tools/'))){
    return NextResponse.redirect(
      new URL('/login', request.url)
    );
  }

  if(pathname === '/admin/dashboard'){
    return NextResponse.redirect(
      new URL('/admin/dashboard/overview', request.url)
    );
  }

  // 2. Use your AuthUtils logic
  const routeOwner = getRouteOwner(pathname);
  const isAuthPath = isAuthRoute(pathname);

  // --- LOGIC A: Guard Auth Routes (Login/Signup) ---
  // If user is already logged in, they shouldn't see Login/Signup
  if (accessToken && isAuthPath && userRole) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole), request.url)
    );
  }

  // --- LOGIC B: Handle Public Routes ---
  // If routeOwner is null, it's a public page (Home, Product details, etc.)
  if (routeOwner === null) {
    return NextResponse.next();
  }


  // --- LOGIC C: Protect Authenticated Routes ---
  // 1. Check if user is logged in
  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname); // Industry standard: remember where they were going
    return NextResponse.redirect(loginUrl);
  }



  // 2. Check if user has permission for this specific route
  // "COMMON" routes are allowed for any logged-in user
  if (routeOwner !== "COMMON") {
    
    // Exception: SUPER_ADMIN is allowed to enter ADMIN routes
    if (userRole === "SUPER_ADMIN" && routeOwner === "ADMIN") {
      return NextResponse.next();
    }

    // Role Mismatch: User is logged in but doesn't have the right role for this path
    if (userRole !== routeOwner) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
      );
    }
  }

  return NextResponse.next();
}

// Industry Standard Matcher
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)",
  ],
};