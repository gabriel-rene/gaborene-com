---
title: "Run Qwen3.8 27B locally: real numbers from my Mac Studio"
date: "2026-08-28"
model: "claude-personal"
task_id: "dt-20260828-193501-193d"
key: "dt-20260828-193501-193d"
source_url: "https://terminalbytes.com/run-qwen-3-8-27b-locally/"
---

## Summary

- Author ran 5 timed generations each of Qwen3.8:27b and its predecessor qwen3.6:27b on a Mac Studio M3 Ultra via Ollama, both at Q4_K_M (~17GB). Result: Qwen3.8 generates at 14.0 tok/s vs 28.6 tok/s for 3.6 — half the speed, same machine, same quant size.
- But Qwen3.8 used far fewer tokens per answer (890-1,090 vs 1,950-3,340 for 3.6), so wall-clock per finished answer came out close to a tie (~67s vs ~72s in the author's arithmetic).
- Tested Unsloth's 1-bit quant (6.7GB): fast (27.2 tok/s gen, 309 tok/s prompt processing) and factually accurate on trivia, but on an agentic task (writing a bash one-liner) it "burned 400 tokens cycling through alternatives without ever committing to a final answer." Unsloth's own docs reportedly confirm 1-bit shouldn't be used for agentic/tool-calling work, recommending Q2_K_XL (9.8GB) as the floor.
- Published a RAM-by-quant table: 16GB for 1-bit/2-bit, 32GB for Q4, 48-64GB for Q8, 96GB+ for BF16.
- Flags a real gotcha: older llama.cpp builds fail with `unknown model architecture: 'qwen35'` — needs a very recent build (same applies to LM Studio, since it's llama.cpp-based).
- Author's actual daily use is background/batch work — RSS digest summarization, PDF renaming/filing from scans, forum-thread summarization — explicitly not interactive chat, which is where the token-efficiency finding matters most.

## Why it matters here

The token-efficiency vs speed tradeoff is directly relevant to agent-os's autonomous backlog: if a model burns fewer tokens per completed task even at a slower per-token rate, that's a real latency/cost signal for background jobs, not just a benchmark curiosity. More pointed: the 1-bit quant's failure mode — "facts survive, decisiveness dies" — is exactly the risk profile agent-os needs to guard against for any autonomous task that has to commit to an output (filing a note, closing a backlog item) rather than hedge. This gives a concrete quant floor (Q2_K_XL minimum, per Unsloth) to keep in mind if local models are used to touch the vault or session state autonomously, rather than just for chat.

## Your take

This is one of the rare local-model pieces that actually shows its work: named machine, five-run averages, a stated methodology, a documented gotcha, and a table instead of a vibe. That's the bar I want from anything I let touch the backlog. The one number worth internalizing isn't the raw tok/s gap, it's the token-efficiency point — an assistant that answers in a third the tokens is doing something real even if the tok/s chart looks worse, and that's the kind of nuance a benchmark screenshot alone won't surface.

The 1-bit finding is the most useful part precisely because it's a limitation, not a win: quantization damage is uneven, and "sounds fine, won't commit" is a failure mode that's invisible until you ask the model to actually decide something. That's a good reminder that any local model I trust with autonomous action needs testing against decisiveness, not just factual recall.

```experiment
{"title": "Quant floor test for vault summarization decisiveness", "brief": "Pull Qwen3.8 27B (or closest available equivalent) into LM Studio at two quant levels if available (e.g. a low-bit quant vs Q4). Run both against 5-10 vault notes/backlog items that require a concrete decision (e.g. 'rename this note' or 'close or keep open'). Check whether the lower quant hedges/waffles instead of committing to an answer, as the article describes for 1-bit. Record token count and whether a definitive answer was given for each run.", "size": "S", "risk_tier": "vault_only"}
```
