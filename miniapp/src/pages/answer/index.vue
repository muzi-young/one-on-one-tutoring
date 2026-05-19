<template>
  <view class="page">
    <view class="muted">第 {{ idx + 1 }} / {{ list.length }} 题</view>
    <view v-if="cur" class="card">
      <view class="q">{{ cur.content }}</view>
      <view v-for="(opt, i) in cur.options" :key="i"
            :class="['opt', picked===letter(i) && 'on', result.show && letter(i)===cur.answer && 'right', result.show && picked===letter(i) && picked!==cur.answer && 'wrong']"
            @tap="!result.show && (picked=letter(i))">
        {{ opt }}
      </view>
      <view v-if="result.show" class="analysis">
        <text :style="{ color: result.correct ? '#38a169' : '#ff5e62' }">
          {{ result.correct ? '✅ 回答正确' : '❌ 回答错误' }}
        </text>
        <view class="muted" style="margin-top:8rpx">解析：{{ cur.analysis }}</view>
      </view>
    </view>

    <view v-if="!list.length" class="muted" style="text-align:center;padding:100rpx 0">暂无题目</view>

    <view style="height:140rpx"></view>
    <view class="footer">
      <button class="btn btn-out" @tap="prev" :disabled="idx===0">上一题</button>
      <button class="btn btn-pri btn-block" @tap="onAction">
        {{ result.show ? (idx===list.length-1 ? '完成' : '下一题') : '提交' }}
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { api } from '@/api';

const list = ref([]);
const idx = ref(0);
const picked = ref('');
const result = reactive({ show: false, correct: false });
let bookingId;

const cur = computed(() => list.value[idx.value]);
const letter = (i) => ['A','B','C','D','E'][i];

onLoad(async (q) => {
  bookingId = q.bookingId ? Number(q.bookingId) : undefined;
  const courses = (await api.courseList({})).list;
  if (courses[0]) list.value = await api.questions({ courseId: courses[0].id, limit: 5 });
});

const submit = async () => {
  if (!picked.value) return uni.showToast({ title: '请选择答案', icon: 'none' });
  const r = await api.submitAnswer({ questionId: cur.value.id, answer: picked.value, bookingId });
  result.correct = r.correct;
  result.show = true;
};
const prev = () => { if (idx.value > 0) { idx.value--; picked.value=''; result.show=false; } };
const onAction = () => {
  if (!result.show) return submit();
  if (idx.value === list.value.length - 1) {
    uni.showToast({ title: '🎉 全部完成' });
    setTimeout(() => uni.navigateBack(), 800);
  } else {
    idx.value++; picked.value = ''; result.show = false;
  }
};
</script>

<style lang="scss" scoped>
.page { padding: 24rpx; padding-bottom: 140rpx; }
.muted { color: #999; font-size: 24rpx; margin-bottom: 16rpx; }
.card { background: #fff; border-radius: 20rpx; padding: 28rpx; }
.q { font-size: 30rpx; line-height: 1.6; margin-bottom: 16rpx; }
.opt {
  padding: 20rpx; border: 2rpx solid #e3e6ef; border-radius: 16rpx;
  margin-top: 16rpx; font-size: 26rpx;
}
.opt.on { border-color: #4f7cff; background: #f0f4ff; }
.opt.right { border-color: #38ef7d; background: #eafff3; }
.opt.wrong { border-color: #ff5e62; background: #ffeaea; }
.analysis { margin-top: 24rpx; padding: 20rpx; background: #f6f7fb; border-radius: 16rpx; }
.footer {
  position: fixed; bottom: 0; left: 0; right: 0; background: #fff;
  padding: 20rpx; display: flex; gap: 20rpx; border-top: 1rpx solid #eee;
  padding-bottom: calc(20rpx + env(safe-area-inset-bottom));
}
</style>
