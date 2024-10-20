export interface AuthResponse {
  access_token: string
  user: {
    id: string
    username: string
    email: string
    role: string
    auth_provider: string
    auth_provider_id: string
    first_name: string
    last_name: string
    profile_picture: null | string
    is_email_verified: boolean
    last_login: null
    created_at: string
    updated_at: string
  }
}
