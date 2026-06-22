export type ReadinessStatus = "Ready" | "Minor Issues" | "Needs Review" | "Accessibility Risk" | "Not Ready";

export interface AccessibilityMeasures {
    totalChecks?: number;
    passedChecks?: number;
    failedContrastChecks?: number;
    missingAltTextCount?: number;
    smallFontCount?: number;
    keyboardIssueCount?: number;
    titleIssueCount?: number;
    cognitiveLoadIssueCount?: number;
    manualScore?: number;
    issueCategory?: string;
}

export interface ChecklistItem {
    key: string;
    label: string;
    pass: boolean;
    detail: string;
    icon: string;
}

export interface AccessibilityResult {
    score: number;
    status: ReadinessStatus;
    checklist: ChecklistItem[];
    remediation: string[];
    hasData: boolean;
    category?: string;
}

export interface Thresholds {
    ready: number;
    minor: number;
    review: number;
    risk: number;
}

export interface ColorScheme {
    background: string;
    text: string;
    ready: string;
    warning: string;
    risk: string;
    critical: string;
}
