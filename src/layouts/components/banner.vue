<template>
  <div
    pos="relative"
    h="64"
    m="-b-20"
    bg="center cover no-repeat"
    before:position="absolute inset-0"
    class="layout__banner"
  ></div>
</template>

<style lang="sass" scoped>
.layout__banner
  background-image: url('@/assets/banner.png')
  &:before
    content: ''
    background: linear-gradient(177.17deg, rgba(34, 34, 34, 0.01) -1.46%, rgba(34, 34, 34, 0.43) 49.83%, rgba(35, 35, 35, 0.90) 98.28%)
</style>
