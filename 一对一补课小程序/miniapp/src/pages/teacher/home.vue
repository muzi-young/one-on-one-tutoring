<template>
  <view class="page">
    <!-- 头部教师信息 -->
    <view class="header">
      <view class="header-bg"></view>
      <view class="header-content">
        <view class="teacher-row">
          <image v-if="user?.avatar" :src="user.avatar" class="avatar avatar-img" mode="aspectFill" />
          <view v-else class="avatar avatar-ph">{{ user ? (user.nickname || '老')[0] : '王' }}</view>
          <view class="teacher-info">
            <view class="teacher-name">{{ user?.nickname || '王雪老师' }} 👨‍🏫</view>
            <view class="teacher-meta">
              <text class="tag tag-white">{{ user?.teacherTitle || '高级教师' }}</text>
              <text class="tag tag-white" v-if="user?.verified">✓ 已认证</text>
              <text class="tag tag-white" v-else>未认证</text>
            </view>
          </view>
          <text class="notification-btn">🔔</text>
        </view>

        <!-- 数据统计 -->
        <view class="stats">
          <view class="stat-item">
            <text class="stat-val">{{ list.length }}</text>
            <text class="stat-label">本月课时</text>
          </view>
          <view class="stat-item">
            <text class="stat-val">{{ todayCount }}</text>
            <text class="stat-label">今日待上</text>
          </view>
          <view class="stat-item">
            <text class="stat-val">{{ user?.rating || 4.9 }}</text>
            <text class="stat-label">评分</text>
          </view>
          <view class="stat-item">
            <text class="stat-val">¥6.8k</text>
            <text class="stat-label">本月收益</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 快捷操作 -->
    <view class="quick-actions">
      <view class="quick-btn" @tap="goCreate">
        <text class="quick-ic">📹</text>
        <text class="quick-txt">创建会议</text>
      </view>
      <view class="quick-btn">
        <text class="quick-ic">📅</text>
        <text class="quick-txt">档期管理</text>
      </view>
      <view class="quick-btn">
        <text class="quick-ic">📑</text>
        <text class="quick-txt">课件库</text>
      </view>
      <view class="quick-btn">
        <text class="quick-ic">📝</text>
        <text class="quick-txt">题库管理</text>
      </view>
    </view>

    <!-- 今日课程 -->
    <view class="section">
      <view class="section-title">📅 今日课程</view>
      <view v-for="b in todayList" :key="b.id" class="course-card">
        <view class="course-header">
          <view class="time-badge">{{ formatHour(b.startAt) }}</view>
          <view :class="['status-badge', b.status === 'booked' ? 'status-orange' : b.status === 'ongoing' ? 'status-green' : 'status-blue']">
            {{ statusText(b.status) }}
          </view>
        </view>
        <view class="course-body">
          <view class="student-name">{{ b.student?.nickname }}</view>
          <view class="course-name">{{ b.course?.title }}</view>
        </view>
        <view class="course-footer">
          <button class="btn btn-out" @tap.stop="createMeeting(b)">📹 创建会议</button>
          <button class="btn btn-pri" @tap.stop="enterClassroom(b)">进入课堂</button>
        </view>
      </view>
      <view v-if="!todayList.length" class="empty-state">
        <text style="font-size: 64rpx;">📅</text>
        <view class="empty-text">今日暂无课程</view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { useUserStore } from '@/store/user';
import { api } from '@/api';

const userStore = useUserStore();
const user = computed(() => userStore.user);
const list = ref([]);
const today = new Date().toDateString();
const todayList = computed(() => list.value.filter(b => new Date(b.startAt).toDateString() === today));
const todayCount = computed(() => todayList.value.filter(b => b.status === 'booked').length);

const statusText = (s) => ({ booked: '待上课', ongoing: '上课中', finished: '已完成' }[s] || s);
const formatHour = (t) => {
  const d = new Date(t);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
};

