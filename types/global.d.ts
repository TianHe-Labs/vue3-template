declare type Recordable<T = any> = Record<string, T>
declare type Nullable<T> = T | null

interface Mappings<T = string> {
  [key: string]: T
}

interface Pagination {
  page: number
  pageSize: number
  itemCount: number
  pageSizes?: number[]
  showSizePicker?: boolean
  prefix?: (info: any) => any
  suffix?: (info: any) => any
  onUpdatePage?: (page: number) => void
  onUpdatePageSize?: (pageSize: number) => void
}
