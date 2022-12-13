// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

interface ConnectedAccountsType {
  title: string
  logo: string
  checked: boolean
  subtitle: string
}

const connectedAccountsArr: ConnectedAccountsType[] = [
  {
    checked: true,
    title: 'Google',
    logo: '/images/logos/google.png',
    subtitle: 'Calendar and Contacts'
  },
  {
    checked: false,
    title: 'Slack',
    logo: '/images/logos/slack.png',
    subtitle: 'Communications'
  },
  {
    checked: true,
    title: 'Github',
    logo: '/images/logos/github.png',
    subtitle: 'Manage your Git repositories'
  },
  {
    checked: true,
    title: 'Mailchimp',
    subtitle: 'Email marketing service',
    logo: '/images/logos/mail-chimp.png'
  },
  {
    title: 'Asana',
    checked: false,
    subtitle: 'Communication',
    logo: '/images/logos/asana.png'
  }
]

const MemberNetwork = () => {
  return (
    <Grid container spacing={6}>
      {/* Connected Accounts Cards */}
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Connected Accounts' />
          <CardContent>
            <Typography sx={{ mb: 4, color: 'text.secondary' }}>
              Display content from your connected accounts on your site
            </Typography>

            {connectedAccountsArr.map(account => {
              return (
                <Box
                  key={account.title}
                  sx={{
                    gap: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    '&:not(:last-of-type)': { mb: 4 }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ mr: 4, display: 'flex', justifyContent: 'center' }}>
                      <img src={account.logo} alt={account.title} height='30' width='30' />
                    </Box>
                    <div>
                      <Typography sx={{ fontWeight: 500 }}>{account.title}</Typography>
                      <Typography variant='body2' sx={{ color: 'text.disabled' }}>
                        {account.subtitle}
                      </Typography>
                    </div>
                  </Box>
                  <Switch defaultChecked={account.checked} />
                </Box>
              )
            })}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default MemberNetwork
