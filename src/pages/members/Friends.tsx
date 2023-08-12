import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  NotApplicable, PersonalTypeColor
} from '../../@core/contanst';
import Link from 'next/link';
import CustomChip from '../../@core/components/mui/chip';
import { DataGrid } from '@mui/x-data-grid';
import { Person } from '../../@core/types';
import { fetchPersonFriendsData } from '../../@store/member';

const Friends = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [pageSize, setPageSize] = useState<number>(10);
  const store = useSelector((state: RootState) => state.member);

  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchPersonFriendsData(router.query?.id as string));
    }
  }, [router.isReady, dispatch, router.query?.id]);

  interface CellType {
    row: Person;
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
      renderCell: ({ row }: CellType) => <StyledLink href={`/friends/${row?.id}`}>#{row.index}</StyledLink>
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
      field: 'type',
      headerName: 'Friend Type',
      renderCell: ({ row }: CellType) => {
        if (!row.type) {
          return <Typography variant='body2'>{NotApplicable}</Typography>;
        }

        return (
          <CustomChip
            skin='light'
            size='small'
            label={row.type}
            color={PersonalTypeColor[row.type]}
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

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <DataGrid
          autoHeight
          pagination
          rows={store.friends || []}
          columns={defaultColumns}
          checkboxSelection
          disableSelectionOnClick
          pageSize={Number(pageSize)}
          rowsPerPageOptions={[10, 25, 50]}
          onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        />
      </Grid>
    </Grid>
  );
};

export default Friends;
