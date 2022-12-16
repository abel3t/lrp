import Grid from '@mui/material/Grid';

import CardStatisticsCharacter from '@core/components/card-statistics/card-stats-with-image';
import KeenSliderWrapper from '@core/styles/libs/keen-slider';
import RechartsWrapper from '@core/styles/libs/recharts';

import NeedingMoreCare from './components/NeedingMoreCare';
import Overview from './components/Overview';
import TopCaringPeople from './components/TopCaringPeople';

const Dashboard = () => {
  return (
    <RechartsWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12} md={6}>
            <Overview />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardStatisticsCharacter
              data={{
                stats: '25',
                title: 'Members',
                chipColor: 'primary',
                trendNumber: '+15.6%',
                chipText: 'This Week'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardStatisticsCharacter
              data={{
                stats: '20',
                trend: 'negative',
                title: 'Members',
                chipColor: 'success',
                trendNumber: '-25.5%',
                chipText: 'Last Month'
              }}
            />
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
