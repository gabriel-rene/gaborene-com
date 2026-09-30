"use client"

import { type MotionValue, motion, useTransform } from "framer-motion"
import { type Municipality, municipalities } from "@/data/puerto-rico-municipalities"
import { FILM_FACTS } from "@/data/voyturisteando-film"
import { EASE_OUT, useCounter, useReveal, useSceneTime, useTween } from "../film-clock"
import { Caption, IslandMap, Kicker } from "../film-primitives"
import { AffinityBoard } from "./research-board"

const { participants, municipalities: townCount, interviewHours, treeTestBefore, treeTestAfter } =
  FILM_FACTS.research

/* ---------- Beat 1: where we sat down ---------- */

/** Field-session towns with a relative share of participants. */
const FIELD_TOWNS: { name: string; weight: number }[] = [
  { name: "San Juan", weight: 5 },
  { name: "Ponce", weight: 4 },
  { name: "Mayagüez", weight: 4 },
  { name: "Arecibo", weight: 3 },
  { name: "Caguas", weight: 4 },
  { name: "Humacao", weight: 3 },
  { name: "Aguadilla", weight: 2 },
  { name: "Bayamón", weight: 4 },
  { name: "Guayama", weight: 2 },
  { name: "Fajardo", weight: 2 },
  { name: "Utuado", weight: 2 },
  { name: "Cabo Rojo", weight: 2 },
  { name: "Carolina", weight: 3 },
  { name: "Cayey", weight: 2 },
]

const byName = new Map(municipalities.map((m) => [m.name, m]))
const towns = FIELD_TOWNS.slice(0, townCount).map((t) => ({ ...t, m: byName.get(t.name) as Municipality }))

/** Split the participant total across towns by weight (largest remainder). */
function groupSizes(): number[] {
  const total = towns.reduce((s, t) => s + t.weight, 0)
  const raw = towns.map((t) => (t.weight / total) * participants)
  const sizes = raw.map(Math.floor)
  let left = participants - sizes.reduce((s, n) => s + n, 0)
  const order = raw.map((r, i) => ({ i, rest: r - Math.floor(r) })).sort((a, b) => b.rest - a.rest)
  for (const { i } of order) {
    if (left-- <= 0) break
    sizes[i] += 1
  }
  return sizes
}

const DOTS_FROM = 0.3
const DOTS_TO = 2.9
const GOLDEN_ANGLE = 2.39996

interface Dot {
  x: number
  y: number
  at: number
  town: number
}

const DOTS: Dot[] = (() => {
  const sizes = groupSizes()
  const placed: Omit<Dot, "at">[] = []
  const maxSize = Math.max(...sizes)
  // Round-robin so the island fills from everywhere at once.
  for (let k = 0; k < maxSize; k++) {
    towns.forEach((t, town) => {
      if (k >= sizes[town]) return
      const angle = k * GOLDEN_ANGLE + town * 1.3
      const radius = 13 * Math.sqrt(k)
      placed.push({ x: t.m.cx + Math.cos(angle) * radius, y: t.m.cy + Math.sin(angle) * radius, town })
    })
  }
  return placed.map((d, i) => ({ ...d, at: DOTS_FROM + (i / (placed.length - 1)) * (DOTS_TO - DOTS_FROM) }))
})()

const townArrivals = towns.map((_, i) => DOTS.find((d) => d.town === i)?.at ?? DOTS_FROM)

function ParticipantDot({ dot }: { dot: Dot }) {
  const t = useSceneTime()
  const r = useTransform(t, [dot.at, dot.at + 0.16, dot.at + 0.42], [0, 9.5, 7], { clamp: true })
  return <motion.circle cx={dot.x} cy={dot.y} r={r} className="fill-vt-deep stroke-white" strokeWidth={2.2} />
}

function TownPulse({ town }: { town: number }) {
  const t = useSceneTime()
  const at = townArrivals[town]
  const { cx, cy } = towns[town].m
  const r = useTransform(t, [at, at + 0.9], [8, 38], { clamp: true, ease: EASE_OUT })
  const opacity = useTransform(t, [at - 0.01, at, at + 0.9], [0, 0.55, 0], { clamp: true })
  return <motion.circle cx={cx} cy={cy} r={r} style={{ opacity }} className="fill-none stroke-vt-deep" strokeWidth={1.2} />
}

function TownFill({ town }: { town: number }) {
  const t = useSceneTime()
  const at = townArrivals[town]
  const fillOpacity = useTransform(t, [at, at + 0.5], [0, 0.2], { clamp: true })
  return <motion.path d={towns[town].m.d} className="fill-vt-teal" style={{ fillOpacity }} />
}

