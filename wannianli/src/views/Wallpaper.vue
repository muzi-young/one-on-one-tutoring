<template>
  <div class="wallpaper-page">
    <!-- 头部 -->
    <header class="page-header">
      <button class="back-btn" @click="$router.back()">←</button>
      <h1 class="page-title">助运壁纸</h1>
      <div class="placeholder"></div>
    </header>
    
    <!-- 当日特推壁纸 -->
    <div class="featured-section">
      <div class="featured-card glass-card">
        <div class="card-badge">今日特推</div>
        <div class="wallpaper-preview">
          <div class="preview-content">
            <div class="lucky-elements">
              <span class="element gold">金</span>
              <span class="element wood">木</span>
            </div>
            <div class="lucky-numbers">
              <span>9</span>
              <span>3</span>
            </div>
            <p class="wallpaper-title">九星连珠招财壁纸</p>
          </div>
        </div>
        <div class="card-info">
          <p class="message">Dear. {{ userInfo.nickname }}</p>
          <p class="desc">今天是你命盘里本月财运最旺的一天，请收下特意为你准备的特别心意...</p>
        </div>
        <button class="btn-gold download-btn" @click="downloadWallpaper">
          <span>下载到相册</span>
          <span>📥</span>
        </button>
      </div>
    </div>
    
    <!-- 我的壁纸 -->
    <div class="my-wallpapers">
      <h3 class="section-title">我的壁纸</h3>
      <div class="wallpaper-grid">
        <div 
          v-for="wp in wallpapers" 
          :key="wp.id" 
          class="wallpaper-item"
          @click="viewWallpaper(wp)"
        >
          <div class="wp-preview" :style="{ background: wp.gradient }">
            <span class="wp-icon">{{ wp.icon }}</span>
          </div>
          <span class="wp-name">{{ wp.name }}</span>
          <span class="wp-date">{{ wp.date }}</span>
        </div>
        
        <!-- 空状态 -->
        <div v-if="wallpapers.length === 0" class="empty-state">
          <span class="icon">🖼️</span>
          <p>暂无壁纸</p>
        </div>
      </div>
    </div>
    
    <!-- 壁纸详情弹窗 -->
    <div class="wallpaper-modal" v-if="showModal" @click.self="showModal = false">
      <div class="modal-content">
        <button class="close-btn" @click="showModal = false">×</button>
        <div class="modal-preview" :style="{ background: selectedWallpaper?.gradient }">
          <div class="preview-inner">
            <span class="wp-icon">{{ selectedWallpaper?.icon }}</span>
            <p class="wp-title">{{ selectedWallpaper?.name }}</p>
            <p class="wp-desc">{{ selectedWallpaper?.desc }}</p>
          </div>
          <div class="watermark">MAZU 妈祖万年历</div>
        </div>
        <div class="modal-actions">
          <button class="action-btn" @click="shareWallpaper">
            <span>分享</span>
            <span>📤</span>
          </button>
          <button class="action-btn primary" @click="downloadWallpaper">
            <span>下载</span>
            <span>📥</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/app'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const showModal = ref(false)
const selectedWallpaper = ref(null)

const wallpapers = ref([
  {
    id: 1,
    name: '招财进宝',
    icon: '💰',
    gradient: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
    date: '2026-04-15',
    desc: '愿你财运滚滚·马到成功'
  },
  {
    id: 2,
    name: '桃花运旺',
    icon: '🌸',
    gradient: 'linear-gradient(135deg, #FF69B4 0%, #FF1493 100%)',
    date: '2026-04-10',
    desc: '愿你桃花朵朵·情缘美满'
  },
  {
    id: 3,
    name: '事业腾飞',
    icon: '🚀',
    gradient: 'linear-gradient(135deg, #4169E1 0%, #0000CD 100%)',
    date: '2026-04-05',
    desc: '愿你事业有成·步步高升'
  },
  {
    id: 4,
    name: '健康长寿',
    icon: '🌿',
    gradient: 'linear-gradient(135deg, #32CD32 0%, #228B22 100%)',
    date: '2026-03-28',
    desc: '愿你身体康健·福寿绵长'
  }
])

