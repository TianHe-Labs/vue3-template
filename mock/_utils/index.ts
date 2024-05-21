export function setupMock({ enable = true, setup }: SetupMock) {
  if (enable) {
    setup()
  }
}

export function successResponseWrap(data: any) {
  return data
}

export function failureResponseWrap(message = '错误') {
  return {
    message,
  }
}
