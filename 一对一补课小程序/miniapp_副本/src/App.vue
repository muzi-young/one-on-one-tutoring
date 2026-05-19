<script>
export default {
  onLaunch() { console.log('App Launch'); },
  onShow() {},
  onHide() {}
};
</script>

<style lang="scss">
/* ============================================
   教育专业风 · 全局设计令牌
   知识藍 #1e6fff · 班级绿 #22c55e · 成就橙 #ff7043
============================================ */
page {
  background: #f4f6fb;
  color: #1f2937;
  font-size: 28rpx;
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
  line-height: 1.55;
}

/* ============ 按钮系统 ============ */
.btn {
  padding: 22rpx 32rpx;
  border-radius: 14rpx;
  border: none;
  font-size: 28rpx;
  font-weight: 600;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8rpx;
  transition: all .2s;
}
.btn::after { border: none; }
.btn-pri {
  background: linear-gradient(135deg, #2978ff, #1e6fff);
  color: #fff;
  box-shadow: 0 8rpx 24rpx rgba(30, 111, 255, 0.35);
}
.btn-pri[disabled] {
  background: #c4d3f0 !important;
  color: #fff !important;
  box-shadow: none;
}
.btn-out {
  background: #fff;
  color: #1e6fff;
  border: 2rpx solid #1e6fff;
}
.btn-ghost {
  background: #eef3ff;
  color: #1e6fff;
}
.btn-warn {
  background: linear-gradient(135deg, #ff7043, #ff5722);
  color: #fff;
  box-shadow: 0 8rpx 24rpx rgba(255, 87, 34, 0.35);
}
.btn-success {
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #fff;
  box-shadow: 0 8rpx 24rpx rgba(34, 197, 94, 0.30);
}
.btn-block { width: 100%; }
.btn-sm { padding: 12rpx 22rpx; font-size: 24rpx; border-radius: 10rpx; }

/* ============ 卡片 ============ */
.card {
  background: #fff;
  border-radius: 24rpx;
  padding: 28rpx;
  margin-bottom: 24rpx;
  box-shadow: 0 4rpx 24rpx rgba(20, 50, 120, 0.05);
}
.card-h { font-size: 30rpx; font-weight: 700; color: #1f2937; margin-bottom: 18rpx; display: flex; align-items: center; gap: 10rpx; }
.card-h::before {
  content: ''; width: 6rpx; height: 26rpx; border-radius: 4rpx;
  background: linear-gradient(180deg, #1e6fff, #22c55e);
}

/* ============ 行布局 ============ */
.row { display: flex; align-items: center; }
.row-b { display: flex; justify-content: space-between; align-items: center; }

/* ============ 文字 ============ */
.muted { color: #94a3b8; font-size: 24rpx; }
.label { color: #64748b; font-size: 24rpx; }
.price {
  color: #ff5722;
  font-weight: 800;
  font-size: 36rpx;
  font-family: "DIN Alternate", -apple-system;
}
.price .unit { font-weight: 500; font-size: 22rpx; margin-left: 2rpx; }
.price-big {
  color: #ff5722;
  font-weight: 800;
  font-size: 52rpx;
  font-family: "DIN Alternate", -apple-system;
  line-height: 1;
}

/* ============ chip / 筛选 ============ */
.chip {
  display: inline-flex;
  align-items: center;
  padding: 12rpx 26rpx;
  background: #fff;
  border: 2rpx solid #e5e7eb;
  border-radius: 36rpx;
  font-size: 26rpx;
  color: #475569;
  margin: 0 14rpx 14rpx 0;
  font-weight: 500;
  transition: all .2s;
}
.chip.on {
  background: linear-gradient(135deg, #2978ff, #1e6fff);
  color: #fff;
  border-color: #1e6fff;
  box-shadow: 0 6rpx 18rpx rgba(30, 111, 255, 0.30);
}

/* ============ tag ============ */
.tag {
  display: inline-flex;
  align-items: center;
  font-size: 22rpx;
  padding: 4rpx 14rpx;
  border-radius: 8rpx;
  margin-right: 8rpx;
  font-weight: 600;
  line-height: 1.5;
}
.tag-blue { background: #e7f0ff; color: #1e6fff; }
.tag-green { background: #dcfce7; color: #16a34a; }
.tag-orange { background: #ffedd5; color: #ea580c; }
.tag-red { background: #fee2e2; color: #dc2626; }
.tag-purple { background: #ede9fe; color: #7c3aed; }
.tag-gold { background: #fef3c7; color: #d97706; }

/* ============ 徽章 / 数字角标 ============ */
.badge {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 32rpx; height: 32rpx; padding: 0 8rpx; border-radius: 16rpx;
  background: #ff5722; color: #fff; font-size: 20rpx; font-weight: 700;
}

/* ============ 头像 ============ */
.avatar {
  width: 72rpx; height: 72rpx; border-radius: 50%;
  background: linear-gradient(135deg, #1e6fff, #22c55e);
  color: #fff; display: flex; align-items: center; justify-content: center;
  font-size: 28rpx; font-weight: 600;
}

/* ============ 状态点 ============ */
.dot {
  display: inline-block; width: 12rpx; height: 12rpx; border-radius: 50%;
  margin-right: 8rpx;
}
.dot-live { background: #ef4444; box-shadow: 0 0 0 6rpx rgba(239, 68, 68, .2); }
.dot-ok { background: #22c55e; }
.dot-warn { background: #f59e0b; }

/* ============ 分割线 ============ */
.divider {
  height: 1rpx;
  background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
  margin: 24rpx 0;
}
</style>
