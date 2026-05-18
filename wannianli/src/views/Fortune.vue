<template>
  <div class="fortune-page">
    <!-- 顶部返回 -->
    <header class="page-header">
      <button class="back-btn" @click="$router.back()">←</button>
      <h1 class="page-title">吉人天相·今日解读</h1>
      <div class="placeholder"></div>
    </header>
    
    <!-- 日期信息 -->
    <div class="date-bar glass-card">
      <div class="date-main">
        <span class="day">{{ currentDay }}</span>
        <div class="date-detail">
          <span class="month">{{ currentMonthEn }}.{{ currentYear }}</span>
          <span class="lunar">{{ todayFortune.lunarDate }}</span>
        </div>
      </div>
      <div class="ganzhi-info">
        <span>{{ todayFortune.ganZhi }}</span>
      </div>
    </div>
    
    <!-- 五维雷达图 -->
    <div class="radar-section glass-card">
      <h3 class="section-title">五维运势分析</h3>
      <div class="radar-chart">
        <svg viewBox="0 0 200 200" class="radar-svg">
          <!-- 背景网格 -->
          <g class="radar-grid">
            <polygon v-for="i in 5" :key="i" 
              :points="getGridPoints(i * 0.2)" 
              fill="none" 
              stroke="rgba(255,255,255,0.1)" 
              stroke-width="1"
            />
          </g>
          <!-- 数据区域 -->
          <polygon 
            :points="dataPoints" 
            fill="rgba(212, 175, 55, 0.2)" 
            stroke="var(--mazu-gold)" 
            stroke-width="2"
          />
          <!-- 数据点 -->
          <g class="data-points">
            <circle v-for="(point, idx) in dataPointsArray" :key="idx"
              :cx="point.x" :cy="point.y" r="4"
              fill="var(--mazu-gold)"
            />
          </g>
          <!-- 标签 -->
          <g class="radar-labels">
            <text v-for="(dim, idx) in dimensions" :key="idx"
              :x="getLabelPosition(idx).x"
              :y="getLabelPosition(idx).y"
              text-anchor="middle"
              fill="var(--text-secondary)"
              font-size="12"
            >{{ dim.name }} {{ dim.value }}</text>
          </g>
        </svg>
      </div>
      <div class="dimension-list">
        <div v-for="dim in dimensions" :key="dim.key" class="dim-item">
          <span class="dim-icon">{{ dim.icon }}</span>
          <span class="dim-name">{{ dim.name }}</span>
          <div class="dim-bar">
            <div class="dim-fill" :style="{ width: dim.value + '%', background: dim.color }"></div>
          </div>
          <span class="dim-value">{{ dim.value }}</span>
        </div>
      </div>
    </div>
    
    <!-- 幸运时段 -->
    <div class="lucky-section glass-card">
      <h3 class="section-title">今天幸运时段「吉时」</h3>
      <div class="shichen-list">
        <div v-for="sc in luckyShichen" :key="sc.name" class="shichen-item">
          <span class="sc-name">【{{ sc.name }}】</span>
          <span class="sc-time">{{ sc.time }}</span>
          <span class="sc-advice">{{ sc.advice }}</span>
        </div>
      </div>
    </div>
    
    <!-- 助运元素 -->
    <div class="elements-section glass-card">
      <h3 class="section-title">今天的助运元素</h3>
      <div class="element-grid">
        <div class="element-item">
          <span class="label">幸运颜色</span>
          <div class="color-pills">
            <span v-for="color in todayFortune.luckyColor" :key="color" 
              class="color-pill"
              :style="{ background: getColorCode(color) }"
            >{{ color }}</span>
          </div>
        </div>
        <div class="element-item">
          <span class="label">五行元素</span>
          <div class="wuxing-pills">
            <span v-for="wx in todayFortune.luckyElement" :key="wx" class="wuxing-pill">{{ wx }}</span>
          </div>
        </div>
        <div class="element-item">
          <span class="label">财位方向</span>
          <span class="value direction">{{ todayFortune.luckyDirection }}</span>
        </div>
        <div class="element-item">
          <span class="label">幸运数字</span>
          <div class="number-pills">
            <span v-for="num in todayFortune.luckyNumber" :key="num" class="number-pill">{{ num }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 个性化建议 -->
    <div class="advice-section glass-card">
      <h3 class="section-title">属{{ userInfo.zodiac }}的你·今天适合做什么</h3>
      <div class="advice-content">
        <p>{{ todayFortune.dailyAdvice }}</p>
        <p class="warning">今天要避免和属兔的打交道，因为卯酉相冲，需要注意关心一下老年人的身体。</p>
      </div>
    </div>
    
    <!-- 穿搭建议 -->
    <div class="outfit-section glass-card">
      <h3 class="section-title">穿搭助运建议</h3>
      <p class="outfit-advice">
        你的命格的喜神是火，但是今天的纳音是天河水，所谓五行平衡，
        所以今天旺你颜色是"卡其色"，你可以选择一个卡其色的风衣配搭一条白色牛仔裤，
        这会有助你桃花运旺上加旺。配搭有金元素属性的随身物品会更好的帮助你，
        比如一个黄金的手串或者白银的漂亮胸针。
      </p>
    </div>
    
    <!-- 底部声明 -->
    <footer class="disclaimer">
      <p>依据传统钦天监《钦定协纪辨方书》的天文·历法·五行·神煞·凶吉判断</p>
      <p>结合《滴天髓》个人五行·四柱·八字·生肖·吉时为你做出如下解读</p>
      <p class="warning-text">不构成任何专业建议 · 仅作生活娱乐参考</p>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/app'

const userStore = useUserStore()
const { userInfo, todayFortune } = storeToRefs(userStore)

const now = new Date()
const currentDay = computed(() => now.getDate())
const currentYear = computed(() => now.getFullYear())
const currentMonthEn = computed(() => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][now.getMonth()])

