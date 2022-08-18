declare type Recordable<T = any> = Record<string, T>
declare type Nullable<T> = T | null

interface Mappings<T = string> {
  [key: string]: T
}
