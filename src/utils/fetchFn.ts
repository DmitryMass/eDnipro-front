import axios from 'axios';
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';

export const handleDeleteAction = (
  url: string,
  id: string,
  pushRoute: string
) => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const session = await getSession();
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}${url}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );

      toast.success(res?.data?.message);
      await push(pushRoute);
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      toast.error(err?.response?.data?.error);
    }
  };

  return {
    isLoading,
    setIsLoading,
    handleDelete,
  };
};
