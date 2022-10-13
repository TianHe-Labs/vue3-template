const appMetaSymbol = Symbol()

interface AppMetaCtx {
  appName: string
  appDesc: string
  appCopr: string
}

export function provideAppMeta(): AppMetaCtx {
  const appName = import.meta.env.VITE_APP_NAME
  const appDesc = import.meta.env.VITE_APP_DESC
  const appCopr = import.meta.env.VITE_APP_COPR

  provide(appMetaSymbol, {
    appName,
    appDesc,
    appCopr,
  })

  return { appName, appDesc, appCopr }
}

export function useAppMeta(): AppMetaCtx {
  return inject(appMetaSymbol) as AppMetaCtx
}
