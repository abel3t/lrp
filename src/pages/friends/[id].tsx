import Grid from '@mui/material/Grid';

import FriendViewLeft from './FriendViewLeft';
import FriendViewRight from './FriendViewRight';

const UserView = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <FriendViewLeft />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <FriendViewRight tab={'discipleship_process'} />
      </Grid>
    </Grid>
  );
};

export default UserView;
