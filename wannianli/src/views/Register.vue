<template>
  <div class="register-page">
    <!-- 返回按钮 -->
    <button class="back-btn" @click="goBack">
      <span>←</span>
    </button>
    
    <!-- 头部 -->
    <div class="header">
      <MazuAvatar size="small" :glow="true" />
      <span class="brand">MAZU 妈祖</span>
      <span class="subtitle">{{ stepTitles[currentStep - 1] }}</span>
    </div>
    
    <!-- 进度条 -->
    <div class="progress-bar">
      <div class="progress-track">
        <div class="progress-fill" :style="{ width: `${(currentStep / 4) * 100}%` }"></div>
      </div>
      <div class="step-dots">
        <span 
          v-for="i in 4" 
          :key="i" 
          class="dot"
          :class="{ active: i === currentStep, completed: i < currentStep }"
        >{{ i }}</span>
      </div>
      <span class="step-indicator">{{ currentStep }}/4</span>
    </div>
    
    <!-- Step 1: 手机验证 -->
    <div v-if="currentStep === 1" class="step-content">
      <p class="step-desc">完成注册验证，获得【妈祖】的随时陪伴</p>
      
      <div class="form-group">
        <div class="input-group">
          <label>手机号码</label>
          <div class="input-wrapper">
            <span class="prefix">+86</span>
            <input 
              v-model="form.phone" 
              type="tel" 
              class="input-field"
              placeholder="请输入手机号码"
              maxlength="11"
            />
          </div>
        </div>
        
        <div class="input-group">
          <label>验证码</label>
          <div class="input-wrapper with-btn">
            <input 
              v-model="form.verifyCode" 
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
        
        <div class="input-group">
          <label>设置密码</label>
          <input 
            v-model="form.password" 
            type="password" 
            class="input-field"
            placeholder="请设定您的4-6位登录密码"
            maxlength="6"
          />
        </div>
      </div>
      
      <!-- 协议 -->
      <div class="agreement">
        <label class="checkbox-wrapper">
          <input type="checkbox" v-model="agreed" />
          <span class="checkmark"></span>
          <span class="text">
            我已阅读并同意
            <a href="#">《用户隐私保护及免责须知》</a>
          </span>
        </label>
      </div>
    </div>
    
    <!-- Step 2: 基本信息 -->
    <div v-if="currentStep === 2" class="step-content">
      <p class="step-desc">输入生辰信息，获得妈祖【个人命盘+天运】的完整指导</p>
      
      <div class="form-group">
        <div class="input-group">
          <label>昵称</label>
          <input 
            v-model="form.nickname" 
            type="text" 
            class="input-field"
            placeholder="请输入用户名"
          />
        </div>
        
        <div class="input-group">
          <label>性别</label>
          <div class="gender-select">
            <button 
              v-for="g in genders"
              :key="g.value"
              class="gender-btn"
              :class="{ active: form.gender === g.value }"
              @click="form.gender = g.value"
            >
              <span class="gender-icon">{{ g.icon }}</span>
              <span>{{ g.label }}</span>
            </button>
          </div>
        </div>
        
        <div class="input-group">
          <label>历法类型</label>
          <div class="calendar-select">
            <button 
              v-for="c in calendarTypes"
              :key="c.value"
              class="calendar-btn"
              :class="{ active: form.calendarType === c.value }"
              @click="form.calendarType = c.value"
            >
              <span class="cal-icon">{{ c.icon }}</span>
              <span>{{ c.label }}</span>
            </button>
          </div>
        </div>
        
        <div class="input-group">
          <label>出生日期</label>
          <div class="date-select">
            <select v-model="form.birthYear" class="select-field">
              <option value="">年</option>
              <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
            </select>
            <select v-model="form.birthMonth" class="select-field">
              <option value="">月</option>
              <option v-for="m in 12" :key="m" :value="m">{{ m }}</option>
            </select>
            <select v-model="form.birthDay" class="select-field">
              <option value="">日</option>
              <option v-for="d in 31" :key="d" :value="d">{{ d }}</option>
            </select>
          </div>
        </div>
        
        <div class="input-group">
          <label>出生城市</label>
          <input 
            v-model="form.birthCity" 
            type="text" 
            class="input-field"
            placeholder="请选择出生城市"
          />
        </div>
      </div>
    </div>
    
    <!-- Step 3: 出生时辰 -->
    <div v-if="currentStep === 3" class="step-content">
      <p class="step-desc">请选择您的出生时辰</p>
      
      <div class="shichen-grid">
        <button 
          class="shichen-btn unknown"
          :class="{ active: form.birthShichen === 'unknown' }"
          @click="form.birthShichen = 'unknown'"
        >
          <span>不清楚（系统推算）</span>
        </button>
        
        <button 
          v-for="sc in shichen"
          :key="sc.name"
          class="shichen-btn"
          :class="{ active: form.birthShichen === sc.name }"
          @click="form.birthShichen = sc.name"
        >
          <span class="sc-name">{{ sc.name }}</span>
          <span class="sc-time">{{ sc.time }}</span>
        </button>
      </div>
      
      <!-- 命盘预览 -->
      <div class="mingpan-preview" v-if="form.birthShichen">
        <div class="preview-card glass-card">
          <p class="preview-text">
            <span class="highlight">你属{{ previewZodiac }}</span>，
            <span class="highlight">日主{{ previewRizhu }}</span>
          </p>
        </div>
      </div>
    </div>
    
    <!-- Step 4: 兴趣偏好 -->
    <div v-if="currentStep === 4" class="step-content">
      <p class="step-desc">最后一步！完善个人标签·获得针对你的场景化建议</p>
      
      <div class="preference-section">
        <h4>职业/身份</h4>
        <div class="tag-grid">
          <button 
            v-for="job in professions"
            :key="job"
            class="tag-btn"
            :class="{ active: form.profession === job }"
            @click="form.profession = job"
          >{{ job }}</button>
        </div>
      </div>
      
      <div class="preference-section">
        <h4>行业方向</h4>
        <div class="tag-grid">
          <button 
            v-for="ind in industries"
            :key="ind"
            class="tag-btn"
            :class="{ active: form.industry === ind }"
            @click="form.industry = ind"
          >{{ ind }}</button>
        </div>
      </div>
      
      <div class="preference-section">
        <h4>兴趣爱好 <span class="hint">（可多选）</span></h4>
        <div class="tag-grid">
          <button 
            v-for="int in interests"
            :key="int"
            class="tag-btn"
            :class="{ active: form.interests.includes(int) }"
            @click="toggleInterest(int)"
          >{{ int }}</button>
        </div>
      </div>
    </div>
    
    <!-- 底部按钮 -->
    <div class="bottom-action">
      <button class="btn-gold next-btn" @click="nextStep">
        {{ currentStep === 4 ? '注册完成' : '下一步' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import MazuAvatar from '@/components/MazuAvatar.vue'
import { useUserStore } from '@/stores/app'

const router = useRouter()
const userStore = useUserStore()

const currentStep = ref(1)
const stepTitles = ['注册账号', '基本信息', '出生时辰', '兴趣偏好']
const agreed = ref(false)
const countdown = ref(0)

const form = ref({
  phone: '',
  verifyCode: '',
  password: '',
  nickname: '',
  gender: '',
  calendarType: 'solar',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  birthCity: '',
  birthShichen: '',
  profession: '',
  industry: '',
  interests: []
})

const genders = [
  { value: 'male', label: '男', icon: '♂' },
  { value: 'female', label: '女', icon: '♀' }
]

const calendarTypes = [
  { value: 'solar', label: '阳历', icon: '☀' },
  { value: 'lunar', label: '阴历', icon: '☽' }
]

const years = computed(() => {
  const arr = []
  for (let y = 2024; y >= 1940; y--) {
    arr.push(y)
  }
  return arr
})

const shichen = [
  { name: '子时', time: '23:00-01:00' },
  { name: '丑时', time: '01:00-03:00' },
  { name: '寅时', time: '03:00-05:00' },
  { name: '卯时', time: '05:00-07:00' },
  { name: '辰时', time: '07:00-09:00' },
  { name: '巳时', time: '09:00-11:00' },
  { name: '午时', time: '11:00-13:00' },
  { name: '未时', time: '13:00-15:00' },
  { name: '申时', time: '15:00-17:00' },
  { name: '酉时', time: '17:00-19:00' },
  { name: '戌时', time: '19:00-21:00' },
  { name: '亥时', time: '21:00-23:00' }
]

const professions = [
  '企业高管', '政府/公务员', '公司职员', '自由职业者',
  '创业者', '学生', '研究学者', '退休', '择业探索者'
]

const industries = [
  '科技/互联网', 'AI/科技创新', '金融/商业', '教育/学术',
  '医疗/健康', '生产制造', '市场营销', '娱乐演出', '其他'
]

const interests = [
  '商业财经', '健康养生', '人文历史', '体育/健身',
  '休闲娱乐', '音乐/艺术', '摄影/旅行', '个人成长'
]

const previewZodiac = computed(() => '虎')
const previewRizhu = computed(() => '壬水')

const goBack = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  } else {
    router.back()
  }
}

