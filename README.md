# ReportGuard — Accessibility Checker

## Quick start (non-technical)
New here? Read **[HOW-TO-USE.md](HOW-TO-USE.md)** for a plain-English guide to importing and using this visual.

ReportGuard is a Power BI custom visual that scores a report or page against an accessibility checklist (contrast, alt text, font size, keyboard, titles, cognitive load) and renders remediation guidance.

## Quick install (no build required)

Grab the latest `.pbiviz` from [`release/`](release/) (use **Download raw file** in GitHub) and import via **Visualizations → … → Import a visual from a file** in Power BI Desktop. Full steps in [`release/README.md`](release/README.md).

## Why it matters

Many Power BI reports fail the basics of WCAG: low contrast, missing alt text, tiny fonts, no keyboard reachability. Public-sector, healthcare and education tenants must address these before publishing. ReportGuard puts a visible, opinionated accessibility score on the canvas so issues can't hide.

## Limitations

A Power BI custom visual runs inside an isolated sandbox. It **cannot** introspect other visuals or the report DOM. ReportGuard therefore consumes _measures_ that you produce — usually from a small "accessibility audit" table maintained alongside the report. It is a scorecard, not an automated scanner.

## Data fields

| Role | Kind | Purpose |
| --- | --- | --- |
| Total Checks | Measure | Denominator if computing pass/total. |
| Passed Checks | Measure | Numerator. |
| Failed Contrast Checks | Measure | Drives contrast penalty. |
| Missing Alt Text Count | Measure | Drives alt-text penalty. |
| Small Font Count | Measure | Drives font penalty. |
| Keyboard Issue Count | Measure | Drives keyboard penalty. |
| Title Issue Count | Measure | Drives title penalty. |
| Cognitive Load Issue Count | Measure | Drives cognitive penalty. |
| Manual Score | Measure (optional) | Override — used directly when present. |
| Issue Category | Grouping (optional) | Appears in title. |
| Issue Description | Grouping (optional) | Surfaced for context. |

## Scoring

- If **Manual Score** present → used directly.
- Else if **Passed Checks** + **Total Checks** present → `passed/total × 100`.
- Else: 100 − weighted penalty (contrast×10, altText×8, smallFont×5, keyboard×10, title×5, cognitive×4), clamped 0–100.

## Status thresholds (defaults)

| Range | Status |
| --- | --- |
| ≥ 90 | Ready |
| ≥ 75 | Minor Issues |
| ≥ 60 | Needs Review |
| ≥ 40 | Accessibility Risk |
| < 40 | Not Ready |

## Example DAX measures

```DAX
Total Checks = COUNTROWS('AccessibilityChecks')
Passed Checks = CALCULATE(COUNTROWS('AccessibilityChecks'), 'AccessibilityChecks'[Status] = "Pass")
Failed Contrast Checks = CALCULATE(COUNTROWS('AccessibilityChecks'), 'AccessibilityChecks'[Category] = "Contrast", 'AccessibilityChecks'[Status] = "Fail")
Missing Alt Text Count = CALCULATE(COUNTROWS('AccessibilityChecks'), 'AccessibilityChecks'[Category] = "Alt Text", 'AccessibilityChecks'[Status] = "Fail")
Small Font Count = CALCULATE(COUNTROWS('AccessibilityChecks'), 'AccessibilityChecks'[Category] = "Font", 'AccessibilityChecks'[Status] = "Fail")
Keyboard Issue Count = CALCULATE(COUNTROWS('AccessibilityChecks'), 'AccessibilityChecks'[Category] = "Keyboard", 'AccessibilityChecks'[Status] = "Fail")
Title Issue Count = CALCULATE(COUNTROWS('AccessibilityChecks'), 'AccessibilityChecks'[Category] = "Title", 'AccessibilityChecks'[Status] = "Fail")
Cognitive Load Issue Count = CALCULATE(COUNTROWS('AccessibilityChecks'), 'AccessibilityChecks'[Category] = "Cognitive", 'AccessibilityChecks'[Status] = "Fail")
```

## Development setup

```bash
npm install
npm install -g powerbi-visuals-tools
pbiviz --create-cert
pbiviz start
pbiviz package
```

## Usage instructions

See [docs/USAGE.md](docs/USAGE.md) and [docs/ACCESSIBILITY_GUIDE.md](docs/ACCESSIBILITY_GUIDE.md).

## Test plan

- Empty data — friendly empty state.
- Manual score only.
- Passed + Total Checks supplied.
- Issue counts only (penalty mode).
- All checks pass.
- Many critical issues (score clamps at 0).
- Compact mode.
- High-contrast mode.
- Resizing.
- Long issue descriptions don't break layout.

## AppSource readiness

See [docs/APP_SOURCE_CHECKLIST.md](docs/APP_SOURCE_CHECKLIST.md).

## Roadmap

- Per-rule severity weighting via the Format pane.
- Drill into the underlying issue table.
- Localisation.
- Export to a CSV remediation backlog.

## Contributing

Fork, branch, PR. Please include a screenshot. By contributing you license your work under MIT.

## Author

Syed Hussnain Tahir Sherazi — Associate Data Engineer, Leicester, UK.
[www.syedhussnain.com](https://www.syedhussnain.com) · [LinkedIn](https://uk.linkedin.com/in/hussnainsherazi) · contact@syedhussnain.co.uk

## License

MIT — see [LICENSE](LICENSE).
