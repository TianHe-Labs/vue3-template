import type { Router } from 'vue-router'

import { createLoadingGuard } from './loading'
import { createTitleGuard } from './title'
import { createAccessGuard } from './access'

export default function setupRouterGuards(router: Router) {
  createLoadingGuard(router)
  createTitleGuard(router)
  createAccessGuard(router)
}
