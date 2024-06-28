import { inject, provide, computed, type Ref, ComputedRef } from 'vue'
import {
  zhCN,
  dateZhCN,
  darkTheme,
  type GlobalTheme,
  type GlobalThemeOverrides,
} from 'naive-ui'
import { StorageSerializers } from '@vueuse/core'
import { merge } from 'lodash-es'

const themeSymbol = Symbol('THEME')

interface themeCtx {
  theme: Ref<Nullable<GlobalTheme>>
  themeOverrides: ComputedRef<GlobalThemeOverrides>
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

  const commonThemeOverrides = {
    DataTable: {
      paginationMargin: '16px 12px',
      thFontWeight: 500,
      peers: {
        Pagination: {},
      },
    },
  }

  const lightThemeOverrides = {
    common: {
      primaryColor: '#165dff',
      primaryColorHover: '#4080ff',
      primaryColorPressed: '#0e42d2',
      primaryColorSuppl: '#4080ff',
      tableHeaderColor: 'rgba(250, 250, 252, 0)',
      bodyColor: 'rgba(251, 251, 251, 0.95)',
    },
    // ...
  }

  const darkThemeOverrides = {
    common: {
      primaryColor: '#3c7eff',
      primaryColorHover: '#306fff',
      primaryColorPressed: '#689fff',
      primaryColorSuppl: '#1d4dd2',
      tableHeaderColor: 'rgba(250, 250, 252, 0)',
      bodyColor: 'rgba(16, 16, 20, 0.95)',
    },
    // ...
  }

  const themeOverrides = computed<GlobalThemeOverrides>(() =>
    merge(
      commonThemeOverrides,
      theme.value === null ? lightThemeOverrides : darkThemeOverrides
    )
  )

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
