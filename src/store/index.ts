import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// pinia 需要先挂载，才能使用
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate) // 持久化

export default pinia

export * from './modules/app'
export * from './modules/user'
export * from './modules/route'
export * from './modules/oss'
