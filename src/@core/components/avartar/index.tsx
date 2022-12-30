import Button from '@mui/material/Button';

const AvatarComponent = () => {
  return (
    <Button color='primary' aria-label='upload picture' component='label'>
      <input hidden accept='image/*' type='file' />
      Upload
    </Button>
  );
};

export default AvatarComponent;
