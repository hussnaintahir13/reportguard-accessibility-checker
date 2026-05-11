# Accessibility Guide for Power BI Reports

A practical checklist that pairs with ReportGuard. Use this when populating the `AccessibilityChecks` table.

## Colour contrast
- Body text vs background ≥ **4.5 : 1** (WCAG 2.1 AA).
- Large text (≥18pt or ≥14pt bold) ≥ **3 : 1**.
- Don't rely on red/green alone — pair with shape, position or label.
- Verify with a contrast checker (e.g. WebAIM); never eyeball it.

## Alt text
- Every chart, image, KPI card and slicer that conveys meaning needs alt text.
- Describe the **insight**, not the chart type ("Revenue grew 12 % YoY", not "Bar chart").
- Decorative imagery should be marked decorative so screen readers skip it.

## Keyboard navigation
- Every interactive element reachable with **Tab** and **Shift+Tab**.
- Tab order should follow the visual reading order.
- No "keyboard traps" — pressing **Esc** should release focus.
- Show focus rings; do not hide them with `outline: none`.

## Font size
- Body text ≥ **12pt**; labels ≥ **10pt**; avoid anything under 9pt.
- Don't pack data into a tile that requires zoom to read.
- Allow the user agent to scale fonts (relative units where possible).

## Report layout
- Use grids, consistent spacing, and predictable reading order.
- One primary KPI per page; supporting visuals nearby.
- Place filters in the same location across pages.

## Cognitive load
- ≤ 7 distinct visuals per page.
- Avoid jargon and abbreviations; provide a glossary if you must.
- Group related content with subtle separators or whitespace, not heavy borders.

## Testing checklist
1. Tab through the whole page — does every control receive focus?
2. Read every visual title aloud — does it tell you the insight?
3. Toggle Windows high-contrast — does the page still make sense?
4. Run a contrast scan on every colour pair.
5. Have a colleague who hasn't seen the report try to summarise it in 30 seconds.

## Disclaimer
This guide is **not** legal advice and does not certify WCAG, EN 301 549, ADA, or Section 508 compliance. Always involve a qualified accessibility specialist for formal sign-off.
