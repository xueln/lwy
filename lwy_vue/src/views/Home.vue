<template>
  <div>
      <my-header></my-header>
      <!-- 组件缓存 -->
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
      <my-footer></my-footer>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>