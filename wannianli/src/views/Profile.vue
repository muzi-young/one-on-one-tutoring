<template>
  <div class="profile-page">
    <!-- 用户信息头部 -->
    <div class="profile-header">
      <div class="user-card glass-card">
        <div class="avatar-section">
          <div class="avatar">
            <span>{{ userInfo.nickname.charAt(0) }}</span>
          </div>
          <div class="vip-badge" v-if="userInfo.isVip">VIP</div>
        </div>
        <div class="user-info">
          <h2 class="nickname">{{ userInfo.nickname }}</h2>
          <p class="birth-info">{{ userInfo.birthday }} | {{ userInfo.birthTime }}</p>
          <p class="mingpan-info">
            <span class="tag">肖{{ userInfo.zodiac }}</span>
            <span class="tag">{{ userInfo.riZhu }}日主</span>
            <span class="tag">{{ userInfo.mingPan }}</span>
          </p>
        </div>
        <button class="edit-btn" @click="showEditModal = true">✏️</button>
      </div>
      
      <!-- VIP 状态 -->
      <div class="vip-status glass-card" @click="$router.push('/vip')">
        <div class="vip-info">
          <span class="vip-icon">👑</span>
          <div class="vip-text">
            <span class="vip-title" v-if="userInfo.isVip">VIP会员</span>
            <span class="vip-title" v-else>开通VIP</span>
            <span class="vip-expire" v-if="userInfo.isVip">有效期至：{{ userInfo.vipExpireDate }}</span>
            <span class="vip-expire" v-else>解锁全部高级功能</span>
          </div>
        </div>
        <span class="arrow">→</span>
      </div>
    </div>
    
    <!-- 功能菜单 -->
    <div class="menu-section">
      <h3 class="section-title">我的记录</h3>
      <div class="menu-list glass-card">
        <div class="menu-item" @click="$router.push('/profile/fortune-history')">
          <span class="menu-icon">📅</span>
          <span class="menu-label">我的深度解读记录</span>
          <span class="menu-arrow">→</span>
        </div>
        <div class="menu-item" @click="$router.push('/profile/zeday-history')">
          <span class="menu-icon">🔮</span>
          <span class="menu-label">我的择日记录</span>
          <span class="menu-arrow">→</span>
        </div>
        <div class="menu-item" @click="$router.push('/wallpaper')">
          <span class="menu-icon">🖼️</span>
          <span class="menu-label">我的壁纸</span>
          <span class="menu-arrow">→</span>
        </div>
        <div class="menu-item" @click="$router.push('/profile/checkin')">
          <span class="menu-icon">✅</span>
          <span class="menu-label">签到记录</span>
          <span class="menu-value">连续签到 {{ signDays }} 天</span>
          <span class="menu-arrow">→</span>
        </div>
      </div>
    </div>
    
    <div class="menu-section">
      <h3 class="section-title">设置</h3>
      <div class="menu-list glass-card">
        <div class="menu-item" @click="$router.push('/profile/account-security')">
          <span class="menu-icon">🔒</span>
          <span class="menu-label">账号与安全</span>
          <span class="menu-arrow">→</span>
        </div>
        <div class="menu-item" @click="$router.push('/profile/notification')">
          <span class="menu-icon">🔔</span>
          <span class="menu-label">消息通知</span>
          <span class="menu-arrow">→</span>
        </div>
        <div class="menu-item" @click="$router.push('/profile/language')">
          <span class="menu-icon">🌐</span>
          <span class="menu-label">语言设置</span>
          <span class="menu-value">{{ currentLanguage }}</span>
          <span class="menu-arrow">→</span>
        </div>
      </div>
    </div>
    
    <div class="menu-section">
      <h3 class="section-title">其他</h3>
      <div class="menu-list glass-card">
        <div class="menu-item" @click="$router.push('/profile/feedback')">
          <span class="menu-icon">💬</span>
          <span class="menu-label">问题反馈</span>
          <span class="menu-arrow">→</span>
        </div>
        <div class="menu-item" @click="$router.push('/profile/about')">
          <span class="menu-icon">ℹ️</span>
          <span class="menu-label">关于APP</span>
          <span class="menu-value">v1.0.0</span>
          <span class="menu-arrow">→</span>
        </div>
      </div>
    </div>
    
    <!-- 退出登录 -->
    <button class="logout-btn" @click="handleLogout">退出登录</button>
    
    <!-- 底部声明 -->
    <footer class="footer">
      <p>基于经典国学算法推演建议 · 仅作生活娱乐参考</p>
    </footer>
    
    <!-- 编辑资料弹窗（保留这一个，因为是简单的表单编辑） -->
    <div class="modal-overlay" v-if="showEditModal" @click.self="showEditModal = false">
      <div class="modal-content glass-card">
        <div class="modal-header">
          <h3>编辑资料</h3>
          <button class="close-btn" @click="showEditModal = false">×</button>
        </div>
        <div class="form-content">
          <div class="form-group">
            <label>头像</label>
            <div class="avatar-edit">
              <div class="avatar">{{ userInfo.nickname.charAt(0) }}</div>
              <button class="change-btn">更换</button>
            </div>
          </div>
          <div class="form-group">
            <label>昵称</label>
            <input v-model="editForm.nickname" type="text" class="input-field" />
          </div>
          <div class="form-group disabled">
            <label>出生日期</label>
            <input :value="userInfo.birthday" type="text" class="input-field" disabled />
            <span class="hint">终身绑定，不可修改</span>
          </div>
          <div class="form-group disabled">
            <label>出生时辰</label>
            <input :value="userInfo.birthTime" type="text" class="input-field" disabled />
            <span class="hint">终身绑定，不可修改</span>
          </div>
          <div class="form-group">
            <label>职业</label>
            <input v-model="editForm.profession" type="text" class="input-field" />
          </div>
        </div>
        <button class="btn-gold save-btn" @click="saveProfile">保存修改</button>
      </div>
    </div>
    
    <!-- 底部导航 -->
    <TabBar />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/app'
