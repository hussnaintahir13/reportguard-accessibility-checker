# ReportGuard — Usage Guide

## Add the visual
1. **Import a visual from a file** → select the `.pbiviz`.
2. Drag the ReportGuard icon onto your report page.

## Suggested data model
Create an `AccessibilityChecks` table with columns:
- `CheckId`, `Category` (Contrast / Alt Text / Font / Keyboard / Title / Cognitive),
- `Severity`, `Status` (Pass / Fail), `Description`.

Populate it manually after a review session, or pipe in results from your own scanner.

## Bind measures
- **Total Checks** and **Passed Checks** → simplest setup, gives `passed / total × 100`.
- Or supply per-category **issue counts** → ReportGuard derives a penalty-based score.
- Or supply **Manual Score** to use a number you compute elsewhere.

## Customise
- **Display** — show/hide score, checklist, remediation, disclaimer; compact mode; font size and card spacing.
- **Thresholds** — change Ready / Minor / Review / Risk cut-offs.
- **Colors** — full palette override for high-contrast themes.

## Reading the visual
- **Score** with status badge (Ready → Not Ready).
- **Checklist** — six categories, each marked Pass/Fail with an icon and detail count.
- **Remediation** panel — prioritised list of actions.
- **Disclaimer** — reminds viewers the visual aids accessibility review but does not certify legal compliance.

## Tips
- Run the same visual on each report page using the **Issue Category** grouping (e.g., Page Name).
- Use bookmarks to flip between a "current state" and "target state" view.
- Pair with the [Accessibility Guide](ACCESSIBILITY_GUIDE.md).
