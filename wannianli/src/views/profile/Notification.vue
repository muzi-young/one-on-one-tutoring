<template>
  <div class="page-container">
    <header class="page-header">
      <button class="back-btn" @click="$router.back()">←</button>
      <h1 class="page-title">消息通知</h1>
      <div class="placeholder"></div>
    </header>
    
    <div class="section">
      <h3 class="section-title">推送通知</h3>
      <div class="settings-card glass-card">
        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">每日运势推送</span>
            <span class="setting-desc">每天早上7点推送当日运势解读</span>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" v-model="settings.dailyFortune" />
            <span class="slider"></span>
          </label>
        </div>
        
        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">周运势总结</span>
            <span class="setting-desc">每周日晚上推送本周运势总结</span>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" v-model="settings.weeklyReport" />
            <span class="slider"></span>
          </label>
        </div>
        
        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">择日提醒</span>
            <span class="setting-desc">在择定日期前一天发送提醒</span>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" v-model="settings.zedayReminder" />
            <span class="slider"></span>
          </label>
        </div>
        
        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">节气提醒</span>
            <span class="setting-desc">在二十四节气当天发送提醒</span>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" v-model="settings.solarTerms" />
            <span class="slider"></span>
          </label>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h3 class="section-title">营销消息</h3>
      <div class="settings-card glass-card">
        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">活动通知</span>
            <span class="setting-desc">接收平台活动和优惠信息</span>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" v-model="settings.promotions" />
            <span class="slider"></span>
          </label>
        </div>
        
        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">新功能推荐</span>
            <span class="setting-desc">接收新功能上线通知</span>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" v-model="settings.newFeatures" />
            <span class="slider"></span>
          </label>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h3 class="section-title">免打扰设置</h3>
      <div class="settings-card glass-card">
        <div class="setting-item">
          <div class="setting-info">
            <span class="setting-label">夜间免打扰</span>
            <span class="setting-desc">22:00 - 08:00 不发送推送</span>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" v-model="settings.nightMode" />
            <span class="slider"></span>
          </label>
        </div>
      </div>
    </div>
    
    <p class="footer-hint">关闭推送后，您可能会错过重要的运势信息提醒</p>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const settings = reactive({
  dailyFortune: true,
  weeklyReport: true,
  zedayReminder: true,
  solarTerms: false,
  promotions: false,
  newFeatures: true,
  nightMode: true
})
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

.section {
  margin-bottom: 24px;
  
  .section-title {
    font-size: 13px;
    color: var(--text-tertiary);
    margin-bottom: 12px;
    margin-left: 4px;
  }
}

.settings-card {
  padding: 0;
  overflow: hidden;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px;
  border-bottom: 1px solid var(--glass-border);
  
  &:last-child { border-bottom: none; }
  
  .setting-info {
    flex: 1;
    margin-right: 16px;
    
    .setting-label {
      font-size: 15px;
      color: var(--text-primary);
      display: block;
      margin-bottom: 4px;
    }
    
    .setting-desc {
      font-size: 12px;
      color: var(--text-tertiary);
    }
  }
}

.toggle-switch {
  position: relative;
  width: 50px;
  height: 28px;
  flex-shrink: 0;
  
  input { display: none; }
  
  .slider {
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.1);
    border-radius: 28px;
    transition: 0.3s;
    cursor: pointer;
    
    &::before {
      content: '';
      position: absolute;
      width: 22px;
      height: 22px;
      left: 3px;
      top: 3px;
      background: #fff;
      border-radius: 50%;
      transition: 0.3s;
    }
  }
  
  input:checked + .slider {
    background: var(--mazu-gold);
    
    &::before {
      transform: translateX(22px);
    }
  }
}

.glass-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
}

.footer-hint {
  font-size: 12px;
  color: var(--text-tertiary);
  text-align: center;
  opacity: 0.7;
}
</style>
