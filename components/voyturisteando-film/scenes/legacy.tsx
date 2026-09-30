"use client"

import { type MotionValue, motion, useTransform } from "framer-motion"
import { SearchX } from "lucide-react"
import { FILM_FACTS } from "@/data/voyturisteando-film"
import { EASE_OUT, useKeyframes, useReveal, useSceneTime, useStep, useTween, useTypedText } from "../film-clock"
import { BrowserWindow, Caption, Cursor, Kicker } from "../film-primitives"
import { LegacyHeader, LegacyPage, PAGE_HEIGHT, PAGE_WIDTH } from "./legacy-site"

const { legacy, municipalities } = FILM_FACTS

/* Browser placement, frame cqw. */
const BROWSER_LEFT = 4
const BROWSER_TOP = 6.6
const TOOLBAR = 2.4
const VIEWPORT = 36 - TOOLBAR

/** Bottom of the old site's fixed header, viewport cqw. Marks never show above it. */
const NAV_BOTTOM = 5
const EARLY_SCROLL = 4
const END_SCROLL = PAGE_HEIGHT - VIEWPORT
/** The page holds still for notes 1–4, then jumps to the bottom for 5–6. */
const SCROLL_AWAY = 8.9
const SCROLL_LAND = 9.5

const QUERY = "playas en Cabo Rojo"
const CLICK_FIELD = 3.2
const TYPE_FROM = 3.35
const TYPE_TO = 4.25
const SEARCH_AT = 4.65

/* Annotation column, frame cqw. Row tops must match NOTE_ROW_CLASSES. */
const NOTE_TOP = 9.4
const NOTE_PITCH = 6.5
const NOTE_PIN_LEFT = 69.2
const NOTE_PIN_CENTER = 0.95
const GUTTER = 66.8
const NOTE_ROW_CLASSES = [
  "top-[9.4cqw]",
  "top-[15.9cqw]",
  "top-[22.4cqw]",
  "top-[28.9cqw]",
  "top-[35.4cqw]",
  "top-[41.9cqw]",
]

interface AuditNote {
  at: number
  figure: string
  /** One entry per line, so nothing wraps into an orphan. */
  label: string[]
  /** Offending area in page cqw (viewport cqw when `fixed`): x, y, w, h. */
  box: [number, number, number, number]
  /** Numbered pin, same space as `box`. */
  pin: [number, number]
  fixed?: boolean
}

const NOTES: AuditNote[] = [
  {
    at: 5.2,
    figure: `${legacy.totalEntries}`,
    label: [
      `${legacy.directoryEntries} places · ${legacy.events} events · ${legacy.offers} offers`,
      `${legacy.posts} posts — one WordPress install`,
    ],
    box: [28.4, 1.75, 31.4, 2.9],
    pin: [59.8, 1.75],
    fixed: true,
  },
  {
    at: 6.0,
    figure: `${legacy.mobileLoadSeconds}s`,
    label: ["to load on a phone"],
    box: [0.5, 11.8, 60, 7.8],
    pin: [59.8, 11.8],
  },
  {
    at: 6.8,
    figure: `${legacy.municipalityTags}`,
    label: [`pueblo tags for ${municipalities} pueblos`],
    box: [29, 28.1, 30.8, 3.9],
    pin: [59.8, 28.1],
  },
  {
    at: 7.6,
    figure: `${legacy.filterTags}`,
    label: ["overlapping filter tags"],
    box: [29, 24.1, 30.8, 3.9],
    pin: [59.8, 24.1],
  },
  {
    at: 9.65,
    figure: "Lorem ipsum",
    label: ["live on the homepage"],
    box: [21.5, 59.1, 37.6, 2.1],
    pin: [59.1, 59.1],
  },
  {
    at: 10.35,
    figure: `© ${legacy.copyrightYear}`,
    label: ["It was 2022."],
    box: [2, 70.6, 22.6, 1.1],
    pin: [24.6, 70.6],
  },
]

const ALL_NOTES_AT = 10.9
const MARK_FADE = 0.3

/**
 * A note's marks (box, pin, leader) are dismissed when the next note lands,
 * and always before the page scrolls away underneath them.
 */
