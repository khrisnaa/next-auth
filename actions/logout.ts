'use server';

import { signOut } from '@/auth';

//server action logout
export const logout = async () => {
  await signOut();
};
