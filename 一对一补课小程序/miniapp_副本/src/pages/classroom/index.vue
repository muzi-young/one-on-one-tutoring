<template>
  <view class="page">
    <!-- 顶部状态栏 -->
    <view class="topbar">
      <view class="live-status">
        <view class="live-dot"></view>
        <text class="live-text">上课中</text>
        <text class="timer">{{ timer }}</text>
      </view>
      <view class="meeting-info">
        <text class="meeting-ic">👨‍🏫</text>
        <text class="meeting-no">{{ meeting?.meetingNo || '会议号' }}</text>
      </view>
    </view>

    <!-- 主舞台区域 -->
    <view class="stage">
      <!-- 白板/课件区 -->
      <view class="board">
        <view class="board-placeholder">
          <text class="board-ic">📐</text>
          <view class="board-text">白板 / 课件投屏区</view>
          <view class="board-meta">会议号: {{ meeting?.meetingNo }} | 密码: {{ meeting?.password }}</view>
        </view>
      </view>
      <!-- 摄像头画面 -->
      <view class="cam cam-teacher">
        <text class="cam-ic">👨‍🏫</text>
      </view>
      <view class="cam cam-student">
        <text class="cam-ic">🎓</text>
      </view>
    </view>

    <!-- 工具栏 -->
    <scroll-view scroll-x class="tools-scroll">
      <view class="tools">
        <view :class="['tool', tool==='pen' && 'tool-active']" @tap="tool='pen'">
          <text class="tool-ic">✏️</text>
          <text class="tool-txt">画笔</text>
        </view>
        <view :class="['tool', tool==='text' && 'tool-active']" @tap="tool='text'">
          <text class="tool-ic">📝</text>
          <text class="tool-txt">文字</text>
        </view>
        <view :class="['tool', tool==='shape' && 'tool-active']" @tap="tool='shape'">
          <text class="tool-ic">📐</text>
          <text class="tool-txt">图形</text>
        </view>
        <view :class="['tool', tool==='erase' && 'tool-active']" @tap="tool='erase'">
          <text class="tool-ic">🧹</text>
          <text class="tool-txt">橡皮</text>
        </view>
        <view class="tool" @tap="openCourseware">
          <text class="tool-ic">📑</text>
          <text class="tool-txt">课件</text>
        </view>
        <view class="tool" @tap="toast('已开启屏幕共享')">
          <text class="tool-ic">📺</text>
          <text class="tool-txt">共享</text>
        </view>
        <view class="tool" @tap="openAnswer">
          <text class="tool-ic">📝</text>
          <text class="tool-txt">答题</text>
        </view>
      </view>
    </scroll-view>

    <!-- 控制按钮 -->
    <view class="actions">
      <button :class="['action-btn', mic ? 'btn-on' : 'btn-off']" @tap="mic=!mic">
        <text class="action-ic">{{ mic ? '🎤' : '🎤' }}</text>
        <text class="action-txt">麦克风</text>
      </button>
      <button :class="['action-btn', cam ? 'btn-on' : 'btn-off']" @tap="cam=!cam">
        <text class="action-ic">{{ cam ? '📷' : '📷' }}</text>
        <text class="action-txt">摄像头</text>
      </button>
      <button class="action-btn btn-neutral" @tap="toast('已举手')">
        <text class="action-ic">✋</text>
        <text class="action-txt">举手</text>
      </button>
    </view>

    <!-- 结束按钮 -->
    <button class="end-btn" @tap="end">
      <text class="end-ic">📞</text>
      <text class="end-txt">挂断 · 结束课堂</text>
    </button>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { api } from '@/api';

const meeting = ref(null);
const tool = ref('pen');
const mic = ref(true);
const cam = ref(true);
const timer = ref('00:00');
let bookingId, t0, intv;

onLoad(async (q) => {
  bookingId = Number(q.bookingId);
  try {
    meeting.value = await api.meetingByBooking(bookingId);
  } catch (e) {
    // 会议未创建（学生端通常已由教师创建）
  }
});

