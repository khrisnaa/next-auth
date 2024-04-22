'use server';

import * as z from 'zod';
import { LoginSchema } from '@/schemas';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Invalid fields!' };
  }

  if (validateFields.success) {
    return { success: 'Email sent!' };
  }
};
