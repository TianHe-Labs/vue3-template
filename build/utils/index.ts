// 处理环境变量

declare type Env = string | boolean | number | Recordable<string>

export function envWrapper(envConf: Recordable<string>): ImportMetaEnv {
  const ret = <ImportMetaEnv>{}

  for (const itemName in envConf) {
    const itemVal = envConf[itemName].replace(/\\n/g, '\n')
    let cleanedVal: Env =
      itemVal === 'true' ? true : itemVal === 'false' ? false : itemVal
    // number
    if (itemName === 'VITE_APP_PORT') {
      cleanedVal = Number(itemVal)
    }
    // object
    if (itemName === 'VITE_APP_PROXY') {
      try {
        cleanedVal = JSON.parse(itemVal)
      } catch (error) {
        // pass
      }
    }

    ret[itemName] = cleanedVal
    process.env[itemName] = itemVal
  }

  return ret
}