const sendCode = () => {
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

const toggleInterest = (int) => {
  const idx = form.value.interests.indexOf(int)
  if (idx > -1) {
    form.value.interests.splice(idx, 1)
  } else {
    form.value.interests.push(int)
  }
}

const nextStep = () => {
  if (currentStep.value < 4) {
    currentStep.value++
  } else {
    userStore.login(form.value)
    router.push('/home')
  }
}
</script>

<style lang="scss" scoped>
.register-page {
  height: calc(812px - 44px);
  padding: 16px 24px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.back-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  color: var(--text-primary);
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 16px;
  
  .brand {
    font-size: 14px;
    font-weight: 600;
    color: var(--mazu-gold);
  }
  
  .subtitle {
    font-size: 13px;
    color: var(--text-secondary);
    margin-left: auto;
  }
}

.progress-bar {
  margin-top: 20px;
  position: relative;
  
  .progress-track {
    height: 3px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    overflow: hidden;
    
    .progress-fill {
      height: 100%;
      background: var(--mazu-gold);
      transition: width 0.3s ease;
    }
  }
  
  .step-dots {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
    
    .dot {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.1);
      color: var(--text-tertiary);
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &.active {
        background: var(--mazu-gold);
        color: #1a0a2e;
      }
      
      &.completed {
        background: rgba(212, 175, 55, 0.3);
        color: var(--mazu-gold);
      }
    }
  }
  
  .step-indicator {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 12px;
    color: var(--text-tertiary);
  }
}

