import { useAuth } from 'hooks/useAuth';
import { ReactElement, ReactNode, useEffect } from 'react';

import { useRouter } from 'next/router';

interface GuestGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const GuestGuard = (props: GuestGuardProps) => {
  const { children, fallback } = props;
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (window.localStorage.getItem('user')) {
      router.replace('/');
    }
  }, [router.isReady]);

  if (auth.loading || (!auth.loading && auth.user !== null)) {
    return fallback;
  }

  return <>{children}</>;
};

export default GuestGuard;
