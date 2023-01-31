import { useAuth } from 'hooks/useAuth';
import { useEffect } from 'react';

import { useRouter } from 'next/router';

import Spinner from '@core/components/spinner';

export const getHomeRoute = (role: string) => {
  if (role === 'client') return '/acl';
  else return '/dashboard';
};

const Home = () => {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (auth.user && auth.user.role) {
      const homeRoute = getHomeRoute(auth.user.role);

      router.replace(homeRoute);
    }
  }, [router.isReady]);

  return <Spinner />;
};

export default Home;
