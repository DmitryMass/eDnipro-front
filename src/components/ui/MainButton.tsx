import clsx from 'clsx';
import { ReactNode, FC } from 'react';

type TMainButtonProps = {
  disabled?: boolean;
  classModificator?: string;
  children: ReactNode;
  type: 'submit' | 'button' | undefined | 'reset';
  onClick?: () => void;
};

export const MainButton: FC<TMainButtonProps> = ({
  children,
  classModificator,
  disabled,
  type,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={clsx(
        'bg-asidePanel text-white text-s14 hover:bg-black transition-all duration-200 flex justify-center items-center w-full font-semibold rounded-[0.25rem] border border-transparent py-1.5 px-4',
        classModificator
      )}
    >
      {children}
    </button>
  );
};
