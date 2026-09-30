"use client"

import { motion, useTransform } from "framer-motion"
import { MAP_WIDTH, type Municipality, type Region as RegionId, municipalities } from "@/data/puerto-rico-municipalities"
import { FILM_FACTS } from "@/data/voyturisteando-film"
import { EASE_IN_OUT, EASE_OUT, useReveal, useSceneTime } from "../film-clock"
import { IslandMap, Kicker } from "../film-primitives"
import { PassportPhone } from "./next-passport"

const SHADE_FROM = 0.3
const SHADE_TO = 1.9
const FLATTEN_AT = 3.3
const STAMPS_FROM = 3.5
const STAMPS_TO = 4.2
const COLLECT_FROM = 4.6
const COLLECT_SPAN = 1.5
const PHONE_AT = 6.6
const END_CARD_AT = 7.5

/*
 * Interest per pueblo on a dark-ground sequential teal ramp. Same model as the
 * dashboard choropleth (region base + known hotspots + deterministic noise),
 * so the west, the east with the islands, and the metro read hottest.
 */
const RAMP = ["#0E4F56", "#136F77", "#23A5AC", "#74C5CA", "#CFEBEC"]
const RAMP_SWATCHES = ["bg-[#0E4F56]", "bg-[#136F77]", "bg-[#23A5AC]", "bg-[#74C5CA]", "bg-[#CFEBEC]"]
const FLAT = "#106B73"
const TEAL = "#23A5AC"

const REGION_BASE: Record<RegionId, number> = {
  metro: 0.58,
  oeste: 0.66,
  este: 0.6,
  centro: 0.3,
  sur: 0.36,
  norte: 0.32,
}

const HOTSPOTS: Record<string, number> = {
  "San Juan": 0.4,
  Rincón: 0.34,
  "Cabo Rojo": 0.32,
  Culebra: 0.4,
  Vieques: 0.36,
  Isabela: 0.22,
  Aguadilla: 0.2,
  Lajas: 0.22,
  Fajardo: 0.24,
  "Río Grande": 0.18,
  Luquillo: 0.14,
  Ponce: 0.3,
  Utuado: 0.2,
  Jayuya: 0.2,
  Arecibo: 0.16,
  Camuy: 0.14,
  Orocovis: 0.16,
  Patillas: 0.16,
  Cayey: 0.14,
  Barranquitas: 0.1,
}

function noise(seed: string): number {
  let h = 7
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 10007
  return (h % 997) / 997
}

function interestColor(m: Municipality): string {
  const raw = REGION_BASE[m.region] + (HOTSPOTS[m.name] ?? 0) + (noise(m.name) - 0.5) * 0.24
  const value = Math.min(0.99, Math.max(0.04, raw))
  return RAMP[Math.min(RAMP.length - 1, Math.floor(value * RAMP.length))]
}

