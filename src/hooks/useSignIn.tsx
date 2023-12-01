import { ROUTE } from '@/utils/routes';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { toast } from 'react-toastify';

type TUserLoginInfo = {
  email: string;
  password: string;
};

export const useSignIn = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TUserLoginInfo>();
  const { push } = useRouter();

  const loginFormSubmit: SubmitHandler<TUserLoginInfo> = async (
    credentials
  ) => {
    try {
      const res = await signIn('credentials', {
        ...credentials,
        redirect: false,
      });
      if (res?.ok) {
        const session = await getSession();
        session?.user && (await push(ROUTE.PROJECTS));
        reset();
      } else {
        // не выдает собственную ошибку севрера нужен фикс
        toast.error('Wrong credentials');
      }
    } catch (err) {
      toast.error('Internal server error');
    }
  };

  return {
    loginFormSubmit,
    register,
    handleSubmit,
    errors,
    isSubmitting,
  };
};
