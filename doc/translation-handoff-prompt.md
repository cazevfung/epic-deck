# Epic Deck — English rewrite handoff (for external AI)

Use this entire document as the **system + task prompt**. Translate or rewrite **into professional English suitable for an Epic Games audience**. Preserve facts, numbers, and product names. Do **not** invent metrics or partnerships.

---

## 1. Project context

- **Artifact:** Full-screen HTML deck (`epic_deck_V2.html`), 17 slides (`data-slide="1"` … `"17"`).
- **Audience:** Epic Games stakeholders; tone is confident, factual, partnership-oriented — aligned with the deck’s **“务实叙事”** (pragmatic narrative): avoid hype, avoid claiming mass-market guarantees.
- **Primary merge target:** Strings below map to visible HTML / `aria-label` / image `alt` where noted. IDs are stable — the receiving side will merge by `id`.
- **Secondary:** Appendix **D** mirrors narrative-only copy from `doc/full-content.md` (reference doc; page numbers there use P1–P18 vs HTML’s 17 slides — treat as editorial source, not layout).

---

## 2. Locked glossary (do not rename casually)

| Term | Notes |
|------|--------|
| 心动 / X.D. Network | Company name |
| TapTap | Platform |
| Fortnite / 堡垒之夜 | Game — prefer **Fortnite** in English body copy |
| UEFN | Unreal Editor for Fortnite |
| FNCS | Fortnite Champion Series |
| 香肠派对 | **Sausage Man** (product name) |
| 心动小镇 | **Heartopia** (shown in deck) |
| 火炬之光：无限 | **Torchlight: Infinite** |
| 无畏契约 | **VALORANT** |
| 蛋仔派对 | **Egg Party** (NetEase) — competitor reference |
| 和平精英 / 绿洲启元 | **Peacekeeper Elite** / **Oasis Origin** — use established English names if unsure, keep CN in parentheses only if policy requires |
| Tim Sweeney | Person name |
| SAC | Epic Support-A-Creator–style programs — keep acronym, explain once if needed |
| THEMIS | XD security platform |

---

## 3. Length rules (mandatory)

1. **`hard_max_chars`** counts **spaces included** — Latin script, final English deliverable.
2. If the source is **already English**, treat `hard_max_chars` as **tight** (polish only); stay at or below the limit unless `soft: true`.
3. If **Chinese-heavy**, English often expands ~**1.8–2.2×** vs Chinese character count — the limits below already bake in layout headroom for titles and tight cards.
4. **`lines`:** do not exceed line intent (e.g. single-line eyebrow must remain one short line).
5. **Numbers / percentages / USD amounts:** keep verbatim unless grammar forces a minimal change.

---

## 4. Output format (required)

Return **only** valid **JSON**: one array of objects.

```json
[
  {
    "id": "slide03__header__h2",
    "en": "Final English string",
    "within_limit": true,
    "chars": 42,
    "notes": "optional: ambiguity / alt_short suggestion"
  }
]
```

Rules:

- **Every `id`** from sections A–D below must appear **exactly once**.
- Preserve **HTML entities** where the source uses them (e.g. `&amp;`) in **`en`** when the merge target expects HTML.
- Use `\n` **only** when the source row explicitly says multiline (`\n` in source).
- If over budget: provide best **`en`** anyway, set `"within_limit": false`, and add **`notes`** with a shorter alternative.

---

## A. UI chrome (navigation & shell)

| `id` | Location | Role | Lines | hard_max_chars | Source text |
|------|----------|------|-------|----------------|-------------|
| `ui__toc_top_label` | Left dock panel top | label | 1 | 12 | Pages |
| `ui__toc_close_aria` | Close button | aria | 1 | 40 | Close page list |
| `ui__toc_list_aria` | Nav list | aria | 1 | 40 | Slide index |
| `ui__toc_tab_title` | Tab tooltip | ui | 2 | 120 | Pages list — hover to open; B toggles; tap on touch |
| `ui__nav_hint` | Bottom-right hint | ui | 3 | 220 | ← → to navigate · hover Pages strip or B page list · #8 or #page-8 in URL opens that page · F fullscreen · P print |

---

## B. `epic_deck_V2.html` — slide-by-slide inventory

### Slide 01 — `data-slide="1"` (Cover)

| `id` | Location | Role | Lines | hard_max_chars | Source text |
|------|----------|------|-------|----------------|-------------|
| `slide01__img_alt_logo` | Cover logo image | alt | 1 | 12 | XD |
| `slide01__brand_tag` | Top brand strip | meta | 1 | 48 | 心动 × Epic Games · 2026 |
| `slide01__cover_title` | H1 | title | 2 | 72 | Fortnite China · Publishing Proposal |
| `slide01__meta_confidential` | Meta row | label | 1 | 24 | Confidential |
| `slide01__meta_date` | Meta row | label | 1 | 24 | April 2026 |

### Slide 02 — Market timing

| `id` | Location | Role | Lines | hard_max_chars | Source text |
|------|----------|------|-------|----------------|-------------|
| `slide02__eyebrow` | Header | eyebrow | 1 | 40 | Part 01 · Market timing |
| `slide02__h2` | Header | title | 1 | 36 | Things changed. |
| `slide02__page` | Header | meta | 1 | 16 | 02 / 17 |
| `slide02__old_eyebrow` | Left column | eyebrow | 1 | 8 | 2018 |
| `slide02__old_year` | Left column | display | 1 | 8 | 2018 |
| `slide02__old_state` | Left column | lead | 2 | 120 | Realism-led shooter market.\nCartoon + build = high barrier. |
| `slide02__old_desc` | Left column | body | 4 | 280 | When Fortnite first reached China, benchmarks for non-realistic shooting, UGC, and creator platforms were thin. Reference: PUBG Mobile (realism-first). |
| `slide02__img_alt_pubg` | Left visual | alt | 1 | 80 | PUBG Mobile — 写实军事风格主视觉参照 |
| `slide02__slot_pubg_title` | Left visual caption | caption | 1 | 56 | 写实战术竞技参照（如 PUBG Mobile） |
| `slide02__slot_pubg_hint` | Left visual hint | hint | 1 | 40 | 2018 写实战术竞技参照。 |
| `slide02__new_eyebrow` | Right column | eyebrow | 1 | 8 | 2026 |
| `slide02__new_year` | Right column | display | 1 | 8 | 2026 |
| `slide02__new_state` | Right column | lead | 2 | 130 | Style-diverse. Educated audience.\nNon-realistic & UGC at scale. |
| `slide02__new_desc` | Right column | body | 4 | 300 | Peacekeeper Elite and Delta Force raised the quality floor. Sausage Man, Egg Party, and Oasis Origin proved stylized shooters + UGC/creator appetite. |
| `slide02__img_alt_sausage` | Grid thumb | alt | 1 | 48 | 香肠派对 · 官方赛季宣传图 |
| `slide02__slot_sausage_title` | Grid caption | caption | 1 | 36 | 香肠派对 · 主视觉 |
| `slide02__slot_sausage_hint` | Grid hint | hint | 1 | 28 | 香肠派对主视觉。 |
| `slide02__img_alt_oasis` | Grid thumb | alt | 1 | 56 | 和平精英 · 绿洲启元编辑器宣传图 |
| `slide02__slot_oasis_title` | Grid caption | caption | 1 | 36 | 和平精英 · 绿洲启元 |
| `slide02__slot_oasis_hint` | Grid hint | hint | 1 | 28 | 绿洲启元编辑器。 |
| `slide02__img_alt_egg` | Grid thumb | alt | 1 | 40 | 蛋仔派对 · UGC 官方宣传图 |
| `slide02__slot_egg_title` | Grid caption | caption | 1 | 24 | 蛋仔派对 |
| `slide02__slot_egg_hint` | Grid hint | hint | 1 | 24 | 蛋仔派对 UGC。 |
| `slide02__img_alt_val` | Grid thumb | alt | 1 | 40 | VALORANT · 官方 Key Art |
| `slide02__slot_val_title` | Grid caption | caption | 1 | 40 | 无畏契约 · 国服主视觉 |
| `slide02__slot_val_hint` | Grid hint | hint | 1 | 28 | 无畏契约国服。 |

