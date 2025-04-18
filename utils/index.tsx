import { twMerge } from "tailwind-merge";
import clsx, { type ClassValue } from "clsx";
import { AccessibilityFeatures, AccessibilitySlice } from "types/interfaces/accessibility.interface";

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs));
}

export function getAccessibilityClassName(features: AccessibilitySlice["features"]) {
   const classNames: string[] = [];

   Object.keys(features).forEach((feat) => {
      const feat_key = feat as AccessibilityFeatures;
      if (features[feat_key] !== 0) {
         switch (feat_key) {
            case "contrast +":
               classNames.push(`invert-colors-${features[feat_key]}`);
               break;
            case "highlight links":
               classNames.push(`highlight-links`);
               break;
            case "bigger text":
               classNames.push(`bigger-text-${features[feat_key]}`);
               break;
            case "text spacing":
               classNames.push(`text-spacing-${features[feat_key]}`);
               break;
            case "hide images":
               classNames.push(`hide-images`);
               break;
            case "cursor":
               classNames.push(`big-cursor-${features[feat_key]}`);
               break;
            case "line height":
               classNames.push(`line-height-${features[feat_key]}`);
               break;
            case "text align":
               classNames.push(`text-align-${features[feat_key]}`);
               break;
            case "saturation":
               classNames.push(`saturation-${features[feat_key]}`);
               break;
            case "legible fonts":
               classNames.push(`legible-fonts`);
               break;
         }
      }
   });

   return cn(...classNames);
}
