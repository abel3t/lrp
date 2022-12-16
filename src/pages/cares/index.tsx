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
import { fetchData } from 'src/store/care'
import { RootState, AppDispatch } from 'src/store'

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import DialogCareForm from './DialogCareForm'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Care, FormMode } from '../../@core/types'
import { CarePriorityColor, CareTypeColor, CareTypeText, NotApplicable } from '../../@core/contanst'
import CustomChip from '../../@core/components/mui/chip'
import { formatRelativeDate } from '../../@core/utils/date'
import { format } from 'date-fns'

interface CellType {
  row: Care
}

// ** Styled component for the link in the dataTable
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}))

const defaultColumns = [
  {
    flex: 0.115,
    minWidth: 120,
    field: 'name',
    headerName: 'Name',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.member?.name || NotApplicable}</Typography>
  },
  {
    flex: 0.105,
    minWidth: 110,
    field: 'date',
    headerName: 'Date',
    renderCell: ({ row }: CellType) => (
      <Typography variant='body2'>
        {formatRelativeDate(row?.date)}
        &nbsp; - &nbsp;
        {row?.date ? format(new Date(row?.date), 'dd/MM/yyyy') : ''}
      </Typography>
    )
  },
  {
    flex: 0.073,
    minWidth: 80,
    field: 'type',
    headerName: 'Type',
    renderCell: ({ row }: CellType) => (
      <CustomChip
        skin='light'
        size='small'
        label={CareTypeText[row?.type]}
        color={CareTypeColor[row?.type || '']}
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
  },
  {
    flex: 0.06,
    minWidth: 70,
    field: 'priority',
    headerName: 'Care Priority',
    renderCell: ({ row }: CellType) => (
      <CustomChip
        skin='light'
        size='small'
        label={row?.priority}
        color={CarePriorityColor[row?.priority || '']}
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
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'description',
    headerName: 'Description',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.description}</Typography>
  },
  {
    flex: 0.08,
    minWidth: 100,
    field: 'curator',
    headerName: 'Curator',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.curator?.name || NotApplicable}</Typography>
  }
]

const CarePage = () => {
  const [value, setValue] = useState<string>('')
  const [formMode, setFormMode] = useState<FormMode>('create')
  const [pageSize, setPageSize] = useState<number>(10)
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([])
  const [show, setShow] = useState<boolean>(false)
  const [updateCare, setUpdateCare] = useState<any>(null)

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.care)

  useEffect(() => {
    dispatch(fetchData())
  }, [dispatch])

  const handleFilter = (val: string) => {
    setValue(val)
  }

  const handleCreate = () => {
    setUpdateCare(null)
    setFormMode('create')
    setShow(true)
  }

  const handleUpdate = (care: any) => {
    setUpdateCare(care)
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
            <IconButton size='small' component={Link} sx={{ mr: 0.5 }} href={`/cares/${row.id}`}>
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

              <DialogCareForm show={show} setShow={setShow} mode={formMode} care={updateCare} />

              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <TextField
                  size='small'
                  value={value}
                  placeholder='Search Care'
                  sx={{ mr: 4, mb: 2, maxWidth: '180px' }}
                  onChange={e => handleFilter(e.target.value)}
                />
                <Button sx={{ mb: 2 }} variant='contained' onClick={handleCreate}>
                  Create Care
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

export default CarePage
