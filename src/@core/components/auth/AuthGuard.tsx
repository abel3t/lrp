import { useAuth } from 'hooks/useAuth';
import { ReactElement, ReactNode, useEffect } from 'react';

import { useRouter } from 'next/router';
import Error401 from "../../../pages/401";

interface AuthGuardProps {
  children: ReactNode;
  fallback: ReactElement | null;
}

const AuthGuard = (props: AuthGuardProps) => {
  console.log(props);
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) {
      return;
    }

    if (auth.user === null && !window.localStorage.getItem('user')) {
      // router.replace('/');
    }
  }, [router.isReady]);

  return (
    <Error401 />
  );
};

export default AuthGuard;
