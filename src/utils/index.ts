export * from './is'
export * from './has'
export * from './fotmat'
export * from './transform'

// 工具函数·无明确分类
export function loadFile(file: File) {
  return new Promise<FileReader>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (/* event: ProgressEvent */) => {
      resolve(reader)
    }
    reader.onabort = reject
    reader.onerror = reject

    if (!file.type || /^text\//i.test(file.type)) {
      reader.readAsText(file)
    } else {
      reader.readAsDataURL(file)
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
