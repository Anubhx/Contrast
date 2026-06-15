import { detectButtonDrift } from './lib/detectors/buttonDrift';
import { detectSpacingDrift } from './lib/detectors/spacingDrift';
import { detectTypographyDrift } from './lib/detectors/typographyDrift';
import { detectColorDrift } from './lib/detectors/colorDrift';

console.log("--- Button Drift Test ---");
const buttons = [
  { borderRadius: "4px", padding: "10px 20px", backgroundColor: "rgb(0, 0, 255)", borderStyle: "none" },
  { borderRadius: "4px", padding: "10px 20px", backgroundColor: "rgb(0, 0, 255)", borderStyle: "none" }, // Duplicate
  { borderRadius: "8px", padding: "10px 20px", backgroundColor: "rgb(0, 0, 255)", borderStyle: "none" }, // Different radius
  { borderRadius: "4px", padding: "8px 16px", backgroundColor: "rgb(0, 0, 255)", borderStyle: "none" }, // Different padding
];
console.log(detectButtonDrift(buttons));

console.log("\n--- Spacing Drift Test ---");
const spacing = [8, 16, 24, 10, 15, 32, 0];
console.log(detectSpacingDrift(spacing));

console.log("\n--- Typography Drift Test ---");
const typography = [
  { fontFamily: "Inter", fontSize: "16px", fontWeight: "400" },
  { fontFamily: "Inter", fontSize: "16px", fontWeight: "400" }, // Duplicate
  { fontFamily: "Inter", fontSize: "18px", fontWeight: "600" },
  { fontFamily: "Roboto", fontSize: "16px", fontWeight: "400" },
];
console.log(detectTypographyDrift(typography));

console.log("\n--- Color Drift Test ---");
const colors = ["#ffffff", "#000000", "#ffffff", "#ff0000", "rgb(0, 0, 0)"]; // In DOM, Playwright will return computed rgb/rgba, so we'll pass rgb.
console.log(detectColorDrift(colors));
