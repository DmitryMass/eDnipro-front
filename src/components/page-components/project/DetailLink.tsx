import Link from 'next/link';
import { type FC } from 'react';

type TDetailLink = {
  route: string;
};

export const DetailLink: FC<TDetailLink> = ({ route }) => {
  return (
    <Link
      href={route}
      className='cursor-pointer text-white rounded-sm px-2.5 py-1 text-s14  hover:bg-opacity-90 transition-all duration-150 bg-asidePanel max-sm:text-xs12'
    >
      Деталі
    </Link>
  );
};
