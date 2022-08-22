import type { Router } from 'vue-router'

export function createLoadingGuard(router: Router) {
  router.beforeEach(() => {
    // pass
  })

  router.afterEach(() => {
    setTimeout(() => {
      // pass
    }, 200)
  })

  router.onError(() => {
    // pass
  })
}
