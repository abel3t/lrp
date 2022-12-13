// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Import
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Card from '@mui/material/Card'
import TabList from '@mui/lab/TabList'
import Table from '@mui/material/Table'
import TabPanel from '@mui/lab/TabPanel'
import Avatar from '@mui/material/Avatar'
import TabContext from '@mui/lab/TabContext'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Type Imports
import { ThemeColor } from 'src/@core/layouts/types'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import OptionsMenu from 'src/@core/components/option-menu'

// ** Util Import
import { hexToRGBA } from 'src/@core/utils/hex-to-rgba'

interface StatusObj {
  [ke: string]: {
    text: string
    color: ThemeColor
  }
}

const statusObj: StatusObj = {
  'Good': { text: 'Good', color: 'success' },
  'Normal': { text: 'Normal', color: 'primary' },
  'NotGood': { text: 'Not Good', color: 'warning' },
}

const data = [
  {
    revenue: '$12.5k',
    conversion: '+24',
    imgAlt: 'samsung-s22',
    status: 'NotGood',
    product: 'Samsung s22',
    imgSrc: '/images/cards/samsung-s22.png'
  },
  {
    revenue: '$45k',
    conversion: '-18',
    status: 'Good',
    imgAlt: 'apple-iPhone-13-pro',
    product: 'Apple iPhone 13 Pro',
    conversionDifference: 'negative',
    imgSrc: '/images/cards/apple-iPhone-13-pro.png'
  },
  {
    revenue: '$98.2k',
    conversion: '+55',
    status: 'Normal',
    imgAlt: 'oneplus-9-pro',
    product: 'Oneplus 9 Pro',
    imgSrc: '/images/cards/oneplus-9-pro.png'
  }
];

const TopCaringPeople = () => {
    return (
    <Card>
      <CardHeader
        title='Top Caring People'
        subheader='Activity Care'
        action={
          <OptionsMenu
            options={['This Month', 'Last Month']}
            iconButtonProps={{ size: 'small', className: 'card-more-options' }}
          />
        }
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ '& .MuiTableCell-root': { py: theme => `${theme.spacing(2.5)} !important` } }}>
              <TableCell>Image</TableCell>
              <TableCell sx={{ whiteSpace: 'nowrap' }}>Product Name</TableCell>
              <TableCell align='right'>Status</TableCell>
              <TableCell align='right'>Revenue</TableCell>
              <TableCell align='right'>Conversion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: any, index: number) => (
              <TableRow
                key={index}
                sx={{
                  '& .MuiTableCell-root': {
                    border: 0,
                    py: theme => `${theme.spacing(1.5)} !important`
                  },
                  '&:first-child .MuiTableCell-body': {
                    pt: theme => `${theme.spacing(3)} !important`
                  },
                  '&:last-child .MuiTableCell-body': {
                    pb: theme => `${theme.spacing(3)} !important`
                  }
                }}
              >
                <TableCell>
                  <Avatar alt={row.imgAlt} src={row.imgSrc} variant='rounded' sx={{ width: 34, height: 34 }} />
                </TableCell>
                <TableCell>
                  <Typography variant='body2' sx={{ fontWeight: 600, whiteSpace: 'nowrap', color: 'text.primary' }}>
                    {row.product}
                  </Typography>
                </TableCell>
                <TableCell align='right'>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={statusObj[row.status].text}
                    color={statusObj[row.status].color}
                    sx={{ height: 20, fontWeight: 500, '& .MuiChip-label': { px: 1.625, lineHeight: 1.539 } }}
                  />
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    sx={{ fontWeight: 600, textAlign: 'right', whiteSpace: 'nowrap', color: 'text.primary' }}
                  >
                    {row.revenue}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant='body2'
                    sx={{
                      fontWeight: 600,
                      textAlign: 'right',
                      color: row.conversionDifference === 'negative' ? 'error.main' : 'success.main'
                    }}
                  >{`${row.conversion}%`}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default TopCaringPeople
