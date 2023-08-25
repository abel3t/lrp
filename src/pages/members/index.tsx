import { AppDispatch, RootState } from '@store';
import { fetchCurators } from '@store/account';
import { deleteMember, fetchData } from '@store/member';
import { useContext, useEffect, useState } from 'react';
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
import { styled } from '@mui/material/styles';
import { DataGrid, GridRowId } from '@mui/x-data-grid';

import ConfirmDialog from '@core/components/confirm-dialog';
import Icon from '@core/components/icon';
import CustomChip from '@core/components/mui/chip';
import { DiscipleshipProcessColor, NotApplicable } from '@core/contanst';
import DatePickerWrapper from '@core/styles/libs/react-datepicker';
import { Account, FormMode, Member } from '@core/types';

import DialogMemberForm from './DialogMemberForm';
import toast from 'react-hot-toast';
import { AbilityContext } from '../../layouts/components/acl/Can';

interface CellType {
  row: Member;
}

// ** Styled component for the link in the dataTable
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
        return <Typography variant='body2'>{NotApplicable}</Typography>;
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
      );
    }
  },
  {
    flex: 0.15,
    minWidth: 125,
    field: 'curator',
    headerName: 'Curator',
    renderCell: ({ row }: CellType) => <Typography variant='body2'>{row?.curator?.name || NotApplicable}</Typography>
  }
];

const MemberPage = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [formMode, setFormMode] = useState<FormMode>('create');
  const [selectedRows, setSelectedRows] = useState<GridRowId[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [updateMember, setUpdateMember] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [timer, setTimer] = useState<any>(null);
  const [curator, setCurator] = useState<Account | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state.member);
  const accountStore = useSelector((state: RootState) => state.account);

  const ability = useContext(AbilityContext);

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchCurators());
  }, [dispatch]);

  const handleChangeCurator = (curator: Account | null) => {
    setCurator(curator);
    dispatch(fetchData({ search, curatorId: curator?.id }));
  };

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

  const handleCreate = () => {
    setUpdateMember(null);
    setFormMode('create');
    setShow(true);
  };

  const handleUpdate = (member: any) => {
    setUpdateMember(member);
    setFormMode('update');
    setShow(true);
  };

  const handleDelete = async () => {
    for (const memberId of selectedRows) {
      await dispatch(deleteMember(memberId as string));
    }

    toast.success(`Delete members successfully!`);
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
  ];

  return (
    <DatePickerWrapper>
      <Head>
        <title>Members - Lighthouse Resource Planning</title>
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

                <ConfirmDialog title='Confirmation' text='Are you sure to delete these members?' action={handleDelete}>
                  <MenuItem value='Delete'>Delete</MenuItem>
                </ConfirmDialog>

                <MenuItem value='Edit'>Edit</MenuItem>
              </Select>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                <Autocomplete
                  openOnFocus
                  sx={{ mr: 4, mb: 2, width: '350px' }}
                  options={accountStore.curators?.map((curator: Account) => ({ id: curator.id, name: curator.name }))}
                  id='autocomplete-care-name'
                  getOptionLabel={(option: Account) => option.name ?? NotApplicable}
                  defaultValue={curator}
                  onChange={(_, curator: Account | null) => handleChangeCurator(curator)}
                  renderInput={params => <TextField {...params} label='Curator' />}
                />

                <TextField
                  size='small'
                  value={search}
                  placeholder='Search Member'
                  sx={{ mr: 4, mb: 2, maxWidth: '180px' }}
                  onChange={e => handleSearch(e.target.value)}
                />

                {
                  ability?.can('create', 'member') &&

                  <Button sx={{ mb: 2 }} variant='contained' onClick={handleCreate}>
                    Create Member
                  </Button>
                }
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

          <DialogMemberForm show={show} setShow={setShow} mode={formMode} member={updateMember} />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  );
};

MemberPage.acl = {
  action: 'read',
  subject: 'members'
};

export default MemberPage;
