"use client"

import type { ReactNode } from "react"
import { type MotionValue, motion, useTransform } from "framer-motion"
import { FILM_FACTS } from "@/data/voyturisteando-film"
import { EASE_IN_OUT, EASE_OUT, useCounter, useReveal, useSceneTime, useTween } from "../film-clock"
import { Caption } from "../film-primitives"

/* Chart space: 920 × 160 units, drawn across 92cqw × 16cqw. */
const W = 920
const H = 160
const POINTS = 64
const LAUNCH_INDEX = 38
const LAUNCH_X = (LAUNCH_INDEX / (POINTS - 1)) * W

/* One quiet y-axis reference: roughly the weekly equivalent of the month-9 monthly sessions. */
const TICK_VALUE = Math.round((FILM_FACTS.dashboard.monthlySessions * 12) / 52 / 10000) * 10000
const TICK_Y = 20

/** Deterministic daily-traffic shape: flat and noisy before launch, a step up after. */
function trafficAt(i: number): number {
  const noise = Math.sin(i * 1.7) * 0.5 + Math.sin(i * 0.63 + 1.2) * 0.35 + Math.sin(i * 3.1) * 0.25
  const weekly = Math.sin((i / 7) * Math.PI * 2) * 0.6
  if (i < LAUNCH_INDEX) return 135 - (weekly + noise) * 7 - i * 0.12
  const after = i - LAUNCH_INDEX
  return 90 - Math.min(after, 12) * 2.2 - after * 0.6 - (weekly + noise) * 7
}

function pathFor(from: number, to: number): string {
  let d = ""
  for (let i = from; i <= to; i++) {
    const x = (i / (POINTS - 1)) * W
    d += `${i === from ? "M" : "L"}${x.toFixed(1)} ${trafficAt(i).toFixed(1)}`
  }
  return d
}

const BEFORE = pathFor(0, LAUNCH_INDEX - 1)
const JUMP = `M${(((LAUNCH_INDEX - 1) / (POINTS - 1)) * W).toFixed(1)} ${trafficAt(LAUNCH_INDEX - 1).toFixed(1)}${pathFor(LAUNCH_INDEX, POINTS - 1).replace(/^M/, "L")}`
const AREA = `${pathFor(0, POINTS - 1)}L${W} ${H}L0 ${H}Z`

const DRAW = { from: 0.3, launch: 2.4, to: 4.4 }

function TrafficChart() {
  const before = useTween(DRAW.from, DRAW.launch, (p) => p)
  const after = useTween(DRAW.launch, DRAW.to, EASE_OUT)
  const t = useSceneTime()
  const reveal = useTransform(t, [DRAW.from, DRAW.launch, DRAW.to], [0, LAUNCH_X, W], { clamp: true })
  const marker = useTransform(t, [DRAW.launch - 0.1, DRAW.launch + 0.3], [0, 1], { clamp: true })
  const markerH = useTransform(marker, [0, 1], [0, H])
  const markerTop = useTransform(markerH, (h) => H - h)
  const axis = useTransform(t, [0, 0.6], [0.3, 1], { clamp: true })
  const label = useTransform(t, [DRAW.launch + 0.1, DRAW.launch + 0.6], [0, 1], { clamp: true })
  const pulse = useTransform(t, [DRAW.launch, DRAW.launch + 0.9], [3, 16], { clamp: true, ease: EASE_OUT })
  const pulseOpacity = useTransform(t, [DRAW.launch - 0.01, DRAW.launch, DRAW.launch + 0.9], [0, 0.7, 0], { clamp: true })

  return (
    <div className="absolute left-[4cqw] right-[4cqw] top-[17.5cqw] h-[16cqw]">
      <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="launch-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#23A5AC" stopOpacity="0.28" />
            <stop offset="1" stopColor="#23A5AC" stopOpacity="0" />
          </linearGradient>
          <clipPath id="launch-reveal">
            <motion.rect x={0} y={-20} height={H + 40} width={reveal} />
          </clipPath>
        </defs>
        <path d={`M0 ${H}H${W}`} stroke="#E6F3F3" strokeOpacity="0.14" strokeWidth={1} />
        <motion.g style={{ opacity: axis }}>
          <path d={`M34 ${TICK_Y}H${W}`} stroke="#E6F3F3" strokeOpacity="0.14" strokeWidth={1} strokeDasharray="2 5" />
          <text x={0} y={TICK_Y + 3} className="fill-vt-mist/50 font-sans tabular-nums" fontSize={8.5}>
            {TICK_VALUE / 1000}k
          </text>
          <text x={0} y={-8} className="fill-vt-mist/60 font-sans font-semibold uppercase" fontSize={8} letterSpacing={1.4}>
            Weekly sessions
          </text>
        </motion.g>
        <path d={AREA} fill="url(#launch-area)" clipPath="url(#launch-reveal)" />
        <motion.path d={BEFORE} fill="none" stroke="#E6F3F3" strokeOpacity="0.45" strokeWidth={1.6} strokeLinejoin="round" style={{ pathLength: before }} />
        <motion.path d={JUMP} fill="none" className="stroke-vt-sun" strokeWidth={2.2} strokeLinejoin="round" style={{ pathLength: after }} />
        <motion.line x1={LAUNCH_X} x2={LAUNCH_X} y1={H} y2={markerTop} className="stroke-vt-sun" strokeOpacity="0.6" strokeWidth={1} strokeDasharray="3 4" />
        <motion.circle cx={LAUNCH_X} cy={trafficAt(LAUNCH_INDEX)} r={pulse} className="fill-vt-sun" style={{ opacity: pulseOpacity }} />
        <motion.circle cx={LAUNCH_X} cy={trafficAt(LAUNCH_INDEX)} r={4} className="fill-vt-sun" style={{ opacity: marker }} />
        <motion.text
          x={LAUNCH_X + 8}
          y={8}
          className="fill-vt-sun font-sans font-semibold uppercase"
          fontSize={8.5}
          letterSpacing={1.5}
          style={{ opacity: label }}
        >
          Launch
        </motion.text>
      </svg>
    </div>
  )
}

