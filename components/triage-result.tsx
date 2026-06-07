"use client"

import {
  CheckCircle2,
  Clipboard,
  Copy,
  FileText,
  Gauge,
  ListChecks,
  Map,
  MessageSquareWarning,
  Radar,
  ShieldCheck,
} from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { Severity, TriageResult as TriageResultType } from "@/lib/types"

type TriageResultProps = {
  result: TriageResultType
  copied: boolean
  onCopyReport: () => void
}

const severityStyles: Record<Severity, string> = {
  Low: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Medium: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  High: "border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-300",
  Critical: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-300",
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Radar
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-cyan-600" />
        <h3 className="text-sm font-semibold uppercase tracking-normal text-slate-900 dark:text-slate-100">
          {title}
        </h3>
      </div>
      {children}
    </section>
  )
}

export function TriageResult({
  result,
  copied,
  onCopyReport,
}: TriageResultProps) {
  return (
    <Card className="rounded-lg border-slate-200 shadow-sm dark:border-slate-800">
      <CardHeader className="gap-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <ShieldCheck className="size-5 text-cyan-600" />
              Triage Result
            </CardTitle>
            <CardDescription>{result.summary}</CardDescription>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "w-fit rounded-md px-3 py-1 text-sm font-semibold",
              severityStyles[result.severity]
            )}
          >
            {result.severity}
          </Badge>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Gauge className="size-4" />
              Confidence
            </span>
            <span className="font-semibold">{result.confidence}%</span>
          </div>
          <Progress value={result.confidence} className="h-2" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Separator />

        <Section icon={Map} title="MITRE ATT&CK Mapping">
          {result.mitreTechniques.length > 0 ? (
            <div className="grid gap-2">
              {result.mitreTechniques.map((technique) => (
                <div
                  key={`${technique.id}-${technique.name}`}
                  className="rounded-lg border bg-muted/30 p-3"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="rounded-md bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950">
                      {technique.id}
                    </Badge>
                    <span className="font-medium">{technique.name}</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {technique.reason}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              Mapping is uncertain from the submitted evidence.
            </p>
          )}
        </Section>

        <Section icon={Radar} title="Suspicious Indicators">
          <div className="grid gap-2 sm:grid-cols-2">
            {result.indicators.map((indicator) => (
              <div
                key={indicator}
                className="rounded-lg border bg-white p-3 font-mono text-xs text-slate-700 dark:bg-slate-950 dark:text-slate-300"
              >
                {indicator}
              </div>
            ))}
          </div>
        </Section>

        <Section icon={MessageSquareWarning} title="Reasoning">
          <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
            {result.reasoning}
          </p>
        </Section>

        <Section icon={ListChecks} title="Recommended Actions">
          <ul className="grid gap-2">
            {result.recommendedActions.map((action) => (
              <li key={action} className="flex gap-2 text-sm leading-6">
                <CheckCircle2 className="mt-1 size-4 shrink-0 text-cyan-600" />
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Alert className="rounded-lg border-amber-500/30 bg-amber-500/10">
          <MessageSquareWarning className="size-4 text-amber-600" />
          <AlertTitle>Analyst Validation</AlertTitle>
          <AlertDescription>{result.analystNotes}</AlertDescription>
        </Alert>

        <Section icon={Clipboard} title="False Positive Considerations">
          <ul className="grid gap-2">
            {result.falsePositiveConsiderations.map((consideration) => (
              <li key={consideration} className="text-sm leading-6">
                {consideration}
              </li>
            ))}
          </ul>
        </Section>

        <section className="rounded-lg border bg-slate-950 p-4 text-slate-50">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <FileText className="size-4 text-cyan-300" />
              <h3 className="text-sm font-semibold uppercase tracking-normal">
                Final SOC Report
              </h3>
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={onCopyReport}
              title="Copy final report"
              className="bg-slate-800 text-slate-50 hover:bg-slate-700"
            >
              <Copy />
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <p className="whitespace-pre-wrap text-sm leading-6 text-slate-200">
            {result.finalReport}
          </p>
        </section>
      </CardContent>
    </Card>
  )
}
