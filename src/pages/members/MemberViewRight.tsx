import { SyntheticEvent, useEffect, useState } from 'react';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import MuiTab, { TabProps } from '@mui/material/Tab';
import { styled } from '@mui/material/styles';

import Icon from '@core/components/icon';

import MemberMinistry from './MemberMinistry';
import MemberNetwork from './MemberNetwork';
import MemberOverview from './MemberOverview';
import MemberTeam from './MemberTeam';
import DiscipleshipProcess from './DiscipleshipProcess';
import Friends from './Friends';

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

const MemberViewRight = ({ tab }: Props) => {
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
        <Tab value='overview' label='Overview' icon={<Icon icon='mdi:account-outline' />} />
        <Tab value='discipleship_process' label='Discipleship Process' />
        <Tab value='friends' label='Friends' />

        {/*<Tab value='ministry' label='Ministry' icon={<Icon icon='mdi:lock-outline' />} />*/}
        {/*<Tab value='team' label='Team' icon={<Icon icon='mdi:bell-outline' />} />*/}
        {/*<Tab value='network' label='Network' icon={<Icon icon='mdi:link-variant' />} />*/}
      </TabList>
      <Box sx={{ mt: 6 }}>
        <TabPanel sx={{ p: 0 }} value='overview'>
          <MemberOverview />
        </TabPanel>

        <TabPanel sx={{ p: 0 }} value='discipleship_process'>
          <DiscipleshipProcess />
        </TabPanel>

        <TabPanel sx={{ p: 0 }} value='friends'>
          <Friends />
        </TabPanel>

        <TabPanel sx={{ p: 0 }} value='ministry'>
          <MemberMinistry />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='team'>
          <MemberTeam />
        </TabPanel>
        <TabPanel sx={{ p: 0 }} value='network'>
          <MemberNetwork />
        </TabPanel>
      </Box>
    </TabContext>
  );
};

export default MemberViewRight;
