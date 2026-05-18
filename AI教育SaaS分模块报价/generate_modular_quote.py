#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""从通俗版需求 xlsx 生成分模块报价 HTML（人天估算 + 费用表）。"""
from __future__ import annotations

import html as html_lib
import math
from pathlib import Path

import openpyxl

XLSX = Path(
    "/Users/liyan/Desktop/4月份项目/我的 AI 项目/"
    "AI教育培训SaaS平台需求清单/AI教育培训SaaS平台-需求功能清单_通俗版.xlsx"
)
OUT_HTML = Path(__file__).resolve().parent / "AI教育培训SaaS平台-分模块报价方案.html"

RATE_BE = 1800
RATE_FE = 1500
RATE_UI = 1000
RISK_PCT = 0.10

BE_KW = [
    "支付", "订单", "财务", "结算", "权限", "审计", "备份", "三方", "证书", "考试",
    "直播", "排课", "课表", "分销", "退款", "发票", "编号", "规则", "模板", "奖惩",
    "目标", "组织架构", "分店", "消息", "Telegram", "合规", "隐私", "注销", "绑定",
    "恢复", "对接", "Webhook", "AI", "知识库", "客服", "运营", "数据看板", "商业智能",
    "BI", "统计", "报表", "预警", "作业", "批改", "考务", "试听", "续费", "催费",
    "初审", "入库", "Webhook",
]
FE_KW = [
    "直播", "视频", "回放", "白板", "看板", "图表", "营销", "Banner", "Push", "筛选",
    "搜索", "多维度", "弱网", "播放", "笔记", "时间轴", "驾驶舱", "排名", "趋势",
    "透明", "分销推广", "参与", "优惠券", "拼团", "积分", "签到", "收藏", "浏览",
    "详情", "多语言", "语言",
]


def load_modules() -> list[dict]:
    wb = openpyxl.load_workbook(XLSX, read_only=True, data_only=True)
    ws = wb["通俗版需求"]
    current_port = current_block = None
    modules: list[dict] = []
    cur_key = None
    cur_feats: list[dict] = []
    for row in ws.iter_rows(min_row=2, values_only=True):
        port, block, feat, desc, note = (row + (None,) * 5)[:5]
        if port:
            current_port = str(port).strip()
        if block:
            current_block = str(block).strip()
        key = (current_port, current_block)
        if cur_key != key and cur_key is not None:
            modules.append({"port": cur_key[0], "block": cur_key[1], "features": cur_feats})
            cur_feats = []
        cur_key = key
        if feat:
            cur_feats.append(
                {
                    "name": str(feat).strip(),
                    "desc": (desc or "") and str(desc).strip(),
                    "note": (note or "") and str(note).strip(),
                }
            )
    if cur_key is not None:
        modules.append({"port": cur_key[0], "block": cur_key[1], "features": cur_feats})
    wb.close()
    return modules


def blob(m: dict) -> str:
    parts = [m["block"]]
    for f in m["features"]:
        parts.append(f["name"])
        if f["desc"]:
            parts.append(f["desc"])
    return " ".join(parts)


def estimate_days(m: dict) -> tuple[int, int, int, str]:
    n = len(m["features"])
    b = blob(m)
    be_hit = sum(1 for k in BE_KW if k in b)
    fe_hit = sum(1 for k in FE_KW if k in b)
    be = n * 0.42 + be_hit * 0.28
    fe = n * 0.48 + fe_hit * 0.32
    if m["port"] == "总后台":
        be *= 1.12
        fe *= 1.05
    if m["port"] in ("分店教务端", "分机构端"):
        be *= 1.05
        fe *= 1.08
    if m["port"] == "APP合规隐私":
        fe *= 0.85
    be = max(1.0, be)
    fe = max(1.0, fe)
    be_i = int(math.ceil(be - 1e-9))
    fe_i = int(math.ceil(fe - 1e-9))
    ui_raw = n * 0.22 + min(fe_i, 6) * 0.08
    ui_i = int(round(ui_raw))
    ui_i = max(0, ui_i)
    cap = fe_i // 2
    ui_i = min(ui_i, cap)
    rationale_parts = [
        f"共 {n} 个功能点",
        f"后端侧重接口、权限、数据与业务规则（命中复杂度关键词约 {be_hit} 项）",
        f"前端侧重页面、交互与可视化（命中交互/展示类关键词约 {fe_hit} 项）",
    ]
    if m["port"] == "总后台":
        rationale_parts.append("总后台含配置、审计与跨端数据聚合，后端略增")
    if "直播" in b or "视频" in b or "回放" in b:
        rationale_parts.append("含音视频/直播链路，联调与弱网场景占用前后端工时")
    if "支付" in b or "订单" in b or "财务" in b or "结算" in b:
        rationale_parts.append("含交易/账务/对账逻辑，接口与幂等处理成本较高")
    if "AI" in b or "知识库" in b:
        rationale_parts.append("含 AI/知识库检索与内容治理，涉及向量或检索服务对接")
    rationale = "；".join(rationale_parts) + "。"
    return be_i, fe_i, ui_i, rationale


