<template>
  <view class="page">
    <view class="bg-shapes">
      <view class="shape s1"></view>
      <view class="shape s2"></view>
      <view class="shape s3"></view>
    </view>

    <view class="content">
      <view class="logo-area">
        <image src="/static/logo.svg" class="logo-img" mode="aspectFit" />
        <view class="brand-name">高分一对一</view>
        <view class="brand-slogan">高中全科 · 名师 1V1 · 在线补课</view>
      </view>

      <view class="role-cards">
        <view class="role-card" @tap="login('student')">
          <view class="role-bg student-bg"></view>
          <view class="role-content">
            <view class="role-ic">🎓</view>
            <view class="role-title">我是学生 / 家长</view>
            <view class="role-desc">购买课程 · 预约补课 · 上课学习</view>
            <view class="role-arrow">›</view>
          </view>
        </view>

        <view class="role-card" @tap="login('teacher')">
          <view class="role-bg teacher-bg"></view>
          <view class="role-content">
            <view class="role-ic">👨‍🏫</view>
            <view class="role-title">我是老师</view>
            <view class="role-desc">授课管理 · 创建会议 · 管理学生</view>
            <view class="role-arrow">›</view>
          </view>
        </view>
      </view>

      <view class="login-tip">
        <text class="dot dot-ok"></text>
        <text>微信一键登录</text>
        <text class="muted">· 已阅读《用户协议》</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { useUserStore } from '@/store/user';
const userStore = useUserStore();

const login = async (role) => {
  uni.showLoading({ title: '登录中' });
  try {
    await userStore.login({
      mockOpenid: role === 'teacher' ? 'tch_wangxue' : 'stu_xm',
      role
    });
    uni.hideLoading();
    if (role === 'teacher') {
      uni.reLaunch({ url: '/pages/teacher/home' });
    } else {
      uni.switchTab({ url: '/pages/index/index' });
    }
  } catch (e) {
    uni.hideLoading();
  }
};
</script>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  position: relative;
  overflow: hidden;
}

/* 背景装饰 */
.bg-shapes { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
.shape {
  position: absolute; border-radius: 50%; opacity: 0.08;
  filter: blur(60rpx);
}
.s1 { width: 400rpx; height: 400rpx; background: #1e6fff; top: -100rpx; right: -100rpx; }
.s2 { width: 300rpx; height: 300rpx; background: #22c55e; bottom: 200rpx; left: -80rpx; }
.s3 { width: 200rpx; height: 200rpx; background: #ff7043; bottom: 100rpx; right: 60rpx; }

.content {
  position: relative; z-index: 1;
  padding: 80rpx 32rpx 40rpx;
  display: flex; flex-direction: column; min-height: 100vh;
}

/* Logo 区域 */
.logo-area {
  text-align: center;
  margin-bottom: 60rpx;
}
.logo-img {
  width: 180rpx; height: 180rpx;
  margin-bottom: 24rpx;
}
.brand-name {
  font-size: 48rpx; font-weight: 800;
  background: linear-gradient(135deg, #1e6fff, #22c55e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 2rpx;
}
.brand-slogan {
  font-size: 24rpx; color: #64748b; margin-top: 12rpx; letter-spacing: 1rpx;
}

/* 角色卡片 */
.role-cards { display: flex; flex-direction: column; gap: 20rpx; }
.role-card {
  position: relative;
  background: #fff;
  border-radius: 28rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 24rpx rgba(20, 50, 120, 0.08);
  transition: all .3s;
}
.role-card:active { transform: scale(0.98); }

.role-bg {
  position: absolute; inset: 0;
  opacity: 0.03;
}
.student-bg { background: linear-gradient(135deg, #1e6fff, #22c55e); }
.teacher-bg { background: linear-gradient(135deg, #ff7043, #f59e0b); }

.role-content {
  position: relative;
  padding: 36rpx 28rpx;
  display: flex; align-items: center; gap: 20rpx;
}
.role-ic {
  width: 88rpx; height: 88rpx;
  border-radius: 22rpx;
  background: linear-gradient(135deg, #1e6fff, #22c55e);
  display: flex; align-items: center; justify-content: center;
  font-size: 48rpx;
  flex-shrink: 0;
}
.role-title {
  font-size: 30rpx; font-weight: 700; color: #1f2937;
  margin-bottom: 6rpx;
}
.role-desc {
  font-size: 22rpx; color: #64748b;
}
.role-arrow {
  margin-left: auto;
  font-size: 48rpx; color: #cbd5e1; font-weight: 300;
}

/* 登录提示 */
.login-tip {
  text-align: center;
  margin-top: 60rpx;
  font-size: 24rpx; color: #64748b;
}
</style>
