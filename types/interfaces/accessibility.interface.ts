export type AccessibilityFeatures =
   | "invert-colors"
   | "dark-contrast"
   | "highlight-links"
   | "bigger-text"
   | "legible-fonts"
   | "big-cursor"
   | "pause-animations";

export interface AccessibilitySlice {
   features: AccessibilityFeatures[];
}
