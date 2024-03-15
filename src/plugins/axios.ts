import {
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
  AxiosError,
} from 'axios'
import { createDiscreteApi } from 'naive-ui'
import { useUserStore } from '@/store'
import { getToken } from '@/utils/token'
import router from '@/router'

// api 返回结果不要进行多余的封装包裹
// 要么直接返回结果，要么返回错误信息
interface Statement {
  code: number
  message: string
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
 * 状态码：
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
  async (error: AxiosError<Statement>) => {
    const { logout, refreshToken } = useUserStore()
    if (error.response?.status === 401) {
      messageCtx.error('身份验证未通过，请登录后重试！')
      logout()
      router.push({ name: 'Login' })
    } else if (error.response?.status === 461) {
      // Access Token is Expired
      // 保存本次未成功的请求，在拿到新的 access token 后重发
      const { url, method, data } = error.config as InternalAxiosRequestConfig
      // 获取新的 access token，重发请求
      await refreshToken()
      return axios.request({ url, method, data })
    } else if (error.response?.status === 460) {
      messageCtx.error('身份验证过期，请重新登录！')
      logout()
      router.push({ name: 'Login' })
    }
    messageCtx.error(error.message)
    return Promise.reject(error)
  }
)
