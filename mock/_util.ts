export function responseSuccess(payload: any, meta = {}) {
  return {
    state: 800,
    payload,
    meta,
  }
}

export function responseFailure(state = 900, msg = '错误') {
  return {
    state,
    msg,
  }
}
