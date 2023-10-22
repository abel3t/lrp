import { yupResolver } from '@hookform/resolvers/yup';
import { AppDispatch, RootState } from '@store';
import { fetchData } from '@store/member';
import 'cleave.js/dist/addons/cleave-phone.vn';
import Cleave from 'cleave.js/react';
import { ChangeEvent, ReactElement, Ref, forwardRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { DateType } from 'types/forms/reactDatepickerTypes';
import * as yup from 'yup';

import { Autocomplete } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Fade, { FadeProps } from '@mui/material/Fade';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Icon from '@core/components/icon';
import CustomChip from '@core/components/mui/chip';
import { DiscipleshipProcessColor, NotApplicable, PersonalTypeColor, PersonalTypeText } from '@core/contanst';
import { DiscipleshipProcess, PersonalType } from '@core/enums';
import apiClient from '@core/services/api.client';
import CleaveWrapper from '@core/styles/libs/react-cleave';
import DatePickerWrapper from '@core/styles/libs/react-datepicker';
import { Account, FormMode, Member } from '@core/types';
import { createStartOfDate, standardDate } from '@core/utils/date';

export interface FormInputs {
  id: string;
  curator?: Account | null;
  friend?: Member | null;
  birthday?: DateType | null;
  firstComeToLEC?: DateType | null,
  believeInJesusDay?: DateType | null,
  baptismalDay?: DateType | null,
  memberDay?: DateType | null,
  type?: string;
  email?: string;
  name: string;
  phone?: string;
  discipleshipProcess?: string;
  address?: string;
  hometown?: string;
  gender?: string;
  description?: string;
}

interface CustomInputProps {
  value: DateType;
  label: string;
  error: boolean;
  onChange: (event: ChangeEvent) => void;
}

const defaultValues = {
  id: '',
  curator: null,
  friend: null,
  type: '',
  birthday: '',
  firstComeToLEC: '',
  believeInJesusDay: '',
  baptismalDay: '',
  memberDay: '',
  email: '',
  name: '',
  phone: '',
  address: '',
  discipleshipProcess: '',
  hometown: '',
  gender: '',
  description: ''
};

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => (
  <TextField inputRef={ref} {...props} sx={{ width: '100%' }} autoComplete='off' />
));

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

type Props = {
  show: boolean;
  setShow: any;
  mode: FormMode;
  member: any | null;
  fetchApi?: any;
};

const getUtcDate = (date?: DateType) => {
  let d = new Date();

  if (date) {
    d = new Date(date);
  }

  const day = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();

  return new Date(Date.UTC(year, month, day, 0, 0, 0));
};

