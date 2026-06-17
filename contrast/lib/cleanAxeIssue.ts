/**
 * lib/cleanAxeIssue.ts
 *
 * Transforms raw axe-core violations into clean AuditIssue objects.
 *
 * axe-core returns violations in this shape:
 * {
 *   id: "color-contrast",
 *   impact: "critical" | "serious" | "moderate" | "minor",
 *   description: "Fix all of the following:\n  Element has insufficient color contrast...",
 *   help: "Elements must have sufficient color contrast",
 *   helpUrl: "https://dequeuniversity.com/...",
 *   nodes: [{ target: [".footer-link"], failureSummary: "..." }]
 * }
 *
 * We want:
 * {
 *   severity: "critical" | "warn" | "info",
 *   message: "Elements must have sufficient color contrast",  ← use help, not description
 *   element: ".footer-link",
 *   value: "2.1:1",   ← extracted from failureSummary if available
 *   category: "contrast" | "altText" | "typography" | "spacing"
 * }
 */

import { AuditIssue } from "@/lib/types"

// Maps axe-core impact levels to our severity tiers
function mapSeverity(impact: string | null | undefined): AuditIssue["severity"] {
  switch (impact) {
    case "critical":
    case "serious":
      return "critical"
    case "moderate":
      return "warn"
    case "minor":
    default:
      return "info"
  }
}

// Maps axe violation IDs to our categories
function mapCategory(axeId: string): AuditIssue["category"] {
  const contrastIds = ["color-contrast", "color-contrast-enhanced"]
  const altTextIds  = ["image-alt", "input-image-alt", "area-alt", "role-img-alt", "svg-img-alt"]
  const typographyIds = ["font-size", "meta-viewport"]

  if (contrastIds.includes(axeId))  return "contrast"
  if (altTextIds.includes(axeId))   return "altText"
  if (typographyIds.includes(axeId)) return "typography"
  return "contrast" // default — most axe issues are accessibility/contrast related
}

// Extracts a short readable value from axe failureSummary
// e.g. "Fix any of the following:\n  Element has a contrast ratio of 2.10:1..." → "2.1:1"
function extractValue(failureSummary: string | undefined, axeId: string): string | undefined {
  if (!failureSummary) return undefined

  // Contrast ratio
  const ratioMatch = failureSummary.match(/contrast ratio of ([\d.]+):1/i)
  if (ratioMatch) {
    const ratio = parseFloat(ratioMatch[1])
    return `${ratio.toFixed(1)}:1`
  }

  // Missing alt
  if (axeId === "image-alt" || axeId.includes("alt")) {
    return "missing"
  }

  return undefined
}

// Cleans the axe description field — but we prefer `help` which is always clean
function cleanDescription(help: string, description: string): string {
  // `help` is always a clean, short human sentence from axe
  // e.g. "Images must have alternate text"
  // Use it first
  if (help && help.trim().length > 0) {
    return help.trim()
  }

  // Fallback: strip axe's preamble from description
  return description
    .replace(/^Fix (all|any) of the following:\s*/i, "")
    .replace(/\n+/g, " · ")
    .replace(/^\s*[•·\-]\s*/, "")
    .trim()
}

interface AxeNode {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  target: any
  failureSummary?: string
}

interface AxeViolation {
  id: string
  impact?: string | null
  description: string
  help: string
  helpUrl: string
  nodes: AxeNode[]
}

/**
 * Main export: transforms an array of axe violations into clean AuditIssue[].
 * Each node in a violation becomes its own issue row (for specific selector display).
 * Capped at 100 issues to avoid overwhelming the UI.
 */
export function cleanAxeViolations(violations: AxeViolation[]): AuditIssue[] {
  const issues: AuditIssue[] = []

  for (const violation of violations) {
    const severity = mapSeverity(violation.impact)
    const category = mapCategory(violation.id)
    const message  = cleanDescription(violation.help, violation.description)

    for (const node of violation.nodes) {
      const element = node.target?.[0] ?? undefined
      const value   = extractValue(node.failureSummary, violation.id)

      issues.push({ severity, category, message, element, value })

      // Cap total issues
      if (issues.length >= 100) return issues
    }
  }

  return issues
}
