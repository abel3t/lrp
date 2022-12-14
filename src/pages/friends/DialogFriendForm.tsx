// ** React Imports
import { forwardRef, MouseEvent, useState, ChangeEvent, ReactElement, Ref, useEffect } from 'react'

// ** MUI Imports
import FormHelperText from '@mui/material/FormHelperText'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Fade, { FadeProps } from '@mui/material/Fade'
import DialogContent from '@mui/material/DialogContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import toast from 'react-hot-toast'
import DatePicker from 'react-datepicker'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'

import Cleave from 'cleave.js/react'
import 'cleave.js/dist/addons/cleave-phone.vn'

// ** Types
import { DateType } from 'src/types/forms/reactDatepickerTypes'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import apiClient from '../../@core/services/api.client'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../store'
import { fetchData } from '../../store/friend'
import { FormMode } from '../../@core/types'
import { FriendType } from '../../@core/enums'
import CleaveWrapper from '../../@core/styles/libs/react-cleave'
import { FriendTypeText } from '../../@core/contanst'

export interface FormInputs {
  id: string
  birthday: DateType | null
  email: string
  phone: string
  name: string
  type: string
  address: string
  hometown: string
  gender: string
  description: string
}

interface CustomInputProps {
  value: DateType
  label: string
  error: boolean
  onChange: (event: ChangeEvent) => void
}

const defaultValues = {
  id: '',
  birthday: null,
  email: '',
  name: '',
  phone: '',
  address: '',
  type: '',
  hometown: '',
  gender: '',
  description: ''
}

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} />
})

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />
})

type Props = {
  show: boolean
  setShow: any
  mode: FormMode
  friend: any | null
  fetchApi?: any
}

const getUtcDate = (date?: DateType) => {
  let d = new Date()

  if (date) {
    d = new Date(date)
  }

  const day = d.getDate()
  const month = d.getMonth()
  const year = d.getFullYear()

  return new Date(Date.UTC(year, month, day, 0, 0, 0))
}

const DialogEditUserInfo = ({ show, setShow, mode, friend, fetchApi }: Props) => {
  const validationSchema = yup.object().shape({
    birthday: yup.string(),
    email: yup.string().email(),
    name: yup.string().required('Name is required'),
    address: yup.string(),
    hometown: yup.string(),
    gender: yup.string(),
    description: yup.string(),
    type: yup.string()
  })

  useEffect(() => {
    if (friend) {
      Object.keys(defaultValues).forEach((key: any) => {
        if ((friend as any)[key]) {
          if (key === 'birthday') {
            setValue(key, new Date((friend as any)[key]))
            return
          }

          setValue(key, (friend as any)[key])
        }
      })
    }
  }, [friend])

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<FormInputs>({
    defaultValues: friend || defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(validationSchema)
  })

  const dispatch = useDispatch<AppDispatch>()

  const handleCallApi = (mode: FormMode, data: FormInputs) => {
    const { id, ..._data } = data
    const body: any = {
      ..._data,
      birthday: getUtcDate(data.birthday).toISOString()
    }

    if (mode === 'update') {
      return apiClient.put(`/friends/${id}`, body)
    }

    return apiClient.post('/friends', body)
  }

  const onSubmit = (data: FormInputs) => {
    setShow(false)

    handleCallApi(mode, data)
      .then(() => {
        reset(defaultValues)
        if (fetchApi && data.id) {
          dispatch(fetchApi(data.id))
        } else {
          dispatch(fetchData())
        }

        const messageMode = mode === 'update' ? 'Update' : 'Create'

        toast.success(`${messageMode} friend successfully!`)
      })
      .catch(error => {
        reset(defaultValues)
        toast.error(error.message)
      })
  }

  const handleClose = () => {
    setShow(false)

    reset(defaultValues)
  }

  return (
    <Card>
      <Dialog fullWidth open={show} maxWidth='md' scroll='body' onClose={handleClose} TransitionComponent={Transition}>
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              {mode === 'create' ? 'Create Friend' : 'Update Friend'}
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='name'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Name'
                        onChange={onChange}
                        placeholder='Name'
                        error={Boolean(errors.name)}
                        aria-describedby='validate-name'
                      />
                    )}
                  />
                  {errors.name && (
                    <FormHelperText sx={{ color: 'error.main' }} id='validate-name'>
                      Name is required
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='friend-type-select' error={Boolean(errors.type)} htmlFor='friend-type-select'>
                    Relationship Process
                  </InputLabel>
                  <Controller
                    name='type'
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Relationship Process'
                        onChange={onChange}
                        error={Boolean(errors.type)}
                        labelId='friend-type-select'
                        aria-describedby='friend-friend-type'
                      >
                        {Object.values(FriendType).map((type, index) => {
                          return (
                            <MenuItem value={type} key={index}>
                              {FriendTypeText[type]}
                            </MenuItem>
                          )
                        })}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <CleaveWrapper>
                  <FormControl fullWidth>
                    <Controller
                      name='phone'
                      control={control}
                      rules={{ required: false }}
                      render={({ field: { value, onChange } }) => (
                        <Cleave
                          id='validate-number'
                          value={value}
                          onChange={onChange}
                          placeholder='Phone'
                          aria-describedby='validate-phone'
                          options={{ phone: true, phoneRegionCode: 'VN' }}
                        />
                      )}
                    />
                  </FormControl>
                </CleaveWrapper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='email'
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        type='email'
                        value={value}
                        label='Email'
                        onChange={onChange}
                        error={Boolean(errors.email)}
                        placeholder='Email'
                        aria-describedby='validate-email'
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <DatePickerWrapper>
                  <Controller
                    name='birthday'
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        selected={value}
                        openToDate={value || new Date(new Date().getFullYear() - 20, 0, 1)}
                        showMonthDropdown
                        showYearDropdown
                        onChange={e => onChange(e)}
                        placeholderText='dd/MM/yyyy'
                        dateFormat='dd/MM/yyyy'
                        customInput={
                          <CustomInput
                            value={value}
                            onChange={onChange}
                            label='Date of Birth'
                            error={Boolean(errors.birthday)}
                            aria-describedby='validate-birthday'
                          />
                        }
                      />
                    )}
                  />
                </DatePickerWrapper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='address'
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Address'
                        onChange={onChange}
                        placeholder='address'
                        error={Boolean(errors.email)}
                        aria-describedby='validate-address'
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='hometown'
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label='Hometown'
                        onChange={onChange}
                        placeholder='Hometown'
                        error={Boolean(errors.hometown)}
                        aria-describedby='validate-homwtown'
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id='validation-basic-select'
                    error={Boolean(errors.gender)}
                    htmlFor='validation-basic-select'
                  >
                    Gender
                  </InputLabel>
                  <Controller
                    name='gender'
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Country'
                        onChange={onChange}
                        error={Boolean(errors.gender)}
                        labelId='validation-basic-select'
                        aria-describedby='validate-gender'
                      >
                        <MenuItem value='Male'>Male</MenuItem>
                        <MenuItem value='Female'>Female</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name='description'
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <TextField
                        rows={4}
                        multiline
                        {...field}
                        label='Description'
                        error={Boolean(errors.description)}
                        aria-describedby='validate-description'
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button size='large' type='submit' variant='contained'>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default DialogEditUserInfo