def feature_summary(m: dict, max_show: int = 4) -> str:
    names = [f["name"] for f in m["features"]]
    n = len(names)
    head = "、".join(names[:max_show])
    if n > max_show:
        return f"{head} 等共 {n} 项"
    return head if head else "—"


def esc(s: str) -> str:
    return html_lib.escape(s, quote=True)


def main() -> None:
    modules = load_modules()
    rows: list[dict] = []
    sum_be = sum_fe = sum_ui = 0
    sum_cost = 0.0
    for m in modules:
        be, fe, ui, why = estimate_days(m)
        assert ui <= fe / 2 + 1e-6, (m, be, fe, ui)
        sub = be + fe + ui
        cost = be * RATE_BE + fe * RATE_FE + ui * RATE_UI
        sum_be += be
        sum_fe += fe
        sum_ui += ui
        sum_cost += cost
        mod_label = f"{m['port']} — {m['block']}"
        rows.append(
            {
                "module": mod_label,
                "summary": feature_summary(m),
                "be": be,
                "fe": fe,
                "ui": ui,
                "sub": sub,
                "cost": cost,
                "why": why,
            }
        )

    risk_amt = round(sum_cost * RISK_PCT, 2)
    grand = round(sum_cost + risk_amt, 2)
    total_pd = sum_be + sum_fe + sum_ui

    # 功能摘要统计
    total_feats = sum(len(m["features"]) for m in modules)
    ports = {}
    for m in modules:
        ports[m["port"]] = ports.get(m["port"], 0) + len(m["features"])

    port_rows = "".join(
        f"<tr><td>{esc(p)}</td><td style='text-align:right'>{c}</td></tr>"
        for p, c in sorted(ports.items(), key=lambda x: -x[1])
    )

    mod_rows = "".join(
        "<tr>"
        f"<td>{esc(r['module'])}</td>"
        f"<td class='small'>{esc(r['summary'])}</td>"
        f"<td class='small'>{esc(r['why'])}</td>"
        f"<td class='num'>{r['be']}</td>"
        f"<td class='num'>{r['fe']}</td>"
        f"<td class='num'>{r['ui']}</td>"
        f"<td class='num'><strong>{r['sub']}</strong></td>"
        f"<td class='num'>{r['cost']:,.0f}</td>"
        "</tr>"
        for r in rows
    )

    html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>AI 教育培训 SaaS 平台 — 分模块开发报价方案</title>
<style>
  :root {{
    --bg: #f6f8fc;
    --card: #ffffff;
    --text: #1a2332;
    --muted: #5c6b7f;
    --line: #e2e8f0;
    --accent: #3b82f6;
    --accent-soft: #e8f0fe;
  }}
  * {{ box-sizing: border-box; }}
  body {{
    margin: 0;
    padding: 32px 20px 48px;
    font-family: "Microsoft YaHei", "PingFang SC", "Noto Sans SC", "Source Han Sans SC", sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.65;
    font-size: 15px;
  }}
  .wrap {{
    max-width: 1180px;
    margin: 0 auto;
  }}
  header {{
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 28px 32px;
    margin-bottom: 24px;
    box-shadow: 0 1px 3px rgba(15, 23, 42, 0.06);
  }}
  header h1 {{
    margin: 0 0 8px;
    font-size: 22px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }}
  header p {{
    margin: 0;
    color: var(--muted);
    font-size: 14px;
  }}
  section {{
    background: var(--card);
    border: 1px solid var(--line);
    border-radius: 12px;
    padding: 24px 28px 28px;
    margin-bottom: 20px;
    box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
  }}
  section h2 {{
    margin: 0 0 16px;
    font-size: 17px;
    font-weight: 600;
    color: #0f172a;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--accent-soft);
  }}
  table {{
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }}
  th, td {{
    border: 1px solid var(--line);
    padding: 10px 12px;
    vertical-align: top;
  }}
  th {{
    background: var(--accent-soft);
    color: #1e3a5f;
    font-weight: 600;
    text-align: left;
    white-space: nowrap;
  }}
  td.num {{
    text-align: right;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }}
  td.small {{
    font-size: 13px;
    color: #334155;
    max-width: 320px;
  }}
  .note {{
    font-size: 13px;
    color: var(--muted);
    margin-top: 12px;
  }}
  .pill {{
    display: inline-block;
    background: var(--accent-soft);
    color: #1d4ed8;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 500;
    margin-right: 8px;
  }}
  footer {{
    text-align: center;
    color: var(--muted);
    font-size: 12px;
    margin-top: 24px;
  }}