onShow(async () => {
  await userStore.fetchMe();
  list.value = await api.teacherBookings();
});

const goCreate = () => uni.navigateTo({ url: '/pages/teacher/createMeet' });
const createMeeting = (b) => uni.navigateTo({ url: `/pages/teacher/createMeet?bookingId=${b.id}` });
const enterClassroom = (b) => uni.navigateTo({ url: `/pages/classroom/index?bookingId=${b.id}` });
</script>

<style lang="scss" scoped>
.page {
  background: #f4f6fb;
  min-height: 100vh;
  padding-bottom: 40rpx;
}

/* ===== Header ===== */
.header {
  position: relative;
  padding: 80rpx 24rpx 0;
  overflow: hidden;
}
.header-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border-bottom-left-radius: 40rpx;
  border-bottom-right-radius: 40rpx;
  z-index: 0;
}
.header-content {
  position: relative;
  z-index: 1;
  padding-bottom: 40rpx;
}

.teacher-row {
  display: flex;
  align-items: center;
  gap: 20rpx;
  margin-bottom: 32rpx;
}
.avatar {
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  border: 4rpx solid rgba(255, 255, 255, 0.3);
  flex-shrink: 0;
}
.avatar-img {
  background: #fff;
}
.avatar-ph {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1));
  color: #fff;
  font-size: 38rpx;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
.teacher-info {
  flex: 1;
}
.teacher-name {
  font-size: 34rpx;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10rpx;
}
.teacher-meta {
  display: flex;
  gap: 10rpx;
}
.notification-btn {
  font-size: 36rpx;
  opacity: 0.9;
}

/* Stats */
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20rpx;
}
.stat-item {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10rpx);
  border-radius: 20rpx;
  padding: 20rpx 12rpx;
  text-align: center;
}
.stat-val {
  display: block;
  font-size: 32rpx;
  font-weight: 700;
  color: #fff;
  margin-bottom: 6rpx;
}
.stat-label {
  font-size: 20rpx;
  color: rgba(255, 255, 255, 0.85);
}

/* ===== Quick Actions ===== */
.quick-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16rpx;
  padding: 24rpx;
}
.quick-btn {
  background: #fff;
  border-radius: 20rpx;
  padding: 24rpx 12rpx;
  text-align: center;
  box-shadow: 0 4rpx 16rpx rgba(20, 50, 120, 0.06);
}
.quick-ic {
  display: block;
  font-size: 44rpx;
  margin-bottom: 8rpx;
}
.quick-txt {
  font-size: 22rpx;
  color: #475569;
}

/* ===== Section ===== */
.section {
  padding: 0 24rpx;
}
.section-title {
  font-size: 28rpx;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 16rpx;
}

/* ===== Course Card ===== */
.course-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  margin-bottom: 16rpx;
  box-shadow: 0 4rpx 24rpx rgba(20, 50, 120, 0.06);
}
.course-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16rpx;
}
.time-badge {
  font-size: 28rpx;
  font-weight: 700;
  color: #1f2937;
}
.status-badge {
  font-size: 22rpx;
  padding: 6rpx 16rpx;
  border-radius: 20rpx;
  font-weight: 600;
}
.status-orange {
  background: #fff7ed;
  color: #ff7043;
}
.status-green {
  background: #f0fdf4;
  color: #22c55e;
}
.status-blue {
  background: #eff6ff;
  color: #1e6fff;
}
.course-body {
  margin-bottom: 20rpx;
}
.student-name {
  font-size: 26rpx;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 6rpx;
}
.course-name {
  font-size: 24rpx;
  color: #64748b;
}
.course-footer {
  display: flex;
  gap: 16rpx;
}

/* ===== Empty State ===== */
.empty-state {
  text-align: center;
  padding: 80rpx 0;
}
.empty-text {
  font-size: 24rpx;
  color: #94a3b8;
  margin-top: 16rpx;
}
</style>
