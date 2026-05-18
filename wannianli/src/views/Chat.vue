<template>
  <div class="chat-page">
    <!-- 头部 -->
    <header class="page-header">
      <button class="back-btn" @click="$router.back()">←</button>
      <div class="header-center">
        <MazuAvatar size="small" />
        <span class="title">妈祖陪伴</span>
      </div>
      <button class="history-btn" @click="showHistory = true">📋</button>
    </header>
    
    <!-- 聊天区域 -->
    <div class="chat-area" ref="chatArea">
      <!-- 欢迎消息 -->
      <div class="message system">
        <div class="message-content glass-card">
          <MazuAvatar size="small" />
          <div class="message-text">
            <p class="greeting">Hi！{{ userInfo.nickname }}</p>
            <p class="intro">今天有什么能帮到你？</p>
            <p class="desc">我可以基于个人命盘和天时的干支信息，为你提供生活·工作·情感的陪伴和个性化建议</p>
          </div>
        </div>
      </div>
      
      <!-- 快捷问题 -->
      <div class="quick-questions" v-if="messages.length === 0">
        <p class="hint">你可以这样问我：</p>
        <div class="question-list">
          <button 
            v-for="q in quickQuestions" 
            :key="q"
            class="question-btn"
            @click="sendQuickQuestion(q)"
          >{{ q }}</button>
        </div>
      </div>
      
      <!-- 消息列表 -->
      <div 
        v-for="(msg, idx) in messages" 
        :key="idx"
        class="message"
        :class="msg.type"
      >
        <MazuAvatar v-if="msg.type === 'assistant'" size="small" class="msg-avatar" />
        <div class="message-content" :class="{ 'glass-card': msg.type === 'assistant' }">
          <p v-html="msg.content"></p>
          <!-- 图片消息 -->
          <img v-if="msg.image" :src="msg.image" class="msg-image" />
        </div>
        <div v-if="msg.type === 'user'" class="user-avatar">
          {{ userInfo.nickname.charAt(0) }}
        </div>
      </div>
      
      <!-- 打字中状态 -->
      <div class="message assistant typing" v-if="isTyping">
        <MazuAvatar size="small" class="msg-avatar" />
        <div class="message-content glass-card">
          <div class="typing-indicator">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 输入区域 -->
    <div class="input-area">
      <div class="input-wrapper">
        <button class="attach-btn" @click="showAttachMenu = !showAttachMenu">+</button>
        <input 
          v-model="inputText"
          type="text"
          class="chat-input"
          placeholder="输入你想问的问题..."
          @keyup.enter="sendMessage"
        />
        <button 
          class="voice-btn"
          :class="{ recording: isRecording }"
          @click="toggleVoice"
        >🎤</button>
        <button class="send-btn" @click="sendMessage" :disabled="!inputText.trim()">
          发送
        </button>
      </div>
      
      <!-- 附件菜单 -->
      <div class="attach-menu glass-card" v-if="showAttachMenu">
        <button class="attach-item" @click="selectImage">
          <span class="icon">🖼️</span>
          <span class="label">图片</span>
        </button>
        <button class="attach-item" @click="takePhoto">
          <span class="icon">📷</span>
          <span class="label">拍照</span>
        </button>
      </div>
      
      <!-- 录音状态 -->
      <div class="recording-overlay" v-if="isRecording">
        <div class="recording-content">
          <div class="wave-animation">
            <span v-for="i in 5" :key="i"></span>
          </div>
          <p>语音输入中...请开始对话</p>
          <button class="stop-btn" @click="stopRecording">停止</button>
        </div>
      </div>
    </div>
    
    <!-- 历史记录弹窗 -->
    <div class="history-modal" v-if="showHistory" @click.self="showHistory = false">
      <div class="modal-content glass-card">
        <div class="modal-header">
          <h3>陪伴记录</h3>
          <button class="close-btn" @click="showHistory = false">×</button>
        </div>
        <div class="history-list">
          <div v-for="record in chatHistory" :key="record.id" class="history-item">
            <p class="record-preview">{{ record.preview }}</p>
            <span class="record-time">{{ record.time }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 底部声明 -->
    <p class="disclaimer">基于经典国学算法推演建议 · 仅作个人生活娱乐参考</p>
    
    <!-- 底部导航 -->
    <TabBar />
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/app'
import MazuAvatar from '@/components/MazuAvatar.vue'
import TabBar from '@/components/TabBar.vue'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const chatArea = ref(null)
const inputText = ref('')
const messages = ref([])
const isTyping = ref(false)
const isRecording = ref(false)
const showAttachMenu = ref(false)
const showHistory = ref(false)

const quickQuestions = [
  '我适合养绿萝么...',
  '今天几点签约，对我会比较有利...',
  '帮我看看这条裙子适合今天穿吗...',
  '今天下午几点适合谈加薪？'
]

const chatHistory = ref([
  { id: 1, preview: '关于今天穿搭的建议...', time: '2026-04-19 14:30' },
  { id: 2, preview: '签约时间的咨询...', time: '2026-04-18 10:15' }
])

const scrollToBottom = () => {
  nextTick(() => {
    if (chatArea.value) {
      chatArea.value.scrollTop = chatArea.value.scrollHeight
    }
  })
}

const sendMessage = () => {
  if (!inputText.value.trim()) return
  
  messages.value.push({
    type: 'user',
    content: inputText.value
  })
  
  const userQuestion = inputText.value
  inputText.value = ''
  showAttachMenu.value = false
  scrollToBottom()
  
  isTyping.value = true
  
  setTimeout(() => {
    isTyping.value = false
    messages.value.push({
      type: 'assistant',
      content: generateResponse(userQuestion)
    })
    scrollToBottom()
  }, 1500)
}

const sendQuickQuestion = (question) => {
  inputText.value = question
  sendMessage()
}

const generateResponse = (question) => {
  if (question.includes('绿萝')) {
    return `根据你的命盘分析，你五行喜木，整个月又是火旺之年，在家里多放一些阔叶绿植确实会有助你的事业平衡。<br><br>绿萝属木，非常适合你养护。建议放在家中的东方或东南方向，这样更能发挥木的生发之力。`
  } else if (question.includes('签约')) {
    return `今天对你来说，<strong style="color: #D4AF37">【辰时】07:00-09:00</strong> 是最适合签约的时段。<br><br>辰时又逢你的命盘比肩，金又是你的喜神，适合做重要的商务决策。如果这个时间不方便，<strong style="color: #D4AF37">【未时】13:00-15:00</strong> 也是不错的选择。`
  } else if (question.includes('裙子') || question.includes('穿')) {
    return `我觉得特别合适！最好配搭一个<strong style="color: #D4AF37">金色胸针</strong>。<br><br>今天的喜神属木，你五行属水，有金色的元素能够增加你的运气。金生水，可以增强你今天的整体运势，祝好运！🍀`
  } else if (question.includes('加薪')) {
    return `根据今日天时与你命盘的匹配度分析：<br><br>建议选择<strong style="color: #D4AF37">【未时】13:00-15:00</strong>与老板沟通加薪事宜。<br><br>这个时段你的官星旺盛，说话更有分量，老板也更容易被你说服。记得穿着以橙色或金色为点缀，可以增强你的气场。`
  }
  
  return `感谢你的提问。根据你的命盘（${userInfo.value.zodiac}·${userInfo.value.riZhu}日主·${userInfo.value.mingPan}）和今日天时分析，我为你做出如下解读：<br><br>今天整体运势不错，适合处理日常事务。如有具体问题，可以详细描述，我会给你更精准的建议。`
}

const toggleVoice = () => {
  if (isRecording.value) {
    stopRecording()
  } else {
    startRecording()
  }
}

const startRecording = () => {
  isRecording.value = true
}

const stopRecording = () => {
  isRecording.value = false
  inputText.value = '今天下午几点能够去看NBA的联赛？我穿这件衣服咋样？'
}

const selectImage = () => {
  showAttachMenu.value = false
  messages.value.push({
    type: 'user',
    content: '帮我看看这条裙子适合今天穿吗？',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="150" height="200" viewBox="0 0 150 200"%3E%3Crect fill="%23f0e6d3" width="150" height="200"/%3E%3Ctext x="75" y="100" text-anchor="middle" fill="%23999" font-size="14"%3E[裙子图片]%3C/text%3E%3C/svg%3E'
  })
  scrollToBottom()
  
  isTyping.value = true
  setTimeout(() => {
    isTyping.value = false
    messages.value.push({
      type: 'assistant',
      content: '我觉得特别合适！这个颜色和款式都很衬你的气质。<br><br>最好配搭一个<strong style="color: #D4AF37">金色胸针</strong>，今天的喜神属木，你五行属水，有金色的元素能够增加你的运气，祝好运！💫'
    })
    scrollToBottom()
  }, 2000)
}

const takePhoto = () => {
  showAttachMenu.value = false
  alert('打开相机功能')
}
</script>

<style lang="scss" scoped>
.chat-page {
  height: calc(812px - 44px);
  display: flex;
  flex-direction: column;
  position: relative;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--mazu-purple-deep);
  border-bottom: 1px solid var(--glass-border);
  flex-shrink: 0;
  
  .back-btn, .history-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    color: var(--text-primary);
    font-size: 18px;
    cursor: pointer;
  }
  
  .header-center {
    display: flex;
    align-items: center;
    gap: 8px;
    
    .title {
      font-size: 15px;
      font-weight: 500;
      color: var(--text-primary);
    }
  }
}

