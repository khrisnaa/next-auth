import { CheckCircledIcon } from '@radix-ui/react-icons';
export const FormSuccess = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2 bg-emerald-500/15 p-3 text-sm text-emerald-500">
      <CheckCircledIcon />
      <p>{message}</p>
    </div>
  );
};
