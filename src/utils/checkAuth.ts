import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';

export const checkAuth = async () => {
  const session = await getSession();
  if (session?.user.token) {
    try {
      await axios.get(
        `${process.env.NEXT_PUBLIC_DATABASE_URL}/auth/checkTokenProfile`,
        {
          headers: {
            Authorization: `Bearer ${session?.user.token}`,
          },
        }
      );
    } catch (error) {
      await signOut({ redirect: true });
    }
  }
};
