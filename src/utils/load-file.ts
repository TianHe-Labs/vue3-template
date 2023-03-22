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
