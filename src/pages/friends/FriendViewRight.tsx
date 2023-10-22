import { SyntheticEvent, useEffect, useState } from 'react';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import MuiTab, { TabProps } from '@mui/material/Tab';
import { styled } from '@mui/material/styles';

import Icon from '@core/components/icon';

import FriendTimeline from './FriendTimeline';

interface Props {
  tab: string;
}

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  }
}));

const FriendViewRight = ({ tab }: Props) => {
  const [activeTab, setActiveTab] = useState<string>(tab);

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value);
  };

  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  return (
    <TabContext value={activeTab}>
      <TabList
        variant='scrollable'
        scrollButtons='auto'
        onChange={handleChange}
        aria-label='forced scroll tabs example'
        sx={{ borderBottom: theme => `1px solid ${theme.palette.divider}` }}
      >
        <Tab value='discipleship_process' label='Discipleship Process' icon={<Icon icon='mdi:account-outline' />} />
        {/*<Tab value='ministry' label='Ministry' icon={<Icon icon='mdi:lock-outline' />} />*/}
        {/*<Tab value='team' label='Team' icon={<Icon icon='mdi:bell-outline' />} />*/}
        {/*<Tab value='network' label='Network' icon={<Icon icon='mdi:link-variant' />} />*/}
      </TabList>
      <Box sx={{ mt: 6 }}>
        {/*{isLoading ? (*/}
        {/*  <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>*/}
        {/*    <CircularProgress sx={{ mb: 4 }} />*/}
        {/*    <Typography>Loading...</Typography>*/}
        {/*  </Box>*/}
        {/*) : (*/}
        {/*  <>*/}
        {/*    <TabPanel sx={{ p: 0 }} value='overview'>*/}
        {/*      <FriendTimeline />*/}
        {/*    </TabPanel>*/}
        {/*  </>*/}
        {/*)}*/}

        <TabPanel sx={{ p: 0 }} value='discipleship_process'>
          <FriendTimeline />
        </TabPanel>
      </Box>
    </TabContext>
  );
};

export default FriendViewRight;
