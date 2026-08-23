---
title: "Phantom Gains: Auditing Self-Improvement Against a Measured Null"
date: "2026-08-23"
model: "claude-personal"
task_id: "dt-20260823-034736-21d6"
key: "dt-20260823-034736-21d6"
source_url: "http://arxiv.org/abs/2608.20290v1"
---

## Summary
- The paper audits self-improvement claims for LoRA fine-tuned Qwen3-8B (three rounds, rank-32) by running an identical pipeline on a *frozen control* model, then checking which "gains" survive when that control is present.
- It identifies seven distinct measurement failures — each one flips a reported finding once you have a proper null. One example given in detail: a ledger built from a single greedy decode manufactures apparent capability changes on an *untrained* model, an artifact of inference batching; the "expansion" statistic meant to separate genuine skill acquisition from mere sharpening assigns that same untrained model a rate of 0.280.
- A commonly used "natural threshold" fix for this problem doesn't replicate — its supposed null stays non-zero when checked against the frozen comparisons a multi-arm study already contains.
- Their proposed fix: a per-problem exact test against a pooled baseline with false-discovery-rate control. On held-out replicates this detects nothing spurious, and stays stable across different FDR rules, error rates, and pool sizes.
- Applied across a matched ladder of arms (same stream, volume, evaluation): external distillation improves problems the base model rarely reaches, while three tested forms of self-training do not. A regression shows this isn't just distillation having bigger overall gains (p < 10⁻⁸). On problems the base model never solves, evidence is inconclusive; but self-training measurably corrupts problems the base model *already* solved, at rates clearly above the measured noise floor.
- This is an empirical audit paper with real numbers (0.280 expansion rate, p < 10⁻⁸) and a concrete methodological prescription — not a hype piece.

## Why it matters here
Agent-os's autonomous backlog is exactly the kind of system this paper warns about: any time you compare "before" vs "after" a prompt/model/pipeline change and report task success deltas, you're differencing two noisy estimates and are vulnerable to the same artifacts (single-sample decoding, batching effects, no frozen-run baseline). The paper's core discipline — always measure a null from a frozen, unchanged run before trusting a delta — is directly transferable to any claim like "the backlog agent got better after tweak X."

## Your take
This is the kind of paper I want more of in the self-improvement space: it doesn't argue against self-training, it argues against sloppy measurement of self-training, and it shows its work — seven named failure modes, a replication that fails, and a replacement test that holds up. The headline result (self-training corrupts previously-solved problems at rates above the noise floor, while claimed gains on hard problems don't survive scrutiny) is a useful corrective to any autonomous-agent narrative that treats "score went up" as self-evidently good. For everyday use this is a reminder to build the null into the harness, not bolt it on after a surprising number shows up.

## Experiment

```experiment
{"title": "Frozen-baseline noise floor for backlog agent", "brief": "Pick a fixed set of ~20-30 completed autonomous-backlog tasks (or a fixed evaluation subset). Run the *current, unchanged* agent-os pipeline over them twice, with no prompt/model/config changes between runs, recording per-task pass/fail. Compute how many tasks flip status between the two identical runs (the phantom-gain noise floor). Compare this flip rate against any before/after delta you'd normally report when evaluating a real pipeline change, to see whether the observed 'improvement' exceeds the measured noise floor.", "size": "S", "risk_tier": "vault_only"}
```
