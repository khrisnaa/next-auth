'use server';

import { signOut } from '@/auth';
import { redirect } from 'next/navigation';
//server action logout
export const logout = async () => {
  await signOut();
};
