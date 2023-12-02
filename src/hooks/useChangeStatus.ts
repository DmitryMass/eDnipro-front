import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const useChangeStatus = (taskId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const { replace, asPath } = useRouter();

  const handleChangeStatus = async (status: string) => {
    try {
      setIsLoading(true);
      const session = await getSession();
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/user/change-task-status/${taskId}`,
        { status },
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

  return {
    isLoading,
    handleChangeStatus,
  };
};
