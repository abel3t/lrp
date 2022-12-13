export default {
  meEndpoint: '/auth/me',
  loginEndpoint: '/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'token',
  onTokenExpiration: 'refreshToken', // logout | refreshToken
  refreshToken: 'refreshToken',
  expiredTime: 'expiredTime'
}
