import { auth } from '@/auth';

//can be use in server action, server component and api route
export const currentUser = async () => {
  const session = await auth();
  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();
  return session?.user?.role;
};
