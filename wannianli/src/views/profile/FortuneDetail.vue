<template>
  <div class="page-container">
    <header class="page-header">
      <button class="back-btn" @click="$router.back()">←</button>
      <h1 class="page-title">{{ record.date }} 运程解读</h1>
      <div class="placeholder"></div>
    </header>
    
    <div class="score-display">
      <div class="score-circle">
        <span class="score-num">{{ record.score }}</span>
        <span class="score-unit">分</span>
      </div>
      <p class="score-label">天人合一综合得分</p>
    </div>
    
    <div class="dimension-section glass-card">
      <h3 class="section-title">五维运势分析</h3>
      <div class="dimension-scores">
        <div class="dim-item" v-for="dim in record.dimensions" :key="dim.name">
          <span class="dim-icon">{{ dim.icon }}</span>
          <span class="dim-name">{{ dim.name }}</span>
          <div class="dim-bar"><div class="dim-fill" :style="{ width: dim.value + '%', background: dim.color }"></div></div>
          <span class="dim-value">{{ dim.value }}</span>
        </div>
      </div>
    </div>
    
    <div class="quick-section glass-card">
      <h3 class="section-title">今日速览</h3>
      <div class="quick-grid">
        <div class="quick-item">
          <span class="label">幸运色</span>
          <span class="value">{{ record.luckyColor }}</span>
        </div>
        <div class="quick-item">
          <span class="label">吉时</span>
          <span class="value">{{ record.luckyTime }}</span>
        </div>
        <div class="quick-item">
          <span class="label">财位</span>
          <span class="value">{{ record.direction }}</span>
        </div>
        <div class="quick-item">
          <span class="label">幸运数</span>
          <span class="value">{{ record.luckyNumber }}</span>
        </div>
      </div>
    </div>
    
    <div class="advice-section glass-card">
      <h3 class="section-title">运势解读</h3>
      <p class="advice-text">{{ record.advice }}</p>
    </div>
    
    <div class="yiji-section glass-card">
      <h3 class="section-title">宜忌参考</h3>
      <div class="yiji-row">
        <span class="yiji-label yi">宜</span>
        <div class="yiji-tags">
          <span v-for="item in record.suitable" :key="item" class="tag">{{ item }}</span>
        </div>
      </div>
      <div class="yiji-row">
        <span class="yiji-label ji">忌</span>
        <div class="yiji-tags">
          <span v-for="item in record.unsuitable" :key="item" class="tag">{{ item }}</span>
        </div>
      </div>
    </div>
    
    <footer class="page-footer">
      <p>依据传统钦天监《钦定协纪辨方书》推演</p>
      <p>不构成任何专业建议 · 仅作生活娱乐参考</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const recordId = route.params.id

const record = ref({
  date: '2026年4月15日',
  score: 82,
  summary: '今日整体运势上佳，适合处理重要事务，财运亨通。',
  dimensions: [
    { name: '财运', value: 85, icon: '💰', color: '#FFD700' },
    { name: '事业', value: 78, icon: '📈', color: '#FF6B35' },
    { name: '感情', value: 72, icon: '💕', color: '#FF69B4' },
    { name: '学业', value: 88, icon: '📚', color: '#00CED1' },
    { name: '健康', value: 80, icon: '💪', color: '#32CD32' }
  ],
  luckyColor: '橙·白·绿',
  luckyTime: '辰时·未时',
  direction: '正西',
  luckyNumber: '3·9',
  advice: '今天正逢日柱的"比干"，适合社交，建议今天适合和朋友看电影，然后去吃个火锅犒劳一下自己。金又是你的喜神，所以配搭有金元素属性的随身物品会更好的帮助你，比如一个黄金的手串或者白银的漂亮胸针。',
  suitable: ['动土', '搬迁', '祭祀', '开市', '访友'],
  unsuitable: ['嫁娶', '安葬', '出行']
})
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
    font-size: 15px;
    font-weight: 500;
    color: var(--text-primary);
  }
  
  .placeholder { width: 36px; }
}

.score-display {
  text-align: center;
  margin-bottom: 24px;
  
  .score-circle {
    width: 120px;
    height: 120px;
    margin: 0 auto 14px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(255, 107, 53, 0.15) 100%);
    border: 3px solid var(--mazu-gold);
    display: flex;
    align-items: center;
    justify-content: center;
    
    .score-num { font-size: 42px; font-weight: 600; color: var(--mazu-gold); }
    .score-unit { font-size: 16px; color: var(--text-tertiary); margin-left: 4px; align-self: flex-end; margin-bottom: 10px; }
  }
  
  .score-label { font-size: 14px; color: var(--text-secondary); }
}

.glass-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  padding: 18px;
  margin-bottom: 16px;
}

.section-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 16px;
  padding-left: 12px;
  border-left: 3px solid var(--mazu-gold);
}

.dimension-scores {
  .dim-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
    
    &:last-child { margin-bottom: 0; }
    
    .dim-icon { font-size: 18px; }
    .dim-name { font-size: 13px; color: var(--text-secondary); width: 40px; }
    
    .dim-bar {
      flex: 1;
      height: 8px;
      background: rgba(255,255,255,0.1);
      border-radius: 4px;
      overflow: hidden;
      
      .dim-fill {
        height: 100%;
        border-radius: 4px;
        transition: width 0.5s ease;
      }
    }
    
    .dim-value { font-size: 13px; color: var(--mazu-gold); width: 32px; text-align: right; font-weight: 500; }
  }
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  
  .quick-item {
    padding: 14px;
    background: rgba(255,255,255,0.03);
    border-radius: 12px;
    text-align: center;
    
    .label {
      font-size: 11px;
      color: var(--text-tertiary);
      display: block;
      margin-bottom: 6px;
    }
    
    .value {
      font-size: 15px;
      color: var(--mazu-gold);
      font-weight: 500;
    }
  }
}

.advice-text {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.8;
}

.yiji-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 14px;
  
  &:last-child { margin-bottom: 0; }
  
  .yiji-label {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    font-weight: 500;
    flex-shrink: 0;
    
    &.yi { background: rgba(74, 222, 128, 0.2); color: #4ade80; }
    &.ji { background: rgba(248, 113, 113, 0.2); color: #f87171; }
  }
  
  .yiji-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    
    .tag {
      font-size: 12px;
      color: var(--text-secondary);
      padding: 6px 12px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px;
    }
  }
}

.page-footer {
  padding: 24px 16px;
  text-align: center;
  
  p {
    font-size: 11px;
    color: var(--text-tertiary);
    line-height: 1.8;
    opacity: 0.7;
  }
}
</style>
