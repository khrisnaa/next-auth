'use server';

import { z } from 'zod';

import { LoginSchema } from '@/schemas';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  //validate values in backend
  const validateFileds = LoginSchema.safeParse(values);

  if (!validateFileds.success) return { error: 'Invalid fields!' };

  return { success: 'Email sent!' };
};
