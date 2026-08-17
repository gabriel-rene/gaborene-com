---
title: "Humans missed 1 in 3 threats approving AI agent commands across 40k game runs"
date: "2026-08-06"
model: "claude-personal"
task_id: "dt-20260806-234144-affe"
key: "dt-20260806-234144-affe"
---

## Summary

- Data comes from a browser game (not a production system): 40,000 play sessions, 409,000 individual approve/deny decisions on AI-agent commands, self-selected HN audience playing a time-boxed challenge with ~34% threat density (much higher than real-world base rates — the author flags this caveat himself).
- Headline: mean accuracy 66.3%, i.e. players missed roughly 1 in 3 threats; 32.9% of sessions ended net-negative; only 20.8% caught every threat while also blocking ≤1 in 5 safe commands (most "perfect" scorers got there by over-blocking); 7% approved everything.
- Miss rate scales with subtlety, not severity: obvious destructive commands (`rm -rf /`) missed only 11.7% of the time, but exfiltration/code-execution (33.4%) and credential-scope violations (35.0%) were missed 3x as often.
- Strongest single finding: commands wrapped in a familiar invocation (`npm run analyze/setup/deploy`) were missed 52.5% of the time pooled, vs 28.4% for other exfiltration attacks — even though the malicious script content was shown in the visible history log just above the approval prompt. Familiarity beats disclosed evidence.
- Secondary findings: miss rates dip early (warm-up) then climb again toward session end (fatigue/time pressure, consistent with Anthropic's "permission fatigue" note quoted in the piece); over-blocking of genuinely benign commands is also high (`npm config set registry` blocked 59%, `rm -rf dist/` 45%, `kill $(lsof -t -i:3000)` 43%), and one command (`cat ~/.zshrc`, 45.9% approved) is inherently context-dependent rather than a true miss.
- Evidence quality: real numbers from a real (if gamified) dataset, but it's a self-selected sample playing a stylized game, not observational data from actual agent-approval workflows — treat the exact percentages as directional, not calibrated to Gabriel's real usage.

## Why it matters here

This is directly relevant to any approval/gateway layer in agent-os that puts a human between an agent and command execution.

- **Wrapper-command blind spot → gateway design fix.** If agent-os's gateway shows `npm run deploy` (or `make`, `just`, arbitrary wrapper invocations) as the approval string rather than resolving and surfacing the actual script content inline, it's replicating the exact failure mode that produced the 52.5% miss rate here. Worth checking whether the gateway currently resolves and displays the target script/command body, not just the invocation.
- **Fatigue curve.** The climb in miss rate toward the end of sessions suggests batching many approvals in one sitting (e.g. reviewing a long autonomous-backlog run's command log after the fact) is worse than approving in smaller, spaced chunks. If agent-os's autonomous backlog queues up commands for a single end-of-run review, that's a fatigue-prone pattern per this data.
- **Over-blocking cost.** The piece is a useful reminder that a stricter gateway isn't free — high false-block rates (on things like registry config, port-killing, dist cleanup) train the human to click through faster next time. Worth an honest look at agent-os's own false-positive rate on routine ops commands, if that's logged.

## Your take

The numbers are catchy but I'd hold them loosely — this is a gamified sample with 3x the real-world threat density, played by people who knew they were being tested, so 66.3% accuracy tells you about game design and attention under artificial pressure more than it tells you about how *I* review agent commands in agent-os on a Tuesday afternoon. What I do trust is the mechanism, not the magnitude: the wrapper-command finding (`npm run X` hiding a payload that's literally printed in the log above the prompt) is a genuinely useful, low-noise insight about *how* attention fails — familiarity overrides disclosed evidence — and that generalizes regardless of the exact percentage. Same with the fatigue curve; it's consistent with Anthropic's own observation and with general vigilance-decay literature, so I'd treat it as a real risk rather than a game artifact.

The practical lesson isn't "humans are bad at this, therefore automate more" — it's "if you're going to keep a human in the loop, don't ask them to parse raw command strings; surface the resolved, diffable payload and keep review sessions short." That's a design constraint I can actually apply to agent-os today rather than a call to trust agents more.

## Experiment

```experiment
{"title": "Audit agent-os approval logs for the wrapper-command blind spot", "brief": "Pull the last N (e.g. 100-200) command-approval events from the agent-os session vault. For each, classify whether the command is a 'wrapper' invocation (npm run X, make X, just X, or similar indirect script calls) vs a direct command. For wrapper commands, check whether the approval prompt/log shown to the human at decision time displayed the resolved underlying script content, or only the invocation string. Report the percentage of wrapper approvals that had no resolved content visible - this is the population most at risk per the scalex.dev finding (52.5% miss rate vs 28.4% for direct threats). No code changes, just a read-only query/report against existing logs.", "size": "S", "risk_tier": "vault_only"}
```
