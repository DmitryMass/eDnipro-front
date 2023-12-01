import { ROUTE } from '@/utils/routes';
import Link from 'next/link';
import { FC } from 'react';

type TAsideNavProps = {
  closeMenu?: () => void;
};

export const AsideNav: FC<TAsideNavProps> = ({ closeMenu }) => {
  return (
    <nav className='flex flex-col pb-8 border-b border-grayStroke-90 mb-8 max-lg:pb-6 max-lg:mb-6'>
      <Link
        onClick={closeMenu}
        className='font-medium pr-2 py-2 text-sm16 text-lightMain max-lg:text-s14 hover:text-white'
        href={ROUTE.PROJECTS}
      >
        Проекти
      </Link>
      <Link
        onClick={closeMenu}
        className='font-medium pr-2 py-2 text-sm16 text-lightMain max-lg:text-s14 hover:text-white'
        href={ROUTE.MY_TASKS}
      >
        Мої задачі
      </Link>
      <Link
        onClick={closeMenu}
        className='font-medium pr-2 py-2 text-sm16 text-lightMain max-lg:text-s14'
        href={ROUTE.MY_TASKS}
      >
        Мій аккаунт (на майбутнє)
      </Link>
    </nav>
  );
};
