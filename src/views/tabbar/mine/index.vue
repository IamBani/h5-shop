<template>
  <div class="mine">
    <div class="flex justify-between align-center image">
      <div class="flex align-center">
        <van-image round width="80" height="80" :src="src" class="mr10" />
        <div v-if="!checkLogin" class="fs-white">立即登陆</div>
        <div v-else></div>
      </div>
      <van-icon color="#fff" name="arrow" />
    </div>
    <div>
      <van-cell-group>
        <van-cell title="我的订单" is-link>
          <template #icon>
            <van-icon name="label" class-prefix="pex-icon van-icon" />
          </template>
        </van-cell>
        <van-grid>
          <van-grid-item icon="cart-circle-o" text="待支付" />
          <van-grid-item icon="gift-o" text="待收货" />
          <van-grid-item icon="comment-o" text="待评价" />
          <van-grid-item icon="cash-back-record" text="售后/退款" />
        </van-grid>
      </van-cell-group>
      <van-cell-group class="mt10">
        <van-cell title="我的优惠卷" is-link>
          <template #icon>
            <van-icon name="gold-coin" class-prefix="pex-icon van-icon" />
          </template>
        </van-cell>
        <van-cell title="我的收获地址"   is-link>
          <template #icon>
            <van-icon name="location" class-prefix="pex-icon van-icon" />
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group class="mt10 mb10">
       <van-cell  is-link>
         <template #title>
            <span class="mr5">我的绿卡</span>
            <van-tag type="danger" round>NEW</van-tag>
          </template>
          <template #icon>
            <van-icon name="vip-card" class-prefix="pex-icon van-icon" />
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group>
       <van-cell title="联系客服"  value="客服时间 07:00-22:00"  is-link>
          <template #icon>
            <van-icon name="phone" class-prefix="pex-icon van-icon" />
          </template>
        </van-cell>
       <van-cell title="意见反馈"  is-link>
          <template #icon>
            <van-icon name="comment-circle" class-prefix="pex-icon van-icon" />
          </template>
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useImage from './use/useImage'
import useCheckingLogin from '@/use/useCheckingLogin'
import grey from '@/assets/image/grey.jpg'
export default defineComponent({
  setup () {
    const src = ref('')
    const checkLogin = ref(false)
    src.value = useImage(grey)
    checkLogin.value = useCheckingLogin()
    return {
      src,
      checkLogin
    }
  }
})
</script>

<style lang="scss" scoped>
.mine {
  background-color: var(--van-gray-1);
  .image {
    background-color: var(--van-button-success-background-color);
    padding: 30px 20px;
  }
  ::v-deep .pex-icon {
    color: var(--van-button-success-background-color);
    height: var(--van-cell-line-height);
    line-height: var(--van-cell-line-height);
    font-size: 20px;
    margin-right: 2px;
  }
}
</style>
