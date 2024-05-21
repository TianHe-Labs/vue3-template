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
        this.setUserInfo({ username: authFormData.username, ...data })
      } catch (err) {
        this.resetUserInfo()
        throw err
      }
    },
    // 获取用户信息
    // 有时候业务简单，单用户系统没有身份值等用户信息，甚至没有相关接口
    // 为了保证业务可用，本地增加一个或者使用本地模拟接口
    // 或者在路由守卫中不判断身份
    async queryUserInfo() {
      try {
        const { data } = await axios.get('/api/user/info')
        this.setUserInfo({ ...data, role: data?.role || 'admin' })
      } catch (err: any) {
        if (err?.isAxiosError) {
          // axios 拦截统一处理了返回结果
          // 如果该接口 404，则认为是单用户系统，没有用户信息
          this.setUserInfo({ role: 'admin' })
        } else {
          this.resetUserInfo()
          throw err
        }
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
