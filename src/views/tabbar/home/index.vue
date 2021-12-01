<template>
    <div>
      {{a}}
      <a-rate v-model:value="value" />
    </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup () {
    const value = ref<number>(2)
    const n = () => {
      axios.get('/api/name', {
        params: {
          name: 12345
        }
      }).then(res => {
        console.log(res)
      }).catch(errer => {
        console.log(errer)
      })
    }
    n()
    return {
      value
    }
  },
  data () {
    return {
      a: 577
    }
  }
})
</script>

<style>

</style>
