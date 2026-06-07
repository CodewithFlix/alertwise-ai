import { alertwiseSystemPrompt } from "@/lib/prompt"
import type { Severity, TriageResult } from "@/lib/types"

const severities: Severity[] = ["Low", "Medium", "High", "Critical"]

function normalizeResult(value: unknown): TriageResult {
  const result = value as Partial<TriageResult>

  if (!result || typeof result !== "object") {
    throw new Error("AI response was not an object.")
  }

  if (!result.severity || !severities.includes(result.severity)) {
    throw new Error("AI response did not include a valid severity.")
  }

  return {
    severity: result.severity,
    confidence: Math.max(0, Math.min(100, Number(result.confidence) || 0)),
    summary: String(result.summary || "No summary returned."),
    mitreTechniques: Array.isArray(result.mitreTechniques)
      ? result.mitreTechniques.map((technique) => ({
          id: String(technique.id || "Unmapped"),
          name: String(technique.name || "Technique uncertain"),
          reason: String(technique.reason || "Insufficient detail provided."),
        }))
      : [],
    indicators: Array.isArray(result.indicators)
      ? result.indicators.map(String)
      : [],
    reasoning: String(result.reasoning || "No reasoning returned."),
    recommendedActions: Array.isArray(result.recommendedActions)
      ? result.recommendedActions.map(String)
      : [],
    analystNotes: String(
      result.analystNotes ||
        "Validate AI-generated findings with trusted security telemetry."
    ),
    falsePositiveConsiderations: Array.isArray(
      result.falsePositiveConsiderations
    )
      ? result.falsePositiveConsiderations.map(String)
      : [],
    finalReport: String(result.finalReport || "No final report returned."),
  }
}

async function analyzeWithAzureOpenAI(alertText: string) {
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT
  const apiKey = process.env.AZURE_OPENAI_API_KEY
  const deployment = process.env.AZURE_OPENAI_DEPLOYMENT
  const apiVersion = process.env.AZURE_OPENAI_API_VERSION || "2025-04-01-preview"

  const missingVariables = [
    ["AZURE_OPENAI_ENDPOINT", endpoint],
    ["AZURE_OPENAI_API_KEY", apiKey],
    ["AZURE_OPENAI_DEPLOYMENT", deployment],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name)

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing required Azure OpenAI environment variables: ${missingVariables.join(
        ", "
      )}. Create .env.local and restart the dev server.`
    )
  }

  const azureEndpoint = endpoint as string
  const azureApiKey = apiKey as string
  const azureDeployment = deployment as string
  const endpointUrl = new URL(azureEndpoint)
  const isFoundryProjectEndpoint =
    endpointUrl.hostname.endsWith(".services.ai.azure.com") &&
    endpointUrl.pathname.startsWith("/api/projects/")
  const requestUrl = isFoundryProjectEndpoint
    ? `${endpointUrl.origin}/models/chat/completions?api-version=${apiVersion}`
    : `${azureEndpoint.replace(
        /\/$/,
        ""
      )}/openai/deployments/${azureDeployment}/chat/completions?api-version=${apiVersion}`
  const response = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "api-key": azureApiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...(isFoundryProjectEndpoint ? { model: azureDeployment } : {}),
      messages: [
        { role: "system", content: alertwiseSystemPrompt },
        { role: "user", content: alertText },
      ],
      temperature: 0.2,
      max_tokens: 1400,
      response_format: { type: "json_object" },
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Azure OpenAI request failed: ${response.status} ${body}`)
  }

  const payload = await response.json()
  const content = payload?.choices?.[0]?.message?.content

  if (typeof content !== "string") {
    throw new Error("Azure OpenAI response did not include message content.")
  }

  return normalizeResult(JSON.parse(content))
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const alertText = String(body?.alertText || "").trim()

    if (!alertText) {
      return Response.json(
        { error: "Paste or select an alert before running triage." },
        { status: 400 }
      )
    }

    const aiResult = await analyzeWithAzureOpenAI(alertText)

    return Response.json(aiResult)
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Triage failed because of an unexpected error."

    return Response.json({ error: message }, { status: 500 })
  }
}
