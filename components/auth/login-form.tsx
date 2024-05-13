'use client';

import { z } from 'zod';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { login } from '@/actions/login';

import { LoginSchema } from '@/schemas';
import { CardWrapper } from '@/components/auth/card-wrapper';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export const LoginForm = () => {
  //get error from params and return a message
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : '';

  //pending state
  const [isPending, startTransition] = useTransition();

  //error and success message state
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const errors = form.formState.errors;

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      login(values)
        .then((data) => {
          if (data?.error) {
            setError(data?.error);
          }

          if (data?.success) {
            setSuccess(data?.success);
          }
        })
        .catch(() => setError('Something went wrong!'));
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value}
                      placeholder="jarwo@example.com"
                      type="email"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value}
                      placeholder="******"
                      type="password"
                      disabled={isPending}
                    />
                  </FormControl>
                  <Button
                    size="sm"
                    variant="link"
                    asChild
                    className="px-0 font-normal"
                  >
                    <Link href={'/auth/reset'}>Forgot password</Link>
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
