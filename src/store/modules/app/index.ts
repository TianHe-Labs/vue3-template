import defaultSettings from '@/settings.json'
import { AppState } from './types'

export const useAppStore = defineStore('app', {
  state: (): AppState => {
    return {
      ...defaultSettings,
      name: import.meta.env.VITE_APP_NAME,
      description: import.meta.env.VITE_APP_DESC,
      copyright: import.meta.env.VITE_APP_COPR || '天合安全',
    }
  },

  getters: {
    appSettings(state: AppState): AppState {
      return { ...state }
    },
    appName(state: AppState) {
      return state.name
    },
    appDesc(state: AppState) {
      return state.description
    },
    appCopr(state: AppState) {
      return state.copyright
    },
  },

  actions: {
    // 更新
    setSettings(parital: Partial<AppState>) {
      this.$patch(parital)
    },
    // 重置
    resetSettings() {
      this.$reset()
    },
  },
})
