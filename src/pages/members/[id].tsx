import Grid from '@mui/material/Grid';

import MemberViewLeft from './MemberViewLeft';
import MemberViewRight from './MemberViewRight';

const MemberView = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <MemberViewLeft />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <MemberViewRight tab={'overview'} />
      </Grid>
    </Grid>
  );
};

MemberView.acl = {
  action: 'read',
  subject: 'member-detail',
}

export default MemberView;
