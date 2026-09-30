"use client"

import { motion, useTransform } from "framer-motion"
import { EASE_IN_OUT, EASE_OUT, useSceneTime } from "../film-clock"
import { Kicker } from "../film-primitives"

/*
 * Affinity wall: notes appear scattered, glide into three finding columns,
 * then compress into a zoomed-out board so the tree test fits below.
 * Every position is in cqw, relative to the scene frame.
 */

const FINDINGS = [
  {
    heading: "Plan by pueblo, not by category.",
    notes: [
      "searches by pueblo",
      "no idea what’s in Utuado",
      "how far from me?",
      "picks a town, then looks around",
      "categories feel like homework",
      "road trip = three pueblos",
      "wants the whole town on one page",
      "maps first, lists second",
    ],
  },
  {
    heading: "Decided on a phone, the night before.",
    notes: [
      "weekend = Thursday",
      "WhatsApp to plan",
      "is it open today?",
      "parking?",
      "kids ok?",
      "plans in bed, on the phone",
      "screenshots it for the group",
      "rain plan B",
    ],
  },
  {
    heading: "Trust the local, not the listing.",
    notes: [
      "trusts locals",
      "asks a cousin from there",
      "old photos = closed?",
      "tourist reviews aren’t for us",
      "follows the town’s Instagram",
      "wants the owner’s name",
      "stale info kills trust",
      "“ask at the colmado”",
    ],
  },
] as const

const COLOR_CLASSES = ["bg-vt-sun", "bg-white", "bg-[#CBE9EB]"] as const

const COL_X = [4, 36, 68]
const NOTE_W = 8.6
const NOTE_H = 6.4
const GAP_X = 1.1
const GAP_Y = 1

const POP_FROM = 8.8
const GLIDE_FROM = 9.6
const GLIDE_DURATION = 0.9
const COLUMN_STAGGER = 0.35
const COMPRESS_FROM = 12.4
const COMPRESS_DURATION = 0.9
const MINI_SCALE = 0.6

const HEADING_Y = 8.2
const HEADING_Y_COMPRESSED = 6.4
const NOTES_Y = 16.2
const NOTES_Y_COMPRESSED = 13.9

/** Deterministic 0–1 noise. */
function noise(seed: number): number {
  const v = Math.sin(seed * 127.1 + 311.7) * 43758.5453
  return v - Math.floor(v)
}

interface NotePlan {
  text: string
  color: (typeof COLOR_CLASSES)[number]
  popAt: number
  glideAt: number
  compressAt: number
  scatter: { x: number; y: number; r: number }
  column: { x: number; y: number; r: number }
  mini: { x: number; y: number }
}

const NOTE_COUNT = FINDINGS.reduce((n, f) => n + f.notes.length, 0)

const NOTES: NotePlan[] = FINDINGS.flatMap((finding, c) =>
  finding.notes.map((text, j) => {
    const i = c * finding.notes.length + j
    // A jittered 6 × 4 grid, visited in a shuffled order so each finding starts all over the wall.
    const cell = (i * 7 + 3) % NOTE_COUNT
    const gx = cell % 6
    const gy = Math.floor(cell / 6)
    const scatter = {
      x: 4 + gx * 14.6 + noise(i + 1) * 3.4,
      y: 8 + gy * 7.4 + noise(i + 40) * 2.2,
      r: (noise(i + 80) - 0.5) * 22,
    }
    const column = {
      x: COL_X[c] + (j % 3) * (NOTE_W + GAP_X),
      y: NOTES_Y + Math.floor(j / 3) * (NOTE_H + GAP_Y),
      r: (noise(i + 120) - 0.5) * 3.2,
    }
    const miniW = NOTE_W * MINI_SCALE
    const miniH = NOTE_H * MINI_SCALE
    const mini = {
      x: COL_X[c] + (j % 4) * (miniW + 0.46),
      y: NOTES_Y_COMPRESSED + Math.floor(j / 4) * (miniH + 0.5),
    }
    return {
      text,
      color: COLOR_CLASSES[(i + c) % COLOR_CLASSES.length],
      popAt: POP_FROM + cell * 0.03,
      glideAt: GLIDE_FROM + c * COLUMN_STAGGER + j * 0.05,
      compressAt: COMPRESS_FROM + c * 0.06 + j * 0.02,
      scatter,
      column,
      mini,
    }
  })
)

