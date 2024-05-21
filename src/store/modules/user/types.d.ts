type RoleEnum = 'super' | 'admin' | 'user'

interface UserState {
  username?: string
  role?: RoleEnum
  accessToken?: string
  refreshToken?: string
}

interface AuthFormData {
  username: string
  password: string
}