function dismissAt(index: number): number {
  const note = NOTES[index]
  const next = NOTES[index + 1]?.at ?? Infinity
  return !note.fixed && note.at < SCROLL_AWAY ? Math.min(next, SCROLL_AWAY) : next
}

/** 0 → 1 when the note lands, back to 0 as it is dismissed. */
function markWindow(t: number, index: number): number {
  const { at } = NOTES[index]
  const until = dismissAt(index)
  if (t < at) return 0
  return Math.max(0, Math.min(1, (until - t) / MARK_FADE))
}

/** 1 while the pin sits clearly below the fixed header, fading to 0 before it reaches it. */
function visibility(note: AuditNote, scroll: number): number {
  if (note.fixed) return 1
  const top = Math.min(note.box[1], note.pin[1] - 0.7) - scroll
  return Math.max(0, Math.min(1, (top - NAV_BOTTOM - 0.3) / 0.8))
}

function pinInFrame(note: AuditNote, scroll: number): [number, number] {
  const [x, y] = note.pin
  const viewportY = note.fixed ? y : Math.max(NAV_BOTTOM + 0.7, y - scroll)
  return [BROWSER_LEFT + x, BROWSER_TOP + TOOLBAR + viewportY]
}

/* ---------- Search panel inside the recreated page ---------- */

const RESULTS = [
  { name: "Playa Buyé", meta: "Cabo Rojo · Playas", tone: "from-[#F7C46C] to-[#23A5AC]" },
  { name: "Parador El Faro", meta: "Aguadilla · Hospederías", tone: "from-[#F2994A] to-[#106B73]" },
  { name: "Cueva Ventana", meta: "Arecibo · Naturaleza", tone: "from-[#106B73] to-[#0A3237]" },
]

