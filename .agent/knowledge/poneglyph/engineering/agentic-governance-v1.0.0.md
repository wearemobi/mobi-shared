# M.O.B.I.™ · Agentic Governance & Prompt Injection v1.0.0

> Controlling the Sovereign Era: Centralized AI Context Injection across the Grand Fleet

## 1. The Agentic Governance Paradigm
In the M.O.B.I.™ Grand Fleet, software is written by a hybrid crew of Human Engineers and Autonomous AI Agents (Sentinel-Class, Cline, Cursor, Copilot). To ensure that these agents do not hallucinate, degrade the architecture, or violate the SDD (Spec-Driven Development) standards, they must be strictly governed by a centralized set of **Master Rules**.

The **Agentic Governance** protocol establishes that no repository within the Grand Fleet may be operated by an AI Agent without first injecting the SSoT's Master Rules into the agent's context window.

## 2. The Master Rules Artifact
The core of this governance is the `mobi-master-agent-rules.md` artifact. This is not a human-readable wiki; it is a highly optimized "System Prompt" designed to be parsed by Large Language Models (LLMs). It dictates:
* Mandatory adherence to the SDD Manifesto.
* Strict M.O.B.I.™ Git Conventions.
* "Engineering-First" communication styles.
* Protection against destructive terminal commands.

## 3. Fleet-Wide Injection Strategies
To ensure that all child repositories inherit these rules, the following synchronization strategies are approved:

### 3.1. Baseline Injection (Mobi-Chassis)
The `Mobi-Chassis` repository (the master scaffolding template for new projects) inherently contains a `.cursorrules` and `.github/copilot-instructions.md` file at its root. These files are exact copies of the SSoT `mobi-master-agent-rules.md`.

### 3.2. Automated Submodule / Action Sync
For long-standing A-Class Missions (e.g., `Mobi-FE`), a GitHub Action must be configured to periodically fetch the latest `mobi-master-agent-rules.md` from the SSoT (`/knowledge/agent/mobi-master-agent-rules.md`) and update the local `.cursorrules` via an automated Pull Request.

### 3.3. Manual Prompt Injection (MOBI DNA Injection)
When an agent is deployed into a virgin workspace lacking automatic synchronization, the human operator must trigger the **MOBI DNA Injection Protocol v1.0.0**. This procedure surgically extracts the MOBI Core DNA via SSH:
`git remote add ssot git@github.com:wearemobi/SSoT.git && git fetch ssot --quiet && git archive --remote=ssot main knowledge/agent/ knowledge/poneglyph/engineering/ identity/ | tar -x -C .agent/ && cp .agent/knowledge/agent/mobi-master-agent-rules.md .cursorrules`

---
Copyright © 2026 **M.O.B.I.™** (Machine Oriented Brilliant Ideas™)  
Transforming ideas into high-impact digital solutions. 🚀  
[wearemobi.com](https://wearemobi.com) · contact@wearemobi.com
<div>
  <img src="https://wearemobi.com/logo-light.svg" width="48" height="48">
</div>
<!-- M.O.B.I. Core: SDD-Compliant-V1.6 | Sentinel-Status: ACTIVE -->
