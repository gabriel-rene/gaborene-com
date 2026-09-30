"use client"

import { useMemo } from "react"
import { motion, useTransform } from "framer-motion"
import { type Municipality, REGION_LABELS, municipalities } from "@/data/puerto-rico-municipalities"
import { FILM_FACTS } from "@/data/voyturisteando-film"
import { EASE_IN_OUT, EASE_OUT, useKeyframes, useReveal, useSceneTime, useStep, useTween } from "../film-clock"
import { Caption, IslandMap, Kicker } from "../film-primitives"

const { legacy, migration } = FILM_FACTS

/* ---------- Timing ---------- */

const PIPE_IN = 2.3
const PIPE_OUT = 9.7
const STAGE_AT = [2.9, 4.2, 5.5, 6.8]
const STAGE_RUN = 1.1
const CARD_AT = [3.8, 5.0, 6.2, 7.4, 8.6]
const MAP_IN = 9.9
const LAND_FROM = 10.4
const LAND_TO = 14.4
const BATCHES = 20

/* ---------- Header ---------- */

const STACK = [
  { mark: "{ }", label: "Strapi v4 · headless CMS" },
  { mark: "</>", label: "Next.js" },
  { mark: "▤", label: "AWS S3" },
  { mark: "◎", label: "Cloudflare" },
  { mark: "Aa", label: "ES / EN" },
]

function StackChip({ mark, label, at }: { mark: string; label: string; at: number }) {
  const reveal = useReveal(at, undefined, 0.5)
  return (
    <motion.span
      style={reveal}
      className="flex h-[2cqw] items-center gap-[0.5cqw] rounded-full border border-white/15 bg-white/[0.04] px-[0.8cqw] font-sans text-[0.85cqw] text-white/90"
    >
      <span className="font-mono text-[0.75cqw] text-vt-teal">{mark}</span>
      {label}
    </motion.span>
  )
}

function Header() {
  const kicker = useReveal(-0.4, undefined, 0.8)
  const title = useReveal(-0.3, undefined, 1)
  const legacyChip = useReveal(0.1, undefined, 0.5)
  const strike = useTween(1.1, 1.6)
  const legacyFade = useKeyframes([1.1, 1.6], [1, 0.45])
  const arrow = useReveal(1.4, undefined, 0.5)
  return (
    <div className="absolute left-[4cqw] top-[7cqw] flex flex-col">
      <motion.div style={kicker}>
        <Kicker className="text-vt-teal">Months 2–3 · Migration</Kicker>
      </motion.div>
      <motion.h2
        style={title}
        className="mt-[0.9cqw] font-serif text-[3.4cqw] leading-none tracking-[-0.02em] text-white"
      >
        From {migration.entriesIn} entries to one data model.
      </motion.h2>
      <div className="mt-[1.4cqw] flex items-center gap-[0.6cqw]">
        <motion.span style={legacyChip} className="relative">
          <motion.span
            style={{ opacity: legacyFade }}
            className="flex h-[2cqw] items-center gap-[0.5cqw] rounded-full border border-white/15 px-[0.8cqw] font-sans text-[0.85cqw] text-white/80"
          >
            <span className="font-mono text-[0.75cqw] text-white/60">W</span>
            WordPress + {legacy.theme}
          </motion.span>
          <motion.span
            style={{ scaleX: strike }}
            className="absolute left-[0.5cqw] right-[0.5cqw] top-1/2 h-[0.12cqw] origin-left bg-vt-flame"
          />
        </motion.span>
        <motion.span style={arrow} className="px-[0.2cqw] font-sans text-[1.2cqw] text-vt-sun">
          →
        </motion.span>
        {STACK.map((s, i) => (
          <StackChip key={s.label} mark={s.mark} label={s.label} at={1.55 + i * 0.1} />
        ))}
      </div>
    </div>
  )
}

/* ---------- Pipeline: raw posts ---------- */

