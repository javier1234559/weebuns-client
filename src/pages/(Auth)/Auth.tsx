import Stack from '@mui/material/Stack'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AppButton from '~/components/common/AppButton'
import AppLink from '~/components/common/AppLink'
import AppView from '~/components/common/AppView'
import { useEventLogout } from '~/hooks/auth'
import authApi from '~/services/auth'
import NotImplementedView from '../NotImplementedView'

const AuthView = () => {
  const navigate = useNavigate()
  const onLogout = useEventLogout()

  useEffect(() => {
    const handleGetCurrentUser = async () => {
      const data = await authApi.getCurrentUser()
      console.log(data)
    }

    handleGetCurrentUser()
  }, [])

  const onLogin = () => {
    // TODO: AUTH: Sample of access token store, replace next line in real application
    // sessionStorageSet('access_token', 'TODO:_save-real-access-token-here')

    // dispatch({ type: 'LOG_IN' })
    navigate('/', { replace: true }) // Redirect to home page without ability to go back
  }

  return (
    <AppView>
      <NotImplementedView name='Auth' />

      <Stack direction='row' justifyContent='center'>
        <AppButton color='primary' onClick={onLogin}>
          Emulate User Login
        </AppButton>
        <AppButton color='secondary' onClick={onLogout}>
          Logout User
        </AppButton>
      </Stack>

      <div>
        The source code is available at <AppLink href='https://github.com/karpolan/react-mui-vite-ts'>GitHub</AppLink>
      </div>
    </AppView>
  )
}

export default AuthView
