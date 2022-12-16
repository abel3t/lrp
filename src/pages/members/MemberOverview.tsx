import { AppDispatch, RootState } from '@store';
import { fetchMemberCaresData } from '@store/care';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import CustomChip from '@core/components/mui/chip';
import { CarePriorityColor, CareTypeColor } from '@core/contanst';
import { formatRelativeDate } from '@core/utils/date';

const Timeline = styled(MuiTimeline)<TimelineProps>(({ theme }) => ({
  margin: 0,
  padding: 0,
  marginLeft: theme.spacing(0.75),
  '& .MuiTimelineItem-root': {
    '&:before': {
      display: 'none'
    },
    '&:last-child': {
      minHeight: 60
    }
  }
}));

const MemberOverview = () => {
  return (
    <Grid container spacing={6}>
      <CaringOverview />
      <SundayServiceOverview />
    </Grid>
  );
};

const CaringOverview = () => {
  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state.care);

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchMemberCaresData(router.query?.id as string));
    }
  }, [router.isReady, dispatch]);

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title='User Activity Timeline' />
        <CardContent style={{ maxHeight: 500, overflow: 'auto' }}>
          <Timeline sx={{ my: 0, py: 0 }}>
            {store.memberCares?.map((careMember: any, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color={CarePriorityColor[careMember.priority]} />
                  <TimelineConnector />
                </TimelineSeparator>

                <TimelineContent sx={{ mt: 0, mb: theme => `${theme.spacing(3)} !important` }}>
                  <Box
                    sx={{
                      mb: 3,
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <CustomChip
                      skin='light'
                      size='small'
                      label={careMember?.type}
                      color={CareTypeColor[careMember?.type || '']}
                      sx={{
                        height: 20,
                        fontWeight: 600,
                        borderRadius: '5px',
                        fontSize: '0.875rem',
                        textTransform: 'capitalize',
                        '& .MuiChip-label': { mt: -0.25 }
                      }}
                    />
                    <Typography sx={{ mr: 2, fontWeight: 600 }} color='primary'>
                      &nbsp;by&nbsp;
                      <span color='primary'>{careMember.curator?.name}</span>
                    </Typography>

                    <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                      {formatRelativeDate(careMember.date)}&nbsp; - &nbsp;
                      {format(new Date(careMember.date), 'dd/MM/yyyy')}
                    </Typography>
                  </Box>
                  <Typography variant='body2' sx={{ mb: 2 }}>
                    {careMember.description}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </CardContent>
      </Card>
    </Grid>
  );
};

const SundayServiceOverview = () => {
  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title='User Activity Timeline' />
        <CardContent>
          <Timeline>
            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color='error' />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Box
                  sx={{
                    mb: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}>
                    User login
                  </Typography>
                  <Typography variant='caption'>12 min ago</Typography>
                </Box>
                <Typography variant='body2'>User login at 2:12pm</Typography>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color='primary' />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Box
                  sx={{
                    mb: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}>
                    Meeting with John
                  </Typography>
                  <Typography variant='caption'>45 min ago</Typography>
                </Box>
                <Typography variant='body2' sx={{ mb: 2 }}>
                  React Project meeting with John @10:15am
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar alt='Avatar' src='/images/avatars/2.png' sx={{ width: 40, height: 40, mr: 2 }} />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                      Leona Watkins (Client)
                    </Typography>
                    <Typography variant='body2'>CEO of Watkins Group</Typography>
                  </Box>
                </Box>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color='info' />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Box
                  sx={{
                    mb: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}>
                    Create a new react project for client
                  </Typography>
                  <Typography variant='caption'>2 day ago</Typography>
                </Box>
                <Typography variant='body2'>Add files to new design folder</Typography>
              </TimelineContent>
            </TimelineItem>

            <TimelineItem>
              <TimelineSeparator>
                <TimelineDot color='success' />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Box
                  sx={{
                    mb: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <Typography variant='body2' sx={{ mr: 2, fontWeight: 600, color: 'text.primary' }}>
                    Create invoices for client
                  </Typography>
                  <Typography variant='caption'>12 min ago</Typography>
                </Box>
                <Typography variant='body2'>Create new invoices and send to Leona Watkins</Typography>
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 28, height: 'auto' }}>
                    <img width={28} height={28} alt='invoice.pdf' src='/images/icons/file-icons/pdf.png' />
                  </Box>
                  <Typography variant='subtitle2' sx={{ ml: 2, fontWeight: 600 }}>
                    invoice.pdf
                  </Typography>
                </Box>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default MemberOverview;
