import { auth } from '@/auth';

import { LogoutButton } from '@/components/auth/logout-button';
import { Button } from '@/components/ui/button';

const Page = async () => {
  const session = await auth();
  return (
    <div className="space-y-6">
      {JSON.stringify(session)}
      <LogoutButton>
        <Button>Sign out</Button>
      </LogoutButton>
    </div>
  );
};
export default Page;
