import { yupResolver } from '@hookform/resolvers/yup';
import { AppDispatch, RootState } from '@store';
import { fetchData } from '@store/disciple';
import { fetchData as fetchPeopleData } from '@store/person';
import 'cleave.js/dist/addons/cleave-phone.vn';
import { ChangeEvent, ReactElement, Ref, forwardRef, useEffect, useState } from 'react';
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
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Fade, { FadeProps } from '@mui/material/Fade';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Icon from '@core/components/icon';
import CustomChip from '@core/components/mui/chip';
import {
  DisciplePriorityColor,
  DiscipleTypeColor,
  DiscipleTypeText,
  NotApplicable, PersonalTypeColor, PersonalTypeText
} from '@core/contanst';
import { DisciplePriority, DiscipleType, PersonalType } from '@core/enums';
import apiClient from '@core/services/api.client';
import DatePickerWrapper from '@core/styles/libs/react-datepicker';
import { FormMode, Member, Person } from '@core/types';
import { standardDate } from '@core/utils/date';

import UploadImage from './UploadImage';

export interface FormInputs {
  id?: string;
  person?: any;
  type?: string;
  priority?: string;
  date?: Date | string;
  description?: string;
  image?: string;
}

interface CustomInputProps {
  value: DateType;
  label: string | ReactElement;
  error: boolean;
  onChange: (event: ChangeEvent) => void;
}

const defaultValues = {
  id: '',
  person: null,
  type: '',
  priority: '',
  date: '',
  description: '',
  image: ''
};

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} autoComplete='off' />;
});

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
  disciple: any | null;
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

const DialogDiscipleForm = ({ show, setShow, mode, disciple, fetchApi }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentChosenPerson, setCurrentChosenPerson] = useState<any>({});
  const dispatch = useDispatch<AppDispatch>();
  const personStore = useSelector((state: RootState) => state.person);

  const [image, setImage] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    person: yup.object().shape({ id: yup.string(), name: yup.string() }),
    type: yup.string(),
    priority: yup.string(),
    date: yup.string(),
    description: yup.string(),
    image: yup.string()
  });

  useEffect(() => {
    if (show) {
      dispatch(fetchPeopleData());
    }

    if (disciple && show) {
      Object.keys(defaultValues).forEach((key: any) => {
        if ((disciple as any)[key]) {
          if (key === 'date') {
            setValue(key, new Date((disciple as any)[key]));

            return;
          }

          setValue(key, (disciple as any)[key]);
        }
      });
    }
  }, [show]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset
  } = useForm<FormInputs>({
    defaultValues: disciple || defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(validationSchema)
  });

  const handleCallApi = (mode: FormMode, data: FormInputs) => {
    const { id, ..._data } = data;
    const body: any = {
      ..._data,
      date: getUtcDate(data.date).toISOString()
    };

    if (mode === 'update') {
      return apiClient.put(`/disciples/${id}`, body);
    }

    return apiClient.post('/disciples', body);
  };

  const getImageUrl = () => {
    if (!image) {
      return getValues('image');
    }

    const formData = new FormData();
    formData.append('file', new File([image], `disciple-${getValues('person')?.id || 'unknown'}-${image.name}`));
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    };

    return apiClient
      .post('uploadFile', formData, config)
      .then(res => res.data?.link)
      .catch(error => {
        console.log(error);
        toast.error('Can not upload image');
      });
  };

  const onSubmit = async (data: FormInputs) => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    data.image = await getImageUrl();

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
        setIsSubmitting(false);
        toast.success(`${messageMode} disciple successfully!`);
        setImage(null);
      })
      .catch(error => {
        reset(defaultValues);
        toast.error(error.message);
        setIsSubmitting(false);
        setImage(null);
      });
  };

  const handleClose = () => {
    setShow(false);
    setCurrentChosenPerson({});

    reset(defaultValues);
  };

  const RequiredLabel = ({ label }: any) => {
    return (
      <Typography display='inline'>
        {label}&nbsp;
        <Typography display='inline' color='error.main'>
          *
        </Typography>
      </Typography>
    );
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
              {
                mode === 'create' ? 'Create Discipleship Process' : 'Update Discipleship Process'
              }

              &nbsp; for &nbsp;

              <CustomChip
                skin='light'
                size='medium'
                label={currentChosenPerson?.type ? PersonalTypeText[currentChosenPerson?.type as PersonalType] : NotApplicable}
                color={PersonalTypeColor[currentChosenPerson?.type || '']}
                sx={{
                  height: 20,
                  fontWeight: 600,
                  borderRadius: '5px',
                  fontSize: '0.875rem',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { mt: -0.25 }
                }}
              />
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name='person'
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <Autocomplete
                        openOnFocus
                        options={personStore.data?.map((member: Member) => ({ id: member.id, name: member.name }))}
                        id='autocomplete-disciple-name'
                        getOptionLabel={option => option.name}
                        defaultValue={value}
                        onChange={(_, data) => {
                          setCurrentChosenPerson(
                            personStore.data?.find((person: Person) => person.id === data?.id)
                          );
                          onChange(data);
                        }}
                        renderInput={params => <TextField {...params} label={<RequiredLabel label='Person' />} />}
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id='disciple-type-select' error={Boolean(errors.type)} htmlFor='disciple-type-select'>
                    {<RequiredLabel label='Disciple Type' />}
                  </InputLabel>
                  <Controller
                    name='type'
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label='Disciple Type'
                        onChange={onChange}
                        error={Boolean(errors.type)}
                        labelId='disciple-type-select'
                        aria-describedby='disciple-type'
                      >
                        {Object.values(DiscipleType)
                          .map((type, index) => {
                          return (
                            <MenuItem value={type} key={index}>
                              <CustomChip
                                skin='light'
                                size='small'
                                label={DiscipleTypeText[type]}
                                color={DiscipleTypeColor[type || '']}
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
                  <InputLabel id='disciple-priority-select' error={Boolean(errors.type)} htmlFor='disciple-priority-select'>
                    {<RequiredLabel label='Disciple Priority' />}
                  </InputLabel>
                  <Controller
                    name='priority'
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label={<RequiredLabel label='Disciple Priority' />}
                        onChange={onChange}
                        error={Boolean(errors.type)}
                        labelId='disciple-priority-select'
                        aria-describedby='disciple-priority'
                      >
                        {Object.values(DisciplePriority).map((priority, index) => {
                          return (
                            <MenuItem value={priority} key={index}>
                              <CustomChip
                                skin='light'
                                size='small'
                                label={priority}
                                color={DisciplePriorityColor[priority || '']}
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
                <DatePickerWrapper>
                  <Controller
                    name='date'
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        selected={value ? standardDate(value) : null}
                        openToDate={value ? new Date(value) : new Date()}
                        showMonthDropdown
                        showYearDropdown
                        onChange={e => onChange(e)}
                        placeholderText='dd/MM/yyyy'
                        dateFormat='dd/MM/yyyy'
                        customInput={
                          <CustomInput
                            value={value}
                            onChange={onChange}
                            label={<RequiredLabel label='Date' />}
                            error={Boolean(errors.date)}
                            aria-describedby='validate-disciple-date'
                          />
                        }
                      />
                    )}
                  />
                </DatePickerWrapper>
              </Grid>

              <Grid item xs={12}>
                <UploadImage file={image} setFile={setImage} image={getValues('image')} />
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
                  {isSubmitting ? <CircularProgress disableShrink size={26} sx={{ color: '#fff' }} /> : 'Submit'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default DialogDiscipleForm;
