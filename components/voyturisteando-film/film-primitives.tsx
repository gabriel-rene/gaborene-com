"use client"

import type { ReactNode } from "react"
import { motion, useTransform } from "framer-motion"
import { MAP_HEIGHT, MAP_WIDTH, type Municipality, municipalities } from "@/data/puerto-rico-municipalities"
import { EASE_IN_OUT, useReveal, useSceneTime } from "./film-clock"

/*
 * Sizing convention: every scene is laid out in container-query width units
 * (cqw). 1cqw is 1% of the film frame's width, so 1920px frames give
 * 1cqw = 19.2px. Nothing inside the frame uses px or rem.
 */

/** Narration line, bottom-left of the frame. */
export function Caption({
  at,
  until,
  children,
  tone = "light",
}: {
  at: number
  until: number
  children: ReactNode
  tone?: "light" | "dark"
}) {
  const style = useReveal(at, until, 0.8)
  return (
    <motion.p
      style={style}
      className={`absolute bottom-[7.2cqw] left-[4cqw] z-10 max-w-[44cqw] font-serif text-[2.3cqw] leading-[1.15] tracking-[-0.01em] ${
        tone === "light" ? "text-white" : "text-vt-ink"
      }`}
    >
      {children}
    </motion.p>
  )
}

/** Small uppercase label that sits above a heading or a figure. */
export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-sans text-[0.85cqw] font-semibold uppercase tracking-[0.18em] ${className}`}>
      {children}
    </p>
  )
}

/** Desktop browser window. Children fill the viewport area. */
export function BrowserWindow({
  url,
  children,
  className = "",
  dark = false,
}: {
  url: string
  children: ReactNode
  className?: string
  dark?: boolean
}) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-[0.7cqw] shadow-[0_2cqw_5cqw_-1cqw_rgba(0,0,0,0.45)] ring-1 ring-black/10 ${
        dark ? "bg-[#1F2426]" : "bg-white"
      } ${className}`}
    >
      <div
        className={`flex h-[2.4cqw] shrink-0 items-center gap-[0.9cqw] px-[1cqw] ${
          dark ? "bg-[#2A3033]" : "bg-[#EEF0F0]"
        }`}
      >
        <div className="flex gap-[0.4cqw]">
          <span className="h-[0.65cqw] w-[0.65cqw] rounded-full bg-[#FF5F57]" />
          <span className="h-[0.65cqw] w-[0.65cqw] rounded-full bg-[#FEBC2E]" />
          <span className="h-[0.65cqw] w-[0.65cqw] rounded-full bg-[#28C840]" />
        </div>
        <div
          className={`mx-auto flex h-[1.5cqw] w-[40%] items-center justify-center rounded-[0.35cqw] font-sans text-[0.75cqw] ${
            dark ? "bg-[#1F2426] text-white/60" : "bg-white text-[#5B6366]"
          }`}
        >
          {url}
        </div>
        <div className="w-[2.8cqw]" />
      </div>
      <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
    </div>
  )
}

/** Phone with a notch. Size it with width classes; height follows 9:19.5. */
export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative aspect-[9/19.5] rounded-[2.4cqw] bg-[#111] p-[0.55cqw] shadow-[0_2cqw_4cqw_-1cqw_rgba(0,0,0,0.5)] ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[1.9cqw] bg-white">
        {children}
        <div className="absolute left-1/2 top-[0.5cqw] z-30 h-[1.2cqw] w-[5.2cqw] -translate-x-1/2 rounded-full bg-[#111]" />
      </div>
    </div>
  )
}

export interface CursorKey {
  /** Scene-local seconds */
  t: number
  /** Percent of the parent box */
  x: number
  y: number
  click?: boolean
}

/**
 * Pointer that glides between keyframes. Put it inside a `relative` parent;
 * x/y are percentages of that parent. Keys with `click` show a press ripple.
 */
export function Cursor({ keys }: { keys: CursorKey[] }) {
  const t = useSceneTime()
  const times = keys.map((k) => k.t)
  const left = useTransform(t, times, keys.map((k) => k.x), { ease: EASE_IN_OUT, clamp: true })
  const top = useTransform(t, times, keys.map((k) => k.y), { ease: EASE_IN_OUT, clamp: true })
  const leftPct = useTransform(left, (v) => `${v}%`)
  const topPct = useTransform(top, (v) => `${v}%`)
  const opacity = useTransform(t, [keys[0].t - 0.3, keys[0].t], [0, 1], { clamp: true })
  return (
    <motion.div className="pointer-events-none absolute z-40" style={{ left: leftPct, top: topPct, opacity }}>
      {keys
        .filter((k) => k.click)
        .map((k) => (
          <ClickRipple key={k.t} at={k.t} />
        ))}
      <svg viewBox="0 0 24 24" className="h-[1.7cqw] w-[1.7cqw] drop-shadow-[0_0.15cqw_0.3cqw_rgba(0,0,0,0.35)]">
        <path d="M5 3l14 8.5-6.2 1.3L9.6 19 5 3z" fill="#111" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </motion.div>
  )
}

function ClickRipple({ at }: { at: number }) {
  const t = useSceneTime()
  const scale = useTransform(t, [at, at + 0.5], [0.2, 1.6], { clamp: true })
  const opacity = useTransform(t, [at - 0.01, at, at + 0.5], [0, 0.6, 0], { clamp: true })
  return (
    <motion.span
      className="absolute left-[-1.2cqw] top-[-1.2cqw] h-[2.4cqw] w-[2.4cqw] rounded-full bg-vt-sun"
      style={{ scale, opacity }}
    />
  )
}

/**
 * Puerto Rico, 78 municipalities, 1000 × 341 viewBox. `renderMunicipality`
 * lets a scene style each shape; `children` are extra SVG layers drawn on top
 * in the same coordinate space (use Municipality cx/cy for positions).
 */
export function IslandMap({
  className = "",
  renderMunicipality,
  children,
}: {
  className?: string
  renderMunicipality?: (m: Municipality, index: number) => ReactNode
  children?: ReactNode
}) {
  return (
    <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} className={className} role="img" aria-label="Map of Puerto Rico’s 78 municipalities">
      {municipalities.map((m, i) =>
        renderMunicipality ? (
          renderMunicipality(m, i)
        ) : (
          <path key={m.name} d={m.d} className="fill-vt-deep stroke-vt-ink" strokeWidth={0.8} />
        )
      )}
      {children}
    </svg>
  )
}

/** Stat block: big figure + label. Figure can be a MotionValue string. */
export function Stat({
  figure,
  label,
  className = "",
}: {
  figure: ReactNode
  label: string
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-[0.4cqw] ${className}`}>
      <motion.span className="font-serif text-[4.2cqw] leading-none tabular-nums">{figure}</motion.span>
      <span className="font-sans text-[0.95cqw] leading-snug opacity-80">{label}</span>
    </div>
  )
}
