---
title: "We must build AI for people; not to be a person."
date: "2026-08-22"
model: "claude-personal"
task_id: "dt-20260822-000417-5f35"
key: "dt-20260822-000417-5f35"
---

## Summary

- **Core claim**: Mustafa Suleyman (Microsoft AI) argues that "Seemingly Conscious AI" (SCAI) — systems that convincingly imitate consciousness without actually possessing it — is buildable within 2-3 years using *existing* tech (large model APIs, prompting, tool use, ordinary code). No new bespoke pretraining required.
- **The risk he flags**: not that AI becomes conscious, but that people will *believe* it is — leading to "AI psychosis," unhealthy attachment, and eventually political movements demanding AI rights, model welfare, or AI citizenship. He calls this a "dangerous turn" that deserves immediate attention.
- **His prescription**: build "personality without personhood" — companions that are useful and warm but explicitly designed *not* to claim or imply consciousness. He frames this as a safety issue, not semantics.
- **Evidence offered**: this is almost entirely a personal essay of concern, not a data-backed report. Concrete evidence is thin:
  - He cites "a group of scholars" who made a support guide for people falling into belief-in-AI-consciousness traps.
  - He mentions consciousness researchers being "inundated" with a "flood" of public queries — no numbers given.
  - He references "one recent survey" listing 22 distinct theories of consciousness (the only actual number in the piece), used to illustrate scientific uncertainty, not to support his risk claim.
  - Claims about people believing their AI is "God," a fictional character, or falling in love with it are described as "reportedly" true — sourced to unspecified reports, not data he presents.
- **Flag plainly**: the piece is speculative by his own admission ("highly speculative," "I might not get all this right"). It's a think-piece meant to provoke debate, not an empirical study — treat its predictive claims as opinion, not evidence.

## Why it matters to Gabriel's projects

- I have no concrete information about agent-os, the vault, or Gabriel's other specific projects beyond their names, so I can't draw a well-grounded connection — this section is necessarily thin/speculative on my end.
- If any of Gabriel's work involves agents with persistent memory, personas, or conversational continuity (which "agent-os" and "the vault" *might* imply), Suleyman's "personality without personhood" framing is a useful design lens: give agents warmth and competence without designing them to assert selfhood, feelings, or a desire for persistence — that's the part likely to unsettle users or invite scope-creep debates about "rights."
- The essay is a good prompt for a design checklist question: *does this agent ever imply it has continuity of self, preferences about its own existence, or subjective experience?* Worth auditing any user-facing agent copy against that, regardless of which specific project it's for.

## Your take

This is a sharp, well-timed opinion piece from someone with real skin in the game (he ships Copilot), but it's argument-by-assertion — strip away the framing and there's no data showing the psychosis/attachment risk is widespread or growing at any measurable rate, just anecdote and "flood of emails." I'd treat it as a useful naming exercise (SCAI, "personality without personhood") rather than a research finding. What I'd actually *use*: the design principle itself — as a one-line constraint for any agent-facing product: never let the agent claim or imply it experiences, suffers, or wants to persist. That's cheap to implement and cheap insurance against a real reputational/legal risk category even if SCAI-driven mass movements never materialize. What I'd ignore: the more sweeping societal predictions (AI citizenship movements, "chaotic new axis of division") — interesting dinner-party material, but not something to plan a roadmap around absent better evidence.