</style>
</head>
<body>
<div class="wrap">
  <header>
    <h1>AI 教育培训 SaaS 平台 · 分模块开发报价方案</h1>
    <p>依据《需求功能清单（通俗版）》结构化拆解；报价币种：人民币（元）；人天为估算工作量。</p>
    <p style="margin-top:10px"><span class="pill">数据源</span>{esc(str(XLSX.name))} · 工作表「通俗版需求」</p>
  </header>

  <section>
    <h2>一、需求 / 功能摘要（来自清单表格）</h2>
    <p>清单列为：<strong>端口</strong>、<strong>板块</strong>、<strong>功能点</strong>、<strong>详细功能描述</strong>、<strong>备注</strong>。本报价以「端口 + 板块」为模块粒度，共 <strong>{len(modules)}</strong> 个模块，合计 <strong>{total_feats}</strong> 条功能点。</p>
    <table>
      <thead><tr><th>端口（端侧）</th><th style="text-align:right">功能点条数</th></tr></thead>
      <tbody>{port_rows}</tbody>
    </table>
    <p class="note">说明：同一端口下多板块合并统计；详细功能点名称见下一节各模块「功能点概要」列。</p>
  </section>

  <section>
    <h2>二、分模块工作量与费用</h2>
    <p class="note">单价：后端 {RATE_BE} 元/人天；前端 {RATE_FE} 元/人天；UI 设计 {RATE_UI} 元/人天。设计人天按规则控制为不超过对应模块前端人天的 50%。</p>
    <div style="overflow-x:auto">
    <table>
      <thead>
        <tr>
          <th>模块（端口 — 板块）</th>
          <th>功能点概要</th>
          <th>估算说明（与清单功能挂钩）</th>
          <th>后端人天</th>
          <th>前端人天</th>
          <th>设计人天</th>
          <th>小计人天</th>
          <th>模块费用（元）</th>
        </tr>
      </thead>
      <tbody>
        {mod_rows}
      </tbody>
    </table>
    </div>
  </section>

  <section>
    <h2>三、汇总表</h2>
    <table>
      <thead>
        <tr><th>项目</th><th style="text-align:right">数值</th></tr>
      </thead>
      <tbody>
        <tr><td>模块数量</td><td class="num">{len(modules)}</td></tr>
        <tr><td>功能点条数（合计）</td><td class="num">{total_feats}</td></tr>
        <tr><td>后端人天合计</td><td class="num">{sum_be}</td></tr>
        <tr><td>前端人天合计</td><td class="num">{sum_fe}</td></tr>
        <tr><td>UI 设计人天合计</td><td class="num">{sum_ui}</td></tr>
        <tr><td><strong>人天总计（后端+前端+设计）</strong></td><td class="num"><strong>{total_pd}</strong></td></tr>
        <tr><td>人工成本小计（元，未含风险缓冲）</td><td class="num">{sum_cost:,.2f}</td></tr>
        <tr><td>风险缓冲（10%）</td><td class="num">{risk_amt:,.2f}</td></tr>
        <tr><td><strong>含税风险后总价（元）</strong></td><td class="num"><strong>{grand:,.2f}</strong></td></tr>
      </tbody>
    </table>
  </section>

  <section>
    <h2>四、单价与计费说明</h2>
    <table>
      <thead><tr><th>角色</th><th>单价（元 / 人天）</th><th>说明</th></tr></thead>
      <tbody>
        <tr><td>后端开发</td><td class="num">{RATE_BE}</td><td>接口、业务规则、数据模型、第三方对接、联调与自测。</td></tr>
        <tr><td>前端开发</td><td class="num">{RATE_FE}</td><td>Web/App 端页面、组件、状态与接口联调、兼容性处理。</td></tr>
        <tr><td>UI 设计</td><td class="num">{RATE_UI}</td><td>关键页面视觉与交互稿；各模块设计人天 ≤ 该模块前端人天的 50%。</td></tr>
      </tbody>
    </table>
    <p class="note">第三方服务（短信、对象存储、直播、支付等）产生的官方费用、服务器与域名等基础设施费用不含在本开发报价内，可按实际单独列支或代采。</p>
  </section>

  <section>
    <h2>五、风险缓冲与总价</h2>
    <table>
      <thead><tr><th>项目</th><th style="text-align:right">金额（元）</th></tr></thead>
      <tbody>
        <tr><td>开发人工成本小计（未含风险）</td><td class="num">{sum_cost:,.2f}</td></tr>
        <tr><td>风险缓冲（10%）</td><td class="num">{risk_amt:,.2f}</td></tr>
        <tr><td><strong>推荐报价总价（含 10% 风险缓冲）</strong></td><td class="num"><strong>{grand:,.2f}</strong></td></tr>
      </tbody>
    </table>
    <p class="note">人天为基于清单颗粒度的经验估算，签约前建议结合分期范围、MVP 裁剪与原型评审做一次联合评估微调。</p>
  </section>

  <footer>本文件由脚本根据需求清单自动生成，可直接用 Chrome / Safari / Firefox 打开浏览。</footer>
</div>
</body>
</html>
"""

    OUT_HTML.write_text(html, encoding="utf-8")
    print("Wrote", OUT_HTML)
    print("TOTAL_PD", total_pd)
    print("COST_BEFORE_RISK", round(sum_cost, 2))
    print("GRAND", grand)


if __name__ == "__main__":
    main()
