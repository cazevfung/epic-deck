# Start Here

Use this file when you want the fastest correct way into the deck system.

## Preferred Path Right Now

For current slide rebuilding, use this path:

1. [`docs/style-bible.html`](docs/style-bible.html)
2. [`docs/production-method.md`](docs/production-method.md)
3. [`docs/workbench-workflow.md`](docs/workbench-workflow.md)
4. [`docs/canon-first.md`](docs/canon-first.md)
5. [`docs/core-workflow.md`](docs/core-workflow.md)
6. [`docs/rebuild-guideline.md`](docs/rebuild-guideline.md)
7. [`docs/visual-system.md`](docs/visual-system.md)
8. [`docs/quality-checklist.md`](docs/quality-checklist.md)
9. [`docs/review-gates.md`](docs/review-gates.md)
10. [`docs/pattern-extraction-policy.md`](docs/pattern-extraction-policy.md)

Treat `style-bible.html` as the visual canon, not as a loose inspiration source.

When you need a new working HTML file, do it in this order:

1. refresh `templates/deck-shell.html` from the bible if needed,
2. generate a workbench from the shell,
3. rebuild inside the workbench.

## If You Are Starting A New Deck Task

Read these in order:

1. [`docs/style-bible.html`](docs/style-bible.html)
2. [`docs/production-method.md`](docs/production-method.md)
3. [`docs/workbench-workflow.md`](docs/workbench-workflow.md)
4. [`docs/canon-first.md`](docs/canon-first.md)
5. [`docs/core-workflow.md`](docs/core-workflow.md)
6. [`docs/rebuild-guideline.md`](docs/rebuild-guideline.md)
7. [`docs/visual-system.md`](docs/visual-system.md)
8. [`docs/quality-checklist.md`](docs/quality-checklist.md)
9. [`docs/review-gates.md`](docs/review-gates.md)

These files define:

- how to stay close to the canon,
- the fixed production method for all slide work,
- how to start from the correct HTML shell,
- how to execute the work,
- how to avoid generic layouts,
- how to review fit and drift.

## Why This Changed

The current exports in [`../epic_deck/02_sections/05_exports/`](../epic_deck/02_sections/05_exports/) drift too far from [`docs/style-bible.html`](docs/style-bible.html).

The main failure was over-abstracting the bible into too many secondary docs, so those middle-layer docs have been removed.

## If You Want To Tell Codex What To Do

Use this command:

```text
我们这次工作的目的，是在不改写原始内容的前提下，基于原有信息结构，把这个 deck 重建为更接近 visual canon 的版本，并建立稳定、可复用、可调整的 slides。

本次要处理的源文件是：
[Epic Deck 合并v3.pptx](epic_deck/00_inbox/Epic Deck 合并v3.pptx)

本轮只处理 3-15 页。

不要新增内容。
不要删减原始内容。
重点是重建视觉设计和排版结构，不是重写内容本身。
除非我明确要求，否则不要改动页面原本要表达的核心意思。

先读这些文件：
- [style-bible.html](deck-system/docs/style-bible.html)
- [production-method.md](deck-system/docs/production-method.md)
- [workbench-workflow.md](deck-system/docs/workbench-workflow.md)
- [canon-first.md](deck-system/docs/canon-first.md)
- [core-workflow.md](deck-system/docs/core-workflow.md)
- [rebuild-guideline.md](deck-system/docs/rebuild-guideline.md)
- [visual-system.md](deck-system/docs/visual-system.md)
- [quality-checklist.md](deck-system/docs/quality-checklist.md)
- [review-gates.md](deck-system/docs/review-gates.md)

把 `style-bible.html` 当作视觉 canon。
遵循它的风格、层级、氛围、版式逻辑和页面行为。
只参考它的视觉表达，不照搬它的实际文案内容。

工作方法必须固定为：
1. 如果 bible 有更新，先刷新 `deck-system/templates/deck-shell.html`
2. 从 `deck-shell.html` 生成本轮要做的 workbench 文件
3. 在 workbench 文件里完成重建
4. 页面通过 review 之后，再合并到最终 export

不要从空白 HTML 开始。
不要直接把 `style-bible.html` 当作日常生产文件来改。
不要把多个并行任务塞进同一个巨大的共享 HTML 文件里。

开始设计之前，先做 normalization 和 audit。
不要一口气重做整个 deck。
不要用 hidden overflow 或整体缩小字体的方式硬压 fit。

先在 `epic_deck/02_sections/05_exports/workbench/` 下创建 workbench 文件。
在页面稳定之前，不要合并到最终 export。

开始之前，先展示：
- 你要处理的页码范围
- 你的 normalization 和 audit 总结
- 每一页最接近的 bible family
- 你的 rebuild waves
- 你准备创建的 workbench 文件
```

重制底图prompt：

```text
slide 40, 用这个做底图C:\Users\202108-107\Documents\Epic Deck\epic_deck\02_sections\04_assets\source-pptx-media-35-58\sent-signal.png
只要左边的阴影，右边不要阴影
基于 [workbench-pages-57-62.html](epic_deck/02_sections/05_exports/workbench/workbench-pages-57-62.html) 的设计，用html文字重制页面
用我们自己的字体即可不用改字体
```
