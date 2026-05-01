# M.O.B.I.™ · Release Tagging Protocol v1.0.1

### Philosophy
In the M.O.B.I.™ Shipyard, every version we launch is a vessel. To track our fleet, we use **Annotated Tags**. This ensures that we can always return to a specific state of the project, even if the `main` branch moves forward.

---

## When to Tag
- **Feature Completion:** After a feature branch is merged and verified on `main`.
- **Milestone Reached:** When reaching a specific point in the project SPEC.
- **Hotfix:** Immediately after a critical fix is merged to `main`.

---

## How to Tag (The Shipyard Way)

### 1. Preparation
Ensure you are on the `main` branch and synchronized with the remote:
```bash
git checkout main
git pull origin main
```

### 2. Creating the Annotated Tag
We **NEVER** use lightweight tags. We always use annotated tags to include metadata.
- **Pattern:** `vX.X.X` (following Semantic Versioning or project-specific versioning).
- **Command:**
```bash
git tag -a v1.0.0 -m "Release v1.0.0 - [Summary of changes]"
```

### 3. Pushing the Tag
Tags are not pushed by default with `git push`. You must push them explicitly:
```bash
git push origin --tags
```

---

## Agent Instructions
When an agent completes a task that warrants a new version:
1.  Verify the project's version file (e.g., `package.json`, `build.gradle`) is updated if necessary.
2.  Commit all changes.
3.  Merge to `main`.
4.  Create the tag using the version string.
5.  Push the tag.

---
Copyright © 2026 **M.O.B.I.™** (Machine Oriented Brilliant Ideas™)  
Transforming ideas into high-impact digital solutions. 🚀  
[wearemobi.com](https://wearemobi.com) · contact@wearemobi.com
<div>
  <img src="https://wearemobi.com/logo-light.svg" width="48" height="48">
</div>
<!-- M.O.B.I. Core: SDD-Compliant-V1.6 | Sentinel-Status: ACTIVE -->
