import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import CustomChip from '@core/components/mui/chip';
import { CarePriorityColor, CareTypeColor, NotApplicable } from '@core/contanst';

import { AppDispatch, RootState } from '../../store';
import { fetchCareData } from '../../store/care';

const CareView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const store = useSelector((state: RootState) => state.care);

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchCareData(router?.query?.id as string));
    }
  }, [router.isReady, dispatch]);

  return (
    <Grid container spacing={8}>
      <Grid item xs={15} md={6} lg={5}>
        <Card>
          <CardHeader title='Care Details' />
          <CardContent
            sx={{ pt: theme => `${theme.spacing(2.5)} !important` }}
            style={{ maxHeight: 350, overflow: 'auto' }}
          >
            <Box sx={{ display: 'flex', mb: 2.7 }}>
              <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                Member:
              </Typography>

              <Typography variant='body2'>{store.care.member?.name || NotApplicable}</Typography>
            </Box>

            <Box sx={{ display: 'flex', mb: 2.7 }}>
              <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                Care Type:
              </Typography>

              <CustomChip
                skin='light'
                size='small'
                label={store.care?.type}
                color={CareTypeColor[store.care?.type || '']}
                sx={{
                  height: 20,
                  fontWeight: 600,
                  borderRadius: '5px',
                  fontSize: '0.875rem',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { mt: -0.25 }
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', mb: 2.7 }}>
              <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                Priority:
              </Typography>

              <CustomChip
                skin='light'
                size='small'
                label={store.care?.priority}
                color={CarePriorityColor[store.care?.priority || '']}
                sx={{
                  height: 20,
                  fontWeight: 600,
                  borderRadius: '5px',
                  fontSize: '0.875rem',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { mt: -0.25 }
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', mb: 2.7 }}>
              <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                Curator:
              </Typography>

              <Typography variant='body2'>{store.care.curator?.name || NotApplicable}</Typography>
            </Box>

            <Box sx={{ display: 'flex', mb: 2.7 }}>
              <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                Description:
              </Typography>

              <Typography variant='body2'>{store.care.description || NotApplicable}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={9} md={4} lg={4} style={{ width: '400px', height: '800px' }}>
        <img src={store.care?.imageUrl} alt='N/A' width='400px' height='auto' />
      </Grid>
    </Grid>
  );
};

export default CareView;
