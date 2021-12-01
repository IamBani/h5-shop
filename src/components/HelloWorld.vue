<template>
<div>
  <van-button size="small" type="primary" @click="tab">主要按钮</van-button>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useCurrentInstance from '@/use/useCurrentInstance'
export default defineComponent({
  setup () {
    const { proxy } = useCurrentInstance()
    const tab = () => {
      console.log(proxy)
      proxy.$toast.success('提示文案')
    }
    return {
      tab
    }
  }
})
</script>

<style>

</style>
