// ** React Imports
import { SyntheticEvent, useEffect, useState } from 'react'

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
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../../store'
import { fetchTopCaringPeople } from '../../../store/dashboard'
import { NotApplicable } from '../../../@core/contanst'

interface StatusObj {
  [ke: string]: {
    text: string
    color: ThemeColor
  }
}

const CareTitleText = {
  Excellent: 'Excellent',
  Good: 'Good',
  Normal: 'Normal',
  NotGood: 'Not Good'
}

const CareTitleColor = {
  Excellent: 'primary',
  Good: 'success',
  Normal: 'warning',
  NotGood: 'error'
}

const TopCaringPeople = () => {
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.dashboard)

  useEffect(() => {
    dispatch(fetchTopCaringPeople())
  }, [dispatch])

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
              <TableCell>ID</TableCell>
              <TableCell align='left'>Role</TableCell>
              <TableCell align='left'>Name</TableCell>
              <TableCell align='left'>Title</TableCell>
              <TableCell align='center'>Care Times</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {store.topCaringPeople?.map((row: any, index: number) => (
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
                  <Typography variant='body2' sx={{ fontWeight: 600, whiteSpace: 'nowrap' }} color='primary'>
                    #{index + 1}
                  </Typography>
                </TableCell>

                {/*<TableCell>*/}
                {/*  <Avatar alt={row.imgAlt} src={row.imgSrc} variant='rounded' sx={{ width: 34, height: 34 }} />*/}
                {/*</TableCell>*/}

                <TableCell>
                  <Typography variant='body2' sx={{ fontWeight: 600, whiteSpace: 'nowrap' }} color='primary'>
                    {row.role}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant='body2' sx={{ fontWeight: 600, whiteSpace: 'nowrap', color: 'text.primary' }}>
                    {row.name || NotApplicable}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant='body2' sx={{ fontWeight: 600, whiteSpace: 'nowrap', color: 'text.primary' }}>
                    <CustomChip
                      skin='light'
                      size='small'
                      label={CareTitleText[row.title || '']}
                      color={CareTitleColor[row.title || '']}
                      sx={{ height: 20, fontWeight: 500, '& .MuiChip-label': { px: 1.625, lineHeight: 1.539 } }}
                    />
                  </Typography>
                </TableCell>

                <TableCell align='center'>
                  <Typography variant='body2' sx={{ fontWeight: 600, whiteSpace: 'nowrap', color: 'text.primary' }}>
                    {row.careTimes ?? NotApplicable}
                  </Typography>
                </TableCell>

                {/*<TableCell align='right'>*/}
                {/*  <CustomChip*/}
                {/*    skin='light'*/}
                {/*    size='small'*/}
                {/*    label={statusObj[row.status].text}*/}
                {/*    color={statusObj[row.status].color}*/}
                {/*    sx={{ height: 20, fontWeight: 500, '& .MuiChip-label': { px: 1.625, lineHeight: 1.539 } }}*/}
                {/*  />*/}
                {/*</TableCell>*/}
                {/*<TableCell>*/}
                {/*  <Typography*/}
                {/*    variant='body2'*/}
                {/*    sx={{ fontWeight: 600, textAlign: 'right', whiteSpace: 'nowrap', color: 'text.primary' }}*/}
                {/*  >*/}
                {/*    {row.revenue}*/}
                {/*  </Typography>*/}
                {/*</TableCell>*/}
                {/*<TableCell>*/}
                {/*  <Typography*/}
                {/*    variant='body2'*/}
                {/*    sx={{*/}
                {/*      fontWeight: 600,*/}
                {/*      textAlign: 'right',*/}
                {/*      color: row.conversionDifference === 'negative' ? 'error.main' : 'success.main'*/}
                {/*    }}*/}
                {/*  >{`${row.conversion}%`}</Typography>*/}
                {/*</TableCell>*/}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  )
}

export default TopCaringPeople
