import { ROUTE } from '@/utils/routes';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { Logout } from '../ui/Logout';
import { AsideNav } from './AsideNav';
import { useSession } from 'next-auth/react';

export const AsidePanel: FC = () => {
  const session = useSession();

  if (!session.data?.user) {
    return null;
  }

  return (
    <>
      <aside
        className={clsx(
          'w-aside h-screen bg-asidePanel p-6 sticky top-0 left-0 max-lg:hidden'
        )}
      >
        <div>
          <div className='flex justify-between items-center mb-24'>
            <Link href={ROUTE.HOME} className='block text-grayStroke-30'>
              eDnipro
            </Link>
            <Logout />
          </div>
          <AsideNav />
        </div>
      </aside>
      <header className='bg-asidePanel lg:hidden'>Hello wrold</header>
    </>
  );
};
