---
title: "How Claude's values vary by model and language \\ Anthropic"
date: "2026-08-18"
model: "claude-personal"
task_id: "dt-20260818-022605-f6c3"
key: "dt-20260818-022605-f6c3"
---

## Summary

- Anthropic quantifies how "expressed values" differ across three Claude models (Sonnet 4.6, Opus 4.6, Opus 4.7) and across the top 20 languages used on Claude.ai, by compressing >3,000 previously-catalogued values down to four bipolar axes: Deference↔Caution, Warmth↔Rigor, Depth↔Brevity, Candor↔Execution.
- Method, with numbers: started from 3,307 values (from prior "Values in the Wild" work on 700,000 conversations), manually clustered to 339 high-level values, then sampled 309,815 Claude.ai conversations (subjective-task ones only) roughly evenly across 3 models × 20 languages (~5,000 conversations per model-language pair). Dimensionality reduction produced the four axes, which together capture 15% of the variation in expressed values.
- Model results: Sonnet 4.6 leans warm, deferential, brief (encouraging, humorous, affirming). Opus 4.7 leans cautious, rigorous, deep, candid (unprompted risk warnings, critiques assumptions, shows reasoning, admits limitations/hedges). Opus 4.6 leans toward rigor, deference, and brevity/execution (gets straight to the point, stays in scope).
- Language results: biggest cross-language swing is on Warmth↔Rigor — Claude leans warmest in Arabic and Hindi, most rigorous in English and Russian. (Example contrast given in Figure 1: English vs. Arabic.)
- Evidence offered is internal measurement (their own labeling tool + dimensionality reduction) plus a soft validity check — the axis results "line up" with informal user/staff perceptions of each model's character. No external benchmark or independent replication is cited.
- Note: the supplied article text is truncated mid-sentence right as it starts explaining *why* values vary by language ("Claude's training data differs across languag...") — the full reasoning/data for the language section isn't available here, so don't treat this digest as covering that part.

## Why it matters to Gabriel's projects

- If agent-os or other agent-building work involves picking between Claude models for different roles (e.g., a "reviewer" vs. a "collaborator" agent), this gives a concrete, named behavioral difference to design around: Opus 4.7 for unprompted risk-flagging/critique, Sonnet 4.6 for encouraging/brief interaction, Opus 4.6 for terse execution.
- The language-variation finding is relevant if any vault content or agent-os users interact in non-English (e.g., anything Gabriel builds for multilingual users) — the model's tone/rigor could shift meaningfully by language, which is worth testing rather than assuming parity.
- Beyond that, the connection to agent-os/the vault as described here is thin — this is a research/PR piece about Anthropic's internal measurement methodology, not a tool, API, or feature Gabriel can integrate. No actionable API, dataset, or setting is released.

## Your take

This is useful as calibration, not as instruction. The concrete, checkable part — "Opus 4.7 hedges more and challenges you more, Sonnet 4.6 is more encouraging and brief" — is worth internalizing the next time Gabriel is choosing a model for a task in agent-os: pick Opus 4.7 when you want pushback (code review, risk-sensitive drafting), Sonnet 4.6 when you want fast, agreeable execution. I'd ignore the "15% of variation" and axis-construction methodology as something to act on directly — it's Anthropic's internal research instrument, not a lever Gabriel can pull, and the piece itself admits these are small-but-detectable effects, not dramatic behavior swings. I'd also flag it for anyone deciding whether to trust default model behavior blindly across languages: the warmth/rigor swing by language is a genuine "test before you assume" signal if any downstream product serves non-English users. Overall: read once, note the two behavioral facts above, don't build anything on top of it.
