# AI 教育培训 SaaS 平台（连锁分店模式）—— 乌兹别克斯坦本地化版（Uzbekistan Edition）

## 〇、项目定位（重要）

- **目标市场**：乌兹别克斯坦（Uzbekistan），中亚教育市场，不做泛全球。
- **主语言**：俄语 Russian (ru) —— 默认；并支持 乌兹别克语 Uzbek (uz) / 英语 English (en) / 中文 Chinese (zh-CN)。
- **结算币种**：UZS（Uzbekistani Som）单币种。
- **时区**：Asia/Tashkent (UTC+5) 单时区，数据库 UTC 存储。
- **支付通道**：Payme / Click（P0 必接）+ Uzum / Humo / Uzcard（P1）+ Apelsin（P2 可选）。
- **唯一推送通道**：Telegram Bot；兜底仅 Email（SendGrid / AWS SES）+ APNs/FCM 应用内推送；**不接 SMS**。
- **唯一登录方式**：Email + Password（含邮箱激活 / 忘记密码 / 修改密码 / 邮箱变更）；不开放社交登录与 OTP。
- **AI 模型**：OpenAI（GPT-4o/4.1/5 系列）/ Anthropic Claude / Google Gemini；向量库 Pinecone / Weaviate / Qdrant / pgvector；语音转写 Whisper / AWS Transcribe（4 语言覆盖）。
- **云与基建**：AWS（推荐区域 eu-central-1 法兰克福 或 ap-south-1 孟买）+ CloudFront / Bunny CDN（CIS 友好）+ Agora / 100ms / LiveKit 直播。
- **合规**：乌兹别克 ZRU-547 数据保护法（含 2021 数据本地化要求，待法务确认缓解方案）+ COPPA（K12 家长 Verifiable Consent）+ GDPR 兼容（Cookie Consent / 数据导出 / 被遗忘权）+ iOS ATT / Privacy Manifest。
- **分享渠道**：唯一 Telegram；系统级 Share Sheet 作为兜底（复制链接）。

## 一、文件清单
- 主文件（Excel，乌兹别克版）：`AI教育培训SaaS平台-需求功能清单.xlsx`
- 备份（CSV，UTF-8 with BOM）：`AI教育培训SaaS平台-需求功能清单.csv`
- 中国版备份：`AI教育培训SaaS平台-需求功能清单_中国版_backup.xlsx/.csv`
- 改造前快照：`AI教育培训SaaS平台-需求功能清单_pre_uzbekistan_backup.xlsx/.csv`
- 本说明：`README.md`

## 二、表结构
| 列 | 列名 | 说明 |
|---|---|---|
| A | 端口 | 学生端 / 家长端 / 教师端 / 分店教务端 / 店长端 / 总后台 / 系统后台 / 公共 |
| B | 板块 | 一级模块（如『课程中心』『证书与考务』『招生计划与目标』等） |
| C | 功能点 | 按钮级 / 子模块级颗粒度 |
| D | 详细功能描述 | 这个功能让用户做什么、得到什么 |
| E | 功能逻辑 | 业务规则 / 触发条件 / 校验 / 流转 / 异常分支 |
| F | 备注 | 优先级（P0/P1/P2）、依赖、相关三方、风险或待确认项 |

## 三、行数统计
- 合计行数：**340 行**
- 端口分布：

| 端口 | 行数 |
|---|---|
| 学生端 | 103 |
| 家长端 | 18 |
| 教师端 | 39 |
| 分店教务端 | 31 |
| 店长端 | 14 |
| 总后台 | 95 |
| 系统后台 | 30 |
| 公共 | 10 |

