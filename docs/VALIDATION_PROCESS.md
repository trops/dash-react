# Component Variant Validation Process

This document outlines the ongoing validation process for maintaining consistency in the dash-react component variant system.

## Overview

The dash-react library uses a **manual Storybook-based validation approach** rather than automated testing. This provides:
- Visual validation by humans who understand design intent
- Living documentation via AllVariants stories
- Lower maintenance burden than screenshot automation
- Easier participation by designers and non-developers

---

## Daily Development Validation

### When Creating New Components

1. **Use the template** (`templates/ComponentVariants.template.js`)
2. **Implement all three variants** following progressive patterns
3. **Create AllVariants story** for visual comparison
4. **Visual review in Storybook** before submitting PR
5. **Self-review checklist** (see CONTRIBUTING.md)

### When Modifying Existing Components

1. **View current AllVariants story** to understand existing patterns
2. **Make changes** while maintaining hierarchy
3. **Update AllVariants documentation** if patterns change
4. **Visual review in Storybook** to verify no regressions
5. **Compare with variant specifications** to ensure consistency

---

## Pull Request Review Process

### For PR Authors

Before submitting, ensure:
- ✅ AllVariants story exists and displays correctly
- ✅ Visual hierarchy is clear and intentional
- ✅ Patterns follow variant specifications
- ✅ Build passes without errors
- ✅ PR description includes screenshots of AllVariants story (if applicable)

### For PR Reviewers

**Component Variant Review Checklist:**

1. **Visual Hierarchy**
   - [ ] Open AllVariants story in Storybook
   - [ ] Primary variant is noticeably larger/bolder than secondary
   - [ ] Secondary variant is noticeably larger/bolder than tertiary
   - [ ] Visual difference is immediately apparent

2. **Progressive Patterns**
   - [ ] Text size decreases (or is intentionally consistent)
   - [ ] Padding decreases progressively
   - [ ] Font weight progression is appropriate
   - [ ] Border radius/shadow follows established patterns

3. **Documentation**
   - [ ] Variant specifications documented in component file
   - [ ] AllVariants story includes inline class documentation
   - [ ] Status indicators (✅/⚠️) accurately reflect component state

4. **Code Quality**
   - [ ] Theme objects registered
   - [ ] Component follows template structure
   - [ ] No unnecessary complexity

5. **Consistency**
   - [ ] Patterns match variant specifications document
   - [ ] Similar components use similar patterns
   - [ ] No arbitrary sizing decisions

**Review Outcome:**
- ✅ **Approve**: All criteria met, clear visual hierarchy
- 🔄 **Request Changes**: Visual hierarchy unclear or patterns don't match specs
- 💬 **Comment**: Minor suggestions, but acceptable to merge

---

## Quarterly Comprehensive Review

Every quarter (or as needed), conduct a comprehensive review of all component variants.

### Goals
- Identify design drift
- Ensure consistency across all components
- Update variant specifications if patterns evolve
- Catch edge cases missed in PR reviews

### Process

#### 1. Preparation (30 minutes)

- [ ] Start Storybook: `npm run storybook`
- [ ] Open variant specifications: `docs/variant-specifications.md`
- [ ] Create review document: `docs/reviews/YYYY-MM-quarterly-review.md`

#### 2. Visual Review (2-3 hours)

For each component family, review the AllVariants story:

| Component | ✅/⚠️ | Text Size | Padding | Font Weight | Notes |
|-----------|-------|-----------|---------|-------------|-------|
| Button | | | | | |
| Card | | | | | |
| Panel | | | | | |
| Alert | | | | | |
| Tag | | | | | |
| Heading | | | | | |
| SubHeading | | | | | |
| Paragraph | | | | | |
| Breadcrumbs | | | | | |
| ButtonIcon | | | | | |
| MenuItem | | | | | |
| ProgressBar | | | | | |
| Toast | | | | | |
| Table | | | | | |
| DashPanel | | | | | |

#### 3. Pattern Analysis (30 minutes)

- Group components by pattern similarity
- Identify outliers or inconsistencies
- Note any components that don't follow specs

#### 4. Documentation Updates (30 minutes)

- Update variant specifications if patterns have evolved
- Update AllVariants stories with corrected status indicators
- Document any new patterns discovered

#### 5. Action Items (15 minutes)

Create GitHub issues for:
- Components needing fixes
- Specification updates needed
- New patterns to standardize

#### 6. Review Report

Publish quarterly review report in `docs/reviews/` with:
- Summary of findings
- Components reviewed
- Issues identified
- Action items created
- Trends observed

---

## Storybook as Living Documentation

