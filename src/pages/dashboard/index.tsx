// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import CardStatisticsCharacter from 'src/@core/components/card-statistics/card-stats-with-image'

// ** Styled Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import RechartsWrapper from 'src/@core/styles/libs/recharts'

// ** Demo Components Imports
import Table from './components/Table'
import TotalVisits from './components/TotalVisits'
import SalesOverview from './components/SalesOverview'
import WeeklySalesBg from './components/WeeklySalesBg'
import MarketingSales from './components/MarketingSales'
import ActivityTimeline from './components/ActivityTimeline'
import SalesOverviewWithTabs from './components/SalesOverviewWithTabs'

const Dashboard = () => {
  return (
    <RechartsWrapper>
      <KeenSliderWrapper>
        <Grid container spacing={6} className='match-height'>
          <Grid item xs={12} md={6}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardStatisticsCharacter
              data={{
                stats: '8.14k',
                title: 'Ratings',
                chipColor: 'primary',
                trendNumber: '+15.6%',
                chipText: 'Year of 2022',
                src: '/images/cards/card-stats-img-1.png'
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardStatisticsCharacter
              data={{
                stats: '12.2k',
                trend: 'negative',
                title: 'Sessions',
                chipColor: 'success',
                trendNumber: '-25.5%',
                chipText: 'Last Month',
                src: '/images/cards/card-stats-img-2.png'
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <WeeklySalesBg />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TotalVisits />
          </Grid>
          <Grid item xs={12} md={6}>
            <ActivityTimeline />
          </Grid>
          <Grid item xs={12} md={6}>
            <SalesOverviewWithTabs />
          </Grid>
          <Grid item xs={12} md={5} sx={{ order: [2, 2, 1] }}>
            <MarketingSales />
          </Grid>
          <Grid item xs={12} md={8} sx={{ order: 3 }}>
            <Table />
          </Grid>
        </Grid>
      </KeenSliderWrapper>
    </RechartsWrapper>
  )
}

export default Dashboard
