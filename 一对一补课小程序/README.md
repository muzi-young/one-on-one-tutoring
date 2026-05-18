# 高分一对一补课小程序

高中全科 1V1 在线补课微信小程序，覆盖课程购买、预约、腾讯会议在线课堂、互动白板、共享屏幕、课件投屏、答题、评价、海报分享裂变、佣金优惠券等完整业务闭环。

## 项目结构

```
一对一补课小程序/
├── prototype/          # 🎨 交互原型 Demo（HTML，16 个页面）
│   └── index.html      # 浏览器打开即可
├── backend/            # ⚙️  后端 API（Node.js + Express + Sequelize + MySQL）
│   ├── src/
│   ├── package.json
│   ├── .env.example
│   └── README.md
├── miniapp/            # 📱 小程序前端（Uni-app + Vue3 + Vite）
│   ├── src/
│   ├── package.json
│   └── README.md
├── PRD-v0.2.md         # 📄 产品需求文档
└── 一对一补课小程序-功能需求清单.xlsx  # 📋 功能需求清单
```

## 快速启动（端到端跑通）

### 1. 启动后端

```bash
cd backend
npm install
cp .env.example .env       # 填写 MySQL 连接信息

# MySQL 中先建库
mysql -uroot -p -e "CREATE DATABASE tutoring DEFAULT CHARSET utf8mb4;"

npm run seed               # 初始化种子数据（首次必须）
npm run dev                # 启动 http://localhost:3000
```

### 2. 启动小程序（H5 模式调试）

```bash
cd miniapp
npm install
npm run dev:h5             # 浏览器访问 http://localhost:5173
```

### 3. 默认登录账号

进入登录页，点击"我是学生"或"我是老师"即可（开发模式使用 mockOpenid 自动登录）：

| 角色 | 账号 | 备注 |
|------|------|------|
| 学生 | 小明 | 已含 ¥158 佣金、1 张 ¥100 新人券 |
| 教师 | 王雪老师 | 高三数学 · 已认证 |

## 核心功能清单

| 模块 | 功能 |
|------|------|
| **登录** | 微信一键登录 / 角色选择（学生·家长·教师） |
| **课程** | 高中全科 · 按年级科目筛选 · 详情含教师、简介、亮点、评价 |
| **购买** | 灵活时长（40/60/90 分钟）+ 单节/10/15/20 节课包 |
| **支付** | 优惠券 + 佣金抵扣 + 微信支付（含订单状态机） |
| **预约** | 教师档期日历 + 时段冲突检测 + 课时扣减 |
| **课堂** | 腾讯会议集成（mock）+ 白板/共享屏幕/课件/摄像头/答题 |
| **课件** | PPT/PDF 翻页查看、目录、下载 |
| **答题** | 单选/多选/判断/主观题 + 自动判分 + 错题本 |
| **评价** | 星级 + 标签 + 文字 + 评价反哺课程评分 |
| **裂变** | 邀请码 + 海报分享 + 双向发券 + 佣金返现 |
| **教师端** | 工作台 · 今日课程 · 一键创建腾讯会议 · 学生管理 |

## 技术栈

| 层 | 选型 |
|-----|------|
| 小程序 | Uni-app + Vue3 + Vite + Pinia |
| 后端 | Node.js + Express + Sequelize + JWT |
| 数据库 | MySQL 8 |
| 音视频 | 腾讯会议 OpenAPI（推荐改用 TRTC + 互动白板 TIW 原生集成） |
| 支付 | 微信支付 |
| 部署 | 后端 PM2/Docker · 小程序微信开发者工具上传 |

## 真实接入清单

启动骨架使用 **mock** 模拟以下能力，上线前请按 `backend/README.md` 和 `miniapp/README.md` 指引接入真实接口：

- [ ] 微信 `code2session` 登录
- [ ] 微信支付下单 + 回调签名校验
- [ ] 腾讯会议 OpenAPI（或 TRTC + TIW）
- [ ] 文件存储 COS（课件、海报）
- [ ] 微信订阅消息（开课提醒）

## 文档与原型

- 交互原型：用浏览器打开 `prototype/index.html` 查看 16 个手机页面
- 需求 PRD：见 `PRD-v0.2.md`
- 需求清单：`一对一补课小程序-功能需求清单.xlsx`

## License

仅供本项目内部使用。
