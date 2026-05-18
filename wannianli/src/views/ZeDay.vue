<template>
  <div class="zeday-page">
    <!-- 头部 -->
    <header class="page-header">
      <button class="back-btn" @click="$router.back()">←</button>
      <h1 class="page-title">妈祖择日</h1>
      <button class="history-btn" @click="showHistory = true">📋</button>
    </header>
    
    <!-- 妈祖动效形象 -->
    <div class="mazu-animation">
      <div class="orbit-ring" :class="{ spinning: isSearching }">
        <div class="orbit-item" v-for="i in 8" :key="i" :style="{ '--i': i }">
          <span class="orbit-icon">{{ orbitIcons[i-1] }}</span>
        </div>
      </div>
      <MazuAvatar 
        size="large" 
        :animate="isSearching" 
        :glow="true" 
        class="center-avatar"
      />
      <p class="animation-hint" v-if="isSearching">{{ searchingText }}</p>
    </div>
    
    <!-- 择日表单 -->
    <div class="zeday-form glass-card" v-if="!showResult">
      <div class="form-group">
        <label>描述你的事件</label>
        <div class="event-select">
          <button 
            v-for="evt in eventTypes"
            :key="evt.value"
            class="event-btn"
            :class="{ active: selectedEvent === evt.value }"
            @click="selectedEvent = evt.value"
          >
            <span class="evt-icon">{{ evt.icon }}</span>
            <span class="evt-label">{{ evt.label }}</span>
          </button>
        </div>
        <input 
          v-if="selectedEvent === 'custom'"
          v-model="customEvent"
          type="text"
          class="input-field"
          placeholder="请描述您想择日的事件..."
        />
      </div>
      
      <div class="form-group">
        <label>选择查询时间范围</label>
        <div class="date-range">
          <div class="date-input">
            <span class="label">开始时间</span>
            <input type="date" v-model="startDate" class="input-field" />
          </div>
          <div class="date-input">
            <span class="label">结束时间</span>
            <input type="date" v-model="endDate" class="input-field" />
          </div>
        </div>
      </div>
      
      <button class="btn-gold zeday-btn" @click="startSearch" :disabled="isSearching">
        {{ isSearching ? '正在择日...' : '开始择日' }}
      </button>
    </div>
    
    <!-- 择日结果 -->
    <div class="zeday-result" v-else>
      <div class="result-header glass-card">
        <h3>{{ getEventLabel(selectedEvent) }}</h3>
        <p class="date-range-text">{{ startDate }} ~ {{ endDate }}</p>
        <p class="result-hint">遵循传统黄道吉日的天干地支与个人命理五行的最佳匹配</p>
      </div>
      
      <!-- 最佳吉日 -->
      <div class="best-day glass-card">
        <div class="best-badge">最佳吉日</div>
        <div class="day-main">
          <span class="day-date">{{ bestDay.date }}</span>
          <div class="day-info">
            <span class="lunar">{{ bestDay.lunar }}</span>
            <span class="ganzhi">{{ bestDay.ganzhi }}</span>
          </div>
          <div class="day-score">
            <span class="stars">⭐⭐⭐⭐⭐⭐</span>
            <span class="score-text">六星吉日</span>
          </div>
        </div>
        <div class="day-detail">
          <div class="yiji">
            <span class="yi">宜：{{ bestDay.suitable.join('·') }}</span>
          </div>
          <p class="advice">{{ bestDay.advice }}</p>
        </div>
        <button class="select-btn" @click="selectDay(bestDay)">选择此日</button>
      </div>
      
      <!-- 备选吉日 -->
      <div class="alternate-days">
        <h4>备选吉日</h4>
        <div class="day-list">
          <div v-for="day in alternateDays" :key="day.date" class="day-item glass-card">
            <div class="day-main">
              <span class="day-date">{{ day.date }}</span>
              <span class="lunar">{{ day.lunar }}</span>
            </div>
            <div class="day-score">
              <span class="stars">{{ '⭐'.repeat(day.stars) }}</span>
            </div>
            <button class="view-btn" @click="viewDayDetail(day)">查看</button>
          </div>
        </div>
      </div>
      
      <button class="btn-outline reset-btn" @click="resetSearch">重新择日</button>
    </div>
    
    <!-- 历史记录弹窗 -->
    <div class="history-modal" v-if="showHistory" @click.self="showHistory = false">
      <div class="modal-content glass-card">
        <div class="modal-header">
          <h3>我的择日记录</h3>
          <button class="close-btn" @click="showHistory = false">×</button>
        </div>
        <div class="history-list">
          <div v-for="record in historyRecords" :key="record.id" class="history-item">
            <div class="record-info">
              <span class="record-event">{{ record.event }}</span>
              <span class="record-date">{{ record.selectedDate }}</span>
            </div>
            <span class="record-time">{{ record.createdAt }}</span>
          </div>
          <div v-if="!historyRecords.length" class="empty-state">
            <span>暂无择日记录</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部导航 -->
    <TabBar />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MazuAvatar from '@/components/MazuAvatar.vue'
