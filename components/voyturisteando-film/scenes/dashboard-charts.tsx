"use client"

import type { ReactNode } from "react"
import { type MotionValue, motion, useTransform } from "framer-motion"
import { FILM_FACTS } from "@/data/voyturisteando-film"
import {
  MAP_WIDTH,
  type Municipality,
  type Region,
  municipalities,
} from "@/data/puerto-rico-municipalities"
import { EASE_IN_OUT, EASE_OUT, useReveal, useSceneTime } from "../film-clock"
import { IslandMap } from "../film-primitives"

/* Scene-local timing shared by the dashboard visuals. */
export const TIMING = {
  kpiFrom: 2.5,
  mapCard: 3.2,
  mapFillFrom: 3.5,
  spotsFrom: 4.9,
  barsCard: 3.8,
  heatCard: 4.4,
  callout: 7.3,
  /** The heatmap card steps forward while the peak-search caption plays. */
  focusFrom: 7.3,
  focusTo: 9.9,
  filterFrom: 11.3,
  filterTo: 12.4,
  /** Western picks ring out as the content-plan caption lands. */
  pickFrom: 13.6,
}

const F0 = TIMING.filterFrom
const F1 = TIMING.filterTo
const linear = (v: number) => v

const NAVY = "#0B374D"
const SUN = "#FFE750"
const EMPTY = "#F3F2F1"
/** Single-hue sequential ramp, mist → deep teal. */
const RAMP = ["#ECF6F6", "#BCE2E4", "#74C5CA", "#23A5AC", "#106B73"]
const RAMP_SWATCHES = ["bg-[#ECF6F6]", "bg-[#BCE2E4]", "bg-[#74C5CA]", "bg-[#23A5AC]", "bg-[#106B73]"]

