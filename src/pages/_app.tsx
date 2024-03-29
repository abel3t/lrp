import type { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { store } from '@store';
import 'iconify-bundle/icons-bundle-react';
import type { NextPage } from 'next';
import NProgress from 'nprogress';

import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import 'react-perfect-scrollbar/dist/css/styles.css';
import { Provider } from 'react-redux';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Router } from 'next/router';

import AclGuard from '@core/components/auth/AclGuard';
import AuthGuard from '@core/components/auth/AuthGuard';
import GuestGuard from '@core/components/auth/GuestGuard';
import Spinner from '@core/components/spinner';
import WindowWrapper from '@core/components/window-wrapper';
import { SettingsConsumer, SettingsProvider } from '@core/context/settingsContext';
import ReactHotToast from '@core/styles/libs/react-hot-toast';
import ThemeComponent from '@core/theme/ThemeComponent';
import { createEmotionCache } from '@core/utils/create-emotion-cache';

import { defaultACLObj } from 'configs/acl';
import 'configs/i18n';
import themeConfig from 'configs/themeConfig';

import { AuthProvider } from 'context/AuthContext';

import UserLayout from 'layouts/UserLayout';

import '../../styles/globals.css';

type ExtendedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

type GuardProps = {
  authGuard: boolean;
  guestGuard: boolean;
  children: ReactNode;
};

const clientSideEmotionCache = createEmotionCache();

// ** Pace Loader
if (themeConfig.routingLoader) {
  Router.events.on('routeChangeStart', () => {
    NProgress.start();
  });
  Router.events.on('routeChangeError', () => {
    NProgress.done();
  });
  Router.events.on('routeChangeComplete', () => {
    NProgress.done();
  });
}

const Guard = ({ children, authGuard, guestGuard }: GuardProps) => {
  if (guestGuard) {
    return <GuestGuard fallback={<Spinner />}>{children}</GuestGuard>;
  } else if (!guestGuard && !authGuard) {
    return <>{children}</>;
  } else {
    return <AuthGuard fallback={<Spinner />}>{children}</AuthGuard>;
  }
};

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Variables
  const contentHeightFixed = Component.contentHeightFixed ?? false;
  const getLayout =
    Component.getLayout ?? (page => <UserLayout contentHeightFixed={contentHeightFixed}>{page}</UserLayout>);

  const setConfig = Component.setConfig ?? undefined;

  const authGuard = Component.authGuard ?? true;

  const guestGuard = Component.guestGuard ?? false;

  const aclAbilities = Component.acl ?? defaultACLObj;

  return (
    <Provider store={store}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Lighthouse Resource Planning</title>
          <meta name='description' content={`${themeConfig.templateName} – LRP.`} />
          <meta name='keywords' content='LRP' />
          <meta name='viewport' content='initial-scale=1, width=device-width' />
        </Head>

        <AuthProvider>
          <SettingsProvider {...(setConfig ? { pageSettings: setConfig() } : {})}>
            <SettingsConsumer>
              {({ settings }) => {
                return (
                  <ThemeComponent settings={settings}>
                    <WindowWrapper>
                      <Guard authGuard={authGuard} guestGuard={guestGuard}>
                        <AclGuard aclAbilities={aclAbilities} guestGuard={guestGuard}>
                          {getLayout(<Component {...pageProps} />)}
                        </AclGuard>
                      </Guard>
                    </WindowWrapper>
                    <ReactHotToast>
                      <Toaster position={settings.toastPosition} toastOptions={{ className: 'react-hot-toast' }} />
                    </ReactHotToast>
                  </ThemeComponent>
                );
              }}
            </SettingsConsumer>
          </SettingsProvider>
        </AuthProvider>
      </CacheProvider>
    </Provider>
  );
};

export default App;
