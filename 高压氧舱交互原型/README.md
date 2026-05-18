# Hyperbaric Chamber — Interactive Prototypes

## How to open locally

1. Open any `.html` in **Chrome**, **Safari**, or **Firefox** via **File → Open** (or drag the file into the browser).
2. Recommended entry: **`index.html`** — choose role and `hbot_lang` (EN/中文) persists via `localStorage`.
3. All assets are **self-contained** (inline CSS/JS, no CDN). Works offline.

## Screen map (quick)

| File | Primary areas |
|------|----------------|
| **`family-mobile.html`** | Refined **Western SaaS** styling (indigo accent, card shadows, focus rings). **First-run wizard** (overlay). **Home** shortcuts open **safety modal** (quick check → full checklist or Mark OK); skeleton refresh; invite; links to **Weekly insights** (bar chart + stacked mix + skeleton reload), **Notifications** (chip filters + inbox skeleton on enter), **Diagnostics**, **Help**. **History**: Calendar / List / **Insights** (streak cards + CSS trend). **Plan**: usage meter, benefits list, lease & orders. **Profile** → **Preferences** (motion/haptics toggles, units). **Notification prefs modal** (channel switches). **Session detail** stats grid + PDF stub. **Live** / **Plans** / **Legal** unchanged in role; bottom nav **More** includes **Preferences**. |
| **`hq-admin-pc.html`** | Sidebar adds **Fleet map** (grid pins + clinic rollup + filters) and **Reports** (presets + export modal). **Settlement** tabs: Payouts / **Invoice aging** / **Adjustments**. **Audit** search + actor filter + extra row. **RBAC** matrix + Support column + extra permissions. **Alerts**: workflow column (**Open / Assigned / Resolved**), **Assign…** modal, **Resolve** actions. **Policy** split view: template table + **editor stub** (YAML textarea, diff/save toasts). Overview KPIs, directory, integrations, print preview unchanged in spirit. |
| **`clinic-pc.html`** | **Patients** roster: payer, next HBOT, **Chart** toast. **Schedule**: **week strip** (day focus). **Inventory** pills: **Consumables / Device kits / Expiry watch**. **Staff shifts** tab (coverage table + swap request). **Revenue & statements**: tabs **Treatment log · HQ reconciliation · Exceptions**; **Printable receipt** modal (preview + print). Intake, live board, quality, disputes as before. |

## Demo script (suggested)

| Step | Action |
|------|--------|
| 1 | **`index.html`**: switch EN/中文; open each persona. |
| 2 | **Family**: replay wizard via clearing `hbot_family_wizard_done`; **Safety checklist** opens **modal** → try **Full checklist** or **Mark OK**; **History → Insights**; **Notifications** chips + enter screen for skeleton; **Profile → Preferences** + **Notification prefs** modal; **Analytics → Reload charts**; **Session** from calendar → stats + export toast. |
| 3 | **HQ**: **Fleet map** filters; **Reports → Configure export → Queue**; **Settlements** three tabs + CSV toast; **Audit** search/actor; **Policies** editor save/diff; **Alerts** assign + resolve. |
| 4 | **Clinic**: roster **Chart**; schedule **week strip**; inventory sub-tabs; **Staff shifts → Request swap**; **Revenue** reconciliation tabs; **Printable receipt → Print**. |

## Role mapping (from Excel + assumptions)

| Excel source | Prototype file | Notes |
|--------------|----------------|-------|
| 家庭用户端（移动App/小程序） | `family-mobile.html` | Mobile frame ~390px; rental / purchase types from sheet. |
| 总部管理后台 | `hq-admin-pc.html` | Map areas are **schematic placeholders** (no map SDK). |
| 诊所合作端（Web端） | `clinic-pc.html` | Scoped to “this clinic” data only. |
| 设备边缘终端 | *No separate UI* | Firmware / hardware layer; telemetry in HQ “Devices / Health” views. |

## Assumptions (where the spreadsheet is thin)

1. **Exact RBAC matrix** — Excel names roles but not per-screen permissions; prototypes show a generic “role badge” and masked actions for non-admin where relevant.
2. **Payment providers** — Third-party flows are mocked; no real PSP keys.
3. **GPS / geofence** — Polygon editor from Excel is simplified to “radius + center” in some demos.
4. **Real-time data** — Manual **Refresh** and random-ish demo numbers.
5. **Multi-step approvals** — Some flows stop at toast/modal for stakeholder review only.

---

*Generated from project materials; iterated for richer UX demos.*
