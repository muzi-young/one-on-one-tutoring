<template>
  <div class="vip-page">
    <!-- 头部 -->
    <header class="page-header">
      <button class="back-btn" @click="$router.back()">←</button>
      <h1 class="page-title">VIP会员</h1>
      <div class="placeholder"></div>
    </header>
    
    <!-- VIP 卡片 -->
    <div class="vip-card">
      <div class="card-bg"></div>
      <div class="card-content">
        <div class="card-header">
          <span class="vip-icon">👑</span>
          <div class="vip-info">
            <span class="vip-title">MAZU VIP</span>
            <span class="vip-subtitle">尊享会员权益</span>
          </div>
        </div>
        <div class="user-status" v-if="userInfo.isVip">
          <p class="status-text">当前服务有效期至</p>
          <p class="expire-date">{{ userInfo.vipExpireDate }}</p>
        </div>
        <div class="user-status" v-else>
          <p class="status-text">开通VIP，解锁全部功能</p>
        </div>
      </div>
    </div>
    
    <!-- 套餐选择 -->
    <div class="plans-section">
      <h3 class="section-title">选择套餐</h3>
      <div class="plan-list">
        <div 
          v-for="plan in plans"
          :key="plan.id"
          class="plan-item"
          :class="{ active: selectedPlan === plan.id, recommended: plan.recommended }"
          @click="selectedPlan = plan.id"
        >
          <span class="recommend-badge" v-if="plan.recommended">推荐</span>
          <span class="plan-name">{{ plan.name }}</span>
          <div class="plan-price">
            <span class="currency">¥</span>
            <span class="amount">{{ plan.price }}</span>
            <span class="unit">/{{ plan.unit }}</span>
          </div>
          <span class="plan-original" v-if="plan.originalPrice">原价 ¥{{ plan.originalPrice }}</span>
          <span class="plan-avg">约 ¥{{ plan.avgPrice }}/月</span>
        </div>
      </div>
    </div>
    
    <!-- 权益对比 -->
    <div class="benefits-section">
      <h3 class="section-title">会员权益对比</h3>
      <div class="benefits-table glass-card">
        <div class="table-header">
          <span class="col-name">功能</span>
          <span class="col-free">免费版</span>
          <span class="col-vip">VIP</span>
        </div>
        <div class="table-body">
          <div v-for="benefit in benefits" :key="benefit.name" class="table-row">
            <span class="col-name">{{ benefit.name }}</span>
            <span class="col-free">{{ benefit.free }}</span>
            <span class="col-vip">{{ benefit.vip }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- VIP 特权 -->
    <div class="features-section">
      <h3 class="section-title">VIP专属特权</h3>
      <div class="feature-grid">
        <div v-for="feature in features" :key="feature.name" class="feature-item">
          <span class="feature-icon">{{ feature.icon }}</span>
          <span class="feature-name">{{ feature.name }}</span>
          <span class="feature-desc">{{ feature.desc }}</span>
        </div>
      </div>
    </div>
    
    <!-- 购买按钮 -->
    <div class="purchase-section">
      <button class="btn-gold purchase-btn" @click="purchaseVip">
        <span>立即开通</span>
        <span class="price">¥{{ getSelectedPlan?.price }}</span>
      </button>
      <p class="agreement">
        开通即表示同意
        <a href="#">《VIP服务协议》</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/app'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const selectedPlan = ref('year')

const plans = [
  { id: 'month', name: '月度会员', price: 28, unit: '月', avgPrice: 28 },
  { id: 'quarter', name: '季度会员', price: 68, unit: '季', originalPrice: 84, avgPrice: 22.7 },
  { id: 'year', name: '年度会员', price: 198, unit: '年', originalPrice: 336, avgPrice: 16.5, recommended: true }
]

const getSelectedPlan = computed(() => plans.find(p => p.id === selectedPlan.value))

const benefits = [
  { name: '私属黄历解读', free: '每日1次', vip: '无限次' },
  { name: '妈祖对话', free: '5次/天', vip: '无限次' },
  { name: '择日服务', free: '2次/周', vip: '无限次' },
  { name: '助运壁纸', free: '3张/月', vip: '无限生成' },
  { name: '运程提前生成', free: '❌', vip: '✅' },
  { name: '多人命格拼配', free: '❌', vip: '✅' },
  { name: '专属客服', free: '❌', vip: '✅' }
]

const features = [
  { icon: '📿', name: '择天时', desc: '无限次吉日挑选' },
  { icon: '👁️', name: '窥天机', desc: '深度运程解读' },
  { icon: '✨', name: '助运势', desc: '专属壁纸生成' },
  { icon: '🤝', name: '选贵人', desc: '多人命格拼配' },
  { icon: '💬', name: '万事通', desc: '无限AI对话' },
  { icon: '📅', name: '私属历', desc: '提前生成运程' }
]

const purchaseVip = () => {
  const plan = getSelectedPlan.value
  alert(`即将支付 ¥${plan.price} 开通 ${plan.name}`)
}
</script>

<style lang="scss" scoped>
.vip-page {
  height: calc(812px - 44px);
  padding: 16px;
  padding-bottom: 120px;
  overflow-y: auto;
  
  &::-webkit-scrollbar { display: none; }
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  
  .back-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    color: var(--text-primary);
    font-size: 18px;
    cursor: pointer;
  }
  
  .page-title {
    font-size: 16px;
    font-weight: 500;
    color: var(--text-primary);
  }
  
  .placeholder { width: 36px; }
}

