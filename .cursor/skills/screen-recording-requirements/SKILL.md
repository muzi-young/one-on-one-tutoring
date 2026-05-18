---
name: screen-recording-requirements
description: Turn meeting screen recordings or their transcripts into structured client functional requirements (FR), scope, open questions, and acceptance hints. Use when users mention 录屏、会议录像、demo 录像、客户需求整理、需求清单、从录像提炼需求, or attach mp4/mov with requirement-extraction intent.
---

# Screen Recording → Client Requirements

## Purpose

Guide agents to extract and organize **customer functional requirements** from screen recordings or equivalent sources (transcript, captions, key frames), with clear assumptions vs facts and a handoff-ready spec outline.

## When to Use

- User shares a **录屏 / 会议录像 / 产品演示录像** and wants **功能需求**、**用户故事**、**范围**、**优先级**。
- User has **文字稿 / 字幕 / 会议纪要** derived from a recording and wants structured requirements.
- User asks to **对齐客户口头需求**与可交付范围。

## Source Handling (Important)

1. **优先使用可检索文本**：录音/录像的 **逐字稿、智能纪要、SRT 字幕、导出 TXT** —— 便于逐条引用与去重。
2. **纯视频文件**：若环境无法直接解析视频，请让用户补充 **文字稿** 或 **关键时间戳 + 截图**；不要编造未听见的内容。
3. **截图 / 关键帧**：用于界面上的字段名、流程按钮、报表列名等 **可视事实**；口头描述用于 **意图与规则**。

## Workflow

1. **确认输入形态**：视频 / 文稿 / 混合；是否含演示系统画面。
2. **分段摘录事实**：按时间或话题块列出 **客户原话要点**（可标注 `[客户]` / `[我方]`）。
3. **提炼功能需求**：每条 FR 使用「角色 + 动作 + 对象 + 约束」；区分 **Must / Should / Could**（若客户未明说则标为 **待确认**）。
4. **非功能与边界**：性能、权限、集成、数据迁移、上线窗口等单列；明确 **不在范围内** 若对话中有暗示。
5. **开放问题清单**：每条含 **问谁、影响什么 FR、建议默认假设**。
6. **验收提示**：为每条核心 FR 写 1–3 条可验证的 **验收线索**（界面、数据、报表、接口行为）。

## Output Format

输出建议使用以下 Markdown 结构（可按项目模板微调）：

- `## 背景与目标`
- `## 利益相关方与术语`
- `## 功能需求（FR 表）` — 列：ID | 描述 | 优先级 | 来源（时间戳/原文摘要）| 备注
- `## 用户流程 / 用例摘要`
- `## 数据与集成（若有）`
- `## 非功能需求（若有）`
- `## 范围外 / 待二期`
- `## 开放问题`
- `## 风险与依赖`

## Quality Checklist

- [ ] 每条 FR 尽量可追溯到 **原文或画面事实**，未证实处标 **假设**。
- [ ] 无 **幻觉功能**：录像/文稿未提及的不写进 Must。
- [ ] 开放问题已覆盖 **歧义、冲突、缺失关键数字** 三类。
- [ ] 语言与用户一致（中文客户则中文输出为主）。
