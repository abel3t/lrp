import { IconProps } from '@iconify/react';
import { ReactNode } from 'react';

import { GridProps } from '@mui/material/Grid';

import { ThemeColor } from '@core/layouts/types';

export type CustomCheckboxBasicData = {
  value: string;
  content?: ReactNode;
  isSelected?: boolean;
} & (
  | {
      meta: ReactNode;
      title: ReactNode;
    }
  | {
      meta?: never;
      title?: never;
    }
  | {
      title: ReactNode;
      meta?: never;
    }
);
export type CustomCheckboxBasicProps = {
  name: string;
  color?: ThemeColor;
  selected: string[];
  gridProps: GridProps;
  data: CustomCheckboxBasicData;
  handleChange: (value: string) => void;
};

export type CustomCheckboxIconsData = {
  value: string;
  title?: ReactNode;
  content?: ReactNode;
  isSelected?: boolean;
};
export type CustomCheckboxIconsProps = {
  name: string;
  icon?: string;
  color?: ThemeColor;
  selected: string[];
  gridProps: GridProps;
  data: CustomCheckboxIconsData;
  iconProps?: Omit<IconProps, 'icon'>;
  handleChange: (value: string) => void;
};

export type CustomCheckboxImgData = {
  alt?: string;
  value: string;
  img: ReactNode;
  isSelected?: boolean;
};
export type CustomCheckboxImgProps = {
  name: string;
  color?: ThemeColor;
  selected: string[];
  gridProps: GridProps;
  data: CustomCheckboxImgData;
  handleChange: (value: string) => void;
};
