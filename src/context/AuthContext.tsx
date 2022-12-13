import { createContext, useEffect, useState, ReactNode } from 'react'
import { useRouter } from 'next/router'
import { AxiosRequestConfig } from 'axios'

import authConfig from 'src/configs/auth'

import { AuthValuesType, RegisterParams, LoginParams, ErrCallbackType, UserDataType } from './types'
import apiClient from '../@core/services/api.client'

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
  const [isGettingRefreshToken, setIsGettingRefreshToken] = useState(false)

  // ** Hooks
  const router = useRouter()

  useEffect(() => {
    apiClient.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        const noneAuthorize: Record<string, boolean> = {
          '/login': true,
          '/global-admins': true,
          '/refresh-token': true
        }

        if (noneAuthorize[config.url || '']) {
          return config
        }

        const nowTimestamp = new Date().getTime()
        const refreshToken = localStorage.getItem(authConfig.refreshToken)
        const expiredTime = Number.parseInt(localStorage.getItem(authConfig.expiredTime) || '0')
        const user = JSON.parse(localStorage.getItem('user') || '{}')

        if (expiredTime < nowTimestamp && !isGettingRefreshToken) {
          if (!refreshToken || !user?.username) {
            return Promise.reject(new Error('Invalid refresh token'))
          }
          setIsGettingRefreshToken(true)

          await apiClient
            .post('/refresh-token', { username: user.username, refreshToken })
            .then(response => {
              apiClient.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken?.token}`

              localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken?.token)
              localStorage.setItem(authConfig.refreshToken, response.data.accessToken?.refreshToken)
              localStorage.setItem(authConfig.expiredTime, `${new Date().getTime() + 55 * 60 * 60}`)
              localStorage.setItem('user', JSON.stringify(response.data.user))
              setIsGettingRefreshToken(false)
            })
            .catch(err => {
              console.log(err)
              setIsGettingRefreshToken(false)
            })
        }

        return {
          ...config,
          headers: {
            ...config.headers,
            Authorization: 'Bearer ' + localStorage.getItem(authConfig.storageTokenKeyName)
          }
        }
      },
      error => {
        console.log(error)
        return Promise.reject(error)
      }
    )

    apiClient.interceptors.response.use(
      response => {
        return response
      },
      error => {
        return Promise.reject(error)
      }
    )
  }, [])

  useEffect(() => {
    const initAuth = async (): Promise<void> => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!
      if (storedToken) {
        apiClient.defaults.headers['Authorization'] = `Bearer ${storedToken}`

        const user = JSON.parse(localStorage.getItem('user') || '')
        if (user) {
          setUser(user)
        }
      }

      setLoading(false)
    }

    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = ({ username, password, rememberMe }: LoginParams, errorCallback?: ErrCallbackType) => {
    apiClient
      .post(authConfig.loginEndpoint, { username, password })
      .then(async response => {
        apiClient.defaults.headers['Authorization'] = `Bearer ${response.data.accessToken?.token}`

        if (rememberMe) {
          localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken?.token)
          localStorage.setItem(authConfig.expiredTime, `${new Date().getTime() + 55 * 60 * 60}`)
          localStorage.setItem(authConfig.refreshToken, response.data.accessToken?.refreshToken)
          localStorage.setItem('user', JSON.stringify(response.data.user))
        }

        setUser({ ...response.data.user })
        const returnUrl = router.query.returnUrl

        const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'

        router.replace(redirectURL as string)
      })

      .catch(err => {
        if (errorCallback) errorCallback(err)
      })
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('user')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)

    apiClient.defaults.headers['Authorization'] = null

    router.push('/login')
  }

  const handleRegister = (params: RegisterParams, errorCallback?: ErrCallbackType) => {
    apiClient
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
