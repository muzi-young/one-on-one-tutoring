<template>
  <view class="page">
    <view class="poster">
      <view class="hint">🎁 邀请你一起学</view>
      <view class="title">{{ data?.course?.title || '高分一对一·名师 1V1' }}</view>
      <view class="sub" v-if="data?.user">推荐人：{{ data.user.nickname }}</view>
      <view class="price-row" v-if="data?.course">¥{{ data.course.price }}<text class="unit">起/节</text></view>
      <view class="qr">📱</view>
      <view class="sub">扫码注册立得 ¥100 优惠券</view>
      <view class="code">邀请码：{{ data?.inviteCode }}</view>
    </view>

    <view class="card">
      <view class="h">🎁 分享激励</view>
      <view class="line">✅ 好友通过你的海报注册：双方各得 ¥20 优惠券</view>
      <view class="line">✅ 好友首次购课：你获得 10% 佣金返现</view>
      <view class="line">✅ 累计邀请 5 人：奖励免费试听 1 节</view>
    </view>

    <view class="row" style="gap:20rpx;justify-content:center;margin-top:30rpx">
      <button class="btn btn-out" @tap="save">⬇ 保存海报</button>
      <button open-type="share" class="btn btn-pri">💚 微信分享</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { api } from '@/api';

const data = ref(null);
onShow(async () => {
  try { data.value = await api.poster({ courseId: 1 }); } catch(e) {}
});
const save = () => uni.showToast({ title: '海报已保存', icon: 'none' });
</script>

<style lang="scss" scoped>
.page { padding: 24rpx; }
.poster {
  padding: 40rpx 30rpx; border-radius: 24rpx; color: #fff; text-align: center;
  background: linear-gradient(160deg, #6a5af9, #4f7cff, #43c6ac);
  margin-bottom: 24rpx;
}
.hint { font-size: 24rpx; opacity: .85; }
.title { font-size: 38rpx; font-weight: 700; margin: 16rpx 0; }
.sub { font-size: 22rpx; opacity: .9; }
.price-row { font-size: 50rpx; font-weight: 700; margin-top: 20rpx; }
.price-row .unit { font-size: 24rpx; opacity: .85; font-weight: 400; }
.qr {
  width: 180rpx; height: 180rpx; background: #fff; color: #333;
  border-radius: 16rpx; margin: 24rpx auto;
  font-size: 60rpx; display: flex; align-items: center; justify-content: center;
}
.code {
  margin-top: 16rpx; background: rgba(255,255,255,.2);
  display: inline-block; padding: 8rpx 20rpx; border-radius: 16rpx; font-size: 24rpx;
}
.card { background: #fff; border-radius: 20rpx; padding: 24rpx; }
.h { font-weight: 600; margin-bottom: 14rpx; }
.line { font-size: 24rpx; color: #555; line-height: 1.8; }
.row { display: flex; align-items: center; }
</style>
