// ** MUI Imports
import Grid from '@mui/material/Grid'

// ** Custom Components Imports
import CardStatisticsCharacter from 'src/@core/components/card-statistics/card-stats-with-image'

// ** Styled Component Import
import KeenSliderWrapper from 'src/@core/styles/libs/keen-slider'
import RechartsWrapper from 'src/@core/styles/libs/recharts'

// ** Demo Components Imports
import Overview from './components/Overview'
import NeedingMoreCare from './components/NeedingMoreCare'
import TopCaringPeople from './components/TopCaringPeople'

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
  )
}

export default Dashboard
