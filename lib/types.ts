export type Severity = "Low" | "Medium" | "High" | "Critical"

export type MitreTechnique = {
  id: string
  name: string
  reason: string
}

export type TriageResult = {
  severity: Severity
  confidence: number
  summary: string
  mitreTechniques: MitreTechnique[]
  indicators: string[]
  reasoning: string
  recommendedActions: string[]
  analystNotes: string
  falsePositiveConsiderations: string[]
  finalReport: string
}

export type SampleAlert = {
  id: string
  title: string
  category: string
  severityHint: Severity
  alert: string
}
