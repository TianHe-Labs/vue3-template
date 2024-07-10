export enum USERROLE {
  'SUPER' = 'super',
  'ADMIN' = 'admin',
  'USER' = 'user',
}

export interface UserState {
  username?: string
  role?: USERROLE
  accessToken?: string
  refreshToken?: string
}

export interface AuthFormData {
  username: string
  password: string
}