### Slide 03 — Three validations

| `id` | Location | Role | Lines | hard_max_chars | Source text |
|------|----------|------|-------|----------------|-------------|
| `slide03__eyebrow` | Header | eyebrow | 1 | 38 | Part 01 · Why Now |
| `slide03__h2` | Header | title | 2 | 52 | 市场条件已成熟 · 三个验证 |
| `slide03__page` | Header | meta | 1 | 16 | 03 / 17 |
| `slide03__card1_name` | Column 1 head | title | 1 | 44 | 香肠派对（Sausage Man） |
| `slide03__card1_tag` | Column 1 | tag | 1 | 8 | XD |
| `slide03__card1_sv1` | Column 1 stat | value | 1 | 12 | 8 年 |
| `slide03__card1_sl1` | Column 1 stat | label | 1 | 16 | 运营 |
| `slide03__card1_sv2` | Column 1 stat | value | 1 | 12 | ~27M |
| `slide03__card1_sl2` | Column 1 stat | label | 1 | 16 | Peak MAU |
| `slide03__card1_sv3` | Column 1 stat | value | 1 | 12 | 300M+ |
| `slide03__card1_sl3` | Column 1 stat | label | 1 | 16 | Downloads |
| `slide03__card1_img_alt` | Column 1 img | alt | 1 | 48 | 香肠派对 · 官方宣传图 |
| `slide03__card1_slot_title` | Column 1 caption | caption | 1 | 56 | 香肠派对 · 官方 Key Art / 游戏截图 |
| `slide03__card1_slot_hint` | Column 1 hint | hint | 1 | 36 | 验证① 非写实射击长线。 |
| `slide03__card1_concl` | Column 1 footer | body | 3 | 200 | 非写实射击长线可行 — 与 Fortnite 卡通渲染 + 模式平台化逻辑一致。 |
| `slide03__card2_name` | Column 2 head | title | 1 | 40 | 蛋仔派对（UGC 生态） |
| `slide03__card2_tag` | Column 2 | tag | 1 | 16 | NetEase |
| `slide03__card2_sv1` | Column 2 stat | value | 1 | 12 | 50M+ |
| `slide03__card2_sl1` | Column 2 stat | label | 1 | 16 | 创作者 |
| `slide03__card2_sv2` | Column 2 stat | value | 1 | 12 | 1亿+ |
| `slide03__card2_sl2` | Column 2 stat | label | 1 | 16 | UGC 地图 |
| `slide03__card2_sv3` | Column 2 stat | value | 1 | 12 | 3300万 |
| `slide03__card2_sl3` | Column 2 stat | label | 1 | 16 | 绿洲 DAU |
| `slide03__card2_img_alt` | Column 2 img | alt | 1 | 48 | 蛋仔派对 · UGC / Party 氛围 |
| `slide03__card2_slot_title` | Column 2 caption | caption | 1 | 48 | 蛋仔派对 · UGC / 编辑器心智 |
| `slide03__card2_slot_hint` | Column 2 hint | hint | 1 | 28 | 验证② UGC 生态。 |
| `slide03__card2_concl` | Column 2 footer | body | 4 | 260 | 亿级创作者与地图供给验证 UGC 心智；《绿洲启元》编辑器生态补强「派对 + 编辑器」心智与商业闭环。 |
| `slide03__card3_name` | Column 3 head | title | 1 | 36 | 心动小镇（Heartopia） |
| `slide03__card3_tag` | Column 3 | tag | 1 | 8 | XD |
| `slide03__card3_sv1` | Column 3 stat | value | 1 | 12 | 80M+ |
| `slide03__card3_sl1` | Column 3 stat | label | 1 | 16 | 国服下载 |
| `slide03__card3_sv2` | Column 3 stat | value | 1 | 24 | 首周 5M+ 新增 |
| `slide03__card3_sl2` | Column 3 stat | label | 1 | 16 | 国际首发 |
| `slide03__card3_sv3` | Column 3 stat | value | 1 | 16 | 规模化验证 |
| `slide03__card3_sl3` | Column 3 stat | label | 1 | 20 | 建造 / 社交 |
| `slide03__card3_img_alt` | Column 3 img | alt | 1 | 56 | 心动小镇 Heartopia · 官方主视觉 |
| `slide03__card3_slot_title` | Column 3 caption | caption | 1 | 56 | 心动小镇 · 官方主视觉 / 建造社交场景 |
| `slide03__card3_slot_hint` | Column 3 hint | hint | 1 | 28 | 验证③ 建造与社交。 |
| `slide03__card3_concl` | Column 3 footer | body | 3 | 200 | 建造与社交大盘可被年轻用户接受 — Zero Build 与社交循环可对标。 |

### Slide 04 — TapTap philosophy & exclusives

| `id` | Location | Role | Lines | hard_max_chars | Source text |
|------|----------|------|-------|----------------|-------------|
| `slide04__eyebrow` | Header | eyebrow | 1 | 44 | Part 01 · Core capabilities |
| `slide04__h2` | Header | title | 2 | 72 | 理念同盟 · TapTap 规模 · 为什么是我们 |
| `slide04__page` | Header | meta | 1 | 16 | 04 / 17 |
| `slide04__logo_alt` | TapTap logo | alt | 1 | 12 | TapTap |
| `slide04__values_label` | Card | section | 1 | 20 | 价值观同盟 |
| `slide04__row1_k` | Values row | key | 1 | 24 | 心动 / TapTap |
| `slide04__row1_v` | Values row | value | 1 | 56 | 0% 分成 · 玩家与开发者优先 |
| `slide04__row2_k` | Values row | key | 1 | 8 | Epic |
| `slide04__row2_v` | Values row | value | 1 | 72 | 反平台税立场 · 长线产品 · UEFN 创作者分成 |
| `slide04__row3_k` | Values row | key | 1 | 16 | 协同价值 |
| `slide04__row3_v` | Values row | value | 1 | 56 | 渠道不掠夺开发者收益 · 更健康 LTV/CAC |
| `slide04__row4_k` | Values row | key | 1 | 16 | 业务能力 |
| `slide04__row4_v` | Values row | value | 1 | 56 | 自研 30+ · 全球发行 · TapTap 游戏社区 |
| `slide04__kpi1_val` | KPI card | stat | 1 | 8 | 2012 |
| `slide04__kpi1_lbl` | KPI card | label | 1 | 16 | Founded |
| `slide04__kpi2_val` | KPI card | stat | 1 | 8 | 50M+ |
| `slide04__kpi2_lbl` | KPI card | label | 1 | 8 | MAU |
| `slide04__kpi3_val` | KPI card | stat | 1 | 8 | 800M+ |
| `slide04__kpi3_lbl` | KPI card | label | 1 | 24 | Annual downloads |
| `slide04__zero_value` | Zero badge | headline | 1 | 28 | 0% Platform Fee |
| `slide04__zero_sub` | Zero badge | sub | 1 | 24 | since day one |
| `slide04__exclusive_head` | Exclusives block | title | 1 | 24 | 独家游戏 |
| `slide04__exclusive_sub` | Exclusives block | sub | 1 | 48 | 代表性独占 · 主视觉示意 |
| `slide04__cap_terraria` | Cell caption | caption | 1 | 16 | 泰拉瑞亚 |
| `slide04__img_alt_terraria` | Cell img | alt | 1 | 36 | Terraria Steam 封面 |
| `slide04__frame_title` | Frame (shared) | label | 1 | 12 | Key Art |
| `slide04__hint_terraria` | Frame hint | hint | 1 | 36 | 泰拉瑞亚 · TapTap。 |
| `slide04__cap_dave` | Cell caption | caption | 1 | 20 | 潜水员戴夫 |
| `slide04__img_alt_dave` | Cell img | alt | 1 | 40 | 潜水员戴夫 · 官方 Key Art |
| `slide04__hint_dave` | Frame hint | hint | 1 | 40 | 潜水员戴夫 · TapTap。 |
| `slide04__cap_human` | Cell caption | caption | 1 | 24 | 人类跌落梦境 |
| `slide04__img_alt_human` | Cell img | alt | 1 | 36 | 人类跌落梦境 · 封面 |
| `slide04__hint_human` | Frame hint | hint | 1 | 44 | 人类跌落梦境 · TapTap。 |

