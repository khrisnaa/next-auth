'use client';

import { signOut } from 'next-auth/react';

export const LogoutButton = ({ children }: { children: React.ReactNode }) => {
  const onClick = async () => {
    await signOut();
  };
  return (
    <span onClick={onClick} className="flex items-center justify-center">
      {children}
    </span>
  );
};