function ParticipantMap() {
  const t = useSceneTime()
  const opacity = useTransform(t, [4, 4.6, 8.4, 9], [1, 0.16, 0.16, 0], { clamp: true })
  const legend = useTransform(t, [3.9, 4.3], [1, 0], { clamp: true })
  const people = useTransform(t, (v) => String(DOTS.filter((d) => d.at <= v).length).padStart(2, "0"))
  const places = useTransform(t, (v) => String(townArrivals.filter((a) => a <= v).length).padStart(2, "0"))

  return (
    <motion.div className="absolute left-[45cqw] top-[16.4cqw] w-[51cqw]" style={{ opacity }}>
      <IslandMap
        className="w-full overflow-visible"
        renderMunicipality={(m) => (
          <path key={m.name} d={m.d} className="fill-white stroke-vt-teal/40" strokeWidth={0.6} />
        )}
      >
        {towns.map((town, i) => (
          <TownFill key={town.name} town={i} />
        ))}
        {towns.map((town, i) => (
          <TownPulse key={town.name} town={i} />
        ))}
        {DOTS.map((dot, i) => (
          <ParticipantDot key={i} dot={dot} />
        ))}
      </IslandMap>

      <motion.div
        style={{ opacity: legend }}
        className="mt-[2.4cqw] flex items-end justify-between border-t border-vt-ink/15 pt-[1.2cqw]"
      >
        <div className="flex items-center gap-[0.6cqw] font-sans text-[0.9cqw] text-vt-ink">
          <span className="h-[0.7cqw] w-[0.7cqw] rounded-full bg-vt-deep ring-[0.12cqw] ring-white" />
          One resident, in their own pueblo
        </div>
        <div className="flex items-baseline gap-[2.4cqw]">
          <Tally value={people} label="Residents" />
          <Tally value={places} label="Pueblos" />
        </div>
      </motion.div>
    </motion.div>
  )
}

function Tally({ value, label }: { value: MotionValue<string>; label: string }) {
  return (
    <div className="flex items-baseline gap-[0.6cqw]">
      <motion.span className="font-serif text-[2.6cqw] leading-none tabular-nums text-vt-ink">{value}</motion.span>
      <Kicker className="text-vt-deep">{label}</Kicker>
    </div>
  )
}

function IntroColumn() {
  const kicker = useReveal(-0.6, 9)
  const headline = useReveal(-0.6, 9, 1.4)
  const support = useReveal(0.3, 9)
  const highlight = useTween(1.2, 1.8)

  return (
    <div className="absolute left-[4cqw] top-[16.4cqw] w-[36cqw]">
      <motion.div style={kicker}>
        <Kicker className="text-vt-deep">Months 1–2 · Research</Kicker>
      </motion.div>
      <motion.h2
        style={headline}
        className="mt-[1.6cqw] font-serif text-[4.6cqw] leading-[1.02] tracking-[-0.02em] text-vt-ink"
      >
        We sat down with{" "}
        <span className="relative inline-block">
          <motion.span
            className="absolute inset-x-[-0.3cqw] bottom-[0.3cqw] top-[1.2cqw] origin-left bg-vt-sun"
            style={{ scaleX: highlight }}
          />
          <span className="relative tabular-nums">{participants}</span>
        </span>{" "}
        residents.
      </motion.h2>
      <motion.p style={support} className="mt-[1.8cqw] max-w-[30cqw] text-balance font-sans text-[1.3cqw] leading-[1.4] text-vt-ink">
        {townCount} pueblos · {interviewHours} hours of interviews and field sessions
      </motion.p>
    </div>
  )
}

/* ---------- Beat 2: what they told us ---------- */

const CARDS = [
  {
    who: "P07 · 34 y/o · Caguas",
    quote: "“I plan by town. I pick a pueblo, then I see what’s there.”",
    method: "Interview",
    left: "left-[46cqw]",
    rotate: -1.4,
    dy: 0,
  },
  {
    who: "P19 · 41 y/o · Ponce",
    quote: "“We decide Thursday night, on the phone, for Saturday.”",
    method: "Ride-along",
    left: "left-[62.8cqw]",
    rotate: 0.9,
    dy: 1.6,
  },
  {
    who: "P31 · 27 y/o · Mayagüez",
    quote: "“If someone from there recommends it, I go.”",
    method: "Diary study",
    left: "left-[79.6cqw]",
    rotate: -0.7,
    dy: -0.4,
  },
] as const

const CARD_AT = 4.2
const CARD_STAGGER = 0.9
const CARDS_OUT = 8.7

