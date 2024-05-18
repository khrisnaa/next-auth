import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export const useCurrentUser = () => {
  try {
    const session = useSession();

    useEffect(() => {
      console.log('🚀 ~ useCurrentUser ~ session:', session);
    }, [session]);

    return session?.data?.user;
  } catch (error) {
    return null;
  }
};
