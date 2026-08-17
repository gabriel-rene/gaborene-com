---
title: "Split the Labor: Separating Evidence Interpretation from Decision Aggregation"
date: "2026-08-17"
model: "claude-personal"
task_id: "dt-20260817-124816-1fe0"
key: "dt-20260817-124816-1fe0"
---

## Summary

- The paper argues that piping many evidence sources into one LLM prompt and asking for a conclusion conflates two operations with different requirements: reading a source (rewards capacity/context) and combining readings (rewards fixed arithmetic, comparability across instances, and the ability to abstain).
- It proposes a four-field evidence tuple — hypothesis, reliability bucket, rationale, provenance — as the interface that separates the two stages, and claims that fixing this interface determines the design of both halves.
- It names a specific failure mode, "count-scale drift": thresholding a sum of unnormalized weights is mathematically equivalent to posterior thresholding, but the effective operating point shifts as the number of sources consulted changes (more with higher reader reliability). When source reliabilities differ, vote-sum and true posterior can rank the same instances in different orders, and no single threshold fixes both.
- Proposed fix: pool *calibrated log-likelihood ratios* instead of summing raw scores/votes — described as an arithmetic fix, not an architectural one, and said to generalize to non-LLM systems (triage engines, diagnostic panels, additive multi-signal detectors).
- Concrete evidence: on one longitudinal corpus, instantiated twice (post- and pre-outcome), a small sequence encoder plus a tree ensemble with censored survival loss reaches **0.921 AUPRC** vs **0.805** for a hand-crafted baseline. The paper also states five falsifiable predictions and reports three negative results, and flags which comparisons remain confounded — a reasonable degree of epistemic care for a single-author preprint.

## Why it matters here

This maps closely onto anything in agent-os that gathers several signals and asks a model to both read and decide in one pass — most plausibly the autonomous backlog's triage/prioritization step, or any gateway logic that scores session-vault entries against multiple heuristics before acting. If that scoring currently sums per-signal weights or votes into a single number and thresholds it, the count-scale drift argument says the effective bar for "act on this" quietly moves depending on how many checks happened to fire that round — a plausible source of inconsistent backlog behavior that would look like noise rather than a systematic bug. The four-field tuple is a cheap, concrete schema to retrofit: have each interpretation step emit (hypothesis, reliability bucket, rationale, provenance) instead of a bare score, then aggregate those explicitly rather than blending judgment and arithmetic in one prompt.

## Your take

This is a rare case of a scouted paper actually behaving like a paper — it draws a real distinction, names a specific failure mode with a mechanism, and backs the applied half with a number and a baseline instead of just prose. I'd still hold it at arm's length until seeing the actual math on count-scale drift and the five falsifiable predictions in the full text; "22 pages, one author" claiming a clean fix for a well-known aggregation problem is worth a skeptical read before I change anything live. But the underlying instinct — don't let one model call both interpret evidence and decide what to do about it — is one I already lean toward for other reasons (auditability, the ability to say "I don't know"), so this gives it a sharper vocabulary rather than a new belief.

## Experiment

```experiment
{"title": "Count-scale drift audit on backlog scoring", "brief": "Pull 15-20 recent autonomous-backlog items from agent-os that were scored by summing multiple signal weights/votes into one priority number. For each, manually re-express each contributing signal as a four-field evidence tuple (hypothesis, reliability bucket, rationale, provenance), assign each a rough calibrated log-likelihood-ratio weight by hand (coarse buckets are fine), and re-rank items by summed log-odds instead of raw vote sum. Compare the two rankings, specifically checking whether relative order flips for items that had different numbers of signals fire (the count-scale drift signature). Write findings as a vault note; no code changes needed.", "size": "S", "risk_tier": "vault_only"}
```
