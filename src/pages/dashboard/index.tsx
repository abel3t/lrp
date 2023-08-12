import Head from 'next/head';

import Grid from '@mui/material/Grid';

import KeenSliderWrapper from '@core/styles/libs/keen-slider';
import RechartsWrapper from '@core/styles/libs/recharts';

import NeedingMoreCare from './components/NeedingMoreCare';
import Overview from './components/Overview';
import TopCaringPeople from './components/TopCaringPeople';
import SundayServicePresence from './components/SundayServicePresence';

const Dashboard = () => {
  return (
    <RechartsWrapper>
      <Head>
        <title>Dashboard - Lighthouse Resource Planning</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <KeenSliderWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12} md={6}>
            <Overview />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <SundayServicePresence />
          </Grid>
          <Grid item xs={12} md={6}>
            <NeedingMoreCare />
          </Grid>
          <Grid item xs={12} md={6}>
            <TopCaringPeople />
          </Grid>
        </Grid>
      </KeenSliderWrapper>
    </RechartsWrapper>
  );
};

export default Dashboard;
