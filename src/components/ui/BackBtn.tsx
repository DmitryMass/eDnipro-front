import clsx from 'clsx';
import { useRouter } from 'next/router';
import type { FC, ReactNode } from 'react';

type TBackBtnProps = {
  children: ReactNode;
  classNameModificator?: string;
};

const BackBtn: FC<TBackBtnProps> = ({ children, classNameModificator }) => {
  const { back } = useRouter();
  return (
    <button
      className={clsx(
        'text-white mb-2 rounded-sm px-2.5 py-1 text-s14  hover:bg-opacity-90 transition-all duration-150 bg-asidePanel max-sm:text-xs12',
        classNameModificator
      )}
      onClick={back}
    >
      {children}
    </button>
  );
};

export default BackBtn;
