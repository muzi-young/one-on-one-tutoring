<template>
  <div class="page-container">
    <header class="page-header">
      <button class="back-btn" @click="$router.back()">←</button>
      <h1 class="page-title">择日详情</h1>
      <div class="placeholder"></div>
    </header>
    
    <div class="detail-banner">
      <span class="detail-icon">{{ record.icon }}</span>
      <h2>{{ record.event }}</h2>
    </div>
    
    <div class="detail-card glass-card">
      <div class="info-row highlight">
        <span class="info-label">择定日期</span>
        <span class="info-value gold">{{ record.selectedDate }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">农历</span>
        <span class="info-value">{{ record.lunar }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">干支</span>
        <span class="info-value">{{ record.ganzhi }}</span>
      </div>
      <div class="info-row">
        <span class="info-label">匹配度</span>
        <span class="info-value stars">{{ '⭐'.repeat(record.stars) }}</span>
      </div>
    </div>
    
    <div class="section glass-card">
      <h3 class="section-title">宜做事项</h3>
      <div class="tag-list">
        <span v-for="item in record.suitable" :key="item" class="tag yi">{{ item }}</span>
      </div>
    </div>
    
    <div class="section glass-card">
      <h3 class="section-title">吉时推荐</h3>
      <div class="shichen-list">
        <div v-for="sc in record.luckyTimes" :key="sc.name" class="shichen-item">
          <span class="sc-name">{{ sc.name }}</span>
          <span class="sc-time">{{ sc.time }}</span>
        </div>
      </div>
    </div>
    
    <div class="section glass-card">
      <h3 class="section-title">择日建议</h3>
      <p class="advice-text">{{ record.advice }}</p>
    </div>
    
    <div class="detail-footer">
      <span class="create-time">创建于 {{ record.createdAt }}</span>
    </div>
    
    <button class="btn-outline delete-btn" @click="deleteRecord">删除此记录</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const recordId = route.params.id

const record = ref({
  id: 1,
  event: '搬家入宅',
  icon: '🏠',
  selectedDate: '2026-04-30',
  lunar: '农历三月十四',
  ganzhi: '丙午年·壬辰月·戊子日',
  stars: 6,
  suitable: ['搬迁', '入宅', '动土', '祭祀', '安床', '开市'],
  luckyTimes: [
    { name: '辰时', time: '07:00-09:00' },
    { name: '巳时', time: '09:00-11:00' },
    { name: '未时', time: '13:00-15:00' }
  ],
  advice: '此日天时与你的命盘高度匹配，壬水日主遇戊土，形成正官格局，利于重大决策。搬家时建议从东南方向入宅，可带一盆绑有红绳的绿植，寓意生机勃勃、红红火火。',
  createdAt: '2026-04-10'
})

const deleteRecord = () => {
  if (confirm('确定要删除这条择日记录吗？')) {
    alert('记录已删除')
    router.back()
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  height: calc(812px - 44px);
  padding: 16px;
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

.detail-banner {
  text-align: center;
  padding: 24px;
  margin-bottom: 20px;
  
  .detail-icon { font-size: 56px; display: block; margin-bottom: 12px; }
  h2 { font-size: 20px; color: var(--text-primary); font-weight: 500; }
}

.glass-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 18px;
  margin-bottom: 16px;
}

.detail-card {
  .info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 0;
    border-bottom: 1px solid var(--glass-border);
    
    &:last-child { border-bottom: none; }
    
    &.highlight {
      background: rgba(212, 175, 55, 0.05);
      margin: -18px -18px 0;
      padding: 18px;
      border-radius: 16px 16px 0 0;
      border-bottom: 1px solid var(--glass-border);
    }
    
    .info-label { font-size: 14px; color: var(--text-tertiary); }
    .info-value { font-size: 14px; color: var(--text-secondary); }
    .info-value.gold { color: var(--mazu-gold); font-size: 16px; font-weight: 600; }
    .info-value.stars { font-size: 13px; }
  }
}

.section-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 14px;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  
  .tag {
    padding: 8px 16px;
    border-radius: 10px;
    font-size: 13px;
    
    &.yi {
      background: rgba(74, 222, 128, 0.15);
      color: #4ade80;
    }
  }
}

.shichen-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  
  .shichen-item {
    padding: 12px 16px;
    background: rgba(212, 175, 55, 0.1);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    
    .sc-name { font-size: 14px; color: var(--mazu-gold); font-weight: 500; }
    .sc-time { font-size: 11px; color: var(--text-tertiary); }
  }
}

.advice-text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.8;
}

.detail-footer {
  text-align: center;
  padding: 16px;
  
  .create-time { font-size: 12px; color: var(--text-tertiary); }
}

.delete-btn {
  width: 100%;
  color: #f87171;
  border-color: rgba(248, 113, 113, 0.3);
  margin-bottom: 20px;
  
  &:hover {
    background: rgba(248, 113, 113, 0.1);
  }
}
</style>
