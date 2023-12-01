import { useSignOut } from '@/hooks/useSignOut';
import React, { FC } from 'react';

export const Logout: FC = () => {
  const { handleSignOut } = useSignOut();
  return (
    <button className='text-grayStroke-30 block' onClick={handleSignOut}>
      <img className='w-5 h-5' src='/icons/logout-icon.svg' alt='Вихід' />
    </button>
  );
};
