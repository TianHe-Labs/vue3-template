export function setupMock({ enable = true, setup }: SetupMock) {
  if (enable) {
    setup()
  }
}

export function responseSuccess(data: any) {
  return data
}

export function responseFailure(code = 900, message = '错误') {
  return {
    code,
    message,
  }
}
