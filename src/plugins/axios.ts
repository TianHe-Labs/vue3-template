import {
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosError,
} from 'axios'
import { createDiscreteApi } from 'naive-ui'
import { useUserStore } from '@/store'
import { getToken } from '@/utils/token'

interface HttpResponse<T = any> {
  data?: T
  state?: number
  message?: string
}

// 脱离 setup 上下文使用 message
const { message: messageCtx } = createDiscreteApi(['message'])

// 生产环境子路径部署时需要为 API 请求添加相应前缀
if (import.meta.env) {
  axios.defaults.baseURL = import.meta.env.BASE_URL
}

// 拦截 request，添加 token 凭据
axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getToken()
  if (!config?.headers.token && token) {
    config.headers = {
      ...config.headers,
      token,
    } as unknown as AxiosRequestHeaders
    // config.headers = { ...config.headers, Authorization: `Bearer ${token}` }
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
  (response: AxiosResponse<HttpResponse>) => {
    const { state, message } = response.data
    if (state && message && state >= 900) {
      messageCtx.error(`[${state}]${message}`)
      return Promise.reject({ state, message })
    }
    return response
  },
  async (error: AxiosError<HttpResponse>) => {
    const { logout, refreshToken } = useUserStore()
    if (error.response?.status === 401) {
      const { state } = error.response.data
      messageCtx.error('身份验证未通过，请登录后重试！')
      if (state === 900) {
        // No Token Exists
        logout()
        return
      } else {
        // Missing Authentication
        logout()
        return
      }
    } else if (error.response?.status === 403) {
      const { state } = error.response.data
      if (state === 902) {
        // Access Token is Expired
        // 保存本次未成功的请求，在拿到新的 access token 后重发
        const { url, method, data } = error.config as InternalAxiosRequestConfig
        // 获取新的 access token，重发请求
        await refreshToken()
        return axios.request({ url, method, data })
      } else if (state === 903) {
        // Refresh Token is Expired
        logout()
        messageCtx.error('身份验证过期，请重新登录！')
        return
      }
    } else {
      messageCtx.error(`[${error.response?.status}]${error.message}`)
      return Promise.reject(error)
    }
  }
)