function InterviewCard({ index }: { index: number }) {
  const card = CARDS[index]
  const t = useSceneTime()
  const at = CARD_AT + index * CARD_STAGGER
  const out = CARDS_OUT + index * 0.08
  const y = useTransform(t, [at, at + 0.8, out, out + 0.5], [10 + card.dy, card.dy, card.dy, card.dy - 2], {
    clamp: true,
    ease: EASE_OUT,
  })
  const opacity = useTransform(t, [at, at + 0.4, out, out + 0.5], [0, 1, 1, 0], { clamp: true })
  const rotate = useTransform(t, [at, at + 0.8], [card.rotate * 3, card.rotate], { clamp: true, ease: EASE_OUT })
  const yCqw = useTransform(y, (v) => `${v}cqw`)

  return (
    <motion.article
      className={`absolute top-[16.6cqw] w-[15.6cqw] ${card.left}`}
      style={{ y: yCqw, opacity, rotate }}
    >
      <div className="absolute left-1/2 top-[-0.7cqw] z-10 h-[1.4cqw] w-[5cqw] -translate-x-1/2 rotate-[-2deg] bg-vt-sun/80" />
      <div className="flex h-[21cqw] flex-col rounded-[0.25cqw] bg-white px-[1.3cqw] pb-[1.3cqw] pt-[1.6cqw] shadow-[0_1.2cqw_2.4cqw_-1cqw_rgba(10,50,55,0.35)]">
        <p className="font-sans text-[0.9cqw] font-semibold tracking-[0.06em] text-vt-deep">{card.who}</p>
        <div className="relative mt-[1.1cqw] flex-1">
          <div className="absolute inset-0 flex flex-col">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="h-[2.4cqw] shrink-0 border-b border-vt-teal/30" />
            ))}
          </div>
          <p className="relative translate-y-[0.2cqw] font-serif text-[1.7cqw] leading-[2.4cqw] tracking-[-0.015em] text-vt-ink">
            {card.quote}
          </p>
        </div>
        <span className="self-start rounded-full border border-vt-deep/50 px-[0.7cqw] py-[0.2cqw] font-sans text-[0.75cqw] font-medium text-vt-deep">
          {card.method}
        </span>
      </div>
    </motion.article>
  )
}

/* ---------- Beat 4: did the structure work? ---------- */

const VALIDATE_AT = 12.9

function ResultBar({
  label,
  value,
  at,
  fillClass,
  figureClass,
}: {
  label: string
  value: number
  at: number
  fillClass: string
  figureClass: string
}) {
  const grow = useTween(at, at + 1.2)
  const width = useTransform(grow, (p) => `${p * value}%`)
  const figure = useCounter(value, at, at + 1.2, { suffix: "%" })
  return (
    <div className="flex items-center gap-[2cqw]">
      <div className="flex-1">
        <p className="font-sans text-[1cqw] font-medium text-vt-ink">{label}</p>
        <div className="mt-[0.6cqw] h-[1.5cqw] w-full bg-white">
          <motion.div className={`h-full ${fillClass}`} style={{ width }} />
        </div>
      </div>
      <motion.span
        className={`w-[8cqw] text-right font-serif text-[3.6cqw] leading-none tabular-nums tracking-[-0.02em] ${figureClass}`}
      >
        {figure}
      </motion.span>
    </div>
  )
}

function TreeTest() {
  const panel = useReveal(VALIDATE_AT, undefined, 1.2)
  const rule = useTween(VALIDATE_AT, VALIDATE_AT + 0.8)
  return (
    <motion.div style={panel} className="absolute left-[4cqw] right-[4cqw] top-[24.6cqw]">
      <motion.div className="h-px origin-left bg-vt-ink/20" style={{ scaleX: rule }} />
      <div className="mt-[2cqw] flex gap-[4cqw]">
        <div className="w-[28cqw]">
          <Kicker className="text-vt-deep">Validation · Tree test</Kicker>
          <p className="mt-[1cqw] font-serif text-[2.6cqw] leading-[1.05] tracking-[-0.015em] text-vt-ink">
            “Find a beach
            <br />
            in Cabo Rojo.”
          </p>
          <p className="mt-[0.9cqw] font-sans text-[1cqw] leading-[1.4] text-vt-ink">
            Share of participants who found it without help.
          </p>
        </div>
        <div className="flex flex-1 flex-col gap-[1.6cqw]">
          <ResultBar
            label="Old structure · tree test"
            value={treeTestBefore}
            at={VALIDATE_AT + 0.3}
            fillClass="bg-vt-slate"
            figureClass="text-vt-slate"
          />
          <ResultBar
            label="New structure · tree test"
            value={treeTestAfter}
            at={VALIDATE_AT + 0.5}
            fillClass="bg-vt-teal"
            figureClass="text-vt-deep"
          />
        </div>
      </div>
    </motion.div>
  )
}

export function ResearchScene() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-vt-mist">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(10,50,55,0.09)_0.07cqw,transparent_0.08cqw)] bg-[length:1.6cqw_1.6cqw]" />

      <ParticipantMap />
      <IntroColumn />
      {CARDS.map((card, i) => (
        <InterviewCard key={card.who} index={i} />
      ))}

      <AffinityBoard />
      <TreeTest />

      <Caption at={4.4} until={8.6} tone="dark">
        Most people don’t search by category. They search by pueblo.
      </Caption>
      <Caption at={13.4} until={17.2} tone="dark">
        Three findings shaped every screen that followed.
      </Caption>
    </div>
  )
}
