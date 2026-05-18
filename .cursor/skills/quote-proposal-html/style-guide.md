# 报价方案 HTML 样式与组件参考

## CSS 变量（设计令牌）

### 暖棕金色系

| 变量名 | 值 | 用途 |
|--------|-----|------|
| `--primary` | `#b46a2b` | 主色调棕金，标题序号、圆点、高亮 |
| `--primary-light` | `#d9a46d` | 浅棕，辅助装饰 |
| `--primary-dark` | `#8b4e1e` | 深棕，小计行文字、编号徽标 |
| `--secondary` | `#24404f` | 深青蓝，表头背景、标题文字 |
| `--accent` | `#e8c48d` | 暖金，架构标签文字色 |
| `--accent2` | `#7e9f8f` | 青绿，时间线渐变终点 |
| `--dark` | `#111827` | 最深色，Hero背景、总计行 |
| `--text` | `#2f3a44` | 正文文字 |
| `--text-light` | `#6b7280` | 辅助文字 |
| `--bg` | `#f7f5f2` | 页面背景（暖白） |
| `--white` | `#fff` | 卡片/表格背景 |
| `--border` | `#e7dfd5` | 边框线（暖灰） |
| `--alt` | `#f1ece6` | 交替板块背景（暖浅灰） |
| `--gold` | `#d7b078` | 金色，Hero渐变文字终点 |
| `--gold-soft` | `#f4ddbb` | 柔金，顶部栏标语文字色 |
| `--r` | `12px` | 小圆角 |
| `--rl` | `20px` | 大圆角 |

## 字体

- 正文：`'Noto Sans SC'`，回退 `-apple-system, BlinkMacSystemFont, 'Microsoft YaHei', sans-serif`
- 标题/数字/标语：`'Noto Serif SC', serif`
- 通过 Google Fonts 加载：`Noto Sans SC`（300/400/500/700/900）+ `Noto Serif SC`（400/600/700/900）

## 组件速查

### 顶部导航栏 `.hero-topbar`（新增）

```
.hero-topbar           固定顶部导航，毛玻璃效果（backdrop-filter:blur(18px)）
.hero-topbar-inner     内容区，flex两端对齐，max-width:1400px
.opening-line          "铁肩担荣耀，妙手筑梦想"标语，Noto Serif SC，金色（--gold-soft），letter-spacing:.16em
.hero-top-meta         右侧信息胶囊容器，flex wrap
.hero-top-meta span    胶囊标签：圆角999px，半透明背景+边框，12px白色文字
```

内容固定三项：商务姓名、报价单位、联系电话。

### Hero 封面 `.hero`（双栏布局）

```
.hero              全屏深色渐变容器，radial-gradient装饰光晕
.hero-inner        内容区，z-index:1，max-width:1440px
.hero-shell        两栏grid：左1.2fr 右minmax(300px,460px)
.hero-copy         左栏：项目信息
.hero-kicker       小标签（12px大写，半透明白），如"项目方案封面"
.hero h1           渐变文字（白→暖白→金），Noto Serif SC，clamp(44px,5.3vw,84px)
.hero-sub          副标题，clamp(18px,1.7vw,28px)，半透明白
.hero-note         项目简介，较小字号，更半透明
.hero-side         右栏：方案简述 + 元数据卡片网格
.hero-side-intro   方案简述卡片，半透明玻璃背景
.hero-info-grid    2×N元数据网格
.meta-chip         元数据卡片（文档类型/版本/日期/交付形态）
.contact-chip      联系信息卡片（报价单位/联系电话）
```

### 目录导航 `.toc`

```
.toc               白底区域
.toc-grid          grid网格，auto-fit,minmax(220px,1fr)
.toc-item          带hover效果的锚点卡片，hover时上移+阴影+边框高亮
.toc-n             棕金渐变序号方块（38×38px）
.toc-t             目录文字，15px 600
```

### 板块通用

```
.sec               白底板块，padding:78px 0
.sec-alt           暖浅灰底板块（--alt）
.sec-num           棕色大写序号标签 "Part 0N"，letter-spacing:3px
.sec-title         衬线体36px标题
.sec-desc          灰色描述文字，max-width:720px
```

### 模块卡片 `.m-card`

```
.m-grid            网格容器，gap:18px
.m-card            白底圆角卡片(--rl)
.m-head            头部：图标+标题+标签，底边框
.m-icon            50×50圆角图标，渐变背景+白色文字（序号）
.tag               右侧标签胶囊（.tag-core棕/.tag-flow青蓝/.tag-fin青绿）
.m-body            内容区
.fg                功能子组容器，可包含多个
.fg-title          子组标题（14px 700），底部2px分隔线
.fl                功能列表，grid多列布局
.fl li             带棕色圆点前缀
```

