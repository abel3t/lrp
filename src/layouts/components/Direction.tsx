import { useEffect, ReactNode } from 'react';

import { Direction } from '@mui/material';

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

// ** RTL Plugin
import stylisRTLPlugin from 'stylis-plugin-rtl';

interface DirectionProps {
  children: ReactNode;
  direction: Direction;
}

const styleCache = () =>
  createCache({
    key: 'rtl',
    prepend: true,
    stylisPlugins: [stylisRTLPlugin]
  });

const Direction = (props: DirectionProps) => {
  const { children, direction } = props;

  useEffect(() => {
    document.dir = direction;
  }, [direction]);

  if (direction === 'rtl') {
    return <CacheProvider value={styleCache()}>{children}</CacheProvider>;
  }

  return <>{children}</>;
};

export default Direction;
