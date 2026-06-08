"use client"

import { Loader2, Play, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type ProviderStatus = {
  configured: boolean
  message: string
}

type AlertInputProps = {
  value: string
  isLoading: boolean
  providerStatus: ProviderStatus
  onChange: (value: string) => void
  onAnalyze: () => void
  onClear: () => void
}

export function AlertInput({
  value,
  isLoading,
  providerStatus,
  onChange,
  onAnalyze,
  onClear,
}: AlertInputProps) {
  const isEmpty = value.trim().length === 0

  return (
    <div className="space-y-3">
      <Textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Paste raw alert details here..."
        className="min-h-[280px] resize-y rounded-lg border-slate-300 bg-white font-mono text-sm leading-6 shadow-none focus-visible:ring-cyan-500/40 dark:border-slate-700 dark:bg-slate-950"
      />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          {value.trim().length} characters ready for triage
        </p>
        <div className="flex flex-col items-start gap-2 sm:items-end">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClear}
              disabled={isLoading || isEmpty}
            >
              <RotateCcw />
              Clear
            </Button>
            <Button
              type="button"
              onClick={onAnalyze}
              disabled={isLoading || isEmpty}
              className="bg-cyan-700 text-white hover:bg-cyan-800"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : <Play />}
              Analyze Alert
            </Button>
          </div>
          <p className="flex items-center gap-2 text-xs text-muted-foreground">
            <span
              className={
                providerStatus.configured
                  ? "size-2 rounded-full bg-emerald-500"
                  : "size-2 rounded-full bg-amber-500"
              }
              aria-hidden="true"
            />
            {providerStatus.message}
          </p>
        </div>
      </div>
    </div>
  )
}