onMounted(() => {
  t0 = Date.now();
  intv = setInterval(() => {
    const s = Math.floor((Date.now() - t0) / 1000);
    timer.value = `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  }, 1000);
});
onUnmounted(() => clearInterval(intv));

const toast = (t) => uni.showToast({ title: t, icon: 'none' });
const openCourseware = () => uni.navigateTo({ url: '/pages/courseware/index' });
const openAnswer = () => uni.navigateTo({ url: `/pages/answer/index?bookingId=${bookingId}` });
const end = () => {
  uni.showModal({
    title: '结束课堂', content: '确认结束本节课？',
    success: ({ confirm }) => {
      if (confirm) uni.redirectTo({ url: `/pages/rate/index?bookingId=${bookingId}` });
    }
  });
};
</script>

<style lang="scss" scoped>
.page {
  background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
  min-height: 100vh;
  color: #fff;
  padding-top: 80rpx;
  padding-bottom: 40rpx;
}

/* ===== Topbar ===== */
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24rpx 32rpx;
}
.live-status {
  display: flex;
  align-items: center;
  gap: 12rpx;
}
.live-dot {
  width: 16rpx;
  height: 16rpx;
  background: #ef4444;
  border-radius: 50%;
  animation: pulse 2s infinite;
}
@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.2); }
}
.live-text {
  font-size: 24rpx;
  font-weight: 600;
}
.timer {
  font-size: 24rpx;
  color: #94a3b8;
  font-family: monospace;
}
.meeting-info {
  display: flex;
  align-items: center;
  gap: 8rpx;
}
.meeting-ic { font-size: 24rpx; }
.meeting-no {
  font-size: 24rpx;
  color: #94a3b8;
}

/* ===== Stage ===== */
.stage {
  height: 600rpx;
  background: rgba(30, 41, 59, 0.8);
  margin: 20rpx;
  border-radius: 24rpx;
  position: relative;
  overflow: hidden;
  border: 2rpx solid rgba(255, 255, 255, 0.1);
}
.board {
  position: absolute;
  inset: 20rpx 180rpx 20rpx 20rpx;
  background: #fff;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}
.board-placeholder {
  text-align: center;
  color: #64748b;
}
.board-ic {
  font-size: 64rpx;
  display: block;
  margin-bottom: 16rpx;
}
.board-text {
  font-size: 26rpx;
  font-weight: 600;
  margin-bottom: 12rpx;
}
.board-meta {
  font-size: 22rpx;
  opacity: 0.8;
}
.cam {
  position: absolute;
  right: 20rpx;
  width: 140rpx;
  height: 180rpx;
  border-radius: 20rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3rpx solid rgba(255, 255, 255, 0.2);
}
.cam-teacher {
  top: 20rpx;
  background: linear-gradient(135deg, #1e6fff, #22c55e);
}
.cam-student {
  top: 220rpx;
  background: linear-gradient(135deg, #ff7043, #f59e0b);
}
.cam-ic {
  font-size: 56rpx;
}

/* ===== Tools ===== */
.tools-scroll {
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.05);
  padding: 20rpx 24rpx;
  margin-top: 20rpx;
}
.tools {
  display: inline-flex;
  gap: 16rpx;
}
.tool {
  flex-shrink: 0;
  padding: 20rpx 24rpx;
  border-radius: 20rpx;
  background: rgba(255, 255, 255, 0.1);
  text-align: center;
  min-width: 100rpx;
  border: 2rpx solid rgba(255, 255, 255, 0.1);
  transition: all .2s;
}
.tool-active {
  background: linear-gradient(135deg, #1e6fff, #22c55e);
  border-color: #1e6fff;
}
.tool-ic {
  display: block;
  font-size: 36rpx;
  margin-bottom: 6rpx;
}
.tool-txt {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.9);
}

/* ===== Actions ===== */
.actions {
  display: flex;
  gap: 20rpx;
  justify-content: center;
  padding: 40rpx 32rpx 20rpx;
}
.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8rpx;
  padding: 24rpx 32rpx;
  border-radius: 20rpx;
  background: rgba(255, 255, 255, 0.1);
  border: 2rpx solid rgba(255, 255, 255, 0.1);
  min-width: 120rpx;
}
.action-ic {
  font-size: 40rpx;
}
.action-txt {
  font-size: 22rpx;
  color: rgba(255, 255, 255, 0.9);
}
.btn-on {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  border-color: #22c55e;
}
.btn-off {
  background: rgba(239, 68, 68, 0.2);
  border-color: rgba(239, 68, 68, 0.5);
}
.btn-neutral {
  background: rgba(255, 255, 255, 0.1);
}

/* ===== End Button ===== */
.end-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12rpx;
  margin: 0 32rpx;
  padding: 28rpx;
  border-radius: 20rpx;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  border: none;
  box-shadow: 0 8rpx 24rpx rgba(239, 68, 68, 0.3);
}
.end-ic {
  font-size: 32rpx;
}
.end-txt {
  font-size: 28rpx;
  font-weight: 600;
  color: #fff;
}
</style>
