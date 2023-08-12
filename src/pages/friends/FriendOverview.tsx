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
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { DisciplePriorityColor, DiscipleTypeColor, DiscipleTypeText } from '../../@core/contanst';
import Link from 'next/link';
import CustomChip from '../../@core/components/mui/chip';
import { DiscipleType } from '../../@core/enums';
import { formatRelativeDate } from '../../@core/utils/date';
import { format } from 'date-fns';
import { fetchPersonDisciplesData } from '../../@store/disciple';

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

const FriendOverview = () => {
  return (
    <Grid container spacing={6}>
      <FriendTimeline />
    </Grid>
  );
};

const FriendTimeline = () => {
  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state.disciple);

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchPersonDisciplesData(router.query?.id as string));
    }
  }, [router.isReady, dispatch]);

  return (
    <Grid item xs={12}>
      <Card>
        <CardHeader title='User Activity Timeline' />
        <CardContent style={{ maxHeight: 500, overflow: 'auto' }}>
          <Timeline sx={{ my: 0, py: 0 }}>
            {store.personDisciples?.map((discipleMember: any, index: number) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color={DisciplePriorityColor[discipleMember.priority]} />
                  <TimelineConnector />
                </TimelineSeparator>

                <TimelineContent sx={{ mt: 0, mb: theme => `${theme.spacing(3)} !important` }}>
                  <Link href={`/disciples/${discipleMember.id}`} style={{ cursor: 'pointer', textDecoration: 'none' }}>
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
                        label={DiscipleTypeText[discipleMember?.type as DiscipleType]}
                        color={DiscipleTypeColor[discipleMember?.type || '']}
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
                        <span color='primary'>{discipleMember.curator?.name}</span>
                      </Typography>

                      <Typography variant='caption' sx={{ color: 'text.disabled' }}>
                        {formatRelativeDate(discipleMember.date)}&nbsp; - &nbsp;
                        {format(new Date(discipleMember.date), 'dd/MM/yyyy')}
                      </Typography>
                    </Box>
                  </Link>

                  <Typography variant='body2' sx={{ mb: 2, whiteSpace: 'pre' }}>
                    {discipleMember.description}
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

export default FriendOverview;
