export * from './is'
export * from './has'
export * from './fotmat'
export * from './transform'

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

export function polling(func: () => Promise<void>, interval = 3000) {
  let timeoutId: any = -1
  // 控制停止
  let shouldContinue = true
  const stop = () => {
    shouldContinue = false
  }

  const repeat = async () => {
    if (!shouldContinue) {
      clearTimeout(timeoutId)
      return
    }
    await func()
    timeoutId = setTimeout(repeat, interval)
  }
  repeat() // 立即 func 一次
  // setTimeout(repeat, interval);

  return stop
}
