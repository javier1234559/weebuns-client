import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import { AuthResponse } from '~/features/auth/auth.type'
import { login } from '~/features/auth/authSlice'

const useLogin = () => {
  const dispatch = useDispatch()

  const handleLogin = async (data: AuthResponse) => {
    dispatch(
      login({
        id: data.user.id,
        email: data.user.email,
        name: `${data.user.firstName} ${data.user.lastName}`,
        avatar_img: data.user.profilePicture,
        accessToken: data.access_token,
        role: data.user.role
      })
    )

    toast.success('Login successfully! Redirecting to dashboard...')
  }

  return { handleLogin }
}

export default useLogin
