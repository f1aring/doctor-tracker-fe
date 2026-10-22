import { NextResponse, type NextRequest } from "next/server";

const protectedRoutes = ["/dashboard", "/doctors", "/patients"];
const authCookieNames = ["access_token", "refresh_token"];

function isProtectedRoute(pathname: string) {
  return protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAuthCookie = authCookieNames.some(
    (cookieName) => Boolean(request.cookies.get(cookieName)?.value),
  );

  if (isProtectedRoute(pathname) && !hasAuthCookie) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "redirect",
      `${pathname}${request.nextUrl.search}`,
    );
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/login" && hasAuthCookie) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/doctors/:path*",
    "/patients/:path*",
    "/login",
  ],
};
