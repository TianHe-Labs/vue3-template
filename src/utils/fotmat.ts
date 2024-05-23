// 工具函数·数据格式化类

export function formatNumber(obj: number, separator = ','): string {
  if (typeof obj !== 'number') return 'Invalid Number'
  // separator 分隔符，默认逗号 ,
  return obj.toString().replace(/(\d)(?=(?:\d{3})+$)/g, `$1${separator}`)
}

export function formatNumberEnAbbr(obj: number): string {
  if (typeof obj !== 'number') return 'Invalid Number'
  // base 底数
  const base = 1000
  // 取对数匹配单位
  const symbols = ['', 'K', 'M', 'B', 'T']
  const i = Math.floor(Math.log(obj) / Math.log(base))
  return `${(obj / Math.pow(base, i)).toFixed(1)} ${symbols[i]}`
}

export function formatNumberZhAbbr(obj: number): string {
  if (typeof obj !== 'number') return 'Invalid Number'
  // base 底数
  const base = 10000
  // 取对数匹配单位
  const symbols = ['', ' 万', ' 亿', ' 万亿']
  const i = Math.floor(Math.log(obj) / Math.log(base))
  return `${(obj / Math.pow(base, i)).toFixed(1)} ${symbols[i]}`
}

export function formatByte(obj: number): string {
  if (typeof obj !== 'number') return 'Invalid Number'
  // base 底数
  const base = 1024
  // 取对数匹配单位
  const symbols = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(obj) / Math.log(base))
  return `${(obj / Math.pow(base, i)).toFixed(1)} ${symbols[i]}`
}

// 时间格式化，不要对 dayjs 二次封装
import dayjsExt from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'

dayjsExt.locale('zh-cn')
dayjsExt.extend(relativeTime)
dayjsExt.extend(localizedFormat)

export const dayjs = dayjsExt
