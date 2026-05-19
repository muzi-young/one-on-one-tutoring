<template>
  <view v-if="course" class="page">
    <!-- Hero Banner -->
    <view class="hero-wrap">
      <image v-if="course.cover" :src="course.cover" class="hero-img" mode="aspectFill" />
      <view v-else class="hero-ph" :style="{ background: heroBg(course.subject) }">
        <text class="hero-ic">{{ subjectText(course.subject) }}</text>
      </view>
      <view class="hero-overlay"></view>
      <view class="hero-content">
        <view class="row-b">
          <text class="tag tag-white">{{ gradeText(course.grade) }}</text>
          <text class="tag tag-white">{{ subjectText(course.subject) }}</text>
        </view>
        <view class="hero-title">{{ course.title }}</view>
        <view class="row-b" style="margin-top: 16rpx;">
          <view class="row">
            <text class="dot dot-ok"></text>
            <text class="hero-stat">{{ course.salesCount }}人已学</text>
          </view>
          <view class="row">
            <text class="hero-score">⭐ {{ course.ratingAvg }}</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 价格卡片 -->
    <view class="price-card">
      <view class="row-b">
        <view>
          <text class="price-big">¥{{ course.pricePerSession }}</text>
          <text class="unit">/节起</text>
        </view>
        <view class="btn-mini" @tap="buy">立即购买 ›</view>
      </view>
    </view>

    <!-- 教师信息 -->
    <view class="card teacher-card">
      <view class="card-h">👨‍🏫 授课教师</view>
      <view class="teacher-row">
        <image v-if="course.teacher?.avatar" :src="course.teacher.avatar" class="teacher-avatar" mode="aspectFill" />
        <view v-else class="teacher-avatar teacher-avatar-ph">{{ course.teacher?.nickname?.[0] }}</view>
        <view class="teacher-info">
          <view class="teacher-name">{{ course.teacher?.nickname }}</view>
          <view class="teacher-title">{{ course.teacher?.teacherTitle }}</view>
          <view class="teacher-meta">
            <text class="tag tag-blue">教龄 {{ course.teacher?.teachingYears }} 年</text>
            <text class="tag tag-green">⭐ {{ course.teacher?.rating }}</text>
            <text class="tag tag-orange" v-if="course.teacher?.verified">已认证</text>
          </view>
        </view>
      </view>
      <view v-if="course.teacher?.bio" class="teacher-bio">{{ course.teacher.bio }}</view>
    </view>

    <!-- 内容简介 -->
    <view class="card">
      <view class="card-h">📖 内容简介</view>
      <view class="text">{{ course.intro }}</view>
    </view>

    <!-- 课程亮点 -->
    <view class="card">
      <view class="card-h">🎯 课程亮点</view>
      <view class="highlights">
        <view v-for="(h, i) in highlightList(course.highlights)" :key="i" class="hl-item">
          <text class="hl-num">{{ i + 1 }}</text>
          <text class="hl-text">{{ h }}</text>
        </view>
      </view>
    </view>

    <!-- 学员评价 -->
    <view class="card">
      <view class="card-h row-b">
        <text>💬 学员评价</text>
        <text class="muted">{{ evaluations.length }} 条</text>
      </view>
      <view v-for="e in evaluations" :key="e.id" class="ev">
        <view class="ev-header">
          <view class="row" style="gap: 12rpx;">
            <view class="ev-avatar">{{ e.user?.nickname?.[0] }}</view>
            <text class="ev-name">{{ e.user?.nickname }}</text>
          </view>
          <view class="ev-stars">{{ '★'.repeat(e.rating) }}</view>
        </view>
        <view class="ev-content">{{ e.content }}</view>
        <view v-if="e.tags?.length" class="ev-tags">
          <text v-for="t in e.tags" :key="t" class="tag tag-sm">{{ t }}</text>
        </view>
      </view>
      <view v-if="!evaluations.length" class="empty">
        <text style="font-size: 64rpx;">💬</text>
        <view class="muted" style="margin-top: 12rpx;">暂无评价</view>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view style="height: 160rpx;"></view>
    <view class="footer">
      <view class="footer-action" @tap="fav">
        <text class="fa-ic">⭐</text>
        <text class="fa-txt">收藏</text>
      </view>
      <view class="footer-action" @tap="share">
        <text class="fa-ic">📤</text>
        <text class="fa-txt">分享</text>
      </view>
      <button class="btn btn-pri btn-block btn-lg" @tap="buy">立即购买</button>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { api } from '@/api';

const course = ref(null);
const evaluations = ref([]);
let courseId = 0;

const subjectText = (s) => ({
  math: '数学', english: '英语', chinese: '语文', physics: '物理',
  chemistry: '化学', biology: '生物', politics: '政治', history: '历史'
}[s] || s);
const gradeText = (g) => ({ high1: '高一', high2: '高二', high3: '高三' }[g] || g);
const heroBg = (s) => ({
  math: 'linear-gradient(135deg,#1e6fff,#2978ff)',
  english: 'linear-gradient(135deg,#22c55e,#16a34a)',
  physics: 'linear-gradient(135deg,#ff5722,#ff7043)',
  chemistry: 'linear-gradient(135deg,#10b981,#34d399)',
  chinese: 'linear-gradient(135deg,#f59e0b,#ef4444)',
  biology: 'linear-gradient(135deg,#06b6d4,#3b82f6)'
}[s] || 'linear-gradient(135deg,#6366f1,#8b5cf6)');

const highlightList = (h) => h?.split('·').filter(Boolean).map(s => s.trim()) || [];

