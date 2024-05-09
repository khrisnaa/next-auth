import { auth } from '@/auth';
import { LogoutButton } from '@/components/auth/logout-button';
import { Button } from '@/components/ui/button';

const Page = async () => {
  const session = await auth();

  return (
    <div>
      {JSON.stringify(session)}
      <LogoutButton>
        <Button variant="secondary">Sign out</Button>
      </LogoutButton>
    </div>
  );
};
export default Page;
