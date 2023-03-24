enum RoleEnum {
  SUPER = 'super',
  ADMIN = 'admin',
  COMMON = 'common',
}

interface UserState {
  username?: string
  roles?: RoleEnum[]
}

interface AuthFormData {
  username: string
  password: string
}