.chat-area {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  padding-bottom: 140px;
  
  &::-webkit-scrollbar { display: none; }
}

.message {
  display: flex;
  gap: 10px;
  margin-bottom: 16px;
  
  &.system {
    .message-content {
      display: flex;
      gap: 12px;
      padding: 16px;
      
      .message-text {
        flex: 1;
        
        .greeting {
          font-size: 16px;
          font-weight: 500;
          color: var(--mazu-gold);
          margin-bottom: 4px;
        }
        
        .intro {
          font-size: 14px;
          color: var(--text-primary);
          margin-bottom: 8px;
        }
        
        .desc {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.6;
        }
      }
    }
  }
  
  &.user {
    justify-content: flex-end;
    
    .message-content {
      background: var(--mazu-gold);
      color: #1a0a2e;
      border-radius: 16px 16px 4px 16px;
      padding: 12px 16px;
      max-width: 70%;
      
      p { font-size: 14px; }
    }
    
    .user-avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: var(--glass-bg);
      border: 1px solid var(--mazu-gold);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: var(--mazu-gold);
      flex-shrink: 0;
    }
  }
  
  &.assistant {
    .msg-avatar { flex-shrink: 0; }
    
    .message-content {
      padding: 12px 16px;
      max-width: 75%;
      border-radius: 16px 16px 16px 4px;
      
      p {
        font-size: 14px;
        color: var(--text-secondary);
        line-height: 1.7;
      }
    }
  }
  
  .msg-image {
    max-width: 150px;
    border-radius: 8px;
    margin-top: 8px;
  }
}

