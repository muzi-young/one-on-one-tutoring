<template>
  <view class="page">
    <view class="wallet">
      <text class="sub">💰 佣金账户余额</text>
      <view class="amt">¥ {{ user?.walletCommission || 0 }}</view>
      <view class="row" style="gap:20rpx;margin-top:20rpx">
        <button class="btn-ghost">提现</button>
        <button class="btn-ghost">明细</button>
      </view>
    </view>

    <view class="h">优惠券 ({{ unused.length }})</view>
    <view v-for="c in unused" :key="c.id" class="coupon">
      <view class="left">
        <view class="num" v-if="c.coupon.type==='cash'">¥{{ c.coupon.amount }}</view>
        <view class="num" v-else>{{ (c.coupon.amount*10).toFixed(1) }}折</view>
        <text class="small">{{ Number(c.coupon.threshold)>0 ? `满${c.coupon.threshold}可用` : '无门槛' }}</text>
      </view>
      <view class="right">
        <view class="t">{{ c.coupon.name }}</view>
        <view class="muted">有效期至 {{ formatDate(c.expireAt) }}</view>
        <button class="btn btn-pri small">立即使用</button>
      </view>
    </view>
    <view v-if="!unused.length" class="muted" style="text-align:center;padding:60rpx 0">暂无可用优惠券</view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { api } from '@/api';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
const user = computed(() => userStore.user);
const list = ref([]);
const unused = computed(() => list.value.filter(x => x.status === 'unused'));
const formatDate = (d) => new Date(d).toLocaleDateString('zh-CN');

onShow(async () => {
  await userStore.fetchMe();
  list.value = await api.myCoupons();
});
</script>

<style lang="scss" scoped>
.page { padding: 24rpx; }
.wallet {
  background: linear-gradient(135deg, #4f7cff, #6a5af9); color: #fff;
  border-radius: 24rpx; padding: 30rpx; margin-bottom: 30rpx;
}
.sub { font-size: 24rpx; opacity: .85; }
.amt { font-size: 56rpx; font-weight: 700; margin: 12rpx 0; }
.btn-ghost {
  background: rgba(255,255,255,.2); color: #fff; border: none;
  padding: 12rpx 24rpx; border-radius: 28rpx; font-size: 24rpx;
}
.h { font-weight: 600; padding: 0 8rpx; margin-bottom: 16rpx; }
.coupon {
  display: flex; background: #fff; border-radius: 20rpx; overflow: hidden;
  margin-bottom: 20rpx; box-shadow: 0 2rpx 12rpx rgba(0,0,0,.04);
}
.coupon .left {
  width: 200rpx; background: linear-gradient(135deg, #ff5e62, #ff9966); color: #fff;
  display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20rpx;
}
.coupon .num { font-size: 48rpx; font-weight: 700; }
.coupon .small { font-size: 20rpx; opacity: .9; }
.coupon .right { flex: 1; padding: 20rpx; }
.coupon .t { font-weight: 600; margin-bottom: 6rpx; }
.muted { color: #999; font-size: 22rpx; }
.btn.small { padding: 8rpx 20rpx; font-size: 22rpx; margin-top: 12rpx; }
.row { display: flex; align-items: center; }
</style>
