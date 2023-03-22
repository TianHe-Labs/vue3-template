export const JWT_ACS_TOKEN_KEY = 'acs-token'
export const JWT_RSH_TOKEN_KEY = 'rsh-token'

export const isLogin = () => {
  return !!localStorage.getItem(JWT_ACS_TOKEN_KEY)
}

export const getToken = (tokenKey = JWT_ACS_TOKEN_KEY) => {
  return localStorage.getItem(tokenKey)
}

export const setToken = (token: string, tokenKey = JWT_ACS_TOKEN_KEY) => {
  localStorage.setItem(tokenKey, token)
}

export const clearToken = () => {
  localStorage.removeItem(JWT_ACS_TOKEN_KEY)
  localStorage.removeItem(JWT_RSH_TOKEN_KEY)
}
