import { Auth } from '@/components/auth/Auth';
import { ROUTE } from '@/utils/routes';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

import type { FC } from 'react';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: ROUTE.PROJECTS,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

const Home: FC = () => {
  return (
    <div className={'pt-5 pb-10 flex items-center justify-center h-screen'}>
      <Auth />
    </div>
  );
};
export default Home;
