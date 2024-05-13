import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import { db } from '@/lib/db';
import authConfig from '@/auth.config';
import { getUserById } from '@/data/user';
import { UserRole } from '@prisma/client';
import { getTwoFactorConfirmationByUserId } from './data/two-factor-confirmation';

//declare interface or type for session
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

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    //redirect routes if something error
    signIn: '/auth/login',
    error: '/auth/error',
  },
  events: {
    //if using oauth automatically set email verified to true
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    //make signin will be able to call inside api routes or sever actions
    async signIn({ user, account }) {
      //allow oauth without email verification
      if (account?.provider != 'credentials') return true;

      const existingUser = await getUserById(user.id || '');

      //prevent signin without email verification
      if (!existingUser?.emailVerified) return false;

      //prevent signin without 2FA if its active
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfrimation = await getTwoFactorConfirmationByUserId(
          existingUser.id,
        );

        if (!twoFactorConfrimation) return false;

        //delete two factor confirmation for next signin
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfrimation.id },
        });

        await db.user.update({
          where: { id: existingUser.id },
          data: {
            isTwoFactorEnabled: false,
          },
        });
      }

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      //pass token to session callback
      token.role = existingUser?.role;

      return token;
    },
    async session({ token, session }) {
      //add custom field to user session
      //pass user info to middleware using req.auth
      if (session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
