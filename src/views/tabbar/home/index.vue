<template>
    <div>
      {{arr}}
      <!-- <van-button type="primary" @click="api">获取</van-button> -->
      <!-- <svg-icon icon-name="wecharn" icon-class="abc" iconColor="red"></svg-icon> -->
    </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, reactive, ref } from 'vue'
// import svgIcon from '@/components/Svg.vue'
export default defineComponent({
  components: {
    // svgIcon
  },
  setup () {
    const value = ref<number>(2)
    const arr = reactive({ arr: [] })

    return {
      value,
      arr
    }
  }
})
</script>

<style lang="scss" scoped>
.abc{
  font-size: 30px;
  width: 2em;
  height: 2em;
  color: aqua !important;
}

</style>
