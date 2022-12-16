import { AppDispatch, RootState } from '@store';
import { fetchOverview } from '@store/dashboard';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Icon from '@core/components/icon';
import CustomAvatar from '@core/components/mui/avatar';
import OptionsMenu from '@core/components/option-menu';

const Overview = () => {
  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetchOverview());
  }, [dispatch]);

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
              Total {store.overview?.totalPeople || 0} people
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
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' variant='rounded' color='primary' sx={{ mr: 4 }}>
                <Icon icon='mdi:account-outline' />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                  {store.overview?.totalMembers || 0}
                </Typography>
                <Typography variant='caption'>Members</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' variant='rounded' color='warning' sx={{ mr: 4 }}>
                <Icon icon='mdi:account-outline' />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                  {store.overview?.totalFriends || 0}
                </Typography>
                <Typography variant='caption'>Friends</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CustomAvatar skin='light' variant='rounded' color='info' sx={{ mr: 4 }}>
                <Icon icon='mdi:account-outline' />
              </CustomAvatar>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant='h6' sx={{ fontWeight: 600 }}>
                  {store.overview?.totalUnbelievers || 0}
                </Typography>
                <Typography variant='caption'>Unbelievers</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Overview;
