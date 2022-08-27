import Client from 'ali-oss'
import { useMessage } from 'naive-ui'
import { isEmpty } from 'lodash-es'

interface SignShotCtx {
  signSTSURI: (unsignedURI: string) => Promise<string>
}

const snapshotSymbol = Symbol()

const serializer = {
  read: (v: any) => {
    try {
      const parsed = JSON.parse(v)

      if (isEmpty(parsed)) return null

      const { Expiration, ...otherArgs } = parsed
      const now = new Date().getTime()
      // 判断有没有过期
      const endTime = new Date(Expiration).getTime()
      const delta = now - endTime

      if (delta >= 0) {
        sessionStorage.removeItem('OssAccessToken')
        return null
      }

      return {
        Expiration,
        ...otherArgs,
      }
    } catch (err) {
      return null
    }
  },
  write: (v: any) => JSON.stringify(v),
}

export function provideSignature(): SignShotCtx {
  const ossAccessToken = useStorage<OssAccessToken>(
    'OssAccessToken',
    null,
    sessionStorage,
    {
      serializer,
    }
  )

  const store = shallowRef<Client>()

  const messageCtx = useMessage()

  const handlers = {
    async fetchSTSToken() {
      try {
        const { /* status, */ data } = await axios.get<OssAccessToken>(
          '/oss/sts'
        )
        ossAccessToken.value = data
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if ((err.response?.data as AxiosResData)?.state) {
            const { state, msg } = err.response?.data as AxiosResData
            messageCtx.error(`[${state}]${msg}`)
          } else {
            messageCtx.error(`[${err.response?.status}]${err.message}`)
          }
        } else {
          messageCtx.error('[908]STS服务异常，请联系管理员！')
        }
      }
    },
    resetSTSToken() {
      ossAccessToken.value = null
    },
    createClient() {
      store.value = new Client({
        accessKeyId: ossAccessToken.value.AccessKeyId,
        accessKeySecret: ossAccessToken.value.AccessKeySecret,
        stsToken: ossAccessToken.value.SecurityToken,
        region: 'oss-cn-beijing',
        bucket: 'baihe-beijing',
      })
    },
    async signSTSURI(unsignedURI: string) {
      if (!ossAccessToken.value) {
        await handlers.fetchSTSToken()
        handlers.createClient()
      }

      if (!store.value) {
        await handlers.createClient()
      }

      const signedURI = unsignedURI
        ? store.value?.signatureUrl(unsignedURI.substring(49)).substring(49)
        : ''

      return signedURI ? `/assets/media/${signedURI}` : ''
    },
  }

  // onBeforeMount(async () => {
  //   handlers.createStore()
  // })

  provide(snapshotSymbol, {
    signSTSURI: handlers.signSTSURI,
  })

  return {
    signSTSURI: handlers.signSTSURI,
  }
}

export function useSignature(): SignShotCtx {
  return inject(snapshotSymbol) as SignShotCtx
}
