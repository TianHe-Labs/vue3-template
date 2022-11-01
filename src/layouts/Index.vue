<script lang="ts" setup>
import Header from './components/Header.vue'
import Banner from './components/Banner.vue'
import Footer from './components/Footer.vue'

import {
  provideSearchCondition,
  provideSearchResult,
  provideSignature,
} from '@/lib/providers'

const { queryKeyword } = provideSearchCondition()

provideSearchResult(queryKeyword)

provideSignature()
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
