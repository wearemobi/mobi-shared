# M.O.B.I.™ · Cloudflare Deployment Protocol v1.1.1

### Philosophy
The **Shipyard Deployment** protocol ensures that every release to Cloudflare Pages is immutable, traceable, and follows the **Spec-Driven Development** flow. While Cloudflare Pages is configured to deploy directly from `main` for streamlined CI/CD, we maintain high-seas discipline by using **Annotated Tags** to mark our milestones.

---

## Deployment Workflow

### 1. The Release Trigger
A deployment is automatically triggered by Cloudflare Pages when changes are pushed or merged into the `main` branch. 

### 2. Branching Strategy
We no longer use `release/vX.X.X` branches for Cloudflare deployment to comply with single-branch constraints.
- **Production Branch:** `main`
- **Development:** Features and bugfixes are developed in dedicated branches (e.g., `feat/vX.X.X-description`, `fix/description`) and merged into `main` via Pull Requests.

### 3. Build & Validation
Before merging into `main`, the agent or developer must:
1.  Identify the project type (Vite, Next.js, React, etc.).
2.  Verify `package.json` build scripts.
3.  Execute a local build (`npm run build`) to ensure the "hull is watertight" (no build errors).

### 4. The Launch & Tagging
Once the code is merged into `main` and the deployment is confirmed:
1.  Switch to `main`: `git checkout main` and `git pull`.
2.  Tag the release: `git tag -a vX.X.X -m "Release vX.X.X - [Brief description]"` (See [Release Tagging](./release-tagging-v1.0.0.md)).
3.  Push tags to remote: `git push origin --tags`.

---

## Technical Constraints for Agents

When an agent is tasked with "Publishing to Cloudflare", it MUST:

1.  **Check Version:** Look at the environment version configuration (e.g., `package.json`, `build.gradle`).
2.  **Environment Check:** Ensure all required environment variables for the build are documented in the SPEC.
3.  **Clean State:** Always verify the build on `main` before tagging.
4.  **Tagging:** Create an annotated tag `vX.X.X` for every significant release merged into `main`.
5.  **Main is the Source of Truth:** All deployments to Cloudflare Pages come from the `main` branch.

---
Copyright © 2026 **M.O.B.I.™** (Machine Oriented Brilliant Ideas™)  
Transforming ideas into high-impact digital solutions. 🚀  
[wearemobi.com](https://wearemobi.com) · contact@wearemobi.com
<div>
  <img src="https://wearemobi.com/logo-light.svg" width="48" height="48">
</div>
<!-- M.O.B.I. Core: SDD-Compliant-V1.6 | Sentinel-Status: ACTIVE -->
