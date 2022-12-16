
import { useEffect } from 'react'
import Spinner from 'src/@core/components/spinner'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'

export const getHomeRoute = (role: string) => {
  if (role === 'client') return '/acl'
  else return '/dashboard'
}

const Home = () => {

  const auth = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (auth.user && auth.user.role) {
      const homeRoute = getHomeRoute(auth.user.role)

      // Redirect user to Home URL
      router.replace(homeRoute)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Spinner />
}

export default Home
