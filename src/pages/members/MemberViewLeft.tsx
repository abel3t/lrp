// ** React Imports
import { useEffect, useState } from 'react'
import Link from 'next/link'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { fetchData, fetchMemberData } from '../../store/member'
import { useRouter } from 'next/router'
import { DiscipleshipProcessColor, NotApplicable } from '../../@core/contanst'
import { ColorsType } from '../../@core/interface'
import { DiscipleshipProcess } from '../../@core/enums'
import apiClient from '../../@core/services/api.client'
import toast from 'react-hot-toast'
import DialogMemberForm from './DialogMemberForm'

const statusColors: ColorsType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const MemberViewLeft = () => {
  const [openEdit, setOpenEdit] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.member)

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  const handleSubmit = () => {
    setOpenEdit(false)
    // return apiClient.put(`/members/${id}`, body)
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
      dispatch(fetchMemberData(router.query?.id as string))
    }
  }, [router.isReady, dispatch])

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
    )
  } else {
    return null
  }
}

export default MemberViewLeft