const RAW_POSTS: { title: string; tags: string[] }[] = [
  { title: "Playa Buyé – Cabo Rojo", tags: ["Playas", "playa"] },
  { title: "PARADOR EL FARO!!", tags: ["hospederias", "Paradores"] },
  { title: "cueva-ventana-2", tags: ["naturaleza"] },
  { title: "Hacienda Buena Vista (Ponce)", tags: ["historia-cultura", "Ponce"] },
  { title: "Festival del Café Maricao 2022", tags: ["maricao-2", "Eventos"] },
  { title: "Charco Azul", tags: ["sin municipio"] },
  { title: "Lechonera Los Pinos – Guavate", tags: ["gastronomia", "cayey-2"] },
  { title: "Faro Los Morrillos", tags: ["Beaches", "cabo-rojo"] },
  { title: "EL YUNQUE", tags: ["Naturaleza", "ecoturismo"] },
  { title: "Playa Crash Boat (Aguadilla)", tags: ["playas", "Beaches"] },
  { title: "Bahía Bioluminiscente – Vieques", tags: ["nautico", "Este"] },
  { title: "Toro Verde", tags: ["Aventura", "orocovis"] },
  { title: "Museo de Arte de Ponce", tags: ["museos", "historia-cultura"] },
  { title: "castillo-san-felipe-del-morro", tags: ["Historia"] },
  { title: "Playa Jobos, Isabela", tags: ["surfing", "Playas"] },
  { title: "Cañón San Cristóbal", tags: ["naturaleza", "barranquitas"] },
  { title: "Cavernas del Río Camuy", tags: ["Naturaleza", "camuy"] },
  { title: "La Parguera – Lajas", tags: ["buceo", "Porta del Sol"] },
  { title: "Hacienda San Pedro (café)", tags: ["agroturismo", "jayuya"] },
  { title: "Playa Flamenco", tags: ["playa", "Culebra"] },
]

