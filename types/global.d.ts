declare type Recordable<T = any> = Record<string, T>
declare type Nullable<T> = T | null

interface Mappings<T = string> {
  [key: string]: T
}

// axios
interface AxiosResData {
  state: number
  meta?: Recordable
  payload?: any
  msg?: string
}

// user
interface AuthFormData {
  username: string
  password: string
}

// sts
interface OssAccessToken {
  AccessKeyId: string
  AccessKeySecret: string
  SecurityToken: string
  Expiration: string
}
