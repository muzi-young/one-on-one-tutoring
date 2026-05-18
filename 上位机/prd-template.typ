// PRD Typst Template — 江苏神州半导体 上位机软件

#set document(
  title: "江苏神州半导体 — 上位机监控与控制软件 PRD v2.0",
  author: "项目组",
)

#set page(
  paper: "a4",
  margin: (top: 2.5cm, bottom: 2.5cm, left: 2cm, right: 2cm),
  header: context {
    if counter(page).get().first() > 1 [
      #set text(8pt, fill: rgb("#888"))
      #h(1fr)
      江苏神州半导体 — 上位机监控与控制软件 PRD v2.0
      #h(1fr)
      #line(length: 100%, stroke: 0.4pt + rgb("#ccc"))
    ]
  },
  footer: context {
    if counter(page).get().first() > 1 [
      #line(length: 100%, stroke: 0.4pt + rgb("#ccc"))
      #set text(8pt, fill: rgb("#888"))
      #h(1fr)
      第 #counter(page).display() 页
      #h(1fr)
    ]
  },
)

#set text(
  font: ("PingFang SC", "Noto Sans SC", "Helvetica Neue"),
  size: 10.5pt,
  lang: "zh",
)

#set par(leading: 0.9em, justify: true)

#show heading.where(level: 1): it => {
  pagebreak(weak: true)
  v(0.5cm)
  block[
    #set text(22pt, weight: "bold", fill: rgb("#0d3b66"))
    #it.body
    #v(2pt)
    #line(length: 100%, stroke: 2.5pt + rgb("#0d3b66"))
  ]
  v(0.3cm)
}

#show heading.where(level: 2): it => {
  v(0.4cm)
  block[
    #set text(15pt, weight: "bold", fill: rgb("#0d3b66"))
    #it.body
    #v(2pt)
    #line(length: 100%, stroke: 1pt + rgb("#c0d8f0"))
  ]
  v(0.2cm)
}

#show heading.where(level: 3): it => {
  v(0.3cm)
  block[
    #set text(12.5pt, weight: "bold", fill: rgb("#1a5fa0"))
    #it.body
  ]
  v(0.15cm)
}

#show heading.where(level: 4): it => {
  v(0.2cm)
  block[
    #set text(11pt, weight: "bold", fill: rgb("#2a7ac0"))
    #it.body
  ]
  v(0.1cm)
}

#set table(
  stroke: 0.5pt + rgb("#d0d7de"),
  inset: 6pt,
)

#show table.cell.where(y: 0): set text(fill: white, weight: "bold", size: 9pt)
#show table.cell.where(y: 0): set cell(fill: rgb("#0d3b66"))
#show table.cell: it => {
  if it.y > 0 and calc.rem(it.y, 2) == 0 {
    set cell(fill: rgb("#f4f8fc"))
    it
  } else {
    it
  }
}

#show raw.where(block: true): it => {
  block(
    width: 100%,
    fill: rgb("#f6f8fa"),
    stroke: 0.5pt + rgb("#d0d7de"),
    radius: 3pt,
    inset: 10pt,
  )[
    #set text(9pt, font: ("SF Mono", "Menlo", "Courier New"))
    #it
  ]
}

#show raw.where(block: false): it => {
  box(
    fill: rgb("#eef3f8"),
    radius: 2pt,
    inset: (x: 3pt, y: 1pt),
  )[
    #set text(9pt, font: ("SF Mono", "Menlo", "Courier New"))
    #it
  ]
}

#show quote: it => {
  block(
    width: 100%,
    fill: rgb("#f0f5fa"),
    inset: (left: 16pt, rest: 10pt),
    stroke: (left: 4pt + rgb("#0d3b66")),
  )[
    #set text(fill: rgb("#333"))
    #it.body
  ]
}

// ===== COVER PAGE =====
#page(header: none, footer: none)[
  #v(6cm)
  #align(center)[
    #text(32pt, weight: "bold", fill: rgb("#0d3b66"))[江苏神州半导体]
    #v(0.8cm)
    #text(18pt, fill: rgb("#555"), tracking: 2pt)[上位机监控与控制软件]
    #v(0.4cm)
    #line(length: 30%, stroke: 2.5pt + rgb("#0d3b66"))
    #v(0.4cm)
    #text(14pt, fill: rgb("#555"), tracking: 1pt)[产品需求文档（PRD）]
    #v(2cm)
    #set text(11pt, fill: rgb("#666"))
    #grid(
      columns: (auto, auto),
      column-gutter: 1em,
      row-gutter: 0.8em,
      align: (right, left),
      [*文档版本*], [v2.0],
      [*文档类型*], [产品需求规格说明书],
      [*创建日期*], [2026 年 4 月],
      [*更新说明*], [整合 2026-04-22 三次客户会议纪要],
    )
    #v(4cm)
    #text(9pt, fill: rgb("#aaa"))[— 机密文档，仅限项目相关人员查阅 —]
  ]
]

// ===== BODY (inserted by pandoc) =====
$body$
