//identify protected and public route

export const publicRoutes = ['/', '/auth/new-verification'];

export const authRoutes = [
  '/auth/login',
  '/auth/register',
  '/auth/error',
  '/auth/reset',
  '/auth/new-password',
];

export const apiRoutesPrefix = '/api/auth';

export const DEFAULT_LOGIN_REDIRECT = '/dashboard';
