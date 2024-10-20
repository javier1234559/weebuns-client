const ENDPOINTS = {
  BASE_URL: import.meta.env.VITE_PUBLIC_URL,

  // Auth
  LOGIN: '/auth/login',
  REFRESH_TOKEN: '/auth/refresh-token',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  PROFILE: '/user/get-current',
  GOOGLE_LOGIN: '/auth/google/verify',

  GET_SINGLE_COURSE: (id: string) => `/courses/${id}`
}

export default ENDPOINTS
