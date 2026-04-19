#!/usr/bin/env python3
"""
Merge epic_deck_translation_v2.json (id -> en) into XD_Epic_Fortnite-China-Plan.html
using source strings from doc/translation-handoff-prompt.md.

- Deduplicates identical (handoff source, en) pairs so duplicate UI strings
  are only replaced once.
- Replaces longest source strings first to avoid breaking longer substrings.
- Handles a few structural cases (slide09 hero, slide05 proof rows).
"""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
HANDOFF = ROOT / "doc" / "translation-handoff-prompt.md"
JSON_PATH = ROOT / "epic_deck_translation_v2.json"
HTML_PATH = ROOT / "XD_Epic_Fortnite-China-Plan.html"


def clean_handoff_source(s: str) -> str:
    s = s.strip()
    for marker in ("（Merge：", "(Merge:", "（Merge:"):
        if marker in s:
            s = s.split(marker)[0].strip()
    return s


def parse_handoff() -> dict[str, str]:
    out: dict[str, str] = {}
    for line in HANDOFF.read_text(encoding="utf-8").splitlines():
        if not line.startswith("| `"):
            continue
        if "`id`" in line and "Source text" in line:
            continue
        m = re.match(
            r"^\|\s*`([^`]+)`\s*\|(?:[^|]*\|){4}\s*([^|]*)\s*\|\s*$",
            line,
        )
        if not m:
            continue
        sid, src = m.group(1), m.group(2)
        if not (sid.startswith("slide") or sid.startswith("ui")):
            continue
        if sid == "id":
            continue
        out[sid] = clean_handoff_source(src)
    return out


def md_bolds_to_html(s: str) -> str:
    return re.sub(
        r"\*\*(.+?)\*\*",
        lambda m: f"<strong>{m.group(1)}</strong>",
        s,
    )


def fix_bare_ampersands(s: str) -> str:
    return re.sub(
        r"&(?!amp;|lt;|gt;|quot;|apos;|#[0-9]+;|#x[0-9a-fA-F]+;)",
        "&amp;",
        s,
    )


def handoff_source_to_html_body(source: str) -> str:
    s = source.replace("\\n", "<br>")
    s = s.replace("\n", "<br>")
    s = md_bolds_to_html(s)
    s = fix_bare_ampersands(s)
    s = s.replace("&amp;amp;", "&amp;")
    return s


def en_to_html_body(en: str) -> str:
    s = en.replace("\r\n", "\n").replace("\r", "\n")
    s = md_bolds_to_html(s)
    s = s.replace("\n", "<br>")
    s = fix_bare_ampersands(s)
    s = s.replace("&amp;amp;", "&amp;")
    return s


def en_to_attr_value(en: str) -> str:
    s = en.replace("\r\n", " ").replace("\r", " ").replace("\n", " ")
    s = re.sub(r"\*\*(.+?)\*\*", r"\1", s)
    s = s.replace("&", "&amp;")
    s = s.replace('"', "&quot;")
    return s


def is_probably_in_attr(context_before: str) -> bool:
    tail = context_before[-280:].lower()
    for k in ('alt="', 'aria-label="', 'title="'):
        pos = tail.rfind(k)
        if pos != -1 and tail.rfind(">", pos) < pos:
            return True
    return False


def build_cover_h1_html(en: str) -> str:
    s = en.replace("\r\n", "\n").replace("\r", "\n")
    s = fix_bare_ampersands(md_bolds_to_html(s))
    lines = [p for p in s.split("\n") if p.strip()]
    return "<br>".join(lines) if lines else s


def build_hero_en_html(en: str) -> str:
    parts = [p for p in en.replace("\r\n", "\n").split("\n") if p.strip()]
    if not parts:
        return ""
    if len(parts) == 1:
        return en_to_html_body(en)
    first = en_to_html_body(parts[0])
    rest = en_to_html_body("\n".join(parts[1:]))
    return f'{first}<br><span class="purple">{rest}</span>'


def format_proof_stat_spans(en: str) -> str:
    parts = [p.strip() for p in en.split(" · ") if p.strip()]
    pieces: list[str] = []
    for p in parts:
        m = re.match(r"^([\d.,]+[BMK]?)\s+(.+)$", p)
        if m:
            pieces.append(
                f'<span class="proof-stat-num">{m.group(1)}</span> {m.group(2)}'
            )
            continue
        m2 = re.match(r"^(\d+)\s+(.+)$", p)
        if m2:
            pieces.append(
                f'<span class="proof-stat-num">{m2.group(1)}</span> {m2.group(2)}'
            )
            continue
        if re.fullmatch(r"[\d.,]+[BMK]?", p):
            pieces.append(f'<span class="proof-stat-num">{p}</span>')
            continue
        pieces.append(p)
    return " · ".join(pieces)


