<template>
  <view class="page">
    <view class="card">
      <view class="form-item">
        <text class="label">关联预约</text>
        <picker :range="bookingLabels" :value="pickerIdx" @change="onPick">
          <view class="input">{{ bookingLabels[pickerIdx] || '请选择预约' }}</view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label">会议主题</text>
        <input v-model="subject" class="input" />
      </view>
      <view class="form-item">
        <text class="label">开始时间</text>
        <view class="input">{{ startAt }}</view>
      </view>
      <view class="form-item">
        <text class="label">课时时长</text>
        <picker :range="durations" :value="durationIdx" @change="e => durationIdx = e.detail.value">
          <view class="input">{{ durations[durationIdx] }} 分钟</view>
        </picker>
      </view>
      <view class="form-item">
        <text class="label">会议密码（可选）</text>
        <input v-model="password" placeholder="留空则自动生成" class="input" />
      </view>
    </view>

    <view class="card">
      <view class="h">⚙️ 课堂功能</view>
      <view v-for="(v, k) in features" :key="k" class="switch-row">
        <text>{{ featureLabel[k] }}</text>
        <switch :checked="v" @change="e => features[k] = e.detail.value" color="#4f7cff" />
      </view>
    </view>

    <view class="muted" style="text-align:center;font-size:22rpx;padding:0 30rpx">
      会议创建后将自动同步至小程序，学生可在「我的预约」中进入
    </view>

    <button class="btn btn-pri btn-block" style="margin:30rpx" @tap="submit">创建会议并发送通知</button>
  </view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { api } from '@/api';

const bookings = ref([]);
const pickerIdx = ref(0);
const subject = ref('');
const password = ref('');
const durations = [40, 60, 90];
const durationIdx = ref(1);
const features = reactive({ camera: true, whiteboard: true, screenShare: true, courseware: true, record: false });
const featureLabel = { camera:'📹 自动开启摄像头', whiteboard:'📐 互动白板', screenShare:'📺 屏幕共享', courseware:'📑 课件投屏', record:'🔴 课堂录制' };

const bookingLabels = computed(() =>
  bookings.value.map(b => `${b.student?.nickname} · ${new Date(b.startAt).toLocaleString('zh-CN').slice(5, 16)}`)
);
const startAt = computed(() => {
  const b = bookings.value[pickerIdx.value];
  return b ? new Date(b.startAt).toLocaleString('zh-CN') : '-';
});

onLoad(async (q) => {
  bookings.value = (await api.teacherBookings()).filter(b => b.status === 'booked');
  if (q.bookingId) {
    const idx = bookings.value.findIndex(b => b.id === Number(q.bookingId));
    if (idx >= 0) pickerIdx.value = idx;
  }
  if (bookings.value[pickerIdx.value]) {
    subject.value = `${bookings.value[pickerIdx.value].course?.title} - ${bookings.value[pickerIdx.value].student?.nickname}`;
  }
});

const onPick = (e) => {
  pickerIdx.value = e.detail.value;
  const b = bookings.value[pickerIdx.value];
  if (b) subject.value = `${b.course?.title} - ${b.student?.nickname}`;
};

const submit = async () => {
  const b = bookings.value[pickerIdx.value];
  if (!b) return uni.showToast({ title: '请选择预约', icon: 'none' });
  const m = await api.createMeeting({
    bookingId: b.id, subject: subject.value,
    password: password.value || undefined, features
  });
  uni.showModal({
    title: '✅ 会议创建成功',
    content: `会议号：${m.meetingNo}\n密码：${m.password}`,
    showCancel: false,
    success: () => uni.reLaunch({ url: '/pages/teacher/home' })
  });
};
</script>

<style lang="scss" scoped>
.page { padding: 24rpx; padding-bottom: 60rpx; }
.card { background: #fff; border-radius: 20rpx; padding: 28rpx; margin-bottom: 24rpx; }
.form-item { margin-bottom: 22rpx; }
.label { display: block; font-size: 24rpx; color: #666; margin-bottom: 10rpx; }
.input {
  border: 1rpx solid #e3e6ef; border-radius: 12rpx; padding: 18rpx 24rpx;
  font-size: 26rpx; background: #fff;
}
.h { font-weight: 600; margin-bottom: 16rpx; }
.switch-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 18rpx 0; border-bottom: 1rpx solid #f3f3f3; font-size: 26rpx;
}
.switch-row:last-child { border: none; }
.muted { color: #999; }
</style>
