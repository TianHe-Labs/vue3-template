type RoleEnum = 'super' | 'admin' | 'common'

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
