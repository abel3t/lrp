import { ReactNode } from 'react';

import Link from 'next/link';

import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import BlankLayout from '@core/layouts/BlankLayout';

import FooterIllustrations from 'views/pages/misc/FooterIllustrations';

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}));

const Img = styled('img')(({ theme }) => ({
  marginTop: theme.spacing(15),
  marginBottom: theme.spacing(15),
  [theme.breakpoints.down('lg')]: {
    height: 450,
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    height: 400
  }
}));

const Error401 = () => {
  return (
    <Box className='content-center'>
      <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <BoxWrapper>
          <Typography variant='h4'>LRP tạm thời không hoạt động, đang tiến hành di chuyển dữ liệu!</Typography>
          {/*<Typography variant='h1' sx={{ mb: 2.5 }}>*/}
          {/*  401*/}
          {/*</Typography>*/}
          {/*<Typography variant='h5' sx={{ mb: 2.5, fontSize: '1.5rem !important' }}>*/}
          {/*  You are not authorized! 🔐*/}
          {/*</Typography>*/}
          {/*<Typography variant='body2'>You don&prime;t have permission to access this page. Go Home!</Typography>*/}
        </BoxWrapper>
        {/*<Img alt='error-illustration' src='/images/pages/401.png' />*/}
        {/*<Button href='/' component={Link} variant='contained' sx={{ px: 5.5 }}>*/}
        {/*  Back to Home*/}
        {/*</Button>*/}
      </Box>
      <FooterIllustrations image='/images/pages/misc-401-object.png' />
    </Box>
  );
};

Error401.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default Error401;
