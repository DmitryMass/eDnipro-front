import { ROUTE } from '@/utils/routes';
import Link from 'next/link';
import type { FC } from 'react';

export const Logo: FC = () => {
  return (
    <Link href={ROUTE.HOME} className='block text-grayStroke-30'>
      eDnipro
    </Link>
  );
};