function RawColumn() {
  const t = useSceneTime()
  const y = useTransform(t, [PIPE_IN, PIPE_OUT], ["0cqw", "-30cqw"], { clamp: true })
  return (
    <div className="absolute left-[4cqw] top-[18cqw] w-[22cqw]">
      <p className="font-mono text-[0.75cqw] text-white/45">wp_posts · {legacy.totalEntries} rows</p>
      <div className="relative mt-[0.8cqw] h-[22cqw] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_80%,transparent)]">
        <motion.div style={{ y }} className="flex flex-col">
          {RAW_POSTS.map((post) => (
            <div key={post.title} className="flex h-[2.7cqw] flex-col justify-center border-b border-white/[0.07]">
              <span className="truncate font-mono text-[0.82cqw] text-white/70">{post.title}</span>
              <span className="mt-[0.25cqw] flex gap-[0.35cqw]">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[0.2cqw] border border-white/15 px-[0.35cqw] font-mono text-[0.62cqw] leading-[1.5] text-white/45"
                  >
                    {tag}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/* ---------- Pipeline: stages ---------- */

const STAGES = [
  { name: "Parse", detail: `${migration.entriesIn} WordPress entries, one schema` },
  {
    name: "Normalize tags",
    detail: `${legacy.filterTags} → ${migration.categories} categories · ${migration.subcategories} sub-categories`,
  },
  { name: "Deduplicate", detail: `${legacy.municipalityTags} pueblo tags → ${FILM_FACTS.municipalities} pueblos` },
  { name: "Geocode", detail: `${migration.geocodedPercent}% of places on the map` },
]

function Stage({ name, detail, at }: { name: string; detail: string; at: number }) {
  const reveal = useReveal(PIPE_IN + 0.3, undefined, 0.6)
  const step = useStep([at, at + STAGE_RUN])
  const progress = useTween(at, at + STAGE_RUN, EASE_IN_OUT)
  const check = useTween(at + STAGE_RUN, at + STAGE_RUN + 0.35)
  const active = step === 0
  const done = step >= 1
  return (
    <motion.div
      style={reveal}
      className={`relative flex h-[5cqw] items-center gap-[1cqw] overflow-hidden rounded-[0.5cqw] border px-[1.1cqw] ${
        active || done ? "border-vt-teal/60 bg-vt-teal/[0.08]" : "border-white/10 bg-white/[0.02]"
      }`}
    >
      <span
        className={`relative flex h-[1.7cqw] w-[1.7cqw] shrink-0 items-center justify-center rounded-full border ${
          done ? "border-vt-teal bg-vt-teal" : active ? "border-vt-teal" : "border-white/25"
        }`}
      >
        <svg viewBox="0 0 16 16" className="h-[1cqw] w-[1cqw]">
          <motion.path
            d="M3.5 8.5 L6.7 11.5 L12.5 4.8"
            className="fill-none stroke-vt-ink"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ pathLength: check }}
          />
        </svg>
      </span>
      <span className="flex min-w-0 flex-col">
        <span className={`font-sans text-[1.15cqw] font-semibold ${active || done ? "text-white" : "text-white/55"}`}>
          {name}
        </span>
        <span className={`mt-[0.2cqw] font-mono text-[0.78cqw] ${done ? "text-vt-sun" : "text-white/50"}`}>
          {detail}
        </span>
      </span>
      <motion.span
        style={{ scaleX: progress }}
        className={`absolute inset-x-0 bottom-0 h-[0.15cqw] origin-left ${done ? "bg-vt-teal/0" : "bg-vt-teal"}`}
      />
    </motion.div>
  )
}

function StageColumn() {
  const label = useReveal(PIPE_IN + 0.2, undefined, 0.6)
  return (
    <div className="absolute left-[34cqw] top-[18cqw] w-[28cqw]">
      <motion.p style={label} className="font-mono text-[0.75cqw] text-white/45">
        scripts/import.ts
      </motion.p>
      <div className="mt-[0.8cqw] flex flex-col gap-[0.6cqw]">
        {STAGES.map((s, i) => (
          <Stage key={s.name} name={s.name} detail={s.detail} at={STAGE_AT[i]} />
        ))}
      </div>
    </div>
  )
}

/* ---------- Pipeline: clean records ---------- */

const CHECK_IN_RADIUS_MI = FILM_FACTS.migration.checkInRadiusMi

const RECORDS = [
  { name: "Faro Los Morrillos", municipio: "Cabo Rojo", category: "Sitios históricos", coords: "17.97, -67.19" },
  { name: "Cueva Ventana", municipio: "Arecibo", category: "Naturaleza", coords: "18.37, -66.69" },
  { name: "Lechonera Los Pinos", municipio: "Cayey", category: "Gastronomía", coords: "18.13, -66.08" },
  { name: "Hacienda Buena Vista", municipio: "Ponce", category: "Sitios históricos", coords: "18.07, -66.65" },
  { name: "Playa Buyé", municipio: "Cabo Rojo", category: "Playa", coords: "18.05, -67.20" },
]

function regionOf(name: string): string {
  const m = municipalities.find((x) => x.name === name)
  return m ? REGION_LABELS[m.region] : ""
}

const CARD_PITCH = 8.3
const CARD_HEIGHT = 7.5
const CARD_TOP = 4.6
const COLUMN_HEIGHT = 22

function RecordCard({ record, at }: { record: (typeof RECORDS)[number]; at: number }) {
  const t = useSceneTime()
  const reveal = useTween(at, at + 0.6)
  const opacity = useTransform(reveal, [0, 1], [0, 1])
  const x = useTransform(reveal, [0, 1], ["-2cqw", "0cqw"])
  const flash = useTransform(t, [at, at + 0.2, at + 1.1], [0, 1, 0], { clamp: true })
  const key = "text-vt-teal"
  const str = "text-vt-mist"
  const num = "text-vt-sun"
  const p = "text-white/35"
  return (
    <motion.div
      style={{ opacity, x }}
      className="relative h-[7.5cqw] rounded-[0.5cqw] border border-white/10 bg-[#0D3B41] px-[1cqw] py-[0.7cqw] font-mono text-[0.74cqw] leading-[1.48] whitespace-pre"
    >
      <motion.span
        style={{ opacity: flash }}
        className="pointer-events-none absolute inset-[-1px] rounded-[0.5cqw] border border-vt-sun"
      />
      <div className={p}>{"{"}</div>
      <div>
        {"  "}
        <span className={key}>name</span>
        <span className={p}>: </span>
        <span className={str}>{`"${record.name}"`}</span>
        <span className={p}>,</span>
      </div>
      <div>
        {"  "}
        <span className={key}>municipio</span>
        <span className={p}>: </span>
        <span className={str}>{`"${record.municipio}"`}</span>
        <span className={p}>, </span>
        <span className={key}>region</span>
        <span className={p}>: </span>
        <span className={str}>{`"${regionOf(record.municipio)}"`}</span>
        <span className={p}>,</span>
      </div>
      <div>
        {"  "}
        <span className={key}>category</span>
        <span className={p}>: </span>
        <span className={str}>{`"${record.category}"`}</span>
        <span className={p}>,</span>
      </div>
      <div>
        {"  "}
        <span className={key}>coords</span>
        <span className={p}>: [</span>
        <span className={num}>{record.coords}</span>
        <span className={p}>], </span>
        <span className={key}>checkInRadiusMi</span>
        <span className={p}>: </span>
        <span className={num}>{CHECK_IN_RADIUS_MI}</span>
      </div>
      <div className={p}>{"}"}</div>
    </motion.div>
  )
}

function RecordColumn() {
  const label = useReveal(PIPE_IN + 0.4, undefined, 0.6)
  // Keep the newest card's bottom edge at the bottom of the column.
  const shiftFor = (k: number) => Math.min(0, COLUMN_HEIGHT - (CARD_TOP + k * CARD_PITCH + CARD_HEIGHT))
  const shift = useKeyframes(
    CARD_AT.slice(1).flatMap((at) => [at - 0.1, at + 0.5]),
    CARD_AT.slice(1).flatMap((_, i) => [shiftFor(i), shiftFor(i + 1)])
  )
  const y = useTransform(shift, (v) => `${v}cqw`)
  return (
    <div className="absolute left-[70cqw] top-[18cqw] w-[26cqw]">
      <motion.p style={label} className="font-mono text-[0.75cqw] text-white/45">
        strapi · api::place.place
      </motion.p>
      <div className="relative mt-[0.8cqw] h-[22cqw] overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_5cqw,black)]">
        <motion.div style={{ y }} className="flex flex-col gap-[0.8cqw] pt-[4.6cqw]">
          {RECORDS.map((r, i) => (
            <RecordCard key={r.name} record={r} at={CARD_AT[i]} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

/* ---------- Pipeline: flow dots ---------- */

const RAILS = [24, 30.5, 37]
const DOT_R = 0.28

function dotsPath(t: number, x0: number, x1: number, offset: number, start: number): string {
  if (t < start) return ""
  const speed = 0.42
  let d = ""
  RAILS.forEach((y, r) => {
    for (let k = 0; k < 3; k++) {
      const phase = (((t - start) * speed + r * 0.37 + k / 3 + offset) % 1 + 1) % 1
      const x = x0 + phase * (x1 - x0)
      d += `M${(x - DOT_R).toFixed(3)} ${y}a${DOT_R} ${DOT_R} 0 1 0 ${2 * DOT_R} 0a${DOT_R} ${DOT_R} 0 1 0 ${-2 * DOT_R} 0`
    }
  })
  return d
}

function FlowDots() {
  const t = useSceneTime()
  const left = useTransform(t, (v) => dotsPath(v, 26.5, 33.5, 0, PIPE_IN + 0.3))
  const right = useTransform(t, (v) => dotsPath(v, 62.5, 69.5, 0.5, CARD_AT[0] - 0.6))
  const leftIn = useTransform(t, [PIPE_IN + 0.3, PIPE_IN + 0.8], [0, 1], { clamp: true })
  const rightIn = useTransform(t, [CARD_AT[0] - 0.6, CARD_AT[0] - 0.1], [0, 1], { clamp: true })
  return (
    <svg viewBox="0 0 100 56.25" className="pointer-events-none absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="migration-fade" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.25" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.75" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="migration-mask-left" maskUnits="userSpaceOnUse" x="26" y="0" width="8" height="56.25">
          <rect x="26" y="0" width="8" height="56.25" fill="url(#migration-fade)" />
        </mask>
        <mask id="migration-mask-right" maskUnits="userSpaceOnUse" x="62" y="0" width="8" height="56.25">
          <rect x="62" y="0" width="8" height="56.25" fill="url(#migration-fade)" />
        </mask>
      </defs>
      {RAILS.map((y) => (
        <g key={y} className="stroke-white/10" strokeWidth={0.06} strokeDasharray="0.3 0.3">
          <line x1={26.5} x2={33.5} y1={y} y2={y} />
          <line x1={62.5} x2={69.5} y1={y} y2={y} />
        </g>
      ))}
      <motion.path d={left} style={{ opacity: leftIn }} className="fill-white/60" mask="url(#migration-mask-left)" />
      <motion.path d={right} style={{ opacity: rightIn }} className="fill-vt-sun" mask="url(#migration-mask-right)" />
    </svg>
  )
}

/* ---------- Payoff: map ---------- */

/** Deterministic LCG so every frame renders the same points. */
function lcg(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    return s / 4294967296
  }
}

function polygons(d: string): [number, number][][] {
  return d
    .split("M")
    .filter(Boolean)
    .map((ring) =>
      ring
        .replace(/Z/g, "")
        .split("L")
        .map((pair) => pair.trim().split(/\s+/).map(Number) as [number, number])
    )
}

function inside(x: number, y: number, rings: [number, number][][]): boolean {
  let hit = false
  for (const ring of rings) {
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i]
      const [xj, yj] = ring[j]
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit
    }
  }
  return hit
}

const HUBS = new Set([
  "San Juan",
  "Ponce",
  "Rincón",
  "Cabo Rojo",
  "Vieques",
  "Culebra",
  "Fajardo",
  "Río Grande",
  "Isabela",
  "Aguadilla",
  "Mayagüez",
  "Jayuya",
  "Utuado",
  "Lajas",
  "Arecibo",
])

interface Batch {
  at: number
  towns: Municipality[]
  points: [number, number][]
}

function buildBatches(): Batch[] {
  const rand = lcg(861)
  const total = migration.importedInOneNight
  const towns = [...municipalities].sort((a, b) => a.name.localeCompare(b.name, "es"))
  const base = 2
  const weights = towns.map((m) => 0.35 + rand() + (HUBS.has(m.name) ? 1.6 : 0))
  const weightSum = weights.reduce((a, b) => a + b, 0)
  const spare = total - base * towns.length
  const raw = weights.map((w) => (w / weightSum) * spare)
  const counts = raw.map((r) => base + Math.floor(r))
  let left = total - counts.reduce((a, b) => a + b, 0)
  const order = raw.map((r, i) => [r - Math.floor(r), i] as const).sort((a, b) => b[0] - a[0])
  for (let k = 0; left > 0; k++, left--) counts[order[k % order.length][1]] += 1

  const pointsByTown = towns.map((m, i) => {
    const rings = polygons(m.d)
    const xs = rings.flat().map((p) => p[0])
    const ys = rings.flat().map((p) => p[1])
    const [minX, maxX, minY, maxY] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)]
    const pts: [number, number][] = []
    for (let n = 0; n < counts[i]; n++) {
      let placed: [number, number] = [m.cx, m.cy]
      for (let tries = 0; tries < 80; tries++) {
        const x = minX + rand() * (maxX - minX)
        const y = minY + rand() * (maxY - minY)
        if (inside(x, y, rings)) {
          placed = [x, y]
          break
        }
      }
      pts.push(placed)
    }
    return pts
  })

  const size = Math.ceil(towns.length / BATCHES)
  return Array.from({ length: BATCHES }, (_, b) => {
    const idx = towns.map((_, i) => i).slice(b * size, (b + 1) * size)
    const p = b / (BATCHES - 1)
    return {
      at: LAND_FROM + (LAND_TO - LAND_FROM) * Math.pow(p, 1.45),
      towns: idx.map((i) => towns[i]),
      points: idx.flatMap((i) => pointsByTown[i]),
    }
  }).filter((b) => b.towns.length > 0)
}

function BatchLayer({ batch }: { batch: Batch }) {
  const t = useSceneTime()
  const opacity = useTransform(t, [batch.at - 0.3, batch.at], [0, 0.8], { clamp: true })
  return (
    <motion.g style={{ opacity }}>
      {batch.towns.map((m) => (
        <path key={m.name} d={m.d} className="fill-vt-teal stroke-vt-ink" strokeWidth={0.8} />
      ))}
    </motion.g>
  )
}

function BatchDots({ batch }: { batch: Batch }) {
  const t = useSceneTime()
  const opacity = useTransform(t, [batch.at - 0.15, batch.at], [0, 1], { clamp: true })
  return (
    <motion.g style={{ opacity }} className="fill-vt-sun">
      {batch.points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={2.1} />
      ))}
    </motion.g>
  )
}

function BatchHalo({ batch }: { batch: Batch }) {
  const t = useSceneTime()
  const opacity = useTransform(t, [batch.at - 0.1, batch.at + 0.05, batch.at + 0.9], [0, 0.45, 0], { clamp: true })
  return (
    <motion.g style={{ opacity }} className="fill-vt-sun">
      {batch.points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={6} />
      ))}
    </motion.g>
  )
}

