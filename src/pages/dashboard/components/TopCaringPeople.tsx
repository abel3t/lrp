import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CustomChip from 'src/@core/components/mui/chip';
import OptionsMenu from 'src/@core/components/option-menu';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

import { NotApplicable } from '../../../@core/contanst';
import { AppDispatch, RootState } from '../../../store';
import { fetchTopCaringPeople } from '../../../store/dashboard';
import { CareTitle } from '../../../@core/enums';
import { ColorsType } from '../../../@core/interface';

const CareTitleText = {
  [CareTitle.Excellent]: 'Excellent',
  [CareTitle.Good]: 'Good',
  [CareTitle.Normal]: 'Normal',
  [CareTitle.NotGood]: 'Not Good'
};

const CareTitleColor: ColorsType = {
  [CareTitle.Excellent]: 'primary',
  [CareTitle.Good]: 'success',
  [CareTitle.Normal]: 'warning',
  [CareTitle.NotGood]: 'error'
};

const TopCaringPeople = () => {
  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(fetchTopCaringPeople());
  }, [dispatch]);

  return (
    <Card>
      <CardHeader
        title="Top Caring People"
        subheader="Activity Care"
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
              <TableCell align="left">Role</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="center">Care Times</TableCell>
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
                  <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }} color="primary">
                    #{index + 1}
                  </Typography>
                </TableCell>

                {/*<TableCell>*/}
                {/*  <Avatar alt={row.imgAlt} src={row.imgSrc} variant='rounded' sx={{ width: 34, height: 34 }} />*/}
                {/*</TableCell>*/}

                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }} color="primary">
                    {row.role}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap', color: 'text.primary' }}>
                    {row.name || NotApplicable}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap', color: 'text.primary' }}>
                    {
                      !!row.title &&

                      <CustomChip
                        skin="light"
                        size="small"
                        label={CareTitleText[row.title as CareTitle]}
                        color={CareTitleColor[row.title as CareTitle]}
                        sx={{ height: 20, fontWeight: 500, '& .MuiChip-label': { px: 1.625, lineHeight: 1.539 } }}
                      />
                    }
                  </Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography variant="body2" sx={{ fontWeight: 600, whiteSpace: 'nowrap', color: 'text.primary' }}>
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
  );
};

export default TopCaringPeople;
