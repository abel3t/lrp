import { AppDispatch, RootState } from '@store';
import { fetchMemberCaresData } from '@store/care';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';
import { useRouter } from 'next/router';

import MuiTimeline, { TimelineProps } from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import CustomChip from '@core/components/mui/chip';
import { CarePriorityColor, CareTypeColor, CareTypeText } from '@core/contanst';
import { formatRelativeDate } from '@core/utils/date';

import { CareType } from '../../@core/enums';

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
  }, [router.isReady, dispatch, router.query?.id]);

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
                  <Link href={`/cares/${careMember.id}`} style={{ cursor: 'pointer', textDecoration: 'none' }}>
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
                        label={CareTypeText[careMember?.type as CareType]}
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
                  </Link>

                  <Typography variant='body2' sx={{ mb: 2, whiteSpace: 'pre' }}>
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

export default MemberOverview;
