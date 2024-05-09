import NextAuth from 'next-auth';

import authConfig from '@/auth.config';
import {
  publicRoutes,
  authRoutes,
  apiRoutesPrefix,
  DEFAULT_LOGIN_REDIRECT,
} from '@/routes';
import { NextResponse } from 'next/server';

const { auth: middleware } = NextAuth(authConfig);

export default middleware((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  //check type of routes
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);
  const isApiRoutes = nextUrl.pathname.startsWith(apiRoutesPrefix);

  if (isApiRoutes) return;

  if (isAuthRoutes) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoutes) {
    return NextResponse.redirect(new URL('/auth/login', nextUrl));
  }
});

export const config = {
  //invoke middleware if path is matchs
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
