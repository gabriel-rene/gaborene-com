"use client"

import type { ReactNode } from "react"
import { type MotionValue, motion, useTransform } from "framer-motion"
import {
  Accessibility,
  ArrowRight,
  BatteryFull,
  ChevronLeft,
  Clock,
  Compass,
  MapPin,
  Navigation,
  Route,
  Search,
  Share2,
  Signal,
  SlidersHorizontal,
  Wifi,
  X,
} from "lucide-react"
import { MAP_HEIGHT, MAP_WIDTH, municipalities, type Municipality } from "@/data/puerto-rico-municipalities"
import { FILM_FACTS } from "@/data/voyturisteando-film"
import { EASE_IN_OUT, EASE_OUT, useReveal, useSceneTime, useStep, useTween } from "../film-clock"
import { BrowserWindow, Caption, Cursor, type CursorKey, IslandMap, PhoneFrame } from "../film-primitives"
import {
  CABO_ROJO_PLACES,
  CategoryChip,
  HOME_CATEGORIES,
  KIND_LABEL,
  type Place,
  PlaceCard,
  PlacePhoto,
  PUEBLO,
  SaveButton,
  SiteHeader,
} from "./directory-ui"

/* Browser viewport, in cqw. Everything inside the site is laid out against it. */
const VW = 80
const VH = 33.8

/* Homepage hero map */
const MAP_LEFT = 40.5
const MAP_TOP = 5.2
const MAP_W = 36.5
const MAP_H = (MAP_W * MAP_HEIGHT) / MAP_WIDTH

/* Pueblo page grid */
const GRID_LEFT = 2.4
const GRID_TOP = 14.4
const CARD_W = 16
const CARD_H = 8.9
const GAP = 1

const caboRojo = municipalities.find((m) => m.name === "Cabo Rojo") as Municipality
const CABO = {
  x: MAP_LEFT + (MAP_W * caboRojo.cx) / MAP_WIDTH,
  y: MAP_TOP + (MAP_H * caboRojo.cy) / MAP_HEIGHT,
}

/* Beat times, scene-local seconds */
const T = {
  hover: 4.75,
  mapClick: 5.8,
  pageOut: 5.95,
  chipClick: 8.5,
  filterOut: 8.65,
  reflow: 9.0,
  cardClick: 11.3,
  panel: 11.5,
  devices: 14.4,
}

const pct = (x: number, y: number) => ({ x: (x / VW) * 100, y: (y / VH) * 100 })

function slot(index: number) {
  return { x: (index % 3) * (CARD_W + GAP), y: Math.floor(index / 3) * (CARD_H + GAP) }
}

const cqw = (v: number) => `${v}cqw`

function useCqw(value: MotionValue<number>) {
  return useTransform(value, cqw)
}

function Reveal({
  at,
  until,
  distance = 0.8,
  className = "",
  children,
}: {
  at: number
  until?: number
  distance?: number
  className?: string
  children: ReactNode
}) {
  const style = useReveal(at, until, distance)
  return (
    <motion.div style={style} className={className}>
      {children}
    </motion.div>
  )
}

/* ————————————————————————— Homepage ————————————————————————— */

const REGION_FILL: Record<Municipality["region"], string> = {
  metro: "#004244",
  norte: "#0B4E4F",
  oeste: "#075456",
  sur: "#0E5A5A",
  este: "#034A4C",
  centro: "#11605F",
}

function HomeMunicipality({ m }: { m: Municipality }) {
  const t = useSceneTime()
  const at = 0.05 + (m.cx / MAP_WIDTH) * 1.1
  const opacity = useTransform(t, [at, at + 0.5], [0, 1], { clamp: true, ease: EASE_OUT })
  return <motion.path d={m.d} fill={REGION_FILL[m.region]} stroke="#F9FAF9" strokeWidth={0.9} style={{ opacity }} />
}