const dimensions = computed(() => [
  { key: 'wealth', name: '财运', value: todayFortune.value.dimensions.wealth, icon: '💰', color: '#FFD700' },
  { key: 'career', name: '事业', value: todayFortune.value.dimensions.career, icon: '📈', color: '#FF6B35' },
  { key: 'love', name: '感情', value: todayFortune.value.dimensions.love, icon: '💕', color: '#FF69B4' },
  { key: 'study', name: '学业', value: todayFortune.value.dimensions.study, icon: '📚', color: '#00CED1' },
  { key: 'health', name: '健康', value: todayFortune.value.dimensions.health, icon: '💪', color: '#32CD32' }
])

const luckyShichen = [
  { name: '辰时', time: '07:00-09:00', advice: '适合做些财务规划的事情' },
  { name: '未时', time: '13:00-15:00', advice: '适合社交活动和商务洽谈' },
  { name: '子时', time: '23:00-01:00', advice: '适合静心冥想和自我反思' }
]

const getColorCode = (name) => {
  const colorMap = {
    '橙': '#FF8C00', '白': '#FFFFFF', '绿': '#32CD32',
    '红': '#FF4500', '黄': '#FFD700', '蓝': '#1E90FF'
  }
  return colorMap[name] || '#CCCCCC'
}

const getGridPoints = (scale) => {
  const center = 100
  const radius = 70 * scale
  const points = []
  for (let i = 0; i < 5; i++) {
    const angle = (i * 72 - 90) * Math.PI / 180
    points.push(`${center + radius * Math.cos(angle)},${center + radius * Math.sin(angle)}`)
  }
  return points.join(' ')
}

const dataPointsArray = computed(() => {
  const center = 100
  const maxRadius = 70
  return dimensions.value.map((dim, i) => {
    const radius = (dim.value / 100) * maxRadius
    const angle = (i * 72 - 90) * Math.PI / 180
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle)
    }
  })
})

const dataPoints = computed(() => {
  return dataPointsArray.value.map(p => `${p.x},${p.y}`).join(' ')
})

const getLabelPosition = (idx) => {
  const center = 100
  const radius = 90
  const angle = (idx * 72 - 90) * Math.PI / 180
  return {
    x: center + radius * Math.cos(angle),
    y: center + radius * Math.sin(angle) + 4
  }
}
</script>