### Slide 05 — Sausage Man proof

| `id` | Location | Role | Lines | hard_max_chars | Source text |
|------|----------|------|-------|----------------|-------------|
| `slide05__eyebrow` | Header | eyebrow | 1 | 36 | Proof · Genre credentials |
| `slide05__h2` | Header | title | 2 | 80 | 香肠派对 · 最接近国服的 Fortnite 平行体 |
| `slide05__page` | Header | meta | 1 | 16 | 05 / 17 |
| `slide05__logo_alt` | Logo img | alt | 1 | 40 | 香肠派对 Sausage Man logo |
| `slide05__aria_kpi` | KPI group | aria | 1 | 40 | 香肠派对核心规模指标 |
| `slide05__kpi1_val` | DNA KPI | num | 1 | 4 | 8 |
| `slide05__kpi1_lab` | DNA KPI | label | 1 | 16 | years live |
| `slide05__kpi1_sub` | DNA KPI | sub | 1 | 28 | continuous live-ops |
| `slide05__kpi2_val` | DNA KPI | num | 1 | 8 | 300M+ |
| `slide05__kpi2_lab` | DNA KPI | label | 1 | 16 | downloads |
| `slide05__kpi3_val` | DNA KPI | num | 1 | 8 | 27M |
| `slide05__kpi3_lab` | DNA KPI | label | 1 | 16 | peak MAU |
| `slide05__row_social_k` | Row | key | 1 | 24 | Social presence |
| `slide05__row_social_v` | Row | value | 1 | 72 | 3.3M Douyin · 4.7M Kuaishou · 43M TapTap |
| `slide05__row_anime_k` | Row | key | 1 | 24 | Companion anime |
| `slide05__row_anime_v` | Row | value | 1 | 56 | 15 seasons · 8.67B views |
| `slide05__row_ip_k` | Row | key | 1 | 20 | IP integrations |
| `slide05__row_ip_v` | Row | value | 2 | 120 | Ultraman · Kamen Rider · Sanrio · Douluo Dalu · Assassin Wulinxiao |
| `slide05__row_brand_k` | Row | key | 1 | 20 | Brand tie-ups |
| `slide05__row_brand_v` | Row | value | 1 | 48 | KFC · Pizza Hut · Wanglaoji |
| `slide05__fig_gp_aria` | Gameplay fig | aria | 1 | 28 | 香肠派对 游戏内画面 |
| `slide05__img_alt_gp` | Gameplay img | alt | 1 | 48 | 香肠派对 — 战术竞技玩法游戏内截图 |
| `slide05__hero_img_alt` | Hero visual | alt | 1 | 72 | 香肠派对 · Steam 页面主视觉（高清背景） |
| `slide05__hero_slot_title` | Hero caption | caption | 1 | 48 | 香肠派对 · 官方主视觉 / 截图 |
| `slide05__hero_slot_hint` | Hero hint | hint | 1 | 16 | 主视觉。 |
| `slide05__collab_label` | Collab strip | label | 1 | 56 | 联动厚度示意（86+ 案例管线可复用） |
| `slide05__collab_grid_aria` | Collab grid | aria | 1 | 48 | 香肠派对联动与品牌合作案例示意 |
| `slide05__c1_img_alt` | Thumb 1 | alt | 1 | 36 | 香肠派对 × 奥特曼 联动 |
| `slide05__c1_title` | Thumb 1 | caption | 1 | 28 | 奥特曼 · 联动主视觉 |
| `slide05__c1_hint` | Thumb 1 | hint | 1 | 20 | 奥特曼联动。 |
| `slide05__c2_img_alt` | Thumb 2 | alt | 1 | 36 | 香肠派对 × 假面骑士 联动 |
| `slide05__c2_title` | Thumb 2 | caption | 1 | 16 | 假面骑士 |
| `slide05__c2_hint` | Thumb 2 | hint | 1 | 20 | 假面骑士联动。 |
| `slide05__c3_img_alt` | Thumb 3 | alt | 1 | 36 | 香肠派对 × 三丽鸥 联动 |
| `slide05__c3_title` | Thumb 3 | caption | 1 | 12 | 三丽鸥 |
| `slide05__c3_hint` | Thumb 3 | hint | 1 | 20 | 三丽鸥联动。 |
| `slide05__c4_img_alt` | Thumb 4 | alt | 1 | 40 | 香肠派对 × 斗罗大陆 联动 |
| `slide05__c4_title` | Thumb 4 | caption | 1 | 28 | 斗罗大陆 / 伍六七 |
| `slide05__c4_hint` | Thumb 4 | hint | 1 | 16 | 国漫联动。 |
| `slide05__c5_img_alt` | Thumb 5 | alt | 1 | 36 | 香肠派对 × 肯德基 联动 |
| `slide05__c5_title` | Thumb 5 | caption | 1 | 28 | 肯德基 · 异业联动 |
| `slide05__c5_hint` | Thumb 5 | hint | 1 | 20 | 肯德基联动。 |
| `slide05__c6_img_alt` | Thumb 6 | alt | 1 | 36 | 香肠派对 × 王老吉 联动 |
| `slide05__c6_title` | Thumb 6 | caption | 1 | 28 | 必胜客 / 王老吉 |
| `slide05__c6_hint` | Thumb 6 | hint | 1 | 20 | 王老吉联名。 |

### Slide 06 — Torchlight + Heartopia