.quick-questions {
  margin: 20px 0;
  
  .hint {
    font-size: 12px;
    color: var(--text-tertiary);
    margin-bottom: 12px;
  }
  
  .question-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    
    .question-btn {
      padding: 10px 14px;
      background: var(--glass-bg);
      border: 1px solid var(--glass-border);
      border-radius: 20px;
      color: var(--text-secondary);
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s;
      
      &:hover {
        border-color: var(--mazu-gold);
        color: var(--mazu-gold);
      }
    }
  }
}

.typing-indicator {
  display: flex;
  gap: 4px;
  
  span {
    width: 8px;
    height: 8px;
    background: var(--mazu-gold);
    border-radius: 50%;
    animation: typing-bounce 1s ease-in-out infinite;
    
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
}

@keyframes typing-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.input-area {
  position: absolute;
  bottom: 80px;
  left: 0;
  right: 0;
  padding: 12px 16px;
  background: linear-gradient(180deg, transparent 0%, var(--mazu-purple-deep) 20%);
  
  .input-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--glass-bg);
    border: 1px solid var(--glass-border);
    border-radius: 24px;
    padding: 6px 12px;
    
    .attach-btn, .voice-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background: transparent;
      border: none;
      color: var(--text-secondary);
      font-size: 20px;
      cursor: pointer;
      
      &.recording {
        color: #f87171;
        animation: pulse 1s infinite;
      }
    }
    
    .chat-input {
      flex: 1;
      background: transparent;
      border: none;
      color: var(--text-primary);
      font-size: 14px;
      outline: none;
      
      &::placeholder { color: var(--text-tertiary); }
    }
    
    .send-btn {
      padding: 8px 16px;
      background: var(--mazu-gold);
      border: none;
      border-radius: 16px;
      color: #1a0a2e;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
  
  .attach-menu {
    position: absolute;
    bottom: 70px;
    left: 16px;
    padding: 12px;
    display: flex;
    gap: 20px;
    
    .attach-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      background: none;
      border: none;
      cursor: pointer;
      
      .icon { font-size: 24px; }
      .label { font-size: 11px; color: var(--text-secondary); }
    }
  }
}

.recording-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  
  .recording-content {
    text-align: center;
    
    .wave-animation {
      display: flex;
      justify-content: center;
      gap: 4px;
      margin-bottom: 20px;
      
      span {
        width: 4px;
        height: 30px;
        background: var(--mazu-gold);
        border-radius: 2px;
        animation: wave 0.8s ease-in-out infinite;
        
        @for $i from 1 through 5 {
          &:nth-child(#{$i}) {
            animation-delay: #{$i * 0.1}s;
          }
        }
      }
    }
    
    p {
      color: var(--text-primary);
      margin-bottom: 20px;
    }
    
    .stop-btn {
      padding: 12px 32px;
      background: #f87171;
      border: none;
      border-radius: 24px;
      color: #fff;
      font-size: 14px;
      cursor: pointer;
    }
  }
}

@keyframes wave {
  0%, 100% { transform: scaleY(0.5); }
  50% { transform: scaleY(1.5); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.history-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  z-index: 100;
  
  .modal-content {
    width: 100%;
    max-width: 375px;
    max-height: 60vh;
    border-radius: 20px 20px 0 0;
    padding: 20px;
    
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
      
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
    
    .history-list {
      max-height: 300px;
      overflow-y: auto;
      
      .history-item {
        padding: 12px 0;
        border-bottom: 1px solid var(--glass-border);
        
        .record-preview {
          font-size: 14px;
          color: var(--text-primary);
          margin-bottom: 4px;
        }
        
        .record-time {
          font-size: 11px;
          color: var(--text-tertiary);
        }
      }
    }
  }
}

.disclaimer {
  position: absolute;
  bottom: 85px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 9px;
  color: var(--text-tertiary);
  opacity: 0.6;
}
</style>
