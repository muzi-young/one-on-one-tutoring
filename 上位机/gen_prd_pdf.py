import markdown, pathlib, subprocess, tempfile

SRC = pathlib.Path("/Users/liyan/Desktop/4月份项目/我的 AI 项目/上位机/江苏神州半导体-上位机软件-PRD.md")
OUT = SRC.with_suffix(".pdf")

md_text = SRC.read_text("utf-8")
extensions = ["tables", "toc", "fenced_code", "sane_lists"]
html_body = markdown.markdown(md_text, extensions=extensions)

CSS = r"""
@page {
    size: A4;
    margin: 22mm 18mm 24mm 18mm;
    @top-center {
        content: "江苏神州半导体 — 上位机监控与控制软件 PRD v2.0";
        font-size: 8pt; color: #888;
        font-family: "PingFang SC", "Noto Sans SC", sans-serif;
    }
    @bottom-center {
        content: "第 " counter(page) " 页";
        font-size: 8pt; color: #888;
        font-family: "PingFang SC", "Noto Sans SC", sans-serif;
    }
}
@page :first { @top-center { content: none; } @bottom-center { content: none; } }
body {
    font-family: "PingFang SC", "Noto Sans SC", "Helvetica Neue", sans-serif;
    font-size: 10.5pt; line-height: 1.75; color: #222;
}
/* ---- Cover ---- */
.cover {
    page-break-after: always;
    display: flex; flex-direction: column;
    justify-content: center; align-items: center;
    min-height: 88vh; text-align: center;
}
.cover h1 { font-size: 30pt; color: #0d3b66; border: none; margin-bottom: 6px; }
.cover .sub { font-size: 15pt; color: #555; margin-bottom: 36px; letter-spacing: 2px; }
.cover .meta { font-size: 11pt; color: #666; line-height: 2.2; }
.cover .meta strong { color: #0d3b66; }
.cover .line { width: 120px; height: 3px; background: #0d3b66; margin: 24px auto; }
.cover .foot { margin-top: 50px; font-size: 9pt; color: #aaa; }
/* ---- Headings ---- */
h1 { font-size: 22pt; color: #0d3b66; border-bottom: 3px solid #0d3b66; padding-bottom: 5px; margin-top: 28px; }
h2 { font-size: 16pt; color: #0d3b66; border-bottom: 1.5px solid #c0d8f0; padding-bottom: 4px; margin-top: 22px; page-break-after: avoid; }
h3 { font-size: 13pt; color: #1a5fa0; margin-top: 16px; page-break-after: avoid; }
h4 { font-size: 11.5pt; color: #2a7ac0; margin-top: 12px; }
/* ---- Tables ---- */
table { width: 100%; border-collapse: collapse; margin: 8px 0 14px; font-size: 9.5pt; page-break-inside: auto; }
tr { page-break-inside: avoid; }
th { background: #0d3b66; color: #fff; font-weight: 600; padding: 6px 7px; text-align: left; border: 1px solid #0d3b66; }
td { padding: 5px 7px; border: 1px solid #d0d7de; vertical-align: top; }
tr:nth-child(even) td { background: #f4f8fc; }
/* ---- Code ---- */
code { font-family: "SF Mono","Menlo",monospace; font-size: 9pt; background: #eef3f8; padding: 1px 3px; border-radius: 3px; }
pre { background: #f6f8fa; border: 1px solid #d0d7de; border-radius: 4px; padding: 10px; font-size: 9pt; page-break-inside: avoid; }
/* ---- Misc ---- */
blockquote { border-left: 4px solid #0d3b66; margin: 10px 0; padding: 8px 14px; background: #f0f5fa; color: #333; }
ul,ol { margin: 4px 0; padding-left: 22px; }
li { margin-bottom: 2px; }
hr { border: none; border-top: 1.5px solid #c0d8f0; margin: 18px 0; }
strong { color: #0d3b66; }
p { margin: 5px 0; }
"""

COVER = """
<div class="cover">
    <h1>江苏神州半导体</h1>
    <div class="sub">上位机监控与控制软件</div>
    <div class="line"></div>
    <div class="sub" style="font-size:13pt; letter-spacing:1px;">产品需求文档（PRD）</div>
    <div class="meta">
        <p><strong>文档版本</strong>　v2.0</p>
        <p><strong>文档类型</strong>　产品需求规格说明书</p>
        <p><strong>创建日期</strong>　2026 年 4 月</p>
        <p><strong>更新说明</strong>　整合 2026-04-22 三次客户会议纪要</p>
    </div>
    <div class="foot">— 机密文档，仅限项目相关人员查阅 —</div>
</div>
"""

full_html = f"""<!DOCTYPE html>
<html lang="zh-CN">
<head><meta charset="utf-8"><style>{CSS}</style></head>
<body>
{COVER}
{html_body}
</body>
</html>"""

tmp = tempfile.NamedTemporaryFile(suffix=".html", delete=False, mode="w", encoding="utf-8")
tmp.write(full_html)
tmp.close()

print("正在生成 PDF（pandoc + typst）…")
r = subprocess.run([
    "pandoc", tmp.name,
    "-f", "html",
    "-o", str(OUT),
    "--pdf-engine=typst",
    "--variable", "mainfont=PingFang SC",
], capture_output=True, text=True)

if r.returncode != 0:
    print("pandoc+typst 失败，尝试直接方式…")
    print(r.stderr[:500] if r.stderr else "")
    r2 = subprocess.run([
        "pandoc", str(SRC),
        "-o", str(OUT),
        "--pdf-engine=typst",
        "--variable", "mainfont=PingFang SC",
        "-V", "geometry:margin=2cm",
    ], capture_output=True, text=True)
    if r2.returncode != 0:
        print("错误:", r2.stderr[:500])
    else:
        print(f"OK → {OUT}  ({OUT.stat().st_size/1024:.0f} KB)")
else:
    print(f"OK → {OUT}  ({OUT.stat().st_size/1024:.0f} KB)")

pathlib.Path(tmp.name).unlink(missing_ok=True)
