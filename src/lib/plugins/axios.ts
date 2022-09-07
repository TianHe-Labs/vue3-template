import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { createDiscreteApi } from 'naive-ui'
import { useStore } from '@/store'

// 脱离setup上下文使用 message
const { message: messageCtx } = createDiscreteApi(['message'])

// 拦截 request，添加 token 凭据
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  if (!config.headers?.token) {
    const { auth } = useStore()
    const token = auth.userToken?.access_token
    if (token) config.headers = Object.assign({}, config.headers, { token })
  }
  return config
})

/**
 * 业务状态码：
 * 401｜900：token 不存在或无效不合法
 * 401｜901：用户名或密码错误
 * 403｜902：access_token 过期
 * 403｜903：refresh_token 过期
 */

// 拦截 response，处理 auth 问题
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError<AxiosResData>) => {
    const { auth } = useStore()
    if (error && error.response?.status === 401) {
      const { state } = error.response.data
      messageCtx.error('身份验证未通过，请登录后重试！')
      if (state === 900) {
        // No Token Exists
        auth.signOut()
        return
      } else {
        // Missing Authentication
        auth.signOut()
        return
      }
    } else if (error && error.response?.status === 403) {
      const { state } = error.response.data
      if (state === 902) {
        // Access Token is Expired
        // 保存本次未成功的请求，在拿到新的 access token 后重发
        const { url, method, data } = error.config
        // 获取新的 access token，重发请求
        if (await auth.refreshToken()) {
          return axios.request({ url, method, data })
        }
      } else if (state === 903) {
        // Refresh Token is Expired
        auth.signOut()
        messageCtx.error('身份验证过期，请重新登录！')
        return
      }
    }
    return Promise.reject(error)
  }
)

export default axios
