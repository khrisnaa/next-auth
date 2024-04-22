'use server';

import * as z from 'zod';
import { RegisterSchema } from '@/schemas';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Invalid fields!' };
  }

  if (validateFields.success) {
    return { success: 'Email sent!' };
  }
};
