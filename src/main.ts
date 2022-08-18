import App from './App.vue'
import store from './store'
import router from './router'

import { createNaviGuards } from './router/navi-guards'

import './styles'

const app = createApp(App)
app.use(store)
app.use(router)

// pinia 需要先挂载，才能使用
// （分模块 install，不进行全局 install）
// 暂时这么处理，之后再优化这段 ugly 代码
createNaviGuards()

app.mount('#app')
