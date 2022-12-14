import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import Icon from '@core/components/icon';
import { Settings } from '@core/context/settingsContext';
import LanguageDropdown from '@core/layouts/components/shared-components/LanguageDropdown';
import ModeToggler from '@core/layouts/components/shared-components/ModeToggler';
import NotificationDropdown, {
  NotificationsType
} from '@core/layouts/components/shared-components/NotificationDropdown';
import ShortcutsDropdown, { ShortcutsType } from '@core/layouts/components/shared-components/ShortcutsDropdown';
import UserDropdown from '@core/layouts/components/shared-components/UserDropdown';

interface Props {
  hidden: boolean;
  settings: Settings;
  toggleNavVisibility: () => void;
  saveSettings: (values: Settings) => void;
}

const notifications: NotificationsType[] = [
  {
    meta: 'Today',
    avatarAlt: 'Flora',
    title: 'Congratulation Flora! 🎉',
    avatarImg: '/images/avatars/4.png',
    subtitle: 'Won the monthly best seller badge'
  },
  {
    meta: 'Yesterday',
    avatarColor: 'primary',
    subtitle: '5 hours ago',
    avatarText: 'Robert Austin',
    title: 'New user registered.'
  }
];

const shortcuts: ShortcutsType[] = [
  {
    title: 'Invoice App',
    url: '/apps/invoice/list',
    subtitle: 'Manage Accounts',
    icon: 'mdi:receipt-text-outline'
  },
  {
    title: 'Users',
    url: '/apps/user/list',
    subtitle: 'Manage Users',
    icon: 'mdi:account-outline'
  }
];

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props;

  return (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton color='inherit' sx={{ ml: -2.75 }} onClick={toggleNavVisibility}>
            <Icon icon='mdi:menu' />
          </IconButton>
        ) : null}
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <ShortcutsDropdown settings={settings} shortcuts={shortcuts} />
        <LanguageDropdown settings={settings} saveSettings={saveSettings} />
        <NotificationDropdown settings={settings} notifications={notifications} />
        <UserDropdown />
      </Box>
    </Box>
  );
};

export default AppBarContent;
