import { auth, signOut } from '@/auth';

const Page = async () => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          'use server';
          await signOut({ redirectTo: '/' });
        }}
      >
        <button type="submit">Log out</button>
      </form>
    </div>
  );
};
export default Page;
