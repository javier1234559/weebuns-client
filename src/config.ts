import {
  // envRequired,
  getCurrentEnvironment,
  getCurrentVersion
} from '~/utils/environment'

export const globalConfig = {
  IS_DEBUG: import.meta.env.VITE_DEBUG === 'true', // Enables logging, etc.
  IS_PRODUCTION: getCurrentEnvironment() === 'production', // Enables analytics, etc.

  // PUBLIC_URL: envRequired(import.meta.env.VITE_PUBLIC_URL), // Variant 1: .env variable is required
  PUBLIC_URL: import.meta.env.VITE_PUBLIC_URL, // Variant 2: .env variable is optional

  IS_FAKE_LOGIN: import.meta.env.VITE_FAKE_LOGIN === 'true', // Enables fake login for development

  GOOGLE_CLIENT_ID: import.meta.env.VITE_PUBLIC_GOOGLE_CLIENT_ID, // Google OAuth Client ID
  FACEBOOK_APP_ID: import.meta.env.VITE_PUBLIC_FACEBOOK_APP_ID, // Facebook OAuth App ID

  APP_URL: import.meta.env.VITE_PUBLIC_URL, // Vite public URL
  API_URL: import.meta.env.VITE_APP_API, // Vite public VITE_APP_API

  GIPHY_API_KEY: import.meta.env.VITE_GIPHY_API_KEY,

  // Additional environment-related information
  environment: getCurrentEnvironment(),
  version: getCurrentVersion()
}

// Debugging info
if (globalConfig.IS_DEBUG) {
  console.log('@/config', globalConfig)
}
