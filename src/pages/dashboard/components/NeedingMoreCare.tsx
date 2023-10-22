import { AppDispatch, RootState } from '@store';
import { fetchNeedingMoreCareMembers } from '@store/dashboard';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';

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
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import CustomChip from '@core/components/mui/chip';
import OptionsMenu from '@core/components/option-menu';
import { CarePriorityColor, CareTypeColor, CareTypeText, NotApplicable } from '@core/contanst';
import { CareType } from '@core/enums';
import { formatRelativeDate } from '@core/utils/date';

// Styled Timeline component
const Timeline = styled(MuiTimeline)<TimelineProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
});

const NeedingMoreCare = () => {
  const [topNeedingMoreSet, setTopNeedingMoreSet] = useState(0);

  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetchNeedingMoreCareMembers({ set: topNeedingMoreSet }));
  }, [dispatch, topNeedingMoreSet]);

  return (
    <Card>
      <CardHeader
        title='Needing More Care'
        action={
          <OptionsMenu
            options={[
              {
                text: 'Current',
                menuItemProps: {
                  onClick: () => setTopNeedingMoreSet(0)
                }
              },
              {
                text: '2 Months Ago',
                menuItemProps: {
                  onClick: () => setTopNeedingMoreSet(1)
                }
              },
              {
                text: '4 Months Ago',
                menuItemProps: {
                  onClick: () => setTopNeedingMoreSet(2)
                }
              },
              {
                text: '6 Months Ago',
                menuItemProps: {
                  onClick: () => setTopNeedingMoreSet(3)
                }
              },
              {
                text: '1 Year Ago',
                menuItemProps: {
                  onClick: () => setTopNeedingMoreSet(4)
                }
              }
            ]}
            iconButtonProps={{ size: 'small', className: 'card-more-options' }}
          />
        }
      />
      <CardContent
        sx={{ pt: theme => `${theme.spacing(2.5)} !important` }}
        style={{ maxHeight: 350, overflow: 'auto' }}
      >
        <Timeline sx={{ my: 0, py: 0 }}>
          {store.needingMoreCareMembers?.map((careMember: any, index: number) => (
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
                    <Typography sx={{ mr: 2, fontWeight: 600 }}>
                      {careMember.person?.name}
                      &nbsp; &nbsp;
                      <CustomChip
                        skin='light'
                        size='small'
                        label={careMember?.type ? CareTypeText[careMember?.type as CareType] : NotApplicable}
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

                      <Typography sx={{ fontWeight: 600 }} color='primary'>
                        &nbsp;by&nbsp;
                        <span color='primary'>{careMember.curator?.name}</span>
                      </Typography>

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
  );
};

export default NeedingMoreCare;
