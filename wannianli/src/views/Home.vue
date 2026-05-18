<template>
  <div class="home-page">
    <!-- 顶部栏 -->
    <header class="top-header">
      <div class="logo">🐉</div>
      <div class="user-info">
        <div class="date-info">
          <span class="lunar">{{ todayFortune.lunarDate }}</span>
          <span class="ganzhi">{{ todayFortune.ganZhi }}</span>
        </div>
        <div class="user-brief">
          <span class="name">{{ userInfo.nickname }}│{{ userInfo.birthday }}</span>
          <span class="mingpan">{{ userInfo.zodiac }}·{{ userInfo.riZhu }}日主·{{ userInfo.mingPan }}</span>
        </div>
      </div>
      <div class="avatar-wrap" @click="$router.push('/profile')">
        <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="头像" />
        <span v-else class="avatar-placeholder">{{ userInfo.nickname.charAt(0) }}</span>
      </div>
    </header>
    
    <!-- 日历主卡片 -->
    <div class="calendar-card glass-card">
      <div class="date-display">
        <span class="day">{{ currentDay }}</span>
        <div class="date-detail">
          <span class="month">{{ currentMonthEn }}.{{ currentYear }}</span>
          <span class="weekday">{{ currentWeekday }}</span>
        </div>
      </div>
      <div class="wuxing-info">
        <div class="wuxing-item">
          <span class="label">日</span>
          <span class="value">{{ todayFortune.wuxing.day }}</span>
        </div>
        <div class="wuxing-item">
          <span class="label">年</span>
          <span class="value">{{ todayFortune.wuxing.year }}</span>
        </div>
        <div class="wuxing-item">
          <span class="label">月</span>
          <span class="value">{{ todayFortune.wuxing.month }}</span>
        </div>
      </div>
    </div>
    
    <!-- 天人合一得分 -->
    <div class="fortune-score glass-card" @click="$router.push('/fortune')">
      <div class="score-header">
        <MazuAvatar size="small" />
        <div class="score-title">
          <span class="title">妈祖解盘·今日运程</span>
          <span class="subtitle">天人合一·则吉而行</span>
        </div>
        <div class="arrow">→</div>
      </div>
      <div class="score-content">
        <div class="score-circle">
          <svg viewBox="0 0 100 100" class="score-svg">
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="6"/>
            <circle 
              cx="50" cy="50" r="45" 
              fill="none" 
              stroke="url(#scoreGradient)" 
              stroke-width="6"
              stroke-linecap="round"
              :stroke-dasharray="`${todayFortune.score * 2.83} 283`"
              transform="rotate(-90 50 50)"
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style="stop-color:#FFD700"/>
                <stop offset="100%" style="stop-color:#FF6B35"/>
              </linearGradient>
            </defs>
          </svg>
          <div class="score-value">
            <span class="number">{{ todayFortune.score }}</span>
            <span class="unit">分</span>
          </div>
        </div>
        <div class="score-desc">
          <p class="desc-text">【天人合一】综合得分</p>
          <p class="desc-hint">点击查看详情完整解读</p>
        </div>
      </div>
    </div>
    
    <!-- 今日速览 -->
    <div class="quick-view">
      <div class="quick-item glass-card">
        <span class="label">幸运色</span>
        <div class="colors">
          <span 
            v-for="(color, idx) in todayFortune.luckyColor" 
            :key="idx"
            class="color-dot"
            :style="{ background: getColorCode(color) }"
          ></span>
        </div>
        <span class="value">{{ todayFortune.luckyColor.join('·') }}</span>
      </div>
      <div class="quick-item glass-card">
        <span class="label">吉时</span>
        <span class="value time">{{ todayFortune.luckyTime.join('·') }}</span>
      </div>
      <div class="quick-item glass-card">
        <span class="label">财位</span>
        <span class="value direction">{{ todayFortune.luckyDirection }}</span>
      </div>
      <div class="quick-item glass-card">
        <span class="label">幸运数</span>
        <span class="value number">{{ todayFortune.luckyNumber.join('·') }}</span>
      </div>
    </div>
    
    <!-- 宜忌速览 -->
    <div class="yiji-section glass-card">
      <div class="yiji-row">
        <span class="yiji-label yi">宜</span>
        <div class="yiji-tags">
          <span v-for="item in todayFortune.suitable.slice(0, 5)" :key="item" class="tag">{{ item }}</span>
        </div>
      </div>
      <div class="yiji-row">
        <span class="yiji-label ji">忌</span>
        <div class="yiji-tags">
          <span v-for="item in todayFortune.unsuitable" :key="item" class="tag unsuitable">{{ item }}</span>
        </div>
      </div>
    </div>
    
    <!-- 妈祖每日一言 -->
    <div class="daily-word glass-card">
      <div class="word-header">
        <span class="icon">💬</span>
        <span class="title">妈祖每日一言</span>
      </div>
      <p class="word-content">{{ todayFortune.dailyAdvice }}</p>
    </div>
    
    <!-- 妈祖助运推荐 -->
    <div class="fortune-recommend">
      <div class="section-header">
        <MazuAvatar size="small" />
        <span class="section-title">妈祖助运推荐</span>
        <button class="more-btn" @click="$router.push('/wallpaper')">⊞</button>
      </div>
      
      <!-- 壁纸轮播 -->
      <div class="wallpaper-carousel">
        <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div 
            v-for="(wp, idx) in recommendWallpapers" 
            :key="idx" 
            class="carousel-slide"
          >
            <div class="wallpaper-card">
              <div class="card-content">
                <div class="card-text">
                  <p class="greeting">Dear. {{ userInfo.nickname }}</p>
                  <p class="message">{{ wp.message }}</p>
                </div>
                <div class="card-preview" :style="{ background: wp.gradient }">
                  <div class="preview-image">
                    <span class="preview-icon">{{ wp.icon }}</span>
                  </div>
                </div>
              </div>
              <div class="card-title" @click="viewWallpaper(wp)">
                <span class="title-text">{{ wp.name }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="carousel-dots">
          <span 
            v-for="(_, idx) in recommendWallpapers" 
            :key="idx" 
            class="dot"
            :class="{ active: currentSlide === idx }"
            @click="currentSlide = idx"
          ></span>
        </div>
      </div>
    </div>
    
    <!-- 缘起湄洲·祖庭传说 -->
    <div class="culture-section">
      <div class="culture-header">
        <span class="culture-icon">◉</span>
        <span class="culture-title">缘起湄洲·祖庭传说</span>
      </div>
      
      <div class="story-card" @click="showStoryModal = true">
        <div class="story-bg">
          <div class="story-image"></div>
          <div class="story-overlay"></div>
        </div>
        <div class="story-content">
          <h3 class="story-title">湄洲妈祖的故事</h3>
          <span class="story-arrow">›</span>
        </div>
      </div>
    </div>
    
    <!-- 神仙故事弹窗 -->
    <div class="story-modal" v-if="showStoryModal" @click.self="showStoryModal = false">
      <div class="modal-content glass-card">
        <div class="modal-header">
          <h3>湄洲妈祖的故事</h3>
          <button class="close-btn" @click="showStoryModal = false">×</button>
        </div>
        <div class="modal-body">
          <div class="story-banner">
            <MazuAvatar size="large" :glow="true" />
          </div>
          <div class="story-text">
            <h4>缘起湄洲·天后圣迹</h4>
            <p>妈祖，原名林默，生于宋建隆元年（公元960年）三月廿三日，福建莆田湄洲岛人。</p>
            <p>相传林默自幼聪慧过人，八岁入塾读书，能过目成诵。长大后，她决心终身不嫁，矢志行善济人。</p>
            <p>她熟习水性，常在海上救助遇难船只和渔民，被当地人尊称为"神女"、"龙女"。</p>
            <p>宋雍熙四年（公元987年）九月初九，林默在湄洲峰顶羽化升天，时年28岁。此后，她多次显灵护佑海上航行者，被历代朝廷褒封，最终成为"天上圣母"——妈祖。</p>
            <h4>妈祖精神</h4>
            <p>妈祖文化承载着"立德、行善、大爱"的精神内涵，是中华民族优秀传统文化的重要组成部分。</p>
            <p>如今，妈祖信仰已传播至全球五大洲，拥有超过3亿信众，成为连接海内外华人的重要文化纽带。</p>
          </div>
          <div class="story-footer">
            <p class="footer-text">传承经典·需要你的支持</p>
            <p class="footer-hint">永久免费的公益服务</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 壁纸详情弹窗 -->
    <div class="wallpaper-modal" v-if="showWallpaperModal" @click.self="showWallpaperModal = false">
      <div class="modal-content">
        <button class="close-btn" @click="showWallpaperModal = false">×</button>
        <div class="modal-preview" :style="{ background: selectedWallpaper?.gradient }">
          <div class="preview-inner">
            <div class="lucky-elements">
              <span class="element" v-for="el in todayFortune.luckyElement" :key="el">{{ el }}</span>
            </div>
            <div class="lucky-numbers">
              <span v-for="num in todayFortune.luckyNumber" :key="num">{{ num }}</span>
            </div>
            <p class="wallpaper-name">{{ selectedWallpaper?.name }}</p>
          </div>
          <div class="watermark">MAZU 妈祖万年历</div>
        </div>
        <div class="modal-info">
          <p class="info-title">这是你的助运壁纸</p>
          <p class="info-desc">{{ selectedWallpaper?.blessing }}</p>
        </div>
        <button class="btn-gold download-btn" @click="downloadWallpaper">
          <span>下载到相册</span>
          <span>📥</span>
        </button>
      </div>
    </div>
    
    <!-- 快捷功能 -->
    <div class="quick-actions">
      <div class="action-item" @click="$router.push('/zeday')">
        <div class="action-icon">🔮</div>
        <span class="action-label">择天时</span>
        <span class="action-desc">择日</span>
      </div>
      <div class="action-item" @click="$router.push('/fortune')">
        <div class="action-icon">👁️</div>
        <span class="action-label">窥天机</span>
        <span class="action-desc">运程</span>
      </div>
      <div class="action-item" @click="$router.push('/wallpaper')">
        <div class="action-icon">✨</div>
        <span class="action-label">助运势</span>
        <span class="action-desc">助运</span>
      </div>
      <div class="action-item" @click="$router.push('/chat')">
        <div class="action-icon">💭</div>
        <span class="action-label">万事通</span>
        <span class="action-desc">对话</span>
      </div>
    </div>
    
    <!-- 底部导航 -->
    <TabBar />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/app'
import MazuAvatar from '@/components/MazuAvatar.vue'
import TabBar from '@/components/TabBar.vue'

const userStore = useUserStore()
const { userInfo, todayFortune } = storeToRefs(userStore)

const now = new Date()
const currentDay = computed(() => now.getDate())
const currentYear = computed(() => now.getFullYear())
const currentMonthEn = computed(() => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][now.getMonth()])
const currentWeekday = computed(() => ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][now.getDay()])

