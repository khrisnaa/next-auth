'use client';

import { UserInfo } from '@/app/(protected)/_component/user-info';
import { useCurrentUser } from '@/hooks/use-current-user';

const Page = () => {
  const user = useCurrentUser();
  if (!user) {
    return null;
  }
  return <UserInfo user={user} label={'Client component'} />;
};
export default Page;
