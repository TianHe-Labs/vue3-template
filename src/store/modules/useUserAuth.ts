import type { Ref } from 'vue'
import { StorageSerializers } from '@vueuse/core'
import { axios } from '@/lib/plugins'
import { useDynamicRoute } from '@/store/modules/useDynRoute'
import { resetRouter } from '@/router/router-resetor'

interface UserInfo {
  username: string | null
  permissions: string[]
}

interface UserToken {
  access_token: string | null
  refresh_token: string | null
}

// note when you provide null as the default value, useStoragecan't assume the data type from it.
// In this case, you can provide a custom serializer or reuse the built-in ones explicitly.
export const useUserAuth = defineStore('userAuth', () => {
  const userInfo: Ref<Nullable<UserInfo>> = useStorage(
    'userInfo',
    null,
    sessionStorage,
    { serializer: StorageSerializers.object }
  )

  const userToken: Ref<Nullable<UserToken>> = useStorage(
    'userToken',
    null,
    sessionStorage,
    { serializer: StorageSerializers.object }
  )

  async function signIn(authFormData: AuthForm) {
    try {
      const { /* status,  */ data } = await axios.post('/mock/auth', {
        ...authFormData,
      })
      const { state } = data
      if (state && state === 800) {
        const { username, permissions, access_token, refresh_token } =
          data.payload
        userInfo.value = { username, permissions }
        userToken.value = { access_token, refresh_token }
      }
      return Promise.resolve(data)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  const { setFlag4GenRoutes, resetAccessRoutes } = useDynamicRoute()

  function signOut() {
    userInfo.value = null
    userToken.value = null
    localStorage.clear()
    resetRouter()
    resetAccessRoutes()
    setFlag4GenRoutes(false)
  }

  return { userInfo, userToken, signIn, signOut }
})