.vip-card {
  position: relative;
  height: 140px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 24px;
  
  .card-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #B8860B 0%, #FFD700 50%, #DAA520 100%);
    
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    }
  }
  
  .card-content {
    position: relative;
    z-index: 1;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    .card-header {
      display: flex;
      align-items: center;
      gap: 12px;
      
      .vip-icon {
        font-size: 32px;
      }
      
      .vip-info {
        display: flex;
        flex-direction: column;
        
        .vip-title {
          font-size: 20px;
          font-weight: 700;
          color: #1a0a2e;
        }
        
        .vip-subtitle {
          font-size: 12px;
          color: rgba(26, 10, 46, 0.7);
        }
      }
    }
    
    .user-status {
      .status-text {
        font-size: 12px;
        color: rgba(26, 10, 46, 0.7);
      }
      
      .expire-date {
        font-size: 16px;
        font-weight: 600;
        color: #1a0a2e;
      }
    }
  }
}

.section-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.plans-section {
  margin-bottom: 24px;
  
  .plan-list {
    display: flex;
    gap: 10px;
    
    .plan-item {
      flex: 1;
      padding: 16px 12px;
      background: var(--glass-bg);
      border: 2px solid var(--glass-border);
      border-radius: 16px;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
      position: relative;
      
      &.active {
        border-color: var(--mazu-gold);
        background: rgba(212, 175, 55, 0.1);
      }
      
      &.recommended {
        .recommend-badge {
          display: block;
        }
      }
      
      .recommend-badge {
        display: none;
        position: absolute;
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
        padding: 2px 10px;
        background: var(--mazu-gold);
        color: #1a0a2e;
        font-size: 10px;
        font-weight: 600;
        border-radius: 8px;
      }
      
      .plan-name {
        font-size: 12px;
        color: var(--text-secondary);
        display: block;
        margin-bottom: 8px;
      }
      
      .plan-price {
        margin-bottom: 4px;
        
        .currency {
          font-size: 12px;
          color: var(--mazu-gold);
        }
        
        .amount {
          font-size: 24px;
          font-weight: 700;
          color: var(--mazu-gold);
        }
        
        .unit {
          font-size: 11px;
          color: var(--text-tertiary);
        }
      }
      
      .plan-original {
        font-size: 10px;
        color: var(--text-tertiary);
        text-decoration: line-through;
        display: block;
      }
      
      .plan-avg {
        font-size: 10px;
        color: var(--text-tertiary);
        display: block;
        margin-top: 4px;
      }
    }
  }
}

.benefits-section {
  margin-bottom: 24px;
  
  .benefits-table {
    padding: 0;
    overflow: hidden;
    
    .table-header, .table-row {
      display: flex;
      padding: 12px 16px;
      
      .col-name { flex: 2; }
      .col-free, .col-vip { flex: 1; text-align: center; }
    }
    
    .table-header {
      background: rgba(255, 255, 255, 0.05);
      font-size: 12px;
      color: var(--text-tertiary);
    }
    
    .table-row {
      border-bottom: 1px solid var(--glass-border);
      font-size: 13px;
      
      &:last-child { border-bottom: none; }
      
      .col-name { color: var(--text-secondary); }
      .col-free { color: var(--text-tertiary); }
      .col-vip { color: var(--mazu-gold); }
    }
  }
}

.features-section {
  margin-bottom: 24px;
  
  .feature-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    
    .feature-item {
      padding: 16px 8px;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: 12px;
      text-align: center;
      
      .feature-icon {
        font-size: 24px;
        display: block;
        margin-bottom: 8px;
      }
      
      .feature-name {
        font-size: 13px;
        color: var(--text-primary);
        display: block;
        margin-bottom: 4px;
      }
      
      .feature-desc {
        font-size: 10px;
        color: var(--text-tertiary);
      }
    }
  }
}

.purchase-section {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 24px;
  padding-bottom: 30px;
  background: linear-gradient(180deg, transparent 0%, var(--mazu-purple-deep) 30%);
  
  .purchase-btn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    
    .price {
      padding: 4px 12px;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 12px;
    }
  }
  
  .agreement {
    text-align: center;
    font-size: 11px;
    color: var(--text-tertiary);
    margin-top: 12px;
    
    a {
      color: var(--mazu-gold);
    }
  }
}
</style>
