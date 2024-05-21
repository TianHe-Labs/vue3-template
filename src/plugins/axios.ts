import type {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from 'axios'
import { createDiscreteApi } from 'naive-ui'
import { useUserStore } from '@/store'
import { useUserLogout } from '@/hooks/useUserLogout'

// 脱离 setup 上下文使用 message
const { message: messageCtx } = createDiscreteApi(['message'])

if (import.meta.env.VITE_API_BASE) {
  // 自定义环境变量，手动指定 API Base
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE
} else {
  // vite 内置环境变量，子路径部署时用到
  axios.defaults.baseURL = import.meta.env.BASE_URL
}

// add request interceptors(Authorization)
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (config.headers.Authorization) {
      return config
    }

    const userStore = useUserStore()
    const token = userStore.accessToken
    if (token) {
      // v1.x版本 headers 必存在
      /* if (!config.headers) {
        config.headers = {} as AxiosRequestHeaders
      } */
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // do something
    return Promise.reject(error)
  }
)

// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // api 返回结果不要进行多余的封装包裹
    // 要么直接返回结果，要么返回错误信息
    return response
  },
  async (error: AxiosError<Record<string, any>>) => {
    // api 返回结果不要进行多余的封装包裹
    // 要么直接返回结果，要么返回错误信息
    const userStore = useUserStore()
    const { logout } = useUserLogout()

    const status = error.response?.status
    const data = error.response?.data
    const message = data?.message || data?.msg
    if (
      !error.config?.url?.includes('/user/passwd/update') &&
      !error.config?.url?.includes('/user/auth') &&
      status === 401
    ) {
      // 登录时用户名或密码错误，Token 无效或缺失
      messageCtx.error(
        `[认证错误]${message || '身份验证未通过，请登录后重试！'}`
      )
      logout()
    } else if (status === 460) {
      // Access Token 过期
      // 保存本次未成功的请求，在拿到新的 access token 后重发
      const { url, method, data } = error.config as InternalAxiosRequestConfig
      // 获取新的 access token，重发请求
      await userStore.updateUserToken()
      return axios.request({ url, method, data })
    } else if (status === 461) {
      // Refresh Token 过期
      messageCtx.error(`[认证错误]${message || '身份验证过期，请重新登录！'}`)
      logout()
    } else {
      return Promise.reject({ message: message || error.message })
    }
  }
)