const viewWallpaper = (wp) => {
  selectedWallpaper.value = wp
  showModal.value = true
}

const downloadWallpaper = () => {
  alert('壁纸已保存到相册')
  showModal.value = false
}

const shareWallpaper = () => {
  alert('打开分享菜单')
}
</script>

<style lang="scss" scoped>
.wallpaper-page {
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

.featured-section {
  margin-bottom: 24px;
}

.featured-card {
  padding: 16px;
  position: relative;
  
  .card-badge {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 4px 10px;
    background: var(--mazu-gold);
    color: #1a0a2e;
    font-size: 11px;
    font-weight: 600;
    border-radius: 10px;
  }
  
  .wallpaper-preview {
    height: 200px;
    background: linear-gradient(135deg, #1a0a2e 0%, #4a2070 50%, #D4AF37 100%);
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    
    .preview-content {
      text-align: center;
      
      .lucky-elements {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-bottom: 16px;
        
        .element {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 600;
          
          &.gold {
            background: linear-gradient(135deg, #FFD700 0%, #B8860B 100%);
            color: #1a0a2e;
          }
          
          &.wood {
            background: linear-gradient(135deg, #32CD32 0%, #228B22 100%);
            color: #fff;
          }
        }
      }
      
      .lucky-numbers {
        display: flex;
        justify-content: center;
        gap: 16px;
        margin-bottom: 16px;
        
        span {
          font-size: 36px;
          font-weight: 300;
          color: var(--mazu-gold);
          text-shadow: 0 0 20px rgba(212, 175, 55, 0.5);
        }
      }
      
      .wallpaper-title {
        font-size: 14px;
        color: var(--text-secondary);
      }
    }
  }
  
  .card-info {
    margin-bottom: 16px;
    
    .message {
      font-size: 14px;
      color: var(--mazu-gold);
      margin-bottom: 8px;
    }
    
    .desc {
      font-size: 13px;
      color: var(--text-secondary);
      line-height: 1.6;
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

.my-wallpapers {
  .section-title {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 16px;
  }
}

.wallpaper-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  
  .wallpaper-item {
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    padding: 12px;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      border-color: var(--mazu-gold);
    }
    
    .wp-preview {
      height: 120px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      
      .wp-icon {
        font-size: 36px;
      }
    }
    
    .wp-name {
      font-size: 13px;
      color: var(--text-primary);
      display: block;
      margin-bottom: 4px;
    }
    
    .wp-date {
      font-size: 11px;
      color: var(--text-tertiary);
    }
  }
  
  .empty-state {
    grid-column: span 2;
    padding: 40px;
    text-align: center;
    
    .icon {
      font-size: 48px;
      display: block;
      margin-bottom: 12px;
      opacity: 0.5;
    }
    
    p {
      color: var(--text-tertiary);
    }
  }
}

.wallpaper-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
  
  .modal-content {
    width: 100%;
    max-width: 320px;
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
    }
    
    .modal-preview {
      height: 480px;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      
      .preview-inner {
        text-align: center;
        
        .wp-icon {
          font-size: 64px;
          display: block;
          margin-bottom: 20px;
        }
        
        .wp-title {
          font-size: 24px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 12px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        
        .wp-desc {
          font-size: 14px;
          color: rgba(255,255,255,0.8);
        }
      }
      
      .watermark {
        position: absolute;
        bottom: 20px;
        font-size: 12px;
        color: rgba(255,255,255,0.5);
      }
    }
    
    .modal-actions {
      display: flex;
      gap: 12px;
      margin-top: 16px;
      
      .action-btn {
        flex: 1;
        padding: 14px;
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: 12px;
        color: var(--text-primary);
        font-size: 14px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        
        &.primary {
          background: var(--mazu-gold);
          border-color: var(--mazu-gold);
          color: #1a0a2e;
        }
      }
    }
  }
}
</style>
