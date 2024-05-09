import { CardWrapper } from '@/components/auth/card-wrapper';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

const Page = () => {
  return (
    <CardWrapper
      headerLabel="Something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center justify-center">
        <ExclamationTriangleIcon className="h-10 w-10 text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default Page;
