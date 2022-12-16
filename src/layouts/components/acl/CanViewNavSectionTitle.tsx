import { ReactNode, useContext } from 'react';

import { NavSectionTitle } from '@core/layouts/types';

import { AbilityContext } from 'layouts/components/acl/Can';

interface Props {
  children: ReactNode;
  navTitle?: NavSectionTitle;
}

const CanViewNavSectionTitle = (props: Props) => {
  // ** Props
  const { children, navTitle } = props;

  // ** Hook
  const ability = useContext(AbilityContext);

  return ability && ability.can(navTitle?.action, navTitle?.subject) ? <>{children}</> : null;
};

export default CanViewNavSectionTitle;