const getColorCode = (name) => {
  const colorMap = {
    '橙': '#FF8C00',
    '白': '#FFFFFF',
    '绿': '#32CD32',
    '红': '#FF4500',
    '黄': '#FFD700',
    '蓝': '#1E90FF',
    '紫': '#8A2BE2',
    '黑': '#333333'
  }
  return colorMap[name] || '#CCCCCC'
}

// 助运推荐壁纸
const currentSlide = ref(0)
const showWallpaperModal = ref(false)
const showStoryModal = ref(false)
const selectedWallpaper = ref(null)

const recommendWallpapers = ref([
  {
    id: 1,
    name: '九星连珠招财壁纸',
    icon: '🙏',
    message: '今天是你命盘里本月财运最旺的一天，请收下特意为你准备的特别心意...',
    gradient: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD700 100%)',
    blessing: '愿你财运滚滚·马到成功'
  },
  {
    id: 2,
    name: '桃花朵朵开运壁纸',
    icon: '🌸',
    message: '今日桃花运势上佳，这张壁纸助你姻缘美满...',
    gradient: 'linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)',
    blessing: '愿你桃花朵朵·情缘美满'
  },
  {
    id: 3,
    name: '事业高升助运壁纸',
    icon: '🚀',
    message: '你的事业运今日处于上升期，收下这份祝福...',
    gradient: 'linear-gradient(135deg, #4169E1 0%, #0000CD 100%)',
    blessing: '愿你事业有成·步步高升'
  }
])

