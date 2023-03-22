export * from './modules/app'
export * from './modules/user'
export * from './modules/route'

// pinia 需要先挂载，才能使用
const store = createPinia()

export default store
