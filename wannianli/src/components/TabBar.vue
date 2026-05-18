<template>
  <nav class="tab-bar">
    <router-link 
      v-for="tab in tabs" 
      :key="tab.path"
      :to="tab.path"
      class="tab-item"
      :class="{ active: currentPath === tab.path }"
    >
      <div class="tab-icon">
        <span class="icon">{{ tab.icon }}</span>
        <span class="icon-active">{{ tab.iconActive }}</span>
      </div>
      <span class="tab-label">{{ tab.label }}</span>
      <div class="tab-indicator"></div>
    </router-link>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentPath = computed(() => route.path)

const tabs = [
  { path: '/home', label: '首页', icon: '🏠', iconActive: '🏡' },
  { path: '/zeday', label: '择日', icon: '📅', iconActive: '📆' },
  { path: '/chat', label: '陪伴', icon: '💬', iconActive: '🗨️' },
  { path: '/profile', label: '我的', icon: '👤', iconActive: '👤' }
]
</script>

<style lang="scss" scoped>
.tab-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(180deg, rgba(26, 10, 46, 0.95) 0%, rgba(13, 6, 24, 0.98) 100%);
  backdrop-filter: blur(20px);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 20px;
  border-top: 1px solid rgba(212, 175, 55, 0.1);
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 16px;
  transition: all 0.3s ease;
  position: relative;
  
  &.active {
    .tab-icon {
      .icon { opacity: 0; }
      .icon-active { opacity: 1; }
    }
    
    .tab-label {
      color: var(--mazu-gold);
    }
    
    .tab-indicator {
      opacity: 1;
      transform: scaleX(1);
    }
  }
}

.tab-icon {
  position: relative;
  font-size: 24px;
  height: 28px;
  
  .icon, .icon-active {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    transition: opacity 0.2s;
  }
  
  .icon-active {
    opacity: 0;
  }
}

.tab-label {
  font-size: 11px;
  color: var(--text-tertiary);
  transition: color 0.2s;
}

.tab-indicator {
  position: absolute;
  bottom: 0;
  width: 20px;
  height: 3px;
  background: var(--mazu-gold);
  border-radius: 3px;
  opacity: 0;
  transform: scaleX(0);
  transition: all 0.3s ease;
}
</style>
