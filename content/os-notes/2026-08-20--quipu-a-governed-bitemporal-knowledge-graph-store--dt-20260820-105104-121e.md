---
title: "Quipu: A Governed Bitemporal Knowledge Graph Store"
date: "2026-08-20"
model: "claude-personal"
task_id: "dt-20260820-105104-121e"
key: "dt-20260820-105104-121e"
source_url: "http://arxiv.org/abs/2608.16813v1"
---

## Summary
- Argues that current knowledge-graph stores carry four human-era defaults — accept-then-clean writes, no/singular time axis, uniform trust across writers, governance left to external dashboards — and that these become untenable once agents are the ones writing facts.
- Proposes Quipu, an embeddable store that inverts each default: writes are gated on the *pending post-state* before acceptance; data, trust labels, verdicts, and even the governance rules themselves are bitemporal; named graphs are the unit of trust, composed under a lattice whose one invariant is that composition never widens trust; and the governance spec Σ, trace, and signed verdicts are stored as facts, so an audit is just a query (T ⊨ Σ).
- Evaluation is a single seeded deterministic run ("Census") with planted ground truth, not a broad benchmark suite: gated store ends with 0/6 planted defects vs 6/6 for an ungated baseline; 7/7 composition probes hold the lattice invariant; 50/50 satisfied verdicts re-derive correctly "as of their instant," while all 50 would be misreported under a latest-only rule.
- An independent reference checker (SARC) agrees with the in-store audit verdict-for-verdict except on coverage semantics; a recorded trace from a governed writer surfaced a real enforcement gap that the audit itself named and the authors then fixed.
- On an external benchmark (DEMM-Bench, 512 property-level governance questions, 8 degradation conditions), a content-only reading of exported records answers all questions correctly with zero overclaim, while a baseline that just checks container-presence overclaims on up to 87.5% of them.
- Caveat worth flagging plainly: this is one author, one seeded run, purpose-built benchmarks (Census, DEMM-Bench) tied to the same project — strong internal consistency, no independent replication or adoption evidence yet.

## Why it matters here
This maps almost directly onto the "privacy and governance compulsion" you're wrestling with in agent-os. Two ideas are worth stealing conceptually even without adopting the whole store:

1. **Gate at write time, not clean-up time.** Right now agent-os's session vault likely accepts writes from agents/sessions and only reasons about trust/quality afterward. Quipu's core move — evaluate the *pending post-state* before a fact is admitted — is a cheap discipline to borrow even without the full bitemporal machinery: before an agent writes a "fact" into the vault (a decision, a preference, a summary), check what the vault would look like *after* the write, not just validate the write in isolation.
2. **Governance as queryable fact, not external dashboard.** If your autonomous backlog or gateway ever needs to answer "why was this note trusted / when was this true / who asserted it," the paper's framing — store the rules and the audit trail as data in the same store — is directly relevant to how you might structure provenance metadata in the vault rather than bolting on a separate audit layer later.

The bitemporal distinction (when something was *true* vs when it was *recorded*) is also a good lens for your vault corpus, where you likely conflate "when I wrote this note" with "when the fact it describes was valid."

## Your take
This reads like solid infrastructure thinking dressed in fairly heavy formalism — the core insight (agents writing knowledge graphs breaks assumptions built for human curators) is real and matches what you're already running into with agent-os. But the evidence is a single seeded run against self-authored benchmarks; that's enough to show internal coherence, not enough to know how it holds up under messier, adversarial, or larger-scale multi-agent writing than Census simulates. I'd treat the four inverted defaults as a good checklist to sanity-check your own vault design against, not as a system to adopt wholesale — nothing here suggests Quipu itself is something to integrate, and the paper doesn't claim performance or scale numbers that would justify swapping out your current storage.

The genuinely useful part for "everyday AI use" framing is the reminder that ungated, single-trust, timeless storage is *fine* for humans curating their own notes but breaks down fast once multiple agents write into a shared space — which is exactly the situation agent-os is trying to make normal.

## Experiment
```experiment
{"title": "Bitemporal conflict probe on vault notes", "brief": "Pick 10-15 vault notes that have been touched by more than one agent/session over time (or simulate this with two mock writers). For each, record two timestamps: when the note was written (transaction time) and the date the fact it describes was actually true/valid (valid time, e.g. 'as of 2026-06-01'). Then run a naive 'latest note wins' query against a subset where the most recent note's valid-time predates an earlier note's valid-time (i.e., a late-arriving but stale update). Count how many cases a latest-only read misreports the fact versus what a bitemporal read (sorted by valid-time, not write-time) would give. This mirrors the paper's 50/50-vs-latest-only test at vault scale and tells you whether your current retrieval logic already has this failure mode.", "size": "S", "risk_tier": "vault_only"}
```
