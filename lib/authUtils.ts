export type UserRole = "ADMIN" | "USER" | "SUPER_ADMIN";
export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

export const authRoutes = ["/login", "/login?register=true"];

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile"],
  patterns: [/^\/account/],
};

export const adminProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/admin/],
};

export const userProtectedRoutes: RouteConfig = {
  exact: [],
  patterns: [/^\/user/],
};

// check if it's an auth route
export const isAuthRoute = (pathName: string) => {
  return authRoutes.some((route: string) => route === pathName);
};

// check if route match with any type of user
export const isRouteMatches = (
  pathname: string,
  routes: RouteConfig
): boolean => {
  if (routes.exact.includes(pathname)) {
    return true;
  }
  return routes.patterns.some((pattern: RegExp) => pattern.test(pathname));
};

// Get the route owner
export const getRouteOwner = (
  pathname: string
): "ADMIN" | "USER" | "COMMON" | null => {
  if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  }
  if (isRouteMatches(pathname, userProtectedRoutes)) {
    return "USER";
  }
  if (isRouteMatches(pathname, commonProtectedRoutes)) {
    return "COMMON";
  }
  return null;
};

// Get default dashbaord routes
export const getDefaultDashboardRoute = (role: UserRole): string => {
  if (role === "ADMIN") {
    return "/admin/dashboard";
  }
  return "/";
};

export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole
): boolean => {
  const routeOwner = getRouteOwner(redirectPath);

  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }

  if (routeOwner === role) {
    return true;
  }

  return false;
};