function Payoff() {
  const t = useSceneTime()
  const batches = useMemo(() => buildBatches(), [])
  const mapIn = useTween(MAP_IN, MAP_IN + 0.9)
  const mapScale = useTransform(mapIn, [0, 1], [0.96, 1])
  const counter = useReveal(MAP_IN + 0.2, undefined, 0.8)
  const count = useMemo(() => {
    let running = 0
    const times = [LAND_FROM - 0.3]
    const values = [0]
    for (const b of batches) {
      running += b.points.length
      times.push(b.at)
      values.push(running)
    }
    return { times, values }
  }, [batches])
  const figure = useTransform(t, count.times, count.values, { clamp: true })
  const figureText = useTransform(figure, (v) => Math.round(v).toLocaleString("en-US"))

  return (
    <>
      <motion.div style={{ opacity: mapIn, scale: mapScale }} className="absolute left-[15cqw] top-[18.6cqw] w-[70cqw]">
        <IslandMap
          className="w-full overflow-visible"
          renderMunicipality={(m) => (
            <path key={m.name} d={m.d} className="fill-vt-deep/70 stroke-vt-ink" strokeWidth={0.8} />
          )}
        >
          {batches.map((b) => (
            <BatchLayer key={b.at} batch={b} />
          ))}
          {batches.map((b) => (
            <BatchHalo key={b.at} batch={b} />
          ))}
          {batches.map((b) => (
            <BatchDots key={b.at} batch={b} />
          ))}
        </IslandMap>
      </motion.div>
      <motion.div style={counter} className="absolute right-[4cqw] top-[6.6cqw] flex flex-col items-end text-right">
        <motion.span className="font-serif text-[6cqw] leading-none tracking-[-0.02em] text-vt-sun tabular-nums">
          {figureText}
        </motion.span>
        <span className="mt-[0.5cqw] font-sans text-[1cqw] text-white/75">unique places, deduplicated and pinned</span>
      </motion.div>
    </>
  )
}

