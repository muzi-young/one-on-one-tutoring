<template>
  <div class="page-container">
    <header class="page-header">
      <button class="back-btn" @click="$router.back()">←</button>
      <h1 class="page-title">关于APP</h1>
      <div class="placeholder"></div>
    </header>
    
    <div class="app-info">
      <div class="logo-section">
        <div class="app-logo">🐉</div>
        <h2 class="app-name">妈祖万年历</h2>
        <p class="app-slogan">只为你服务的神仙智能体</p>
        <span class="app-version">版本 v1.0.0 (Build 100)</span>
      </div>
    </div>
    
    <div class="menu-list glass-card">
      <div class="menu-item" @click="showAgreement('user')">
        <span class="menu-icon">📄</span>
        <span class="menu-label">用户协议</span>
        <span class="menu-arrow">→</span>
      </div>
      <div class="menu-item" @click="showAgreement('privacy')">
        <span class="menu-icon">🔐</span>
        <span class="menu-label">隐私政策</span>
        <span class="menu-arrow">→</span>
      </div>
      <div class="menu-item" @click="showAgreement('disclaimer')">
        <span class="menu-icon">⚠️</span>
        <span class="menu-label">免责声明</span>
        <span class="menu-arrow">→</span>
      </div>
    </div>
    
    <div class="menu-list glass-card" style="margin-top: 16px;">
      <div class="menu-item" @click="checkUpdate">
        <span class="menu-icon">🔄</span>
        <span class="menu-label">检查更新</span>
        <span class="menu-value">{{ updateStatus }}</span>
        <span class="menu-arrow">→</span>
      </div>
      <div class="menu-item" @click="clearCache">
        <span class="menu-icon">🧹</span>
        <span class="menu-label">清除缓存</span>
        <span class="menu-value">{{ cacheSize }}</span>
        <span class="menu-arrow">→</span>
      </div>
    </div>
    
    <div class="about-footer">
      <p class="copyright">© 2026 妈祖万年历</p>
      <p class="disclaimer">基于经典国学算法推演建议 · 仅作生活娱乐参考</p>
      <p class="disclaimer">不构成任何专业建议</p>
    </div>
    
    <!-- 协议弹窗 -->
    <div class="agreement-modal" v-if="showModal" @click.self="showModal = false">
      <div class="modal-content glass-card">
        <div class="modal-header">
          <h3>{{ modalTitle }}</h3>
          <button class="close-btn" @click="showModal = false">×</button>
        </div>
        <div class="modal-body">
          <div v-html="modalContent"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const updateStatus = ref('已是最新版本')
const cacheSize = ref('12.5 MB')
const showModal = ref(false)
const modalTitle = ref('')
const modalContent = ref('')

const agreements = {
  user: {
    title: '用户协议',
    content: `
      <h4>第一条 总则</h4>
      <p>欢迎使用妈祖万年历APP（以下简称"本应用"）。请您仔细阅读本协议，如果您对本协议的任何条款表示异议，请不要使用本应用。</p>
      
      <h4>第二条 服务内容</h4>
      <p>本应用基于传统国学文化，提供万年历查询、个人运势分析、择日服务、AI对话陪伴等功能。所有内容仅供娱乐参考，不构成任何专业建议。</p>
      
      <h4>第三条 用户信息</h4>
      <p>用户注册时需提供真实的出生日期、时辰等信息，以确保服务的准确性。我们承诺对用户信息严格保密。</p>
      
      <h4>第四条 免责声明</h4>
      <p>本应用提供的所有运势分析、择日建议等内容均基于传统国学算法推演，仅作为生活娱乐参考，不构成医疗、法律、投资等任何专业建议。</p>
    `
  },
  privacy: {
    title: '隐私政策',
    content: `
      <h4>1. 信息收集</h4>
      <p>我们收集您的注册信息（手机号、昵称、出生日期等）以提供个性化服务。</p>
      
      <h4>2. 信息使用</h4>
      <p>您的信息仅用于提供运势分析、择日服务等功能，不会用于其他目的。</p>
      
      <h4>3. 信息保护</h4>
      <p>我们采用业界标准的加密技术保护您的个人信息安全。</p>
      
      <h4>4. 信息共享</h4>
      <p>未经您的同意，我们不会向任何第三方共享您的个人信息。</p>
      
      <h4>5. 用户权利</h4>
      <p>您有权查看、修改或删除您的个人信息，也可以申请注销账号。</p>
    `
  },
  disclaimer: {
    title: '免责声明',
    content: `
      <h4>重要提示</h4>
      <p>本应用提供的所有内容，包括但不限于：</p>
      <ul>
        <li>每日运势解读</li>
        <li>择日吉日推荐</li>
        <li>AI对话建议</li>
        <li>助运元素推荐</li>
      </ul>
      <p>均基于传统钦天监《钦定协纪辨方书》及《滴天髓》等国学经典的算法推演，<strong>仅供生活娱乐参考</strong>。</p>
      
      <h4>特别声明</h4>
      <p>1. 本应用内容不构成任何医疗、法律、投资、婚姻等专业建议。</p>
      <p>2. 用户不应将本应用内容作为重大决策的唯一依据。</p>
      <p>3. 因使用本应用内容导致的任何后果，本应用不承担任何责任。</p>
    `
  }
}

