'use client';

import { LogoutButton } from '@/components/auth/logout-button';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';

const Page = () => {
  const user = useCurrentUser();

  return (
    <div className="space-y-6">
      {JSON.stringify(user)}
      <LogoutButton>
        <Button>Logout</Button>
      </LogoutButton>
    </div>
  );
};
export default Page;
