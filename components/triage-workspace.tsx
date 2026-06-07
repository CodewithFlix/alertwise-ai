"use client"

import { useState } from "react"
import { AlertTriangle, Bot, Shield, Sparkles } from "lucide-react"

import { AlertInput } from "@/components/alert-input"
import { SampleAlerts } from "@/components/sample-alerts"
import { TriageResult } from "@/components/triage-result"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { SampleAlert, TriageResult as TriageResultType } from "@/lib/types"

export function TriageWorkspace() {
  const [alertText, setAlertText] = useState("")
  const [selectedSampleId, setSelectedSampleId] = useState<string>()
  const [result, setResult] = useState<TriageResultType>()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  async function copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const textarea = document.createElement("textarea")
      textarea.value = text
      textarea.setAttribute("readonly", "true")
      textarea.style.position = "fixed"
      textarea.style.top = "-9999px"
      document.body.appendChild(textarea)
      textarea.select()

      const didCopy = document.execCommand("copy")
      document.body.removeChild(textarea)

      if (!didCopy) {
        throw new Error("Clipboard copy is unavailable in this browser context.")
      }
    }
  }

  function handleSelectSample(sample: SampleAlert) {
    setAlertText(sample.alert)
    setSelectedSampleId(sample.id)
    setError("")
  }

  async function handleAnalyze() {
    const trimmed = alertText.trim()

    if (!trimmed) {
      setError("Paste or select an alert before running triage.")
      return
    }

    setIsLoading(true)
    setError("")
    setCopied(false)

    try {
      const response = await fetch("/api/triage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alertText: trimmed }),
      })
      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload?.error || "Unable to analyze this alert.")
      }

      setResult(payload)
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to analyze this alert."
      )
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCopyReport() {
    if (!result?.finalReport) {
      return
    }

    try {
      await copyText(result.finalReport)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to copy the report."
      )
    }
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#eef9fb_42%,#f8fafc_100%)] text-slate-950 dark:bg-[linear-gradient(180deg,#020617_0%,#082f49_48%,#020617_100%)] dark:text-slate-50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-4 border-b border-slate-200 pb-5 dark:border-slate-800 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className="rounded-md border-cyan-600/30 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300"
              >
                Reasoning Agent MVP
              </Badge>
              <Badge variant="secondary" className="rounded-md">
                Defensive triage only
              </Badge>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-normal sm:text-4xl">
                Alertwise.Ai
              </h1>
              <p className="max-w-3xl text-base leading-7 text-slate-600 dark:text-slate-300">
                AI-assisted security alert triage for severity classification,
                MITRE ATT&CK mapping, analyst reasoning, response guidance, and
                copy-ready SOC reports.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="rounded-lg border bg-white/80 p-3 dark:bg-slate-950/70">
              <div className="font-semibold">5</div>
              <div className="text-muted-foreground">Samples</div>
            </div>
            <div className="rounded-lg border bg-white/80 p-3 dark:bg-slate-950/70">
              <div className="font-semibold">4</div>
              <div className="text-muted-foreground">Severities</div>
            </div>
            <div className="rounded-lg border bg-white/80 p-3 dark:bg-slate-950/70">
              <div className="font-semibold">JSON</div>
              <div className="text-muted-foreground">Output</div>
            </div>
          </div>
        </header>

        <Alert className="rounded-lg border-cyan-600/30 bg-cyan-500/10">
          <Shield className="size-4 text-cyan-700 dark:text-cyan-300" />
          <AlertTitle>Human validation required</AlertTitle>
          <AlertDescription>
            Alertwise.Ai supports initial cybersecurity triage. Validate all
            AI-generated findings with trusted telemetry before containment,
            escalation, disciplinary action, or closure.
          </AlertDescription>
        </Alert>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="space-y-6">
            <Card className="rounded-lg border-slate-200 shadow-sm dark:border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="size-5 text-cyan-600" />
                  Alert Intake
                </CardTitle>
                <CardDescription>
                  Paste raw security telemetry or select a synthetic demo alert.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <SampleAlerts
                  selectedId={selectedSampleId}
                  onSelect={handleSelectSample}
                />
                <AlertInput
                  value={alertText}
                  isLoading={isLoading}
                  onChange={(value) => {
                    setAlertText(value)
                    setSelectedSampleId(undefined)
                  }}
                  onAnalyze={handleAnalyze}
                  onClear={() => {
                    setAlertText("")
                    setSelectedSampleId(undefined)
                    setError("")
                  }}
                />
              </CardContent>
            </Card>

            {error ? (
              <Alert className="rounded-lg border-red-500/30 bg-red-500/10">
                <AlertTriangle className="size-4 text-red-600" />
                <AlertTitle>Analysis failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}
          </div>

          <div className="space-y-6">
            {isLoading ? (
              <Card className="rounded-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="size-5 text-cyan-600" />
                    Analyzing alert
                  </CardTitle>
                  <CardDescription>
                    Building severity, reasoning, MITRE mapping, and report.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-9 w-40" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-11/12" />
                  <Skeleton className="h-24 w-full" />
                  <Skeleton className="h-32 w-full" />
                </CardContent>
              </Card>
            ) : result ? (
              <TriageResult
                result={result}
                copied={copied}
                onCopyReport={handleCopyReport}
              />
            ) : (
              <Card className="rounded-lg border-dashed border-slate-300 bg-white/70 shadow-none dark:border-slate-700 dark:bg-slate-950/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="size-5 text-cyan-600" />
                    Awaiting analysis
                  </CardTitle>
                  <CardDescription>
                    Results will appear here with severity, confidence, MITRE
                    mapping, reasoning, response steps, false positive notes,
                    and the final SOC report.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {[
                      "Severity badge",
                      "Confidence score",
                      "MITRE techniques",
                      "Copyable report",
                    ].map((item) => (
                      <div
                        key={item}
                        className="rounded-lg border bg-white p-3 text-sm text-muted-foreground dark:bg-slate-950"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
