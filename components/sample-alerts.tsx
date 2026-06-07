"use client"

import { ShieldAlert } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { sampleAlerts } from "@/lib/sample-alerts"
import type { SampleAlert } from "@/lib/types"

type SampleAlertsProps = {
  selectedId?: string
  onSelect: (sample: SampleAlert) => void
}

export function SampleAlerts({ selectedId, onSelect }: SampleAlertsProps) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
      {sampleAlerts.map((sample) => (
        <Card
          key={sample.id}
          className={`rounded-lg py-0 transition-colors ${
            selectedId === sample.id
              ? "border-cyan-500 bg-cyan-500/10"
              : "border-border bg-card hover:border-cyan-700/50"
          }`}
        >
          <CardContent className="p-3">
            <Button
              type="button"
              variant="ghost"
              className="h-auto w-full justify-start p-0 text-left hover:bg-transparent"
              onClick={() => onSelect(sample)}
            >
              <span className="flex w-full min-w-0 items-start gap-2">
                <ShieldAlert className="mt-0.5 size-4 shrink-0 text-cyan-600" />
                <span className="min-w-0 space-y-1">
                  <span className="block truncate text-sm font-medium">
                    {sample.title}
                  </span>
                  <span className="flex flex-wrap items-center gap-1.5">
                    <Badge variant="secondary" className="rounded-md text-[11px]">
                      {sample.category}
                    </Badge>
                    <Badge variant="outline" className="rounded-md text-[11px]">
                      {sample.severityHint}
                    </Badge>
                  </span>
                </span>
              </span>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
