<template>
  <view class="page">
    <!-- Hero 头部：学习能量站 -->
    <view class="hero">
      <view class="hero-bg"></view>
      <view class="hero-content">
        <view class="row-b" style="margin-bottom: 28rpx;">
          <view>
            <view class="hello">Hi，同学 👋</view>
            <view class="motto">每天进步一点点 · 高考 200 天倒计时</view>
          </view>
          <view class="lvl-badge">
            <text class="lvl-num">12</text>
            <text class="lvl-txt">已学课时</text>
          </view>
        </view>

        <!-- 学习能量条 -->
        <view class="energy-card">
          <view class="row-b" style="margin-bottom: 16rpx;">
            <view class="row">
              <text class="e-ic">⚡</text>
              <text class="e-title">本周学习能量</text>
            </view>
            <text class="e-rate">+12%</text>
          </view>
          <view class="e-bar"><view class="e-fill" :style="{ width: '68%' }"></view></view>
          <view class="row-b" style="margin-top: 12rpx; font-size: 22rpx; color: rgba(255,255,255,.85)">
            <text>本周已学 6 节</text>
            <text>目标 10 节 · 68%</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 快捷入口 -->
    <view class="quick-row">
      <view class="quick" @tap="goPage('/pages/booking/mine')">
        <view class="quick-ic" style="background: linear-gradient(135deg,#dbeafe,#bfdbfe)">📅</view>
        <text class="quick-t">我的预约</text>
      </view>
      <view class="quick" @tap="goPage('/pages/courseware/index')">
        <view class="quick-ic" style="background: linear-gradient(135deg,#dcfce7,#bbf7d0)">📑</view>
        <text class="quick-t">学习中心</text>
      </view>
      <view class="quick" @tap="goPage('/pages/coupon/index')">
        <view class="quick-ic" style="background: linear-gradient(135deg,#ffedd5,#fed7aa)">🎟</view>
        <text class="quick-t">卡券中心</text>
      </view>
      <view class="quick" @tap="goPage('/pages/poster/index')">
        <view class="quick-ic" style="background: linear-gradient(135deg,#fce7f3,#fbcfe8)">🎁</view>
        <text class="quick-t">邀请有礼</text>
      </view>
    </view>

    <!-- 筛选 -->
    <view class="filter-bar">
      <scroll-view scroll-x class="chip-bar">
        <view :class="['chip', !filter.grade && 'on']" @tap="setGrade('')">全部</view>
        <view :class="['chip', filter.grade==='high1' && 'on']" @tap="setGrade('high1')">高一</view>
        <view :class="['chip', filter.grade==='high2' && 'on']" @tap="setGrade('high2')">高二</view>
        <view :class="['chip', filter.grade==='high3' && 'on']" @tap="setGrade('high3')">高三</view>
      </scroll-view>
      <scroll-view scroll-x class="chip-bar">
        <view :class="['chip', !filter.subject && 'on']" @tap="setSub('')">全科</view>
        <view :class="['chip', filter.subject===s.k && 'on']" v-for="s in subjects" :key="s.k" @tap="setSub(s.k)">{{ s.t }}</view>
      </scroll-view>
    </view>

    <!-- 课程卡片 -->
    <view class="section-h">
      <text class="s-title">🔥 名师精选</text>
      <text class="muted">共 {{ list.length }} 门</text>
    </view>
    <view v-for="(c, i) in list" :key="c.id" class="course" @tap="goDetail(c.id)">
      <view class="cover-wrap">
        <image v-if="c.cover" :src="c.cover" class="cover" mode="aspectFill" />
        <view v-else class="cover-ph" :style="{ background: thumbBg(c.subject) }">{{ subjectText(c.subject)[0] }}</view>
        <view class="cover-badge" v-if="i===0">🔥 热销</view>
        <view class="cover-badge cover-badge-gold" v-else-if="Number(c.ratingAvg)>=4.9">👑 满分名师</view>
      </view>
      <view class="info">
        <view class="title">{{ c.title }}</view>
        <view class="teacher-row">
          <image v-if="c.teacher?.avatar" :src="c.teacher.avatar" class="t-mini" mode="aspectFill" />
          <text class="t-name">{{ c.teacher?.nickname }}</text>
          <text class="t-title">{{ c.teacher?.teacherTitle }}</text>
        </view>
        <view class="meta">
          <text class="tag tag-blue">{{ gradeText(c.grade) }}</text>
          <text class="tag tag-green">⭐ {{ c.ratingAvg }}</text>
          <text class="tag tag-orange">{{ c.salesCount }}人学</text>
        </view>
        <view class="row-b" style="margin-top: 14rpx;">
          <text class="price">¥{{ c.pricePerSession }}<text class="unit">/节起</text></text>
          <view class="btn-mini">立即抢购 ›</view>
        </view>
      </view>
    </view>

    <view v-if="!list.length" class="empty">
      <text style="font-size: 80rpx;">📚</text>
      <view class="muted" style="margin-top: 16rpx;">暂无符合条件的课程</view>
    </view>

    <view style="height: 40rpx;"></view>
  </view>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { api } from '@/api';

