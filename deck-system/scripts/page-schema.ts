import type { TemplateId } from "./types";

export interface TemplateRule {
  id: TemplateId;
  name: string;
  maxSupportingPoints: number;
  requiresTakeaway: boolean;
  requiresSource: boolean;
}

export const templateRules: Record<TemplateId, TemplateRule> = {
  T01: {
    id: "T01",
    name: "Cover Page",
    maxSupportingPoints: 0,
    requiresTakeaway: false,
    requiresSource: false,
  },
  T02: {
    id: "T02",
    name: "Section Divider",
    maxSupportingPoints: 0,
    requiresTakeaway: false,
    requiresSource: false,
  },
  T03: {
    id: "T03",
    name: "Core Insight",
    maxSupportingPoints: 3,
    requiresTakeaway: true,
    requiresSource: false,
  },
  T04: {
    id: "T04",
    name: "Two-Column Proof",
    maxSupportingPoints: 3,
    requiresTakeaway: true,
    requiresSource: true,
  },
  T05: {
    id: "T05",
    name: "Three-Pillar / Three-Card",
    maxSupportingPoints: 3,
    requiresTakeaway: true,
    requiresSource: false,
  },
  T06: {
    id: "T06",
    name: "Case Study",
    maxSupportingPoints: 3,
    requiresTakeaway: true,
    requiresSource: true,
  },
  T07: {
    id: "T07",
    name: "Comparison",
    maxSupportingPoints: 3,
    requiresTakeaway: true,
    requiresSource: false,
  },
  T08: {
    id: "T08",
    name: "Timeline / Roadmap",
    maxSupportingPoints: 5,
    requiresTakeaway: true,
    requiresSource: false,
  },
  T09: {
    id: "T09",
    name: "Budget / Resource Allocation",
    maxSupportingPoints: 5,
    requiresTakeaway: true,
    requiresSource: true,
  },
  T10: {
    id: "T10",
    name: "Closing Page",
    maxSupportingPoints: 2,
    requiresTakeaway: true,
    requiresSource: false,
  },
};
