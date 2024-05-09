'use client';

import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

import { Button } from '@/components/ui/button';

export const Social = () => {
  const onClick = async (provider: 'google' | 'github') => {
    await signIn(provider);
  };
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        onClick={() => onClick('google')}
        size="lg"
        variant="outline"
        className="w-full"
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        onClick={() => onClick('github')}
        size="lg"
        variant="outline"
        className="w-full"
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
