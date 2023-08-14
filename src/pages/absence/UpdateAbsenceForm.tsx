import { yupResolver } from '@hookform/resolvers/yup';
import { AppDispatch, RootState } from '@store';
import { fetchData } from '@store/absence';
import 'cleave.js/dist/addons/cleave-phone.vn';
import { ChangeEvent, ReactElement, Ref, forwardRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { DateType } from 'types/forms/reactDatepickerTypes';
import * as yup from 'yup';

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

import Icon from '@core/components/icon';
import CustomChip from '@core/components/mui/chip';
import { NotApplicable, AbsenceTypeText, AbsenceTypeColor } from '@core/contanst';
import { AbsenceType } from '@core/enums';
import apiClient from '@core/services/api.client';
import DatePickerWrapper from '@core/styles/libs/react-datepicker';
import { Member, Person } from '@core/types';
import { fetchData as fetchMembersData } from '../../@store/member';
import { Autocomplete } from '@mui/material';
import { convertToStartOfUtcDate, createStartOfDate, standardDate } from '../../@core/utils/date';

export interface FormInputs {
  id: string;
  type: string;
  description?: string;
  member?: Person | null;
  date?: DateType | null;
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
  description: ''
};

const CustomInput = forwardRef(({ ...props }: CustomInputProps, ref) => {
  return <TextField inputRef={ref} {...props} sx={{ width: '100%' }} autoComplete="off"/>;
});

const Transition = forwardRef(function Transition(
  props: FadeProps & { children?: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Fade ref={ref} {...props} />;
});

export const RequiredLabel = ({ label }: { label: string }) => {
  return (
    <Typography display='inline'>
      {label}&nbsp;
      <Typography display='inline' color='error.main'>
        *
      </Typography>
    </Typography>
  );
};

type Props = {
  show: boolean;
  setShow: any;
  absence: any | null;
  fetchApi?: any;
};

const UpdateAbsenceForm = ({ show, setShow, absence, fetchApi }: Props) => {
  const validationSchema = yup.object().shape({
    member: yup.object().shape({
      id: yup.string(),
      name: yup.string()
    }),
    type: yup.string(),
    description: yup.string(),
    date: yup.string()
  });
  const memberStore = useSelector((state: RootState) => state.member);


  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchMembersData());
  }, [dispatch]);

  useEffect(() => {
    if (absence) {
      Object.keys(defaultValues).forEach((key: any) => {
        if ((absence as any)[key]) {
          if (key === 'date') {
            setValue(key, new Date((absence as any)[key]));

            return;
          }

          setValue(key, (absence as any)[key]);
        }
      });
    }
  }, [absence]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<FormInputs>({
    defaultValues: absence || defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(validationSchema)
  });

  const handleCallApi = (data: FormInputs) => {
    const { id, ..._data } = data;

    return apiClient.put(`/absences/${id}`, {
      ..._data,
      date: convertToStartOfUtcDate(data.date)
    });
  };

  const onSubmit = (data: FormInputs) => {
    setShow(false);

    handleCallApi(data)
      .then(() => {
        reset(defaultValues);
        if (fetchApi && data.id) {
          dispatch(fetchApi(data.id));
        } else {
          dispatch(fetchData());
        }

        toast.success(`Update absence successfully!`);
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
              Update Absence
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
                        id="autocomplete-update-absence-name"
                        getOptionLabel={(option: Member) => option.name ?? NotApplicable}
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
                  <InputLabel id="absence-type-select" error={Boolean(errors.type)} htmlFor="absence-type-select">
                    <Typography display="inline">
                      Absence Type&nbsp;
                      <Typography display="inline" color="error.main">
                        *
                      </Typography>
                    </Typography>
                  </InputLabel>
                  <Controller
                    name="type"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <Select
                        value={value}
                        label="Absence Type"
                        onChange={onChange}
                        error={Boolean(errors.type)}
                        labelId="absence-type-select"
                        aria-describedby="absence-absence-type"
                        required={true}
                      >
                        {Object.values(AbsenceType)
                          .map((type, index) => {
                            return (
                              <MenuItem value={type} key={index}>
                                <CustomChip
                                  skin="light"
                                  size="small"
                                  label={AbsenceTypeText[type]}
                                  color={AbsenceTypeColor[type]}
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
                        openToDate={value ? new Date(value) : createStartOfDate()}
                        showMonthDropdown
                        showYearDropdown
                        onChange={e => onChange(e)}
                        placeholderText="dd/MM/yyyy"
                        dateFormat="dd/MM/yyyy"
                        customInput={
                          <CustomInput
                            value={value}
                            onChange={onChange}
                            label={<RequiredLabel label='Date' /> as any}
                            error={Boolean(errors.date)}
                            aria-describedby='validate-absent-date'
                          />
                        }
                      />
                    )}
                  />
                </DatePickerWrapper>
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

export default UpdateAbsenceForm;
