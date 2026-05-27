# Release — plug-and-play

This folder contains the built `.pbiviz` for ReportGuard Accessibility Checker. Download the file and import it into Power BI Desktop — no Node, no `pbiviz` CLI required.

## How to install in Power BI Desktop

1. Download `reportGuardAccessibilityChecker*.pbiviz` from this folder (use the **Download raw file** button in GitHub).
2. In Power BI Desktop, open your report.
3. **Visualizations** pane → **…** at the bottom → **Import a visual from a file** → OK to the warning → pick the `.pbiviz`.
4. Drag the new ReportGuard icon onto the canvas and bind your accessibility measures.

## Service install

In the Power BI Service, open a report in Edit mode → **Visualizations → … → Import a visual from a file**.

## Tenant policy

If the import fails with a policy error, ask your Power BI admin to add this visual to the **organisational visuals** list (Power BI Admin Portal → Tenant settings → Organisational visuals).
