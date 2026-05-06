import { templateRules } from "./page-schema";
import type { PageBrief } from "./types";

export interface ValidationIssue {
  field: string;
  message: string;
}

export function validatePageBrief(brief: PageBrief): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!brief.title || !brief.title.trim()) {
    issues.push({ field: "title", message: "Page title is required." });
  }

  if (!brief.takeaway || !brief.takeaway.trim()) {
    issues.push({
      field: "takeaway",
      message: "One-sentence takeaway is required.",
    });
  }

  if (!brief.supportingPoints || brief.supportingPoints.length === 0) {
    issues.push({
      field: "supportingPoints",
      message: "At least one supporting point is required.",
    });
  }

  if (!brief.templateId) {
    issues.push({
      field: "templateId",
      message: "Template ID should be assigned before production.",
    });
    return issues;
  }

  const rule = templateRules[brief.templateId];

  if (brief.supportingPoints.length > rule.maxSupportingPoints) {
    issues.push({
      field: "supportingPoints",
      message: `Template ${rule.id} allows at most ${rule.maxSupportingPoints} supporting points.`,
    });
  }

  if (rule.requiresTakeaway && !brief.takeaway.trim()) {
    issues.push({
      field: "takeaway",
      message: `Template ${rule.id} requires a takeaway.`,
    });
  }

  if (rule.requiresSource && !brief.dataSource?.trim()) {
    issues.push({
      field: "dataSource",
      message: `Template ${rule.id} requires a data source or proof source.`,
    });
  }

  return issues;
}
