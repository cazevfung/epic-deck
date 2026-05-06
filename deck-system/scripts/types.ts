export type TemplateId =
  | "T01"
  | "T02"
  | "T03"
  | "T04"
  | "T05"
  | "T06"
  | "T07"
  | "T08"
  | "T09"
  | "T10";

export type Priority = "Must Have" | "Should Have" | "Optional";

export interface PageBrief {
  title: string;
  templateId?: TemplateId;
  priority: Priority;
  contentOwner?: string;
  takeaway: string;
  supportingPoints: string[];
  metrics?: string[];
  dataSource?: string;
  sourceStatus?: "Final" | "To Be Confirmed";
  assets?: string[];
  assetOwner?: string;
  assetStatus?: "Final" | "Placeholder" | "Missing";
  productionNotes?: string;
}
