import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isToday from 'dayjs/plugin/isToday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import 'dayjs/locale/zh-cn'
import { isUndefined } from 'lodash-es'

const relativeConfig = {
  thresholds: [
    { l: 's', r: 1 },
    { l: 'm', r: 1 },
    { l: 'mm', r: 60, d: 'minute' },
    { l: 'h', r: 1 },
    { l: 'hh', r: 24, d: 'hour' },
    { l: 'd', r: 1 },
    { l: 'dd', r: 30, d: 'day' },
    { l: 'M', r: 1 },
    { l: 'MM', r: 12, d: 'month' },
    { l: 'y' },
    { l: 'yy', d: 'year' },
  ],
  rounding: Math.floor,
}

dayjs.extend(duration)
dayjs.extend(relativeTime, relativeConfig)
dayjs.extend(customParseFormat)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(isToday)
dayjs.extend(weekOfYear)
dayjs.locale('zh-cn')

export function formatTime(
  timeStr: number | string | undefined,
  pattern = 'YYYY-MM-DD hh:mm:ss',
  sourcePattern = 'YYYY-MM-DD hh:mm:ss'
): string {
  if (sourcePattern) {
    return dayjs(timeStr, sourcePattern).format(pattern)
  } else {
    return dayjs(timeStr).format(pattern)
  }
}

export function formatDuration(timestamp: number, isSecond = true): string {
  if (isSecond) timestamp = timestamp * 1000
  return dayjs.duration(timestamp).humanize()
}

// sourcePattern 为输入日期的格式
export function formatDiffNow(
  timeStr: number | string | undefined,
  sourcePattern = ''
): string {
  if (!isUndefined(timeStr)) {
    if (sourcePattern) {
      return dayjs(timeStr, sourcePattern).fromNow()
    } else {
      return dayjs(timeStr).fromNow()
    }
  }
  return ''
}

export function formatNumber(num: number | string, onlyPart = true): string {
  num = parseInt(<string>num)
  const base = 10000
  if (onlyPart || num < base) {
    return (num || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  } else {
    const sizes = ['', ' 万', ' 亿', ' 万亿']
    const i = Math.floor(Math.log(num) / Math.log(base))
    return (num / Math.pow(base, i)).toFixed(1) + sizes[i]
  }
}

export function formatByte(bytes: number): string {
  const base = 1024

  // 定义字节、千字节、兆字节、吉字节、太字节、拍字节、艾字节、Z字节、Y字节
  // 通过取对数来匹配相应的单位
  const symbols = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(base))
  return `${(bytes / Math.pow(base, i)).toFixed(1)} ${symbols[i]}`
}

export function formatExpired(timeStr: string | undefined): string {
  if (dayjs(timeStr).isSameOrBefore(dayjs(), 'day')) {
    if (dayjs(timeStr).isToday()) {
      return '今天过期'
    } else {
      return '已过期'
    }
  } else {
    return '有效期内'
  }
}