| `id` | Location | Role | Lines | hard_max_chars | Source text |
|------|----------|------|-------|----------------|-------------|
| `slide06__eyebrow` | Header | eyebrow | 1 | 36 | Proof · Global operations |
| `slide06__h2` | Header | title | 2 | 56 | 火炬之光：无限 + 心动小镇 |
| `slide06__page` | Header | meta | 1 | 16 | 06 / 17 |
| `slide06__thesis` | Lede | body | 2 | 140 | 全球赛季制长线运营 × 跨国同步首发 — 让国服成为全球生态的一环，而非「特供版」。 |
| `slide06__t_img_alt` | Torch img | alt | 1 | 36 | 火炬之光：无限 主视觉 |
| `slide06__t_cap_title` | Torch caption | title | 1 | 36 | 火炬之光：无限 |
| `slide06__t_cap_sub` | Torch caption | sub | 3 | 200 | UE4 · 稳定运营 13 个赛季 · 中国 / 欧美 / 韩国同步发行 — 与 Fortnite 同属 UE 技术栈与长线赛季节奏 |
| `slide06__t_chips_aria` | Torch chips | aria | 1 | 36 | Torchlight proof points |
| `slide06__t_chip_ue4` | Chip | chip | 1 | 8 | UE4 |
| `slide06__t_chip_seasons` | Chip | chip | 1 | 12 | 13 赛季 |
| `slide06__t_chip_sync` | Chip | chip | 1 | 16 | 多区同步 |
| `slide06__t_kpi_n1` | Torch KPI | value | 1 | 16 | 2000万+ |
| `slide06__t_kpi_l1` | Torch KPI | label | 1 | 16 | 全球下载 |
| `slide06__t_kpi_n2` | Torch KPI | value | 1 | 8 | 13+ |
| `slide06__t_kpi_l2` | Torch KPI | label | 1 | 28 | 赛季 · IP 长线投入 |
| `slide06__t_li1` | Torch bullet | bullet | 3 | 200 | UE4 长线赛季制 + 中美韩多区同步首发，国服并进全球版本与运营节奏。 |
| `slide06__t_li2` | Torch bullet | bullet | 3 | 220 | 买下「火炬之光」IP 后的持续投入：赛季内容、管线产能与跨国协同交付，而非单区短跑。 |
| `slide06__t_li3` | Torch bullet | bullet | 3 | 220 | 与 Fortnite 同属 UE 技术栈与长线赛季筹备经验，沉淀可迁移的工程与运营方法。 |
| `slide06__h_img_alt` | Heartopia img | alt | 1 | 40 | 心动小镇 Heartopia 主视觉 |
| `slide06__h_cap_title` | Heartopia caption | title | 1 | 36 | 心动小镇（Heartopia） |
| `slide06__h_cap_sub` | Heartopia caption | sub | 3 | 200 | 国服规模化验证 · 国际版首发 · 50+ 国家/地区 iOS 免费榜登顶（含美、日、韩） |
| `slide06__h_chips_aria` | Heartopia chips | aria | 1 | 36 | Heartopia proof points |
| `slide06__h_chip_1` | Chip | chip | 1 | 24 | #1 iOS 免费榜 |
| `slide06__h_chip_2` | Chip | chip | 1 | 24 | 国服 8000 万+ DL |
| `slide06__h_chip_3` | Chip | chip | 1 | 20 | 50+ 市场登顶 |
| `slide06__h_kpi_n1` | KPI | value | 1 | 16 | 8000 万+ |
| `slide06__h_kpi_l1` | KPI | label | 1 | 16 | 国服下载 |
| `slide06__h_kpi_n2` | KPI | value | 1 | 12 | 500 万 |
| `slide06__h_kpi_l2` | KPI | label | 1 | 24 | 国际版首周新增 |
| `slide06__h_kpi_n3` | KPI | value | 1 | 8 | 50+ |
| `slide06__h_kpi_l3` | KPI | label | 1 | 24 | 登顶国家/地区 |
| `slide06__h_li1` | Heartopia bullet | bullet | 3 | 220 | 国服规模化验证：高自由度建造 × 休闲社交跑通爆款；建造可作独立内容形态，非竞技附庸。 |
| `slide06__h_li2` | Heartopia bullet | bullet | 3 | 200 | 国际版首发与首周增量：跨国同期上线、全球发行落地与多市场协同执行。 |
| `slide06__h_li3` | Heartopia bullet | bullet | 4 | 260 | 50+ 国家/地区 iOS 免费榜登顶（含美、日、韩），跨国获客与发行覆盖 — 优先多国广度与国际增量。 |

### Slide 07 — RO × Disney / IP proof

| `id` | Location | Role | Lines | hard_max_chars | Source text |
|------|----------|------|-------|----------------|-------------|
| `slide07__eyebrow` | Header | eyebrow | 1 | 36 | Proof · Commercial assets |
| `slide07__h2` | Header | title | 2 | 56 | 全球顶级 IP 授权与衍生经验 |
| `slide07__page` | Header | meta | 1 | 16 | 07 / 17 |
| `slide07__bridge` | Bridge line | lead | 2 | 140 | 86+ 联动案例 · 建联—监修—上线 全链路 → 全球 IP 入华 + 中国 IP 出海 |
| `slide07__col1_label` | Column 1 | section | 1 | 36 | 迪士尼全球授权合作 |
| `slide07__col1_copy` | Column 1 | body | 3 | 200 | 跨区域法务、素材与衍生品协同，长线运营节奏支撑 Fortnite 全球 IP 入华。 |
| `slide07__col1_img_alt` | Column 1 img | alt | 1 | 56 | 仙境传说 RO × 迪士尼 联动 Key Visual |
| `slide07__col2_label` | Column 2 | section | 1 | 36 | 刺客伍六七（中国 IP） |
| `slide07__col2_copy` | Column 2 | body | 3 | 200 | 国服联动执行与监修尺度沉淀，可作为「中国 IP 出海」交付模板。 |
| `slide07__col2_img_alt` | Column 2 img | alt | 1 | 48 | 香肠派对 × 刺客伍六七 联动宣传图 |
| `slide07__col3_label` | Column 3 | section | 1 | 20 | 异业品牌 |
| `slide07__col3_copy` | Column 3 | body | 3 | 200 | 快消 × 游戏 — 单案 KV（右侧竖版 2:3，与左两列对齐）。 |
| `slide07__col3_img_alt` | Column 3 img | alt | 1 | 40 | 香肠派对 × 肯德基 联动主视觉 |
| `slide07__matrix_label` | Matrix | section | 1 | 28 | 更多联动案例 |
| `slide07__matrix_copy` | Matrix | note | 2 | 160 | 九宫格统一按方形裁切展示，后续你只要继续按 1:1 调整素材即可。 |
| `slide07__thumb_alt_01` | Grid thumb | alt | 1 | 12 | 奥特曼 |
| `slide07__thumb_alt_02` | Grid thumb | alt | 1 | 16 | 假面骑士 |
| `slide07__thumb_alt_03` | Grid thumb | alt | 1 | 12 | 三丽鸥 |
| `slide07__thumb_alt_04` | Grid thumb | alt | 1 | 12 | 熊出没 |
| `slide07__thumb_alt_05` | Grid thumb | alt | 1 | 16 | 斗罗大陆 |
| `slide07__thumb_alt_06` | Grid thumb | alt | 1 | 12 | 王老吉 |
| `slide07__thumb_alt_07` | Grid thumb | alt | 1 | 8 | 双汇 |
| `slide07__thumb_alt_08` | Grid thumb | alt | 1 | 16 | 主题赛季 |

### Slide 08 — Transition

| `id` | Location | Role | Lines | hard_max_chars | Source text |
|------|----------|------|-------|----------------|-------------|
| `slide08__h2` | Center | title | 1 | 36 | China Publishing Plan |
| `slide08__page` | Corner | meta | 1 | 16 | 08 / 17 |

### Slide 09 — Strategic positioning

