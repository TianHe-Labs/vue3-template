import { loadEnv } from 'vite'

// https://cn.vitejs.dev/config/server-options.html#server-proxy
// VITE_DEV_PROXY=[["/api", "http://127.0.0.1:3000/api"]]
// 要使用 JSON.parse 解析，因此必须使用双引号
export function createProxy() {
  const proxyRaw = loadEnv('development', process.cwd()).VITE_DEV_PROXY
  console.log('proxyRaw', proxyRaw)
  const proxyArr = JSON.parse(proxyRaw || '[]')
  const proxyObj: Record<string, object> = {}

  proxyArr.forEach((item: string[]) => {
    const [prefix, target] = item
    const httpsRe = /^https:\/\//
    const isHttps = httpsRe.test(target)
    proxyObj[prefix] = {
      target,
      changeOrigin: true,
      ws: true,
      rewrite: (path: string) => path.replace(new RegExp(`^${prefix}`), ''),
      ...(isHttps ? { secure: false } : {}),
    }
  })

  return proxyObj
}
