export function responseSuccess(payload: any, meta = {}) {
  return {
    state: 800,
    payload,
    meta,
  }
}

export function responseFailure(state = 900, message = '错误') {
  return {
    state,
    message,
  }
}
