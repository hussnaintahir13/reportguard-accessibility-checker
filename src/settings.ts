import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsModel = formattingSettings.Model;
import FormattingSettingsSlice = formattingSettings.Slice;

class DisplayCard extends FormattingSettingsCard {
    name = "display";
    displayName = "Display";

    showScore = new formattingSettings.ToggleSwitch({ name: "showScore", displayName: "Show score", value: true });
    showChecklist = new formattingSettings.ToggleSwitch({ name: "showChecklist", displayName: "Show checklist", value: true });
    showRemediation = new formattingSettings.ToggleSwitch({ name: "showRemediation", displayName: "Show remediation panel", value: true });
    showDisclaimer = new formattingSettings.ToggleSwitch({ name: "showDisclaimer", displayName: "Show disclaimer", value: true });
    compactMode = new formattingSettings.ToggleSwitch({ name: "compactMode", displayName: "Compact mode", value: false });
    decimalPlaces = new formattingSettings.NumUpDown({ name: "decimalPlaces", displayName: "Score decimal places", value: 0 });
    titleText = new formattingSettings.TextInput({ name: "titleText", displayName: "Title", value: "ReportGuard Accessibility Checker", placeholder: "ReportGuard Accessibility Checker" });
    fontSize = new formattingSettings.NumUpDown({ name: "fontSize", displayName: "Font size", value: 14 });
    cardSpacing = new formattingSettings.NumUpDown({ name: "cardSpacing", displayName: "Card spacing (px)", value: 8 });

    slices: FormattingSettingsSlice[] = [
        this.showScore, this.showChecklist, this.showRemediation, this.showDisclaimer,
        this.compactMode, this.decimalPlaces, this.titleText, this.fontSize, this.cardSpacing
    ];
}

class ThresholdsCard extends FormattingSettingsCard {
    name = "thresholds";
    displayName = "Thresholds";

    ready = new formattingSettings.NumUpDown({ name: "ready", displayName: "Ready ≥", value: 90 });
    minor = new formattingSettings.NumUpDown({ name: "minor", displayName: "Minor issues ≥", value: 75 });
    review = new formattingSettings.NumUpDown({ name: "review", displayName: "Needs review ≥", value: 60 });
    risk = new formattingSettings.NumUpDown({ name: "risk", displayName: "Accessibility risk ≥", value: 40 });

    slices: FormattingSettingsSlice[] = [this.ready, this.minor, this.review, this.risk];
}

class ColorsCard extends FormattingSettingsCard {
    name = "colors";
    displayName = "Colors";

    backgroundColor = new formattingSettings.ColorPicker({ name: "backgroundColor", displayName: "Background", value: { value: "#FFFFFF" } });
    textColor = new formattingSettings.ColorPicker({ name: "textColor", displayName: "Text", value: { value: "#252423" } });
    readyColor = new formattingSettings.ColorPicker({ name: "readyColor", displayName: "Ready", value: { value: "#107C10" } });
    warningColor = new formattingSettings.ColorPicker({ name: "warningColor", displayName: "Warning", value: { value: "#D9822B" } });
    riskColor = new formattingSettings.ColorPicker({ name: "riskColor", displayName: "Risk", value: { value: "#B85C00" } });
    criticalColor = new formattingSettings.ColorPicker({ name: "criticalColor", displayName: "Critical", value: { value: "#A4262C" } });

    slices: FormattingSettingsSlice[] = [
        this.backgroundColor, this.textColor, this.readyColor, this.warningColor, this.riskColor, this.criticalColor
    ];
}

export class VisualSettings extends FormattingSettingsModel {
    display = new DisplayCard();
    thresholds = new ThresholdsCard();
    colors = new ColorsCard();
    cards = [this.display, this.thresholds, this.colors];
}
