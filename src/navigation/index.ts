import { VerticalNavItemsType } from '@core/layouts/types';

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: 'mdi:home-outline',
      action: 'manage',
      subject: 'dashboard',
    },
    {
      title: 'Members',
      path: '/members',
      icon: 'mdi:person-outline',
      action: 'manage',
      subject: 'members'
    },
    {
      title: 'Cares',
      path: '/cares',
      icon: 'mdi:calendar-plus-outline',
      action: 'manage',
      subject: 'cares'
    },
    {
      title: 'Friends',
      path: '/friends',
      icon: 'mdi:account-multiple-outline',
      action: 'manage',
      subject: 'friends'
    },
    {
      title: 'Discipleship',
      path: '/discipleship',
      icon: 'mdi:church-outline',
      action: 'manage',
      subject: 'discipleship'
    },
    {
      title: 'Absences',
      path: '/absence',
      icon: 'mdi:license',
      action: 'manage',
      subject: 'absence'
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
