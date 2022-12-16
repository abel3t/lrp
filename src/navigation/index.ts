import { VerticalNavItemsType } from '@core/layouts/types';

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: 'mdi:home-outline'
    },
    {
      title: 'Members',
      path: '/members',
      icon: 'mdi:person-outline'
    },
    {
      title: 'Cares',
      path: '/cares',
      icon: 'mdi:calendar-plus-outline'
    },
    {
      title: 'Friends',
      path: '/friends',
      icon: 'mdi:account-multiple-outline'
    }

    // {
    //   title: 'Ministry',
    //   path: '/ministries',
    //   icon: 'mdi:church-outline'
    // },
    // {
    //   title: 'Teams',
    //   path: '/teams',
    //   icon: 'mdi:account-group-outline'
    // },
    // {
    //   path: '/acl',
    //   action: 'read',
    //   subject: 'acl-page',
    //   title: 'Access Control',
    //   icon: 'mdi:shield-outline'
    // }
  ];
};

export default navigation;
