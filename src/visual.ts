import "./../style/visual.less";

import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";

import { VisualSettings } from "./settings";
import { buildResult } from "./accessibilityRules";
import { extractMeasures } from "./dataTransform";
import { AccessibilityResult, ColorScheme, ReadinessStatus, Thresholds } from "./types";

export class Visual implements IVisual {
    private root: HTMLElement;
    private settings: VisualSettings = new VisualSettings();
    private formattingSettingsService: FormattingSettingsService;

    constructor(options?: VisualConstructorOptions) {
        if (!options) {
            throw new Error("ReportGuard: VisualConstructorOptions are required.");
        }
        this.root = options.element;
        this.root.classList.add("rg-root");
        this.formattingSettingsService = new FormattingSettingsService();
    }

    public update(options: VisualUpdateOptions): void {
        const dataView = options.dataViews && options.dataViews[0];
        this.settings = this.formattingSettingsService.populateFormattingSettingsModel(VisualSettings, dataView);

        const t: Thresholds = {
            ready: this.settings.thresholds.ready.value,
            minor: this.settings.thresholds.minor.value,
            review: this.settings.thresholds.review.value,
            risk: this.settings.thresholds.risk.value
        };

        const result = buildResult(extractMeasures(dataView), t);
        const viewport = options.viewport;
        this.render(result, viewport ? viewport.width : 0, viewport ? viewport.height : 0);
    }

    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.settings);
    }

    private getColors(): ColorScheme {
        const c = this.settings.colors;
        return {
            background: c.backgroundColor.value.value,
            text: c.textColor.value.value,
            ready: c.readyColor.value.value,
            warning: c.warningColor.value.value,
            risk: c.riskColor.value.value,
            critical: c.criticalColor.value.value
        };
    }

    private statusColor(status: ReadinessStatus, colors: ColorScheme): string {
        switch (status) {
            case "Ready": return colors.ready;
            case "Minor Issues": return colors.warning;
            case "Needs Review": return colors.warning;
            case "Accessibility Risk": return colors.risk;
            case "Not Ready": return colors.critical;
        }
    }

    private render(result: AccessibilityResult, width: number, height: number): void {
        const colors = this.getColors();
        const d = this.settings.display;
        while (this.root.firstChild) this.root.removeChild(this.root.firstChild);
        this.root.style.background = colors.background;
        this.root.style.color = colors.text;
        this.root.style.fontSize = `${d.fontSize.value}px`;
        this.root.style.setProperty("--rg-card-spacing", `${d.cardSpacing.value}px`);
        this.root.setAttribute("role", "region");
        this.root.setAttribute("aria-label", "ReportGuard accessibility scorecard");

        if (!result.hasData) {
            this.renderEmptyState();
            return;
        }

        const compact = d.compactMode.value || width < 360 || height < 240;
        if (compact) this.root.classList.add("compact"); else this.root.classList.remove("compact");

        const header = document.createElement("h2");
        header.className = "rg-title";
        header.textContent = result.category
            ? `${d.titleText.value} — ${result.category}`
            : d.titleText.value;
        this.root.appendChild(header);

        if (d.showScore.value) {
            const block = document.createElement("div");
            block.className = "rg-score-block";

            const score = document.createElement("div");
            score.className = "rg-score";
            score.style.color = this.statusColor(result.status, colors);
            const dp = Math.max(0, Math.min(20, d.decimalPlaces.value));
            score.textContent = `${result.score.toFixed(dp)} / 100`;
            score.setAttribute("aria-label", `Accessibility score ${result.score.toFixed(dp)} out of 100`);

            const badge = document.createElement("span");
            badge.className = "rg-badge";
            badge.textContent = result.status;
            badge.style.background = this.statusColor(result.status, colors);
            badge.setAttribute("role", "status");

            block.appendChild(score);
            block.appendChild(badge);
            this.root.appendChild(block);
        }

        if (d.showChecklist.value && result.checklist.length > 0) {
            const list = document.createElement("ul");
            list.className = "rg-checklist";
            list.setAttribute("role", "list");

            for (const item of result.checklist) {
                const li = document.createElement("li");
                li.className = "rg-check" + (item.pass ? " pass" : " fail");
                li.setAttribute("tabindex", "0");
                li.setAttribute("aria-label", `${item.label}: ${item.pass ? "Pass" : "Fail"} — ${item.detail}`);

                const icon = document.createElement("span");
                icon.className = "rg-check-icon";
                icon.setAttribute("aria-hidden", "true");
                icon.textContent = item.pass ? "✓" : "!";

                const label = document.createElement("span");
                label.className = "rg-check-label";
                label.textContent = item.label;

                const detail = document.createElement("span");
                detail.className = "rg-check-detail";
                detail.textContent = item.detail;

                li.appendChild(icon);
                li.appendChild(label);
                li.appendChild(detail);
                list.appendChild(li);
            }
            this.root.appendChild(list);
        }

        if (d.showRemediation.value && result.remediation.length > 0) {
            const panel = document.createElement("div");
            panel.className = "rg-remediation";
            panel.setAttribute("role", "region");
            panel.setAttribute("aria-label", "Remediation guidance");
            const heading = document.createElement("h3");
            heading.textContent = "Remediation";
            panel.appendChild(heading);
            const ul = document.createElement("ul");
            for (const r of result.remediation) {
                const li = document.createElement("li");
                li.textContent = r;
                ul.appendChild(li);
            }
            panel.appendChild(ul);
            this.root.appendChild(panel);
        }

        if (d.showDisclaimer.value) {
            const disc = document.createElement("p");
            disc.className = "rg-footer";
            disc.textContent = "WCAG-inspired checklist. Not a formal compliance certification.";
            this.root.appendChild(disc);
        }
    }

    private renderEmptyState(): void {
        const wrap = document.createElement("div");
        wrap.className = "rg-empty";
        wrap.setAttribute("role", "status");
        const h = document.createElement("h3");
        h.textContent = "ReportGuard Accessibility Checker";
        wrap.appendChild(h);
        const p = document.createElement("p");
        p.textContent = "Add accessibility measures (passed/total checks or per-category issue counts) to begin.";
        wrap.appendChild(p);
        this.root.appendChild(wrap);
    }
}
