export function setupMock({ enable = true, setup }: SetupMock) {
  if (enable) {
    setup()
  }
}

export function successResponseWrap(data: any) {
  return data
}

export function failureResponseWrap(code = 900, message = '错误') {
  return {
    code,
    message,
  }
}
