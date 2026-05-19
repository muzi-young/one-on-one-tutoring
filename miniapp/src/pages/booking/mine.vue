<template>
  <view class="page">
    <view class="chips">
      <text :class="['chip', status==='booked' && 'on']" @tap="setStatus('booked')">待上课</text>
      <text :class="['chip', status==='finished' && 'on']" @tap="setStatus('finished')">已完成</text>
      <text :class="['chip', status==='cancelled' && 'on']" @tap="setStatus('cancelled')">已取消</text>
    </view>

    <view v-for="b in list" :key="b.id" class="card">
      <view class="row-b">
        <text style="font-weight:600">📅 {{ formatTime(b.startAt) }}</text>
        <text :class="['tag', b.status==='booked' ? 'tag-orange' : 'tag-blue']">{{ statusText(b.status) }}</text>
      </view>
      <view style="margin:10rpx 0">{{ b.course?.title }} (第 {{ b.sessionIndex }} 节)</view>
      <view class="muted">{{ b.teacher?.nickname }} · {{ b.durationMin }} 分钟</view>
      <view class="row" style="gap:16rpx;margin-top:18rpx" v-if="b.status==='booked'">
        <button class="btn btn-out" @tap="cancel(b)">取消</button>
        <button class="btn btn-pri" @tap="enter(b)">进入课堂</button>
        <button v-if="b.status==='finished'" class="btn btn-out" @tap="rate(b)">评价</button>
      </view>
    </view>
    <view v-if="!list.length" class="empty">暂无预约</view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { api } from '@/api';

const status = ref('booked');
const list = ref([]);
const statusText = (s) => ({ booked:'待上课', ongoing:'上课中', finished:'已完成', cancelled:'已取消' }[s]);
const formatTime = (t) => new Date(t).toLocaleString('zh-CN', { month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit' });

const load = async () => { list.value = await api.myBookings({ status: status.value }); };
const setStatus = (s) => { status.value = s; load(); };
const cancel = async (b) => {
  await api.cancelBooking(b.id);
  uni.showToast({ title: '已取消' });
  load();
};
const enter = (b) => uni.navigateTo({ url: `/pages/classroom/index?bookingId=${b.id}` });
const rate = (b) => uni.navigateTo({ url: `/pages/rate/index?bookingId=${b.id}` });

onShow(load);
</script>

<style lang="scss" scoped>
.page { padding: 24rpx; }
.chips { display: flex; gap: 16rpx; margin-bottom: 20rpx; }
.chip { padding: 10rpx 24rpx; border: 1rpx solid #e3e6ef; border-radius: 28rpx; font-size: 24rpx; background: #fff; }
.chip.on { background: #4f7cff; color: #fff; border-color: #4f7cff; }
.card { background: #fff; border-radius: 20rpx; padding: 24rpx; margin-bottom: 20rpx; }
.row { display: flex; align-items: center; }
.row-b { display: flex; justify-content: space-between; align-items: center; }
.muted { color: #999; font-size: 24rpx; }
.empty { text-align: center; color: #aaa; padding: 100rpx 0; }
.tag { display: inline-block; font-size: 20rpx; padding: 4rpx 16rpx; border-radius: 16rpx; }
.tag-blue { background: #e6efff; color: #4f7cff; }
.tag-orange { background: #fff1e6; color: #ff7a00; }
</style>
