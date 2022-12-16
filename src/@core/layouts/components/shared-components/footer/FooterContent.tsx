
import Translations from 'src/layouts/components/Translations'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const FooterContent = () => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      <Typography sx={{ mr: 2 }}>
        {`© ${new Date().getFullYear()}`}
        &nbsp;
        <Translations text={'LEC. All Rights Reserved'} />.
      </Typography>
    </Box>
  )
}

export default FooterContent
