// 妈祖主题设计系统 - JavaScript配置
export const mazuTheme = {
  colors: {
    gold: {
      primary: '#D4AF37',
      light: '#F4D03F',
      dark: '#B8860B',
      glow: 'rgba(212, 175, 55, 0.6)'
    },
    purple: {
      deep: '#1a0a2e',
      dark: '#0d0618',
      mid: '#2a1040',
      light: '#4a2070'
    },
    wuxing: {
      gold: '#FFD700',
      wood: '#228B22',
      water: '#1E90FF',
      fire: '#FF4500',
      earth: '#DAA520'
    },
    status: {
      success: '#4ade80',
      warning: '#fbbf24',
      danger: '#f87171',
      info: '#60a5fa'
    }
  },
  
  // 五维雷达图颜色
  fortuneColors: {
    wealth: '#FFD700',
    career: '#FF6B35',
    love: '#FF69B4',
    study: '#00CED1',
    health: '#32CD32'
  },
  
  // 十二时辰
  shichen: [
    { name: '子时', time: '23:00-01:00', index: 0 },
    { name: '丑时', time: '01:00-03:00', index: 1 },
    { name: '寅时', time: '03:00-05:00', index: 2 },
    { name: '卯时', time: '05:00-07:00', index: 3 },
    { name: '辰时', time: '07:00-09:00', index: 4 },
    { name: '巳时', time: '09:00-11:00', index: 5 },
    { name: '午时', time: '11:00-13:00', index: 6 },
    { name: '未时', time: '13:00-15:00', index: 7 },
    { name: '申时', time: '15:00-17:00', index: 8 },
    { name: '酉时', time: '17:00-19:00', index: 9 },
    { name: '戌时', time: '19:00-21:00', index: 10 },
    { name: '亥时', time: '21:00-23:00', index: 11 }
  ],
  
  // 十二生肖
  zodiac: ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'],
  
  // 天干
  tianGan: ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
  
  // 地支
  diZhi: ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'],
  
  // 五行
  wuxing: ['金', '木', '水', '火', '土']
}

export default mazuTheme
