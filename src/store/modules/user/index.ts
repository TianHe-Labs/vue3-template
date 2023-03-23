import {
  getToken,
  setToken,
  clearToken,
  JWT_ACS_TOKEN_KEY,
  JWT_RSH_TOKEN_KEY,
} from '@/utils/token'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    username: undefined,
    roles: undefined,
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    },
  },

  actions: {
    // 更新用户信息 UserStore
    setUserInfo(partial: Partial<UserState>) {
      this.$patch(partial)
    },
    // 重置用户信息 UserStore
    resetUserInfo() {
      this.$reset()
    },
    // 登录
    async signIn(authFormData: AuthFormData) {
      try {
        const { data } = await axios.post('/api/auth', {
          ...authFormData,
        })
        const { payload } = data
        const { access_token, refresh_token } = payload
        setToken(access_token, JWT_ACS_TOKEN_KEY)
        setToken(refresh_token, JWT_RSH_TOKEN_KEY)
      } catch (err) {
        clearToken()
        throw err
      }
    },
    // 获取用户信息
    async getUserInfo() {
      try {
        const { data } = await axios.get('/api/user/info')
        const { payload } = data
        this.setUserInfo(payload)
      } catch (err) {
        clearToken()
        throw err
      }
    },
    // 退出登录
    signOut() {
      this.resetUserInfo()
      clearToken()
    },
    // 刷新 Token
    async refreshToken() {
      try {
        const { data } = await axios.request({
          url: '/api/refresh',
          method: 'post',
          headers: {
            token: getToken(JWT_RSH_TOKEN_KEY),
          },
        })
        const { payload } = data
        setToken(payload.access_token)
      } catch (err) {
        clearToken()
        throw err
      }
    },
  },
})
