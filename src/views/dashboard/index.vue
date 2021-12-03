<template>
  <router-view></router-view>
  <van-tabbar route v-model="active">
    <van-tabbar-item icon="wap-home-o" to="/dashboard/home">首页</van-tabbar-item>
    <van-tabbar-item icon="shop-collect-o" to="/dashboard/shop">商城</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" to="/dashboard/cart">购物车</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/dashboard/mine">我的</van-tabbar-item>
 </van-tabbar>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const active = ref(0)
    return {
      active
    }
  }
})
</script>

<style>

</style>
