import { useTranslation } from 'react-i18next';

import Icon from '@core/components/icon';
import OptionsMenu from '@core/components/option-menu';
import { Settings } from '@core/context/settingsContext';

interface Props {
  settings: Settings;
  saveSettings: (values: Settings) => void;
}

const LanguageDropdown = ({ settings, saveSettings }: Props) => {
  // ** Hook
  const { i18n } = useTranslation();

  // ** Vars
  const { layout } = settings;

  const handleLangItemClick = (lang: 'en' | 'vi') => {
    i18n.changeLanguage(lang);
  };

  return (
    <OptionsMenu
      icon={<Icon icon='mdi:translate' />}
      menuProps={{ sx: { '& .MuiMenu-paper': { mt: 4, minWidth: 130 } } }}
      iconButtonProps={{ color: 'inherit', sx: { ...(layout === 'vertical' ? { mr: 0.75 } : { mx: 0.75 }) } }}
      options={[
        {
          text: 'English',
          menuItemProps: {
            sx: { py: 2 },
            selected: i18n.language === 'en',
            onClick: () => {
              handleLangItemClick('en');
              saveSettings({ ...settings, direction: 'ltr' });
            }
          }
        },
        {
          text: 'Vietnamese',
          menuItemProps: {
            sx: { py: 2 },
            selected: i18n.language === 'vi',
            onClick: () => {
              handleLangItemClick('vi');
              saveSettings({ ...settings, direction: 'ltr' });
            }
          }
        }
      ]}
    />
  );
};

export default LanguageDropdown;
