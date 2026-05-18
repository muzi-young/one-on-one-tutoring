# 一对一补课小程序 · 后端 API

Node.js + Express + Sequelize + MySQL + JWT

## 启动

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env 填写 MySQL 连接信息

# 3. 在 MySQL 中先建库
mysql -uroot -p -e "CREATE DATABASE tutoring DEFAULT CHARSET utf8mb4;"

# 4. 初始化种子数据（会重建表！）
npm run seed

# 5. 启动服务
npm run dev   # 开发模式（nodemon 热重载）
# 或
npm start
```

服务地址：`http://localhost:3000`

## 目录结构

```
src/
  app.js                  # 入口
  config/db.js            # Sequelize 初始化
  models/index.js         # 所有数据模型 + 关联
  middlewares/auth.js     # JWT 鉴权
  controllers/            # 业务控制器
    authController.js
    courseController.js
    orderController.js
    bookingController.js
    meetingController.js
    extraController.js    # 评价/优惠券/答题/海报/邀请
  routes/index.js         # 路由聚合
  utils/                  # jwt、统一响应
  seed.js                 # 种子数据
```

## 核心 API

| 模块 | 方法 | 路径 | 说明 |
|------|------|------|------|
| 鉴权 | POST | `/api/auth/login` | 微信登录（开发可传 `mockOpenid`） |
| 鉴权 | GET  | `/api/auth/me` | 获取当前用户 |
| 课程 | GET  | `/api/courses?grade=high3&subject=math` | 课程列表（支持筛选） |
| 课程 | GET  | `/api/courses/:id` | 课程详情（含教师、套餐、评价） |
| 订单 | POST | `/api/orders` | 创建订单（packageId, couponId, useCommission） |
| 订单 | POST | `/api/orders/pay` | 模拟支付（真实接微信支付回调） |
| 订单 | GET  | `/api/orders/mine` | 我的订单 |
| 预约 | GET  | `/api/bookings/slots?teacherId=&date=` | 教师档期 |
| 预约 | POST | `/api/bookings` | 预约下单 |
| 预约 | GET  | `/api/bookings/mine` | 我的预约 |
| 预约 | GET  | `/api/bookings/teacher` | 教师视角预约列表 |
| 会议 | POST | `/api/meetings` | 教师创建腾讯会议（mock） |
| 会议 | GET  | `/api/meetings/booking/:bookingId` | 查询会议 |
| 评价 | POST | `/api/evaluations` | 课后评价 |
| 优惠券 | GET | `/api/coupons/mine` | 我的卡券 |
| 答题 | GET | `/api/questions?courseId=` | 取题 |
| 答题 | POST | `/api/answers` | 提交答案（自动判分） |
| 海报 | GET | `/api/poster?courseId=` | 海报数据（前端 canvas 合成） |
| 邀请 | POST | `/api/invite/bind` | 绑定邀请码 |

## 登录示例（无微信环境也能跑）

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"mockOpenid":"stu_xm","role":"student"}'
```

返回 token 后，把它放到 `Authorization: Bearer <token>` 请求其他接口。

## 真实接入指南

- **微信登录**：在 `authController.login` 中替换 `wx.code2session` 真实调用
- **微信支付**：在 `orderController.pay` 中接入下单 + 回调签名校验
- **腾讯会议**：在 `meetingController.create` 中替换为腾讯会议 OpenAPI（`POST /v1/meetings`），传入 `subject / start_time / end_time / instanceid` 等
- **腾讯云互动白板 TIW + TRTC**：实际课堂建议使用 TRTC + TIW 在小程序内原生集成，比跳转腾讯会议体验更好

## 默认数据

- 学生：openid=`stu_xm` 昵称=小明 佣金=¥158
- 教师：openid=`tch_wangxue` (王雪) / `tch_liming` / `tch_zhang`
- 3 门课程 × 4 个套餐 + 3 张优惠券 + 2 个课件 + 3 道题