模块图标渐变色参考（按序号交替使用）：
- `linear-gradient(135deg,#b46a2b,#e8c48d)` — 棕金
- `linear-gradient(135deg,#24404f,#7e9f8f)` — 青蓝
- `linear-gradient(135deg,#965d38,#d9a46d)` — 深棕
- `linear-gradient(135deg,#1f4f7a,#6ea9d7)` — 蓝
- `linear-gradient(135deg,#37525b,#85aa9c)` — 灰青
- `linear-gradient(135deg,#47685a,#96baa7)` — 绿
- `linear-gradient(135deg,#7d5b43,#c79b79)` — 暖棕
- `linear-gradient(135deg,#283845,#5d7887)` — 深灰蓝

### 数据表格 `.tech-table`

```
thead th           深色背景(--secondary)，白字，13px
tbody td           白底，14px，hover时暖棕透明底
td:first-child     加粗，深色，不换行
```

适用场景：需求分析、技术选型、技术难点中的信息表格。

### 架构展示卡片 `.arch`（新增）

```
.arch              深色渐变背景（#18232d→#243845），圆角20px，白色文字
.arch-row          两列grid（标签150px + 内容1fr），底部1px半透明分隔线
.arch-label        行标签：13px 700，金色(--accent)，大写，letter-spacing:2px
.arch-tags         标签容器，flex wrap
.arch-tag          技术标签胶囊：圆角999px，半透明白背景，13px
```

适用场景：技术实施方案（PART 06）中的架构层级展示，替代普通 tech-table，视觉层次更高。

### 信息块 `.nb`

```
.nb                白底圆角(--rl)卡片，padding:34px
.nb h4             17px加粗标题，color:--secondary
.nl                编号列表（CSS counter自动编号）
.nl li             左侧圆形编号徽标（CSS伪元素，浅灰底棕色数字）
```

适用场景：费用说明、方案边界、建设目标、商务条款。

### 报价表格 `.qt`

```
.qt-wrap           外层滚动容器
.qt                min-width:920px，深色渐变表头
.qt .gh td         分组标题：暖浅灰底(#efe7dd)+左侧4px棕条
.qt .st td         小计行：暖浅底(#faf4ec)，深棕加粗文字
.qt .gt2 td        总计行：深色渐变底，白字16px
.amt               金额加粗
```

六列结构：序号 | 功能模块 | 工作内容说明 | 人天 | 单价（元/天） | 报价（元）

最后两列及第5、6列右对齐，使用 `font-variant-numeric:tabular-nums` 等宽数字。

### 统计卡片 `.sg` > `.sc`

```
.sg                grid容器，minmax(220px,1fr)
.sc                白底居中卡片
.sc .num           衬线体34px大数字，棕金色(--primary)
.sc .unit          16px灰色单位
.sc .desc          14px灰色描述
```

适用场景：汇总数据展示（总价/工期/模块数/人数/质保期）。

### 时间线排期 `.tl`（新增）

```
.tl                相对定位容器，左侧padding:36px
.tl::before        左侧竖线（2px宽），渐变色（棕→青绿）
.tl-item           白底圆角卡片，左侧-28px处有12px棕色圆点
.tl-phase          阶段标签（12px 700，棕色大写，如"Phase 1"）
.tl-title          阶段标题（18px 700）
.tl-dur            工期胶囊（圆角999px，棕色透明底）
.tl-tasks          任务列表
.tl-tasks li       带"→"前缀的任务项
```

适用场景：实施排期（PART 07），视觉化展示阶段计划，替代简单的 .nb 列表。

## 响应式断点

| 断点 | 调整 |
|------|------|
| `max-width:1024px` | Hero变单栏，减小间距 |
| `max-width:768px` | 顶部栏纵向排列、容器padding缩小、Hero/板块标题缩小、功能列表单列、架构grid单列、时间线缩进 |
| `max-width:560px` | 元数据网格单列、顶部胶囊全宽 |

## 打印适配

- 白底背景、11pt字号
- Hero高度自动、减少padding
- 卡片/表格/架构块禁止跨页断裂

## 交替背景规则

板块按奇偶交替背景：
- 奇数板块（s1/s3/s5/s7/s9）：白底 `.sec`
- 偶数板块（s2/s4/s6/s8）：暖浅灰底 `.sec .sec-alt`
