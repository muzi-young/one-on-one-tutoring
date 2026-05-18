<template>
  <div class="mazu-avatar" :class="[size, { animated: animate, glowing: glow }]">
    <div class="avatar-glow"></div>
    <div class="avatar-ring"></div>
    <div class="avatar-inner">
      <div class="avatar-image">
        <svg viewBox="0 0 100 100" class="mazu-svg">
          <!-- 妈祖形象 - 简化矢量图 -->
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#F4D03F"/>
              <stop offset="50%" style="stop-color:#D4AF37"/>
              <stop offset="100%" style="stop-color:#B8860B"/>
            </linearGradient>
            <radialGradient id="faceGradient" cx="50%" cy="40%" r="50%">
              <stop offset="0%" style="stop-color:#FFE4C4"/>
              <stop offset="100%" style="stop-color:#DEB887"/>
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          <!-- 背景圆环 -->
          <circle cx="50" cy="50" r="48" fill="none" stroke="url(#goldGradient)" stroke-width="1" opacity="0.5"/>
          
          <!-- 头发/凤冠底座 -->
          <ellipse cx="50" cy="35" rx="28" ry="20" fill="#1a0a2e"/>
          
          <!-- 凤冠装饰 -->
          <path d="M30 30 Q35 15 50 12 Q65 15 70 30" fill="url(#goldGradient)" filter="url(#glow)"/>
          <circle cx="50" cy="18" r="4" fill="#FFD700"/>
          <circle cx="38" cy="22" r="2" fill="#FFD700"/>
          <circle cx="62" cy="22" r="2" fill="#FFD700"/>
          
          <!-- 珠帘 -->
          <g fill="#FFD700" opacity="0.9">
            <circle cx="32" cy="35" r="1.5"/>
            <circle cx="36" cy="38" r="1.5"/>
            <circle cx="40" cy="40" r="1.5"/>
            <circle cx="60" cy="40" r="1.5"/>
            <circle cx="64" cy="38" r="1.5"/>
            <circle cx="68" cy="35" r="1.5"/>
          </g>
          
          <!-- 脸部 -->
          <ellipse cx="50" cy="45" rx="18" ry="20" fill="url(#faceGradient)"/>
          
          <!-- 眉毛 -->
          <path d="M40 40 Q44 38 48 40" stroke="#4a3728" stroke-width="1" fill="none"/>
          <path d="M52 40 Q56 38 60 40" stroke="#4a3728" stroke-width="1" fill="none"/>
          
          <!-- 眼睛 -->
          <ellipse cx="44" cy="44" rx="3" ry="2" fill="#2c1810"/>
          <ellipse cx="56" cy="44" rx="3" ry="2" fill="#2c1810"/>
          <circle cx="44" cy="43.5" r="1" fill="#fff"/>
          <circle cx="56" cy="43.5" r="1" fill="#fff"/>
          
          <!-- 鼻子 -->
          <path d="M50 46 L49 52 Q50 53 51 52 L50 46" fill="#d4a574" opacity="0.6"/>
          
          <!-- 嘴唇 -->
          <path d="M46 56 Q50 58 54 56" stroke="#c44" stroke-width="1.5" fill="none" stroke-linecap="round"/>
          
          <!-- 衣领 -->
          <path d="M35 65 Q50 75 65 65" fill="url(#goldGradient)"/>
          <path d="M38 68 L50 80 L62 68" fill="#8B0000" stroke="url(#goldGradient)" stroke-width="1"/>
          
          <!-- 装饰纹样 -->
          <circle cx="50" cy="72" r="3" fill="url(#goldGradient)" filter="url(#glow)"/>
        </svg>
      </div>
    </div>
    <div class="avatar-particles" v-if="animate">
      <span v-for="i in 8" :key="i" class="particle" :style="{ '--i': i }"></span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'medium',
    validator: (v) => ['small', 'medium', 'large', 'xlarge'].includes(v)
  },
  animate: {
    type: Boolean,
    default: false
  },
  glow: {
    type: Boolean,
    default: true
  }
})
</script>

<style lang="scss" scoped>
.mazu-avatar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.small {
    width: 48px;
    height: 48px;
  }
  
  &.medium {
    width: 80px;
    height: 80px;
  }
  
  &.large {
    width: 120px;
    height: 120px;
  }
  
  &.xlarge {
    width: 180px;
    height: 180px;
  }
}

.avatar-glow {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(212, 175, 55, 0.4) 0%, transparent 70%);
  
  .glowing & {
    animation: pulse-glow 3s ease-in-out infinite;
  }
}

.avatar-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid rgba(212, 175, 55, 0.3);
  
  .animated & {
    animation: spin-slow 20s linear infinite;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: 50%;
    width: 8px;
    height: 8px;
    background: var(--mazu-gold);
    border-radius: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 10px var(--mazu-gold);
  }
}

.avatar-inner {
  width: 85%;
  height: 85%;
  border-radius: 50%;
  overflow: hidden;
  background: linear-gradient(135deg, #2a1040 0%, #1a0a2e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    inset 0 0 20px rgba(212, 175, 55, 0.2),
    0 0 30px rgba(212, 175, 55, 0.3);
}

.avatar-image {
  width: 90%;
  height: 90%;
  
  .mazu-svg {
    width: 100%;
    height: 100%;
  }
}

.avatar-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  
  .particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: var(--mazu-gold);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    animation: particle-float 4s ease-in-out infinite;
    animation-delay: calc(var(--i) * 0.5s);
    opacity: 0;
    
    @for $i from 1 through 8 {
      &:nth-child(#{$i}) {
        --angle: #{$i * 45}deg;
      }
    }
  }
}

@keyframes pulse-glow {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes particle-float {
  0%, 100% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-40px);
  }
}
</style>
