<template>
  <div class="welcome-page">
    <!-- 背景动效 -->
    <div class="bg-effects">
      <div class="star" v-for="i in 20" :key="i" :style="starStyle(i)"></div>
      <div class="aurora"></div>
    </div>
    
    <!-- 主内容 -->
    <div class="content">
      <!-- 妈祖头像 -->
      <div class="brand-section">
        <MazuAvatar size="xlarge" :animate="true" :glow="true" />
        <h1 class="brand-title">
          <span class="title-en">MAZU</span>
          <span class="title-zh">妈祖</span>
        </h1>
        <p class="brand-slogan">只为你服务的神仙智能体</p>
      </div>
      
      <!-- 功能卖点 -->
      <div class="features">
        <div class="feature-item" v-for="(feature, index) in features" :key="index">
          <div class="feature-icon">{{ feature.icon }}</div>
          <div class="feature-text">
            <span class="feature-title">{{ feature.title }}</span>
            <span class="feature-desc">{{ feature.desc }}</span>
          </div>
        </div>
      </div>
      
      <!-- CTA按钮 -->
      <div class="cta-section">
        <button class="btn-gold cta-btn" @click="startExperience">
          <span>开始体验</span>
          <span class="arrow">→</span>
        </button>
        <p class="cta-hint">限时免费 · 1分钟极速注册</p>
      </div>
      
      <!-- 登录入口 -->
      <div class="login-entry">
        <router-link to="/login" class="text-link">已有账号？直接登录</router-link>
      </div>
    </div>
    
    <!-- 底部声明 -->
    <footer class="footer">
      <p>基于经典国学算法推演建议 · 仅作生活娱乐参考</p>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import MazuAvatar from '@/components/MazuAvatar.vue'

const router = useRouter()

const features = [
  { icon: '📿', title: '私人万年历', desc: '助运每天' },
  { icon: '🎯', title: '个人吉日挑选', desc: '择吉而行' },
  { icon: '💭', title: '生活陪伴建议', desc: '万事问答' }
]

const startExperience = () => {
  router.push('/register')
}

const starStyle = (i) => ({
  '--delay': `${Math.random() * 3}s`,
  '--x': `${Math.random() * 100}%`,
  '--y': `${Math.random() * 100}%`,
  '--size': `${Math.random() * 3 + 1}px`
})
</script>

<style lang="scss" scoped>
.welcome-page {
  height: calc(812px - 44px);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.bg-effects {
  position: absolute;
  inset: 0;
  pointer-events: none;
  
  .star {
    position: absolute;
    width: var(--size);
    height: var(--size);
    background: #fff;
    border-radius: 50%;
    left: var(--x);
    top: var(--y);
    animation: twinkle 2s ease-in-out infinite;
    animation-delay: var(--delay);
    opacity: 0.5;
  }
  
  .aurora {
    position: absolute;
    top: 0;
    left: -50%;
    width: 200%;
    height: 300px;
    background: radial-gradient(ellipse at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%);
    animation: aurora-move 8s ease-in-out infinite;
  }
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

@keyframes aurora-move {
  0%, 100% { transform: translateX(-10%) rotate(-5deg); }
  50% { transform: translateX(10%) rotate(5deg); }
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 24px;
  position: relative;
  z-index: 1;
}

.brand-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  animation: fade-in-up 0.8s ease-out;
}

.brand-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
  
  .title-en {
    font-size: 32px;
    font-weight: 300;
    letter-spacing: 8px;
    color: var(--mazu-gold);
    text-shadow: 0 0 30px rgba(212, 175, 55, 0.5);
  }
  
  .title-zh {
    font-size: 18px;
    font-weight: 500;
    color: var(--text-secondary);
    margin-top: 4px;
  }
}

.brand-slogan {
  font-size: 14px;
  color: var(--text-tertiary);
  margin-top: 8px;
}

.features {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 40px;
  animation: fade-in-up 0.8s ease-out 0.2s both;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  background: var(--glass-bg);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  min-width: 100px;
  
  .feature-icon {
    font-size: 28px;
  }
  
  .feature-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    
    .feature-title {
      font-size: 13px;
      font-weight: 500;
      color: var(--text-primary);
    }
    
    .feature-desc {
      font-size: 11px;
      color: var(--text-tertiary);
    }
  }
}

.cta-section {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  animation: fade-in-up 0.8s ease-out 0.4s both;
  
  .cta-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    padding: 16px 48px;
    animation: pulse-glow 2s ease-in-out infinite;
    
    .arrow {
      transition: transform 0.3s;
    }
    
    &:hover .arrow {
      transform: translateX(4px);
    }
  }
  
  .cta-hint {
    font-size: 12px;
    color: var(--text-tertiary);
  }
}

.login-entry {
  margin-top: 16px;
  animation: fade-in-up 0.8s ease-out 0.5s both;
}

.footer {
  padding: 16px;
  text-align: center;
  
  p {
    font-size: 10px;
    color: var(--text-tertiary);
    opacity: 0.6;
  }
}
</style>
