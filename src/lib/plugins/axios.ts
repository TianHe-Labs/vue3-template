import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
// import { provideAuth } from '../hooks/auth'

const router = useRouter()
// const authCtx = provideAuth()

// 拦截 request，添加 token 凭据
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = sessionStorage.getItem('access_token')
  if (token) config.headers = Object.assign({}, config.headers, { token })
  return config
})

// 拦截 response，处理 auth 问题
axios.interceptors.response.use(
  (response: AxiosResponse<AxiosResData>) => {
    return response
  },
  async (error: AxiosError<AxiosResData>) => {
    if (error && error.response?.status === 401) {
      const { state } = error.response.data
      if (state === 900) {
        // No Token Exists
        // authCtx.signOut();
        router.push({ name: 'auth' })
        // messageCtx.error("身份验证未通过，请登录后重试！");
        return
      } else if (state === 902) {
        // Access Token Expired
        // 保存本次未成功的请求，在拿到新的 access token 后重发
        // const { url, method, data } = error.config
        // 获取新的 access token，重发请求
        // if (await authCtx.refresh()) {
        //   return axios.request({ url, method, data });
        // }
      } else if (state === 903) {
        // Refresh Token Expired
        // authCtx.signOut();
        router.push({ name: 'auth' })
        // messageCtx.error("身份验证过期，请重新登录！");
        return
      }
    }
    return Promise.reject(error)
  }
)

export default axios
