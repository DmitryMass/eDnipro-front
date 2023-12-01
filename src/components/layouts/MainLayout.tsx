import { ROUTE } from '@/utils/routes';
import clsx from 'clsx';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { FC, ReactNode } from 'react';
import { AsidePanel } from './AsidePanel';
import { useSession } from 'next-auth/react';

const inter = Inter({ subsets: ['latin'] });

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { pathname } = useRouter();
  const session = useSession();

  // useEffect(() => {
  //не забыть написать ф-цию на чек токена
  // }, []);

  return (
    <div
      className={clsx(
        inter.className,
        'bg-grayStroke-40 max-lg:block flex items-start'
      )}
    >
      {/* предварительно так (нужно обрабатывать вариант если страницы не существует, пока срабатывает кастомный notfound) */}
      {pathname === ROUTE.HOME ? null : <AsidePanel />}
      <main
        className={clsx(
          'flex-1 relative',
          pathname === ROUTE.HOME
            ? 'max-w-loginContainer mx-auto px-3.5'
            : null,
          'max-w-container mx-auto px-3.5'
        )}
      >
        {children}
      </main>
    </div>
  );
};
