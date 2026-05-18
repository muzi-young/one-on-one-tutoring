import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  const isDarkMode = ref(true)
  const isLoading = ref(false)
  const loadingText = ref('加载中...')
  
  const setLoading = (loading, text = '加载中...') => {
    isLoading.value = loading
    loadingText.value = text
  }
  
  return {
    isDarkMode,
    isLoading,
    loadingText,
    setLoading
  }
})

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false)
  const userInfo = ref({
    id: '',
    nickname: '陈辰',
    avatar: '',
    phone: '',
    email: '',
    birthday: '1974-12-09',
    birthTime: '18:00',
    birthCity: '福建莆田',
    gender: 'female',
    zodiac: '虎',
    riZhu: '壬水',
    mingPan: '木火偏旺',
    isVip: true,
    vipExpireDate: '2026-12-03',
    profession: 'AI/科技创新',
    interests: ['商业财经', '健康养生', '人文历史']
  })
  
  const todayFortune = ref({
    score: 78,
    lunarDate: '农历九月二十四',
    ganZhi: '甲辰｜乙亥月｜辛卯日',
    wuxing: {
      day: '天河水',
      year: '覆灯火',
      month: '屋上土'
    },
    luckyColor: ['橙', '白', '绿'],
    luckyTime: ['辰时', '未时', '子时'],
    luckyDirection: '正西',
    luckyNumber: [3, 9],
    luckyElement: ['金', '木'],
    suitable: ['动土', '搬迁', '祭祀', '除尘', '开市', '访友', '修屋'],
    unsuitable: ['嫁娶', '安葬', '出行'],
    dimensions: {
      wealth: 85,
      career: 72,
      love: 68,
      study: 90,
      health: 75
    },
    dailyAdvice: '今天正逢日柱的"比干"，适合社交，建议今天适合和朋友看电影，然后去吃个火锅犒劳一下自己。'
  })
  
  const login = (info) => {
    isLoggedIn.value = true
    Object.assign(userInfo.value, info)
  }
  
  const logout = () => {
    isLoggedIn.value = false
  }
  
  return {
    isLoggedIn,
    userInfo,
    todayFortune,
    login,
    logout
  }
})
