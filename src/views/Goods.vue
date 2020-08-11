<template>
  <div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'Goods'
}
</script>

<style lang="less" scoped>
/* fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