| `id` | Location | Role | Lines | hard_max_chars | Source text |
|------|----------|------|-------|----------------|-------------|
| `slide09__eyebrow` | Header | eyebrow | 1 | 40 | Part 02 · Publishing plan |
| `slide09__h2` | Header | title | 1 | 24 | 战略定位 |
| `slide09__page` | Header | meta | 1 | 16 | 09 / 17 |
| `slide09__hero_en` | Left hero | headline | 4 | 180 | China's First\nCross-Media Interactive Platform. |
| `slide09__points_aria` | List | aria | 1 | 24 | 战略三要点 |
| `slide09__li1` | Bullet 1 | bullet | 6 | 420 | **机会**：不争高度成熟的战术竞技**存量赛道**——以游戏为基座、内容互动为核心、创作者与跨界合作为增长引擎，开辟**新认知赛道**与长期平台生态。 |
| `slide09__li2` | Bullet 2 | bullet | 5 | 380 | **用户**：已成熟接受线上娱乐内容的融合消费；不仅为「赢一局」付费或停留，也为社交、表达、参与、围观与文化认同**持续回流**。 |
| `slide09__li3` | Bullet 3 | bullet | 5 | 380 | **定位**：最优解不是单一竞技包装——而是可持续发生内容事件、承载创作者生态、连接品牌合作的**新一代互动平台**。 |
| `slide09__quad_aria` | Image row | aria | 1 | 56 | 游戏、创作者、社交与文化 — 四图横排 |
| `slide09__q1_aria` | Quad slot 1 | aria | 1 | 28 | Fortnite 战斗画面 |
| `slide09__q1_img_alt` | Quad img 1 | alt | 1 | 28 | Fortnite 战斗画面 |
| `slide09__q1_tag` | Quad tag | tag | 1 | 8 | Game |
| `slide09__q2_aria` | Quad slot 2 | aria | 1 | 28 | UEFN 编辑器界面 |
| `slide09__q2_img_alt` | Quad img 2 | alt | 1 | 28 | UEFN 编辑器界面 |
| `slide09__q2_tag` | Quad tag | tag | 1 | 12 | Creator |
| `slide09__q3_aria` | Quad slot 3 | aria | 1 | 40 | Fortnite Party Royale / 演唱会 |
| `slide09__q3_img_alt` | Quad img 3 | alt | 1 | 40 | Fortnite Party Royale 活动画面 |
| `slide09__q3_tag` | Quad tag | tag | 1 | 12 | Social |
| `slide09__q4_aria` | Quad slot 4 | aria | 1 | 36 | Fortnite × Marvel 联动 |
| `slide09__q4_img_alt` | Quad img 4 | alt | 1 | 36 | Fortnite × Marvel 联动 |
| `slide09__q4_tag` | Quad tag | tag | 1 | 12 | Culture |

### Slide 10 — Budget $30M

| `id` | Location | Role | Lines | hard_max_chars | Source text |
|------|----------|------|-------|----------------|-------------|
| `slide10__eyebrow` | Header | eyebrow | 1 | 44 | Year-one marketing investment |
| `slide10__h2` | Header | title | 2 | 80 | $30M · 「首发爆发 + 长线生态」双轮驱动 |
| `slide10__page` | Header | meta | 1 | 16 | 10 / 17 |
| `slide10__lede` | Lede | body | 4 | 380 | 首年我们建议投入总预算 <em>3000 万美元</em>，并以 <em>「首发爆发 + 长线生态」</em> 双轮驱动进行配置。预算不是单纯买量，而是围绕《堡垒之夜》的平台型定位进行系统化布局。（Merge：保留 `<em>` 或对应用 `<strong>` 与设计一致） |
| `slide10__donut_aria` | Chart | aria | 1 | 56 | 首年预算结构：悬停扇区或图例以高亮 |
| `slide10__donut_center_amt` | Donut | stat | 1 | 20 | $30,000,000 |
| `slide10__donut_center_lbl` | Donut | label | 1 | 16 | USD · 首年 |
| `slide10__leg_adv_title` | Legend row | title | 1 | 16 | 广告投放 |
| `slide10__leg_adv_sub` | Legend row | sub | 2 | 160 | 建立广泛市场认知、完成预约与下载转化，支撑重点版本放量。 |
| `slide10__leg_adv_pct` | Legend row | pct | 1 | 8 | 50% |
| `slide10__leg_adv_amt` | Legend row | amt | 1 | 8 | $15M |
| `slide10__leg_brand_title` | Legend row | title | 1 | 20 | 品牌与联动 |
| `slide10__leg_brand_sub` | Legend row | sub | 2 | 160 | 打造破圈事件、IP 联动、线下体验与首发社会化讨论。 |
| `slide10__leg_brand_pct` | Legend row | pct | 1 | 8 | 20% |
| `slide10__leg_brand_amt` | Legend row | amt | 1 | 8 | $6M |
| `slide10__leg_esports_title` | Legend row | title | 1 | 16 | 电竞赛事 |
| `slide10__leg_esports_sub` | Legend row | sub | 2 | 160 | 快速搭建中国本地赛事体系，提升核心玩家认同与长期生命力。 |
| `slide10__leg_esports_pct` | Legend row | pct | 1 | 8 | 15% |
| `slide10__leg_esports_amt` | Legend row | amt | 1 | 12 | $4.5M |
| `slide10__leg_ugc_title` | Legend row | title | 1 | 24 | UGC 内容创作 |
| `slide10__leg_ugc_sub` | Legend row | sub | 2 | 180 | 创作者内容供给、直播/视频传播与 UEFN 创作者生态。 |
| `slide10__leg_ugc_pct` | Legend row | pct | 1 | 8 | 15% |
| `slide10__leg_ugc_amt` | Legend row | amt | 1 | 12 | $4.5M |

### Slide 11 — Launch strategy

| `id` | Location | Role | Lines | hard_max_chars | Source text |
|------|----------|------|-------|----------------|-------------|
| `slide11__eyebrow` | Header | eyebrow | 1 | 28 | Publishing Plan |
| `slide11__h2` | Header | title | 2 | 88 | 首发策略（$6M）：Zero Build + IP / 线下 |
| `slide11__page` | Header | meta | 1 | 16 | 11 / 17 |
| `slide11__sec_zb` | Section | title | 1 | 36 | 首发玩法——Zero Build |
| `slide11__zb_aria` | ZB list | aria | 1 | 28 | 首发玩法要点 |
| `slide11__zb_li1` | ZB bullet | bullet | 3 | 240 | **首发主推 Zero Build**：对标国内成熟射击品类，降低建造学习成本，扩大新用户入口。 |
| `slide11__zb_li2` | ZB bullet | bullet | 3 | 240 | **体验路径分层上线**：先高强度快节奏对战；建造模式、创意地图与完整 UGC 生态后续逐步释放。 |
| `slide11__zb_li3` | ZB bullet | bullet | 3 | 220 | **避免首日堆复杂度**：用清晰进阶路径承接深度玩家，而非一次性堆满功能。 |
| `slide11__sec_ip` | Section | title | 1 | 36 | IP联动+线下大事件 |
| `slide11__ip_aria` | IP list | aria | 1 | 28 | IP 与线下要点 |
| `slide11__ip_li1` | IP bullet | bullet | 3 | 240 | **国民级 IP 首发联动**：国漫、影视等本土 IP 进入 Fortnite，制造话题与付费支点。 |
| `slide11__ip_li2` | IP bullet | bullet | 3 | 260 | **线下「可传播事件」**：快闪、沉浸装置、限时主题场，把线上热度延伸为可参与、可打卡的体验。 |
| `slide11__ip_li3` | IP bullet | bullet | 3 | 260 | **内容供给与扩散**：触达更广圈层，为短视频、直播与社交平台持续供给素材，放大首发窗口声量。 |
| `slide11__vis_group_aria` | Right visuals | aria | 1 | 72 | 配图：首发 Zero Build、线下沉浸体验与国漫 IP 参考 |
| `slide11__img_alt_zb` | Visual | alt | 1 | 36 | Fortnite Zero Build 模式 |
| `slide11__img_alt_offline` | Visual | alt | 1 | 40 | Fortnite 线下沉浸式品牌体验 |
| `slide11__img_alt_poster` | Visual | alt | 1 | 28 | 刺客伍六七 官方海报 |

