# Alertwise.Ai

AI-assisted cybersecurity alert triage frontend built with Next.js, Tailwind CSS, and shadcn/ui.

The MVP supports the PRD flow:

- Paste a raw security alert or select one of five synthetic sample alerts.
- Submit the alert through the `/api/triage` route.
- Review severity, confidence, MITRE ATT&CK mapping, suspicious indicators, reasoning, response actions, false positive considerations, analyst notes, and a SOC-style final report.
- Copy the final report into a ticket or case note.

The API route requires Azure OpenAI environment variables. There is no local demo triage fallback, so analysis runs only through the configured model endpoint.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Azure OpenAI Configuration

Copy `.env.example` to `.env.local` and set:

```bash
AZURE_OPENAI_ENDPOINT=https://your-resource.services.ai.azure.com/api/projects/your-project
AZURE_OPENAI_API_KEY=your-api-key
AZURE_OPENAI_DEPLOYMENT=your-deployment-name
AZURE_OPENAI_API_VERSION=2025-04-01-preview
```

Restart `npm run dev` after creating or editing `.env.local`.

For Microsoft Foundry project endpoints, use the deployment name shown in the
Models table, such as `gpt-4.1-mini`. The backend will route project endpoints to
`/models/chat/completions` automatically.

## Safety Notice

Alertwise.Ai supports initial defensive triage only. AI-generated analysis must be validated by a human analyst using trusted security telemetry before containment, escalation, disciplinary action, or case closure.

## Project Structure

```text
app/
  api/triage/route.ts
  layout.tsx
  page.tsx
components/
  alert-input.tsx
  sample-alerts.tsx
  triage-result.tsx
  triage-workspace.tsx
  ui/
lib/
  prompt.ts
  sample-alerts.ts
  types.ts
```

## Scripts

```bash
npm run dev
npm run lint
npm run build
```