const viewWallpaper = (wp) => {
  selectedWallpaper.value = wp
  showWallpaperModal.value = true
}

const downloadWallpaper = () => {
  alert('壁纸已保存到相册')
  showWallpaperModal.value = false
}
</script>

<style lang="scss" scoped>
.home-page {
  height: calc(812px - 44px);
  padding: 16px;
  padding-bottom: 96px;
  overflow-y: auto;
  
  &::-webkit-scrollbar {
    display: none;
  }
}

.top-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  
  .logo {
    font-size: 28px;
  }
  
  .user-info {
    flex: 1;
    
    .date-info {
      display: flex;
      gap: 8px;
      font-size: 11px;
      color: var(--text-tertiary);
      
      .ganzhi {
        color: var(--mazu-gold);
      }
    }
    
    .user-brief {
      display: flex;
      flex-direction: column;
      gap: 2px;
      margin-top: 4px;
      
      .name {
        font-size: 13px;
        color: var(--text-secondary);
      }
      
      .mingpan {
        font-size: 11px;
        color: var(--mazu-gold);
      }
    }
  }
  
  .avatar-wrap {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: var(--glass-bg);
    border: 2px solid var(--mazu-gold);
    overflow: hidden;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .avatar-placeholder {
      font-size: 18px;
      color: var(--mazu-gold);
    }
  }
}

