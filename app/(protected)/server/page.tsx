import { UserInfo } from '@/app/(protected)/_component/user-info';
import { currentUser } from '@/lib/auth';

const Page = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  return <UserInfo user={user} label={'Server component'} />;
};
export default Page;
