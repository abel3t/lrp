import { useAuth } from 'hooks/useAuth';
import NotAuthorized from 'pages/401';
import { ReactNode, useState } from 'react';

import { useRouter } from 'next/router';

import BlankLayout from '@core/layouts/BlankLayout';

import type { ACLObj, AppAbility } from 'configs/acl';

interface AclGuardProps {
  children: ReactNode;
  guestGuard: boolean;
  aclAbilities: ACLObj;
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  const { aclAbilities, children, guestGuard } = props;

  const [ability] = useState<AppAbility | undefined>(undefined);

  const auth = useAuth();
  const router = useRouter();

  // If guestGuard is true and user is not logged in or its an error page, render the page without checking access
  if (guestGuard || router.route === '/404' || router.route === '/500' || router.route === '/') {
    return <>{children}</>;
  }

  // User is logged in, build ability for the user based on his role
  if (auth.user && auth.user.role && !ability) {
    // setAbility(buildAbilityFor(auth.user.role, aclAbilities.subject));
  }

  // Check the access of current user and render pages
  if (ability && ability.can(aclAbilities.action, aclAbilities.subject)) {
    // return <AbilityContext.Provider value={ability}>{children}</AbilityContext.Provider>;
  }

  // Render Not Authorized component if the current user has limited access
  return (
    <BlankLayout>
      <NotAuthorized />
    </BlankLayout>
  );
};

export default AclGuard;