.calendar-card {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  
  .date-display {
    display: flex;
    align-items: baseline;
    gap: 12px;
    
    .day {
      font-size: 48px;
      font-weight: 300;
      color: var(--mazu-gold);
      line-height: 1;
    }
    
    .date-detail {
      display: flex;
      flex-direction: column;
      gap: 2px;
      
      .month {
        font-size: 14px;
        color: var(--text-secondary);
      }
      
      .weekday {
        font-size: 12px;
        color: var(--text-tertiary);
      }
    }
  }
  
  .wuxing-info {
    display: flex;
    gap: 16px;
    
    .wuxing-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      
      .label {
        font-size: 10px;
        color: var(--text-tertiary);
      }
      
      .value {
        font-size: 12px;
        color: var(--text-secondary);
        padding: 4px 8px;
        background: rgba(212, 175, 55, 0.1);
        border-radius: 8px;
      }
    }
  }
}

.fortune-score {
  padding: 16px;
  margin-bottom: 16px;
  cursor: pointer;
  
  .score-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    
    .score-title {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
      
      .title {
        font-size: 14px;
        font-weight: 500;
        color: var(--text-primary);
      }
      
      .subtitle {
        font-size: 11px;
        color: var(--text-tertiary);
      }
    }
    
    .arrow {
      color: var(--mazu-gold);
      font-size: 18px;
    }
  }
  
  .score-content {
    display: flex;
    align-items: center;
    gap: 20px;
    
    .score-circle {
      width: 80px;
      height: 80px;
      position: relative;
      
      .score-svg {
        width: 100%;
        height: 100%;
      }
      
      .score-value {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .number {
          font-size: 28px;
          font-weight: 600;
          color: var(--mazu-gold);
        }
        
        .unit {
          font-size: 12px;
          color: var(--text-tertiary);
          margin-left: 2px;
          align-self: flex-end;
          margin-bottom: 6px;
        }
      }
    }
    
    .score-desc {
      flex: 1;
      
      .desc-text {
        font-size: 13px;
        color: var(--text-secondary);
        margin-bottom: 4px;
      }
      
      .desc-hint {
        font-size: 11px;
        color: var(--text-tertiary);
      }
    }
  }
}

