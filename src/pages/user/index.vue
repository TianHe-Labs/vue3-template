<script lang="ts" setup></script>

<template>
  <div flex-auto container mx-auto mb-10>
    <Breadcrumb :items="['用户中心']" />
    <Breadcrumb :items="[{ name: 'Layout', title: '首页' }, '用户中心']" />
    <div>用户中心</div>
  </div>
</template>