def replace_slide05_proof_rows(html: str, social_en: str, anime_en: str) -> str:
    def repl_social(m: re.Match[str]) -> str:
        inner = format_proof_stat_spans(social_en)
        return m.group(1) + inner + m.group(3)

    def repl_anime(m: re.Match[str]) -> str:
        inner = format_proof_stat_spans(anime_en)
        return m.group(1) + inner + m.group(3)

    html = re.sub(
        r'(<span class="k">Social presence</span><span class="v">)(.*?)(</span></div>)',
        repl_social,
        html,
        count=1,
        flags=re.DOTALL,
    )
    html = re.sub(
        r'(<span class="k">Companion anime</span><span class="v">)(.*?)(</span></div>)',
        repl_anime,
        html,
        count=1,
        flags=re.DOTALL,
    )
    return html


def apply_slide09_hero(html: str, en: str) -> str:
    inner = build_hero_en_html(en)

    def repl(m: re.Match[str]) -> str:
        return m.group(1) + inner + m.group(3)

    return re.sub(
        r'(<p class="strategic-hero-en">)(.*?)(</p>)',
        repl,
        html,
        count=1,
        flags=re.DOTALL,
    )


def old_variants(raw_src: str) -> list[str]:
    raw_src = raw_src.strip()
    body = handoff_source_to_html_body(raw_src)
    plain_one_line = raw_src.replace("\\n", " ").replace("\n", " ")
    plain_body = fix_bare_ampersands(md_bolds_to_html(plain_one_line))
    seen: set[str] = set()
    out: list[str] = []
    for o in (body, plain_body, raw_src.replace("\\n", "<br>")):
        if o and o not in seen:
            seen.add(o)
            out.append(o)
    return out


def run(apply: bool) -> int:
    handoff = parse_handoff()
    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    by_id = {row["id"]: row["en"] for row in data}

    target_ids = sorted(
        [i for i in by_id if i.startswith("slide") or i.startswith("ui")],
        key=lambda i: len(handoff.get(i, "")),
        reverse=True,
    )

    pair_first_id: dict[tuple[str, str], str] = {}
    for sid in target_ids:
        if sid not in handoff:
            continue
        raw = handoff[sid].strip()
        en = by_id[sid]
        key = (raw, en)
        pair_first_id.setdefault(key, sid)

    missed: list[str] = []

    html = HTML_PATH.read_text(encoding="utf-8")

    # Same handoff source "国服下载" → different en in JSON (slide03 card3 vs slide06):
    # fix slide06 before global replace turns the other occurrence into "CN Downloads".
    html, n_tk = re.subn(
        r'(<div class="torch-kpi-card-lbl">)国服下载(</div>)',
        r"\1" + by_id["slide06__h_kpi_l1"] + r"\2",
        html,
        count=1,
    )
    if n_tk != 1:
        missed.append("slide06__h_kpi_l1 (torch label not found)")

    # Structural: slide09 hero (handoff source does not match styled HTML)
    html = apply_slide09_hero(html, by_id["slide09__hero_en"])

    # Structural: slide05 proof rows with stat spans
    html = replace_slide05_proof_rows(
        html,
        by_id["slide05__row_social_v"],
        by_id["slide05__row_anime_v"],
    )

    skipped_dup: list[str] = []

    for sid in target_ids:
        if sid not in handoff:
            missed.append(f"{sid} — not in handoff")
            continue
        raw = handoff[sid]
        en = by_id[sid]
        key = (raw.strip(), en)
        if pair_first_id.get(key) != sid:
            skipped_dup.append(sid)
            continue

        if sid == "slide09__hero_en":
            continue
        if sid in ("slide05__row_social_v", "slide05__row_anime_v"):
            continue
        if sid == "slide06__h_kpi_l1":
            continue

        replaced = False
        for old in old_variants(raw):
            if not old or old not in html:
                continue
            idx = html.find(old)
            before = html[:idx]
            attr = is_probably_in_attr(before)
            if sid == "slide01__cover_title":
                new = build_cover_h1_html(en) if not attr else en_to_attr_value(en)
            elif attr:
                new = en_to_attr_value(en)
            else:
                new = en_to_html_body(en)

            if new == old:
                replaced = True
                break
            html = html.replace(old, new)
            replaced = True
            break

        if not replaced:
            missed.append(sid)

    report_lines = [
        "merge_translations.py run",
        f"HTML written: {apply}",
        f"skipped (duplicate source+en): {len(skipped_dup)}",
        f"missed after pass: {len(missed)}",
        "",
        "Missed ids:",
        *missed,
    ]
    report_path = ROOT / "scripts" / "merge_translations_report.txt"
    report_path.write_text("\n".join(report_lines), encoding="utf-8")

    if apply:
        HTML_PATH.write_text(html, encoding="utf-8")

    print("\n".join(report_lines[:60]))
    if len(report_lines) > 60:
        print(f"... ({len(report_lines)} lines total; see {report_path})")

    return 0 if not missed else 1


if __name__ == "__main__":
    dry = "--dry-run" in sys.argv or "-n" in sys.argv
    sys.exit(run(apply=not dry))
