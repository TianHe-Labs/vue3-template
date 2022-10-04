import type { Ref } from 'vue'
import { StorageSerializers } from '@vueuse/core'
import { axios } from '@/lib/plugins'
import { router, resetRouter } from '@/router'
import useDynamicRoute from './route'

export interface UserInfo {
  username: string | null
  permissions: string[]
}

export interface UserToken {
  access_token: string | null
  refresh_token: string | null
}

export default defineStore('userAuth', () => {
  const userInfo: Ref<Nullable<UserInfo>> = useStorage(
    'userInfo',
    null,
    localStorage,
    { serializer: StorageSerializers.object }
  )

  const userToken: Ref<Nullable<UserToken>> = useStorage(
    'userToken',
    null,
    localStorage,
    { serializer: StorageSerializers.object }
  )

  const { setFlag4GenRoutes, resetAccessRoutes } = useDynamicRoute()

  const handlers = {
    async signIn(authFormData: AuthFormData) {
      try {
        const { /* status,  */ data } = await axios.post<AxiosResData>(
          '/mock/auth',
          {
            ...authFormData,
          }
        )
        const { state, payload } = data
        if (state && state === 800) {
          const { username, permissions, access_token, refresh_token } = payload
          userInfo.value = { username, permissions }
          userToken.value = { access_token, refresh_token }
          return true
        }
        return false
      } catch (err) {
        return Promise.reject(err)
      }
    },
    signOut() {
      userInfo.value = null
      userToken.value = null
      localStorage.clear()
      resetRouter()
      resetAccessRoutes()
      setFlag4GenRoutes(false)
      router.push({ name: 'Auth' })
    },
    async refreshToken() {
      try {
        const { data } = await axios.post<AxiosResData>(
          `${import.meta.env.BASE_URL}api/refresh`,
          {},
          {
            headers: {
              token: userToken.value?.refresh_token as string,
            },
          }
        )
        const { state, payload } = data
        if (state === 800) {
          userToken.value = {
            access_token: payload.access_token,
            refresh_token: userToken.value?.refresh_token as string,
          }
          return true
        }
        return false
      } catch (err) {
        return false
      }
    },
  }

  return { userInfo, userToken, ...handlers }
})
