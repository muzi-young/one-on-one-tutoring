<template>
  <view class="page">
    <view class="card">
      <view class="viewer">
        <view class="ic">📑</view>
        <view class="muted">第 {{ page }} / {{ total }} 页</view>
      </view>
      <view class="row" style="justify-content:space-between;margin-top:20rpx">
        <button class="btn btn-out" @tap="prev">‹ 上一页</button>
        <text class="muted">{{ page }} / {{ total }}</text>
        <button class="btn btn-out" @tap="next">下一页 ›</button>
      </view>
    </view>

    <view class="card">
      <view class="h">📚 课件目录</view>
      <view v-for="(c, i) in list" :key="c.id" class="item">
        <text :style="{ color: i===0 ? '#4f7cff' : '' }">{{ i+1 }}. {{ c.title }}</text>
        <text class="muted">{{ c.pageCount }} 页 ›</text>
      </view>
      <view v-if="!list.length" class="muted" style="text-align:center;padding:30rpx 0">暂无课件</view>
    </view>

    <view class="row" style="justify-content:center;gap:20rpx;margin-top:30rpx">
      <button class="btn btn-out" @tap="download">⬇ 下载</button>
      <button class="btn btn-pri" @tap="practice">开始答题练习</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { api } from '@/api';

const list = ref([]);
const page = ref(1);
const total = ref(35);

onShow(async () => {
  // 简化：取第一门课的课件
  const courses = (await api.courseList({})).list;
  if (courses[0]) {
    list.value = await api.coursewares(courses[0].id);
    if (list.value[0]) total.value = list.value[0].pageCount;
  }
});

const prev = () => { if (page.value > 1) page.value--; };
const next = () => { if (page.value < total.value) page.value++; };
const download = () => uni.showToast({ title: '已下载到本地', icon: 'none' });
const practice = () => uni.navigateTo({ url: '/pages/answer/index' });
</script>

<style lang="scss" scoped>
.page { padding: 24rpx; }
.card { background: #fff; border-radius: 20rpx; padding: 24rpx; margin-bottom: 20rpx; }
.viewer {
  height: 400rpx; border: 2rpx solid #e3e6ef; border-radius: 16rpx;
  background: linear-gradient(135deg, #fff, #f0f4ff); display: flex;
  flex-direction: column; align-items: center; justify-content: center;
}
.viewer .ic { font-size: 80rpx; color: #4f7cff; margin-bottom: 12rpx; }
.h { font-weight: 600; margin-bottom: 16rpx; }
.item {
  display: flex; justify-content: space-between; align-items: center;
  padding: 20rpx 0; border-bottom: 1rpx solid #f3f3f3; font-size: 26rpx;
}
.item:last-child { border: none; }
.muted { color: #999; font-size: 22rpx; }
.row { display: flex; align-items: center; }
</style>
