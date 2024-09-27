import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './theme'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { persistor, store } from '~/store/store'
import App from './App.tsx'
import './index.css'

const CLIENT_ID = '1084448509397-5gd8k5ti7apd88khaupg0f2st3h556k3.apps.googleusercontent.com'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <GoogleOAuthProvider clientId={CLIENT_ID}>
            <App />
          </GoogleOAuthProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
)