.quick-view {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 16px;
  
  .quick-item {
    padding: 12px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    
    .label {
      font-size: 10px;
      color: var(--text-tertiary);
    }
    
    .colors {
      display: flex;
      gap: 4px;
      
      .color-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        border: 1px solid rgba(255,255,255,0.3);
      }
    }
    
    .value {
      font-size: 11px;
      color: var(--text-secondary);
      text-align: center;
      
      &.time, &.direction, &.number {
        color: var(--mazu-gold);
        font-weight: 500;
      }
    }
  }
}

.yiji-section {
  padding: 14px;
  margin-bottom: 16px;
  
  .yiji-row {
    display: flex;
    align-items: center;
    gap: 12px;
    
    &:first-child {
      margin-bottom: 10px;
    }
    
    .yiji-label {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 500;
      flex-shrink: 0;
      
      &.yi {
        background: rgba(74, 222, 128, 0.2);
        color: #4ade80;
      }
      
      &.ji {
        background: rgba(248, 113, 113, 0.2);
        color: #f87171;
      }
    }
    
    .yiji-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      
      .tag {
        font-size: 11px;
        color: var(--text-secondary);
        padding: 4px 8px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 6px;
        
        &.unsuitable {
          color: var(--text-tertiary);
        }
      }
    }
  }
}

.daily-word {
  padding: 14px;
  margin-bottom: 16px;
  
  .word-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 10px;
    
    .icon {
      font-size: 16px;
    }
    
    .title {
      font-size: 13px;
      font-weight: 500;
      color: var(--text-primary);
    }
  }
  
  .word-content {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.6;
  }
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 20px;
  
  .action-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    padding: 12px 8px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      border-color: var(--mazu-gold);
      background: rgba(212, 175, 55, 0.05);
    }
    
    .action-icon {
      font-size: 24px;
    }
    
    .action-label {
      font-size: 13px;
      color: var(--text-primary);
      font-weight: 500;
    }
    
    .action-desc {
      font-size: 10px;
      color: var(--text-tertiary);
    }
  }
}

// 妈祖助运推荐
.fortune-recommend {
  margin-bottom: 20px;
  
  .section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 14px;
    
    .section-title {
      flex: 1;
      font-size: 15px;
      font-weight: 500;
      color: var(--text-primary);
    }
    
    .more-btn {
      width: 32px;
      height: 32px;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: 8px;
      color: var(--text-secondary);
      font-size: 18px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  
  .wallpaper-carousel {
    position: relative;
    overflow: hidden;
    border-radius: 16px;
    
    .carousel-track {
      display: flex;
      transition: transform 0.3s ease;
    }
    
    .carousel-slide {
      min-width: 100%;
    }
    
    .wallpaper-card {
      background: #F4C430;
      border-radius: 16px;
      overflow: hidden;
      
      .card-content {
        display: flex;
        padding: 16px;
        gap: 12px;
        
        .card-text {
          flex: 1;
          
          .greeting {
            font-size: 16px;
            font-weight: 600;
            color: #1a1a2e;
            margin-bottom: 8px;
          }
          
          .message {
            font-size: 13px;
            color: #333;
            line-height: 1.5;
          }
        }
        
        .card-preview {
          width: 100px;
          height: 120px;
          border-radius: 12px;
          overflow: hidden;
          flex-shrink: 0;
          
          .preview-image {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            
            .preview-icon {
              font-size: 48px;
            }
          }
        }
      }
      
      .card-title {
        background: #2563EB;
        padding: 12px 16px;
        cursor: pointer;
        transition: background 0.2s;
        
        &:hover {
          background: #1d4ed8;
        }
        
        .title-text {
          font-size: 14px;
          font-weight: 500;
          color: #fff;
        }
      }
    }
    
    .carousel-dots {
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-top: 12px;
      
      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        cursor: pointer;
        transition: all 0.2s;
        
        &.active {
          background: var(--mazu-gold);
          width: 20px;
          border-radius: 4px;
        }
      }
    }
  }
}

