<template>
  <div class="page-container">
    <header class="page-header">
      <button class="back-btn" @click="$router.back()">←</button>
      <h1 class="page-title">签到记录</h1>
      <div class="placeholder"></div>
    </header>
    
    <div class="checkin-stats">
      <div class="stat-item main">
        <span class="stat-num">{{ totalCheckins }}</span>
        <span class="stat-label">累计签到(天)</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">{{ signDays }}</span>
        <span class="stat-label">连续签到</span>
      </div>
      <div class="stat-item">
        <span class="stat-num">{{ monthCheckins }}</span>
        <span class="stat-label">本月签到</span>
      </div>
    </div>
    
    <div class="checkin-calendar glass-card">
      <div class="cal-header-row">
        <button class="cal-arrow" @click="changeMonth(-1)">‹</button>
        <span class="cal-title">{{ calendarYear }}年{{ calendarMonth }}月</span>
        <button class="cal-arrow" @click="changeMonth(1)">›</button>
      </div>
      <div class="cal-weekdays">
        <span v-for="d in ['日', '一', '二', '三', '四', '五', '六']" :key="d">{{ d }}</span>
      </div>
      <div class="cal-days">
        <div 
          v-for="(day, idx) in calendarDays" 
          :key="idx"
          class="cal-day"
          :class="{ 
            empty: !day, 
            today: isToday(day),
            checked: isCheckedIn(day),
            future: isFuture(day)
          }"
        >
          <span v-if="day" class="day-num">{{ day }}</span>
          <span v-if="isCheckedIn(day)" class="check-mark">✓</span>
        </div>
      </div>
    </div>
    
    <div class="checkin-tips glass-card">
      <h3>签到小贴士</h3>
      <ul>
        <li>每日查看运程即可自动签到</li>
        <li>连续签到7天可获得额外运势加成</li>
        <li>签到记录会保留历史数据</li>
      </ul>
    </div>
    
    <div class="today-checkin">
      <button 
        class="btn-gold checkin-btn" 
        :disabled="todayChecked"
        @click="doCheckin"
      >
        {{ todayChecked ? '今日已签到 ✓' : '立即签到' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const now = new Date()
const calendarYear = ref(now.getFullYear())
const calendarMonth = ref(now.getMonth() + 1)

const signDays = ref(7)
const totalCheckins = ref(45)
const monthCheckins = ref(12)
const todayChecked = ref(false)
const checkedDays = ref([1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 15, 16, 17, 18, 19])

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
}

const isToday = (day) => {
  return day === now.getDate() && 
         calendarMonth.value === now.getMonth() + 1 && 
         calendarYear.value === now.getFullYear()
}

const isFuture = (day) => {
  if (!day) return false
  if (calendarYear.value > now.getFullYear()) return true
  if (calendarYear.value < now.getFullYear()) return false
  if (calendarMonth.value > now.getMonth() + 1) return true
  if (calendarMonth.value < now.getMonth() + 1) return false
  return day > now.getDate()
}

const isCheckedIn = (day) => {
  if (!day) return false
  if (calendarMonth.value === now.getMonth() + 1 && calendarYear.value === now.getFullYear()) {
    return checkedDays.value.includes(day)
  }
  return false
}

const doCheckin = () => {
  todayChecked.value = true
  signDays.value++
  totalCheckins.value++
  monthCheckins.value++
  checkedDays.value.push(now.getDate())
  alert('🎉 签到成功！连续签到 ' + signDays.value + ' 天')
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

.checkin-stats {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  
  .stat-item {
    flex: 1;
    text-align: center;
    padding: 20px 12px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    
    &.main {
      background: rgba(212, 175, 55, 0.1);
      border-color: var(--mazu-gold);
    }
    
    .stat-num {
      font-size: 28px;
      font-weight: 600;
      color: var(--mazu-gold);
      display: block;
      margin-bottom: 6px;
    }
    
    .stat-label {
      font-size: 12px;
      color: var(--text-tertiary);
    }
  }
}

.checkin-calendar {
  padding: 20px;
  margin-bottom: 16px;
  
  .cal-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    
    .cal-arrow {
      width: 32px;
      height: 32px;
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--glass-border);
      border-radius: 8px;
      color: var(--text-primary);
      font-size: 18px;
      cursor: pointer;
    }
    
    .cal-title { font-size: 15px; color: var(--text-primary); font-weight: 500; }
  }
  
  .cal-weekdays {
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
  
  .cal-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;
    
    .cal-day {
      aspect-ratio: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      position: relative;
      
      .day-num {
        font-size: 14px;
        color: var(--text-secondary);
      }
      
      &.today {
        border: 2px solid var(--mazu-gold);
        
        .day-num { color: var(--mazu-gold); font-weight: 500; }
      }
      
      &.checked {
        background: rgba(74, 222, 128, 0.15);
        
        .day-num { color: #4ade80; }
        
        .check-mark {
          position: absolute;
          bottom: 4px;
          font-size: 10px;
          color: #4ade80;
        }
      }
      
      &.future {
        .day-num { color: var(--text-tertiary); opacity: 0.5; }
      }
    }
  }
}

.checkin-tips {
  padding: 18px;
  margin-bottom: 20px;
  
  h3 {
    font-size: 14px;
    color: var(--text-primary);
    margin-bottom: 12px;
  }
  
  ul {
    padding-left: 20px;
    
    li {
      font-size: 13px;
      color: var(--text-tertiary);
      line-height: 2;
    }
  }
}

.today-checkin {
  .checkin-btn {
    width: 100%;
    padding: 16px;
    font-size: 16px;
    
    &:disabled {
      background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
      opacity: 0.9;
    }
  }
}

.glass-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
}
</style>
