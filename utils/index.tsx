import { twMerge } from "tailwind-merge";
import clsx, { type ClassValue } from "clsx";
import { AccessibilityFeatures } from "types/interfaces/accessibility.interface";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export function getAccessibilityClassName(features: AccessibilityFeatures[]) {
   return cn(
      features.includes("big-cursor") && "big-cursor",
      features.includes("bigger-text") && "bigger-text",
      features.includes("dark-contrast") && "dark-contrast",
      features.includes("highlight-links") && "highlight-links",
      features.includes("invert-colors") && "invert-colors",
      features.includes("legible-fonts") && "legible-fonts"
   );
}
