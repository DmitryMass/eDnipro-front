import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { type FC, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainLayout } from '@/components/layouts/MainLayout';
import 'react-toastify/dist/ReactToastify.css';
import Head from 'next/head';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <Head>
          <title>eDnipro - projects portal</title>
        </Head>
        <MainLayout>
          <Component {...pageProps} />
          <ToastContainer
            className={'z-50'}
            position='bottom-left'
            autoClose={2000}
          />
        </MainLayout>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default App;
