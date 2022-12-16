import { yupResolver } from '@hookform/resolvers/yup';
import 'cleave.js/dist/addons/cleave-phone.vn';
import { ChangeEvent, ReactElement, Ref, forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import Icon from 'src/@core/components/icon';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

import { DateType } from 'src/types/forms/reactDatepickerTypes';

import * as yup from 'yup';

import { Autocomplete } from '@mui/material';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
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

import CustomChip from '../../@core/components/mui/chip';
import { CarePriorityColor, CareTypeColor, CareTypeText } from '../../@core/contanst';
import { CarePriority, CareType } from '../../@core/enums';
import apiClient from '../../@core/services/api.client';
import { FormMode, Member } from '../../@core/types';
import { AppDispatch, RootState } from '../../store';
import { fetchData } from '../../store/care';
import { fetchData as fetchMembersData } from '../../store/member';
import UploadImage from './UploadImage';
import { standardDate } from '../../@core/utils/date';

export interface FormInputs {
  id?: string;
  member?: any;
  type?: string;
  priority?: string;
  date?: Date | string;
  description?: string;
  imageUrl?: string;
}

interface CustomInputProps {
  value: DateType;
  label: string;
  error: boolean;
  onChange: (event: ChangeEvent) => void;
}

const defaultValues = {
  id: '',
  member: null,
  type: '',
  priority: '',
  date: '',
  description: '',
  imageUrl: ''
};

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }}/>;
});

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

type Props = {
  show: boolean
  setShow: any
  mode: FormMode
  care: any | null
  fetchApi?: any
}

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

const DialogEditUserInfo = ({ show, setShow, mode, care, fetchApi }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const memberStore = useSelector((state: RootState) => state.member);

  const [image, setImage] = useState<File | null>(null);

  const validationSchema = yup.object().shape({
    member: yup.object().shape({ id: yup.string(), name: yup.string() }),
    type: yup.string(),
    priority: yup.string(),
    date: yup.string(),
    description: yup.string(),
    imageUrl: yup.string()
  });

  useEffect(() => {
    if (show) {
      dispatch(fetchMembersData());
    }

    if (care && show) {
      Object.keys(defaultValues).forEach((key: any) => {
        if ((care as any)[key]) {
          if (key === 'date') {
            setValue(key, new Date((care as any)[key]));

            return;
          }

          setValue(key, (care as any)[key]);
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
    defaultValues: care || defaultValues,
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
      return apiClient.put(`/cares/${id}`, body);
    }

    return apiClient.post('/cares', body);
  };

  const getImageUrl = () => {
    if (!image) {
      return getValues('imageUrl');
    }

    const formData = new FormData();
    formData.append('file', new File([image], `care-${getValues('member')?.id || 'unknown'}-${image.name}`));
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
    data.imageUrl = await getImageUrl();

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

        toast.success(`${messageMode} care successfully!`);
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
      <Dialog fullWidth open={show} maxWidth="md" scroll="body" onClose={handleClose} TransitionComponent={Transition}>
        <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
          <IconButton size="small" onClick={handleClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
            <Icon icon="mdi:close"/>
          </IconButton>
          <Box sx={{ mb: 8, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ mb: 3, lineHeight: '2rem' }}>
              {mode === 'create' ? 'Create Care' : 'Update Care'}
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <Controller
                    name="member"
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <Autocomplete
                        openOnFocus
                        options={memberStore.data?.map((member: Member) => ({ id: member.id, name: member.name }))}
                        id="autocomplete-care-name"
                        getOptionLabel={option => option.name}
                        defaultValue={value}
                        onChange={(_, data) => onChange(data)}
                        renderInput={params => <TextField {...params} label="Member"/>}
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="care-type-select" error={Boolean(errors.type)} htmlFor="care-type-select">
                    Care Type
                  </InputLabel>
                  <Controller
                    name="type"
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label="Care Type"
                        onChange={onChange}
                        error={Boolean(errors.type)}
                        labelId="care-type-select"
                        aria-describedby="care-type"
                      >
                        {Object.values(CareType).map((type, index) => {
                          return (
                            <MenuItem value={type} key={index}>
                              <CustomChip
                                skin="light"
                                size="small"
                                label={CareTypeText[type]}
                                color={CareTypeColor[type || '']}
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
                  <InputLabel id="care-priority-select" error={Boolean(errors.type)} htmlFor="care-priority-select">
                    Care Priority
                  </InputLabel>
                  <Controller
                    name="priority"
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label="Care Priority"
                        onChange={onChange}
                        error={Boolean(errors.type)}
                        labelId="care-priority-select"
                        aria-describedby="care-priority"
                      >
                        {Object.values(CarePriority).map((priority, index) => {
                          return (
                            <MenuItem value={priority} key={index}>
                              <CustomChip
                                skin="light"
                                size="small"
                                label={priority}
                                color={CarePriorityColor[priority || '']}
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
                    name="date"
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        selected={standardDate(value)}
                        openToDate={value ? new Date(value) : new Date()}
                        showMonthDropdown
                        showYearDropdown
                        onChange={e => onChange(e)}
                        placeholderText="dd/MM/yyyy"
                        dateFormat="dd/MM/yyyy"
                        customInput={
                          <CustomInput
                            value={value}
                            onChange={onChange}
                            label="Date"
                            error={Boolean(errors.date)}
                            aria-describedby="validate-care-date"
                          />
                        }
                      />
                    )}
                  />
                </DatePickerWrapper>
              </Grid>

              <Grid item xs={12}>
                <UploadImage file={image} setFile={setImage} imageUrl={getValues('imageUrl')}/>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Controller
                    name="description"
                    control={control}
                    rules={{ required: false }}
                    render={({ field }) => (
                      <TextField
                        rows={4}
                        multiline
                        {...field}
                        label="Description"
                        error={Boolean(errors.description)}
                        aria-describedby="validate-description"
                      />
                    )}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Button size="large" type="submit" variant="contained">
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
