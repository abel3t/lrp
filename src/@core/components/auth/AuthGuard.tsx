import { useAuth } from 'hooks/useAuth';
import { ReactElement, ReactNode, useEffect } from 'react';

import { useRouter } from 'next/router';

interface AuthGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const AuthGuard = (props: AuthGuardProps) => {
  const { children, fallback } = props;
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (auth.user === null && !window.localStorage.getItem('user')) {
      router.replace('/login');
    }
  }, [router.isReady]);

  if (auth.loading || auth.user === null) {
    return fallback;
  }

  return <>{children}</>;
};

export default AuthGuard;