/** Deterministic shuffle so every render collects stamps in the same order. */
function seededOrder(length: number, seed: number): number[] {
  let state = seed
  const random = () => {
    state = (state + 0x6d2b79f5) | 0
    let x = Math.imul(state ^ (state >>> 15), 1 | state)
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296
  }
  const order = Array.from({ length }, (_, i) => i)
  for (let i = length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}

const shadeAt = (m: Municipality) => SHADE_FROM + (m.cx / MAP_WIDTH) * (SHADE_TO - SHADE_FROM - 0.5)
const stampAt = (m: Municipality) => STAMPS_FROM + (m.cx / MAP_WIDTH) * (STAMPS_TO - STAMPS_FROM)

/** A stamp is never collected before it has appeared. */
const collectAt: number[] = new Array<number>(municipalities.length)
seededOrder(municipalities.length, 1978).forEach((index, k) => {
  const p = k / (municipalities.length - 1)
  const scheduled = COLLECT_FROM + COLLECT_SPAN * Math.pow(p, 0.8)
  collectAt[index] = Math.max(scheduled, stampAt(municipalities[index]) + 0.45)
})
const collectSorted = [...collectAt].sort((a, b) => a - b)

function PuebloShape({ m, index }: { m: Municipality; index: number }) {
  const t = useSceneTime()
  const at = shadeAt(m)
  const recede = stampAt(m)
  const collected = collectAt[index]
  const color = interestColor(m)
  const fill = useTransform(t, [at, at + 0.5, FLATTEN_AT, FLATTEN_AT + 0.5], [FLAT, color, color, TEAL], {
    clamp: true,
  })
  const fillOpacity = useTransform(
    t,
    [recede, recede + 0.4, collected, collected + 0.35],
    [0.9, 0.18, 0.18, 0.42],
    { clamp: true }
  )
  return (
    <motion.path
      d={m.d}
      className="stroke-vt-mist"
      strokeWidth={0.7}
      strokeOpacity={0.8}
      style={{ fill, fillOpacity }}
    />
  )
}

function InterestLegend() {
  return (
    <div className="flex flex-col gap-[0.6cqw] font-sans">
      <Kicker className="text-vt-mist">Interest by pueblo</Kicker>
      <div className="flex items-center gap-[0.7cqw] text-[0.85cqw] text-vt-mist">
        <span>Less</span>
        <span className="flex">
          {RAMP_SWATCHES.map((c) => (
            <span key={c} className={`h-[0.8cqw] w-[2.4cqw] ${c}`} />
          ))}
        </span>
        <span>More</span>
      </div>
    </div>
  )
}

function Stamp({ m, index }: { m: Municipality; index: number }) {
  const t = useSceneTime()
  const at = stampAt(m)
  const collected = collectAt[index]
  const opacity = useTransform(t, [at, at + 0.4], [0, 1], { clamp: true, ease: EASE_OUT })
  const scale = useTransform(
    t,
    [at, at + 0.4, collected, collected + 0.09, collected + 0.3],
    [0.4, 1, 1, 1.35, 1],
    { clamp: true, ease: EASE_OUT }
  )
  const fill = useTransform(t, [collected, collected + 0.05], [0, 1], { clamp: true })
  return (
    <g transform={`translate(${m.cx} ${m.cy})`}>
      <motion.g style={{ opacity, scale }}>
        <circle r={8.5} className="fill-vt-ink/40 stroke-vt-mist/60" strokeWidth={0.9} />
        <circle r={5.9} className="fill-none stroke-vt-mist/60" strokeWidth={0.6} />
        <motion.g style={{ opacity: fill }}>
          <circle r={8.5} className="fill-vt-sun stroke-vt-sun" strokeWidth={0.9} />
          <circle r={5.9} className="fill-none stroke-vt-ink/45" strokeWidth={0.8} />
          <circle r={1.6} className="fill-vt-ink/45" />
        </motion.g>
      </motion.g>
    </g>
  )
}

export function NextScene() {
  const t = useSceneTime()
  const mapScale = useTransform(t, [0, 13.5], [1.03, 0.97])
  const mapY = useTransform(t, [END_CARD_AT - 0.4, END_CARD_AT + 1], ["0cqw", "-4cqw"], {
    clamp: true,
    ease: EASE_IN_OUT,
  })
  const mapOpacity = useTransform(t, [PHONE_AT, PHONE_AT + 1.2], [1, 0.25], { clamp: true })
  const phoneY = useTransform(t, [PHONE_AT, PHONE_AT + 1.3], ["34cqw", "0cqw"], { clamp: true, ease: EASE_OUT })
  const phoneRotate = useTransform(t, [PHONE_AT, PHONE_AT + 1.3], [-12, -6], { clamp: true, ease: EASE_OUT })
  const shade = useTransform(t, [PHONE_AT, PHONE_AT + 1], [0, 1], { clamp: true })
  const counter = useTransform(t, (v) => {
    let n = 0
    for (const at of collectSorted) if (v >= at) n++
    return n
  })

  const before = useReveal(0, FLATTEN_AT + 0.1)
  const legend = useReveal(0.9, FLATTEN_AT + 0.1)
  const after = useReveal(FLATTEN_AT + 0.1, END_CARD_AT + 0.3)
  const tally = useReveal(4.1, END_CARD_AT - 0.2)
  const kicker = useReveal(END_CARD_AT, undefined, 1)
  const title = useReveal(END_CARD_AT + 0.2, undefined, 1)
  const facts = useReveal(END_CARD_AT + 0.6, undefined, 1)
  const hook = useReveal(END_CARD_AT + 1.1, undefined, 1)
  const cta = useReveal(END_CARD_AT + 1.6, undefined, 1)

  return (
    <div className="absolute inset-0 overflow-hidden bg-vt-ink">
      <motion.div
        className="absolute inset-x-[8cqw] top-[13cqw]"
        style={{ scale: mapScale, y: mapY, opacity: mapOpacity }}
      >
        <IslandMap className="w-full" renderMunicipality={(m, i) => <PuebloShape key={m.name} m={m} index={i} />}>
          {municipalities.map((m, i) => (
            <Stamp key={m.name} m={m} index={i} />
          ))}
        </IslandMap>
      </motion.div>

      <motion.p
        style={before}
        className="absolute left-[4cqw] top-[6.5cqw] font-serif text-[3cqw] leading-none tracking-[-0.015em] text-white"
      >
        The directory showed where people wanted to go.
      </motion.p>
      <motion.p
        style={after}
        className="absolute left-[4cqw] top-[6.5cqw] font-serif text-[3cqw] leading-none tracking-[-0.015em] text-white"
      >
        So we gave them a reason to go <span className="text-vt-sun">everywhere</span>.
      </motion.p>

      <motion.div
        className="absolute inset-x-0 bottom-0 h-[34cqw] bg-gradient-to-t from-vt-ink from-35% via-vt-ink/80 to-transparent"
        style={{ opacity: shade }}
      />

      <motion.div
        className="absolute right-[5cqw] top-[29.5cqw] w-[15cqw] origin-bottom"
        style={{ y: phoneY, rotate: phoneRotate }}
      >
        <PassportPhone arriveAt={PHONE_AT} />
      </motion.div>

      <motion.div
        className="absolute inset-x-0 bottom-0 h-[19cqw] bg-gradient-to-t from-vt-ink from-20% via-vt-ink/70 to-transparent"
        style={{ opacity: shade }}
      />

      <motion.div style={legend} className="absolute bottom-[7.2cqw] left-[4cqw]">
        <InterestLegend />
      </motion.div>

      <motion.p
        style={tally}
        className="absolute bottom-[7.2cqw] left-[4cqw] flex items-baseline gap-[0.8cqw] font-serif leading-none"
      >
        <motion.span className="w-[4.4cqw] text-right text-[4.2cqw] tabular-nums text-vt-sun">{counter}</motion.span>
        <span className="text-[1.8cqw] text-vt-mist">/ {FILM_FACTS.municipalities} pueblos</span>
      </motion.p>

      <div className="absolute bottom-[6cqw] left-[4cqw] flex flex-col gap-[1cqw]">
        <motion.div style={kicker}>
          <Kicker className="text-vt-sun">Next: the game</Kicker>
        </motion.div>
        <motion.h2 style={title} className="font-serif text-[6.5cqw] leading-none tracking-[-0.02em] text-white">
          Pasaporte a la Aventura
        </motion.h2>
        <motion.p style={facts} className="font-sans text-[1.7cqw] leading-tight text-vt-mist">
          {FILM_FACTS.passport.destinations}+ check-in destinations. {FILM_FACTS.municipalities} pueblos. One passport.
        </motion.p>
        <motion.p style={hook} className="font-serif text-[2.2cqw] leading-tight tracking-[-0.01em] text-white">
          And for the first time, we could see how people move around the island.
        </motion.p>
        <motion.p
          style={cta}
          className="mt-[0.6cqw] flex items-center gap-[0.8cqw] font-sans text-[0.95cqw] font-semibold uppercase tracking-[0.18em] text-white"
        >
          <span className="h-px w-[3cqw] bg-vt-sun" />
          Watch next <span className="text-vt-sun">→</span>
        </motion.p>
      </div>
    </div>
  )
}
