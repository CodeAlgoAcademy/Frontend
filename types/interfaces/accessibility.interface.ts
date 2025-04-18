export type AccessibilityFeatures =
   | "contrast +"
   | "screen reader"
   | "highlight links"
   | "bigger text"
   | "text spacing"
   | "pause animations"
   | "hide images"
   | "cursor"
   | "line height"
   | "text align"
   | "saturation"
   | "dictionary"
   | "legible fonts";

export interface AccessibilitySlice {
   features: Record<AccessibilityFeatures, 0 | 1 | 2 | 3 | 4>;
   oversizedWidgets: boolean;
}
