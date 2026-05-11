import { AccessibilityMeasures, AccessibilityResult, ChecklistItem, ReadinessStatus, Thresholds } from "./types";

const clamp = (n: number, min = 0, max = 100): number => Math.max(min, Math.min(max, n));

export function statusForScore(score: number, t: Thresholds): ReadinessStatus {
    if (score >= t.ready) return "Ready";
    if (score >= t.minor) return "Minor Issues";
    if (score >= t.review) return "Needs Review";
    if (score >= t.risk) return "Accessibility Risk";
    return "Not Ready";
}

/** Penalty weights per issue type. */
const PENALTY = {
    contrast: 10,
    altText: 8,
    smallFont: 5,
    keyboard: 10,
    title: 5,
    cognitive: 4
} as const;

export function calculateScore(m: AccessibilityMeasures): number {
    if (m.manualScore !== undefined) return clamp(m.manualScore);
    if (m.totalChecks !== undefined && m.passedChecks !== undefined && m.totalChecks > 0) {
        return clamp((m.passedChecks / m.totalChecks) * 100);
    }
    let score = 100;
    score -= (m.failedContrastChecks ?? 0) * PENALTY.contrast;
    score -= (m.missingAltTextCount ?? 0) * PENALTY.altText;
    score -= (m.smallFontCount ?? 0) * PENALTY.smallFont;
    score -= (m.keyboardIssueCount ?? 0) * PENALTY.keyboard;
    score -= (m.titleIssueCount ?? 0) * PENALTY.title;
    score -= (m.cognitiveLoadIssueCount ?? 0) * PENALTY.cognitive;
    return clamp(score);
}

export function buildChecklist(m: AccessibilityMeasures): ChecklistItem[] {
    const items: ChecklistItem[] = [];

    const check = (key: string, label: string, count: number | undefined, icon: string): ChecklistItem => ({
        key,
        label,
        pass: !count,
        detail: count ? `${count} issue${count === 1 ? "" : "s"}` : "No issues detected",
        icon
    });

    items.push(check("contrast", "Colour contrast", m.failedContrastChecks, "◐"));
    items.push(check("altText", "Alt text", m.missingAltTextCount, "🖼"));
    items.push(check("fontSize", "Font size", m.smallFontCount, "Aa"));
    items.push(check("keyboard", "Keyboard navigation", m.keyboardIssueCount, "⌨"));
    items.push(check("titles", "Descriptive titles", m.titleIssueCount, "✎"));
    items.push(check("cognitive", "Cognitive load", m.cognitiveLoadIssueCount, "🧠"));

    return items;
}

export function buildRemediation(m: AccessibilityMeasures): string[] {
    const out: string[] = [];
    const totalIssues =
        (m.failedContrastChecks ?? 0) +
        (m.missingAltTextCount ?? 0) +
        (m.smallFontCount ?? 0) +
        (m.keyboardIssueCount ?? 0) +
        (m.titleIssueCount ?? 0) +
        (m.cognitiveLoadIssueCount ?? 0);

    if (totalIssues === 0 && m.manualScore === undefined) {
        out.push("No issues detected. Continue running manual screen-reader and keyboard checks before sign-off.");
        return out;
    }

    if (m.missingAltTextCount && m.missingAltTextCount > 0) out.push("Add descriptive alt text to every visual conveying meaning.");
    if (m.failedContrastChecks && m.failedContrastChecks > 0) out.push("Increase foreground/background contrast to at least 4.5:1 for text.");
    if (m.smallFontCount && m.smallFontCount > 0) out.push("Raise font sizes above the configured minimum (≥12pt body, ≥10pt labels).");
    if (m.keyboardIssueCount && m.keyboardIssueCount > 0) out.push("Verify tab order and keyboard reachability for every interactive element.");
    if (m.titleIssueCount && m.titleIssueCount > 0) out.push("Replace generic titles with descriptive, action-oriented summaries.");
    if (m.cognitiveLoadIssueCount && m.cognitiveLoadIssueCount > 0) out.push("Reduce information density — split crowded pages or hide secondary detail.");

    if (out.length > 1) {
        out.unshift(`${totalIssues} accessibility risk${totalIssues === 1 ? "" : "s"} found. Prioritise the items below.`);
    }
    return out;
}

export function buildResult(m: AccessibilityMeasures, t: Thresholds): AccessibilityResult {
    const hasAny =
        m.manualScore !== undefined ||
        m.totalChecks !== undefined ||
        m.passedChecks !== undefined ||
        m.failedContrastChecks !== undefined ||
        m.missingAltTextCount !== undefined ||
        m.smallFontCount !== undefined ||
        m.keyboardIssueCount !== undefined ||
        m.titleIssueCount !== undefined ||
        m.cognitiveLoadIssueCount !== undefined;

    if (!hasAny) {
        return {
            score: 0,
            status: "Not Ready",
            checklist: [],
            remediation: [],
            hasData: false
        };
    }

    const score = calculateScore(m);
    return {
        score,
        status: statusForScore(score, t),
        checklist: buildChecklist(m),
        remediation: buildRemediation(m),
        hasData: true,
        category: m.issueCategory,
        description: m.issueDescription
    };
}