const DialogEditUserInfo = ({ show, setShow, mode, member, fetchApi }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const store = useSelector((state: RootState) => state.account);
  const memberStore = useSelector((state: RootState) => state.member);

  const validationSchema = yup.object().shape({
    birthday: yup.string(),
    firstComeToLEC: yup.string(),
    believeInJesusDay: yup.string(),
    baptismalDay: yup.string(),
    memberDay: yup.string(),
    email: yup.string().email(),
    name: yup.string().required('Name is required'),
    address: yup.string(),
    hometown: yup.string(),
    gender: yup.string(),
    description: yup.string(),
    discipleshipProcess: yup.string()
  });

  useEffect(() => {
    if (member && show) {
      Object.keys(defaultValues).forEach((key: any) => {
        if ((member as any)[key]) {
          if (['birthday', 'firstComeToLEC', 'believeInJesusDay', 'baptismalDay', 'memberDay'].includes(key)) {
            setValue(key, new Date((member as any)[key]));

            return;
          }

          setValue(key, (member as any)[key]);
        }
      });
    }
  }, [show, member]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<FormInputs>({
    defaultValues: member || defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(validationSchema)
  });

  const handleCallApi = (mode: FormMode, data: FormInputs) => {
    const { id, ..._data } = data;
    const body: any = {
      ..._data,
      birthday: data.birthday ? getUtcDate(data.birthday).toISOString() : undefined,
      firstComeToLEC: data.firstComeToLEC ? getUtcDate(data.firstComeToLEC).toISOString() : undefined,
      believeInJesusDay: data.believeInJesusDay ? getUtcDate(data.believeInJesusDay).toISOString() : undefined,
      baptismalDay: data.baptismalDay ? getUtcDate(data.baptismalDay).toISOString() : undefined,
      memberDay: data.memberDay ? getUtcDate(data.memberDay).toISOString() : undefined
    };

    if (mode === 'update') {
      return apiClient.put(`/members/${id}`, body);
    }

    return apiClient.post('/members', body);
  };

  const onSubmit = (data: FormInputs) => {
    setShow(false);

    handleCallApi(mode, data)
      .then(() => {
        reset(defaultValues);
        if (fetchApi && data.id) {
          dispatch(fetchApi(data.id));
        } else {
          dispatch(fetchData());
        }

        const messageMode = mode === 'update' ? 'Update' : 'Create';

        toast.success(`${messageMode} member successfully!`);
      })
      .catch(error => {
        reset(defaultValues);
        toast.error(error.message);
      });
  };

  const handleClose = () => {
    setShow(false);

    reset(defaultValues);
  };

  return (
    <Card>
      <Dialog fullWidth open={show} maxWidth='md' scroll='body' onClose={handleClose} TransitionComponent={Transition}>
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size='small' onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon='mdi:close' />
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant='h5' sx={{ mb: 3, lineHeight: '2rem' }}>
              {mode === 'create' ? 'Create Member' : 'Update Member'}
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit, errors => console.log(errors))}>
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
                        label={
                          <Typography display='inline'>
                            Name&nbsp;
                            <Typography display='inline' color='error.main'>
                              *
                            </Typography>
                          </Typography>
                        }
                        onChange={onChange}
                        placeholder='Name'
                        error={Boolean(errors.name)}
                        aria-describedby='validate-name'
                        autoComplete='off'
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
              {
                mode === 'update' &&
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='friend-type-select' error={Boolean(errors.type)} htmlFor='member-type-select'>
                      <Typography display='inline'>
                        Type&nbsp;
                        <Typography display='inline' color='error.main'>
                          *
                        </Typography>
                      </Typography>
                    </InputLabel>
                    <Controller
                      name='type'
                      control={control}
                      rules={{ required: true }}
                      render={({ field: { value, onChange } }) => (
                        <Select
                          value={value}
                          label='Type'
                          onChange={onChange}
                          error={Boolean(errors.type)}
                          labelId='friend-type-select'
                          aria-describedby='friend-friend-type'
                          required={true}
                        >
                          {Object.values(PersonalType).map((type, index) => {
                            return (
                              <MenuItem value={type} key={index}>
                                <CustomChip
                                  skin='light'
                                  size='small'
                                  label={PersonalTypeText[type]}
                                  color={PersonalTypeColor[type]}
                                  sx={{
                                    height: 20,
                                    fontWeight: 600,
                                    borderRadius: '5px',
                                    fontSize: '0.875rem',
                                    textTransform: 'capitalize',
                                    '& .MuiChip-label': { mt: -0.25 }
                                  }}
                                />
                              </MenuItem>
                            );
                          })}
                        </Select>
                      )}
                    />
                  </FormControl>
                </Grid>

              }

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel
                    id='discipleship-process-select'
                    error={Boolean(errors.discipleshipProcess)}
                    htmlFor='discipleship-process-select'
                  >
                    Discipleship Process
                  </InputLabel>
                  <Controller
                    name='discipleshipProcess'
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Discipleship Process'
                        onChange={onChange}
                        error={Boolean(errors.discipleshipProcess)}
                        labelId='discipleship-process-select'
                        aria-describedby='member-discipleship-process'
                      >
                        {Object.values(DiscipleshipProcess).map((discipleshipProcess, index) => {
                          return (
                            <MenuItem value={discipleshipProcess} key={index}>
                              <CustomChip
                                skin='light'
                                size='small'
                                label={discipleshipProcess}
                                color={DiscipleshipProcessColor[discipleshipProcess || '']}
                                sx={{
                                  height: 20,
                                  fontWeight: 600,
                                  borderRadius: '5px',
                                  fontSize: '0.875rem',
                                  textTransform: 'capitalize',
                                  '& .MuiChip-label': { mt: -0.25 }
                                }}
                              />
                            </MenuItem>
                          );
                        })}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='curator'
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <Autocomplete
                        openOnFocus
                        options={store.curators?.map((curator: Account) => ({ id: curator.id, name: curator.name }))}
                        id='autocomplete-curator-name'
                        getOptionLabel={(option: Account) => option.name ?? NotApplicable}
                        defaultValue={value}
                        onChange={(_, data) => onChange(data)}
                        renderInput={params => <TextField {...params} label='Curator' />}
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}

                    sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='friend'
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <Autocomplete
                        openOnFocus
                        options={memberStore.data?.map((member: Member) => ({ id: member.id, name: member.name }))}
                        id='autocomplete-member-name'
                        getOptionLabel={(option: Member) => option.name ?? NotApplicable}
                        defaultValue={value}
                        onChange={(_, data) => onChange(data)}
                        renderInput={params => <TextField {...params} label='Introduced By' />}
                      />
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
                          autoComplete='off'
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
                        autoComplete='off'
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
                        required={false}
                        selected={standardDate(value)}
                        openToDate={value ? new Date(value) : new Date(new Date().getFullYear() - 20, 0, 1)}
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
                <DatePickerWrapper>
                  <Controller
                    name='firstComeToLEC'
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        required={false}
                        selected={standardDate(value)}
                        openToDate={value ? new Date(value) : createStartOfDate()}
                        showMonthDropdown
                        showYearDropdown
                        onChange={e => onChange(e)}
                        placeholderText='dd/MM/yyyy'
                        dateFormat='dd/MM/yyyy'
                        customInput={
                          <CustomInput
                            value={value}
                            onChange={onChange}
                            label='First come to LEC'
                            error={Boolean(errors.birthday)}
                            aria-describedby='validate-firstComeToLEC'
                          />
                        }
                      />
                    )}
                  />
                </DatePickerWrapper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePickerWrapper>
                  <Controller
                    name='believeInJesusDay'
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        required={false}
                        selected={standardDate(value)}
                        openToDate={value ? new Date(value) : createStartOfDate()}
                        showMonthDropdown
                        showYearDropdown
                        onChange={e => onChange(e)}
                        placeholderText='dd/MM/yyyy'
                        dateFormat='dd/MM/yyyy'
                        customInput={
                          <CustomInput
                            value={value}
                            onChange={onChange}
                            label='Believe in Jesus day'
                            error={Boolean(errors.birthday)}
                            aria-describedby='validate-believeInJesusDay'
                          />
                        }
                      />
                    )}
                  />
                </DatePickerWrapper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePickerWrapper>
                  <Controller
                    name='baptismalDay'
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        required={false}
                        selected={standardDate(value)}
                        openToDate={value ? new Date(value) : createStartOfDate()}
                        showMonthDropdown
                        showYearDropdown
                        onChange={e => onChange(e)}
                        placeholderText='dd/MM/yyyy'
                        dateFormat='dd/MM/yyyy'
                        customInput={
                          <CustomInput
                            value={value}
                            onChange={onChange}
                            label='Baptismal day'
                            error={Boolean(errors.birthday)}
                            aria-describedby='validate-baptismalDay'
                          />
                        }
                      />
                    )}
                  />
                </DatePickerWrapper>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePickerWrapper>
                  <Controller
                    name='memberDay'
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        required={false}
                        selected={standardDate(value)}
                        openToDate={value ? new Date(value) : createStartOfDate()}
                        showMonthDropdown
                        showYearDropdown
                        onChange={e => onChange(e)}
                        placeholderText='dd/MM/yyyy'
                        dateFormat='dd/MM/yyyy'
                        customInput={
                          <CustomInput
                            value={value}
                            onChange={onChange}
                            label='Member Date'
                            error={Boolean(errors.birthday)}
                            aria-describedby='validate-memberDay'
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
                        autoComplete='off'
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
  );
};

export default DialogEditUserInfo;