import TabBar from '@/components/TabBar.vue'

const isSearching = ref(false)
const searchingText = ref('正在查询周期生肖冲煞...')
const showResult = ref(false)
const showHistory = ref(false)

const selectedEvent = ref('')
const customEvent = ref('')
const startDate = ref('')
const endDate = ref('')

const orbitIcons = ['金', '木', '水', '火', '土', '☯', '☰', '☵']

const eventTypes = [
  { value: 'move', label: '搬家', icon: '🏠' },
  { value: 'wedding', label: '嫁娶', icon: '💒' },
  { value: 'sign', label: '签约', icon: '📝' },
  { value: 'meeting', label: '谈判', icon: '🤝' },
  { value: 'travel', label: '出行', icon: '✈️' },
  { value: 'custom', label: '其他', icon: '✏️' }
]

const getEventLabel = (value) => {
  const evt = eventTypes.find(e => e.value === value)
  return evt ? `适合${evt.label}的日子` : '最佳选择'
}

const bestDay = ref({
  date: '2026-04-30',
  lunar: '农历三月十四',
  ganzhi: '丙午年·壬辰月·戊子日',
  suitable: ['动土', '搬迁', '祭祀', '除尘'],
  advice: '此日天时与你的命盘高度匹配，壬水日主遇戊土，形成正官格局，利于重大决策。',
  stars: 6
})

const alternateDays = ref([
  { date: '2026-05-02', lunar: '农历三月十六', stars: 5 },
  { date: '2026-05-08', lunar: '农历三月廿二', stars: 5 },
  { date: '2026-05-15', lunar: '农历三月廿九', stars: 4 }
])

const historyRecords = ref([
  { id: 1, event: '搬家', selectedDate: '2026-03-18', createdAt: '2026-03-10' },
  { id: 2, event: '签约', selectedDate: '2026-02-20', createdAt: '2026-02-15' }
])

const startSearch = () => {
  if (!selectedEvent.value) {
    alert('请选择事件类型')
    return
  }
  if (!startDate.value || !endDate.value) {
    alert('请选择时间范围')
    return
  }
  
  isSearching.value = true
  searchingText.value = '正在查询周期生肖冲煞...'
  
  setTimeout(() => {
    searchingText.value = '正在匹配个人命盘...'
  }, 1000)
  
  setTimeout(() => {
    searchingText.value = '正在计算天人合一指数...'
  }, 2000)
  
  setTimeout(() => {
    isSearching.value = false
    showResult.value = true
  }, 3000)
}

const resetSearch = () => {
  showResult.value = false
  selectedEvent.value = ''
  startDate.value = ''
  endDate.value = ''
}

const selectDay = (day) => {
  alert(`已选择 ${day.date} 作为您的吉日！`)
}

const viewDayDetail = (day) => {
  alert(`查看 ${day.date} 详情`)
}
</script>

