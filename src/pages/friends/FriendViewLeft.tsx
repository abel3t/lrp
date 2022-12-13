// ** React Imports
import { useEffect, useState } from 'react'
import Link from 'next/link'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { fetchFriendData } from '../../store/friend'
import { useRouter } from 'next/router'
import { NotApplicable } from '../../@core/contanst'
import { ColorsType } from '../../@core/interface'
import DialogFriendForm from './DialogFriendForm';

const statusColors: ColorsType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const FriendViewLeft = () => {
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.friend)

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  const handleSubmit = () => {
    setOpenEdit(false)
    // return apiClient.put(`/friends/${id}`, body)
    //   .then(() => {
    //     reset(defaultValues);
    //
    //     dispatch(
    //       fetchData()
    //     )
    //
    //     toast.success(`${messageMode} update successfully!`)
    //   })
    //   .catch((error) => {
    //     reset(defaultValues)
    //     toast.error(error.message)
    //   })
  }

  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      dispatch(fetchFriendData(router.query?.id as string))
    }
  }, [router.isReady, dispatch])

  if (store.friend.id) {
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
                {getInitials(store.friend.name || '')}
              </CustomAvatar>

              <Typography variant='h6' sx={{ mb: 2 }}>
                {store.friend.name}
              </Typography>
            </CardContent>

            <CardContent>
              <Divider sx={{ mt: theme => `${theme.spacing(4)} !important` }} />
              <Box sx={{ pt: 2, pb: 1 }}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Gender:
                  </Typography>

                  <Typography variant='body2'>{store.friend.gender || NotApplicable}</Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Phone:
                  </Typography>
                  {!store.friend.phone && <Typography variant='body2'>{NotApplicable}</Typography>}

                  {!!store.friend.phone && (
                    <Typography variant='body2' component={Link} color='primary' href={`tel:${store.friend.phone}`}>
                      {store.friend.phone}
                    </Typography>
                  )}
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Email:
                  </Typography>
                  {!store.friend.email && <Typography variant='body2'>{NotApplicable}</Typography>}

                  {!!store.friend.email && (
                    <Typography variant='body2' component={Link} color='primary' href={`email:${store.friend.email}`}>
                      {store.friend.email}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Address:
                  </Typography>

                  <Typography variant='body2'>{store.friend.address || NotApplicable}</Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Hometown:
                  </Typography>
                  <Typography variant='body2'>{store.friend.hometown || NotApplicable}</Typography>
                </Box>

                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Description:
                  </Typography>

                  <Typography variant='body2'>{store.friend.description || NotApplicable}</Typography>
                </Box>
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained' sx={{ mr: 2 }} onClick={handleEditClickOpen}>
                Edit
              </Button>
            </CardActions>

            <DialogFriendForm show={openEdit} setShow={setOpenEdit} mode='update' friend={store.friend} fetchApi={fetchFriendData} />
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default FriendViewLeft
