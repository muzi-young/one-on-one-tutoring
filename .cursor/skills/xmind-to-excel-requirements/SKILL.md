---
name: xmind-to-excel-requirements
description: Parses XMind (.xmind) mind maps into a detailed functional-requirements-style checklist and exports or drafts tabular Excel (xlsx/csv) columns. Use when users mention XMind、脑图转需求、xmind 转 Excel、需求清单、.xmind 分析, or attach an .xmind file for requirement extraction.
---

# XMind → Excel 需求清单

## Purpose

将 **XMind 脑图** 中的层级与节点正文 **系统化拆解** 为可评审、可跟踪的 **需求清单表**（Excel 友好），保留 **导图路径** 便于回溯，并区分 **事实（导图原文）** 与 **推断（补充字段）**。

## When to Use

- 用户提供 **`.xmind` 文件** 或导图 **导出 JSON/Markdown**，希望生成 **Excel 需求表**。
- 用户说 **脑图转需求、xmind 分析、需求清单、PRD 条目化** 等。

## XMind 文件要点（执行层）

1. **`.xmmind` 本质是 ZIP**：先解压到临时目录（勿改原文件）。
2. **常见内容文件**（择一存在即可）：
   - 新版常见：`content.json`（或多 sheet 时 `sheet-*.json`），内含 `rootTopic` / `title` / `children`（`attached` 数组为子节点）。
   - 旧版或部分文件：`content.xml`（XML 树解析主题）。
3. **解析顺序**：定位 `manifest.json`（若有）→ 找到主内容 JSON/XML → **按树深度优先** 遍历，记录从根到叶的 **路径**（用 `>` 或 `/` 连接各级标题）。
4. **备注、标签、任务信息**：若节点含 `notes`（plain/html）、`labels`、`markers`，并入「备注 / 标签」列，勿丢失。

若环境不便跑脚本，可用 **解压 + 阅读 `content.json`** 人工还原树，再填表；能跑命令时优先用 **Python `zipfile` + `json`** 自动遍历。

## Workflow

1. **确认交付物**：`xlsx`（推荐）或 `csv`；是否沿用项目既有需求编号规则。
2. **完整读树**：导出所有叶子与有意义的中间节点（若中间节点本身是「需求句」也保留为独立行）。
3. **逐条规范化**（对每条导图节点）：
   - **标题** → 压缩为需求短名（必要时改写为「主语+动作+对象」）。
   - **正文/备注** → 详细说明、验收要点、数据规则。
   - **优先级**：导图图标/标签映射为 P0–P3 或 Must/Should/Could；**无则标「待确认」**。
4. **去重与合并**：同一语义多节点合并一行，在「来源路径」中用分号列出多条路径。
5. **生成表**：按下方列定义输出；**必须**包含「导图路径」列以便核对。
6. **自检**：随机抽 3–5 行用导图路径在源文件中 **可点击式核对**（标题链存在）。

## Excel 列定义（默认）

| 列名 | 说明 |
|------|------|
| 需求ID | REQ-001 递增；或用户指定前缀 |
| 模块 | 导图第 1–2 层归纳的模块名 |
| 需求名称 | 简短动宾短语 |
| 详细描述 | 节点标题 + notes 合并后的完整说明 |
| 类型 | 功能 / 数据 / 接口 / 报表 / 权限 / 非功能 / 其他（据内容归类） |
| 优先级 | P0–P3 或 Must/Should/Could / 待确认 |
| 导图路径 | 根到该节点的完整标题链 |
| 标签/图标 | 来自导图 labels/markers |
| 依赖/前置 | 从文中抽取或空 |
| 验收要点 | 1–3 条可验证描述（无则写「待补充」） |
| 状态 | 默认「草稿」 |

列顺序可按用户模板调整；**不得删除**「导图路径」与「详细描述」两列语义。

## 生成 Excel 的实现偏好

- **首选**：Python + `openpyxl` 写 `xlsx`（多 sheet 时可按原导图 sheet 分表）。
- **备选**：输出 **UTF-8 BOM 的 CSV**，Excel 可直接打开。
- 节点数 **>200** 时仍用程序写文件，避免在聊天里贴巨型表格。

## Quality Checklist

- [ ] 表中每条需求在导图中 **有路径可查**，无路径的不写入或标为「待核实来源」。
- [ ] 未在导图中出现的约束、数字、接口名 **不当作事实**；若补充须标 **【推断】**。
- [ ] 保留原语言；中英混排时 **不强行统一翻译** 除非用户要求。
- [ ] 输出文件路径明确（如项目 `exports/` 下），并提示用户用 Excel 打开校验合并单元格与筛选。
