import powerbi from "powerbi-visuals-api";
import DataView = powerbi.DataView;
import DataViewValueColumn = powerbi.DataViewValueColumn;
import { AccessibilityMeasures } from "./types";

const safeNumber = (v: powerbi.PrimitiveValue | undefined | null): number | undefined => {
    if (v === undefined || v === null) return undefined;
    const n = Number(v);
    return isFinite(n) ? n : undefined;
};

export function extractMeasures(dataView: DataView | undefined): AccessibilityMeasures {
    const m: AccessibilityMeasures = {};
    if (!dataView || !dataView.categorical) return m;

    const cat = dataView.categorical;
    if (cat.values) {
        for (const v of cat.values as DataViewValueColumn[]) {
            const roles = v.source.roles || {};
            const value = v.values && v.values.length > 0 ? v.values[0] : undefined;
            const n = safeNumber(value);
            if (roles.totalChecks) m.totalChecks = n;
            if (roles.passedChecks) m.passedChecks = n;
            if (roles.failedContrastChecks) m.failedContrastChecks = n;
            if (roles.missingAltTextCount) m.missingAltTextCount = n;
            if (roles.smallFontCount) m.smallFontCount = n;
            if (roles.keyboardIssueCount) m.keyboardIssueCount = n;
            if (roles.titleIssueCount) m.titleIssueCount = n;
            if (roles.cognitiveLoadIssueCount) m.cognitiveLoadIssueCount = n;
            if (roles.manualScore) m.manualScore = n;
        }
    }

    if (cat.categories) {
        for (const c of cat.categories) {
            const roles = c.source.roles || {};
            const firstVal = c.values && c.values.length > 0 ? c.values[0] : undefined;
            if (firstVal == null) continue;
            if (roles.issueCategory) m.issueCategory = String(firstVal);
            if (roles.issueDescription) m.issueDescription = String(firstVal);
        }
    }

    return m;
}
