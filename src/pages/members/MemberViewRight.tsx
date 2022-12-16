import { SyntheticEvent, useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { InvoiceType } from 'src/types/apps/invoiceTypes'

import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import MuiTab, { TabProps } from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

import MemberMinistry from './MemberMinistry'
import MemberNetwork from './MemberNetwork'
import MemberOverview from './MemberOverview'
import MemberTeam from './MemberTeam'

interface Props {
  tab: string
  invoiceData: InvoiceType[]
}

const Tab = styled(MuiTab)<TabProps>(({ theme }) => ({
  minHeight: 48,
  flexDirection: 'row',
  '& svg': {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1)
  }
}))

const MemberViewRight = ({ tab, invoiceData }: Props) => {
  const [activeTab, setActiveTab] = useState<string>(tab)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const handleChange = (event: SyntheticEvent, value: string) => {
    setActiveTab(value)
  }

  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  useEffect(() => {
    if (invoiceData) {
      setIsLoading(false)
    }
  }, [invoiceData])

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
        {/*<Tab value='ministry' label='Ministry' icon={<Icon icon='mdi:lock-outline' />} />*/}
        {/*<Tab value='team' label='Team' icon={<Icon icon='mdi:bell-outline' />} />*/}
        <Tab value='network' label='Network' icon={<Icon icon='mdi:link-variant' />} />
      </TabList>
      <Box sx={{ mt: 6 }}>
        {isLoading ? (
          <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <CircularProgress sx={{ mb: 4 }} />
            <Typography>Loading...</Typography>
          </Box>
        ) : (
          <>
            <TabPanel sx={{ p: 0 }} value='overview'>
              <MemberOverview />
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
          </>
        )}
      </Box>
    </TabContext>
  )
}

export default MemberViewRight
