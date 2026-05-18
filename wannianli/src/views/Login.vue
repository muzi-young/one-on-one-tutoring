<template>
  <div class="login-page">
    <!-- 返回按钮 -->
    <button class="back-btn" @click="goBack">
      <span>←</span>
    </button>
    
    <!-- 头部 -->
    <div class="header">
      <MazuAvatar size="medium" :glow="true" />
      <div class="header-text">
        <span class="brand">MAZU 妈祖</span>
        <span class="subtitle">登录您的账号</span>
      </div>
    </div>
    
    <!-- 登录表单 -->
    <div class="form-section">
      <!-- 切换登录方式 -->
      <div class="login-tabs">
        <button 
          v-for="tab in loginTabs" 
          :key="tab.key"
          class="tab-btn"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>
      
      <!-- 手机号登录 -->
      <div v-if="activeTab === 'phone'" class="form-content">
        <div class="input-group">
          <label>手机号</label>
          <div class="input-wrapper">
            <span class="prefix">+86</span>
            <input 
              v-model="phone" 
              type="tel" 
              class="input-field"
              placeholder="请输入手机号"
              maxlength="11"
            />
          </div>
        </div>
        
        <div class="input-group">
          <label>验证码</label>
          <div class="input-wrapper with-btn">
            <input 
              v-model="verifyCode" 
              type="text" 
              class="input-field"
              placeholder="请输入验证码"
              maxlength="6"
            />
            <button 
              class="code-btn"
              :disabled="countdown > 0"
              @click="sendCode"
            >
              {{ countdown > 0 ? `${countdown}s` : '发送验证码' }}
            </button>
          </div>
        </div>
      </div>
      
      <!-- 密码登录 -->
      <div v-else class="form-content">
        <div class="input-group">
          <label>手机号/邮箱</label>
          <input 
            v-model="account" 
            type="text" 
            class="input-field"
            placeholder="请输入手机号或邮箱"
          />
        </div>
        
        <div class="input-group">
          <label>密码</label>
          <div class="input-wrapper">
            <input 
              v-model="password" 
              :type="showPassword ? 'text' : 'password'" 
              class="input-field"
              placeholder="请输入密码"
            />
            <button class="eye-btn" @click="showPassword = !showPassword">
              {{ showPassword ? '👁️' : '👁️‍🗨️' }}
            </button>
          </div>
        </div>
        
        <div class="forgot-link">
          <a href="#" class="text-link">忘记密码？</a>
        </div>
      </div>
      
      <!-- 登录按钮 -->
      <button class="btn-gold login-btn" @click="handleLogin">
        登录
      </button>
      
      <!-- 注册入口 -->
      <div class="register-entry">
        <span>还没有账号？</span>
        <router-link to="/register" class="text-link gold">立即注册</router-link>
      </div>
    </div>
    
    <!-- 协议 -->
    <div class="agreement">
      <label class="checkbox-wrapper">
        <input type="checkbox" v-model="agreed" />
        <span class="checkmark"></span>
        <span class="text">
          登录即表示同意
          <a href="#">《用户协议》</a>
          和
          <a href="#">《隐私政策》</a>
        </span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MazuAvatar from '@/components/MazuAvatar.vue'
import { useUserStore } from '@/stores/app'

const router = useRouter()
const userStore = useUserStore()

const activeTab = ref('phone')
const loginTabs = [
  { key: 'phone', label: '验证码登录' },
  { key: 'password', label: '密码登录' }
]

const phone = ref('')
const verifyCode = ref('')
const account = ref('')
const password = ref('')
const showPassword = ref(false)
const agreed = ref(true)
const countdown = ref(0)

const goBack = () => {
  router.back()
}

const sendCode = () => {
  if (!phone.value || phone.value.length !== 11) {
    alert('请输入正确的手机号')
    return
  }
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

const handleLogin = () => {
  if (!agreed.value) {
    alert('请先同意用户协议和隐私政策')
    return
  }
  
  userStore.login({})
  router.push('/home')
}
</script>

<style lang="scss" scoped>
.login-page {
  height: calc(812px - 44px);
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
}

.back-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--text-primary);
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  
  .header-text {
    display: flex;
    flex-direction: column;
    gap: 4px;
    
    .brand {
      font-size: 18px;
      font-weight: 600;
      color: var(--mazu-gold);
    }
    
    .subtitle {
      font-size: 14px;
      color: var(--text-secondary);
    }
  }
}

.form-section {
  margin-top: 32px;
  flex: 1;
}

.login-tabs {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  
  .tab-btn {
    background: none;
    border: none;
    color: var(--text-tertiary);
    font-size: 15px;
    padding: 8px 0;
    cursor: pointer;
    position: relative;
    
    &.active {
      color: var(--text-primary);
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background: var(--mazu-gold);
        border-radius: 2px;
      }
    }
  }
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  label {
    font-size: 13px;
    color: var(--text-secondary);
  }
}

.input-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  
  .prefix {
    position: absolute;
    left: 16px;
    color: var(--text-secondary);
    font-size: 14px;
  }
  
  .input-field {
    padding-left: 56px;
  }
  
  &.with-btn {
    .input-field {
      padding-right: 100px;
    }
  }
  
  .eye-btn {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
  }
}

.code-btn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: var(--mazu-gold);
  font-size: 13px;
  cursor: pointer;
  
  &:disabled {
    color: var(--text-tertiary);
  }
}

.forgot-link {
  text-align: right;
  margin-top: -8px;
}

.login-btn {
  width: 100%;
  margin-top: 32px;
}

.register-entry {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: var(--text-tertiary);
  
  .gold {
    color: var(--mazu-gold);
    margin-left: 4px;
  }
}

.agreement {
  margin-top: auto;
  padding-bottom: 20px;
  
  .checkbox-wrapper {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 12px;
    color: var(--text-tertiary);
    cursor: pointer;
    
    input {
      display: none;
    }
    
    .checkmark {
      width: 16px;
      height: 16px;
      border: 1px solid var(--glass-border);
      border-radius: 4px;
      flex-shrink: 0;
      position: relative;
      
      &::after {
        content: '✓';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 10px;
        color: var(--mazu-gold);
        opacity: 0;
      }
    }
    
    input:checked + .checkmark {
      background: rgba(212, 175, 55, 0.2);
      border-color: var(--mazu-gold);
      
      &::after {
        opacity: 1;
      }
    }
    
    .text a {
      color: var(--mazu-gold);
    }
  }
}
</style>
