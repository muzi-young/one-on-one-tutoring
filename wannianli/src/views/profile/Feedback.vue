<template>
  <div class="page-container">
    <header class="page-header">
      <button class="back-btn" @click="$router.back()">←</button>
      <h1 class="page-title">问题反馈</h1>
      <div class="placeholder"></div>
    </header>
    
    <div class="form-section">
      <div class="form-group">
        <label>反馈类型</label>
        <div class="type-grid">
          <button 
            v-for="type in feedbackTypes" 
            :key="type.value"
            class="type-btn"
            :class="{ active: form.type === type.value }"
            @click="form.type = type.value"
          >
            <span class="type-icon">{{ type.icon }}</span>
            <span class="type-label">{{ type.label }}</span>
          </button>
        </div>
      </div>
      
      <div class="form-group">
        <label>问题描述 <span class="required">*</span></label>
        <textarea 
          v-model="form.content" 
          class="input-field textarea"
          placeholder="请详细描述您遇到的问题或建议，我们会认真处理..."
          rows="6"
          maxlength="500"
        ></textarea>
        <span class="char-count">{{ form.content.length }}/500</span>
      </div>
      
      <div class="form-group">
        <label>上传截图（选填）</label>
        <div class="image-upload">
          <div 
            v-for="(img, idx) in form.images" 
            :key="idx" 
            class="image-item"
          >
            <img :src="img" />
            <button class="remove-btn" @click="removeImage(idx)">×</button>
          </div>
          <button v-if="form.images.length < 3" class="add-btn" @click="addImage">
            <span class="icon">+</span>
            <span class="text">添加图片</span>
          </button>
        </div>
      </div>
      
      <div class="form-group">
        <label>联系方式（选填）</label>
        <input 
          v-model="form.contact" 
          type="text" 
          class="input-field" 
          placeholder="手机号或邮箱，方便我们联系您" 
        />
      </div>
    </div>
    
    <button class="btn-gold submit-btn" :disabled="!canSubmit" @click="submitFeedback">
      提交反馈
    </button>
    
    <div class="contact-info">
      <p>您也可以通过以下方式联系我们：</p>
      <p class="email">客服邮箱：support@mazu.com</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  type: 'bug',
  content: '',
  images: [],
  contact: ''
})

const feedbackTypes = [
  { value: 'bug', label: '功能异常', icon: '🐛' },
  { value: 'suggest', label: '功能建议', icon: '💡' },
  { value: 'content', label: '内容问题', icon: '📝' },
  { value: 'other', label: '其他问题', icon: '❓' }
]

const canSubmit = computed(() => form.content.trim().length >= 10)

const addImage = () => {
  const mockImage = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"%3E%3Crect fill="%23333" width="100" height="100"/%3E%3Ctext x="50" y="55" text-anchor="middle" fill="%23666" font-size="12"%3E截图%3C/text%3E%3C/svg%3E'
  form.images.push(mockImage)
}

const removeImage = (idx) => {
  form.images.splice(idx, 1)
}

const submitFeedback = () => {
  if (form.content.trim().length < 10) {
    alert('请填写至少10个字的问题描述')
    return
  }
  
  alert('感谢您的反馈！我们会尽快处理并给您回复。')
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
  gap: 24px;
  margin-bottom: 24px;
}

.form-group {
  label {
    font-size: 14px;
    color: var(--text-secondary);
    display: block;
    margin-bottom: 12px;
    
    .required { color: #f87171; }
  }
  
  .textarea {
    resize: none;
    min-height: 140px;
  }
  
  .char-count {
    font-size: 12px;
    color: var(--text-tertiary);
    text-align: right;
    display: block;
    margin-top: 6px;
  }
}

.type-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  
  .type-btn {
    padding: 16px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 14px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
    
    .type-icon { font-size: 24px; }
    .type-label { font-size: 13px; color: var(--text-secondary); }
    
    &.active {
      border-color: var(--mazu-gold);
      background: rgba(212, 175, 55, 0.1);
      
      .type-label { color: var(--mazu-gold); }
    }
  }
}

.image-upload {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  
  .image-item {
    width: 80px;
    height: 80px;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .remove-btn {
      position: absolute;
      top: 4px;
      right: 4px;
      width: 20px;
      height: 20px;
      background: rgba(0,0,0,0.6);
      border: none;
      border-radius: 50%;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  
  .add-btn {
    width: 80px;
    height: 80px;
    background: var(--glass-bg);
    border: 1px dashed var(--glass-border);
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    transition: border-color 0.2s;
    
    &:hover {
      border-color: var(--mazu-gold);
    }
    
    .icon {
      font-size: 24px;
      color: var(--text-tertiary);
    }
    
    .text {
      font-size: 10px;
      color: var(--text-tertiary);
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

.contact-info {
  margin-top: 24px;
  text-align: center;
  
  p {
    font-size: 12px;
    color: var(--text-tertiary);
    margin-bottom: 6px;
  }
  
  .email {
    color: var(--mazu-gold);
  }
}
</style>
