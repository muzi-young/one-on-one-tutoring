<template>
  <div class="page-container">
    <header class="page-header">
      <button class="back-btn" @click="$router.back()">←</button>
      <h1 class="page-title">修改密码</h1>
      <div class="placeholder"></div>
    </header>
    
    <div class="form-section">
      <div class="form-group">
        <label>当前密码</label>
        <div class="input-wrap">
          <input 
            v-model="form.oldPassword" 
            :type="showOld ? 'text' : 'password'" 
            class="input-field" 
            placeholder="请输入当前密码" 
          />
          <button class="eye-btn" @click="showOld = !showOld">
            {{ showOld ? '👁️' : '👁️‍🗨️' }}
          </button>
        </div>
      </div>
      
      <div class="form-group">
        <label>新密码</label>
        <div class="input-wrap">
          <input 
            v-model="form.newPassword" 
            :type="showNew ? 'text' : 'password'" 
            class="input-field" 
            placeholder="请输入新密码（6-20位）" 
          />
          <button class="eye-btn" @click="showNew = !showNew">
            {{ showNew ? '👁️' : '👁️‍🗨️' }}
          </button>
        </div>
        <div class="password-strength" v-if="form.newPassword">
          <div class="strength-bar">
            <div class="strength-fill" :style="{ width: strengthPercent + '%', background: strengthColor }"></div>
          </div>
          <span class="strength-text" :style="{ color: strengthColor }">{{ strengthText }}</span>
        </div>
      </div>
      
      <div class="form-group">
        <label>确认新密码</label>
        <div class="input-wrap">
          <input 
            v-model="form.confirmPassword" 
            :type="showConfirm ? 'text' : 'password'" 
            class="input-field" 
            placeholder="请再次输入新密码" 
          />
          <button class="eye-btn" @click="showConfirm = !showConfirm">
            {{ showConfirm ? '👁️' : '👁️‍🗨️' }}
          </button>
        </div>
        <span class="match-hint" v-if="form.confirmPassword && !passwordMatch">
          两次输入的密码不一致
        </span>
      </div>
    </div>
    
    <div class="tips-section">
      <h4>密码要求</h4>
      <ul>
        <li :class="{ valid: form.newPassword.length >= 6 }">密码长度至少6位</li>
        <li :class="{ valid: /[A-Za-z]/.test(form.newPassword) }">包含字母</li>
        <li :class="{ valid: /[0-9]/.test(form.newPassword) }">包含数字</li>
      </ul>
    </div>
    
    <button class="btn-gold submit-btn" :disabled="!canSubmit" @click="changePassword">
      确认修改
    </button>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const showOld = ref(false)
const showNew = ref(false)
const showConfirm = ref(false)

const passwordMatch = computed(() => form.newPassword === form.confirmPassword)

const strengthPercent = computed(() => {
  let score = 0
  if (form.newPassword.length >= 6) score += 30
  if (form.newPassword.length >= 10) score += 20
  if (/[A-Za-z]/.test(form.newPassword)) score += 25
  if (/[0-9]/.test(form.newPassword)) score += 25
  return score
})

const strengthText = computed(() => {
  if (strengthPercent.value < 50) return '弱'
  if (strengthPercent.value < 80) return '中'
  return '强'
})

const strengthColor = computed(() => {
  if (strengthPercent.value < 50) return '#f87171'
  if (strengthPercent.value < 80) return '#fbbf24'
  return '#4ade80'
})

const canSubmit = computed(() => {
  return form.oldPassword && 
         form.newPassword.length >= 6 && 
         passwordMatch.value
})

const changePassword = () => {
  if (!form.oldPassword) {
    alert('请输入当前密码')
    return
  }
  if (form.newPassword.length < 6) {
    alert('新密码至少6位')
    return
  }
  if (!passwordMatch.value) {
    alert('两次输入的密码不一致')
    return
  }
  
  alert('密码修改成功！')
  router.back()
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

.form-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
}

.form-group {
  label {
    font-size: 14px;
    color: var(--text-secondary);
    display: block;
    margin-bottom: 10px;
  }
  
  .input-wrap {
    position: relative;
    
    .input-field {
      width: 100%;
      padding-right: 48px;
    }
    
    .eye-btn {
      position: absolute;
      right: 14px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      font-size: 18px;
    }
  }
  
  .password-strength {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
    
    .strength-bar {
      flex: 1;
      height: 4px;
      background: rgba(255,255,255,0.1);
      border-radius: 2px;
      overflow: hidden;
      
      .strength-fill {
        height: 100%;
        transition: all 0.3s;
      }
    }
    
    .strength-text {
      font-size: 12px;
    }
  }
  
  .match-hint {
    font-size: 12px;
    color: #f87171;
    margin-top: 8px;
    display: block;
  }
}

.tips-section {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 14px;
  padding: 16px;
  margin-bottom: 24px;
  
  h4 {
    font-size: 13px;
    color: var(--text-primary);
    margin-bottom: 12px;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      font-size: 13px;
      color: var(--text-tertiary);
      padding: 6px 0;
      padding-left: 24px;
      position: relative;
      
      &::before {
        content: '○';
        position: absolute;
        left: 0;
        color: var(--text-tertiary);
      }
      
      &.valid {
        color: #4ade80;
        
        &::before {
          content: '✓';
          color: #4ade80;
        }
      }
    }
  }
}

.submit-btn {
  width: 100%;
  padding: 16px;
  font-size: 16px;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style>
