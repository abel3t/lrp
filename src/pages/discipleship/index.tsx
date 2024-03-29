import { AppDispatch, RootState } from '@store';
import { fetchCurators } from '@store/account';
import { fetchData } from '@store/disciple';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Head from 'next/head';
import Link from 'next/link';

import { Autocomplete } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { DataGrid, GridRowId } from '@mui/x-data-grid';

import Icon from '@core/components/icon';
import CustomChip from '@core/components/mui/chip';
import { DisciplePriorityColor, DiscipleTypeColor, DiscipleTypeText, NotApplicable } from '@core/contanst';
import DatePickerWrapper from '@core/styles/libs/react-datepicker';
import { Account, Disciple, FormMode } from '@core/types';
import { formatRelativeDate } from '@core/utils/date';

import DialogDiscipleForm from './DialogDiscipleForm';

interface CellType {
  row: Disciple;
}

const defaultColumns = [
  {
    flex: 0.115,
    minWidth: 120,
    field: 'name',
    headerName: 'Name',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.person?.name || NotApplicable}</Typography>
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
        label={DiscipleTypeText[row?.type || '']}
        color={DiscipleTypeColor[row?.type || '']}
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
    headerName: 'Disciple Priority',
    renderCell: ({ row }: CellType) => (
      <CustomChip
        skin='light'
        size='small'
        label={row?.priority}
        color={DisciplePriorityColor[row?.priority || '']}
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
    flex: 0.18,
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
];

const DisciplePage = () => {
  const [formMode, setFormMode] = useState<FormMode>('create');
  const [pageSize, setPageSize] = useState<number>(10);
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [updateDisciple, setUpdateDisciple] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [timer, setTimer] = useState<any>(null);
  const [curator, setCurator] = useState<Account | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state.disciple);
  const accountStore = useSelector((state: RootState) => state.account);

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchCurators());
  }, [dispatch]);

  const handleSearch = (search: string) => {
    setSearch(search);
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(() => {
      dispatch(fetchData({ search, curatorId: curator?.id }));
    }, 500);

    setTimer(newTimer);
  };

  const handleChangeCurator = (curator: Account | null) => {
    setCurator(curator);
    dispatch(fetchData({ search, curatorId: curator?.id }));
  };

  const handleCreate = () => {
    setUpdateDisciple(null);
    setFormMode('create');
    setShow(true);
  };

  const handleUpdate = (disciple: any) => {
    setUpdateDisciple(disciple);
    setFormMode('update');
    setShow(true);
  };

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
            <IconButton size='small' component={Link} sx={{ mr: 0.5 }} href={`/discipleship/${row.id}`}>
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
  ];

  return (
    <DatePickerWrapper>
      <Head>
        <title>Disciples - Lighthouse Resource Planning</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

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

              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Autocomplete
                  openOnFocus
                  sx={{ mr: 4, mb: 2, width: '350px' }}
                  options={accountStore.curators?.map((curator: Account) => ({ id: curator.id, name: curator.name }))}
                  id='autocomplete-disciple-name'
                  getOptionLabel={(option: Account) => option.name ?? NotApplicable}
                  defaultValue={curator}
                  onChange={(_, curator: Account | null) => handleChangeCurator(curator)}
                  renderInput={params => <TextField {...params} label='Curator' />}
                />

                <TextField
                  size='small'
                  value={search}
                  placeholder='Search Disciple'
                  sx={{ mr: 4, mb: 2, maxWidth: '180px' }}
                  onChange={e => handleSearch(e.target.value)}
                />
                <Button sx={{ mb: 2 }} variant='contained' onClick={handleCreate}>
                  Create Disciple
                </Button>
              </Box>
            </Box>

            <DialogDiscipleForm show={show} setShow={setShow} mode={formMode} disciple={updateDisciple} />

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
  );
};

DisciplePage.acl = {
  action: 'read',
  subject: 'discipleship'
};

export default DisciplePage;
