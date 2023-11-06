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
import {
  SundayServicePriorityColor, SundayServicePriorityText
} from '../../@core/contanst';
import CustomChip from '../../@core/components/mui/chip';
import { formatRelativeDate } from '../../@core/utils/date';
import { format, getWeek } from 'date-fns';
import { fetchSundayServiceHistories } from '@store/absence';

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

const SundayServiceHistory = () => {
  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state.absence);

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchSundayServiceHistories(router.query?.id as string));
    }
  }, [router.isReady, dispatch, router.query?.id]);

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title=""/>
          <CardContent style={{ maxHeight: 500, overflow: 'auto' }}>
            <Timeline sx={{ my: 0, py: 0 }}>
              {store.sundayServiceHistories?.map((history: any, index: number) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot color={SundayServicePriorityColor[history.status + (history.type || '')]}/>
                    <TimelineConnector/>
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
                        skin="light"
                        size="small"
                        label={(SundayServicePriorityText as any)[history.status + (history.type || '')]}
                        color={SundayServicePriorityColor[history.status + (history.type || '')]}
                        sx={{
                          height: 20,
                          fontWeight: 600,
                          borderRadius: '5px',
                          fontSize: '0.875rem',
                          textTransform: 'capitalize',
                          '& .MuiChip-label': { mt: -0.25 }
                        }}
                      />

                      <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                        {formatRelativeDate(history.date)}&nbsp; - &nbsp;

                        Week: {getWeek(new Date(history.date), { weekStartsOn: 1 })} &nbsp; - &nbsp;

                        {format(new Date(history.date), 'dd/MM/yyyy')}
                      </Typography>
                    </Box>

                    <Typography variant="body2" sx={{ mb: 2, whiteSpace: 'pre' }}>
                      {history.description}
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SundayServiceHistory;