function HomeMap() {
  const hover = useTween(T.hover, T.hover + 0.2)
  const tip = useReveal(T.hover + 0.05, undefined, 0.3)
  return (
    <>
      <div className="absolute left-[40.5cqw] top-[5.2cqw] w-[36.5cqw]">
        <IslandMap className="w-full overflow-visible" renderMunicipality={(m) => <HomeMunicipality key={m.name} m={m} />}>
          <motion.path d={caboRojo.d} className="fill-vt-sun" stroke="#004244" strokeWidth={1.2} style={{ opacity: hover }} />
        </IslandMap>
      </div>
      <motion.div
        style={tip}
        className="absolute left-[42cqw] top-[11.5cqw] z-10 -translate-y-full"
      >
        <div className="relative flex items-center gap-[0.4cqw] whitespace-nowrap rounded-[0.45cqw] bg-[#004244] px-[0.75cqw] py-[0.45cqw] text-[0.74cqw] text-white shadow-[0_0.4cqw_1.2cqw_rgba(0,66,68,0.3)]">
          <span className="h-[0.5cqw] w-[0.5cqw] rounded-full bg-vt-sun" />
          <span className="font-bold">{PUEBLO.name}</span>
          <span className="text-white/70">· {PUEBLO.places} lugares</span>
          <span className="absolute -bottom-[0.3cqw] left-[0.7cqw] h-[0.6cqw] w-[0.6cqw] rotate-45 bg-[#004244]" />
        </div>
      </motion.div>
    </>
  )
}

function HomePage() {
  const t = useSceneTime()
  const opacity = useTransform(t, [T.pageOut, T.pageOut + 0.35], [1, 0], { clamp: true })
  const scale = useTransform(t, [T.pageOut, T.pageOut + 0.6], [1, 0.985], { clamp: true })
  return (
    <motion.div className="absolute inset-0 origin-[53%_40%] bg-[#F9FAF9]" style={{ opacity, scale }}>
      <div className="absolute inset-x-0 top-[3.6cqw] h-[22cqw] bg-[radial-gradient(60%_90%_at_78%_35%,#E6F3F3_0%,#F9FAF9_70%)]" />

      <div className="absolute left-[3cqw] top-[7cqw] w-[36cqw]">
        <Reveal at={-0.1}>
          <p className="flex items-center gap-[0.5cqw] text-[0.66cqw] font-bold uppercase tracking-[0.18em] text-vt-teal">
            <span className="h-[0.12cqw] w-[1.4cqw] bg-vt-teal" />
            Explora tu isla
          </p>
        </Reveal>
        <Reveal at={0}>
          <h1 className="mt-[0.9cqw] text-[3.6cqw] font-extrabold leading-[0.95] tracking-[-0.045em] text-[#004244]">
            Una isla,
            <br />
            <span className="relative inline-block">
              <span className="absolute inset-x-[-0.2cqw] bottom-[0.3cqw] h-[1.1cqw] bg-vt-sun" />
              <span className="relative">{FILM_FACTS.municipalities}</span>
            </span>{" "}
            pueblos.
          </h1>
        </Reveal>
        <Reveal at={0.15}>
          <p className="mt-[1cqw] text-[1.05cqw] leading-snug text-[#5B6366]">¿Pa’ dónde vamos este fin de semana?</p>
        </Reveal>
      </div>

      <HomeMap />

      <Reveal at={0.25} className="absolute left-[3cqw] right-[3cqw] top-[18.8cqw]">
        <div className="rounded-[0.8cqw] bg-white p-[0.9cqw] shadow-[0_0.8cqw_2.4cqw_-0.6cqw_rgba(0,66,68,0.22)] ring-1 ring-[#E4E9E9]">
          <div className="flex items-center gap-[0.6cqw]">
            <SearchField icon={<MapPin className="h-[0.95cqw] w-[0.95cqw]" strokeWidth={2.2} />} label="¿Dónde?" placeholder="Pueblo o región" />
            <SearchField icon={<Compass className="h-[0.95cqw] w-[0.95cqw]" strokeWidth={2.2} />} label="¿Qué?" placeholder="¿Qué te interesa?" />
            <span className="flex h-[2.6cqw] items-center gap-[0.45cqw] rounded-full bg-[#004244] px-[1.5cqw] text-[0.8cqw] font-bold text-white">
              <Search className="h-[0.9cqw] w-[0.9cqw]" strokeWidth={2.6} />
              Buscar
            </span>
          </div>
          <div className="mt-[0.8cqw] flex items-center gap-[0.5cqw]">
            {HOME_CATEGORIES.map((c, i) => (
              <Reveal key={c.label} at={0.45 + i * 0.06} distance={0.4}>
                <CategoryChip icon={c.icon} label={c.label} count={c.count} />
              </Reveal>
            ))}
            <span className="ml-auto flex items-center gap-[0.3cqw] text-[0.72cqw] font-bold text-vt-teal">
              Todas las categorías
              <ArrowRight className="h-[0.8cqw] w-[0.8cqw]" strokeWidth={2.4} />
            </span>
          </div>
        </div>
      </Reveal>

      <Reveal at={0.8} className="absolute left-[3cqw] right-[3cqw] top-[28.2cqw]">
        <div className="flex items-baseline justify-between">
          <p className="text-[1.05cqw] font-extrabold tracking-[-0.02em] text-[#004244]">Cerca de ti este fin de semana</p>
          <p className="flex items-center gap-[0.3cqw] text-[0.7cqw] font-bold text-vt-teal">
            Ver todo <ArrowRight className="h-[0.75cqw] w-[0.75cqw]" strokeWidth={2.4} />
          </p>
        </div>
        <div className="mt-[0.8cqw] grid grid-cols-4 gap-[1cqw]">
          {(["historico", "naturaleza", "playa", "gastronomia"] as const).map((kind, i) => (
            <div key={kind} className="h-[6cqw] overflow-hidden rounded-[0.6cqw] ring-1 ring-[#E4E9E9]">
              <PlacePhoto kind={kind} variant={i} className="h-full w-full" />
            </div>
          ))}
        </div>
      </Reveal>
    </motion.div>
  )
}

