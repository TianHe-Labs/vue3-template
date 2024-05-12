export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    username: undefined,
    role: undefined,
    accessToken: undefined,
    refreshToken: undefined,
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
        if (!data?.accessToken || !data?.refreshToken) {
          throw new Error(data.message)
        }
        this.setUserInfo(data)
      } catch (err) {
        this.resetUserInfo()
        throw err
      }
    },
    // 获取用户信息
    async queryUserInfo() {
      try {
        const { data } = await axios.get('/api/user/info')
        this.setUserInfo(data)
      } catch (err) {
        this.resetUserInfo()
        throw err
      }
    },
    // 刷新令牌
    async updateUserToken() {
      if (!this.$state?.refreshToken) {
        this.resetUserInfo()
        return
      }
      try {
        const { data } = await axios.request({
          url: '/api/user/refresh',
          method: 'get',
          headers: {
            Authorization: `Bearer ${this.$state?.refreshToken}`,
          },
        })
        this.setUserInfo(data)
      } catch (err) {
        this.resetUserInfo()
        throw err
      }
    },
    // 退出登录
    logout() {
      this.resetUserInfo()
    },
  },

  persist: {
    key: '__th_ls_usr__',
    paths: ['accessToken', 'refreshToken'],
  },
})
