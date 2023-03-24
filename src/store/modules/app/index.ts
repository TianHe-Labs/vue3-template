import defaultSettings from '@/settings.json'

export const useAppStore = defineStore('app', {
  state: (): AppState => {
    return { ...defaultSettings }
  },

  getters: {
    appSettings(state: AppState): AppState {
      return { ...state }
    },
    appMeta(): AppMeta {
      const {
        VITE_APP_NAME: name,
        VITE_APP_DESC: desc,
        VITE_APP_COPR: copr,
      } = import.meta.env
      return { name, desc, copr }
    },
  },

  actions: {
    // 更新
    updateSettings(parital: Partial<AppState>) {
      this.$patch(parital)
    },
  },
})