function parseHex(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

function mixHex(a: string, b: string, amount: number): string {
  const [ar, ag, ab] = parseHex(a)
  const [br, bg, bb] = parseHex(b)
  const mix = (x: number, y: number) => Math.round(x + (y - x) * amount)
  return `#${[mix(ar, br), mix(ag, bg), mix(ab, bb)].map((c) => c.toString(16).padStart(2, "0")).join("")}`
}

function rampAt(value: number): string {
  const v = Math.min(1, Math.max(0, value)) * (RAMP.length - 1)
  const i = Math.min(RAMP.length - 2, Math.floor(v))
  return mixHex(RAMP[i], RAMP[i + 1], v - i)
}

/** Deterministic 0–1 noise from a string seed. */
function noise(seed: string): number {
  let h = 7
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 10007
  return (h % 997) / 997
}

/* ── Interest per municipality (drives the choropleth and the Oeste share) ── */

const REGION_BASE: Record<Region, number> = {
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

function interestOf(m: Municipality): number {
  const raw = REGION_BASE[m.region] + (HOTSPOTS[m.name] ?? 0) + (noise(m.name) - 0.5) * 0.24
  return Math.min(0.99, Math.max(0.04, raw))
}

const INTEREST = new Map(municipalities.map((m) => [m.name, interestOf(m)]))
const totalInterest = [...INTEREST.values()].reduce((a, b) => a + b, 0)
const oesteMunicipalities = municipalities.filter((m) => m.region === "oeste")
const OESTE_SHARE =
  oesteMunicipalities.reduce((sum, m) => sum + (INTEREST.get(m.name) ?? 0), 0) / totalInterest

/* ── Most-searched pueblos ── */

interface Spot {
  name: string
  /** Search volume, 0–1 of the top pueblo */
  volume: number
  /** Only listed once the Oeste filter drills in. */
  drill?: boolean
}

const SPOTS: Spot[] = [
  { name: "Rincón", volume: 1 },
  { name: "Cabo Rojo", volume: 0.82 },
  { name: "Culebra", volume: 0.76 },
  { name: "Vieques", volume: 0.68 },
  { name: "Isabela", volume: 0.64 },
  { name: "Ponce", volume: 0.58 },
  { name: "Fajardo", volume: 0.5 },
  { name: "Utuado", volume: 0.42 },
  { name: "Jayuya", volume: 0.36 },
  { name: "Patillas", volume: 0.3 },
  { name: "Aguadilla", volume: 0.56, drill: true },
  { name: "Lajas", volume: 0.48, drill: true },
  { name: "Mayagüez", volume: 0.4, drill: true },
]

const byName = new Map(municipalities.map((m) => [m.name, m]))
function place(name: string): Municipality {
  const m = byName.get(name)
  if (!m) throw new Error(`Unknown municipality: ${name}`)
  return m
}

/* ── KPI cards ── */

const round100 = (v: number) => Math.round(v / 100) * 100
const { monthlySessions, searchesLogged, favoritesSaved, eventsAdded } = FILM_FACTS.dashboard

interface Kpi {
  label: string
  all: number
  oeste: number
  /** Shows “n / total” where total is the number of pueblos in scope. */
  ofTotal?: boolean
}

export const KPIS: Kpi[] = [
  { label: "Sesiones / mes", all: monthlySessions, oeste: round100(monthlySessions * OESTE_SHARE) },
  { label: "Búsquedas registradas", all: searchesLogged, oeste: round100(searchesLogged * OESTE_SHARE) },
  { label: "Favoritos guardados", all: favoritesSaved, oeste: round100(favoritesSaved * OESTE_SHARE) },
  {
    label: "Pueblos buscados",
    all: FILM_FACTS.municipalities,
    oeste: oesteMunicipalities.length,
    ofTotal: true,
  },
  { label: "Eventos publicados", all: eventsAdded, oeste: Math.round(eventsAdded * OESTE_SHARE) },
]

/** 0 → all (count-up), hold, then all → oeste when the slicer changes. */
function useFilteredNumber(all: number, oeste: number, from: number, to: number): MotionValue<number> {
  const t = useSceneTime()
  return useTransform(t, [from, to, F0, F1], [0, all, all, oeste], {
    clamp: true,
    ease: [EASE_OUT, linear, EASE_IN_OUT],
  })
}

const fmt = (v: number) => Math.round(v).toLocaleString("en-US")

export function ReportCard({
  at,
  title,
  aside,
  className = "",
  focus = false,
  children,
}: {
  at: number
  title: string
  aside?: ReactNode
  className?: string
  /** Scale forward during TIMING.focusFrom → focusTo. */
  focus?: boolean
  children: ReactNode
}) {
  const reveal = useReveal(at, undefined, 0.5)
  const t = useSceneTime()
  const { focusFrom, focusTo } = TIMING
  const scale = useTransform(t, [focusFrom, focusFrom + 0.6, focusTo - 0.5, focusTo], focus ? [1, 1.3, 1.3, 1] : [1, 1, 1, 1], {
    clamp: true,
    ease: [EASE_OUT, linear, EASE_IN_OUT],
  })
  const shadow = useTransform(scale, [1, 1.3], [0, 1])
  return (
    <motion.div
      style={{ ...reveal, scale }}
      className={`relative flex min-h-0 origin-bottom-right flex-col rounded-[0.25cqw] border border-[#E1E1E1] bg-white px-[0.8cqw] pb-[0.7cqw] pt-[0.6cqw] ${focus ? "z-20" : ""} ${className}`}
    >
      {focus && (
        <motion.span
          style={{ opacity: shadow }}
          className="pointer-events-none absolute inset-0 rounded-[0.25cqw] shadow-[0_1cqw_3cqw_-0.5cqw_rgba(10,50,55,0.45)]"
        />
      )}
      <div className="flex items-center justify-between gap-[1cqw]">
        <p className="text-[0.8cqw] font-semibold text-[#252423]">{title}</p>
        {aside}
      </div>
      <div className="relative min-h-0 flex-1">{children}</div>
    </motion.div>
  )
}

export function KpiCard({ kpi, index }: { kpi: Kpi; index: number }) {
  const at = TIMING.kpiFrom + index * 0.12
  const reveal = useReveal(at, undefined, 0.5)
  const value = useFilteredNumber(kpi.all, kpi.oeste, at + 0.3, at + 1.9)
  const t = useSceneTime()
  const total = useTransform(t, [F0, F1], [kpi.all, kpi.oeste], { clamp: true, ease: EASE_IN_OUT })
  const text = useTransform(() =>
    kpi.ofTotal ? `${fmt(value.get())} / ${fmt(total.get())}` : fmt(value.get())
  )
  return (
    <motion.div
      style={reveal}
      className="flex flex-col justify-between rounded-[0.25cqw] border border-[#E1E1E1] bg-white px-[0.9cqw] py-[0.65cqw]"
    >
      <p className="text-[0.72cqw] font-normal text-[#605E5C]">{kpi.label}</p>
      <motion.p className="text-[1.95cqw] font-semibold leading-none tracking-[-0.01em] text-[#252423] tabular-nums">
        {text}
      </motion.p>
    </motion.div>
  )
}

/* ── Choropleth + search volume ── */

function MapMunicipality({ m }: { m: Municipality }) {
  const t = useSceneTime()
  const at = TIMING.mapFillFrom + (m.cx / MAP_WIDTH) * 1.3
  const bin = Math.min(RAMP.length - 1, Math.floor((INTEREST.get(m.name) ?? 0) * RAMP.length))
  const color = RAMP[bin]
  const end = m.region === "oeste" ? color : mixHex(color, "#FFFFFF", 0.72)
  const fill = useTransform(t, [at, at + 0.5, F0, F1], [EMPTY, color, color, end], { clamp: true })
  return <motion.path d={m.d} style={{ fill }} stroke="#FFFFFF" strokeWidth={0.9} strokeLinejoin="round" />
}

function spotAt(index: number, spot: Spot): number {
  if (spot.drill) return F0 + 0.35 + (index - 10) * 0.12
  return TIMING.spotsFrom + index * 0.13
}

const spotRadius = (spot: Spot) => 6 + spot.volume * 12

function SearchSpot({ spot, index }: { spot: Spot; index: number }) {
  const t = useSceneTime()
  const m = place(spot.name)
  const at = spotAt(index, spot)
  const keep = m.region === "oeste"
  const drill = spot.drill === true
  const scale = useTransform(t, [at, at + 0.45], [0, 1], { clamp: true, ease: EASE_OUT })
  const opacity = useTransform(
    t,
    drill ? [at, at + 0.05] : [at, at + 0.05, F0, F1],
    drill ? [0, 1] : [0, 1, 1, keep ? 1 : 0.1],
    { clamp: true }
  )
  return (
    <g transform={`translate(${m.cx} ${m.cy})`}>
      <motion.g style={{ scale, opacity }}>
        <circle r={spotRadius(spot)} fill={SUN} fillOpacity={0.9} stroke={NAVY} strokeWidth={2} />
      </motion.g>
    </g>
  )
}

/** Once, as the caption lands: each western pick rings out as it goes into the passport plan. */
function PassportPick({ spot, order }: { spot: Spot; order: number }) {
  const t = useSceneTime()
  const m = place(spot.name)
  const from = TIMING.pickFrom + order * 0.16
  const r0 = spotRadius(spot)
  const r = useTransform(t, [from, from + 0.9], [r0, r0 + 16], { clamp: true, ease: EASE_OUT })
  const opacity = useTransform(t, [from, from + 0.1, from + 0.9], [0, 1, 0], { clamp: true })
  return <motion.circle cx={m.cx} cy={m.cy} r={r} fill="none" stroke={NAVY} strokeWidth={2.4} style={{ opacity }} />
}

function MapLabel({
  name,
  dx = 0,
  dy = -14,
  show,
  anchor = "middle",
}: {
  name: string
  dx?: number
  dy?: number
  show: [number, number, number, number]
  anchor?: "start" | "middle" | "end"
}) {
  const t = useSceneTime()
  const m = place(name)
  const opacity = useTransform(t, [show[0], show[0] + 0.4, show[2], show[3]], [0, 1, show[1], show[1]], {
    clamp: true,
  })
  return (
    <motion.text
      x={m.cx + dx}
      y={m.cy + dy}
      textAnchor={anchor}
      fontSize={15}
      fontWeight={600}
      fill="#252423"
      stroke="#FFFFFF"
      strokeWidth={4}
      strokeLinejoin="round"
      paintOrder="stroke"
      style={{ opacity }}
    >
      {name}
    </motion.text>
  )
}

export function SearchMap() {
  const spotsDone = TIMING.spotsFrom + 10 * 0.13 + 0.6
  const western = SPOTS.filter((s) => place(s.name).region === "oeste")
  return (
    <IslandMap
      className="h-full w-full overflow-visible"
      renderMunicipality={(m) => <MapMunicipality key={m.name} m={m} />}
    >
      {SPOTS.map((spot, i) => (
        <SearchSpot key={spot.name} spot={spot} index={i} />
      ))}
      {western.map((spot, i) => (
        <PassportPick key={spot.name} spot={spot} order={i} />
      ))}
      <MapLabel name="Rincón" dx={-2} dy={38} anchor="start" show={[spotsDone, 1, F0, F1]} />
      <MapLabel name="Culebra" dy={36} show={[spotsDone, 0, F0, F1 - 0.6]} />
      <MapLabel name="Ponce" dy={38} show={[spotsDone, 0, F0, F1 - 0.6]} />
      <MapLabel name="Cabo Rojo" dx={-4} dy={42} anchor="start" show={[F1, 1, F1 + 1, F1 + 1.1]} />
    </IslandMap>
  )
}

export function MapLegend() {
  return (
    <div className="flex items-center gap-[1.2cqw] text-[0.62cqw] text-[#605E5C]">
      <span className="flex items-center gap-[0.4cqw]">
        <svg viewBox="0 0 24 12" className="h-[0.6cqw] w-[1.2cqw]">
          <circle cx={5} cy={7} r={3} fill={SUN} stroke={NAVY} strokeWidth={1.2} />
          <circle cx={16} cy={6} r={5} fill={SUN} stroke={NAVY} strokeWidth={1.2} />
        </svg>
        Búsquedas
      </span>
      <span className="flex items-center gap-[0.4cqw]">
        Interés
        <span className="flex gap-[0.08cqw]">
          {RAMP_SWATCHES.map((c) => (
            <span key={c} className={`h-[0.55cqw] w-[0.9cqw] ${c}`} />
          ))}
        </span>
      </span>
    </div>
  )
}

/* ── Interests (onboarding quiz) ── */

/** Share of quiz answers per interest, all regions vs. Oeste. */
const INTERESTS = FILM_FACTS.dashboard.interests
const INTEREST_MAX = 32

function InterestBar({ row, index }: { row: (typeof INTERESTS)[number]; index: number }) {
  const at = TIMING.barsCard + 0.35 + index * 0.08
  const value = useFilteredNumber(row.all, row.oeste, at, at + 1)
  const width = useTransform(value, (v) => `${(v / INTEREST_MAX) * 100}%`)
  const label = useTransform(value, (v) => `${Math.round(v)}%`)
  return (
    <div className="flex h-full items-center">
      <span className="w-[6.6cqw] shrink-0 text-[0.66cqw] text-[#252423]">{row.label}</span>
      <div className="flex h-full flex-1 items-center border-l border-[#C8C6C4]">
        <motion.div className="h-[62%] max-h-[0.75cqw] rounded-r-[0.18cqw] bg-vt-deep" style={{ width }} />
        <motion.span className="ml-[0.4cqw] text-[0.62cqw] font-semibold text-[#252423] tabular-nums">
          {label}
        </motion.span>
      </div>
    </div>
  )
}

export function InterestBars() {
  return (
    <div className="grid h-full grid-rows-6 pt-[0.4cqw]">
      {INTERESTS.map((row, i) => (
        <InterestBar key={row.label} row={row} index={i} />
      ))}
    </div>
  )
}

/* ── Searches by day and hour ── */

const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
const HOUR_TICKS = ["12 am", "4 am", "8 am", "12 pm", "4 pm", "8 pm"]
/** Two-hour blocks, 12 am → 10 pm. */
const HOUR_PROFILE = [0.12, 0.05, 0.05, 0.2, 0.36, 0.44, 0.4, 0.48, 0.6, 0.82, 0.96, 0.62]
const DAY_ALL = [0.74, 0.76, 0.84, 1, 0.94, 0.8, 0.68]
const DAY_OESTE = [0.64, 0.66, 0.78, 1, 0.98, 0.9, 0.6]
const PEAK_DAY = 3
const PEAK_BLOCK = 10

function heatGrid(dayFactor: number[], seed: string): number[][] {
  const raw = dayFactor.map((f, d) =>
    HOUR_PROFILE.map((h, b) => {
      const evening = (d === 3 || d === 4) && b >= 9 && b <= 11 ? 0.1 : 0
      return h * f + evening + (noise(`${seed}${d}-${b}`) - 0.5) * 0.08
    })
  )
  const peak = raw[PEAK_DAY][PEAK_BLOCK]
  return raw.map((row, d) =>
    row.map((v, b) => (d === PEAK_DAY && b === PEAK_BLOCK ? 1 : Math.min(0.93, Math.max(0.02, v / peak))))
  )
}

const HEAT_ALL = heatGrid(DAY_ALL, "all")
const HEAT_OESTE = heatGrid(DAY_OESTE, "oeste")

function HeatCell({ day, block }: { day: number; block: number }) {
  const t = useSceneTime()
  const at = TIMING.heatCard + 0.3 + block * 0.07 + day * 0.03
  const a = rampAt(HEAT_ALL[day][block])
  const b = rampAt(HEAT_OESTE[day][block])
  const backgroundColor = useTransform(t, [at, at + 0.4, F0, F1], [EMPTY, a, a, b], { clamp: true })
  return <motion.div className="rounded-[0.08cqw]" style={{ backgroundColor }} />
}

export function SearchHeatmap() {
  const callout = useReveal(TIMING.callout, undefined, 0.3)
  const t = useSceneTime()
  const ring = useTransform(t, [TIMING.callout, TIMING.callout + 0.3], [0, 1], { clamp: true })
  return (
    <div className="flex h-full flex-col pt-[0.5cqw]">
      <div className="flex min-h-0 flex-1">
        <div className="grid w-[2cqw] shrink-0 grid-rows-7 text-[0.58cqw] leading-none text-[#605E5C]">
          {DAYS.map((d) => (
            <span key={d} className="flex items-center">
              {d}
            </span>
          ))}
        </div>
        <div className="relative flex-1">
          <div className="grid h-full grid-cols-12 grid-rows-7 gap-[0.1cqw]">
            {DAYS.map((_, d) =>
              HOUR_PROFILE.map((__, b) => <HeatCell key={`${d}-${b}`} day={d} block={b} />)
            )}
          </div>
          <motion.div
            style={{ opacity: ring }}
            className="pointer-events-none absolute left-[83.33%] top-[42.86%] h-[14.29%] w-[8.33%] rounded-[0.1cqw] ring-[0.12cqw] ring-vt-sun ring-offset-0"
          />
          <motion.div
            style={callout}
            className="absolute left-[87.5%] top-[42.86%] -translate-x-1/2 -translate-y-full pb-[0.35cqw]"
          >
            <div className="relative whitespace-nowrap rounded-[0.2cqw] bg-[#252423] px-[0.5cqw] py-[0.25cqw] text-[0.62cqw] font-semibold text-white">
              Jue 8–10 pm
              <span className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-[0.3cqw] border-t-[0.3cqw] border-x-transparent border-t-[#252423]" />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="ml-[2cqw] mt-[0.3cqw] grid grid-cols-6 text-[0.58cqw] leading-none text-[#605E5C]">
        {HOUR_TICKS.map((h) => (
          <span key={h}>{h}</span>
        ))}
      </div>
    </div>
  )
}