<style lang="scss" scoped>
.zeday-page {
  height: calc(812px - 44px);
  padding: 16px;
  padding-bottom: 96px;
  overflow-y: auto;
  
  &::-webkit-scrollbar { display: none; }
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  
  .back-btn, .history-btn {
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
}

.mazu-animation {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 20px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .orbit-ring {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px dashed rgba(212, 175, 55, 0.3);
    
    &.spinning {
      animation: spin-slow 10s linear infinite;
      
      .orbit-item {
        animation: counter-spin 10s linear infinite;
      }
    }
    
    .orbit-item {
      position: absolute;
      width: 28px;
      height: 28px;
      background: var(--glass-bg);
      border: 1px solid var(--mazu-gold);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .orbit-icon {
        font-size: 12px;
        color: var(--mazu-gold);
      }
      
      @for $i from 1 through 8 {
        &:nth-child(#{$i}) {
          $angle: ($i - 1) * 45deg;
          top: calc(50% - 14px + #{-85px * sin($angle)});
          left: calc(50% - 14px + #{85px * cos($angle)});
        }
      }
    }
  }
  
  .center-avatar {
    z-index: 2;
  }
  
  .animation-hint {
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: var(--mazu-gold);
    white-space: nowrap;
  }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes counter-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

.zeday-form {
  padding: 20px;
  margin-top: 30px;
  
  .form-group {
    margin-bottom: 20px;
    
    label {
      font-size: 14px;
      color: var(--text-primary);
      display: block;
      margin-bottom: 12px;
    }
  }
  
  .event-select {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    
    .event-btn {
      padding: 12px 8px;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: 12px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
      
      .evt-icon { font-size: 20px; }
      .evt-label { font-size: 12px; color: var(--text-secondary); }
      
      &.active {
        border-color: var(--mazu-gold);
        background: rgba(212, 175, 55, 0.1);
        
        .evt-label { color: var(--mazu-gold); }
      }
    }
  }
  
  .date-range {
    display: flex;
    gap: 12px;
    
    .date-input {
      flex: 1;
      
      .label {
        font-size: 11px;
        color: var(--text-tertiary);
        display: block;
        margin-bottom: 6px;
      }
      
      .input-field {
        width: 100%;
        color-scheme: dark;
      }
    }
  }
  
  .zeday-btn {
    width: 100%;
    margin-top: 10px;
  }
}

.zeday-result {
  margin-top: 30px;
  
  .result-header {
    padding: 16px;
    text-align: center;
    margin-bottom: 16px;
    
    h3 {
      font-size: 16px;
      color: var(--mazu-gold);
      margin-bottom: 8px;
    }
    
    .date-range-text {
      font-size: 12px;
      color: var(--text-tertiary);
    }
    
    .result-hint {
      font-size: 11px;
      color: var(--text-tertiary);
      margin-top: 8px;
    }
  }
  
  .best-day {
    padding: 16px;
    margin-bottom: 16px;
    position: relative;
    
    .best-badge {
      position: absolute;
      top: -8px;
      left: 16px;
      padding: 4px 12px;
      background: var(--mazu-gold);
      color: #1a0a2e;
      font-size: 11px;
      font-weight: 600;
      border-radius: 10px;
    }
    
    .day-main {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 8px;
      
      .day-date {
        font-size: 18px;
        font-weight: 600;
        color: var(--mazu-gold);
      }
      
      .day-info {
        display: flex;
        flex-direction: column;
        gap: 2px;
        
        .lunar { font-size: 12px; color: var(--text-secondary); }
        .ganzhi { font-size: 11px; color: var(--text-tertiary); }
      }
      
      .day-score {
        margin-left: auto;
        text-align: right;
        
        .stars { font-size: 10px; }
        .score-text { font-size: 11px; color: var(--mazu-gold); display: block; }
      }
    }
    
    .day-detail {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid var(--glass-border);
      
      .yi { font-size: 12px; color: #4ade80; }
      .advice { font-size: 12px; color: var(--text-secondary); margin-top: 8px; line-height: 1.6; }
    }
    
    .select-btn {
      width: 100%;
      margin-top: 12px;
      padding: 10px;
      background: rgba(212, 175, 55, 0.15);
      border: 1px solid var(--mazu-gold);
      border-radius: 8px;
      color: var(--mazu-gold);
      cursor: pointer;
    }
  }
  
  .alternate-days {
    h4 {
      font-size: 14px;
      color: var(--text-primary);
      margin-bottom: 12px;
    }
    
    .day-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .day-item {
      padding: 12px;
      display: flex;
      align-items: center;
      
      .day-main {
        flex: 1;
        
        .day-date { font-size: 14px; color: var(--text-primary); }
        .lunar { font-size: 11px; color: var(--text-tertiary); margin-left: 8px; }
      }
      
      .day-score { font-size: 10px; margin-right: 12px; }
      
      .view-btn {
        padding: 6px 12px;
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: 6px;
        color: var(--text-secondary);
        font-size: 12px;
        cursor: pointer;
      }
    }
  }
  
  .reset-btn {
    width: 100%;
    margin-top: 20px;
  }
}

.history-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 100;
  
  .modal-content {
    width: 100%;
    max-width: 375px;
    max-height: 60vh;
    border-radius: 20px 20px 0 0;
    padding: 20px;
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      
      h3 { font-size: 16px; color: var(--text-primary); }
      
      .close-btn {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: var(--glass-bg);
        border: none;
        color: var(--text-primary);
        font-size: 20px;
        cursor: pointer;
      }
    }
    
    .history-list {
      max-height: 300px;
      overflow-y: auto;
      
      .history-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 0;
        border-bottom: 1px solid var(--glass-border);
        
        .record-info {
          .record-event { font-size: 14px; color: var(--text-primary); }
          .record-date { font-size: 12px; color: var(--mazu-gold); margin-left: 8px; }
        }
        
        .record-time { font-size: 11px; color: var(--text-tertiary); }
      }
      
      .empty-state {
        padding: 40px;
        text-align: center;
        color: var(--text-tertiary);
      }
    }
  }
}
</style>