const filter = reactive({ grade: '', subject: '' });
const list = ref([]);
const subjects = [
  { k: 'chinese', t: '语文' }, { k: 'math', t: '数学' }, { k: 'english', t: '英语' },
  { k: 'physics', t: '物理' }, { k: 'chemistry', t: '化学' }, { k: 'biology', t: '生物' }
];

const subjectText = (s) => ({
  chinese:'语文', math:'数学', english:'英语', physics:'物理',
  chemistry:'化学', biology:'生物', politics:'政治', history:'历史', geography:'地理'
}[s] || s);
const gradeText = (g) => ({ high1:'高一', high2:'高二', high3:'高三' }[g] || g);
const thumbBg = (s) => ({
  math: 'linear-gradient(135deg,#1e6fff,#2978ff)',
  english: 'linear-gradient(135deg,#22c55e,#16a34a)',
  physics: 'linear-gradient(135deg,#ff5722,#ff7043)',
  chemistry: 'linear-gradient(135deg,#10b981,#34d399)',
  chinese: 'linear-gradient(135deg,#f59e0b,#ef4444)',
  biology: 'linear-gradient(135deg,#06b6d4,#3b82f6)'
}[s] || 'linear-gradient(135deg,#6366f1,#8b5cf6)');

const load = async () => {
  list.value = (await api.courseList(filter)).list;
};
const setGrade = (g) => { filter.grade = g; load(); };
const setSub = (s) => { filter.subject = s; load(); };
const goDetail = (id) => uni.navigateTo({ url: `/pages/course/detail?id=${id}` });
const goPage = (url) => uni.navigateTo({ url });

onShow(() => load());
</script>

<style lang="scss" scoped>
.page { padding-bottom: 40rpx; min-height: 100vh; }

