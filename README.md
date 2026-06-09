# Alertwise.Ai

**Alertwise.Ai** is an AI-assisted cybersecurity alert triage application built with **Next.js**, **Tailwind CSS**, and **shadcn/ui**.

The project is designed as a lightweight SOC triage assistant for reviewing raw security alerts, identifying suspicious indicators, mapping activity to MITRE ATT&CK techniques, and generating a structured SOC-style report.

This project was built as a hackathon-ready MVP for demonstrating how an AI reasoning agent can support the initial alert triage workflow.

---

## Overview

Security analysts often need to review noisy alerts quickly while still producing consistent reasoning, severity classification, response actions, and documentation.

Alertwise.Ai supports this workflow by allowing a user to paste a raw security alert or select a synthetic sample alert, submit it to an AI-powered triage route, and receive structured output that can be reviewed, validated, and copied into a ticket or case note.

The application does **not** replace a SOC analyst. It provides AI-assisted triage output that must be validated against trusted security telemetry before operational action is taken.

---

## Core MVP Flow

The MVP supports the following flow:

1. Paste a raw security alert or select one of five synthetic sample alerts.
2. Submit the alert through the `/api/triage` route.
3. Review structured triage output, including:

   * Severity
   * Confidence score
   * MITRE ATT&CK mapping
   * Suspicious indicators
   * Reasoning
   * Recommended response actions
   * False positive considerations
   * Analyst notes
   * SOC-style final report
4. Copy the final report into a ticket, case note, or investigation summary.

---

## Features

* Raw security alert input
* Five synthetic cybersecurity sample alerts
* AI-assisted severity classification
* Confidence scoring
* MITRE ATT&CK technique mapping
* Suspicious indicator extraction
* Step-by-step triage reasoning
* Recommended incident response actions
* False positive considerations
* Analyst notes
* SOC-style final report generation
* Copy-ready final report
* Responsible AI safety notice
* Clean cybersecurity-focused UI

---

## Tech Stack

* **Next.js**
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* **Azure OpenAI / Microsoft Foundry-compatible endpoint**
* **GitHub Copilot-assisted development**

---

## AI Agent

The working AI agent in this project is the **Alertwise.Ai Triage Agent**.

The agent is designed to analyze security alert text and return structured defensive triage output. It performs:

* Alert summarization
* Severity classification
* MITRE ATT&CK mapping
* Suspicious indicator identification
* Investigation reasoning
* Recommended response actions
* False positive considerations
* SOC-style report generation

The agent is intended for **defensive cybersecurity analysis only**.

---

## AI-Assisted Development

GitHub Copilot was used during development as an AI-assisted coding tool to support:

* Code generation
* UI refactoring
* API route improvement
* Error handling
* Debugging support
* Documentation improvement

The working AI agent submitted for this project is **Alertwise.Ai**, not GitHub Copilot. GitHub Copilot was used as part of the development workflow, while the application’s triage analysis runs through the configured AI model endpoint.

---

## Azure OpenAI / Microsoft Foundry Configuration

The API route requires Azure OpenAI or Microsoft Foundry-compatible environment variables.

For the Reasoning Agents challenge, Alertwise.Ai is designed to use a Microsoft Foundry or Azure OpenAI-compatible model endpoint.

Create a `.env.local` file from `.env.example`:

```bash
cp .env.example .env.local
```

Then configure:

```env
AZURE_OPENAI_ENDPOINT=https://your-resource.services.ai.azure.com/api/projects/your-project
AZURE_OPENAI_API_KEY=your-api-key
AZURE_OPENAI_DEPLOYMENT=your-deployment-name
AZURE_OPENAI_API_VERSION=2025-04-01-preview
```

Restart the development server after creating or editing `.env.local`.

```bash
npm run dev
```

For Microsoft Foundry project endpoints, use the deployment name shown in the Models table, such as:

```env
AZURE_OPENAI_DEPLOYMENT=gpt-4.1-mini
```

The backend automatically routes project endpoints to:

```text
/models/chat/completions
```

---

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the application:

```text
http://localhost:3000
```

---

## Project Structure

```text
app/
  api/
    triage/
      route.ts
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
  utils.ts

docs/
  PRD_Alertwise_AI.md

public/
```

---

## Scripts

Run the development server:

```bash
npm run dev
```

Run linting:

```bash
npm run lint
```

Build for production:

```bash
npm run build
```

---

## Safety Notice

Alertwise.Ai supports **initial defensive triage only**.

AI-generated analysis must be validated by a human security analyst using trusted telemetry before any containment, escalation, disciplinary action, legal action, or case closure.

The application should not be used as the sole source of truth for security decisions.

---

## Limitations

The current MVP has the following limitations:

* No database
* No login or user management
* No saved triage history
* No SIEM integration
* No live log ingestion
* No automatic containment action
* No production security workflow automation

These limitations are intentional for the hackathon MVP. The focus is to demonstrate a working AI-assisted triage workflow.

---

## Future Improvements

Potential future enhancements include:

* Saved triage history
* Case management workflow
* Export to PDF
* Integration with Microsoft Sentinel or other SIEM tools
* Analyst feedback loop
* Detection rule recommendation
* IOC enrichment
* Multi-alert correlation
* Role-based access control
* Audit logging

---

## Responsible Use

Alertwise.Ai is designed for cybersecurity education, portfolio demonstration, and defensive alert triage assistance.

The project should not be used to make automated enforcement decisions without human review.
## AI-Assisted Development
