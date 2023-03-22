<script lang="ts" setup>
import Header from './components/header.vue'
import Banner from './components/banner.vue'

import { provideSearchCondition } from '@/components/top-search/searchCondition'
import { provideSearchResult } from '@/components/top-search/searchResult'

const { queryKeyword } = provideSearchCondition()
provideSearchResult(queryKeyword)
</script>

<template>
  <n-layout h="screen" :native-scrollbar="false">
    <Header />
    <n-layout-content min-h="screen" p="b-12" class="layout__content">
      <Banner />
      <div pos="relative" container="~" m="x-auto" overflow="hidden">
        <router-view v-slot="{ Component }">
          <transition :duration="200" name="fade-top" mode="out-in">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </n-layout-content>
    <Footer />
  </n-layout>
</template>