function Metric({
  at,
  figure,
  label,
  children,
}: {
  at: number
  figure?: MotionValue<string>
  label: string
  children?: ReactNode
}) {
  const style = useReveal(at, undefined, 0.8)
  return (
    <motion.div style={style} className="flex w-[19cqw] flex-col gap-[0.7cqw] px-[2.6cqw]">
      <span className="font-serif text-[4.2cqw] leading-none tracking-[-0.02em] text-white tabular-nums">
        {figure ? <motion.span>{figure}</motion.span> : children}
      </span>
      <span className="font-sans text-[0.95cqw] leading-snug text-vt-mist/75">{label}</span>
    </motion.div>
  )
}

export function LaunchScene() {
  const t = useSceneTime()
  const live = useReveal(-0.2, undefined, 1.2)
  const liveScale = useTransform(t, [-0.2, 0.9], [0.96, 1], { clamp: true, ease: EASE_OUT })
  const drift = useTransform(t, [0, 7], [0.4, -0.4], { ease: EASE_IN_OUT })
  const driftCqw = useTransform(drift, (v) => `${v}cqw`)

  const load = useCounter(FILM_FACTS.launch.mobileLoadSeconds, 2.3, 3.9, {
    start: FILM_FACTS.legacy.mobileLoadSeconds,
    decimals: 1,
    suffix: "s",
  })
  const lighthouse = useCounter(FILM_FACTS.launch.lighthouse, 2.6, 4.2)

  return (
    <div className="absolute inset-0 overflow-hidden bg-vt-ink">
      <motion.div className="absolute inset-0" style={{ x: driftCqw }}>
        <TrafficChart />
      </motion.div>

      <motion.h2
        style={{ ...live, scale: liveScale }}
        className="absolute inset-x-0 top-[6.4cqw] text-center font-serif text-[9.5cqw] leading-none tracking-[-0.03em] text-white"
      >
        Live<span className="text-vt-sun">.</span>
      </motion.h2>

      <div className="absolute inset-x-0 top-[35.6cqw] flex justify-center divide-x divide-white/15">
        <Metric at={2.1} figure={load} label="to load, on a phone" />
        <Metric at={2.4} figure={lighthouse} label="Lighthouse performance" />
        <Metric at={3.9} label="The old site, same phone">
          <span className="text-white/40">
            <span className="mr-[0.6cqw] text-[2cqw]">was</span>
            <span className="line-through decoration-vt-flame decoration-[0.25cqw]">{FILM_FACTS.legacy.mobileLoadSeconds}s</span>
          </span>
        </Metric>
      </div>

      <Caption at={0.8} until={5.8}>
        Month 4. The new site went live.
      </Caption>
    </div>
  )
}
