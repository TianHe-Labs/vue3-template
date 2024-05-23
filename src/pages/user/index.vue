<script lang="ts" setup></script>

<template>
  <div flex-auto container mx-auto px-4 py-8>
    <Breadcrumb :items="['用户中心']" />
    <Breadcrumb :items="[{ name: 'Layout', title: '首页' }, '用户中心']" />
    <div h-screen my-4>用户中心</div>
  </div>
</template>
