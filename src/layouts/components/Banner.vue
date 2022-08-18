<template>
  <div
    position="relative"
    h="[236px]"
    bg="center cover no-repeat"
    before:content="[]"
    before:position="absolute inset-0"
    class="content__banner"
  ></div>
</template>

<style lang="sass" scoped>
.content__banner
  background-image: url('@/assets/banner.png')
  &:before
    background: linear-gradient(177.17deg, rgba(34, 34, 34, 0.01) -1.46%, rgba(34, 34, 34, 0.43) 49.83%, rgba(35, 35, 35, 0.90) 98.28%)
</style>
