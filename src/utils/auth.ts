export const ACS_TOKEN_KEY = 'th-acs-tk'
export const RSH_TOKEN_KEY = 'th-rsh-tk'

export const isLogin = () => {
  return !!localStorage.getItem(ACS_TOKEN_KEY)
}

export const getUserToken = (tokenKey = ACS_TOKEN_KEY) => {
  return localStorage.getItem(tokenKey)
}

export const setUserToken = (token: string, tokenKey = ACS_TOKEN_KEY) => {
  localStorage.setItem(tokenKey, token)
}

export const clearUserToken = () => {
  localStorage.removeItem(ACS_TOKEN_KEY)
  localStorage.removeItem(RSH_TOKEN_KEY)
}
