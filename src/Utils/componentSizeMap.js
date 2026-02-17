/**
 * Component Size Mapping Utility (v0.2.0+)
 *
 * Maps deprecated component variant names to their equivalent size prop values.
 * Used for backwards compatibility and migration guidance.
 *
 * Example usage:
 * ```javascript
 * import { variantToSize, getSizeForVariant } from "@trops/dash-react/Utils/componentSizeMap";
 *
 * // Get size for Button2
 * const size = getSizeForVariant("Button2"); // returns "sm"
 *
 * // Check if component is a variant
 * if (variantToSize.Button2) {
 *   console.warn("Button2 is deprecated. Use <Button size='sm' /> instead.");
 * }
 * ```
 */

/**
 * Variant to Size Mapping
 *
 * Maps old variant component names to new size prop values.
 * Default components (without number suffix) map to "md" (medium).
 */
export const variantToSize = {
    // Buttons
    Button: "md", // Default
    Button2: "sm",
    Button3: "xs",

    // Button Icons
    ButtonIcon: "sm", // Default is sm for icon buttons
    ButtonIcon2: "xs",
    ButtonIcon3: "xs", // No ButtonIcon3 currently exists, but added for completeness

    // Panels
    Panel: "md", // Default
    Panel2: "sm",
    Panel3: "xs",

    // Headings
    Heading: "lg", // Old default was larger
    Heading2: "md",
    Heading3: "sm",

    // SubHeadings
    SubHeading: "md",
    SubHeading2: "sm",
    SubHeading3: "xs",

    // Cards
    Card: "md",
    Card2: "sm",
    Card3: "xs",

    // Menu Items
    MenuItem: "md",
    MenuItem2: "sm",
    MenuItem3: "xs",

    // Tags
    Tag: "md",
    Tag2: "sm",
    Tag3: "xs",

    // Breadcrumbs
    Breadcrumbs: "md",
    Breadcrumbs2: "sm",
    Breadcrumbs3: "xs",

    // Alerts
    Alert: "md",
    Alert2: "sm",
    Alert3: "xs",

    // Progress Bars
    ProgressBar: "md",
    ProgressBar2: "sm",
    ProgressBar3: "xs",

    // Toasts
    Toast: "md",
    Toast2: "sm",
    Toast3: "xs",

    // Tables
    Table: "md",
    Table2: "sm",
    Table3: "xs",

    // Toggles
    Toggle: "md",
    Toggle2: "sm",
    Toggle3: "xs",

    // Dashboard Footers
    DashboardFooter: "md",
    DashboardFooter2: "sm",
    DashboardFooter3: "xs",

    // Dash Panels
    DashPanel: "md",
    DashPanel2: "sm",
    DashPanel3: "xs",

    // Paragraphs
    Paragraph: "md",
    Paragraph2: "sm",
    Paragraph3: "xs",
};

/**
 * Component Base Names
 *
 * Maps variant names to their base component name.
 * Used for generating deprecation warnings and migration messages.
 */
export const variantToBase = {
    // Buttons
    Button2: "Button",
    Button3: "Button",

    // Button Icons
    ButtonIcon2: "ButtonIcon",
    ButtonIcon3: "ButtonIcon",

    // Panels
    Panel2: "Panel",
    Panel3: "Panel",

    // Headings
    Heading2: "Heading",
    Heading3: "Heading",

    // SubHeadings
    SubHeading: "Heading", // SubHeading consolidates to Heading
    SubHeading2: "Heading",
    SubHeading3: "Heading",

    // Cards
    Card2: "Card",
    Card3: "Card",

    // Menu Items
    MenuItem2: "MenuItem",
    MenuItem3: "MenuItem",

    // Tags
    Tag2: "Tag",
    Tag3: "Tag",

    // Breadcrumbs
    Breadcrumbs2: "Breadcrumbs",
    Breadcrumbs3: "Breadcrumbs",

    // Alerts
    Alert2: "Alert",
    Alert3: "Alert",

    // Progress Bars
    ProgressBar2: "ProgressBar",
    ProgressBar3: "ProgressBar",

    // Toasts
    Toast2: "Toast",
    Toast3: "Toast",

    // Tables
    Table2: "Table",
    Table3: "Table",

    // Toggles
    Toggle2: "Toggle",
    Toggle3: "Toggle",

    // Dashboard Footers
    DashboardFooter2: "DashboardFooter",
    DashboardFooter3: "DashboardFooter",

    // Dash Panels
    DashPanel2: "DashPanel",
    DashPanel3: "DashPanel",

    // Paragraphs
    Paragraph2: "Paragraph",
    Paragraph3: "Paragraph",
};

/**
 * Get size prop value for a component variant
 *
 * @param {string} componentName - Component name (e.g., "Button2", "Panel3")
 * @returns {string} Size value ("xs", "sm", "md", "lg", "xl")
 */
export function getSizeForVariant(componentName) {
    if (componentName in variantToSize) {
        return variantToSize[componentName];
    }

    // Default to "md" if not found
    console.warn(
        `Component "${componentName}" not found in size mapping. Defaulting to "md".`
    );
    return "md";
}

/**
 * Get base component name from variant
 *
 * @param {string} variantName - Variant name (e.g., "Button2", "Panel3")
 * @returns {string} Base component name (e.g., "Button", "Panel")
 */
export function getBaseComponent(variantName) {
    if (variantName in variantToBase) {
        return variantToBase[variantName];
    }

    // If not a variant, return the name as-is (it's already the base)
    return variantName;
}

/**
 * Generate deprecation warning message
 *
 * @param {string} variantName - Deprecated variant name
 * @returns {string} Deprecation warning message
 */
export function getDeprecationWarning(variantName) {
    const baseComponent = getBaseComponent(variantName);
    const size = getSizeForVariant(variantName);

    if (variantName === baseComponent) {
        // Not a variant, no deprecation warning needed
        return null;
    }

    return `${variantName} is deprecated and will be removed in v1.0.0. Use <${baseComponent} size="${size}" /> instead.`;
}

/**
 * Check if component name is a deprecated variant
 *
 * @param {string} componentName - Component name to check
 * @returns {boolean} True if deprecated variant, false otherwise
 */
export function isDeprecatedVariant(componentName) {
    return componentName in variantToBase;
}

export default {
    variantToSize,
    variantToBase,
    getSizeForVariant,
    getBaseComponent,
    getDeprecationWarning,
    isDeprecatedVariant,
};
