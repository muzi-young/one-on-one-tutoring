<template>
  <view class="page">
    <!-- 课程信息卡片 -->
    <view class="course-info-card">
      <view class="teacher-row">
        <image v-if="course?.teacher?.avatar" :src="course.teacher.avatar" class="teacher-avatar" mode="aspectFill" />
        <view v-else class="teacher-avatar teacher-avatar-ph">{{ course?.teacher?.nickname?.[0] }}</view>
        <view class="teacher-info">
          <view class="teacher-name">{{ course?.teacher?.nickname }}</view>
          <view class="course-title">{{ course?.title }}</view>
        </view>
      </view>
    </view>

    <!-- 日期选择 -->
    <view class="date-card">
      <picker mode="date" :value="date" @change="dateChange">
        <view class="date-picker">
          <view class="date-label">📅 选择日期</view>
          <view class="date-value">{{ date }} ›</view>
        </view>
      </picker>
    </view>

    <!-- 时段选择 -->
    <view class="slots-card">
      <view class="card-title">可约时段</view>
      <view class="slots-grid">
        <view v-for="s in slots" :key="s.time"
              :class="['slot-item', !s.available && 'slot-disabled', picked===s.time && 'slot-selected']"
              @tap="s.available && (picked=s.time)">
          <text class="slot-time">{{ s.time }}</text>
          <text v-if="!s.available" class="slot-status">已约</text>
        </view>
      </view>
      <view v-if="picked" class="selected-info">
        <text class="dot dot-ok"></text>
        <text>已选：{{ date }} {{ picked }} · 60分钟</text>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view style="height: 160rpx;"></view>
    <view class="footer">
      <button class="btn btn-pri btn-block btn-lg" :disabled="!picked" @tap="submit">确认预约</button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { api } from '@/api';

const slots = ref([]);
const date = ref(new Date().toISOString().slice(0, 10));
const picked = ref('');
const course = ref(null);
let orderId, courseId;

onLoad(async (q) => {
  orderId = Number(q.orderId);
  courseId = Number(q.courseId);
  const d = await api.courseDetail(courseId);
  course.value = d.course;
  loadSlots();
});

const loadSlots = async () => {
  slots.value = await api.teacherSlots({ teacherId: course.value.teacherId, date: date.value });
};
const dateChange = (e) => {
  date.value = e.detail.value;
  picked.value = '';
  loadSlots();
};
const submit = async () => {
  const startAt = `${date.value} ${picked.value}:00`;
  await api.createBooking({
    orderId, teacherId: course.value.teacherId,
    startAt, durationMin: 60
  });
  uni.showToast({ title: '✅ 预约成功' });
  setTimeout(() => uni.switchTab({ url: '/pages/booking/mine' }), 800);
};
</script>

<style lang="scss" scoped>
.page {
  background: #f4f6fb;
  min-height: 100vh;
  padding: 24rpx;
  padding-bottom: 160rpx;
}

/* ===== Course Info Card ===== */
.course-info-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 24rpx rgba(20, 50, 120, 0.06);
}
.teacher-row {
  display: flex;
  gap: 20rpx;
  align-items: center;
}
.teacher-avatar {
  width: 88rpx;
  height: 88rpx;
  border-radius: 50%;
  border: 4rpx solid #eef3ff;
  flex-shrink: 0;
}
.teacher-avatar-ph {
  background: linear-gradient(135deg, #1e6fff, #22c55e);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36rpx;
  font-weight: 700;
}
.teacher-info {
  flex: 1;
}
.teacher-name {
  font-size: 28rpx;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 6rpx;
}
.course-title {
  font-size: 24rpx;
  color: #64748b;
}

/* ===== Date Card ===== */
.date-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 24rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 24rpx rgba(20, 50, 120, 0.06);
}
.date-picker {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.date-label {
  font-size: 28rpx;
  color: #1f2937;
  font-weight: 600;
}
.date-value {
  font-size: 26rpx;
  color: #1e6fff;
  font-weight: 600;
}

/* ===== Slots Card ===== */
.slots-card {
  background: #fff;
  border-radius: 24rpx;
  padding: 28rpx;
  margin-bottom: 20rpx;
  box-shadow: 0 4rpx 24rpx rgba(20, 50, 120, 0.06);
}
.card-title {
  font-size: 28rpx;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 20rpx;
}
.slots-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16rpx;
}
.slot-item {
  position: relative;
  background: #f8fafc;
  border: 2rpx solid #e2e8f0;
  border-radius: 20rpx;
  padding: 20rpx 12rpx;
  text-align: center;
  transition: all .2s;
}
.slot-selected {
  background: linear-gradient(135deg, #1e6fff, #0e5ad8);
  border-color: #1e6fff;
}
.slot-selected .slot-time {
  color: #fff;
}
.slot-disabled {
  background: #f1f5f9;
  border-color: #e2e8f0;
  opacity: 0.6;
}
.slot-time {
  font-size: 24rpx;
  color: #475569;
  font-weight: 600;
}
.slot-status {
  display: block;
  font-size: 20rpx;
  color: #94a3b8;
  margin-top: 4rpx;
}
.selected-info {
  margin-top: 24rpx;
  font-size: 24rpx;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 10rpx;
}

/* ===== Footer ===== */
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  padding: 20rpx 24rpx;
  border-top: 1rpx solid #e5e7eb;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
  z-index: 10;
}
.btn-lg { height: 80rpx; font-size: 30rpx; }
</style>
