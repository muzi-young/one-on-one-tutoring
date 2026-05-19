<template>
  <view class="page">
    <view v-for="o in list" :key="o.id" class="card">
      <view class="row-b">
        <text style="font-weight:600">{{ o.course?.title }}</text>
        <text class="tag" :class="statusTag(o.status)">{{ statusText(o.status) }}</text>
      </view>
      <view class="muted" style="margin-top:8rpx">{{ o.package?.name }} · 剩余 {{ o.remainSessions }} 课时</view>
      <view class="row-b" style="margin-top:14rpx">
        <text class="price">¥{{ o.payAmount }}</text>
        <text class="muted">{{ o.orderNo }}</text>
      </view>
    </view>
    <view v-if="!list.length" class="empty">还没有订单</view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { api } from '@/api';

const list = ref([]);
const statusText = (s) => ({ pending:'待支付', paid:'已支付', refunding:'退款中', refunded:'已退款', closed:'已关闭' }[s]);
const statusTag = (s) => ({ pending:'tag-orange', paid:'tag-green', refunding:'tag-red', refunded:'tag-red', closed:'tag-blue' }[s]);
onShow(async () => { list.value = await api.myOrders(); });
</script>

<style lang="scss" scoped>
.page { padding: 24rpx; }
.card { background: #fff; border-radius: 20rpx; padding: 24rpx; margin-bottom: 20rpx; }
.row-b { display: flex; justify-content: space-between; align-items: center; }
.muted { color: #999; font-size: 22rpx; }
.price { color: #ff5e62; font-weight: 700; font-size: 32rpx; }
.empty { text-align: center; color: #aaa; padding: 100rpx 0; }
</style>
