<template>
  <div class="page-container">
    <header class="page-header">
      <button class="back-btn" @click="$router.back()">←</button>
      <h1 class="page-title">我的深度解读记录</h1>
      <div class="placeholder"></div>
    </header>
    
    <div class="calendar-picker">
      <button class="cal-arrow" @click="changeMonth(-1)">‹</button>
      <span class="cal-title">{{ calendarYear }}年{{ calendarMonth }}月</span>
      <button class="cal-arrow" @click="changeMonth(1)">›</button>
    </div>
    
    <div class="calendar-grid">
      <div class="cal-header">
        <span v-for="d in ['日', '一', '二', '三', '四', '五', '六']" :key="d">{{ d }}</span>
      </div>
      <div class="cal-body">
        <div 
          v-for="(day, idx) in calendarDays" 
          :key="idx"
          class="cal-day"
          :class="{ 
            empty: !day, 
            today: isToday(day),
            hasRecord: hasFortuneRecord(day),
            selected: selectedDate === day
          }"
          @click="day && selectDate(day)"
        >
          <span v-if="day">{{ day }}</span>
          <span v-if="hasFortuneRecord(day)" class="record-dot"></span>
        </div>
      </div>
    </div>
    
    <div class="record-list">
      <h4>{{ selectedDate ? `${calendarMonth}月${selectedDate}日解读记录` : '请选择日期查看记录' }}</h4>
      <div v-if="selectedFortuneRecord" class="record-detail" @click="viewDetail">
        <div class="detail-header">
          <span class="detail-date">{{ selectedFortuneRecord.date }}</span>
          <span class="detail-score">综合得分 {{ selectedFortuneRecord.score }}分</span>
        </div>
        <p class="detail-summary">{{ selectedFortuneRecord.summary }}</p>
        <span class="view-more">查看完整解读 →</span>
      </div>
      <div v-else-if="selectedDate" class="empty-record">
        <p>该日期暂无解读记录</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const now = new Date()
const calendarYear = ref(now.getFullYear())
const calendarMonth = ref(now.getMonth() + 1)
const selectedDate = ref(null)
const selectedFortuneRecord = ref(null)

const fortuneRecords = ref({
  '2026-04-15': {
    date: '2026年4月15日',
    score: 82,
    summary: '今日整体运势上佳，适合处理重要事务，财运亨通。',
    id: '20260415'
  },
  '2026-04-12': {
    date: '2026年4月12日',
    score: 75,
    summary: '运势平稳，宜静不宜动，适合思考和规划。',
    id: '20260412'
  },
  '2026-04-18': {
    date: '2026年4月18日',
    score: 88,
    summary: '今日贵人运旺，适合社交和商务洽谈。',
    id: '20260418'
  }
})

const calendarDays = computed(() => {
  const year = calendarYear.value
  const month = calendarMonth.value
  const firstDay = new Date(year, month - 1, 1).getDay()
  const daysInMonth = new Date(year, month, 0).getDate()
  
  const days = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)
  return days
})

const changeMonth = (delta) => {
  calendarMonth.value += delta
  if (calendarMonth.value > 12) {
    calendarMonth.value = 1
    calendarYear.value++
  } else if (calendarMonth.value < 1) {
    calendarMonth.value = 12
    calendarYear.value--
  }
  selectedDate.value = null
  selectedFortuneRecord.value = null
}

const isToday = (day) => {
  return day === now.getDate() && 
         calendarMonth.value === now.getMonth() + 1 && 
         calendarYear.value === now.getFullYear()
}

const hasFortuneRecord = (day) => {
  if (!day) return false
  const dateKey = `${calendarYear.value}-${String(calendarMonth.value).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  return !!fortuneRecords.value[dateKey]
}

const selectDate = (day) => {
  selectedDate.value = day
  const dateKey = `${calendarYear.value}-${String(calendarMonth.value).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  selectedFortuneRecord.value = fortuneRecords.value[dateKey] || null
}

const viewDetail = () => {
  if (selectedFortuneRecord.value) {
    router.push(`/profile/fortune-detail/${selectedFortuneRecord.value.id}`)
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

.calendar-picker {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  
  .cal-arrow {
    width: 36px;
    height: 36px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 10px;
    color: var(--text-primary);
    font-size: 20px;
    cursor: pointer;
  }
  
  .cal-title {
    font-size: 16px;
    font-weight: 500;
    color: var(--text-primary);
  }
}

.calendar-grid {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 16px;
  
  .cal-header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 12px;
    
    span {
      text-align: center;
      font-size: 12px;
      color: var(--text-tertiary);
      padding: 8px 0;
    }
  }
  
  .cal-body {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 6px;
    
    .cal-day {
      aspect-ratio: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      font-size: 14px;
      color: var(--text-secondary);
      cursor: pointer;
      position: relative;
      transition: all 0.2s;
      
      &.empty { cursor: default; }
      
      &.today {
        background: rgba(212, 175, 55, 0.15);
        color: var(--mazu-gold);
      }
      
      &.hasRecord {
        color: var(--mazu-gold);
        font-weight: 500;
        
        .record-dot {
          position: absolute;
          bottom: 6px;
          width: 5px;
          height: 5px;
          background: var(--mazu-gold);
          border-radius: 50%;
        }
      }
      
      &.selected {
        background: var(--mazu-gold);
        color: #1a0a2e;
        
        .record-dot { background: #1a0a2e; }
      }
    }
  }
}

.record-list {
  margin-top: 24px;
  
  h4 {
    font-size: 14px;
    color: var(--text-secondary);
    margin-bottom: 14px;
  }
  
  .record-detail {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 14px;
    padding: 16px;
    cursor: pointer;
    transition: border-color 0.2s;
    
    &:hover {
      border-color: var(--mazu-gold);
    }
    
    .detail-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      
      .detail-date { font-size: 14px; color: var(--text-primary); }
      .detail-score { font-size: 14px; color: var(--mazu-gold); font-weight: 500; }
    }
    
    .detail-summary {
      font-size: 13px;
      color: var(--text-tertiary);
      margin-bottom: 12px;
      line-height: 1.6;
    }
    
    .view-more {
      font-size: 13px;
      color: var(--mazu-gold);
    }
  }
  
  .empty-record {
    text-align: center;
    padding: 40px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 14px;
    color: var(--text-tertiary);
    font-size: 14px;
  }
}
</style>
