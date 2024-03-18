import {
  getUserToken,
  setUserToken,
  clearUserToken,
  ACS_TOKEN_KEY,
  RSH_TOKEN_KEY,
} from '@/utils/auth'

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    username: undefined,
    role: undefined,
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    },
    userRoleText(state: UserState) {
      if (state.role === 'super') {
        return '超级管理员'
      }
      if (state.role === 'admin') {
        return '管理员'
      }
      return ''
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
    async login(authFormData: AuthFormData) {
      try {
        const { data } = await axios.post('/api/user/auth', {
          ...authFormData,
        })
        const { accessToken, refreshToken } = data
        if (!accessToken || !refreshToken) {
          throw new Error(data.message)
        }
        setUserToken(accessToken, ACS_TOKEN_KEY)
        setUserToken(refreshToken, RSH_TOKEN_KEY)
      } catch (err) {
        clearUserToken()
        throw err
      }
    },
    // 获取用户信息
    async queryUserInfo() {
      try {
        const { data } = await axios.get('/api/user/info')
        this.setUserInfo(data)
      } catch (err) {
        clearUserToken()
        throw err
      }
    },
    // 刷新令牌
    async updateUserToken() {
      const token = getUserToken(RSH_TOKEN_KEY)
      try {
        const { data } = await axios.request({
          url: '/api/user/refresh',
          method: 'get',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setUserToken(data.accessToken)
      } catch (err) {
        clearUserToken()
        throw err
      }
    },
    // 退出登录
    logout() {
      this.resetUserInfo()
      clearUserToken()
    },
  },
})
