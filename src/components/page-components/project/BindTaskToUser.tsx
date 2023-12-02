import { Loader } from '@/components/ui/Loader';
import axios from 'axios';
import clsx from 'clsx';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, type FC } from 'react';
import { toast } from 'react-toastify';

type TBindTaskToUserProps = {
  taskId: string;
};

export const BindTaskToUser: FC<TBindTaskToUserProps> = ({ taskId }) => {
  const { replace, asPath } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleBindTaskToUser = async () => {
    try {
      setIsLoading(true);
      const session = await getSession();
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/user/bind-task/${taskId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );

      await replace(asPath);
      toast.success(response?.data?.message);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      toast.error(err?.response?.data?.error);
    }
  };
  return (
    <button
      disabled={isLoading}
      className={clsx(
        'bg-blue-950 max-w-[120px] w-full text-s14 flex justify-center items-center text-white hover:bg-blueHover rounded-sm py-1.5 px-2.5 mt-2 transition-all duration-200',
        isLoading ? 'bg-blueHover' : ''
      )}
      onClick={handleBindTaskToUser}
    >
      {isLoading ? <Loader /> : 'Взяти задачу'}
    </button>
  );
};
