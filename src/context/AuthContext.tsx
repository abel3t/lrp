// ** React Imports
import { createContext, useEffect, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Types
import { AuthValuesType, RegisterParams, LoginParams, ErrCallbackType, UserDataType } from './types'
import apiClient from '../@core/services/api.client';

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(defaultProvider.user)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      apiClient.interceptors.request.use((config) => {
        const noneAuthorize: Record<string, boolean> = {
          '/login': true,
          '/global-admins': true,
          '/refresh-token': true
        }

        if (noneAuthorize[config.url || '']) {
          return config;
        }

        const nowTimestamp = new Date().getTime();
        console.log('before send request', config.url, localStorage.getItem('token') || '')
        apiClient.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token') || ''}`



        // if (expiredTime < nowTimestamp) {
        //   if (!refreshToken) {
        //     return Promise.reject(new Error('Invalid refresh token'));
        //   }
        //
        //   instance.post('/refresh-token').then()
        // }

        return config;
      }, (error) => {
        console.log(error);
        return Promise.reject(error);
      });

      apiClient.interceptors.response.use((response) => {
        return response;
      }, (error) => {
        console.log(error);
        return Promise.reject(error);
      });

      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      if (storedToken) {
        apiClient.defaults.headers['Authorization'] = `Bearer ${storedToken}`;

        const user = JSON.parse(localStorage.getItem('userData') || '');
        if (user) {
          setUser(user);
        }
      }

      setLoading(false);
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = ({ username, password, rememberMe }: LoginParams, errorCallback?: ErrCallbackType) => {
    apiClient
      .post(authConfig.loginEndpoint, { username, password })
      .then(async response => {

        rememberMe
          ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken?.token)
          : null

        const returnUrl = router.query.returnUrl

        setUser({ ...response.data.userData })
        rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)

    apiClient.defaults.headers['Authorization'] = null;

    router.push('/login')
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    axios
      .post(authConfig.registerEndpoint, params)
      .then(res => {
        if (res.data.error) {
          if (errorCallback) errorCallback(res.data.error)
        } else {
          handleLogin({ username: params.username, password: params.password })
        }
      })
      .catch((err: { [key: string]: string }) => (errorCallback ? errorCallback(err) : null))
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
