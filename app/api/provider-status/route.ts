export const dynamic = "force-dynamic"

export function GET() {
  const hasEndpoint = Boolean(process.env.AZURE_OPENAI_ENDPOINT)
  const hasApiKey = Boolean(process.env.AZURE_OPENAI_API_KEY)
  const hasDeployment = Boolean(process.env.AZURE_OPENAI_DEPLOYMENT)
  const configured = hasEndpoint && hasApiKey && hasDeployment

  return Response.json({
    configured,
    provider: "Azure OpenAI / Microsoft Foundry",
    message: configured
      ? "AI Provider: Azure OpenAI / Microsoft Foundry endpoint configured"
      : "Model endpoint not configured",
  })
}