The AllVariants stories serve as both validation tools and living documentation.

### Benefits

1. **Self-Documenting**: Visual examples + inline class documentation
2. **Always Up-to-Date**: Stories are part of the code, not separate docs
3. **Designer-Friendly**: Non-developers can review visual hierarchy
4. **Version Controlled**: Changes tracked in git
5. **Easy to Review**: Side-by-side comparison in Storybook UI

### Best Practices

**For Story Authors:**
- Include all three variants
- Show actual Tailwind classes used
- Add status indicators (✅ GOOD / ⚠️ ISSUE)
- Keep stories up-to-date when components change
- Use consistent story structure

**For Story Consumers:**
- Use as reference when creating new components
- Check before modifying existing components
- Share links in PR discussions
- Use in design reviews

### Story Structure Standard

```javascript
export const AllVariants = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-8 p-4">
            {/* Primary Variant */}
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    ComponentName (Primary Variant)
                </h3>
                <ComponentName {...props} />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    {/* Document actual classes */}
                    Text size: text-lg
                    <br />
                    Padding: p-6
                    <br />
                    Font: font-bold
                    <br />
                    {/* Status indicator */}
                    <span className="text-green-600">
                        ✅ GOOD: Clear hierarchy
                    </span>
                </div>
            </div>
            {/* Repeat for Secondary and Tertiary */}
        </div>
    </MockWrapper>
);
```

---

## Progressive Enhancement Opportunities

If automated validation is desired in the future, the AllVariants stories provide the foundation:

### Potential Additions

1. **Screenshot-based visual regression testing**
   - Use Storybook test-runner with Playwright
   - Capture AllVariants stories
   - Compare against baseline images

2. **Automated class extraction**
   - Parse Tailwind classes from component files
   - Validate against pattern specifications
   - Flag non-progressive patterns

3. **CI/CD integration**
   - Run Storybook build in CI
   - Validate all stories render without errors
   - Block PRs if AllVariants story missing

4. **Design token validation**
   - Extract sizing values from components
   - Validate progression (e.g., 2 → 4 → 6)
   - Flag arbitrary values

### Why Start Manual

Manual validation is sufficient because:
- Visual hierarchy is subjective
- Design system is still evolving
- Human judgment adds value
- Lower setup and maintenance cost
- Stories already serve as documentation

Automation should be added only when:
- Patterns are fully stable
- Manual review becomes bottleneck
- Team size requires it
- ROI justifies implementation cost

---

## Handling Exceptions

Sometimes components need to deviate from standard patterns.

### When Exceptions Are Acceptable

- **Layout stability**: Headings may keep consistent padding for alignment
- **Functional requirements**: Certain components need minimum sizes for usability
- **Design intent**: Specific visual treatment overrides standard patterns

### Documenting Exceptions

When a component intentionally breaks patterns:

1. **Document in component file**
   ```javascript
   /**
    * EXCEPTION: All variants use consistent padding for layout stability
    * Rationale: Headings need consistent spacing in page layouts
    */
   ```

2. **Update AllVariants story**
   ```javascript
   <span className="text-amber-600">
       ⚠️ NOTE: Consistent padding intentional for layout stability
   </span>
   ```

3. **Document in variant specifications**
   Add to the pattern tables with explanation

4. **Discuss in PR review**
   Explain reasoning and get team buy-in

---

## Questions and Support

**Need help with validation?**
- Check [variant-specifications.md](./variant-specifications.md) for patterns
- View AllVariants stories in Storybook for examples
- Ask in PR reviews
- Open an issue for discussion

**Found an inconsistency?**
- Document it in the quarterly review
- Create a GitHub issue
- Fix it if possible and submit a PR
- Update variant specifications if needed

---

## Maintenance Schedule

| Activity | Frequency | Duration | Owner |
|----------|-----------|----------|-------|
| PR Review | Per PR | 5-10 min | Reviewer |
| Visual Validation | Per change | 2-5 min | Developer |
| Quarterly Review | Quarterly | 3-4 hours | Team rotation |
| Spec Updates | As needed | 30-60 min | Reviewer/Lead |

---

## Success Metrics

Track these informally to gauge validation process health:

- ✅ All component families have AllVariants stories
- ✅ No PRs merged without visual hierarchy validation
- ✅ Components with ✅ GOOD indicators > components with ⚠️ ISSUE
- ✅ Quarterly reviews completed on schedule
- ✅ Variant specifications document stays up-to-date
- ✅ New components follow established patterns

---

**Last Updated:** 2026-02-13
**Next Quarterly Review Due:** 2026-05-13
