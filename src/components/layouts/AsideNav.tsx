import { ROUTE } from '@/utils/routes';
import Link from 'next/link';
import { FC } from 'react';

export const AsideNav: FC = () => {
  return (
    <nav className='flex flex-col pb-10 border-b border-grayStroke-90 mb-8 max-lg:pb-6 max-lg:mb-6'>
      <Link
        className='font-medium pr-2 py-2 text-sm16 text-lightMain max-lg:text-s14'
        href={ROUTE.PROJECTS}
      >
        Projects
      </Link>
      <Link
        className='font-medium pr-2 py-2 text-sm16 text-lightMain max-lg:text-s14'
        href={ROUTE.MY_TASKS}
      >
        My tasks
      </Link>
    </nav>
  );
};