.step-content {
  flex: 1;
  margin-top: 24px;
  overflow-y: auto;
  
  .step-desc {
    font-size: 13px;
    color: var(--text-secondary);
    margin-bottom: 20px;
    line-height: 1.6;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
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
  
  &.with-btn .input-field {
    padding-right: 100px;
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

.gender-select, .calendar-select {
  display: flex;
  gap: 12px;
}

.gender-btn, .calendar-btn {
  flex: 1;
  padding: 12px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 12px;
  color: var(--text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s;
  
  .gender-icon, .cal-icon {
    font-size: 18px;
  }
  
  &.active {
    border-color: var(--mazu-gold);
    background: rgba(212, 175, 55, 0.1);
    color: var(--mazu-gold);
  }
}

.date-select {
  display: flex;
  gap: 8px;
}

.select-field {
  flex: 1;
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: var(--text-primary);
  font-size: 14px;
  outline: none;
  
  option {
    background: #1a0a2e;
  }
}

.shichen-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  
  .shichen-btn {
    padding: 12px 8px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    color: var(--text-secondary);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    transition: all 0.2s;
    
    &.unknown {
      grid-column: span 3;
      flex-direction: row;
      justify-content: center;
    }
    
    .sc-name {
      font-size: 14px;
      font-weight: 500;
    }
    
    .sc-time {
      font-size: 10px;
      color: var(--text-tertiary);
    }
    
    &.active {
      border-color: var(--mazu-gold);
      background: rgba(212, 175, 55, 0.1);
      color: var(--mazu-gold);
    }
  }
}

.mingpan-preview {
  margin-top: 20px;
  
  .preview-card {
    padding: 16px;
    text-align: center;
    
    .preview-text {
      font-size: 14px;
      color: var(--text-secondary);
      
      .highlight {
        color: var(--mazu-gold);
        font-weight: 500;
      }
    }
  }
}

.preference-section {
  margin-bottom: 20px;
  
  h4 {
    font-size: 14px;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 12px;
    
    .hint {
      font-size: 12px;
      color: var(--text-tertiary);
      font-weight: 400;
    }
  }
}

.tag-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-btn {
  padding: 8px 14px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  color: var(--text-secondary);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  
  &.active {
    border-color: var(--mazu-gold);
    background: rgba(212, 175, 55, 0.15);
    color: var(--mazu-gold);
  }
}

.agreement {
  margin-top: 16px;
  
  .checkbox-wrapper {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    font-size: 12px;
    color: var(--text-tertiary);
    cursor: pointer;
    
    input { display: none; }
    
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
      
      &::after { opacity: 1; }
    }
    
    .text a {
      color: var(--mazu-gold);
    }
  }
}

.bottom-action {
  padding: 16px 0;
  margin-top: auto;
  flex-shrink: 0;
  
  .next-btn {
    width: 100%;
  }
}
</style>
