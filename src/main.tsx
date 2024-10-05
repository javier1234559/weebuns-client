import { GoogleOAuthProvider } from '@react-oauth/google'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { globalConfig } from '~/config.ts'
import { persistor, store } from '~/store/store'
import App from './App.tsx'
import './assets/css/index.scss'
import './assets/css/responsive.scss'
import { AppThemeProvider } from './theme'

const CLIENT_ID = globalConfig.GOOGLE_CLIENT_ID
console.log('CLIENT_ID', CLIENT_ID)

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppThemeProvider>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <App />
          <Toaster />
        </GoogleOAuthProvider>
      </AppThemeProvider>
    </PersistGate>
  </Provider>
  // </StrictMode>
)
