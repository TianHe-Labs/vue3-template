export * from './is'
export * from './has'
export * from './fotmat'
export * from './transform'

// 工具函数·无明确分类
export function readFile(
  file: File,
  readMethod: 'ArrayBuffer' | 'DataURL' | 'Text' = 'Text'
) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }

    reader.onerror = () => {
      reject(reader.error)
    }

    switch (readMethod) {
      case 'ArrayBuffer':
        reader.readAsArrayBuffer(file)
        break
      case 'DataURL':
        reader.readAsDataURL(file)
        break
      case 'Text':
      default:
        reader.readAsText(file)
    }
  })
}

export function polling(
  func: () => Promise<void>,
  opts?: {
    interval?: number
    stopIf?: () => boolean
  }
) {
  const interval = opts?.interval || 3000
  const stopIf = opts?.stopIf || (() => false)
  let timeoutId: any = -1
  // 控制停止
  let shouldStop = false
  const stop = () => {
    shouldStop = true
  }

  const repeat = async () => {
    if (shouldStop || stopIf()) {
      clearTimeout(timeoutId)
      return
    }
    await func()
    timeoutId = setTimeout(repeat, interval)
  }
  repeat() // 立即 func 一次
  // setTimeout(repeat, interval);

  return { stop }
}
