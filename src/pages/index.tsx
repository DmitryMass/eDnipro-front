import { Auth } from '@/components/auth/Auth';

import type { FC } from 'react';

const Home: FC = () => {
  return (
    <div className={'pt-5 pb-10 flex items-center justify-center h-screen'}>
      <Auth />
    </div>
  );
};
export default Home;
