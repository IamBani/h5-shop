<template>
  <div class="home">
    <div class="box">
      <span>{{ s }}</span>
    </div>
    <van-button type="primary">主要按钮</van-button>
    <span class="span">{{ s }}</span>
    <HelloWorld />
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, ref, reactive } from 'vue'

export default defineComponent({
  name: 'Home',
  setup () {
    const s = ref('postcss-pxtorem 字体不使用rem,个人中心页面搭建')
    const arr = reactive([])

    return {
      s
    }
  }
})
</script>
<style lang="scss" scoped>
.home {
  .box {
    height: 100px;
    width: 375px;
    box-sizing: border-box;
    border: 1px solid red;
  }
  .span {
    // font-size: 16PX;
  }
}
</style>
