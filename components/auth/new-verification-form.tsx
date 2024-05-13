'use client';

import { useSearchParams } from 'next/navigation';
import { CardWrapper } from './card-wrapper';
import { useCallback, useEffect, useState } from 'react';
import { newVerification } from '@/actions/new-verification';
import { BeatLoader } from 'react-spinners';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (!token) {
      setError('Missing token!');
      return;
    }

    newVerification(token || '')
      .then((data) => {
        setError(data.error);
        setSuccess(data.success);
      })
      .catch(() => {
        setError('Something went wrong!');
      });
  }, [token, error, success]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confirming your email verification"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <div className="flex w-full items-center justify-center">
        {!success && !error && <BeatLoader />}
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
    </CardWrapper>
  );
};
