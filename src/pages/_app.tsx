import { MainLayout } from '@/components/layouts/MainLayout';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useState, type FC } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NextNProgress from 'nextjs-progressbar';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={pageProps.session}>
        <Head>
          <title>eDnipro - projects portal</title>
        </Head>
        <MainLayout>
          <NextNProgress
            color='#027bff'
            options={{ showSpinner: false }}
            startPosition={0.3}
            showOnShallow={true}
            height={5}
          />
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
