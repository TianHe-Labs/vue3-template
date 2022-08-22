import type { Router } from 'vue-router'

export function createTitleGuard(router: Router) {
  router.beforeEach(async (to) => {
    // 更新 title
    let subtitle = to.meta.title
    for (const key of ['domain', 'ipv4', 'org']) {
      if (to.params[key]) {
        subtitle = to.params[key] as string
        break
      }
    }
    document.title = `${subtitle}丨${import.meta.env.VITE_APP_NAME}`
  })
}
