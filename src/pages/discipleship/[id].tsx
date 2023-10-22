import { AppDispatch, RootState } from '@store';
import { fetchDiscipleData } from '@store/disciple';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import CustomChip from '@core/components/mui/chip';
import { DisciplePriorityColor, DiscipleTypeColor, DiscipleTypeText, NotApplicable } from '@core/contanst';

const DiscipleView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const store = useSelector((state: RootState) => state.disciple);
  const [personalLink, setPersonalLink] = useState('friends');

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchDiscipleData(router?.query?.id as string));

      const link = store.disciple?.person?.type === 'Member' ? 'members': 'friends';

      setPersonalLink(link);

    }
  }, [router.isReady, dispatch, router?.query?.id]);

  return (
    <Grid container spacing={8}>
      <Grid item xs={12} md={8} lg={7}>
        <Card>
          <CardHeader title='Disciple Details' />
          <CardContent
            sx={{ pt: theme => `${theme.spacing(2.5)} !important` }}
            style={{ maxHeight: 350, overflow: 'auto' }}
          >
            <Box sx={{ display: 'flex', mb: 2.7 }}>
              <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                Member:
              </Typography>

              <Link href={`/${personalLink}/${store.disciple.person?.id}`} style={{ cursor: 'pointer', textDecoration: 'none' }}>
                <Typography variant='body2'>{store.disciple.person?.name || NotApplicable}</Typography>
              </Link>


            </Box>

            <Box sx={{ display: 'flex', mb: 2.7 }}>
              <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                Disciple Type:
              </Typography>

              <CustomChip
                skin='light'
                size='small'
                label={DiscipleTypeText[store.disciple?.type]}
                color={DiscipleTypeColor[store.disciple?.type || '']}
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
                label={store.disciple?.priority}
                color={DisciplePriorityColor[store.disciple?.priority || '']}
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

              <Typography variant='body2'>{store.disciple.curator?.name || NotApplicable}</Typography>
            </Box>

            <Box sx={{ display: 'flex', mb: 2.7 }}>
              <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                Description:
              </Typography>

              <Typography variant='body2' sx={{whiteSpace: 'pre'}}>{store.disciple.description || NotApplicable}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={4} lg={5} style={{ width: '400px', height: '800px' }}>
        <img src={store.disciple?.image} alt='N/A' width='400px' height='auto' />
      </Grid>
    </Grid>
  );
};

DiscipleView.acl = {
  action: 'read',
  subject: 'disciple-detail'
}

export default DiscipleView;
