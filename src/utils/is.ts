export function isExpired(timeStr: string | undefined): boolean {
  return !isUndefined(timeStr) && dayjs(timeStr).isBefore(dayjs())
}

export function isThisMonth(timeStr: string): boolean {
  return (
    dayjs(timeStr).year() === dayjs().year() &&
    dayjs(timeStr).month() === dayjs().month()
  )
}

export function isThisWeek(timeStr: string): boolean {
  return (
    dayjs(timeStr).year() === dayjs().year() &&
    dayjs(timeStr).week() === dayjs().week()
  )
}

export function isThisDay(timeStr: string): boolean {
  return dayjs(timeStr).isToday()
}

export function isThisScale(timeStr: string, scale: string): boolean {
  switch (scale) {
    case 'monthly':
      return isThisMonth(timeStr)
      break
    case 'weekly':
      return isThisWeek(timeStr)
      break
    case 'daily':
      return isThisDay(timeStr)
      break
    default:
      return true
      break
  }
}

export function isValid(value: unknown): boolean {
  if (isNumber(value) || isBoolean(value)) {
    return true
  } else {
    // array, function, object, regexe, string, undefined, null
    return !isEmpty(value)
  }
}

export function isFailCode(value: number): boolean {
  const str = value.toString()
  return str.startsWith('4') || str.startsWith('5')
}
