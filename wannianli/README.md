# 妈祖万年历 (MAZU Calendar)

> 只为你服务的神仙智能体 - 私属万年历APP原型

## 项目概述

基于 Vue 3 + Vite + TypeScript 构建的万年历APP交互原型，以妈祖形象为智能体，融合传统黄历、命理五行、AI陪伴等功能。

### 技术栈

- **框架**: Vue 3 (Composition API)
- **构建**: Vite 5
- **状态管理**: Pinia
- **路由**: Vue Router 4
- **样式**: SCSS + CSS Variables

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 项目结构

```
wannianli/
├── src/
│   ├── components/        # 可复用组件
│   │   ├── MazuAvatar.vue    # 妈祖头像组件
│   │   └── TabBar.vue        # 底部导航栏
│   ├── views/             # 页面视图
│   │   ├── Welcome.vue       # 欢迎页
│   │   ├── Register.vue      # 注册流程
│   │   ├── Login.vue         # 登录页
│   │   ├── Home.vue          # 首页
│   │   ├── Fortune.vue       # 运势详情
│   │   ├── ZeDay.vue         # 妈祖择日
│   │   ├── Chat.vue          # AI陪伴对话
│   │   ├── Profile.vue       # 个人中心
│   │   ├── Wallpaper.vue     # 助运壁纸
│   │   └── Vip.vue           # VIP会员
│   ├── stores/            # Pinia状态管理
│   │   └── app.js            # 应用/用户状态
│   ├── styles/            # 全局样式
│   │   ├── global.scss       # 全局样式变量
│   │   └── theme.js          # 主题配置
│   ├── router/            # 路由配置
│   │   └── index.js
│   ├── App.vue            # 根组件
│   └── main.js            # 入口文件
├── index.html
├── vite.config.js
└── package.json
```

## 功能模块

### 1. 欢迎页与品牌展示
- 妈祖形象动画
- 三大功能卖点展示
- 注册/登录入口

### 2. 注册登录流程 (4步)
- Step 1: 手机/邮箱验证
- Step 2: 基本信息（昵称、性别、生日）
- Step 3: 出生时辰选择
- Step 4: 兴趣偏好标签

### 3. 首页
- 日历主卡片（公历/农历）
- 天人合一综合得分
- 今日速览（幸运色、吉时、财位、幸运数）
- 宜忌速览
- 妈祖每日一言
- 快捷功能入口

### 4. 运势详情
- 五维雷达图（财运/事业/感情/学业/健康）
- 幸运时段推荐
- 助运元素（颜色、五行、方位、数字）
- 个性化建议

### 5. 妈祖择日
- 事件类型选择
- 时间范围设定
- 动态形象动效
- 吉日结果展示（最佳+备选）
- 历史记录管理

### 6. AI陪伴对话
- 妈祖智能对话
- 快捷问题推荐
- 语音输入
- 图片上传识别
- 历史记录

### 7. 个人中心
- 用户信息展示/编辑
- VIP状态
- 记录管理
- 设置项

### 8. VIP会员
- 套餐选择
- 权益对比
- 专属特权

## 设计系统

### 主题色彩
- 主色: 神圣金 `#D4AF37`
- 背景: 深紫夜空 `#1a0a2e`
- 五行色: 金/木/水/火/土

### 视觉特效
- 毛玻璃效果
- 光晕脉冲动画
- 粒子浮动效果
- 渐变扫光动画

## 演示脚本

详见 [DEMO_SCRIPT.md](./DEMO_SCRIPT.md)

## 注意事项

- 本项目为交互原型，数据均为模拟数据
- 底部声明：基于经典国学算法推演建议·仅作生活娱乐参考

---

© 2026 妈祖万年历 MAZU Calendar
