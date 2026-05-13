# ReportGuard Accessibility Checker

**Author:** [Syed Hussnain Tahir Sherazi](https://www.syedhussnain.com)
**License:** MIT
**Category:** Accessibility / compliance / governance

## Short description (≤100 chars, for AppSource listing)
WCAG-inspired accessibility scorecard with checklist, score, and remediation guidance. Not a certification.

## Long description
ReportGuard is a Power BI custom visual that scores a report or page against a WCAG-inspired accessibility checklist and provides remediation guidance. You feed it measures from an `AccessibilityChecks` table — passed vs total, or per-category issue counts (contrast, alt text, font size, keyboard, titles, cognitive load) — and it produces a 0–100 score, a readiness badge (Ready → Not Ready), six pass/fail check cards, and a prioritised remediation panel. A Manual Score measure can override the auto-calculation.

## What it solves
Many Power BI reports fail the basics of accessibility: low contrast, missing alt text, tiny fonts, no keyboard reachability. Public-sector, healthcare, education and regulated enterprise tenants must address these before publishing. ReportGuard puts a visible, opinionated accessibility score directly on the canvas so issues can't hide.

## Important limitation
A Power BI custom visual runs in a sandbox and **cannot** introspect other visuals or the report DOM. ReportGuard is therefore a scorecard, not an automatic scanner. You maintain or import a small `AccessibilityChecks` table (results of a manual review or your own tooling) and bind it to the visual. The visual itself is built to be accessible.

## Who it's for
- Public-sector and regulated industry BI teams.
- Internal accessibility champions running periodic report reviews.
- Vendors who need to evidence accessibility posture to enterprise customers.

## Key features
- Three scoring paths: Manual Score override, Passed/Total ratio, or per-category penalty mode.
- Six built-in check categories with icons and pass/fail badges.
- Prioritised remediation panel.
- WCAG-inspired disclaimer toggle reminding viewers this is not a formal certification.
- Configurable Ready / Minor / Review / Risk thresholds, full colour palette, compact mode.
- Accessibility: aria-labels, semantic lists, keyboard focus rings, high-contrast support, status conveyed by text + icon + colour.

## Privacy & security
No network calls. No third-party JS. `privileges` array is empty. Read-only.

## Author
**Syed Hussnain Tahir Sherazi** — Power BI / Microsoft Fabric developer building the ReportGuard Accessibility Checker and other Power BI custom visuals.

- Website: [www.syedhussnain.com](https://www.syedhussnain.com)
- Email: [Contact@syedhussnain.com](mailto:Contact@syedhussnain.com)
- LinkedIn: [linkedin.com/in/hussnainsherazi](https://www.linkedin.com/in/hussnainsherazi)
- GitHub: [github.com/hussnaintahir13](https://github.com/hussnaintahir13)
