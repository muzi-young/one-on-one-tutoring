<template>
  <div class="page-container">
    <header class="page-header">
      <button class="back-btn" @click="$router.back()">←</button>
      <h1 class="page-title">账号与安全</h1>
      <div class="placeholder"></div>
    </header>
    
    <div class="menu-list glass-card">
      <div class="menu-item" @click="$router.push('/profile/change-password')">
        <span class="menu-icon">🔑</span>
        <span class="menu-label">修改密码</span>
        <span class="menu-arrow">→</span>
      </div>
      <div class="menu-item" @click="bindPhone">
        <span class="menu-icon">📱</span>
        <span class="menu-label">绑定手机</span>
        <span class="menu-value">{{ phone }}</span>
        <span class="menu-arrow">→</span>
      </div>
      <div class="menu-item" @click="bindEmail">
        <span class="menu-icon">📧</span>
        <span class="menu-label">绑定邮箱</span>
        <span class="menu-value">{{ email || '未绑定' }}</span>
        <span class="menu-arrow">→</span>
      </div>
    </div>
    
    <div class="menu-list glass-card" style="margin-top: 20px;">
      <div class="menu-item" @click="showLoginDevices">
        <span class="menu-icon">📲</span>
        <span class="menu-label">登录设备管理</span>
        <span class="menu-arrow">→</span>
      </div>
      <div class="menu-item" @click="showLoginHistory">
        <span class="menu-icon">📋</span>
        <span class="menu-label">登录记录</span>
        <span class="menu-arrow">→</span>
      </div>
    </div>
    
    <div class="danger-zone">
      <h3>危险操作</h3>
      <div class="menu-list glass-card danger">
        <div class="menu-item" @click="confirmDeleteAccount">
          <span class="menu-icon">🗑️</span>
          <span class="menu-label">注销账号</span>
          <span class="menu-arrow">→</span>
        </div>
      </div>
      <p class="danger-hint">注销账号后，所有数据将被永久删除且无法恢复</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const phone = ref('138****8888')
const email = ref('')

const bindPhone = () => {
  alert('修改绑定手机号')
}

const bindEmail = () => {
  alert('绑定邮箱')
}

const showLoginDevices = () => {
  alert('查看登录设备')
}

const showLoginHistory = () => {
  alert('查看登录记录')
}

const confirmDeleteAccount = () => {
  if (confirm('确定要注销账号吗？此操作不可恢复，所有数据将被永久删除！')) {
    if (confirm('再次确认：您真的要注销账号吗？')) {
      alert('账号注销申请已提交，将在7个工作日内处理')
    }
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

.glass-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
}

.menu-list {
  overflow: hidden;
  
  &.danger {
    border-color: rgba(248, 113, 113, 0.3);
    
    .menu-item {
      .menu-label { color: #f87171; }
    }
  }
  
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

.danger-zone {
  margin-top: 32px;
  
  h3 {
    font-size: 13px;
    color: var(--text-tertiary);
    margin-bottom: 12px;
    margin-left: 4px;
  }
  
  .danger-hint {
    font-size: 12px;
    color: var(--text-tertiary);
    margin-top: 10px;
    margin-left: 4px;
    opacity: 0.7;
  }
}
</style>
