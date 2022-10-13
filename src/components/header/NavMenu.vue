<script lang="ts" setup>
import { RouterLink } from 'vue-router'
import { MenuOption } from 'naive-ui'
import { useStore } from '@/store'

const { dynRoute } = useStore()

const activeNavMenu = ref('')

const navMenuOptions = computed<MenuOption[]>(() =>
  dynRoute.menuRoutes.map((menuItem) => {
    const { name, meta } = menuItem
    return {
      key: name as string,
      label: () =>
        h(
          RouterLink,
          {
            to: {
              name: name as string,
            },
          },
          { default: () => meta.title }
        ),
    }
  })
)
</script>

<template>
  <n-menu
    v-model:value="activeNavMenu"
    mode="horizontal"
    :options="navMenuOptions"
  />
</template>
