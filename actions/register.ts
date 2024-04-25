'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { RegisterSchema } from '@/schemas';
import { db } from '@/lib/db';

import { getUserByEmail } from '@/data/user';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) return { error: 'Invalid fields!' };

  const { email, name, password } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: 'Email already in use!' };

  const hashedPassword = await bcrypt.hash(password, 12);

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  if (validateFields.success) return { success: 'User created!' };
};
