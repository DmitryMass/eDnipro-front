import { useSignOut } from '@/hooks/useSignOut';
import React, { FC } from 'react';

export const Logout: FC = () => {
  const { handleSignOut } = useSignOut();
  return (
    <button className='text-grayStroke-30 block' onClick={handleSignOut}>
      Вихід
    </button>
  );
};
