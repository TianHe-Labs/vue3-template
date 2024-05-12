import type { PiniaPluginContext } from 'pinia'
import hmacSha1 from 'crypto-js/hmac-sha1'
import Base64 from 'crypto-js/enc-base64'

// utf-8 -> latin1
function encoder(str: string, encoding = 'utf-8') {
  if (encoding === 'utf-8') {
    return str
  }

  // 使用 TextEncoder 默认转换为 UTF-8 编码的 Uint8Array
  const utf8Encoder = new TextEncoder()
  const utf8Array = utf8Encoder.encode(str)

  // 使用 TextDecoder 转换 UTF-8 Uint8Array 为 latin1 字符串
  // 注意：浏览器可能不直接支持 'latin1'，使用 'iso-8859-1' 作为替代
  const latin1Decoder = new TextDecoder('iso-8859-1')
  const latin1String = latin1Decoder.decode(utf8Array)

  return latin1String
}

export const useOssStore = defineStore('oss', {
  state: (): OssState => {
    return {
      region: 'oss-cn-beijing',
      bucket: 'baihe-beijing',
      accessKeyId: undefined,
      accessKeySecret: undefined,
      securityToken: undefined,
      expiration: undefined,
    }
  },

  getters: {},

  actions: {
    // 更新
    setOssToken(partial: Partial<OssState>) {
      this.$patch(partial)
    },
    // 重置
    resetOssToken() {
      this.$reset()
    },
    async queryOssToken() {
      try {
        const { data } = await axios.get('/sts')
        console.log(data)
        this.setOssToken(data)
      } catch (err) {
        this.resetOssToken()
        throw err
      }
    },

    signatureUrl(url: string, options?: any) {
      if (
        !this.$state.accessKeyId ||
        !this.$state.accessKeySecret ||
        !this.$state.securityToken
      ) {
        return ''
      }

      options = options || {}
      const method = options.method || 'GET'
      const expires = Math.floor(Date.now() / 1000 + (options.expires || 1800))

      const { hostname, pathname } = new URL(url)
      const bucket = hostname.split('.')?.[0]
      const object = pathname.replace(/^\/+/, '')
      const resource = `/${bucket}/${encoder(object)}`

      // 构造待签名的字符串
      const canonicalResource = `${method}\n\n\n${expires}\n${resource}?security-token=${this.$state.securityToken}`

      // 使用HMAC-SHA1算法生成签名
      const signature = Base64.stringify(
        hmacSha1(canonicalResource, this.$state.accessKeySecret)
      )

      // 构造完整的URL
      const signedUrl = `/media${pathname}?OSSAccessKeyId=${
        this.$state.accessKeyId
      }&Expires=${expires}&Signature=${encodeURIComponent(
        signature
      )}&security-token=${encodeURIComponent(this.$state.securityToken)}`

      return signedUrl
    },
  },

  persist: {
    key: '__th_ls_oss__',
    storage: sessionStorage,
    afterRestore: (ctx: PiniaPluginContext) => {
      if (
        !ctx.store.accessKeyId ||
        new Date() >= new Date(ctx.store.$state.expiration) // 过期自动更新
      ) {
        ctx.store.queryOssToken()
      }
    },
  },
})
