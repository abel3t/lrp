import { AppDispatch, RootState } from '@store';
import { deleteAbsence, fetchData } from '@store/absence';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Head from 'next/head';
import Link from 'next/link';

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
import { styled } from '@mui/material/styles';
import { DataGrid, GridRowId } from '@mui/x-data-grid';

import Icon from '@core/components/icon';
import CustomChip from '@core/components/mui/chip';
import { NotApplicable, AbsenceTypeColor } from '@core/contanst';
import DatePickerWrapper from '@core/styles/libs/react-datepicker';
import { FormMode, Absence } from '@core/types';

import DialogAbsenceForm from './UpdateAbsenceForm';
import CreateAbsenceForm from './CreateAbsenceForm';

interface CellType {
  row: Absence;
}

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.primary.main
}));

const defaultColumns = [
  {
    flex: 0.03,
    minWidth: 30,
    field: 'index',
    headerName: 'ID',
    renderCell: ({ row }: CellType) => <StyledLink href={`/absences/${row?.id}`}>#{row.index}</StyledLink>
  },
  {
    flex: 0.15,
    minWidth: 125,
    field: 'name',
    headerName: 'Name',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.member?.name}</Typography>
  },
  {
    flex: 0.09,
    minWidth: 90,
    field: 'description',
    headerName: 'Description',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.description || NotApplicable}</Typography>
  },
  {
    flex: 0.08,
    minWidth: 80,
    field: 'type',
    headerName: 'Absence Type',
    renderCell: ({ row }: CellType) => {
      if (!row.type) {
        return <Typography variant='body2'>{NotApplicable}</Typography>;
      }

      return (
        <CustomChip
          skin='light'
          size='small'
          label={row.type}
          color={AbsenceTypeColor[row.type]}
          sx={{
            height: 20,
            fontWeight: 600,
            borderRadius: '5px',
            fontSize: '0.875rem',
            textTransform: 'capitalize',
            '& .MuiChip-label': { mt: -0.25 }
          }}
        />
      );
    }
  }
];

const AbsencePage = () => {
  const [value, setValue] = useState<string>('');
  const [formMode, setFormMode] = useState<FormMode>('create');
  const [pageSize, setPageSize] = useState<number>(10);
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [updateAbsence, setUpdateAbsence] = useState<any>(null);

  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state.absence);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleFilter = (val: string) => {
    setValue(val);
  };

  const handleCreate = () => {
    setUpdateAbsence(null);
    setFormMode('create');
    setShow(true);
  };

  const handleUpdate = (absence: any) => {
    setUpdateAbsence(absence);
    setFormMode('update');
    setShow(true);
  };

  const handleDeleteAbsences = async () => {
    for (const memberId of selectedRows) {
      await dispatch(deleteAbsence(memberId as string));
    }

    dispatch(fetchData());
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
          <Tooltip title='Edit'>
            <IconButton size='small' sx={{ mr: 0.5 }} onClick={() => handleUpdate(row)}>
              <Icon icon='mdi:pencil-outline' />
            </IconButton>
          </Tooltip>
        </Box>
      )
    }
  ];

  return (
    <DatePickerWrapper>
      <Head>
        <title>Absences - Lighthouse Resource Planning</title>
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
                <MenuItem value='Delete' onClick={handleDeleteAbsences}>
                  Delete
                </MenuItem>
                <MenuItem value='Edit'>Edit</MenuItem>
              </Select>

              {
                formMode === 'create'
                ? <CreateAbsenceForm show={show} setShow={setShow} />
                 : <DialogAbsenceForm show={show} setShow={setShow} absence={updateAbsence} />
              }

              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <TextField
                  size='small'
                  value={value}
                  placeholder='Search Absence'
                  sx={{ mr: 4, mb: 2, maxWidth: '180px' }}
                  onChange={e => handleFilter(e.target.value)}
                />
                <Button sx={{ mb: 2 }} variant='contained' onClick={handleCreate}>
                  Create Absence
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
  );
};

export default AbsencePage;
