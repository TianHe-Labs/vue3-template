import defaultSettings from '@/settings.json'

export const useAppStore = defineStore('app', {
  state: (): AppState => {
    const { VITE_APP_NAME: name, VITE_APP_DESC: desc } = import.meta.env
    return { ...defaultSettings, name, desc }
  },

  actions: {
    // 更新
    updateSettings(parital: Partial<AppState>) {
      this.$patch(parital)
    },
  },
})
