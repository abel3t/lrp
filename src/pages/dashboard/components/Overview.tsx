// ** React Imports
import { ReactElement } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Types
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

interface OverviewDataType {
  stats: string
  title: string
  color: ThemeColor
  icon: ReactElement
}

const OverviewsData: OverviewDataType[] = [
  {
    stats: '28',
    color: 'primary',
    title: 'Members',
    icon: <Icon icon='mdi:account-outline' />
  },
  {
    stats: '5',
    color: 'warning',
    title: 'Friends',
    icon: <Icon icon='mdi:account-outline' />
  },
  {
    color: 'info',
    stats: '2',
    title: 'Unbelievers',
    icon: <Icon icon='mdi:account-outline' />
  }
]

const renderStats = () => {
  return OverviewsData.map((Overview: OverviewDataType, index: number) => (
    <Grid item xs={12} sm={4} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomAvatar skin='light' variant='rounded' color={Overview.color} sx={{ mr: 4 }}>
          {Overview.icon}
        </CustomAvatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h6' sx={{ fontWeight: 600 }}>
            {Overview.stats}
          </Typography>
          <Typography variant='caption'>{Overview.title}</Typography>
        </Box>
      </Box>
    </Grid>
  ))
}

const Overview = () => {
  return (
    <Card>
      <CardHeader
        sx={{ pb: 3.25 }}
        title='Overview'
        titleTypographyProps={{ variant: 'h6' }}
        action={
          <OptionsMenu
            options={['Last Month', 'Last Year']}
            iconButtonProps={{ size: 'small', className: 'card-more-options' }}
          />
        }
        subheader={
          <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { color: 'success.main' } }}>
            <Typography variant='caption' sx={{ mr: 1.5 }}>
              Total 35 people
            </Typography>
            {/*<Typography variant='subtitle2' sx={{ color: 'success.main' }}>*/}
            {/*  +18%*/}
            {/*</Typography>*/}
            {/*<Icon icon='mdi:chevron-up' fontSize={20} />*/}
          </Box>
        }
      />
      <CardContent>
        <Grid container spacing={6}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Overview
