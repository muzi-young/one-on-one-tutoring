<template>
  <div class="page-container">
    <header class="page-header">
      <button class="back-btn" @click="$router.back()">←</button>
      <h1 class="page-title">我的择日记录</h1>
      <div class="placeholder"></div>
    </header>
    
    <div class="zeday-list">
      <div 
        v-for="record in zedayRecords" 
        :key="record.id" 
        class="zeday-item"
        @click="viewDetail(record)"
      >
        <div class="zeday-icon">{{ record.icon }}</div>
        <div class="zeday-info">
          <span class="zeday-event">{{ record.event }}</span>
          <span class="zeday-date">择定日期：{{ record.selectedDate }}</span>
          <span class="zeday-time">创建时间：{{ record.createdAt }}</span>
        </div>
        <span class="zeday-arrow">→</span>
      </div>
      
      <div v-if="!zedayRecords.length" class="empty-state">
        <span class="empty-icon">🔮</span>
        <p>暂无择日记录</p>
        <button class="btn-gold create-btn" @click="$router.push('/zeday')">去择日</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const zedayRecords = ref([
  {
    id: 1,
    event: '搬家入宅',
    icon: '🏠',
    selectedDate: '2026-04-30',
    createdAt: '2026-04-10'
  },
  {
    id: 2,
    event: '商务签约',
    icon: '📝',
    selectedDate: '2026-05-08',
    createdAt: '2026-04-15'
  },
  {
    id: 3,
    event: '相亲约会',
    icon: '💕',
    selectedDate: '2026-05-15',
    createdAt: '2026-04-18'
  }
])

const viewDetail = (record) => {
  router.push(`/profile/zeday-detail/${record.id}`)
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

.zeday-list {
  .zeday-item {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 18px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    margin-bottom: 12px;
    cursor: pointer;
    transition: border-color 0.2s;
    
    &:hover {
      border-color: var(--mazu-gold);
    }
    
    .zeday-icon { font-size: 32px; }
    
    .zeday-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
      
      .zeday-event { font-size: 15px; color: var(--text-primary); font-weight: 500; }
      .zeday-date { font-size: 13px; color: var(--mazu-gold); }
      .zeday-time { font-size: 12px; color: var(--text-tertiary); }
    }
    
    .zeday-arrow { color: var(--text-tertiary); font-size: 18px; }
  }
  
  .empty-state {
    text-align: center;
    padding: 60px 20px;
    
    .empty-icon { font-size: 56px; display: block; margin-bottom: 16px; opacity: 0.6; }
    p { color: var(--text-tertiary); font-size: 14px; margin-bottom: 24px; }
    .create-btn { padding: 12px 32px; }
  }
}
</style>
