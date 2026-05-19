<template>
  <view class="page">
    <view class="card">
      <view class="h">⏱ 课时时长</view>
      <view>
        <text v-for="d in durations" :key="d"
              :class="['chip', duration===d && 'on']"
              @tap="duration=d">{{ d }} 分钟</text>
      </view>
    </view>

    <view class="h2">💰 选择套餐</view>
    <view v-for="p in packages" :key="p.id"
          :class="['pkg', picked?.id===p.id && 'on']"
          @tap="picked=p">
      <view class="row-b">
        <text class="name">{{ p.name }}
          <text class="save" v-if="p.sessionCount>1">省 ¥{{ saving(p) }}</text>
        </text>
        <text class="price">¥{{ Number(p.totalPrice).toFixed(0) }}</text>
      </view>
      <view class="muted">¥{{ unit(p) }}/节 · {{ p.validDays }}天有效</view>
    </view>

    <view style="height:140rpx"></view>
    <view class="footer">
      <view>
        <text class="muted">合计</text>
        <text class="price"> ¥{{ picked ? Number(picked.totalPrice).toFixed(0) : 0 }}</text>
      </view>
      <button class="btn btn-pri" :disabled="!picked" @tap="goPay">去支付</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { api } from '@/api';

const durations = [40, 60, 90];
const duration = ref(60);
const packages = ref([]);
const picked = ref(null);
let courseId;

onLoad(async (q) => {
  courseId = q.courseId;
  const d = await api.courseDetail(courseId);
  packages.value = d.course.packages || [];
  picked.value = packages.value[1] || packages.value[0];
});

const unit = (p) => (Number(p.totalPrice) / p.sessionCount).toFixed(0);
const saving = (p) => {
  const base = packages.value.find(x => x.sessionCount === 1);
  if (!base) return 0;
  return (base.totalPrice * p.sessionCount - p.totalPrice).toFixed(0);
};
const goPay = () => {
  if (!picked.value) return;
  uni.navigateTo({ url: `/pages/order/pay?packageId=${picked.value.id}` });
};
</script>

<style lang="scss" scoped>
.page { padding: 24rpx; padding-bottom: 140rpx; }
.card { background: #fff; border-radius: 20rpx; padding: 24rpx; margin-bottom: 24rpx; }
.h { font-weight: 600; margin-bottom: 16rpx; }
.h2 { font-weight: 600; padding: 0 8rpx; margin-bottom: 16rpx; }
.pkg {
  padding: 26rpx; border: 3rpx solid #eee; border-radius: 20rpx;
  margin-bottom: 18rpx; background: #fff;
}
.pkg.on { border-color: #4f7cff; background: linear-gradient(0deg, #f0f4ff, #fff); }
.name { font-weight: 600; font-size: 28rpx; }
.save { background: #ff5e62; color: #fff; padding: 2rpx 14rpx; border-radius: 16rpx; font-size: 20rpx; margin-left: 8rpx; }
.row-b { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8rpx; }
.muted { color: #999; font-size: 22rpx; }
.price { color: #ff5e62; font-weight: 700; font-size: 32rpx; }
.footer {
  position: fixed; bottom: 0; left: 0; right: 0; background: #fff;
  padding: 20rpx; display: flex; justify-content: space-between; align-items: center;
  border-top: 1rpx solid #eee;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
}
.chip {
  display: inline-block; padding: 12rpx 28rpx; background: #f6f7fb;
  border-radius: 28rpx; font-size: 26rpx; margin-right: 16rpx;
}
.chip.on { background: #4f7cff; color: #fff; }
</style>
