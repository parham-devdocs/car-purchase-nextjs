import { NextRequest, NextResponse } from "next/server";

// middleware.js
export function middleware(request:NextRequest) {
    const { pathname } = request.nextUrl;
    // Define which paths should be protected
    if (pathname.startsWith('/test')) {
      const token = request.cookies.get('next-auth'); // Check if the user has a valid token
      // If no token is found, redirect to login
      if (!token) {
        return Response.redirect(new URL('/loginFormTest', request.url));
      }
    }
    // Allow the request to continue if authenticated
    return NextResponse.next()
  }