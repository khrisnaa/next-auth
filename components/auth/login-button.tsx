'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export const LoginButton = ({ children, mode, asChild }: LoginButtonProps) => {
  const router = useRouter();
  const onClick = () => {
    router.push('/auth/login');
  };
  return (
    <span onClick={onClick} className="flex items-center justify-center">
      {children}
    </span>
  );
};
