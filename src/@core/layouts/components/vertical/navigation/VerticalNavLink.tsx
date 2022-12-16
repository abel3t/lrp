import { ElementType } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Box, { BoxProps } from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import ListItem from '@mui/material/ListItem';
import ListItemButton, { ListItemButtonProps } from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';

import { Settings } from '@core/context/settingsContext';
import { NavGroup, NavLink } from '@core/layouts/types';
import { handleURLQueries } from '@core/layouts/utils';

import themeConfig from 'configs/themeConfig';

import Translations from 'layouts/components/Translations';
import UserIcon from 'layouts/components/UserIcon';
import CanViewNavLink from 'layouts/components/acl/CanViewNavLink';

interface Props {
  parent?: boolean;
  item: NavLink;
  navHover?: boolean;
  settings: Settings;
  navVisible?: boolean;
  collapsedNavWidth: number;
  navigationBorderWidth: number;
  toggleNavVisibility: () => void;
  isSubToSub?: NavGroup | undefined;
}

const MenuNavLink = styled(ListItemButton)<
  ListItemButtonProps & { component?: ElementType; href: string; target?: '_blank' | undefined }
>(({ theme }) => ({
  width: '100%',
  borderRadius: 8,
  transition: 'padding-left .25s ease-in-out',
  '&.active': {
    '&, &:hover': {
      backgroundColor: theme.palette.primary.light,
      '&.Mui-focusVisible': {
        backgroundColor: theme.palette.primary.main
      }
    },
    '& .MuiTypography-root': {
      fontWeight: 500,
      color: `${theme.palette.common.white} !important`
    },
    '& .MuiListItemIcon-root': {
      color: `${theme.palette.common.white} !important`
    }
  }
}));

const MenuItemTextMetaWrapper = styled(Box)<BoxProps>({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'opacity .25s ease-in-out',
  ...(themeConfig.menuTextTruncate && { overflow: 'hidden' })
});

const VerticalNavLink = ({
  item,
  parent,
  navHover,
  settings,
  navVisible,
  isSubToSub,
  collapsedNavWidth,
  toggleNavVisibility,
  navigationBorderWidth
}: Props) => {
  const theme = useTheme();
  const router = useRouter();

  // ** Vars
  const { mode, navCollapsed } = settings;

  const icon = parent && !item.icon ? themeConfig.navSubItemIcon : item.icon;

  const conditionalIconColor = () => {
    if (mode === 'semi-dark') {
      return {
        color: `rgba(${theme.palette.customColors.dark}, ${parent ? 0.6 : 0.87})`
      };
    } else
      return {
        color: parent ? 'text.secondary' : 'text.primary'
      };
  };

  const conditionalBgColor = () => {
    if (mode === 'semi-dark') {
      return {
        '&:hover': {
          backgroundColor: `rgba(${theme.palette.customColors.dark}, 0.05)`
        }
      };
    } else return {};
  };

  const isNavLinkActive = () => {
    if (router.pathname === item.path || handleURLQueries(router, item.path)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <CanViewNavLink navLink={item}>
      <ListItem
        disablePadding
        className='nav-link'
        disabled={item.disabled || false}
        sx={{
          mt: 1.5,
          transition: 'padding .25s ease-in-out',
          px: parent ? '0 !important' : `${theme.spacing(navCollapsed && !navHover ? 2 : 3)} !important`
        }}
      >
        <MenuNavLink
          component={Link}
          {...(item.disabled && { tabIndex: -1 })}
          className={isNavLinkActive() ? 'active' : ''}
          href={item.path === undefined ? '/' : `${item.path}`}
          {...(item.openInNewTab ? { target: '_blank' } : null)}
          onClick={e => {
            if (item.path === undefined) {
              e.preventDefault();
              e.stopPropagation();
            }
            if (navVisible) {
              toggleNavVisibility();
            }
          }}
          sx={{
            py: 2.25,
            ...conditionalBgColor(),
            ...(item.disabled ? { pointerEvents: 'none' } : { cursor: 'pointer' }),
            pr: navCollapsed && !navHover ? (collapsedNavWidth - navigationBorderWidth - 24 - 16) / 8 : 3,
            pl: navCollapsed && !navHover ? (collapsedNavWidth - navigationBorderWidth - 24 - 16) / 8 : 4
          }}
        >
          {isSubToSub ? null : (
            <ListItemIcon
              sx={{
                ...conditionalIconColor(),
                transition: 'margin .25s ease-in-out',
                ...(navCollapsed && !navHover ? { mr: 0 } : { mr: 2 }),
                ...(parent ? { ml: 2, mr: 4 } : {}), // This line should be after (navCollapsed && !navHover) condition for proper styling
                '& svg': {
                  ...(!parent ? { fontSize: '1.5rem' } : { fontSize: '0.5rem' }),
                  ...(parent && item.icon ? { fontSize: '0.875rem' } : {})
                }
              }}
            >
              <UserIcon icon={icon as string} />
            </ListItemIcon>
          )}

          <MenuItemTextMetaWrapper
            sx={{
              ...(isSubToSub ? { ml: 8 } : {}),
              ...(navCollapsed && !navHover ? { opacity: 0 } : { opacity: 1 })
            }}
          >
            <Typography
              {...((themeConfig.menuTextTruncate || (!themeConfig.menuTextTruncate && navCollapsed && !navHover)) && {
                noWrap: true
              })}
            >
              <Translations text={item.title} />
            </Typography>
            {item.badgeContent ? (
              <Chip
                size='small'
                label={item.badgeContent}
                color={item.badgeColor || 'primary'}
                sx={{ ml: 1.5, '& .MuiChip-label': { px: 2.5, lineHeight: 1.385, textTransform: 'capitalize' } }}
              />
            ) : null}
          </MenuItemTextMetaWrapper>
        </MenuNavLink>
      </ListItem>
    </CanViewNavLink>
  );
};

export default VerticalNavLink;