/* ===== Hero 头部 ===== */
.hero {
  position: relative;
  padding: 40rpx 30rpx 100rpx;
  overflow: hidden;
}
.hero-bg {
  position: absolute; inset: -100rpx 0 0 0;
  background:
    radial-gradient(circle at 20% 20%, rgba(34,197,94,0.4) 0, transparent 40%),
    radial-gradient(circle at 80% 80%, rgba(255,112,67,0.3) 0, transparent 40%),
    linear-gradient(135deg, #1e6fff, #0e5ad8);
}
.hero-content { position: relative; color: #fff; }

.hello { font-size: 38rpx; font-weight: 700; }
.motto { font-size: 24rpx; opacity: .9; margin-top: 6rpx; }

.lvl-badge {
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(20rpx);
  border-radius: 20rpx;
  padding: 14rpx 20rpx;
  text-align: center;
  border: 1rpx solid rgba(255, 255, 255, 0.3);
}
.lvl-num { display: block; font-size: 36rpx; font-weight: 800; line-height: 1; }
.lvl-txt { display: block; font-size: 20rpx; opacity: .85; margin-top: 4rpx; }

.energy-card {
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(20rpx);
  border: 1rpx solid rgba(255, 255, 255, 0.3);
  border-radius: 24rpx;
  padding: 24rpx;
}
.e-ic { font-size: 32rpx; margin-right: 8rpx; }
.e-title { font-weight: 600; font-size: 26rpx; }
.e-rate {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  padding: 4rpx 14rpx; border-radius: 20rpx;
  font-size: 22rpx; font-weight: 700;
}
.e-bar {
  height: 14rpx; background: rgba(255, 255, 255, 0.25);
  border-radius: 8rpx; overflow: hidden;
}
.e-fill {
  height: 100%;
  background: linear-gradient(90deg, #22c55e, #4ade80);
  border-radius: 8rpx;
  box-shadow: 0 0 16rpx #22c55e;
}

/* ===== 快捷入口 ===== */
.quick-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16rpx;
  margin: -60rpx 24rpx 24rpx;
  background: #fff;
  padding: 24rpx 16rpx;
  border-radius: 24rpx;
  box-shadow: 0 8rpx 32rpx rgba(20, 50, 120, 0.10);
  position: relative;
  z-index: 2;
}
.quick { display: flex; flex-direction: column; align-items: center; gap: 10rpx; }
.quick-ic {
  width: 88rpx; height: 88rpx; border-radius: 22rpx;
  display: flex; align-items: center; justify-content: center;
  font-size: 40rpx;
}
.quick-t { font-size: 24rpx; color: #475569; font-weight: 500; }

/* ===== 筛选 ===== */
.filter-bar {
  background: #fff;
  margin: 0 24rpx 24rpx;
  padding: 20rpx 20rpx 6rpx;
  border-radius: 20rpx;
}
.chip-bar { white-space: nowrap; margin-bottom: 12rpx; }
.chip-bar .chip { display: inline-flex; }

/* ===== 区段标题 ===== */
.section-h {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0 30rpx; margin-bottom: 16rpx;
}
.s-title { font-size: 30rpx; font-weight: 700; color: #1f2937; }

/* ===== 课程卡片 ===== */
.course {
  background: #fff;
  border-radius: 24rpx;
  margin: 0 24rpx 24rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 24rpx rgba(20, 50, 120, 0.06);
}
.cover-wrap { position: relative; height: 280rpx; }
.cover, .cover-ph { width: 100%; height: 280rpx; display: block; }
.cover-ph {
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 80rpx; font-weight: 700;
}
.cover-badge {
  position: absolute; top: 20rpx; left: 20rpx;
  background: linear-gradient(135deg, #ff5722, #ff7043);
  color: #fff; padding: 8rpx 18rpx; border-radius: 16rpx;
  font-size: 22rpx; font-weight: 700;
  box-shadow: 0 4rpx 14rpx rgba(255, 87, 34, 0.40);
}
.cover-badge-gold {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  box-shadow: 0 4rpx 14rpx rgba(217, 119, 6, 0.40);
}

.info { padding: 26rpx; }
.title { font-size: 32rpx; font-weight: 700; color: #111827; margin-bottom: 14rpx; line-height: 1.4; }
.teacher-row { display: flex; align-items: center; gap: 10rpx; margin-bottom: 14rpx; }
.t-mini { width: 40rpx; height: 40rpx; border-radius: 50%; }
.t-name { font-size: 24rpx; color: #1f2937; font-weight: 600; }
.t-title { font-size: 22rpx; color: #94a3b8; }
.meta { margin-bottom: 4rpx; }

.btn-mini {
  background: linear-gradient(135deg, #1e6fff, #0e5ad8);
  color: #fff;
  padding: 10rpx 22rpx;
  border-radius: 20rpx;
  font-size: 24rpx;
  font-weight: 600;
  box-shadow: 0 4rpx 14rpx rgba(30, 111, 255, 0.30);
}

.empty {
  text-align: center;
  padding: 120rpx 0;
  color: #94a3b8;
}
</style>
