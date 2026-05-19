<template>
  <view class="page">
    <!-- 头部个人信息 -->
    <view class="header">
      <view class="header-bg"></view>
      <view class="header-content">
        <view class="user-row">
          <image v-if="user?.avatar" :src="user.avatar" class="avatar avatar-img" mode="aspectFill" />
          <view v-else class="avatar avatar-ph">{{ user ? (user.nickname || '我')[0] : '我' }}</view>
          <view class="user-info">
            <view class="user-name">{{ user?.nickname || '未登录' }}</view>
            <view class="user-meta">
              <text class="tag tag-white">{{ user?.grade || '高三' }}</text>
              <text class="tag tag-white">已学 12 节</text>
            </view>
          </view>
          <view class="setting-btn" @tap="toLogin">⚙️</view>
        </view>

        <!-- 数据统计 -->
        <view class="stats">
          <view class="stat-item">
            <text class="stat-val">10</text>
            <text class="stat-label">剩余课时</text>
          </view>
          <view class="stat-item">
            <text class="stat-val">{{ couponCount }}</text>
            <text class="stat-label">优惠券</text>
          </view>
          <view class="stat-item">
            <text class="stat-val">¥{{ user?.walletCommission ?? 0 }}</text>
            <text class="stat-label">佣金</text>
          </view>
          <view class="stat-item">
            <text class="stat-val">5</text>
            <text class="stat-label">已邀请</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 功能菜单 -->
    <view class="menu-section">
      <view class="section-title">学习管理</view>
      <view class="menu-card">
        <view class="menu-item" @tap="go('/pages/booking/mine')">
          <view class="menu-left">
            <text class="menu-ic">📋</text>
            <text class="menu-txt">我的预约</text>
          </view>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @tap="go('/pages/order/list')">
          <view class="menu-left">
            <text class="menu-ic">📦</text>
            <text class="menu-txt">我的订单</text>
          </view>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @tap="go('/pages/courseware/index')">
          <view class="menu-left">
            <text class="menu-ic">📑</text>
            <text class="menu-txt">我的课件</text>
          </view>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item">
          <view class="menu-left">
            <text class="menu-ic">📝</text>
            <text class="menu-txt">错题本</text>
          </view>
          <view class="menu-right">
            <text class="badge">12</text>
            <text class="menu-arrow">›</text>
          </view>
        </view>
      </view>
    </view>

    <view class="menu-section">
      <view class="section-title">优惠与推广</view>
      <view class="menu-card">
        <view class="menu-item" @tap="go('/pages/coupon/index')">
          <view class="menu-left">
            <text class="menu-ic">🎟</text>
            <text class="menu-txt">卡券中心</text>
          </view>
          <view class="menu-right">
            <text class="badge">{{ couponCount }} 张可用</text>
            <text class="menu-arrow">›</text>
          </view>
        </view>
        <view class="menu-item" @tap="go('/pages/poster/index')">
          <view class="menu-left">
            <text class="menu-ic">🎁</text>
            <text class="menu-txt">邀请好友赚佣金</text>
          </view>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item">
          <view class="menu-left">
            <text class="menu-ic">⭐</text>
            <text class="menu-txt">我的评价</text>
          </view>
          <text class="menu-arrow">›</text>
        </view>
      </view>
    </view>

    <view class="menu-section">
      <view class="section-title">其他</view>
      <view class="menu-card">
        <view class="menu-item">
          <view class="menu-left">
            <text class="menu-ic">💬</text>
            <text class="menu-txt">在线客服</text>
          </view>
          <text class="menu-arrow">›</text>
        </view>
        <view class="menu-item" @tap="logout">
          <view class="menu-left">
            <text class="menu-ic" style="color: #ef4444;">🚪</text>
            <text class="menu-txt" style="color: #ef4444;">退出登录</text>
          </view>
          <text class="menu-arrow">›</text>
        </view>
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
const coupons = ref([]);
const couponCount = computed(() => coupons.value.filter(c => c.status === 'unused').length);

onShow(async () => {
  if (userStore.token) {
    try {
      await userStore.fetchMe();
      coupons.value = await api.myCoupons();
    } catch (e) { }
  }
});

const go = (url) => uni.navigateTo({ url });
const toLogin = () => uni.navigateTo({ url: '/pages/login/index' });
const logout = () => {
  userStore.logout();
  uni.reLaunch({ url: '/pages/login/index' });
};
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
  background: linear-gradient(135deg, #1e6fff, #22c55e);
  border-bottom-left-radius: 40rpx;
  border-bottom-right-radius: 40rpx;
  z-index: 0;
}
.header-content {
  position: relative;
  z-index: 1;
  padding-bottom: 40rpx;
}

.user-row {
  display: flex;
  align-items: center;
  gap: 20rpx;
  margin-bottom: 32rpx;
}
.avatar {
  width: 110rpx;
  height: 110rpx;
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
  font-size: 44rpx;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
.user-info {
  flex: 1;
}
.user-name {
  font-size: 34rpx;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10rpx;
}
.user-meta {
  display: flex;
  gap: 10rpx;
}
.setting-btn {
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

/* ===== Menu Sections ===== */
.menu-section {
  margin-top: 32rpx;
  padding: 0 24rpx;
}
.section-title {
  font-size: 26rpx;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 16rpx;
  padding-left: 8rpx;
}
.menu-card {
  background: #fff;
  border-radius: 24rpx;
  overflow: hidden;
  box-shadow: 0 4rpx 24rpx rgba(20, 50, 120, 0.06);
}
.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28rpx 24rpx;
  border-bottom: 1rpx solid #f1f5f9;
}
.menu-item:last-child {
  border: none;
}
.menu-left {
  display: flex;
  align-items: center;
  gap: 16rpx;
}
.menu-ic {
  font-size: 36rpx;
  width: 48rpx;
  text-align: center;
}
.menu-txt {
  font-size: 28rpx;
  color: #1f2937;
}
.menu-right {
  display: flex;
  align-items: center;
  gap: 12rpx;
}
.menu-arrow {
  font-size: 40rpx;
  color: #cbd5e1;
  font-weight: 300;
}
.badge {
  font-size: 22rpx;
  color: #ff7043;
  font-weight: 600;
}
</style>
