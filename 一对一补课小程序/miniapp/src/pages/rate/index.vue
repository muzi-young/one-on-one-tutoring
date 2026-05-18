<template>
  <view class="page">
    <view class="card center">
      <view class="muted">本节课你的整体感受？</view>
      <view class="stars">
        <text v-for="n in 5" :key="n" :class="['s', n<=rating && 'on']" @tap="rating=n">★</text>
      </view>
      <view style="color:#4f7cff;margin-top:8rpx">{{ ratingText() }}</view>
    </view>

    <view class="card">
      <view class="h">具体表现</view>
      <view>
        <text v-for="t in tagOpts" :key="t"
              :class="['chip', tags.includes(t) && 'on']" @tap="toggle(t)">{{ t }}</text>
      </view>
    </view>

    <view class="card">
      <textarea v-model="content" placeholder="老师讲得真好，孩子学得很认真..." class="ta" />
    </view>

    <button class="btn btn-pri btn-block" style="margin-top:30rpx" @tap="submit">提交评价</button>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { api } from '@/api';

const rating = ref(5);
const content = ref('');
const tags = ref(['讲解清晰', '耐心细致']);
const tagOpts = ['讲解清晰','耐心细致','条理性强','课堂有趣','答疑及时','作业精准'];
let bookingId;

onLoad((q) => { bookingId = Number(q.bookingId); });

const toggle = (t) => {
  const i = tags.value.indexOf(t);
  i >= 0 ? tags.value.splice(i, 1) : tags.value.push(t);
};
const ratingText = () => ['', '很差', '较差', '一般', '满意', '非常满意'][rating.value];
const submit = async () => {
  await api.evaluate({ bookingId, rating: rating.value, tags: tags.value, content: content.value });
  uni.showToast({ title: '✅ 评价成功' });
  setTimeout(() => uni.redirectTo({ url: '/pages/poster/index' }), 800);
};
</script>

<style lang="scss" scoped>
.page { padding: 24rpx; }
.card { background: #fff; border-radius: 20rpx; padding: 28rpx; margin-bottom: 20rpx; }
.center { text-align: center; }
.muted { color: #999; font-size: 24rpx; }
.h { font-weight: 600; margin-bottom: 16rpx; }
.stars { font-size: 60rpx; letter-spacing: 14rpx; margin: 20rpx 0; }
.stars .s { color: #ddd; }
.stars .s.on { color: #ffb400; }
.chip {
  display: inline-block; padding: 12rpx 26rpx; background: #f6f7fb;
  border: 1rpx solid #e3e6ef; border-radius: 28rpx;
  font-size: 24rpx; margin: 8rpx;
}
.chip.on { background: #4f7cff; color: #fff; border-color: #4f7cff; }
.ta { width: 100%; min-height: 160rpx; border: 1rpx solid #e3e6ef; border-radius: 16rpx; padding: 16rpx; font-size: 26rpx; }
</style>
