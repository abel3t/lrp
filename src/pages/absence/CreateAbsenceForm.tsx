import { yupResolver } from '@hookform/resolvers/yup';
import { AppDispatch, RootState } from '@store';
import { fetchData } from '@store/absence';
import 'cleave.js/dist/addons/cleave-phone.vn';
import { ChangeEvent, ReactElement, Ref, forwardRef, useState, useEffect } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { DateType } from 'types/forms/reactDatepickerTypes';
import * as yup from 'yup';
import ButtonGroup from '@mui/material/ButtonGroup'

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
import { AbsenceTypeColor, AbsenceTypeText, NotApplicable } from '@core/contanst';
import { AbsenceType } from '@core/enums';
import apiClient from '@core/services/api.client';
import { Member, Person } from '@core/types';
import DatePickerWrapper from '../../@core/styles/libs/react-datepicker';
import DatePicker from 'react-datepicker';
import { convertToStartOfUtcDate, createStartOfDate } from '../../@core/utils/date';
import { Autocomplete } from '@mui/material';
import { fetchData as fetchMembersData } from '@store/member';

interface AbsenceInput {
  member?: Person | null;
  type: string;
  description: string;
}

export interface FormInputs {
  id: string;
  absences?: AbsenceInput[];
  date?: DateType | null;
}

interface CustomInputProps {
  value: DateType;
  label: string;
  error: boolean;
  onChange: (event: ChangeEvent) => void;
}

const defaultValues = {
  absences: [],
  date: ''
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

type Props = {
  show: boolean;
  setShow: any;
  fetchApi?: any;
};

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

const CreateAbsenceForm = ({ show, setShow, fetchApi }: Props) => {
  const validationSchema = yup.object().shape({
    date: yup.date(),
    absences: yup.array().of(yup.object().shape({
      member: yup.object().shape({
        id: yup.string(),
        name: yup.string()
      }),
      type: yup.string(),
      description: yup.string()
    }))
  });

  const memberStore = useSelector((state: RootState) => state.member);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues
  } = useForm<FormInputs>({
    defaultValues: defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(validationSchema)
  });

  const [selectedMember, setSelectedMember] = useState<Record<string, any>>({ });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'absences'
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMembersData());
  }, [dispatch]);

  const handleCallApi = (data: any) => {
    return apiClient.post('/absences', data);
  };

  const onSubmit = async (data: FormInputs) => {
    const absences = data.absences?.map((absence) => {
      return {
        member: {
          id: absence.member?.id,
          name: absence.member?.name
        },
        type: absence.type,
        date: convertToStartOfUtcDate(data.date),
        description: absence.description
      }
    });

    const $createPromises = absences?.map((absence) => {
      return handleCallApi(absence)
    });


    await Promise.all($createPromises || [])
      .then(() => {
        reset(defaultValues);
        if (fetchApi && data.id) {
          dispatch(fetchApi(data.id));
        } else {
          dispatch(fetchData());
        }

        handleClose();

        toast.success(`Create absence successfully!`);
      })
      .catch(error => {
        reset(defaultValues);
        toast.error(error.message);
      });
  };

  const handleClose = () => {
    setShow(false);
    setSelectedMember({});

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
              Create Absence
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>


            <Grid container spacing={5}>

              <Grid item xs={12} sm={6} style={{marginBottom: '70px'}}>
                <ButtonGroup variant="outlined">
                  <Button color="info" onClick={() => append({
                    member: null,
                    type: '',
                    description: ''
                  })}>Add</Button>
                </ButtonGroup>
              </Grid  >

              <Grid item xs={12} sm={6}>
                <DatePickerWrapper>
                  <Controller
                    name="date"
                    control={control}
                    rules={{ required: false }}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        selected={value ? new Date(value) : null}
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
                            label="Date of Absence"
                            error={Boolean(errors.date)}
                            aria-describedby="validate-date-of-absence"
                          />
                        }
                      />
                    )}
                  />
                </DatePickerWrapper>
              </Grid>

              {
                fields.map((item, index) => (
                  <Grid item container spacing={1} key={item.id}>
                    <Grid item xs={4} sm={4}>
                      <FormControl fullWidth>
                        <Controller
                          name={`absences.${index}.member`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <Autocomplete
                              openOnFocus
                              options={
                              memberStore.data
                                ?.filter((member: Member) => {
                                  if ((value as Person)?.id === member.id) {
                                    return true;
                                  }
                                  const isChosen = selectedMember[member?.id || ''];

                                  return !isChosen;
                                })
                                ?.map((member: Member) => ({
                                id: member.id,
                                name: member.name
                              }))}
                              id={`autocomplete-member-absence-name-${index}`}
                              getOptionLabel={(option: Member) => option.name ?? NotApplicable}
                              defaultValue={value}
                              onChange={(_, data) => {
                                if (data) {
                                  setSelectedMember({
                                    ...selectedMember,
                                    [`${data.id}`]: true
                                  })
                                }

                                if (!data && value) {
                                  setSelectedMember({
                                    ...selectedMember,
                                    [`${(value as Person)?.id}`]: undefined
                                  })
                                }

                                onChange(data);
                              }}
                              renderInput={params => <TextField {...params} label={<RequiredLabel label='Member' />} />}
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>

                    <Grid item xs={4} sm={3}>
                      <FormControl fullWidth>
                        <InputLabel id="absence-type-select" error={Boolean(errors.absences?.[index]?.type)}
                                    htmlFor="absence-type-select">
                          <Typography display="inline">
                            Absence Type&nbsp;
                            <Typography display="inline" color="error.main">
                              *
                            </Typography>
                          </Typography>
                        </InputLabel>
                        <Controller
                          name={`absences.${index}.type`}
                          control={control}
                          rules={{ required: true }}
                          render={({ field: { value, onChange } }) => (
                            <Select
                              value={value}
                              label="Absence Type"
                              onChange={onChange}
                              error={Boolean(Boolean(errors.absences?.[index]?.type))}
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
                                        }}/>
                                    </MenuItem>
                                  );
                                })}
                            </Select>
                          )}/>
                      </FormControl>
                    </Grid>

                    <Grid item xs={4} sm={4}>

                      <FormControl fullWidth>
                        <Controller
                          name={`absences.${index}.description`}
                          control={control}
                          rules={{ required: false }}
                          render={({ field }) => (
                            <TextField
                              {...field}
                              id="outlined-basic"
                              label="Description"
                              multiline
                              error={Boolean(Boolean(errors.absences?.[index]?.description))}
                              aria-describedby="validate-description"
                            />
                          )}/>
                      </FormControl>

                    </Grid>
                    <Grid item xs={4} sm={1}>
                      <div style={{height: '100%', marginLeft: '5px', display: 'flex', alignItems: 'center'}}>
                        <Icon icon="mdi:trash" onClick={() => {
                          remove(index);

                          console.log(index, item, getValues('absences'))
                        }} style={{ cursor: 'pointer' }}/>
                      </div>
                    </Grid>
                  </Grid>
                ))
              }

              <Grid item xs={12} style={{paddingTop: '50px'}}>
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

export default CreateAbsenceForm;
