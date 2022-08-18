const appMetaSymbol = Symbol()

interface AppMetaCtx {
  appName: string
  appDesc: string
}

export function provideAppMeta(): AppMetaCtx {
  const appName = import.meta.env.VITE_APP_NAME
  const appDesc = import.meta.env.VITE_APP_DESC

  provide(appMetaSymbol, {
    appName,
    appDesc,
  })

  return { appName, appDesc }
}

export function useAppMeta(): AppMetaCtx {
  return inject(appMetaSymbol) as AppMetaCtx
}