/* ---------- Scene ---------- */

export function MigrationScene() {
  const pipe = useTween(PIPE_OUT, PIPE_OUT + 0.7, EASE_OUT)
  const pipeOpacity = useTransform(pipe, [0, 1], [1, 0])
  const pipeScale = useTransform(pipe, [0, 1], [1, 0.95])
  const pipeIn = useReveal(PIPE_IN, undefined, 0.8)

  return (
    <div className="absolute inset-0 overflow-hidden bg-vt-ink">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(16_107_115/0.28)_1px,transparent_1px),linear-gradient(to_bottom,rgb(16_107_115/0.28)_1px,transparent_1px)] bg-[size:4cqw_4cqw] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />

      <Header />

      <motion.div style={{ opacity: pipeOpacity, scale: pipeScale }} className="absolute inset-0">
        <motion.div style={pipeIn} className="absolute inset-0">
          <RawColumn />
        </motion.div>
        <StageColumn />
        <RecordColumn />
        <FlowDots />
      </motion.div>

      <Payoff />

      <Caption at={2.6} until={6.9}>
        Every place got a pueblo, a region, a category and a pin.
      </Caption>
      <Caption at={10.6} until={16.9}>
        One night, one script:
        <br />
        {migration.importedInOneNight} clean places on the map.
      </Caption>
    </div>
  )
}
