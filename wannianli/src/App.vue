<template>
  <div class="app-container" :class="{ 'dark-mode': isDarkMode }">
    <div class="phone-frame">
      <div class="status-bar">
        <span class="time">{{ currentTime }}</span>
        <div class="status-icons">
          <span class="signal">📶</span>
          <span class="wifi">📡</span>
          <span class="battery">🔋</span>
        </div>
      </div>
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { isDarkMode } = storeToRefs(appStore)

const currentTime = ref('')

const updateTime = () => {
  const now = new Date()
  currentTime.value = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
}

let timer
onMounted(() => {
  updateTime()
  timer = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>

<style lang="scss" scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 50%, #2a1040 100%);
  padding: 20px;
}

.phone-frame {
  width: 375px;
  height: 812px;
  background: linear-gradient(180deg, #1a0a2e 0%, #0d0618 100%);
  border-radius: 40px;
  overflow: hidden;
  position: relative;
  box-shadow: 
    0 0 0 12px #1a1a2e,
    0 0 0 14px #333,
    0 25px 50px rgba(0, 0, 0, 0.5),
    inset 0 0 80px rgba(212, 175, 55, 0.03);
}

.status-bar {
  height: 44px;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: transparent;
  position: relative;
  z-index: 100;
  
  .time {
    font-size: 15px;
    font-weight: 600;
    color: #fff;
  }
  
  .status-icons {
    display: flex;
    gap: 4px;
    font-size: 12px;
  }
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
