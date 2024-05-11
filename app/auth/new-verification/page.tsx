'use client';

import { newVerification } from '@/actions/new-verification';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';

const Page = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const onSubmit = useCallback(async () => {
    await newVerification(token || '');
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <div>
      Confirmation Page <Link href={'/auth/login'}>Back to login</Link>
    </div>
  );
};
export default Page;
