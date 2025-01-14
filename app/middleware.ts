import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.split(' ')[1]; // Extract token from "Bearer <token>"

  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = '/api/auth/login';
    return NextResponse.redirect(url);
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Optionally attach user data to the request
    req.headers.set('user', JSON.stringify(decoded));

    return NextResponse.next();
  } catch (err) {
    console.error('Invalid token:', err);

    // Redirect to login if token is invalid or expired
    url.pathname = '/api/auth/login';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/dashboard', '/patients/dashboard', '/deliveries'], // Protect specific routes
};