import TabBar from '@/components/TabBar.vue'

const router = useRouter()
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const signDays = ref(7)
const currentLanguage = ref('简体中文')
const showEditModal = ref(false)

const editForm = reactive({
  nickname: userInfo.value.nickname,
  profession: userInfo.value.profession
})

const saveProfile = () => {
  userInfo.value.nickname = editForm.nickname
  userInfo.value.profession = editForm.profession
  showEditModal.value = false
}

const handleLogout = () => {
  if (confirm('确定要退出登录吗？')) {
    userStore.logout()
    router.push('/')
  }
}
</script>

<style lang="scss" scoped>
.profile-page {
  height: calc(812px - 44px);
  padding: 16px;
  padding-bottom: 100px;
  overflow-y: auto;
  
  &::-webkit-scrollbar { display: none; }
}

.profile-header {
  margin-bottom: 20px;
}

.user-card {
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
  
  .avatar-section {
    position: relative;
    
    .avatar {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--mazu-gold) 0%, var(--mazu-gold-dark) 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: #1a0a2e;
      font-weight: 600;
    }
    
    .vip-badge {
      position: absolute;
      bottom: -4px;
      right: -4px;
      padding: 2px 8px;
      background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%);
      border-radius: 10px;
      font-size: 10px;
      font-weight: 600;
      color: #1a0a2e;
    }
  }
  
  .user-info {
    flex: 1;
    
    .nickname {
      font-size: 18px;
      font-weight: 600;
      color: var(--text-primary);
      margin-bottom: 4px;
    }
    
    .birth-info {
      font-size: 12px;
      color: var(--text-tertiary);
      margin-bottom: 8px;
    }
    
    .mingpan-info {
      display: flex;
      gap: 6px;
      
      .tag {
        padding: 3px 8px;
        background: rgba(212, 175, 55, 0.15);
        border-radius: 10px;
        font-size: 10px;
        color: var(--mazu-gold);
      }
    }
  }
  
  .edit-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    cursor: pointer;
    font-size: 14px;
  }
}

.vip-status {
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  
  .vip-info {
    display: flex;
    align-items: center;
    gap: 12px;
    
    .vip-icon { font-size: 24px; }
    
    .vip-text {
      display: flex;
      flex-direction: column;
      gap: 2px;
      
      .vip-title {
        font-size: 14px;
        font-weight: 500;
        color: var(--mazu-gold);
      }
      
      .vip-expire {
        font-size: 11px;
        color: var(--text-tertiary);
      }
    }
  }
  
  .arrow {
    color: var(--mazu-gold);
    font-size: 16px;
  }
}

.menu-section {
  margin-bottom: 20px;
  
  .section-title {
    font-size: 13px;
    color: var(--text-tertiary);
    margin-bottom: 10px;
    margin-left: 4px;
  }
}

.menu-list {
  padding: 0;
  overflow: hidden;
  
  .menu-item {
    display: flex;
    align-items: center;
    padding: 14px 16px;
    border-bottom: 1px solid var(--glass-border);
    cursor: pointer;
    transition: background 0.2s;
    
    &:last-child { border-bottom: none; }
    &:hover { background: rgba(255, 255, 255, 0.03); }
    
    .menu-icon { font-size: 18px; margin-right: 12px; }
    .menu-label { flex: 1; font-size: 14px; color: var(--text-primary); }
    .menu-value { font-size: 12px; color: var(--text-tertiary); margin-right: 8px; }
    .menu-arrow { color: var(--text-tertiary); font-size: 14px; }
  }
}

.logout-btn {
  width: 100%;
  padding: 14px;
  background: rgba(248, 113, 113, 0.1);
  border: 1px solid rgba(248, 113, 113, 0.3);
  border-radius: 12px;
  color: #f87171;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
}

.footer {
  padding: 20px;
  text-align: center;
  
  p {
    font-size: 10px;
    color: var(--text-tertiary);
    opacity: 0.6;
  }
}

// 编辑资料弹窗样式
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
  
  .modal-content {
    width: 100%;
    max-width: 340px;
    padding: 20px;
    max-height: 80vh;
    overflow-y: auto;
    
    &::-webkit-scrollbar { display: none; }
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      
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
  }
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  .form-group {
    label {
      font-size: 13px;
      color: var(--text-secondary);
      display: block;
      margin-bottom: 8px;
    }
    
    &.disabled {
      .input-field { opacity: 0.5; cursor: not-allowed; }
      .hint { font-size: 11px; color: var(--mazu-gold); display: block; margin-top: 4px; }
    }
  }
  
  .avatar-edit {
    display: flex;
    align-items: center;
    gap: 16px;
    
    .avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: var(--mazu-gold);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: #1a0a2e;
    }
    
    .change-btn {
      padding: 8px 16px;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: 8px;
      color: var(--text-secondary);
      font-size: 13px;
      cursor: pointer;
    }
  }
}

.save-btn {
  width: 100%;
  margin-top: 20px;
}
</style>
