<template>
  <div class="page-container">
    <header class="page-header">
      <button class="back-btn" @click="$router.back()">←</button>
      <h1 class="page-title">语言设置</h1>
      <div class="placeholder"></div>
    </header>
    
    <div class="language-list glass-card">
      <div 
        v-for="lang in languages" 
        :key="lang.code"
        class="language-item"
        :class="{ active: currentLang === lang.code }"
        @click="selectLanguage(lang.code)"
      >
        <div class="lang-info">
          <span class="lang-flag">{{ lang.flag }}</span>
          <div class="lang-text">
            <span class="lang-name">{{ lang.name }}</span>
            <span class="lang-native">{{ lang.native }}</span>
          </div>
        </div>
        <span v-if="currentLang === lang.code" class="check-icon">✓</span>
      </div>
    </div>
    
    <p class="hint-text">切换语言后，APP将重新加载</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentLang = ref('zh-CN')

const languages = [
  { code: 'zh-CN', name: '简体中文', native: '简体中文', flag: '🇨🇳' },
  { code: 'zh-TW', name: '繁體中文', native: '繁體中文', flag: '🇹🇼' },
  { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
  { code: 'ja', name: '日本語', native: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', native: '韩语', flag: '🇰🇷' }
]

const selectLanguage = (code) => {
  if (code !== currentLang.value) {
    currentLang.value = code
    const lang = languages.find(l => l.code === code)
    alert(`语言已切换为${lang.name}`)
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
  margin-bottom: 24px;
  
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

.glass-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
}

.language-list {
  overflow: hidden;
  
  .language-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px;
    border-bottom: 1px solid var(--glass-border);
    cursor: pointer;
    transition: background 0.2s;
    
    &:last-child { border-bottom: none; }
    &:hover { background: rgba(255, 255, 255, 0.03); }
    
    &.active {
      background: rgba(212, 175, 55, 0.05);
      
      .lang-name { color: var(--mazu-gold); }
    }
    
    .lang-info {
      display: flex;
      align-items: center;
      gap: 14px;
      
      .lang-flag { font-size: 24px; }
      
      .lang-text {
        display: flex;
        flex-direction: column;
        gap: 2px;
        
        .lang-name {
          font-size: 15px;
          color: var(--text-primary);
        }
        
        .lang-native {
          font-size: 12px;
          color: var(--text-tertiary);
        }
      }
    }
    
    .check-icon {
      color: var(--mazu-gold);
      font-size: 18px;
      font-weight: 600;
    }
  }
}

.hint-text {
  font-size: 12px;
  color: var(--text-tertiary);
  text-align: center;
  margin-top: 20px;
  opacity: 0.7;
}
</style>
