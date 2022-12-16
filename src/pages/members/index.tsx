import { useState, useEffect } from 'react'
import Link from 'next/link'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { DataGrid, GridRowId } from '@mui/x-data-grid'

import Icon from 'src/@core/components/icon'

import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from 'src/store/member'
import { RootState, AppDispatch } from 'src/store'

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { DiscipleshipProcessColor, NotApplicable } from '../../@core/contanst'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import DialogMemberForm from './DialogMemberForm'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { FormMode, Member } from '../../@core/types'
import CustomChip from '../../@core/components/mui/chip'
import { fetchCurators } from '../../store/account'

interface CellType {
  row: Member
}

// ** Styled component for the link in the dataTable
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const defaultColumns = [
  {
    flex: 0.03,
    minWidth: 30,
    field: 'index',
    headerName: 'ID',
    renderCell: ({ row }: CellType) => <StyledLink href={`/members/${row?.id}`}>#{row.index}</StyledLink>
  },
  {
    flex: 0.15,
    minWidth: 125,
    field: 'name',
    headerName: 'Name',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.name}</Typography>
  },
  {
    flex: 0.09,
    minWidth: 90,
    field: 'phone',
    headerName: 'Phone',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.phone || NotApplicable}</Typography>
  },
  {
    flex: 0.08,
    minWidth: 80,
    field: 'discipleshipProcess',
    headerName: 'Discipleship Process',
    renderCell: ({ row }: CellType) => {
      if (!row.discipleshipProcess) {
        return <Typography variant='body2'>{NotApplicable}</Typography>
      }

      return (
        <CustomChip
          skin='light'
          size='small'
          label={row.discipleshipProcess}
          color={DiscipleshipProcessColor[row.discipleshipProcess || '']}
          sx={{
            height: 20,
            fontWeight: 600,
            borderRadius: '5px',
            fontSize: '0.875rem',
            textTransform: 'capitalize',
            '& .MuiChip-label': { mt: -0.25 }
          }}
        />
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 125,
    field: 'curator',
    headerName: 'Curator',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.curator?.name || NotApplicable}</Typography>
  }
]

const MemberPage = () => {
  const [value, setValue] = useState<string>('')
  const [formMode, setFormMode] = useState<FormMode>('create')
  const [pageSize, setPageSize] = useState<number>(10)
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [show, setShow] = useState<boolean>(false)
  const [updateMember, setUpdateMember] = useState<any>(null)

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.member)

  useEffect(() => {
    dispatch(fetchData())
    dispatch(fetchCurators())
  }, [dispatch])

  const handleFilter = (val: string) => {
    setValue(val)
  }

  const handleCreate = () => {
    setUpdateMember(null)
    setFormMode('create')
    setShow(true)
  }

  const handleUpdate = (member: any) => {
    setUpdateMember(member)
    setFormMode('update')
    setShow(true)
  }

  const columns = [
    ...defaultColumns,
    {
      flex: 0.055,
      minWidth: 80,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Tooltip title='View'>
            <IconButton size='small' component={Link} sx={{ mr: 0.5 }} href={`/members/${row.id}`}>
              <Icon icon='mdi:eye-outline' />
            </IconButton>
          </Tooltip>
          <Tooltip title='Edit'>
            <IconButton size='small' sx={{ mr: 0.5 }} onClick={() => handleUpdate(row)}>
              <Icon icon='mdi:pencil-outline' />
            </IconButton>
          </Tooltip>
          {/*<OptionsMenu*/}
          {/*  iconProps={{ fontSize: 20 }}*/}
          {/*  iconButtonProps={{ size: 'small' }}*/}
          {/*  menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}*/}
          {/*  options={[*/}
          {/*    {*/}
          {/*      text: 'Edit',*/}
          {/*      icon: <Icon icon='mdi:pencil-outline' fontSize={20} />*/}
          {/*    },*/}
          {/*    {*/}
          {/*      text: 'View',*/}
          {/*      icon: <Icon icon='mdi:eye-outline' fontSize={20} />*/}
          {/*    }*/}
          {/*  ]}*/}
          {/*/>*/}
        </Box>
      )
    }
  ]

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <Box
              sx={{
                p: 5,
                pb: 3,
                width: '100%',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Select
                size='small'
                displayEmpty
                defaultValue=''
                sx={{ mr: 4, mb: 2 }}
                disabled={selectedRows && selectedRows.length === 0}
                renderValue={selected => (selected.length === 0 ? 'Actions' : selected)}
              >
                <MenuItem disabled>Actions</MenuItem>
                <MenuItem value='Delete'>Delete</MenuItem>
                <MenuItem value='Edit'>Edit</MenuItem>
              </Select>

              <DialogMemberForm show={show} setShow={setShow} mode={formMode} member={updateMember} />

              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <TextField
                  size='small'
                  value={value}
                  placeholder='Search Member'
                  sx={{ mr: 4, mb: 2, maxWidth: '180px' }}
                  onChange={e => handleFilter(e.target.value)}
                />
                <Button sx={{ mb: 2 }} variant='contained' onClick={handleCreate}>
                  Create Member
                </Button>
              </Box>
            </Box>

            <DataGrid
              autoHeight
              pagination
              rows={store.data || []}
              columns={columns}
              checkboxSelection
              disableSelectionOnClick
              pageSize={Number(pageSize)}
              rowsPerPageOptions={[10, 25, 50]}
              onSelectionModelChange={rows => setSelectedRows(rows)}
              onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            />
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default MemberPage