const showAgreement = (type) => {
  const agreement = agreements[type]
  modalTitle.value = agreement.title
  modalContent.value = agreement.content
  showModal.value = true
}

const checkUpdate = () => {
  updateStatus.value = '检查中...'
  setTimeout(() => {
    updateStatus.value = '已是最新版本'
    alert('当前已是最新版本')
  }, 1500)
}

const clearCache = () => {
  if (confirm('确定要清除缓存吗？')) {
    cacheSize.value = '清除中...'
    setTimeout(() => {
      cacheSize.value = '0 MB'
      alert('缓存已清除')
    }, 1000)
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

.app-info {
  margin-bottom: 24px;
  
  .logo-section {
    text-align: center;
    padding: 32px 20px;
    
    .app-logo {
      font-size: 64px;
      margin-bottom: 16px;
    }
    
    .app-name {
      font-size: 22px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 8px;
    }
    
    .app-slogan {
      font-size: 14px;
      color: var(--text-tertiary);
      margin-bottom: 12px;
    }
    
    .app-version {
      font-size: 13px;
      color: var(--mazu-gold);
      padding: 6px 16px;
      background: rgba(212, 175, 55, 0.1);
      border-radius: 20px;
    }
  }
}

.glass-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
}

.menu-list {
  overflow: hidden;
  
  .menu-item {
    display: flex;
    align-items: center;
    padding: 16px 18px;
    border-bottom: 1px solid var(--glass-border);
    cursor: pointer;
    transition: background 0.2s;
    
    &:last-child { border-bottom: none; }
    &:hover { background: rgba(255, 255, 255, 0.03); }
    
    .menu-icon { font-size: 20px; margin-right: 14px; }
    .menu-label { flex: 1; font-size: 15px; color: var(--text-primary); }
    .menu-value { font-size: 13px; color: var(--text-tertiary); margin-right: 10px; }
    .menu-arrow { color: var(--text-tertiary); font-size: 16px; }
  }
}

.about-footer {
  margin-top: 40px;
  text-align: center;
  padding-bottom: 20px;
  
  .copyright {
    font-size: 13px;
    color: var(--text-secondary);
    margin-bottom: 8px;
  }
  
  .disclaimer {
    font-size: 11px;
    color: var(--text-tertiary);
    opacity: 0.7;
    line-height: 1.8;
  }
}

.agreement-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
  
  .modal-content {
    width: 100%;
    max-width: 340px;
    max-height: 80vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 18px 20px;
      border-bottom: 1px solid var(--glass-border);
      flex-shrink: 0;
      
      h3 { font-size: 16px; color: var(--text-primary); }
      
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
      overflow-y: auto;
      flex: 1;
      
      &::-webkit-scrollbar { display: none; }
      
      :deep(h4) {
        font-size: 14px;
        color: var(--mazu-gold);
        margin: 16px 0 10px;
        
        &:first-child { margin-top: 0; }
      }
      
      :deep(p) {
        font-size: 13px;
        color: var(--text-secondary);
        line-height: 1.8;
        margin-bottom: 10px;
      }
      
      :deep(ul) {
        padding-left: 20px;
        margin-bottom: 10px;
        
        li {
          font-size: 13px;
          color: var(--text-secondary);
          line-height: 1.8;
        }
      }
      
      :deep(strong) {
        color: var(--mazu-gold);
      }
    }
  }
}
</style>
