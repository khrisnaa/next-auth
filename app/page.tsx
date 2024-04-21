import { LoginButton } from '@/components/auth/login-button';
import { Button } from '@/components/ui/button';

const Home = () => {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-r  from-indigo-500 via-indigo-400  to-indigo-500">
      <div className="space-y-6">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          🗝️Auth
        </h1>
        <p className="text-center text-lg text-white">Authentication service</p>
        <div>
          <LoginButton>
            <Button size="lg" variant="secondary">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
};
export default Home;