<style lang="scss" scoped>
.fortune-page {
  height: calc(812px - 44px);
  padding: 16px;
  overflow-y: auto;
  
  &::-webkit-scrollbar { display: none; }
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  
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

.date-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  margin-bottom: 16px;
  
  .date-main {
    display: flex;
    align-items: baseline;
    gap: 12px;
    
    .day {
      font-size: 36px;
      font-weight: 300;
      color: var(--mazu-gold);
    }
    
    .date-detail {
      display: flex;
      flex-direction: column;
      
      .month { font-size: 13px; color: var(--text-secondary); }
      .lunar { font-size: 11px; color: var(--text-tertiary); }
    }
  }
  
  .ganzhi-info {
    font-size: 12px;
    color: var(--mazu-gold);
    padding: 6px 12px;
    background: rgba(212, 175, 55, 0.1);
    border-radius: 8px;
  }
}

.section-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &::before {
    content: '';
    width: 3px;
    height: 14px;
    background: var(--mazu-gold);
    border-radius: 2px;
  }
}

.radar-section {
  padding: 16px;
  margin-bottom: 16px;
  
  .radar-chart {
    width: 100%;
    max-width: 200px;
    margin: 0 auto 20px;
    
    .radar-svg { width: 100%; height: auto; }
  }
  
  .dimension-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    .dim-item {
      display: flex;
      align-items: center;
      gap: 8px;
      
      .dim-icon { font-size: 16px; }
      .dim-name { font-size: 12px; color: var(--text-secondary); width: 36px; }
      
      .dim-bar {
        flex: 1;
        height: 6px;
        background: rgba(255,255,255,0.1);
        border-radius: 3px;
        overflow: hidden;
        
        .dim-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.5s ease;
        }
      }
      
      .dim-value {
        font-size: 12px;
        color: var(--mazu-gold);
        width: 28px;
        text-align: right;
      }
    }
  }
}

.lucky-section {
  padding: 16px;
  margin-bottom: 16px;
  
  .shichen-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
    
    .shichen-item {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      padding: 12px;
      background: rgba(255,255,255,0.03);
      border-radius: 10px;
      
      .sc-name {
        font-size: 13px;
        color: var(--mazu-gold);
        font-weight: 500;
      }
      
      .sc-time {
        font-size: 12px;
        color: var(--text-tertiary);
      }
      
      .sc-advice {
        width: 100%;
        font-size: 12px;
        color: var(--text-secondary);
        margin-top: 4px;
      }
    }
  }
}

.elements-section {
  padding: 16px;
  margin-bottom: 16px;
  
  .element-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    
    .element-item {
      padding: 12px;
      background: rgba(255,255,255,0.03);
      border-radius: 10px;
      
      .label {
        font-size: 11px;
        color: var(--text-tertiary);
        display: block;
        margin-bottom: 8px;
      }
      
      .color-pills, .wuxing-pills, .number-pills {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
      }
      
      .color-pill {
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 11px;
        color: #1a0a2e;
        font-weight: 500;
      }
      
      .wuxing-pill, .number-pill {
        padding: 4px 10px;
        background: rgba(212, 175, 55, 0.15);
        border-radius: 12px;
        font-size: 11px;
        color: var(--mazu-gold);
      }
      
      .value.direction {
        font-size: 18px;
        font-weight: 600;
        color: var(--mazu-gold);
      }
    }
  }
}

.advice-section, .outfit-section {
  padding: 16px;
  margin-bottom: 16px;
  
  p {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.7;
    
    &.warning {
      margin-top: 12px;
      padding: 10px;
      background: rgba(248, 113, 113, 0.1);
      border-radius: 8px;
      color: #f87171;
    }
  }
}

.disclaimer {
  padding: 20px 16px;
  text-align: center;
  
  p {
    font-size: 10px;
    color: var(--text-tertiary);
    line-height: 1.8;
    
    &.warning-text {
      color: var(--mazu-gold);
      margin-top: 8px;
    }
  }
}
</style>