// 缘起湄洲·祖庭传说
.culture-section {
  margin-bottom: 20px;
  
  .culture-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
    
    .culture-icon {
      color: var(--text-tertiary);
      font-size: 12px;
    }
    
    .culture-title {
      font-size: 14px;
      color: var(--text-secondary);
    }
  }
  
  .story-card {
    position: relative;
    height: 120px;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    
    .story-bg {
      position: absolute;
      inset: 0;
      
      .story-image {
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #4a2070 0%, #1a0a2e 50%, #0d0618 100%);
        
        &::before {
          content: '';
          position: absolute;
          right: 0;
          bottom: 0;
          width: 60%;
          height: 100%;
          background: 
            radial-gradient(ellipse at 80% 100%, rgba(255, 150, 100, 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 90% 80%, rgba(200, 100, 50, 0.2) 0%, transparent 40%);
        }
        
        &::after {
          content: '🏛️';
          position: absolute;
          right: 20px;
          bottom: 20px;
          font-size: 48px;
          opacity: 0.8;
        }
      }
      
      .story-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, rgba(26, 10, 46, 0.9) 0%, transparent 60%);
      }
    }
    
    .story-content {
      position: relative;
      z-index: 1;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      
      .story-title {
        font-size: 18px;
        font-weight: 500;
        color: var(--text-primary);
      }
      
      .story-arrow {
        width: 36px;
        height: 36px;
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        color: var(--text-secondary);
      }
    }
  }
}

// 神仙故事弹窗
.story-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 20px;
  
  .modal-content {
    width: 100%;
    max-width: 340px;
    max-height: 80vh;
    overflow-y: auto;
    padding: 0;
    
    &::-webkit-scrollbar { display: none; }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      border-bottom: 1px solid var(--glass-border);
      position: sticky;
      top: 0;
      background: var(--glass-bg);
      backdrop-filter: blur(20px);
      z-index: 10;
      
      h3 {
        font-size: 16px;
        color: var(--mazu-gold);
      }
      
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
    
    .modal-body {
      padding: 20px;
      
      .story-banner {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
      }
      
      .story-text {
        h4 {
          font-size: 15px;
          color: var(--mazu-gold);
          margin-bottom: 12px;
          margin-top: 16px;
          
          &:first-child {
            margin-top: 0;
          }
        }
        
        p {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 10px;
          text-indent: 2em;
        }
      }
      
      .story-footer {
        margin-top: 24px;
        padding-top: 16px;
        border-top: 1px solid var(--glass-border);
        text-align: center;
        
        .footer-text {
          font-size: 13px;
          color: var(--mazu-gold);
          margin-bottom: 4px;
        }
        
        .footer-hint {
          font-size: 11px;
          color: var(--text-tertiary);
        }
      }
    }
  }
}

// 壁纸详情弹窗
.wallpaper-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 20px;
  
  .modal-content {
    width: 100%;
    max-width: 300px;
    position: relative;
    
    .close-btn {
      position: absolute;
      top: -40px;
      right: 0;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--glass-bg);
      border: none;
      color: var(--text-primary);
      font-size: 20px;
      cursor: pointer;
      z-index: 10;
    }
    
    .modal-preview {
      height: 400px;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      
      .preview-inner {
        text-align: center;
        
        .lucky-elements {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 24px;
          
          .element {
            width: 48px;
            height: 48px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            font-weight: 600;
            color: #fff;
            backdrop-filter: blur(10px);
          }
        }
        
        .lucky-numbers {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 24px;
          
          span {
            font-size: 48px;
            font-weight: 300;
            color: #fff;
            text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
          }
        }
        
        .wallpaper-name {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.8);
        }
      }
      
      .watermark {
        position: absolute;
        bottom: 16px;
        font-size: 11px;
        color: rgba(255, 255, 255, 0.5);
      }
    }
    
    .modal-info {
      padding: 16px;
      text-align: center;
      
      .info-title {
        font-size: 14px;
        color: var(--text-primary);
        margin-bottom: 6px;
      }
      
      .info-desc {
        font-size: 12px;
        color: var(--mazu-gold);
      }
    }
    
    .download-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
  }
}
</style>
