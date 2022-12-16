import { IconProps } from '@iconify/react';

import Icon from '@core/components/icon';

const UserIcon = ({ icon, ...rest }: IconProps) => {
  return <Icon icon={icon} {...rest} />;
};

export default UserIcon;