function SearchPanel() {
  const typed = useTypedText(QUERY, TYPE_FROM, TYPE_TO)
  const step = useStep([CLICK_FIELD, SEARCH_AT])
  const focused = step === 0
  const searched = step >= 1
  return (
    <div className="flex h-full flex-col rounded-[0.25cqw] border border-[#E6E6E6] bg-[#F8F8F8] p-[0.5cqw]">
      <div className="flex h-[1.7cqw] gap-[0.3cqw]">
        <div
          className={`flex flex-1 items-center rounded-[0.15cqw] border bg-white px-[0.5cqw] text-[0.6cqw] ${
            focused ? "border-vt-teal ring-1 ring-vt-teal/40" : "border-[#D6D6D6]"
          }`}
        >
          {typed ? (
            <span className="text-vt-slate">{typed}</span>
          ) : (
            <span className="text-vt-slate/60">Buscar playas, hoteles, pueblos…</span>
          )}
          {focused && <span className="ml-[0.05cqw] h-[0.8cqw] w-px bg-vt-slate" />}
        </div>
        <span className="flex items-center rounded-[0.15cqw] bg-vt-sun px-[0.8cqw] text-[0.52cqw] font-extrabold uppercase tracking-[0.08em] text-vt-ink">
          Buscar
        </span>
      </div>
      <div className="mt-[0.45cqw] flex gap-[0.9cqw] border-b border-[#E6E6E6] pb-[0.25cqw] text-[0.5cqw] text-vt-slate">
        <span className="font-bold text-vt-teal">Todos</span>
        <span>Hospederías</span>
        <span>Atracciones</span>
        <span>Eventos</span>
      </div>
      {searched ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-[0.25cqw] text-center">
          <SearchX className="h-[1.2cqw] w-[1.2cqw] text-vt-slate/60" strokeWidth={1.75} />
          <p className="text-[0.66cqw] font-bold text-vt-slate">No se encontraron resultados.</p>
          <p className="text-[0.5cqw] text-vt-slate/80">0 resultados para “{QUERY}”</p>
        </div>
      ) : (
        <div className="mt-[0.35cqw] flex flex-col">
          {RESULTS.map((r) => (
            <div key={r.name} className="flex h-[1.55cqw] items-center gap-[0.5cqw]">
              <span className={`h-[1.15cqw] w-[1.15cqw] shrink-0 rounded-[0.12cqw] bg-gradient-to-br ${r.tone}`} />
              <span className="text-[0.56cqw] font-bold text-vt-slate">{r.name}</span>
              <span className="text-[0.48cqw] text-vt-slate/80">{r.meta}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ---------- Audit marks drawn over the page ---------- */

function PageMark({ note, index, scroll }: { note: AuditNote; index: number; scroll: MotionValue<number> }) {
  const t = useSceneTime()
  const { at } = note
  const flicker = useTransform(t, [at + 0.06, at + 0.16, at + 0.26], [1, 0.15, 1], { clamp: true })
  const flash = useTransform([t, scroll, flicker], ([tv, sv, fv]: number[]) => {
    return markWindow(tv, index) * visibility(note, sv) * fv
  })
  const pinOpacity = useTransform([t, scroll], ([tv, sv]: number[]) => markWindow(tv, index) * visibility(note, sv))
  const pinScale = useTransform(t, [at, at + 0.35], [0, 1], { clamp: true, ease: EASE_OUT })
  const ring = useTransform(t, [at, at + 0.7], [0, 1], { clamp: true, ease: EASE_OUT })
  const ringR = useTransform(ring, [0, 1], [0.7, 2.2])
  const ringOpacity = useTransform(ring, [0, 0.05, 1], [0, 0.7, 0])
  const [x, y, w, h] = note.box
  const [px, py] = note.pin
  return (
    <g>
      <motion.rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={0.2}
        className="fill-vt-flame/[0.07] stroke-vt-flame"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        style={{ opacity: flash }}
      />
      <motion.circle cx={px} cy={py} r={ringR} className="fill-none stroke-vt-sun" strokeWidth={1.5} vectorEffect="non-scaling-stroke" style={{ opacity: ringOpacity }} />
      <motion.g style={{ scale: pinScale, opacity: pinOpacity }}>
        <circle cx={px} cy={py} r={0.7} className="fill-vt-sun stroke-vt-ink" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        <text
          x={px}
          y={py}
          dy="0.06"
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-vt-ink font-sans text-[0.78px] font-bold"
        >
          {index + 1}
        </text>
      </motion.g>
    </g>
  )
}

function LeaderLine({ note, index, scroll }: { note: AuditNote; index: number; scroll: MotionValue<number> }) {
  const t = useSceneTime()
  const draw = useTween(note.at + 0.1, note.at + 0.6)
  const opacity = useTransform([t, scroll], ([tv, sv]: number[]) => markWindow(tv, index) * visibility(note, sv))
  const ay = NOTE_TOP + index * NOTE_PITCH + NOTE_PIN_CENTER
  const d = useTransform(scroll, (s) => {
    const [fx, fy] = pinInFrame(note, s)
    return `M ${fx + 0.75} ${fy} H ${GUTTER} V ${ay} H ${NOTE_PIN_LEFT}`
  })
  return (
    <motion.path
      d={d}
      className="fill-none stroke-vt-sun"
      strokeWidth={0.1}
      style={{ pathLength: draw, opacity }}
    />
  )
}

function NoteRow({ note, index }: { note: AuditNote; index: number }) {
  const reveal = useReveal(note.at, undefined, 0.8)
  const next = NOTES[index + 1]?.at
  const focus = useKeyframes(
    next === undefined ? [0, 1] : [next, next + 0.4, ALL_NOTES_AT, ALL_NOTES_AT + 0.5],
    next === undefined ? [1, 1] : [1, 0.5, 0.5, 1]
  )
  return (
    <motion.div style={reveal} className={`absolute left-[69.2cqw] w-[26.8cqw] ${NOTE_ROW_CLASSES[index]}`}>
      <motion.div style={{ opacity: focus }} className="flex gap-[1.1cqw]">
        <span className="mt-[0.15cqw] flex h-[1.6cqw] w-[1.6cqw] shrink-0 items-center justify-center rounded-full bg-vt-sun font-sans text-[0.8cqw] font-bold tabular-nums text-vt-ink">
          {index + 1}
        </span>
        <div className="flex min-w-0 flex-col">
          <span className="font-serif text-[2.15cqw] leading-none tracking-[-0.01em] text-white tabular-nums">
            {note.figure}
          </span>
          <span className="mt-[0.45cqw] flex flex-col font-sans text-[0.92cqw] leading-[1.3] text-white/75">
            {note.label.map((line) => (
              <span key={line} className="whitespace-nowrap">
                {line}
              </span>
            ))}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ---------- Scene ---------- */

export function LegacyScene() {
  const t = useSceneTime()
  const rise = useTween(0, 0.9)
  const browserOpacity = useTransform(rise, [0, 0.5, 1], [0.35, 1, 1])
  const browserY = useTransform(rise, [0, 1], ["2.5cqw", "0cqw"])
  const browserScale = useTransform(rise, [0, 1], [0.98, 1])
  const browserX = useKeyframes([4.65, 5.2], [10, 0])
  const browserXcqw = useTransform(browserX, (v) => `${v}cqw`)

  const scroll = useKeyframes([1.6, 3.0, SCROLL_AWAY, SCROLL_LAND], [0, EARLY_SCROLL, EARLY_SCROLL, END_SCROLL])
  const pageY = useTransform(scroll, (s) => `${-s}cqw`)

  const cursorOpacity = useTransform(t, [5.1, 5.5], [1, 0], { clamp: true })
  const kicker = useReveal(4.9, undefined, 0.6)

  const fieldX = 20
  const fieldY = 63.2
  const buttonX = 40
  const scrolling = NOTES.filter((n) => !n.fixed)
  const fixed = NOTES.filter((n) => n.fixed)

  return (
    <div className="absolute inset-0 bg-vt-ink">
      <motion.div
        style={{ opacity: browserOpacity, y: browserY, x: browserXcqw, scale: browserScale }}
        className="absolute left-[4cqw] top-[6.6cqw] h-[36cqw] w-[61cqw]"
      >
        <BrowserWindow url="voyturisteando.com" className="h-full w-full">
          <div className="absolute inset-0 overflow-hidden bg-white">
            <motion.div style={{ y: pageY }} className="absolute inset-x-0 top-0 h-[72cqw]">
              <LegacyPage searchPanel={<SearchPanel />} />
            </motion.div>
            <LegacyHeader />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[5cqw] z-30 overflow-hidden">
              <motion.div style={{ y: pageY }} className="absolute inset-x-0 top-[-5cqw] h-[72cqw]">
                <svg viewBox={`0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}`} className="absolute inset-0 h-full w-full">
                  {scrolling.map((note) => (
                    <PageMark key={note.at} note={note} index={NOTES.indexOf(note)} scroll={scroll} />
                  ))}
                </svg>
              </motion.div>
            </div>
            <svg
              viewBox={`0 0 ${PAGE_WIDTH} ${VIEWPORT}`}
              className="pointer-events-none absolute inset-0 z-30 h-full w-full overflow-visible"
            >
              {fixed.map((note) => (
                <PageMark key={note.at} note={note} index={NOTES.indexOf(note)} scroll={scroll} />
              ))}
            </svg>
            <motion.div style={{ opacity: cursorOpacity }} className="absolute inset-0 z-40">
              <Cursor
                keys={[
                  { t: 2.6, x: 58, y: 82 },
                  { t: CLICK_FIELD, x: fieldX, y: fieldY, click: true },
                  { t: 4.3, x: fieldX + 6, y: fieldY + 3 },
                  { t: SEARCH_AT - 0.05, x: buttonX, y: fieldY, click: true },
                  { t: 5.4, x: buttonX + 10, y: fieldY + 24 },
                ]}
              />
            </motion.div>
          </div>
        </BrowserWindow>
      </motion.div>

      <svg viewBox="0 0 100 56.25" className="pointer-events-none absolute inset-0 h-full w-full">
        {NOTES.map((note, i) => (
          <LeaderLine key={note.at} note={note} index={i} scroll={scroll} />
        ))}
      </svg>

      <motion.div style={kicker} className="absolute left-[69.2cqw] top-[6.9cqw]">
        <Kicker className="text-vt-teal">Month 1 · Audit</Kicker>
      </motion.div>
      {NOTES.map((note, i) => (
        <NoteRow key={note.at} note={note} index={i} />
      ))}

      <Caption at={0.4} until={4.6}>
        Month 1. We started with an audit.
      </Caption>
      <Caption at={10.6} until={13.5}>
        Plenty of content.
        <br />
        No structure to find it.
      </Caption>
    </div>
  )
}
