import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { Toaster } from '@/components/ui/sonner';

const font = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Next Auth',
  description: 'Just an auth',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  console.log('🚀 ~ session:', session);

  return (
    //provider for useSession() in client component
    <SessionProvider session={session}>
      <html lang="en">
        <body className={font.className}>
          <Toaster />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
