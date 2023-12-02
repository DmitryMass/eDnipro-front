import { signOut } from 'next-auth/react';
import { toast } from 'react-toastify';

export const useSignOut = () => {
  const handleSignOut = async () => {
    try {
      await signOut({ redirect: true, callbackUrl: '/' });
    } catch (err) {
      toast.error('Log out error. Try again.');
    }
  };

  return { handleSignOut };
};
