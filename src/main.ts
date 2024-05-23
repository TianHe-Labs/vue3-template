import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

import './plugins/axios'

import './styles'

import '~/mock'

const app = createApp(App)

app.use(store)
app.use(router)

app.mount('#app')
