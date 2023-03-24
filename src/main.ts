import App from './App.vue'
import store from './store'
import router from './router'

import './plugins/axios'
import './styles'

const app = createApp(App)

app.use(router)

app.use(store)

app.mount('#app')
