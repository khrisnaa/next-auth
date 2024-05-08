'use server';

import { z } from 'zod';

import { RegisterSchema } from '@/schemas';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFileds = RegisterSchema.safeParse(values);

  if (!validateFileds.success) return { error: 'Invalid fields!' };

  return { success: 'Email sent!' };
};
