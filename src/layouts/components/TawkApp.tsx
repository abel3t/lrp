import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

import EnvConfig from 'configs/env';

const TawkApp = () => {
  return <TawkMessengerReact propertyId={EnvConfig.TAWK_PROPERTY_ID} widgetId={EnvConfig.TAWK_WIDGET_ID} />;
};

export default TawkApp;
