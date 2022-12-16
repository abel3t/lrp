import { ChangeEvent, MouseEvent, SyntheticEvent, useState } from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Icon from '@core/components/icon';

interface State {
  newPassword: string;
  showNewPassword: boolean;
  confirmNewPassword: string;
  showConfirmNewPassword: boolean;
}

const MemberMinistry = () => {
  const [defaultValues, setDefaultValues] = useState<any>({ mobile: '+1(968) 819-2547' });
  const [mobileNumber, setMobileNumber] = useState<string>(defaultValues.mobile);
  const [openEditMobileNumber, setOpenEditMobileNumber] = useState<boolean>(false);
  const [values, setValues] = useState<State>({
    newPassword: '',
    showNewPassword: false,
    confirmNewPassword: '',
    showConfirmNewPassword: false
  });

  const handleNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowNewPassword = () => {
    setValues({ ...values, showNewPassword: !values.showNewPassword });
  };
  const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // Handle Confirm Password
  const handleConfirmNewPasswordChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowConfirmNewPassword = () => {
    setValues({ ...values, showConfirmNewPassword: !values.showConfirmNewPassword });
  };
  const handleMouseDownConfirmNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // Handle edit mobile number dialog
  const handleEditMobileNumberClickOpen = () => setOpenEditMobileNumber(true);
  const handleEditMobileNumberClose = () => setOpenEditMobileNumber(false);

  // Handle button click inside the dialog
  const handleCancelClick = () => {
    setMobileNumber(defaultValues.mobile);
    handleEditMobileNumberClose();
  };
  const handleSubmitClick = () => {
    setDefaultValues({ ...defaultValues, mobile: mobileNumber });
    handleEditMobileNumberClose();
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Change Password' />
          <CardContent>
            <Alert icon={false} severity='warning' sx={{ mb: 6 }}>
              <AlertTitle sx={{ fontWeight: 600, mb: theme => `${theme.spacing(1)} !important` }}>
                Ensure that these requirements are met
              </AlertTitle>
              Minimum 8 characters long, uppercase & symbol
            </Alert>

            <form onSubmit={e => e.preventDefault()}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='user-view-security-new-password'>New Password</InputLabel>
                    <OutlinedInput
                      label='New Password'
                      value={values.newPassword}
                      id='user-view-security-new-password'
                      onChange={handleNewPasswordChange('newPassword')}
                      type={values.showNewPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            onClick={handleClickShowNewPassword}
                            aria-label='toggle password visibility'
                            onMouseDown={handleMouseDownNewPassword}
                          >
                            <Icon icon={values.showNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel htmlFor='user-view-security-confirm-new-password'>Confirm New Password</InputLabel>
                    <OutlinedInput
                      label='Confirm New Password'
                      value={values.confirmNewPassword}
                      id='user-view-security-confirm-new-password'
                      type={values.showConfirmNewPassword ? 'text' : 'password'}
                      onChange={handleConfirmNewPasswordChange('confirmNewPassword')}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            edge='end'
                            aria-label='toggle password visibility'
                            onClick={handleClickShowConfirmNewPassword}
                            onMouseDown={handleMouseDownConfirmNewPassword}
                          >
                            <Icon icon={values.showConfirmNewPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button type='submit' variant='contained'>
                    Change Password
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardHeader
            title='Two-step verification'
            titleTypographyProps={{ sx: { mb: 1 } }}
            subheader='Keep your account secure with authentication step.'
          />
          <CardContent>
            <Typography sx={{ fontWeight: 500, fontSize: '0.875rem' }}>SMS</Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant='body2'>{mobileNumber}</Typography>
              <div>
                <IconButton
                  aria-label='edit'
                  sx={{ color: 'text.secondary' }}
                  onClick={handleEditMobileNumberClickOpen}
                >
                  <Icon icon='mdi:square-edit-outline' fontSize='1.25rem' />
                </IconButton>
                <IconButton aria-label='delete' sx={{ color: 'text.secondary' }}>
                  <Icon icon='mdi:delete-outline' fontSize='1.25rem' />
                </IconButton>
              </div>
            </Box>

            <Divider sx={{ mt: '0 !important', mb: theme => `${theme.spacing(4)} !important` }} />

            <Typography variant='body2'>
              Two-factor authentication adds an additional layer of security to your account by requiring more than just
              a password to log in.{' '}
              <Link href='/src/pages' onClick={(e: SyntheticEvent) => e.preventDefault()}>
                Learn more
              </Link>
              .
            </Typography>
          </CardContent>

          <Dialog
            open={openEditMobileNumber}
            onClose={handleCancelClick}
            aria-labelledby='user-view-security-edit-mobile-number'
            sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
            aria-describedby='user-view-security-edit-mobile-number-description'
          >
            <DialogTitle
              id='user-view-security-edit-mobile-number'
              sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}
            >
              Enable One Time Password
            </DialogTitle>

            <DialogContent>
              <Typography variant='h6'>Verify Your Mobile Number for SMS</Typography>
              <Typography variant='body2' sx={{ mt: 2, mb: 5 }}>
                Enter your mobile phone number with country code and we will send you a verification code.
              </Typography>
              <form onSubmit={e => e.preventDefault()}>
                <TextField
                  autoFocus
                  fullWidth
                  value={mobileNumber}
                  label='Mobile number with country code'
                  onChange={e => setMobileNumber(e.target.value)}
                />
                <Box sx={{ mt: 6.5, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button type='reset' color='secondary' variant='outlined' onClick={handleCancelClick}>
                    Cancel
                  </Button>
                  <Button type='submit' sx={{ ml: 3 }} variant='contained' onClick={handleSubmitClick}>
                    Send
                  </Button>
                </Box>
              </form>
            </DialogContent>
          </Dialog>
        </Card>
      </Grid>
    </Grid>
  );
};

export default MemberMinistry;
