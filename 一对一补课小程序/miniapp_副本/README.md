# 一对一补课小程序 · 前端（Uni-app + Vue3）

## 启动

```bash
# 1. 安装依赖
npm install

# 2. H5 调试（推荐先用 H5 走通流程）
npm run dev:h5
# 浏览器访问 http://localhost:5173

# 3. 微信小程序编译
npm run dev:mp-weixin
# 用「微信开发者工具」打开生成的 dist/dev/mp-weixin 目录
```

> **重要**：默认 baseURL 是 `http://localhost:3000/api`（见 `src/api/request.js`）。
> 真机预览时需将其改为局域网 IP 或公网域名，并在微信小程序后台添加 request 合法域名。

## 目录结构

```
src/
  main.js                # Vue3 入口
  App.vue                # 应用根 + 全局样式
  pages.json             # 页面路由 + tabBar
  manifest.json          # 多端配置
  api/
    request.js           # 请求封装 + token
    index.js             # 全部 API 方法
  store/user.js          # Pinia user store
  pages/
    login/index.vue              # 01 启动·角色选择
    index/index.vue              # 02 首页·课程列表
    course/detail.vue            # 03 课程详情
    course/buy.vue               # 04 选择课包
    order/pay.vue                # 05 订单确认·支付
    order/list.vue               # 我的订单
    booking/index.vue            # 06 预约老师·选时段
    booking/mine.vue             # 07 我的预约（tab）
    classroom/index.vue          # 08 在线课堂
    courseware/index.vue         # 09 课件查看（tab "学习"）
    answer/index.vue             # 10 在线答题
    rate/index.vue               # 11 课程评价
    poster/index.vue             # 12 海报分享
    coupon/index.vue             # 13 卡券·佣金账户
    me/index.vue                 # 14 个人中心（tab）
    teacher/home.vue             # 15 教师工作台
    teacher/createMeet.vue       # 16 创建腾讯会议
  static/
    tab/*.png            # tabBar 图标（需自行补充）
```

## 调试账号

后端 `npm run seed` 后会创建以下账号，登录页选择身份即可自动登录：

- **学生**：mockOpenid = `stu_xm`，昵称小明，含 ¥158 佣金
- **教师**：mockOpenid = `tch_wangxue`，王雪老师（已认证）

## 真实接入指引

1. **微信登录**：在 `pages/login/index.vue` 中用 `uni.login()` 取 `code`，传给后端 `/auth/login`
2. **微信支付**：在 `pages/order/pay.vue` 调起 `uni.requestPayment`
3. **腾讯会议 / TRTC**：
   - 简单方案：教师创建会议后，把 `joinUrl` 用 `web-view` 打开
   - 推荐方案：用 [腾讯云互动白板 TIW](https://cloud.tencent.com/document/product/1137) + [TRTC](https://cloud.tencent.com/document/product/647) 在小程序内原生集成，体验更好
4. **画板/答题**：可继续接入 `canvas`、`pdf-viewer` 等组件

## 多端

```bash
npm run dev:h5          # H5
npm run dev:mp-weixin   # 微信小程序
# 还支持 mp-alipay / mp-baidu / mp-toutiao / app-plus 等，参考 uni-app 文档
```
