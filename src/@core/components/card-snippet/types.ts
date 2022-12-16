import { ReactElement, ReactNode } from 'react';

import { CardProps } from '@mui/material/Card';

export type CardSnippetProps = CardProps & {
  id?: string;
  title: string;
  children: ReactNode;
  code: {
    tsx: ReactElement | null;
    jsx: ReactElement | null;
  };
  className?: string;
};
