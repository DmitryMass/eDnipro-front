import clsx from 'clsx';
import { ReactNode, type FC } from 'react';

type TTitleProps = {
  classModificator?: string;
  children: ReactNode;
};

export const Title: FC<TTitleProps> = ({ children, classModificator }) => {
  // компонент можно настроить под любой h (1 2 3 4 5) и сделать любую конфигурацию
  return <h1 className={clsx('', classModificator)}>{children}</h1>;
};
