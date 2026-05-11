# AppSource Submission Checklist

## Packaging
- [ ] `pbiviz package` builds cleanly.
- [ ] Unique GUID in `pbiviz.json`.
- [ ] Versions aligned across `package.json`, `pbiviz.json`, `CHANGELOG.md`, and the release tag.
- [ ] `assets/icon.png` is 300×300, transparent.

## Sample content
- [ ] Sample `.pbix` demonstrating every code path (manual, pass/total, penalty-based).
- [ ] Sample `AccessibilityChecks` table CSV.

## Documentation
- [ ] Privacy policy URL.
- [ ] Support URL.
- [ ] Terms of use URL.
- [ ] Public README, CHANGELOG, ACCESSIBILITY_GUIDE.

## Listing assets
- [ ] ≥3 screenshots (1280×720) with no PII.
- [ ] Short and long description.
- [ ] Logos (300×300 and 48×48).

## Test cases
- [ ] Empty data.
- [ ] Manual score only.
- [ ] Pass/total only.
- [ ] Penalty mode only.
- [ ] All checks pass.
- [ ] Many critical issues.
- [ ] Compact mode.
- [ ] High-contrast mode.
- [ ] Resize from full-page to small tile.
- [ ] Long descriptions in `Issue Description`.

## Accessibility notes
- [ ] Status conveyed by text + icon, not colour alone.
- [ ] Aria-labels on score, badge, checklist items.
- [ ] Visible keyboard focus on checklist items.
- [ ] Tested under Windows high-contrast.
- [ ] Disclaimer reminds that the visual is not a compliance certification.

## Security & privacy
- [ ] No outbound network calls.
- [ ] No third-party JS at runtime.
- [ ] `privileges` array empty.