function SearchField({ icon, label, placeholder }: { icon: ReactNode; label: string; placeholder: string }) {
  return (
    <span className="flex h-[2.6cqw] flex-1 items-center gap-[0.6cqw] rounded-full bg-[#F9FAF9] px-[1cqw] ring-1 ring-[#E4E9E9]">
      <span className="text-vt-teal">{icon}</span>
      <span className="flex flex-col leading-none">
        <span className="text-[0.52cqw] font-bold uppercase tracking-[0.14em] text-[#5B6366]">{label}</span>
        <span className="mt-[0.2cqw] text-[0.8cqw] text-[#303030]">{placeholder}</span>
      </span>
    </span>
  )
}

/* ————————————————————————— Pueblo page ————————————————————————— */

const PUEBLO_CHIPS = ["Playa", "Naturaleza", "Gastronomía", "Sitios históricos", "Cultura"]

/** Card i: starts in slot `from`, ends in slot `to` (null → filtered out). */
const CARD_PLAN: { place: number; from: number | null; to: number | null; variant: number }[] = [
  { place: 0, from: 0, to: 0, variant: 0 },
  { place: 1, from: 1, to: null, variant: 0 },
  { place: 2, from: 2, to: 1, variant: 1 },
  { place: 3, from: 3, to: null, variant: 0 },
  { place: 4, from: 4, to: null, variant: 0 },
  { place: 5, from: 5, to: 2, variant: 2 },
  { place: 6, from: null, to: 3, variant: 3 },
  { place: 7, from: null, to: 4, variant: 4 },
  { place: 8, from: null, to: 5, variant: 5 },
]

