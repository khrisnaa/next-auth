'use server';

import { z } from 'zod';
import bcrypt from 'bcryptjs';

import { db } from '@/lib/db';
import { RegisterSchema } from '@/schemas';
import { getUserByEmail } from '@/utils/user';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) return { error: 'Invalid fields!' };

  const { email, password, name } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: 'Email already in use!' };

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  return { success: 'Confirmation email sent!' };
};
