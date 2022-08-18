import Client from 'ali-oss'

interface SignShotCtx {
  signSTSURI: (unsignedURI: string) => Promise<string>
}

const snapshotSymbol = Symbol()

export function provideSignature(): SignShotCtx {
  const accessKeyId = useStorage('accessKeyId', '')
  const accessKeySecret = useStorage('accessKeySecret', '')
  const stsToken = useStorage('stsToken', '')

  const store = shallowRef<Client>()

  const handlers = {
    async fetchSTSToken() {
      try {
        const { /* status, */ data } = await axios.get<STSData>('/oss/sts')
        // console.log(data)
        const { AccessKeyId, AccessKeySecret, SecurityToken } = data
        accessKeyId.value = AccessKeyId
        accessKeySecret.value = AccessKeySecret
        stsToken.value = SecurityToken
      } catch (err) {
        // pass
      }
      return {
        accessKeyId: accessKeyId.value,
        accessKeySecret: accessKeySecret.value,
        stsToken: stsToken.value,
      }
    },
    resetSTSToken() {
      accessKeyId.value = null
      accessKeySecret.value = null
      stsToken.value = null
    },
    async createClient() {
      if (!accessKeyId.value || !accessKeySecret.value || !stsToken.value) {
        await handlers.fetchSTSToken()
      }
      store.value = new Client({
        accessKeyId: accessKeyId.value,
        accessKeySecret: accessKeySecret.value,
        stsToken: stsToken.value,
        region: 'oss-cn-beijing',
        bucket: 'baihe-beijing',
        refreshSTSToken: handlers.fetchSTSToken,
      })
    },
    async signSTSURI(unsignedURI: string) {
      // ali-oss v6.x 不支持 tree-shaking
      // ali-oss-sdk v7.x.beta 已支持 tree-shaking
      // https://www.npmjs.com/package/ali-oss-sdk

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
