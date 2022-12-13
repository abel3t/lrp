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

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='member-edit'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
              aria-describedby='member-edit-description'
            >
              <DialogTitle id='member-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                Edit Member
              </DialogTitle>
              <DialogContent>
                <DialogContentText variant='body2' id='member-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                  Updating member details
                </DialogContentText>
                <form>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Name' defaultValue={store.member.name} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label='Username'
                        defaultValue={store.member.name}
                        InputProps={{ startAdornment: <InputAdornment position='start'>@</InputAdornment> }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth type='email' label='Email' defaultValue={store.member.email} />
                    </Grid>

                    {/*<Grid item xs={12} sm={6}>*/}
                    {/*  <FormControl fullWidth>*/}
                    {/*    <InputLabel id='user-view-status-label'>Status</InputLabel>*/}
                    {/*    <Select*/}
                    {/*      label='Status'*/}
                    {/*      defaultValue={store.member.status}*/}
                    {/*      id='user-view-status'*/}
                    {/*      labelId='user-view-status-label'*/}
                    {/*    >*/}
                    {/*      <MenuItem value='pending'>Pending</MenuItem>*/}
                    {/*      <MenuItem value='active'>Active</MenuItem>*/}
                    {/*      <MenuItem value='inactive'>Inactive</MenuItem>*/}
                    {/*    </Select>*/}
                    {/*  </FormControl>*/}
                    {/*</Grid>*/}
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Phone' defaultValue={store.member.phone} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='member-discipleshipProcess-label'>Discipleship Progress</InputLabel>
                        <Select
                          defaultValue={store.member.discipleshipProcess || ''}
                          label='Discipleship Progress'
                          id='member-discipleshipProcess'
                          labelId='member-discipleshipProcess-label'
                        >
                          {Object.values(DiscipleshipProcess).map((discipleshipProcess, index) => {
                            return (
                              <MenuItem value={discipleshipProcess} key={index}>
                                {discipleshipProcess}
                              </MenuItem>
                            )
                          })}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-country-label'>Country</InputLabel>
                        <Select
                          label='Country'
                          defaultValue='USA'
                          id='user-view-country'
                          labelId='user-view-country-label'
                        >
                          <MenuItem value='USA'>USA</MenuItem>
                          <MenuItem value='UK'>UK</MenuItem>
                          <MenuItem value='Spain'>Spain</MenuItem>
                          <MenuItem value='Russia'>Russia</MenuItem>
                          <MenuItem value='France'>France</MenuItem>
                          <MenuItem value='Germany'>Germany</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        label='Use as a billing address?'
                        control={<Switch defaultChecked />}
                        sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
                      />
                    </Grid>
                  </Grid>
                </form>
              </DialogContent>
              <DialogActions sx={{ justifyContent: 'center' }}>
                <Button variant='contained' sx={{ mr: 1 }} onClick={handleEditClose}>
                  Submit
                </Button>
                <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                  Cancel
                </Button>
              </DialogActions>
            </Dialog>
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default MemberViewLeft
