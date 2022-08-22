import App from './App.vue'
import { setupStore } from './store'
import { setupRouter } from './router'

import './styles'

function bootstrap() {
  const app = createApp(App)

  setupStore(app)

  setupRouter(app)

  app.mount('#app')
}

bootstrap()
