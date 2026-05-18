<template>
  <view class="page">
    <view class="card" v-if="order">
      <view class="muted">订单号</view>
      <view style="margin:8rpx 0">{{ order.orderNo }}</view>
      <view class="row-b"><text>商品金额</text><text>¥{{ order.totalAmount }}</text></view>
      <view class="row-b" v-if="Number(order.couponDiscount)>0"><text>优惠券</text><text style="color:#ff5e62">-¥{{ order.couponDiscount }}</text></view>
      <view class="row-b" v-if="Number(order.commissionDeduct)>0"><text>佣金抵扣</text><text style="color:#ff5e62">-¥{{ order.commissionDeduct }}</text></view>
      <view class="row-b dash"><text>实付</text><text class="price">¥{{ order.payAmount }}</text></view>
    </view>

    <view class="card">
      <view class="row-b"><text>支付方式</text><text style="color:#4f7cff">💚 微信支付</text></view>
    </view>

    <button class="btn btn-pri btn-block" @tap="pay" style="margin-top:30rpx">
      立即支付 ¥{{ order ? order.payAmount : 0 }}
    </button>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { api } from '@/api';

const order = ref(null);

onLoad(async (q) => {
  // 简化：进入页面即下单
  order.value = await api.createOrder({ packageId: Number(q.packageId) });
});

const pay = async () => {
  if (!order.value) return;
  uni.showLoading({ title: '支付中' });
  try {
    await api.payOrder({ orderId: order.value.id });
    uni.hideLoading();
    uni.showToast({ title: '✅ 支付成功' });
    setTimeout(() => {
      uni.redirectTo({
        url: `/pages/booking/index?orderId=${order.value.id}&teacherId=&courseId=${order.value.courseId}`
      });
    }, 600);
  } catch (e) {
    uni.hideLoading();
  }
};
</script>

<style lang="scss" scoped>
.page { padding: 24rpx; }
.card { background: #fff; border-radius: 20rpx; padding: 24rpx; margin-bottom: 24rpx; }
.row-b { display: flex; justify-content: space-between; align-items: center; margin-top: 14rpx; }
.row-b.dash { border-top: 2rpx dashed #eee; padding-top: 14rpx; margin-top: 18rpx; font-weight: 600; }
.muted { color: #999; font-size: 22rpx; }
.price { color: #ff5e62; font-weight: 700; font-size: 34rpx; }
</style>
