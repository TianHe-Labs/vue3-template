import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { useStore } from '@/store'

// 拦截 request，添加 token 凭据
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  if (!config.headers?.token) {
    const { auth } = useStore()
    const token = auth.userToken?.access_token
    if (token) config.headers = Object.assign({}, config.headers, { token })
  }
  return config
})

// 拦截 response，处理 auth 问题
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError<AxiosResData>) => {
    const { auth } = useStore()
    if (error && error.response?.status === 401) {
      // Missing Authentication
      auth.signOut()
      // window.messageCtx.error('身份验证未通过，请登录后重试！')
      return
    } else if (error && error.response?.status === 403) {
      const { state } = error.response.data
      if (state === 900) {
        // No Token Exists
        auth.signOut()
        // messageCtx.error("身份验证未通过，请登录后重试！");
        return
      } else if (state === 901) {
        // Access Token is Expired
        // 保存本次未成功的请求，在拿到新的 access token 后重发
        const { url, method, data } = error.config
        // 获取新的 access token，重发请求
        if (await auth.refreshToken()) {
          return axios.request({ url, method, data })
        }
      } else if (state === 902) {
        // Refresh Token is Expired
        auth.signOut()
        // messageCtx.error("身份验证过期，请重新登录！");
        return
      }
    }
    return Promise.reject(error)
  }
)

export default axios
