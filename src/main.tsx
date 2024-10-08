import './assets/css/index.scss'
import './assets/css/responsive.scss'

import { GoogleOAuthProvider } from '@react-oauth/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import { globalConfig } from '~/config.ts'
import { persistor, store } from '~/store/store'

import App from './App.tsx'
import { AppThemeProvider } from './theme'

const CLIENT_ID = globalConfig.GOOGLE_CLIENT_ID

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppThemeProvider>
          <QueryClientProvider client={queryClient}>
            <GoogleOAuthProvider clientId={CLIENT_ID}>
              <App />
              <Toaster />
            </GoogleOAuthProvider>
          </QueryClientProvider>
        </AppThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
)
