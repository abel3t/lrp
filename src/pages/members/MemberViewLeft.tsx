import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import CustomAvatar from '@core/components/mui/avatar';
import CustomChip from '@core/components/mui/chip';
import { DiscipleshipProcessColor, NotApplicable } from '@core/contanst';
import { getInitials } from '@core/utils/get-initials';

import { AppDispatch, RootState } from '../../store';
import { fetchMemberData } from '../../store/member';
import DialogMemberForm from './DialogMemberForm';

const MemberViewLeft = () => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state.member);

  const handleEditClickOpen = () => setOpenEdit(true);
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchMemberData(router.query?.id as string));
    }
  }, [router.isReady, dispatch]);

  if (store.member.id) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 5, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <CustomAvatar
                skin='light'
                variant='rounded'
                color={'warning'}
                sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
              >
                {getInitials(store.member.name || '')}
              </CustomAvatar>

              <Typography variant='h6' sx={{ mb: 2 }}>
                {store.member.name}
              </Typography>

              {!store.member.discipleshipProcess && NotApplicable}

              {!!store.member.discipleshipProcess && (
                <CustomChip
                  skin='light'
                  size='small'
                  label={store.member.discipleshipProcess}
                  color={DiscipleshipProcessColor[store.member.discipleshipProcess || '']}
                  sx={{
                    height: 20,
                    fontWeight: 600,
                    borderRadius: '5px',
                    fontSize: '0.875rem',
                    textTransform: 'capitalize',
                    '& .MuiChip-label': { mt: -0.25 }
                  }}
                />
              )}
            </CardContent>

            <CardContent>
              <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
              <Box sx={{ pt: 2, pb: 1 }}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Gender:
                  </Typography>

                  <Typography variant='body2'>{store.member.gender || NotApplicable}</Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Phone:
                  </Typography>
                  {!store.member.phone && <Typography variant='body2'>{NotApplicable}</Typography>}

                  {!!store.member.phone && (
                    <Typography variant='body2' component={Link} color='primary' href={`tel:${store.member.phone}`}>
                      {store.member.phone}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Email:
                  </Typography>
                  {!store.member.email && <Typography variant='body2'>{NotApplicable}</Typography>}

                  {!!store.member.email && (
                    <Typography variant='body2' component={Link} color='primary' href={`email:${store.member.email}`}>
                      {store.member.email}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Address:
                  </Typography>

                  <Typography variant='body2'>{store.member.address || NotApplicable}</Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Hometown:
                  </Typography>
                  <Typography variant='body2'>{store.member.hometown || NotApplicable}</Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Description:
                  </Typography>

                  <Typography variant='body2'>{store.member.description || NotApplicable}</Typography>
                </Box>
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                Edit
              </Button>
            </CardActions>

            <DialogMemberForm
              show={openEdit}
              setShow={setOpenEdit}
              mode='update'
              member={store.member}
              fetchApi={fetchMemberData}
            />
          </Card>
        </Grid>
      </Grid>
    );
  } else {
    return null;
  }
};

export default MemberViewLeft;
