import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { db } from '@/lib/db';
import authConfig from '@/auth.config';
import { getUserById } from './data/user';
import { UserRole } from '@prisma/client';

// create type for user and adapter for session.user.token
declare module 'next-auth' {
  interface User {
    role: UserRole;
  }
}

declare module '@auth/core/adapters' {
  interface AdapterUser {
    role: UserRole;
  }
}

// can use inside middleware because prisma cant run in the edge, but auth config can
export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ user }) {
      const existingUser = await getUserById(user?.id || '');

      if (!existingUser || !existingUser.emailVerified) {
        console.log(existingUser);
        return false;
      }

      return true;
    },
    async session({ token, session }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