## 四、替换映射表（中国版 → 乌兹别克本地化版）
| 原（中国版） | 乌兹别克本地化版 |
|---|---|
| 手机号注册 + 短信验证码 / Telegram 一键登录 / 邮箱注册 | Email + Password 唯一登录（邮箱激活 / 忘记 / 修改 / 邮箱变更） |
| 微信支付 / 支付宝 / 银联 / Stars / Stripe | Payme / Click（P0）+ Uzum / Humo / Uzcard（P1）+ Apelsin（P2） |
| 阿里云 / 腾讯云 / 华为云 / 七牛 / 国内 VOD/RTC | AWS S3 + MediaConvert + CloudFront（备选 Bunny CDN）+ Agora / 100ms / LiveKit |
| 国内大模型（通义/文心/星火/豆包） | OpenAI GPT-4o/4.1/5 / Anthropic Claude / Google Gemini |
| 国内向量库（Milvus / 阿里云向量库） | Pinecone / Weaviate / Qdrant / pgvector |
| 国内短信三方（阿里云/腾讯云短信）兜底 | Telegram 主推 + Email(SendGrid/SES) + APNs/FCM 兜底（不接 SMS） |
| 微信分享 / 朋友圈 / QQ / 微博 / 抖音 | 唯一 Telegram 分享；系统 Share Sheet 兜底（复制链接） |
| 公安二/三要素实名 / 国内电子签章 | COPPA Verifiable Consent + 电子签章选型 DocuSign / e-IMZO（待法务确认） |
| 国内电子发票（百望/诺诺/航信） | 乌兹别克 QQS 12% 增值税电子发票（税率与开票主体待法务确认） |
| 国内客服 SaaS（智齿/七鱼） | Intercom / Freshdesk |
| 多语言（中/英/越/泰）泛全球 | ru / uz / en / zh-CN 四语言，默认 ru |
| 多币种 / 多时区 | UZS 单币种 + Asia/Tashkent 单时区 |
| 国内合规 / 未成年保护 | 乌兹别克 ZRU-547 数据保护法 + COPPA + GDPR 兼容 + iOS ATT/Privacy Manifest |
| Telegram 优先 + 短信兜底 | Telegram 唯一主推 + Email + APNs/FCM 兜底；不接 SMS |
| 永久绑定（手机号+TG ID） | Email + Telegram chat_id + Device ID(IDFA/AAID) 多因子绑定 |

## 五、乌兹别克本地化新增/重写功能（不少于 25 项）
1. Email + Password 完整闭环（注册 / 邮箱激活 / 忘记密码 / 修改密码 / 邮箱变更）
2. Telegram chat_id 绑定流（一次性 token + /verify 校验）
3. 4 语言（ru/uz/en/zh-CN）界面切换与首次进入按系统语言落地
4. 俄语作为默认主语言的初始化与 fallback 逻辑
5. Payme 支付接入：下单 / 支付 / 异步回调 / 退款 / 对账
6. Click 支付接入：Prepare / Complete / 回调 / 退款 / 对账
7. Uzum / Humo / Uzcard / Apelsin 多通道支付路由
8. UZS 单币种金额格式化（千分位空格、0 位小数）
9. Asia/Tashkent (UTC+5) 单时区固定化（课表/考试/推送/统计）
10. 乌兹别克 QQS 12% 增值税电子发票生成与导出
11. 数据本地化合规策略（ZRU-547 + AWS 区域选型缓解方案）
12. COPPA 家长 Verifiable Consent（K12 必备 + 留痕审计）
13. 4 语言 AI 助手回答（OpenAI / Claude / Gemini）
14. Whisper / AWS Transcribe 多语字幕自动生成（ru/uz/en/zh）
15. 分销邀请生成 Telegram 短链（Branch / FDL / AppsFlyer 归因）
16. 课程 / 证书 / 学习报告 / 拼团 / 分销邀请『一键分享到 Telegram』
17. 教师 / 分销员通过 Payme / Click 商户接口提现
18. App Store IAP 与本地支付（Payme/Click）并行策略与合规说明
19. 乌兹别克本地节假日营销日历（Navruz / 独立日 / 开斋节 / 宰牲节 / 宪法日 / 新年）
20. Cookie / 跟踪同意横幅（GDPR 兼容）
21. iOS ATT (App Tracking Transparency) 弹窗合规
22. iOS 17+ Privacy Manifest（PrivacyInfo.xcprivacy）
23. ru / uz 双语客服分流（Intercom / Freshdesk）
24. 4 语言敏感词库与禁答词库（合规审查 + AI 安全策略）
25. AWS 区域选型与备份策略（eu-central-1 / ap-south-1 + S3 跨可用区）
26. Mixpanel / Amplitude / GA4 埋点接入（隐私 Consent 联动）
27. Email 通道兜底（SendGrid / AWS SES，DKIM/SPF/DMARC 配置）
28. APNs / FCM 应用内推送通道（按用户语言渲染）
29. 证书姓名 4 语言转写规范（俄/乌/英/中互转）
30. Payme / Click 商户对账（每日通道流水 vs 平台订单）

## 六、业务闭环说明
> **招生 → 试听 → 成交（含分销/拼团/优惠，Payme/Click 支付）→ 排课（Asia/Tashkent）→ 学习（录播+直播+AI 助手，4 语字幕）→ 作业/考试 → 证书（4 语模板）→ 续费 → 家长同步（COPPA Consent）→ 数据驾驶舱 → 奖惩结算（UZS / Payme 提现）**

