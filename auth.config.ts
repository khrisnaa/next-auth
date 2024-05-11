//using an adapter, it will default to the database strategy
//an adapter that relies on an ORM/library that is not yet compatible with Edge runtime(s)
//need to create separate configuration file
//read more at authjs v5
import type { NextAuthConfig } from 'next-auth';
import bcrypt from 'bcryptjs';

import Credentials from 'next-auth/providers/credentials';
import Google from 'next-auth/providers/google';
import Github from 'next-auth/providers/github';

import { getUserByEmail } from '@/data/user';
import { LoginSchema } from '@/schemas';

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      //bypass or make login and return user for api routes/login action
      async authorize(credentials) {
        const validateFields = LoginSchema.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