onLoad((q) => {
  courseId = q.id;
  load();
});
const load = async () => {
  const d = await api.courseDetail(courseId);
  course.value = d.course;
  evaluations.value = d.evaluations;
};
const buy = () => uni.navigateTo({ url: `/pages/course/buy?courseId=${courseId}` });
const fav = () => uni.showToast({ title: '已加入收藏', icon: 'none' });
const share = () => uni.showToast({ title: '分享功能开发中', icon: 'none' });
</script>

<style lang="scss" scoped>
.page { background: #f4f6fb; padding-bottom: 160rpx; }

/* ===== Hero Banner ===== */
.hero-wrap { position: relative; height: 420rpx; overflow: hidden; }
.hero-img, .hero-ph { width: 100%; height: 100%; display: block; }
.hero-ph {
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,.9); font-size: 100rpx; font-weight: 700;
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(30,111,255,0) 0%, rgba(30,111,255,0.4) 60%, rgba(15,23,42,0.8) 100%);
}
.hero-content {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 40rpx 30rpx 32rpx; color: #fff;
}
.hero-title {
  font-size: 38rpx; font-weight: 800; line-height: 1.4;
  margin: 16rpx 0; text-shadow: 0 2rpx 12rpx rgba(0,0,0,0.3);
}
.hero-stat { font-size: 24rpx; opacity: .9; }
.hero-score { font-size: 26rpx; font-weight: 700; }
.tag-white {
  background: rgba(255,255,255,0.2); backdrop-filter: blur(10rpx);
  color: #fff; border: 1rpx solid rgba(255,255,255,0.3);
}

/* ===== Price Card ===== */
.price-card {
  background: #fff; margin: -40rpx 24rpx 24rpx;
  border-radius: 20rpx; padding: 24rpx;
  box-shadow: 0 8rpx 32rpx rgba(20,50,120,0.12);
  position: relative; z-index: 2;
}
.btn-mini {
  background: linear-gradient(135deg, #1e6fff, #0e5ad8);
  color: #fff; padding: 12rpx 26rpx; border-radius: 20rpx;
  font-size: 24rpx; font-weight: 600;
}

/* ===== Teacher Card ===== */
.teacher-card { overflow: hidden; }
.teacher-row { display: flex; gap: 20rpx; align-items: flex-start; margin-bottom: 18rpx; }
.teacher-avatar {
  width: 96rpx; height: 96rpx; border-radius: 50%;
  border: 4rpx solid #eef3ff; flex-shrink: 0;
}
.teacher-avatar-ph {
  background: linear-gradient(135deg, #1e6fff, #22c55e);
  color: #fff; display: flex; align-items: center; justify-content: center;
  font-size: 40rpx; font-weight: 700;
}
.teacher-info { flex: 1; }
.teacher-name { font-size: 30rpx; font-weight: 700; color: #1f2937; }
.teacher-title { font-size: 24rpx; color: #64748b; margin: 6rpx 0 10rpx; }
.teacher-meta { display: flex; gap: 10rpx; flex-wrap: wrap; }
.teacher-bio {
  font-size: 24rpx; color: #475569; line-height: 1.6;
  background: #f8fafc; padding: 16rpx; border-radius: 14rpx;
}

/* ===== Highlights ===== */
.highlights { display: grid; gap: 12rpx; }
.hl-item {
  display: flex; align-items: flex-start; gap: 14rpx;
}
.hl-num {
  width: 36rpx; height: 36rpx; border-radius: 50%;
  background: linear-gradient(135deg, #1e6fff, #22c55e);
  color: #fff; font-size: 20rpx; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; margin-top: 2rpx;
}
.hl-text { font-size: 26rpx; color: #475569; line-height: 1.6; }

/* ===== Evaluation ===== */
.ev { padding: 20rpx 0; border-bottom: 1rpx solid #f1f5f9; }
.ev:last-child { border: none; }
.ev-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12rpx; }
.ev-avatar {
  width: 56rpx; height: 56rpx; border-radius: 50%;
  background: linear-gradient(135deg, #1e6fff, #22c55e);
  color: #fff; display: flex; align-items: center; justify-content: center;
  font-size: 24rpx; font-weight: 600;
}
.ev-name { font-size: 26rpx; font-weight: 600; color: #1f2937; }
.ev-stars { color: #f59e0b; font-size: 24rpx; letter-spacing: 2rpx; }
.ev-content { font-size: 26rpx; color: #475569; line-height: 1.6; margin-bottom: 10rpx; }
.ev-tags { display: flex; gap: 10rpx; flex-wrap: wrap; }
.tag-sm { font-size: 20rpx; padding: 4rpx 12rpx; }
.empty { text-align: center; padding: 60rpx 0; }

/* ===== Footer ===== */
.footer {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: #fff; padding: 20rpx 24rpx;
  display: flex; align-items: center; gap: 16rpx;
  border-top: 1rpx solid #e5e7eb;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  z-index: 10;
}
.footer-action {
  display: flex; flex-direction: column; align-items: center; gap: 4rpx;
  min-width: 80rpx;
}
.fa-ic { font-size: 32rpx; }
.fa-txt { font-size: 20rpx; color: #64748b; }
.btn-lg { height: 80rpx; font-size: 30rpx; }

/* ===== Card & Text ===== */
.card { background: #fff; border-radius: 24rpx; padding: 28rpx; margin: 0 24rpx 24rpx; }
.card-h { font-size: 28rpx; font-weight: 700; color: #1f2937; margin-bottom: 18rpx; }
.text { font-size: 26rpx; color: #475569; line-height: 1.7; }
</style>
