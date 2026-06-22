# ReportGuard Accessibility Checker — Simple Guide

## What this visual does
This visual shows an accessibility scorecard for your report. You give it numbers from your own accessibility-checks table, and it turns them into a 0–100 score, a status badge, a checklist, and tips to fix problems. It does **not** scan your report on its own and does **not** find issues for you — you supply the numbers. It is a scorecard, not an automatic scanner, and it does **not** certify that your report meets WCAG rules.

## What data you need
You add these as measures from your own accessibility-checks table. Drag each one into the matching field well.

- **Total Checks** — how many checks you ran in total. (Optional — needed if you want a passed-out-of-total score.)
- **Passed Checks** — how many checks passed. (Optional — needed if you want a passed-out-of-total score.)
- **Failed Contrast Checks** — count of color-contrast problems. (Optional.)
- **Missing Alt Text Count** — count of items with no alt text. (Optional.)
- **Small Font Count** — count of fonts that are too small. (Optional.)
- **Keyboard Issue Count** — count of keyboard-access problems. (Optional.)
- **Title Issue Count** — count of title problems. (Optional.)
- **Cognitive Load Issue Count** — count of "too busy / too confusing" problems. (Optional.)
- **Manual Score (optional)** — a score you set yourself. If you add this, the visual uses it directly. (Optional.)
- **Issue Category** — a grouping label that appears in the title. (Optional.)

Note: every field well is optional, but you must fill in at least one so the visual has something to show. The most common setups are: Manual Score on its own, OR Passed Checks plus Total Checks, OR the issue-count fields.

## How to add it to your report (step by step)
1. Open Power BI Desktop and open or create a report.
2. In the **Visualizations** pane, click the **•••** (more options) button.
3. Choose **Import a visual from a file**.
4. If a warning about custom visuals appears, click **Import**.
5. Pick the file **dist\reportGuardAccessibilityChecker8B214C0F5C7D49E69A0E2D7AAF3F1B12.1.0.0.0.pbiviz** and open it.
6. Click the new icon in the Visualizations pane to add the visual to the page.
7. Select the visual, then drag your fields into the wells listed above.

## Buttons & options you can change
Open the **Format** pane (the paint-roller icon) to change these.

**Display**
- **Show score** — turn the big score number on or off.
- **Show checklist** — turn the pass/fail check cards on or off.
- **Show remediation panel** — turn the "how to fix it" tips on or off.
- **Show disclaimer** — turn the note that says "this is not a formal certification" on or off.
- **Compact mode** — make everything smaller to fit a tight space.
- **Score decimal places** — how many digits to show after the decimal point (0 to 10).
- **Title** — the text shown at the top.
- **Font size** — make the text bigger or smaller.
- **Card spacing (px)** — the gap between cards.

**Thresholds**
These set the score limits for each status label.
- **Ready ≥** — score at or above this is "Ready" (default 90).
- **Minor issues ≥** — score at or above this is "Minor Issues" (default 75).
- **Needs review ≥** — score at or above this is "Needs Review" (default 60).
- **Accessibility risk ≥** — score at or above this is "Accessibility Risk" (default 40). Below this is "Not Ready".

**Colors**
- **Background** — the background color.
- **Text** — the text color.
- **Ready** — the color for a good "Ready" status.
- **Warning** — the color for minor warnings.
- **Risk** — the color for at-risk status.
- **Critical** — the color for the worst issues.

## If it looks empty or wrong
- **Nothing shows up?** Make sure you dragged at least one field into a field well. The visual needs data to show anything.
- **No score?** Add a **Manual Score** measure, OR add both **Passed Checks** and **Total Checks**, OR add the issue-count fields.
- **Wrong status label?** Check the **Thresholds** in the Format pane. Your numbers may be set higher or lower than you expect.
- **Numbers look off?** Open your accessibility-checks table and confirm your measures are counting the right rows. The visual only shows the numbers you give it.
