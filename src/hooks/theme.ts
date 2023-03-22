import type { Ref } from 'vue'
import type { GlobalTheme, GlobalThemeOverrides } from 'naive-ui'
import { zhCN, dateZhCN, darkTheme } from 'naive-ui'
import { StorageSerializers } from '@vueuse/core'

const themeSymbol = Symbol('THEME')

interface themeCtx {
  theme: Ref<Nullable<GlobalTheme>>
  themeOverrides: GlobalThemeOverrides
  zhCN: any
  dateZhCN: any
  onSwitchTheme: () => void
}

export function provideTheme(): themeCtx {
  const theme = useStorage<Nullable<GlobalTheme>>('theme', null, localStorage, {
    serializer: StorageSerializers.object,
  })
  /*
    Please note when you provide null as the default value, useStoragecan't assume the data type from it. In this case, you can provide a custom serializer or reuse the built-in ones explicitly.
  */

  const themeOverrides: GlobalThemeOverrides = {
    common: {
      primaryColor: '#6366f1',
      primaryColorHover: '#8183f4',
      primaryColorPressed: '#5457cd',
      primaryColorSuppl: '#8183f4',
      // infoColor: '#2080f0',
      // infoColorHover: '#4098fc',
      // infoColorPressed: '#1060c9',
      // infoColorSuppl: '#4098fc',
      successColor: '#22c55e',
      successColorHover: '#45d174',
      successColorPressed: '#16a34a',
      successColorSuppl: '#45d174',
      warningColor: '#f59e0b',
      warningColorHover: '#ffbb33',
      warningColorPressed: '#d97706',
      warningColorSuppl: '#ffbb33',
      errorColor: '#ef4444',
      errorColorHover: '#fc746f',
      errorColorPressed: '#dc2626',
      errorColorSuppl: '#fc746f',
      // textColorBase: '#000',
      // textColor1: 'rgb(31, 34, 37)',
      // textColor2: 'rgb(51, 54, 57)',
      // textColor3: 'rgb(118, 124, 130)',
      // textColorDisabled: 'rgba(194, 194, 194, 1)',
      // placeholderColor: 'rgba(194, 194, 194, 1)',
      // placeholderColorDisabled: 'rgba(209, 209, 209, 1)',
      // iconColor: 'rgba(194, 194, 194, 1)',
      // iconColorHover: 'rgba(146, 146, 146, 1)',
      // iconColorPressed: 'rgba(175, 175, 175, 1)',
      // iconColorDisabled: 'rgba(209, 209, 209, 1)',
      // dividerColor: 'rgb(239, 239, 245)',
      // borderColor: 'rgb(224, 224, 230)',
      // tableHeaderColor: 'rgb(250, 250, 252)',
    },
    DataTable: {
      paginationMargin: '16px 12px',
      peers: {
        Pagination: {},
      },
    },
  }

  const handlers = {
    onSwitchTheme() {
      if (theme.value) {
        theme.value = null
      } else {
        theme.value = darkTheme
      }
    },
  }

  provide(themeSymbol, {
    theme,
    themeOverrides,
    zhCN,
    dateZhCN,
    ...handlers,
  })

  return { theme, themeOverrides, zhCN, dateZhCN, ...handlers }
}

export function useTheme(): themeCtx {
  return inject(themeSymbol) as themeCtx
}
