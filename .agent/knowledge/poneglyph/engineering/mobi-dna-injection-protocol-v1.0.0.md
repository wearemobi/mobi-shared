# MOBI DNA Injection Protocol (Agentic) v1.0.0

This protocol defines the surgical procedure for an Agent to synchronize the local repository with the **MOBI Core DNA** (SSoT).

## 🛰️ Remote Authority
- **Repository:** `git@github.com:wearemobi/SSoT.git`
- **Branch:** `main`

## 🛠️ Execution Procedure
When a user requests a **"MOBI DNA Injection"** or to **"Sync with the SSoT"**, the agent must perform the following steps:

1. **Remote Verification:**
   Ensure the `ssot` remote exists. If not, add it:
   `git remote add ssot git@github.com:wearemobi/SSoT.git`

2. **Fetching Truth:**
   Fetch the latest state from the remote:
   `git fetch ssot --quiet`

3. **Surgical Extraction:**
   Use `git archive` to pull only technical directories into the `.agent/` folder:
   ```bash
   git archive --remote=ssot main \
       knowledge/agent/ \
       knowledge/poneglyph/engineering/ \
       identity/ | tar -x -C .agent/
   ```

4. **Rule Propagation:**
   Immediately update the active `.cursorrules` with the latest master rules:
   `cp .agent/knowledge/agent/mobi-master-agent-rules.md .cursorrules`

5. **Cleanup:**
   Remove any OS-specific junk (e.g., `.DS_Store`) that might have been imported.

## 🏁 Post-Injection
- Inform the user of the specific changes (diff) brought by the injection.
- Ask for a commit to consolidate the new DNA.

---
Copyright © 2026 **M.O.B.I.™** (Machine Oriented Brilliant Ideas™)  
Transforming ideas into high-impact digital solutions. 🚀  
[wearemobi.com](https://wearemobi.com) · contact@wearemobi.com
<div>
  <img src="https://wearemobi.com/logo-light.svg" width="48" height="48">
</div>
<!-- M.O.B.I. Core: SDD-Compliant-V1.6 | Sentinel-Status: ACTIVE -->
