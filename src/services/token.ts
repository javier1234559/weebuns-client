export const getToken = () => {
  return localStorage.getItem('accessToken')
}
export const setToken = (accessToken: string) => {
  localStorage.setItem('accessToken', accessToken)
}

export const deleteToken = () => {
  localStorage.removeItem('accessToken')
}
// export const getRefreshToken = () => {
//   return localStorage.getItem('refreshToken')
// }
// export const updateRefreshToken = (refreshToken: string) => {
//   localStorage.setItem('refreshToken', JSON.stringify(refreshToken))
// }

// export const getTokenAdmin = () => {
//   return localStorage.getItem('accessTokenAdmin')
// }
// export const updateTokenAdmin = (accessToken: string) => {
//   localStorage.setItem('accessTokenAdmin', accessToken)
// }
// export const getRefreshTokenAdmin = () => {
//   return localStorage.getItem('refreshTokenAdmin')
// }
// export const updateRefreshTokenAdmin = (refreshToken: string) => {
//   localStorage.setItem('refreshTokenAdmin', JSON.stringify(refreshToken))
// }
