import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Translations from 'layouts/components/Translations';

const FooterContent = () => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2 }}>
        {`© ${new Date().getFullYear()}`}
        &nbsp;
        <Translations text={'LEC. All Rights Reserved'} />.
      </Typography>
    </Box>
  );
};

export default FooterContent;
