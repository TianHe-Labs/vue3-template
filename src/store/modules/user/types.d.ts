type RoleEnum = 'super' | 'admin' | 'common'

interface UserState {
  username?: string
  roles?: RoleEnum[]
}

interface AuthFormData {
  username: string
  password: string
}
