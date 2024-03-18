type RoleEnum = 'super' | 'admin' | 'common'

interface UserState {
  username?: string
  role?: RoleEnum
}

interface AuthFormData {
  username: string
  password: string
}
