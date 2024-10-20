import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { AuthResponse } from '~/features/auth/auth.type'
import { login } from '~/features/auth/authSlice'
import { RouteNames } from '~/router/route-name'

export const useRegister = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRegister = async (data: AuthResponse) => {
    dispatch(
      login({
        id: data.user.id,
        email: data.user.email,
        name: `${data.user.first_name} ${data.user.last_name}`,
        avatar_img: data.user.profile_picture,
        accessToken: data.access_token,
        role: data.user.role
      })
    )

    toast.success('Register successfully! Redirecting to dashboard...')
    navigate(RouteNames.Dashboard)
  }

  return { handleRegister }
}

export default useRegister
