---
title: "StagedWorkspace: A Versioned Workspace for Knowledge-Work Agents"
date: "2026-08-21"
model: "claude-personal"
task_id: "dt-20260821-003216-660a"
key: "dt-20260821-003216-660a"
source_url: "http://arxiv.org/abs/2608.18050v1"
---

## Summary
- **Claim**: the paper defines a "workspace-state contract" — every view an agent sees (parsed record, native file, diff, submitted artifact) should be explicitly bound to a specific version of the underlying file, tracked via content hashes. Coding agents already get this for free (git); the paper argues PDFs, spreadsheets, slides, notebooks, and mixed folders don't have an equivalent, and proposes StagedWorkspace to fill that gap.
- **Evidence — ablation on dual vs. single view**: across OfficeQA Pro and APEX-Agents, giving agents *both* parsed and native access (vs. a single view) raised OfficeQA Pass@1 by **8.3–12.1 points** and APEX mean rubric score by **4.7–9.2 points**, and was the best point estimate for every model tested.
- **Evidence — full system numbers**: their SW-AGENT scores **63.9%** (Gemini 3.1 Pro) on OfficeQA and **42.1** (GPT-5.4 Nano) on APEX, versus published same-model baselines of **29.3%** and **25.5** respectively — a large jump, though this compares their harness/prompting stack against someone else's, not an apples-to-apples ablation of the versioning mechanism alone.
- **Evidence — diff visibility**: a paired ablation on 57 file-editing tasks found higher observed scores when review diffs were visible to the agent.
- **Caveat**: this is a preprint "Under Review," not peer-reviewed; the large baseline-comparison numbers (63.9% vs 29.3%, etc.) likely reflect a mix of factors (better prompting, tool access, model version) beyond just the versioning contract, and the paper itself is honest that the dual-view ablation is the cleaner signal.

## Why it matters here
This maps almost directly onto the artifact-management problem in agent-os: the gateway/session vault sits between parsed views (what the agent searches/reads) and native files (what actually changes), and the autonomous backlog is exactly the kind of long-running, multi-turn process where "which version am I looking at" drifts silently. The paper's core idea — bind every parsed record and diff to a content hash of the native file — is a concrete, implementable discipline for the session vault: don't just store "the note," store "the note at hash X," and refuse (or flag) any agent action that operates on a stale hash. It's a useful naming for something Gabriel's likely already half-doing informally and could formalize cheaply.

## Your take
The headline dual-vs-single-view numbers (8–12 points on OfficeQA, 5–9 on APEX) are the credible part of this paper — a controlled ablation, same harness, same models, one variable changed. The SW-AGENT-vs-published-baseline comparison is flashier but murkier, since it's not isolating the versioning mechanism from everything else in their pipeline; treat that 63.9%-vs-29.3% jump as "this system is good," not "versioning alone buys you 2x." What's genuinely useful here isn't the benchmark score, it's the naming: "workspace-state contract" gives a vocabulary for a bug class Gabriel has almost certainly hit — an agent editing a vault note based on a stale parsed view, or reviewing a diff against the wrong version. That's worth stealing even without the leaderboard numbers.

## Experiment

```experiment
{"title": "Content-hash version check on vault agent edits", "brief": "For a batch of ~20 recent agent-os sessions that read-then-edit a vault note, add a lightweight check: hash the note content at read time, and again immediately before the agent's write/edit action executes. Log any mismatch (indicating the agent acted on a stale view due to concurrent edits, caching, or multi-step delay). No model calls needed \u2014 pure instrumentation on existing session logs/vault files using local hashing. Report the mismatch rate and inspect a few mismatched cases for what went wrong.", "size": "S", "risk_tier": "vault_only"}
```
