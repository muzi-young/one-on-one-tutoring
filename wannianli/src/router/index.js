import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: () => import('@/views/Welcome.vue'),
    meta: { title: '欢迎' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'),
    meta: { title: '注册' }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { title: '登录' }
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '首页', requiresAuth: true }
  },
  {
    path: '/fortune',
    name: 'Fortune',
    component: () => import('@/views/Fortune.vue'),
    meta: { title: '今日运程', requiresAuth: true }
  },
  {
    path: '/zeday',
    name: 'ZeDay',
    component: () => import('@/views/ZeDay.vue'),
    meta: { title: '妈祖择日', requiresAuth: true }
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import('@/views/Chat.vue'),
    meta: { title: 'AI陪伴', requiresAuth: true }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/Profile.vue'),
    meta: { title: '我的', requiresAuth: true }
  },
  {
    path: '/wallpaper',
    name: 'Wallpaper',
    component: () => import('@/views/Wallpaper.vue'),
    meta: { title: '助运壁纸', requiresAuth: true }
  },
  {
    path: '/vip',
    name: 'Vip',
    component: () => import('@/views/Vip.vue'),
    meta: { title: 'VIP会员', requiresAuth: true }
  },
  // Profile子页面
  {
    path: '/profile/fortune-history',
    name: 'FortuneHistory',
    component: () => import('@/views/profile/FortuneHistory.vue'),
    meta: { title: '深度解读记录', requiresAuth: true }
  },
  {
    path: '/profile/fortune-detail/:id',
    name: 'FortuneDetail',
    component: () => import('@/views/profile/FortuneDetail.vue'),
    meta: { title: '运程详情', requiresAuth: true }
  },
  {
    path: '/profile/zeday-history',
    name: 'ZedayHistory',
    component: () => import('@/views/profile/ZedayHistory.vue'),
    meta: { title: '择日记录', requiresAuth: true }
  },
  {
    path: '/profile/zeday-detail/:id',
    name: 'ZedayDetail',
    component: () => import('@/views/profile/ZedayDetail.vue'),
    meta: { title: '择日详情', requiresAuth: true }
  },
  {
    path: '/profile/checkin',
    name: 'Checkin',
    component: () => import('@/views/profile/Checkin.vue'),
    meta: { title: '签到记录', requiresAuth: true }
  },
  {
    path: '/profile/account-security',
    name: 'AccountSecurity',
    component: () => import('@/views/profile/AccountSecurity.vue'),
    meta: { title: '账号与安全', requiresAuth: true }
  },
  {
    path: '/profile/change-password',
    name: 'ChangePassword',
    component: () => import('@/views/profile/ChangePassword.vue'),
    meta: { title: '修改密码', requiresAuth: true }
  },
  {
    path: '/profile/notification',
    name: 'Notification',
    component: () => import('@/views/profile/Notification.vue'),
    meta: { title: '消息通知', requiresAuth: true }
  },
  {
    path: '/profile/language',
    name: 'Language',
    component: () => import('@/views/profile/Language.vue'),
    meta: { title: '语言设置', requiresAuth: true }
  },
  {
    path: '/profile/feedback',
    name: 'Feedback',
    component: () => import('@/views/profile/Feedback.vue'),
    meta: { title: '问题反馈', requiresAuth: true }
  },
  {
    path: '/profile/about',
    name: 'About',
    component: () => import('@/views/profile/About.vue'),
    meta: { title: '关于APP', requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || '妈祖万年历'} - 妈祖万年历`
  next()
})

export default router