function PuebloCard({ plan, order }: { plan: (typeof CARD_PLAN)[number]; order: number }) {
  const t = useSceneTime()
  const place = CABO_ROJO_PLACES[plan.place]
  const start = slot(plan.from ?? plan.to ?? 0)
  const end = slot(plan.to ?? plan.from ?? 0)
  const delay = plan.to !== null && plan.from !== null ? (plan.from - plan.to) * 0.1 : 0
  const move = useTween(T.reflow + delay, T.reflow + delay + 0.7, EASE_IN_OUT)
  const x = useTransform(move, (p) => cqw(start.x + (end.x - start.x) * p))
  const y = useTransform(move, (p) => cqw(start.y + (end.y - start.y) * p))

  const appear = plan.from === null ? T.reflow + 0.65 + (order - 6) * 0.09 : 6.55 + order * 0.07
  const leave = plan.to === null ? T.filterOut : 99
  const opacity = useTransform(t, [appear, appear + 0.5, leave, leave + 0.35], [0, 1, 1, 0], { clamp: true })
  const lift = useTransform(t, [appear, appear + 0.5], [0.8, 0], { clamp: true, ease: EASE_OUT })
  const liftCqw = useCqw(lift)
  const scale = useTransform(t, [leave, leave + 0.35], [1, 0.94], { clamp: true })

  const isTarget = plan.place === 2
  const hover = useTransform(t, [10.85, 11.0, 11.6, 11.9], [0, 1, 1, 0], { clamp: true })
  const hoverLift = useTransform(hover, (h) => cqw(-0.25 * h))

  return (
    <motion.div className="absolute h-[8.9cqw] w-[16cqw]" style={{ x, y, opacity, scale }}>
      <motion.div className="h-full w-full" style={{ y: liftCqw }}>
        <motion.div className="relative h-full w-full" style={{ y: isTarget ? hoverLift : undefined }}>
          <PlaceCard place={place} variant={plan.variant} />
          {isTarget && (
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-[0.6cqw] shadow-[0_0.8cqw_1.8cqw_-0.4cqw_rgba(0,66,68,0.35)] ring-2 ring-vt-teal"
              style={{ opacity: hover }}
            />
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

const ZOOM = { x: 12, y: 176, w: 150, h: 140 }

function Pin({ place, index }: { place: Place; index: number }) {
  const t = useSceneTime()
  const plan = CARD_PLAN.find((c) => c.place === index)
  const appear = plan?.from === null ? T.reflow + 0.7 + index * 0.05 : 6.85 + index * 0.05
  const leave = plan?.to === null ? T.filterOut : 99
  const opacity = useTransform(t, [appear, appear + 0.4, leave, leave + 0.35], [0, 1, 1, 0], { clamp: true })
  const active = index === 2
  const on = useTween(T.cardClick, T.cardClick + 0.3)
  const r = useTransform(on, (p) => (active ? 3.2 + p * 1.6 : 3.2))
  return (
    <motion.g style={{ opacity }}>
      <motion.circle cx={place.mx} cy={place.my} r={r} fill="#004244" stroke="#fff" strokeWidth={1.1} />
      {active && <motion.circle cx={place.mx} cy={place.my} r={r} className="fill-vt-sun" stroke="#004244" strokeWidth={1.1} style={{ opacity: on }} />}
    </motion.g>
  )
}

function PuebloMap() {
  return (
    <div className="absolute bottom-[0.6cqw] left-[53.6cqw] top-[11.4cqw] w-[24cqw] overflow-hidden rounded-[0.7cqw] bg-[#D7EEEE] ring-1 ring-[#E4E9E9]">
      <svg viewBox={`${ZOOM.x} ${ZOOM.y} ${ZOOM.w} ${ZOOM.h}`} preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
        {municipalities.map((m) => (
          <path
            key={m.name}
            d={m.d}
            fill={m.name === "Cabo Rojo" ? "#FFFFFF" : "#EEF2EF"}
            stroke={m.name === "Cabo Rojo" ? "#004244" : "#C9D6D4"}
            strokeWidth={m.name === "Cabo Rojo" ? 0.9 : 0.5}
          />
        ))}
        <path d="M60 244 C80 250 96 262 110 280" fill="none" stroke="#F2C66D" strokeWidth={0.9} />
        <path d="M58 206 C62 230 66 250 60 290" fill="none" stroke="#F2C66D" strokeWidth={0.9} />
        {CABO_ROJO_PLACES.map((p, i) => (
          <Pin key={p.name} place={p} index={i} />
        ))}
        <text x={100} y={214} className="fill-[#5B6366] font-sans text-[4.2px] font-semibold uppercase tracking-[0.12em]">
          San Germán
        </text>
        <text x={112} y={270} className="fill-[#5B6366] font-sans text-[4.2px] font-semibold uppercase tracking-[0.12em]">
          Lajas
        </text>
        <text x={70} y={186} className="fill-[#5B6366] font-sans text-[4.2px] font-semibold uppercase tracking-[0.12em]">
          Mayagüez
        </text>
        <text x={66} y={238} className="fill-[#004244] font-sans text-[5.4px] font-extrabold uppercase tracking-[0.08em]">
          Cabo Rojo
        </text>
      </svg>
      <div className="absolute right-[0.6cqw] top-[0.6cqw] flex flex-col overflow-hidden rounded-[0.4cqw] bg-white text-[0.9cqw] font-semibold leading-none text-[#303030] shadow-[0_0.1cqw_0.4cqw_rgba(0,0,0,0.12)]">
        <span className="flex h-[1.5cqw] w-[1.5cqw] items-center justify-center border-b border-[#E4E9E9]">+</span>
        <span className="flex h-[1.5cqw] w-[1.5cqw] items-center justify-center">−</span>
      </div>
    </div>
  )
}

function PuebloChips() {
  const step = useStep([T.chipClick])
  const t = useSceneTime()
  const hover = useTransform(t, [8.1, 8.3], [0, 1], { clamp: true })
  const filtered = step >= 0
  return (
    <div className="absolute left-[2.4cqw] top-[11.4cqw] flex w-[50cqw] items-center gap-[0.45cqw]">
      <span className="flex h-[1.9cqw] items-center gap-[0.4cqw] rounded-full bg-white px-[0.8cqw] text-[0.74cqw] font-semibold text-[#303030] ring-1 ring-[#E4E9E9]">
        <SlidersHorizontal className="h-[0.8cqw] w-[0.8cqw] text-[#004244]" strokeWidth={2.2} />
        Filtros
      </span>
      <span className="mx-[0.15cqw] h-[1.2cqw] w-px bg-[#E4E9E9]" />
      <CategoryChip label="Todo" active={!filtered} />
      {PUEBLO_CHIPS.map((label) => (
        <span key={label} className="relative">
          <CategoryChip label={label} active={label === "Playa" && filtered} />
          {label === "Playa" && !filtered && (
            <motion.span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-vt-teal" style={{ opacity: hover }} />
          )}
        </span>
      ))}
    </div>
  )
}

function PuebloPage() {
  const t = useSceneTime()
  const opacity = useTransform(t, [T.pageOut + 0.4, T.pageOut + 0.8], [0, 1], { clamp: true })
  const y = useTransform(t, [T.pageOut + 0.4, T.pageOut + 1.1], [1, 0], { clamp: true, ease: EASE_OUT })
  const yCqw = useCqw(y)
  const results = useStep([T.chipClick])
  return (
    <motion.div className="absolute inset-0 bg-[#F9FAF9]" style={{ opacity }}>
      <div className="absolute inset-x-0 top-[3.6cqw] h-[7cqw] overflow-hidden bg-[#004244]">
        <div className="absolute inset-0 bg-[radial-gradient(50%_120%_at_85%_50%,rgba(35,165,172,0.35)_0%,rgba(0,66,68,0)_70%)]" />
        <motion.div className="absolute left-[2.4cqw] top-[1.1cqw]" style={{ y: yCqw }}>
          <p className="flex items-center gap-[0.4cqw] text-[0.62cqw] font-semibold text-white/55">
            Pueblos <span className="text-white/30">/</span> {PUEBLO.region}
          </p>
          <p className="mt-[0.25cqw] text-[2.4cqw] font-extrabold leading-none tracking-[-0.04em] text-white">{PUEBLO.name}</p>
          <p className="mt-[0.5cqw] flex items-center gap-[0.5cqw] text-[0.76cqw] text-white/75">
            <MapPin className="h-[0.8cqw] w-[0.8cqw] text-vt-sun" strokeWidth={2.4} />
            {PUEBLO.region} · <span className="font-semibold text-white">{PUEBLO.places} lugares</span>
          </p>
        </motion.div>
        <div className="absolute right-[2.4cqw] top-[0.7cqw] w-[17cqw]">
          <IslandMap
            className="w-full"
            renderMunicipality={(m) => (
              <path
                key={m.name}
                d={m.d}
                fill={m.name === "Cabo Rojo" ? "#FFE750" : m.region === "oeste" ? "rgba(255,255,255,0.32)" : "rgba(255,255,255,0.12)"}
                stroke="#004244"
                strokeWidth={0.8}
              />
            )}
          />
        </div>
      </div>

      <motion.div className="absolute inset-0" style={{ y: yCqw }}>
        <PuebloChips />
        <p className="absolute right-[27.6cqw] top-[11.95cqw] text-[0.66cqw] text-[#5B6366]">
          {results >= 0 ? "Playas en Cabo Rojo" : "Ordenar: más cerca"}
        </p>
      </motion.div>
      <div className="absolute left-[2.4cqw] top-[14.4cqw] h-[18.8cqw] w-[50cqw]">
        {CARD_PLAN.map((plan, i) => (
          <PuebloCard key={plan.place} plan={plan} order={i} />
        ))}
      </div>
      <Reveal at={6.7} className="absolute inset-0">
        <PuebloMap />
      </Reveal>
    </motion.div>
  )
}

/* ————————————————————————— Detail panel ————————————————————————— */

const DETAIL = CABO_ROJO_PLACES[2]
const DETAIL_TEXT =
  "Al final del camino de tierra, pasando las salinas. Agua cristalina, sin servicios: lleva agua y sombra."
const DETAIL_META: { icon: typeof Clock; label: string; value: string }[] = [
  { icon: Clock, label: "Horario", value: "Abierto 24 h" },
  { icon: Route, label: "Acceso", value: "Camino de tierra" },
  { icon: Accessibility, label: "Accesible", value: "Parcial" },
]

function MiniMap({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[#D7EEEE] ${className}`}>
      <svg viewBox="16 274 80 43" preserveAspectRatio="xMidYMid slice" className="h-full w-full" aria-hidden>
        {municipalities.map((m) => (
          <path key={m.name} d={m.d} fill={m.name === "Cabo Rojo" ? "#FFFFFF" : "#EEF2EF"} stroke="#C9D6D4" strokeWidth={0.4} />
        ))}
        <path d="M94 277 C82 282 72 287 66 292 C61 296 58 299 56 301" fill="none" stroke="#E0A93B" strokeWidth={0.9} strokeDasharray="1.6 1.2" />
        <circle cx={DETAIL.mx} cy={DETAIL.my} r={5} className="fill-vt-sun" fillOpacity={0.35} />
      </svg>
      <MapPin className="absolute left-1/2 top-[63%] h-[1.4cqw] w-[1.4cqw] -translate-x-1/2 -translate-y-full fill-[#004244] text-white" strokeWidth={1.6} />
    </div>
  )
}

function DetailPanel() {
  const slide = useTween(T.panel, T.panel + 0.7)
  const x = useTransform(slide, (p) => `${(1 - p) * 104}%`)
  const scrim = useTransform(slide, [0, 1], [0, 1])
  const t = useSceneTime()
  const btnHover = useTransform(t, [13.1, 13.3], [0, 1], { clamp: true })
  return (
    <>
      <motion.div className="absolute inset-x-0 bottom-0 top-[3.6cqw] bg-[#0A3237]/25" style={{ opacity: scrim }} />
      <motion.div
        className="absolute bottom-0 right-0 top-[3.6cqw] flex w-[30cqw] flex-col bg-white shadow-[-1cqw_0_3cqw_-0.5cqw_rgba(0,40,42,0.3)]"
        style={{ x }}
      >
        <div className="relative h-[8.6cqw] shrink-0">
          <PlacePhoto kind="playa" variant={1} className="absolute inset-0 h-full w-full" />
          <span className="absolute left-[1cqw] top-[1cqw] flex h-[1.6cqw] w-[1.6cqw] items-center justify-center rounded-full bg-white/90 text-[#004244]">
            <X className="h-[0.85cqw] w-[0.85cqw]" strokeWidth={2.4} />
          </span>
          <div className="absolute right-[1cqw] top-[1cqw] flex gap-[0.5cqw]">
            <span className="flex h-[1.6cqw] w-[1.6cqw] items-center justify-center rounded-full bg-white/90 text-[#004244]">
              <Share2 className="h-[0.8cqw] w-[0.8cqw]" strokeWidth={2.2} />
            </span>
            <SaveButton className="h-[1.6cqw] w-[1.6cqw]" />
          </div>
        </div>
        <div className="flex flex-1 flex-col px-[1.6cqw] pb-[1.3cqw] pt-[1.1cqw]">
          <span className="w-fit rounded-full bg-vt-sun px-[0.6cqw] py-[0.2cqw] text-[0.56cqw] font-bold uppercase tracking-[0.12em] text-[#004244]">
            {KIND_LABEL[DETAIL.kind]}
          </span>
          <p className="mt-[0.55cqw] text-[1.45cqw] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#004244]">{DETAIL.name}</p>
          <p className="mt-[0.4cqw] flex items-center gap-[0.3cqw] text-[0.7cqw] text-[#5B6366]">
            <MapPin className="h-[0.75cqw] w-[0.75cqw]" strokeWidth={2.2} />
            {PUEBLO.name} · {PUEBLO.region} · {KIND_LABEL[DETAIL.kind]}
          </p>
          <p className="mt-[0.8cqw] text-[0.78cqw] leading-[1.5] text-[#303030]">{DETAIL_TEXT}</p>
          <div className="mt-[0.9cqw] flex gap-[1cqw] border-t border-[#E4E9E9] pt-[0.9cqw]">
            <div className="flex flex-1 flex-col gap-[0.55cqw]">
              {DETAIL_META.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-[0.55cqw]">
                  <span className="flex h-[1.4cqw] w-[1.4cqw] items-center justify-center rounded-full bg-vt-mist text-[#004244]">
                    <Icon className="h-[0.75cqw] w-[0.75cqw]" strokeWidth={2.2} />
                  </span>
                  <span className="flex flex-col leading-tight">
                    <span className="text-[0.56cqw] font-semibold uppercase tracking-[0.1em] text-[#5B6366]">{label}</span>
                    <span className="text-[0.74cqw] font-semibold text-[#303030]">{value}</span>
                  </span>
                </div>
              ))}
            </div>
            <MiniMap className="h-[5.6cqw] w-[10.4cqw] rounded-[0.5cqw] ring-1 ring-[#E4E9E9]" />
          </div>
          <div className="mt-auto flex gap-[0.6cqw]">
            <span className="relative flex h-[2.4cqw] flex-1 items-center justify-center gap-[0.45cqw] overflow-hidden rounded-full bg-[#004244] text-[0.8cqw] font-bold text-white">
              <motion.span className="absolute inset-0 bg-vt-teal" style={{ opacity: btnHover }} />
              <Navigation className="relative h-[0.85cqw] w-[0.85cqw]" strokeWidth={2.4} />
              <span className="relative">Cómo llegar</span>
            </span>
            <span className="flex h-[2.4cqw] items-center justify-center gap-[0.4cqw] rounded-full px-[1.2cqw] text-[0.8cqw] font-bold text-[#004244] ring-1 ring-[#CFDADA]">
              Guardar
            </span>
          </div>
        </div>
      </motion.div>
    </>
  )
}

/* ————————————————————————— Mobile ————————————————————————— */

function MobileListing() {
  return (
    <div className="absolute inset-0 flex flex-col bg-white font-sans text-[#303030]">
      <div className="relative h-[13.4cqw] shrink-0">
        <PlacePhoto kind="playa" variant={1} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-x-0 top-0 h-[4cqw] bg-gradient-to-b from-black/25 to-transparent" />
        <div className="absolute inset-x-[1.3cqw] top-[0.55cqw] flex items-center justify-between text-[0.62cqw] font-semibold text-white">
          <span>9:41</span>
          <span className="flex items-center gap-[0.25cqw]">
            <Signal className="h-[0.7cqw] w-[0.7cqw]" strokeWidth={2.6} />
            <Wifi className="h-[0.7cqw] w-[0.7cqw]" strokeWidth={2.6} />
            <BatteryFull className="h-[0.85cqw] w-[0.85cqw]" strokeWidth={2.2} />
          </span>
        </div>
        <div className="absolute inset-x-[0.9cqw] top-[2.3cqw] flex items-center justify-between">
          <span className="flex h-[1.7cqw] w-[1.7cqw] items-center justify-center rounded-full bg-white/90 text-[#004244]">
            <ChevronLeft className="h-[1cqw] w-[1cqw]" strokeWidth={2.4} />
          </span>
          <SaveButton className="h-[1.7cqw] w-[1.7cqw]" />
        </div>
      </div>
      <div className="relative -mt-[1.1cqw] flex flex-1 flex-col rounded-t-[1.1cqw] bg-white px-[1.1cqw] pt-[1.1cqw]">
        <span className="w-fit rounded-full bg-vt-sun px-[0.5cqw] py-[0.15cqw] text-[0.5cqw] font-bold uppercase tracking-[0.12em] text-[#004244]">
          {KIND_LABEL[DETAIL.kind]}
        </span>
        <p className="mt-[0.5cqw] text-[1.2cqw] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#004244]">{DETAIL.name}</p>
        <p className="mt-[0.35cqw] flex items-center gap-[0.25cqw] text-[0.58cqw] text-[#5B6366]">
          <MapPin className="h-[0.65cqw] w-[0.65cqw]" strokeWidth={2.2} />
          {PUEBLO.name} · {PUEBLO.region}
        </p>
        <p className="mt-[0.7cqw] text-[0.64cqw] leading-[1.5]">{DETAIL_TEXT}</p>
        <div className="mt-[0.8cqw] flex flex-col gap-[0.45cqw] border-t border-[#E4E9E9] pt-[0.8cqw]">
          {DETAIL_META.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-[0.45cqw]">
              <span className="flex h-[1.2cqw] w-[1.2cqw] items-center justify-center rounded-full bg-vt-mist text-[#004244]">
                <Icon className="h-[0.65cqw] w-[0.65cqw]" strokeWidth={2.2} />
              </span>
              <span className="text-[0.56cqw] text-[#5B6366]">{label}</span>
              <span className="ml-auto text-[0.6cqw] font-semibold">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center border-t border-[#E4E9E9] bg-white/95 px-[0.9cqw] pb-[0.5cqw] pt-[0.7cqw]">
        <div className="flex w-full gap-[0.5cqw]">
          <SaveButton className="h-[2.2cqw] w-[2.2cqw] shrink-0 bg-white ring-1 ring-[#CFDADA]" />
          <span className="flex h-[2.2cqw] flex-1 items-center justify-center gap-[0.4cqw] rounded-full bg-[#004244] text-[0.72cqw] font-bold text-white">
            <Navigation className="h-[0.75cqw] w-[0.75cqw]" strokeWidth={2.4} />
            Cómo llegar
          </span>
        </div>
        <span className="mt-[0.6cqw] h-[0.22cqw] w-[5cqw] rounded-full bg-[#111]" />
      </div>
    </div>
  )
}

/* ————————————————————————— Scene ————————————————————————— */

const CABO_CURSOR = pct(CABO.x - 0.2, CABO.y - 0.15)
const CHIP_CURSOR = pct(13.9, 12.1)
const CARD_CURSOR = pct(GRID_LEFT + slot(1).x + 8, GRID_TOP + 3.4)
const BUTTON_CURSOR = pct(VW - 30 + 1.6 + 7, VH - 2.6)

const CURSOR_KEYS: CursorKey[] = [
  { t: 3.3, x: 36, y: 78 },
  { t: 4.7, ...CABO_CURSOR },
  { t: T.mapClick, ...CABO_CURSOR, click: true },
  { t: 7.4, ...CABO_CURSOR },
  { t: 8.25, ...CHIP_CURSOR },
  { t: T.chipClick, ...CHIP_CURSOR, click: true },
  { t: 9.9, ...pct(20, 22) },
  { t: 10.85, ...CARD_CURSOR },
  { t: T.cardClick, ...CARD_CURSOR, click: true },
  { t: 12.2, ...pct(40, 26) },
  { t: 13.1, ...BUTTON_CURSOR },
  { t: 14.4, ...BUTTON_CURSOR },
]

export function DirectoryScene() {
  const t = useSceneTime()
  const rise = useTween(0, 1.1)
  const riseY = useTransform(rise, (p) => cqw((1 - p) * 2.5))

  const shrink = useTween(T.devices, T.devices + 1.1, EASE_IN_OUT)
  const browserScale = useTransform(shrink, [0, 1], [1, 0.72])
  const browserX = useTransform(shrink, (p) => cqw(p * 0.5))
  const browserY = useTransform(shrink, (p) => cqw(p * 5.3))

  const phoneIn = useTween(T.devices + 0.35, T.devices + 1.35)
  const phoneX = useTransform(phoneIn, (p) => cqw((1 - p) * 30))
  const deviceLabels = useReveal(T.devices + 1.2, undefined, 0.4)

  const cursorOpacity = useTransform(t, [13.9, 14.3], [1, 0], { clamp: true })
  const page = useStep([T.pageOut + 0.38])

  return (
    <div className="absolute inset-0 overflow-hidden bg-vt-ink">
      <motion.div
        className="absolute left-[10cqw] top-[6cqw] h-[36.2cqw] w-[80cqw] origin-top-left"
        style={{ y: riseY }}
      >
        <motion.div className="h-full w-full origin-top-left" style={{ scale: browserScale, x: browserX, y: browserY }}>
          <BrowserWindow url="voyturisteando.com" className="h-full w-full">
            <div className="absolute inset-0 font-sans">
              <PuebloPage />
              <HomePage />
              <DetailPanel />
              <div className="absolute inset-x-0 top-0">
                <SiteHeader active={page >= 0 ? "Pueblos" : "Explora"} />
              </div>
              <motion.div className="absolute inset-0" style={{ opacity: cursorOpacity }}>
                <Cursor keys={CURSOR_KEYS} />
              </motion.div>
            </div>
          </BrowserWindow>
          <motion.p style={deviceLabels} className="mt-[1.25cqw] font-sans text-[1.11cqw] font-semibold uppercase tracking-[0.18em] text-white/55">
            Desktop
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.div className="absolute left-[73.1cqw] top-[6.6cqw] w-[16.4cqw]" style={{ x: phoneX, opacity: phoneIn }}>
        <PhoneFrame className="w-full">
          <MobileListing />
        </PhoneFrame>
        <motion.p style={deviceLabels} className="mt-[0.9cqw] text-center font-sans text-[0.8cqw] font-semibold uppercase tracking-[0.18em] text-white/55">
          Mobile
        </motion.p>
      </motion.div>

      <Caption at={0.8} until={4.4}>
        Months 3–4. Built around how people actually plan.
      </Caption>
      <Caption at={7.4} until={11.4}>
        Pueblo first. Category second.
      </Caption>
      <Caption at={14.8} until={18.4}>
        One data model. Every screen size.
      </Caption>
    </div>
  )
}