### Slide 12 — Creator ecosystem

| `id` | Location | Role | Lines | hard_max_chars | Source text |
|------|----------|------|-------|----------------|-------------|
| `slide12__eyebrow` | Header | eyebrow | 2 | 72 | Creator ecosystem · 15% · $4,500,000 |
| `slide12__h2` | Header | title | 1 | 56 | 创作者生态——$4,500,000 |
| `slide12__page` | Header | meta | 1 | 16 | 12 / 17 |
| `slide12__sec_stream` | Section | title | 1 | 48 | 游戏直播与视频创作者激励 |
| `slide12__stream_aria` | List | aria | 1 | 56 | 直播与视频激励 · 受众目标与打法 |
| `slide12__stream_li1` | Bullet | bullet | 2 | 200 | **受众**：直播平台主播、短视频作者、攻略与娱乐向内容创作者。 |
| `slide12__stream_li2` | Bullet | bullet | 2 | 200 | **目标**：快速形成多层次内容矩阵，放大传播与话题扩散。 |
| `slide12__stream_li3` | Bullet | bullet | 3 | 240 | **难点**：SAC 联盟计划对中国用户相对陌生，认知与参与门槛偏高。 |
| `slide12__stream_li4` | Bullet | bullet | 3 | 280 | **解决方案**：以「内容激励 + SAC」组合推进，在中国创作者群体中逐步落地 SAC。 |
| `slide12__sec_uefn` | Section | title | 1 | 40 | 游戏内玩法创作者激励 |
| `slide12__uefn_aria` | List | aria | 1 | 56 | 玩法创作者激励 · 受众目标与打法 |
| `slide12__uefn_li1` | Bullet | bullet | 3 | 280 | **受众**：更深层的生态参与者——本地玩法 / 地图创作者与专业开发者（含 TapTap 开发者侧资源）。 |
| `slide12__uefn_li2` | Bullet | bullet | 3 | 320 | **目标**：沉淀中国本地创作者供给；从「官方发行的一款游戏」升级为「可持续生长的玩法平台」。 |
| `slide12__uefn_li3` | Bullet | bullet | 3 | 280 | **难点**：不止短期曝光，更要建立 UEFN 创作习惯与可持续的内容与变现路径。 |
| `slide12__uefn_li4` | Bullet | bullet | 6 | 480 | **解决方案**：结合 Creator Economy 2.0 与岛内交易（In-Island Transactions），用 UEFN 围绕本土文化与热点打造可传播玩法；联动 TapTap 号召中国游戏开发者参与 Fortnite 内容创作。 |
| `slide12__stack_aria` | Visual stack | aria | 1 | 56 | 配图：UEFN 全宽 · 下排直播与 TapTap 双列 |
| `slide12__img_alt_uefn_doc` | Hero img | alt | 1 | 28 | UEFN 官方文档界面 |
| `slide12__cap_uefn` | Hero figcaption | caption | 1 | 48 | UEFN 创作工具与地图开发 |
| `slide12__hint_uefn` | Hero hint | hint | 1 | 12 | UEFN。 |
| `slide12__img_alt_stream` | Thumb 1 | alt | 1 | 28 | 游戏直播 / 主播场景 |
| `slide12__cap_stream` | Thumb 1 cap | caption | 1 | 36 | 游戏直播 / 主播场景 |
| `slide12__hint_stream` | Thumb 1 hint | hint | 1 | 12 | 直播。 |
| `slide12__img_alt_taptap` | Thumb 2 | alt | 1 | 44 | TapTap 发布会 / 开发者活动 |
| `slide12__cap_taptap` | Thumb 2 cap | caption | 1 | 48 | TapTap 开发者与创作者招募场 |
| `slide12__hint_taptap` | Thumb 2 hint | hint | 1 | 28 | TapTap 开发者。 |

### Slide 13 — Esports

| `id` | Location | Role | Lines | hard_max_chars | Source text |
|------|----------|------|-------|----------------|-------------|
| `slide13__eyebrow` | Header | eyebrow | 1 | 28 | Esports · $4.5M |
| `slide13__h2` | Header | title | 1 | 56 | 建立中国赛事体系——$4,500,000 |
| `slide13__page` | Header | meta | 1 | 16 | 13 / 17 |
| `slide13__lede` | Lede | body | 5 | 420 | 赛事体系的作用，不只是服务少数高端玩家，而是帮助《堡垒之夜》在中国建立「可参与、可观看、可追随」的竞技叙事。这将提升产品的核心用户粘性，也将持续为直播、视频和社交平台提供高质量内容。 |
| `slide13__tri_aria` | Three-col | aria | 1 | 40 | 赛事体系三支柱 · 配图占位 |
| `slide13__c1_aria` | Col1 img | aria | 1 | 24 | 香肠派对大众赛事 |
| `slide13__c1_img_alt` | Col1 img | alt | 1 | 36 | 香肠派对菁英赛宣传 |
| `slide13__c1_subhead` | Col1 | subhead | 1 | 16 | 大众赛事 |
| `slide13__c1_p` | Col1 | body | 5 | 380 | 面向全体玩家的公开赛事，赛事体系、奖励、赛制设置与国际服保持一致。目标是让大众玩家都能感知并参与到《堡垒之夜》独特的竞技氛围，并有所收获。 |
| `slide13__c2_aria` | Col2 img | aria | 1 | 28 | 香肠派对总决赛舞台 |
| `slide13__c2_img_alt` | Col2 img | alt | 1 | 36 | 香肠派对众神杯总决赛现场 |
| `slide13__c2_subhead` | Col2 | subhead | 2 | 56 | 职业赛事（FNCS 国服赛区） |
| `slide13__c2_p` | Col2 | body | 5 | 380 | 国服独立的职业竞技周期，代表《堡垒之夜》国服最顶尖的竞技赛事，同时作为全球 FNCS 的中国赛区入口。让国内的职业玩家征战全球竞技的重要平台。 |
| `slide13__c3_aria` | Col3 img | aria | 1 | 24 | 主播联赛参考 |
| `slide13__c3_img_alt` | Col3 img | alt | 1 | 36 | 游戏主播联赛宣传参考 |
| `slide13__c3_subhead` | Col3 | subhead | 1 | 24 | 平台与主播联赛 |
| `slide13__c3_p` | Col3 | body | 5 | 380 | 联合直播平台、头部主播和内容阵地发起中型赛事，兼顾观赏性与传播性。目标是通过内容平台赛事提升《堡垒之夜》在核心圈层中的讨论热度。 |

### Slide 14 — UA / paid media timeline