## 七、关键强规则在清单中的落地位置
1. **Telegram 唯一主推 + Email/APNs/FCM 兜底**：所有涉及消息推送的功能点备注列均写明；总后台『消息中心(Telegram 唯一)』含通道矩阵、失败重试、Email/推送兜底。
2. **客户永久绑定（Email + chat_id + Device ID）**：学员档案、订单、分销、家长授权、教师拉新、转分店等多处写明；总后台『学员档案与永久绑定』有专门审计与解绑审核入口。
3. **招生计划 + 奖惩机制（UZS 结算）**：总后台『招生计划与目标下达』与『奖惩机制配置』成对落地。
4. **学习进退步趋势**：学生 / 家长 / 教师 / 分店 / 总后台 BI 多端同维口径，触发预警走 Telegram。
5. **我的证书（学生端一级菜单）**：列表 / 详情 / 4 语 PDF / 一键分享 Telegram / 校验码 / 电子签章 / 申请补发 / 争议申诉。
6. **本地化（4 语 + UZS + Asia/Tashkent + Payme/Click + 节假日）**：系统后台『环境与多语言』『时区固定化』『货币固定化』+ 总后台『营销中心-本地节假日营销日历』+ 各端备注标记。
7. **合规（ZRU-547 + COPPA + GDPR 兼容 + iOS ATT/Privacy Manifest）**：系统后台『合规与隐私』专门板块全覆盖。

## 八、未决问题（建议回到客户确认）
1. 数据本地化：乌兹别克 ZRU-547 + 2021 修订是否强制把个人数据存于乌兹别克境内？若强制，是否接受本地 IDC 或选用阿斯塔纳/法兰克福作为缓解方案？需法务确认。
2. Payme 与 Click 是否两个都接入？还是先接 Payme 主通道、Click 作为 P0 备用？商户接入流程预估周期？
3. 增值税 QQS 12% 是否为现行税率？开票主体是否为乌兹别克境内注册公司（影响境外开票合规）？
4. 学员是否需要乌兹别克身份证（Passport / ID Card）KYC？还是仅 Email + 家长 Consent 即可？
5. Google Play 是否需要提供 APK 直装下载（CIS 地区有此使用习惯）？还是只走 Play 商店？
6. iOS 与 Android 用户占比预估？iOS IAP 30%/15% 抽成的商业影响是否可接受？
7. 客服是否需要 ru / uz 双语分流？是否还要 en 客服（外籍学员）？
8. 结业证书签发主体是否为乌兹别克本地教育机构注册号？是否需要对接乌兹别克教育部统一编号？
9. 电子签章选型：境外 DocuSign / HelloSign 还是乌兹别克本地 e-IMZO？后者是否需要本地接入伙伴？
10. K12 占比？是否需要专门的家长端独立 App 还是延用同一 App 内的家长视角？
11. Telegram Bot 是否在乌兹别克全年稳定可用？是否需要 Mini App（TWA）形态？
12. AI 模型成本预算：每月 Token 消耗预估？是否优先 OpenAI 还是按场景路由 Claude / Gemini？
13. 课程视频是否需要 DRM 加密、防录屏方案？预算与播放器选型（Mux / Bunny / 自研）？
14. 分销佣金结算周期 T+N 中 N 默认多少？Payme/Click Payout 周期是否影响 T+N 默认值？
15. 考试是否需要人脸识别 / 摄像头监考？乌兹别克市场对此接受度如何？
16. 未来是否扩区到周边 CIS（哈萨克斯坦/吉尔吉斯斯坦/塔吉克斯坦）？是否需要预留 RUB / USD / KZT 多币种开关？
17. AI 字幕翻译是否需要人工二次校对（教研团队）？还是完全机翻发布？
18. iOS Privacy Manifest 中第三方 SDK 隐私声明谁来维护？引入新 SDK 的审批流程？
19. 续费 / 营销 Telegram 模板的 4 语言版本由谁负责翻译与维护（教研 / 运营 / 翻译外包）？
20. 原中国版未决问题中『学员 AI 学习画像回流招生再营销』『AI 客服转人工 SLA』『分销归因窗口差异化』『进退步预警阈值是否分店可调』『家长授权单向/双向』『永久绑定在转分店时分销关系是否迁移』『弱网视频离线下载与版权』『证书是否区块链存证』8 项保留待客户确认。

## 九、使用建议
- 推荐用 Excel / WPS / Numbers 打开 `.xlsx` 文件查看，已设置首行冻结、筛选、列宽与端口着色。
- CSV 备份以 UTF-8 with BOM 编码，Excel 可直接打开不乱码，便于二次加工。
- 后续如客户对未决问题给出明确答复（特别是数据本地化与支付通道二选一/全选），将基于此清单进一步拆出原型与排期。
