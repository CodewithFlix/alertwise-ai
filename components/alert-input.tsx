"use client"

import { Loader2, Play, RotateCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

type AlertInputProps = {
  value: string
  isLoading: boolean
  onChange: (value: string) => void
  onAnalyze: () => void
  onClear: () => void
}

export function AlertInput({
  value,
  isLoading,
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
      </div>
    </div>
  )
}