| `id` | Location | Role | Lines | hard_max_chars | Source text |
|------|----------|------|-------|----------------|-------------|
| `slide14__eyebrow` | Header | eyebrow | 1 | 28 | User acquisition |
| `slide14__h2` | Header | title | 1 | 56 | 全年投放计划——$15,000,000 |
| `slide14__page` | Header | meta | 1 | 16 | 14 / 17 |
| `slide14__ua_ph1_name` | `.ua-phase-name` | label | 1 | 24 | 预热期 |
| `slide14__ua_ph1_money` | `.ua-phase-money` | fixed | 1 | 16 | $3,000,000 |
| `slide14__ua_ph1_desc` | `.ua-phase-desc` | body | 5 | 400 | 面向泛游戏用户、回归老玩家和内容平台受众，通过品牌视频、预约传播、KOL 首轮种草和核心媒体曝光，建立《堡垒之夜》回归中国市场的第一波认知。 |
| `slide14__ua_ph2_name` | `.ua-phase-name` | label | 1 | 24 | 日常版本 |
| `slide14__ua_ph2_money` | `.ua-phase-money` | fixed | 1 | 16 | $1,000,000 |
| `slide14__ua_ph2_desc` | `.ua-phase-desc` | body | 3 | 260 | 保持市场存在感、覆盖节庆节点、支撑社群活动，并对高潜人群进行持续触达。 |
| `slide14__ua_ph3_name` | `.ua-phase-name` | label | 1 | 24 | 日常版本 |
| `slide14__ua_ph3_money` | `.ua-phase-money` | fixed | 1 | 12 | $500,000 |
| `slide14__ua_ph3_desc` | `.ua-phase-desc` | body | 3 | 260 | 保证全年热度不断档，为下一个大版本和下一年运营保留增长基础。 |
| `slide14__ua_ph4_name` | `.ua-phase-name` | label | 1 | 20 | 公测期 |
| `slide14__ua_ph4_money` | `.ua-phase-money` | fixed | 1 | 12 | $6,000,000 |
| `slide14__ua_ph4_desc` | `.ua-phase-desc` | body | 5 | 400 | 是把认知快速转化为下载、激活与开服声量。同时配合主播直播、短视频传播和公测庆典事件，共同形成最大化市场引爆。 |
| `slide14__ua_ph5_name` | `.ua-phase-name` | label | 1 | 28 | 版本更新期 |
| `slide14__ua_ph5_money` | `.ua-phase-money` | fixed | 1 | 16 | $4,500,000 |
| `slide14__ua_ph5_desc` | `.ua-phase-desc` | body | 5 | 420 | 唤醒沉默用户重新放大内容势能。围绕新版本卖点、新活动、新联动和社区高光时刻进行再传播，让产品不陷入「上线即高点」的单峰曲线。 |
| `slide14__foot` | Footer | body | 5 | 440 | 首年总预算中的 50% 将投入线上投放，但投放节奏不是平均分配，而是围绕产品生命周期和关键节点进行分阶段推进，以确保每一轮预算都服务于不同阶段目标。 |

`slide14__ua_ph*_money`: usually **copy verbatim** into English JSON (same ASCII); included so the array parser can validate completeness.

### Slide 15 — Compliance

| `id` | Location | Role | Lines | hard_max_chars | Source text |
|------|----------|------|-------|----------------|-------------|
| `slide15__eyebrow` | Header | eyebrow | 1 | 36 | Operational Readiness |
| `slide15__h2` | Header | title | 1 | 40 | Compliance & operations |
| `slide15__page` | Header | meta | 1 | 16 | 15 / 17 |
| `slide15__c1_title` | Card 1 | title | 1 | 28 | Minor Protection |
| `slide15__c1_li1` | Card 1 | bullet | 1 | 48 | Real-name + face verification |
| `slide15__c1_li2` | Card 1 | bullet | 1 | 48 | Playtime limits per national rules |
| `slide15__c1_li3` | Card 1 | bullet | 1 | 40 | Age-tiered spending caps |
| `slide15__c1_li4` | Card 1 | bullet | 1 | 48 | Integrated with global account system |
| `slide15__c2_title` | Card 2 | title | 1 | 24 | Refund Policy |
| `slide15__c2_li1` | Card 2 | bullet | 1 | 56 | Platform-specific flows (iOS / Android / PC) |
| `slide15__c2_li2` | Card 2 | bullet | 1 | 44 | Minor-refund legal compliance |
| `slide15__c2_li3` | Card 2 | bullet | 1 | 40 | Malicious-refund detection |
| `slide15__c3_title` | Card 3 | title | 1 | 20 | Anti-Cheat |
| `slide15__c3_li1` | Card 3 | bullet | 2 | 88 | Easy Anti-Cheat + THEMIS (XD in-house security platform) |
| `slide15__c3_li2` | Card 3 | bullet | 1 | 56 | Transferred from Sausage Man's 8-year live environment |
| `slide15__c3_li3` | Card 3 | bullet | 1 | 44 | Dedicated PC vs. mobile strategy |
| `slide15__c4_title` | Card 4 | title | 1 | 20 | UGC Review |
| `slide15__c4_li1` | Card 4 | bullet | 1 | 56 | Tiered: machine pre-screen + human review |
| `slide15__c4_li2` | Card 4 | bullet | 2 | 120 | Standards aligned with China regulation on political / sexual / copyright content |
| `slide15__c4_li3` | Card 4 | bullet | 1 | 52 | Creator appeal and feedback mechanism |
| `slide15__c5_title` | Card 5 | title | 1 | 28 | Licensing & Data |
| `slide15__c5_li1` | Card 5 | bullet | 1 | 32 | NPPA license pathway |
| `slide15__c5_li2` | Card 5 | bullet | 1 | 36 | CN-resident data storage |
| `slide15__c5_li3` | Card 5 | bullet | 1 | 40 | Cross-border transfer review |

### Slide 16 — Tech sync

| `id` | Location | Role | Lines | hard_max_chars | Source text |
|------|----------|------|-------|----------------|-------------|
| `slide16__eyebrow` | Header | eyebrow | 1 | 32 | Technical alignment |
| `slide16__h2` | Header | title | 2 | 80 | 国服交付：全球节奏对齐 × UEFN 内容管线 |
| `slide16__lede` | Header lede | lead | 2 | 120 | 赛季与补丁跟随全球主干；内容与账号走合规管道与约定栈。 |
| `slide16__page` | Header | meta | 1 | 16 | 16 / 17 |
| `slide16__col1_label` | Left | section | 1 | 24 | 全球节奏对齐 |
| `slide16__c1_li1` | Left list | bullet | 2 | 200 | 赛季与重大更新：与全球同节拍；个别联动按监修单独排期。 |
| `slide16__c1_li2` | Left list | bullet | 2 | 200 | 热修：主干一致；支付、实名、安全等走国服补丁通道。 |
| `slide16__c1_li3` | Left list | bullet | 2 | 200 | 联机：默认国服体验；与全球互通仅在政策允许范围内。 |
| `slide16__img_alt_bp` | Left img | alt | 1 | 72 | Fortnite Battle Pass UI — selectable reward tracks |
| `slide16__col2_label` | Right | section | 1 | 28 | UEFN 与国服栈 |
| `slide16__c2_li1` | Right list | bullet | 3 | 260 | UEFN：创作—审核—发布管线；国服内容池与全球 Discover 规则化对接。 |
| `slide16__c2_li2` | Right list | bullet | 2 | 220 | 内容进出：机审 + 人审；双向流通边界事先固定。 |
| `slide16__c2_li3` | Right list | bullet | 3 | 260 | 反作弊与日志：EAC + THEMIS（自研安全平台）；登录接微信/手机/未成年，不割裂 Epic 账号叙事。 |
| `slide16__img_alt_uefn` | Right img | alt | 1 | 56 | Unreal Editor for Fortnite (UEFN) |
| `slide16__foot` | Footer line | punchline | 1 | 48 | 能跟跟全球，该分有路径。 |

### Slide 17 — Closing

| `id` | Location | Role | Lines | hard_max_chars | Source text |
|------|----------|------|-------|----------------|-------------|
| `slide17__h2` | Center | headline | 2 | 72 | 诚邀一起打造中国Fortnite |
| `slide17__page` | Corner | meta | 1 | 16 | 17 / 17 |