/** When the last note of a column lands, its heading appears. */
function columnLandsAt(c: number): number {
  const last = FINDINGS[c].notes.length - 1
  return GLIDE_FROM + c * COLUMN_STAGGER + last * 0.05 + GLIDE_DURATION - 0.2
}

function StickyNote({ note }: { note: NotePlan }) {
  const t = useSceneTime()
  const moveTimes = [
    note.glideAt,
    note.glideAt + GLIDE_DURATION,
    note.compressAt,
    note.compressAt + COMPRESS_DURATION,
  ]
  const opts = { clamp: true, ease: EASE_IN_OUT }
  const x = useTransform(t, moveTimes, [note.scatter.x, note.column.x, note.column.x, note.mini.x], opts)
  const y = useTransform(t, moveTimes, [note.scatter.y, note.column.y, note.column.y, note.mini.y], opts)
  const rotate = useTransform(t, moveTimes, [note.scatter.r, note.column.r, note.column.r, note.column.r * 0.5], opts)
  const scale = useTransform(
    t,
    [note.popAt, note.popAt + 0.45, note.compressAt, note.compressAt + COMPRESS_DURATION],
    [0.82, 1, 1, MINI_SCALE],
    { clamp: true, ease: EASE_OUT }
  )
  const opacity = useTransform(t, [note.popAt, note.popAt + 0.3], [0, 1], { clamp: true })
  const lift = useTransform(
    t,
    [note.glideAt, note.glideAt + GLIDE_DURATION * 0.5, note.glideAt + GLIDE_DURATION],
    [0, 1, 0],
    { clamp: true }
  )
  const shadowOpacity = useTransform(lift, (v) => 0.55 + v * 0.45)
  const xCqw = useTransform(x, (v) => `${v}cqw`)
  const yCqw = useTransform(y, (v) => `${v}cqw`)

  return (
    <motion.div
      className="absolute left-0 top-0 origin-top-left"
      style={{ x: xCqw, y: yCqw, rotate, scale, opacity }}
    >
      <motion.div
        className="absolute inset-0 translate-y-[0.35cqw] rounded-[0.1cqw] bg-vt-ink/25 blur-[0.45cqw]"
        style={{ opacity: shadowOpacity }}
      />
      <div
        className={`relative flex h-[6.4cqw] w-[8.6cqw] flex-col overflow-hidden rounded-[0.1cqw] px-[0.75cqw] pb-[0.6cqw] pt-[0.95cqw] ${note.color}`}
      >
        <div className="absolute inset-x-0 top-0 h-[0.7cqw] bg-black/[0.035]" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent from-60% to-black/[0.05]" />
        <p className="relative font-sans text-[1cqw] font-medium leading-[1.2] tracking-[-0.005em] text-vt-ink">
          {note.text}
        </p>
      </div>
    </motion.div>
  )
}

function FindingHeading({ index }: { index: number }) {
  const t = useSceneTime()
  const at = columnLandsAt(index)
  const opacity = useTransform(t, [at, at + 0.6], [0, 1], { clamp: true, ease: EASE_OUT })
  const y = useTransform(
    t,
    [at, at + 0.6, COMPRESS_FROM, COMPRESS_FROM + COMPRESS_DURATION],
    [HEADING_Y + 0.8, HEADING_Y, HEADING_Y, HEADING_Y_COMPRESSED],
    { clamp: true, ease: EASE_OUT }
  )
  const rule = useTransform(t, [at + 0.1, at + 0.8], [0, 1], { clamp: true, ease: EASE_OUT })
  const yCqw = useTransform(y, (v) => `${v}cqw`)
  const left = ["left-[4cqw]", "left-[36cqw]", "left-[68cqw]"][index]

  return (
    <motion.div className={`absolute top-0 w-[28cqw] ${left}`} style={{ y: yCqw, opacity }}>
      <motion.div className="h-[0.14cqw] origin-left bg-vt-ink" style={{ scaleX: rule }} />
      <Kicker className="mt-[1cqw] text-vt-deep">Finding 0{index + 1}</Kicker>
      <h3 className="mt-[0.5cqw] font-serif text-[1.85cqw] leading-[1.08] tracking-[-0.01em] text-vt-ink">
        {FINDINGS[index].heading}
      </h3>
    </motion.div>
  )
}

export function AffinityBoard() {
  return (
    <>
      {FINDINGS.map((f, c) => (
        <FindingHeading key={f.heading} index={c} />
      ))}
      {NOTES.map((note) => (
        <StickyNote key={note.text} note={note} />
      ))}
    </>
  )
}