---

## C. Slide page labels (optional localization)

These strings appear as **TOC entries** via JavaScript (`slideLabel`). They are derived from slide content; if you localize body copy, regenerate or translate these labels for consistency.

| `id` | Role | hard_max_chars | Source pattern |
|------|------|----------------|----------------|
| `toc_derived__note` | note | — | Translate titles on slides 1–17 so TOC buttons match; no fixed IDs — regenerate list after merge. |

---

## D. Appendix — `doc/full-content.md` narrative copy

*(Page mapping in this doc: **P1–P18**; HTML deck uses **17 slides** — content below is the **written brief**, not all on-canvas.)*

| `id` | Section | Role | Lines | hard_max_chars | Source text |
|------|---------|------|-------|----------------|-------------|
| `doc__title` | YAML/title | title | 2 | 120 | 心动 × Epic Games \| Fortnite 国服发行合作提案 |
| `doc__theme` | Meta | body | 2 | 200 | **提案主题：** "中国第一个跨界内容互动平台" —— 我们一起打造中国的Fortnite平台 |
| `doc__party_a` | Meta | label | 1 | 56 | **提案方：** 心动网络 (X.D. Network Inc.) |
| `doc__party_b` | Meta | label | 1 | 40 | **合作方：** Epic Games |
| `doc__date` | Meta | label | 1 | 24 | **日期：** 2026年4月 |
| `doc__outline_intro` | Directory | body | 8 | 400 | （目录章节标题列表 — 见源文件「目录」一节；翻译时保留可点击结构若输出 Markdown） |
| `doc__overview_table_caption` | Table | caption | 1 | 40 | Deck 结构概览 |
| `doc__s2_heading` | §2 | title | 1 | 48 | 中国市场现状：务实叙事 |
| `doc__s2_pragmatic` | §2 | body | 4 | 360 | 基于**"务实叙事"**原则（不夸大预期、控制热度、强调"吃好蛋糕"而非"全民爆款"），重新调整市场分析： |
| `doc__s2_shift_heading` | §2 | title | 1 | 48 | 核心转变：从"写实主导"到"风格多元" |
| `doc__s2_shift_p1` | §2 | body | 6 | 520 | 2018年《Fortnite》首次进入中国时，市场刚从《绝地求生》的写实审美中起步，卡通渲染+建造玩法的双重陌生感导致用户门槛过高。今天，这一前提已根本改变： |
| `doc__s2_nonreal_heading` | §2 | title | 1 | 40 | 非写实射击验证长线可行性： |
| `doc__s2_nonreal_li1` | §2 | bullet | 3 | 320 | 香肠派对以卡通画风BR持续运营8年（最高月活2700万），证明了中国玩家对非写实射击的长线付费意愿与社区忠诚度 |
| `doc__s2_nonreal_li2` | §2 | bullet | 3 | 320 | 2024年《无畏契约》以"英雄射击+潮流风格"实现月活5000万，进一步验证了风格化射击已跨越"教育市场"阶段，成为主流选项之一 |
| `doc__s2_edu_heading` | §2 | title | 1 | 28 | 市场教育已完成： |
| `doc__s2_edu_li1` | §2 | bullet | 4 | 400 | 《蛋仔派对》（5000万创作者、1亿张UGC地图）与《和平精英绿洲启元》（3300万DAU编辑器生态）已培育出数千万规模的UGC创作者群体，并建立了可变现的商业闭环 |
| `doc__s2_edu_li2` | §2 | bullet | 2 | 280 | 这证明中国玩家已深度接受"游戏内创作内容"的逻辑，无需从零解释"为什么要建造" |
| `doc__s2_xd_heading` | §2 | title | 1 | 36 | 心动自身验证建造类可行性： |
| `doc__s2_xd_li1` | §2 | bullet | 3 | 380 | 《心动小镇》（国服8000万+下载，国际版首周500万新增）验证了高自由度建造系统在中国的规模化可行性，证明建造可作为独立内容形态（非仅竞技工具）存在 |
| `doc__s2_explore_heading` | §2 | title | 1 | 40 | 再试试？我们愿意一起探索可能性 |
| `doc__s2_explore_li1` | §2 | bullet | 3 | 360 | 中国市场的环境已今非昔比，玩家对创新玩法的接受度、UGC生态的成熟度以及文化IP的国际影响力都达到了新高度。 |
| `doc__s2_explore_li2` | §2 | bullet | 4 | 420 | 作为中国一家结合平台、研发、发行的游戏公司，我们的理念和Epic的非常相符、且具备扎根中国、面向全球的游戏发行能力，能以灵活（nimble）开放（open）的合作模式，激活中国优质的玩家群体。 |
| `doc__s2_explore_li3` | §2 | bullet | 2 | 280 | 我们愿意与Epic一起探索《Fortnite》在中国发行的新的可能性。 |
| `doc__s3_narrative_heading` | §3 | title | 1 | 48 | 核心叙事 |
| `doc__s3_narrative_lead` | §3 | body | 2 | 200 | **非写实射击 + 长线UGC平台 = 心动的独占领域** |
| `doc__s3_narrative_p` | §3 | body | 3 | 360 | 在中国，同时具备"卡通射击长线运营经验" + "零分成平台生态"的发行商，只有心动。这是《Fortnite》在中国成功的两个必要条件，而心动是唯一同时满足的团队。 |
| `doc__flow_title` | Flow | title | 1 | 40 | 发行方案主轴逻辑（叙事 Flow） |
| `doc__flow_block` | Flow | body | 20 | 900 | （整段 Flow 列表：平台定位 → IP巡演 → 预算落地 → 全年龄生态 → 技术对接 — 请对 `doc/full-content.md` 第218–236行全文翻译并遵守合并后的长度；此处为引用块） |

**For `doc__flow_block` source lines 218–236 (verbatim):**

```
平台定位（是什么）
↓
IP巡演（怎么做 - 核心策略）
├── 双轨IP联动（全球IP入华 + 中国IP出海）
├── 中国IP商业化案例证明（斗罗大陆 + 刺客伍六七）
├── 虚拟演唱会 + 品牌合作
└── 创作者经济生态
↓
预算落地（资源怎么配）
├── 总览：3000万美元 + 四板块战略优先级
├── 线上投放（50% - 核心获客）
├── 电竞赛事（15% - 基础生态）
├── 内容UGC（15% - 生态建设）
└── IP首发/巡演（20% - 冷启动）
↓
全年龄生态（合规翻转）
↓
技术对接（可行性保障）
```

---

## E. Count checklist

- **Section A:** 5 IDs  
- **Section B:** 17 slides — **one row per `id` in tables above** (HTML deck body + `epic_deck_V2.html`; slide 14 uses **15** IDs: 5×(name + money + desc))  
- **Section C:** informational only (`toc_derived__note` — no JSON row required)  
- **Section D:** appendix doc strings — **~25** explicit + `doc__flow_block`; **does not exhaust** every table cell in `full-content.md` §3—extend the same schema if you need full parity with that manuscript.

The external AI **must emit one JSON array** covering **every `id`** listed in sections **A**, **B**, and **D** (skip `toc_derived__note`).

---

## F. File reference

| File | Purpose |
|------|---------|
| `epic_deck_V2.html` | Primary merge target for section B |
| `doc/full-content.md` | Extended narrative for section D |
| This file | `doc/translation-handoff-prompt.md` |

---

*Generated for the Epic Deck workspace — IDs are stable for scripted merge into HTML.*
