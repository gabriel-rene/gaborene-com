"use client"

import { type MotionValue, motion, useTransform } from "framer-motion"
import { FILM_SCENES } from "@/data/voyturisteando-film"
import { useFilmTime } from "./film-clock"

const MONTHS = Array.from({ length: 10 }, (_, i) => i + 1)
const firstWorkScene = FILM_SCENES.find((s) => s.months !== null)!
const CHROME_IN = firstWorkScene.start
/** Chrome leaves before the passport phone enters, so the end card gets a clean frame. */
const CHROME_OUT = FILM_SCENES[FILM_SCENES.length - 1].start + 6.4

/**
 * Film time → fractional project month (0–10). Each scene runs from where the
 * previous one ended to the last month it covers, so the bar never goes back.
 */
const MONTH_KEYS: { t: number; month: number }[] = (() => {
  const keys: { t: number; month: number }[] = []
  let month = 0
  for (const scene of FILM_SCENES) {
    if (!scene.months) continue
    keys.push({ t: scene.start, month })
    month = Math.max(month, scene.months[1])
    keys.push({ t: scene.start + scene.duration - 0.6, month })
  }
  return keys
})()

function monthAt(t: number): number {
  if (t <= MONTH_KEYS[0].t) return 0
  for (let i = 1; i < MONTH_KEYS.length; i++) {
    const a = MONTH_KEYS[i - 1]
    const b = MONTH_KEYS[i]
    if (t <= b.t) return a.month + (b.month - a.month) * ((t - a.t) / Math.max(b.t - a.t, 0.001))
  }
  return MONTH_KEYS[MONTH_KEYS.length - 1].month
}

/**
 * Persistent frame furniture: project wordmark and the 10-month timeline that
 * fills as the story moves through the project.
 */
export function FilmChrome() {
  const time = useFilmTime()
  const opacity = useTransform(
    time,
    [CHROME_IN - 0.2, CHROME_IN + 0.6, CHROME_OUT - 0.8, CHROME_OUT],
    [0, 1, 1, 0],
    { clamp: true }
  )
  const month = useTransform(time, monthAt)
  const fill = useTransform(month, (m) => `${(m / 10) * 100}%`)

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-10 mix-blend-difference"
      style={{ opacity }}
    >
      <div className="absolute left-[4cqw] top-[2.6cqw] flex items-baseline gap-[1cqw] font-sans text-[1.05cqw] font-semibold uppercase tracking-[0.14em] text-white">
        <span>VoyTuristeando.com</span>
        <span className="opacity-60">Case study</span>
      </div>
      <div className="absolute right-[4cqw] top-[2.6cqw] font-sans text-[1.05cqw] font-semibold uppercase tracking-[0.14em] text-white opacity-75">
        Puerto Rico Tourism Company
      </div>

      <div className="absolute bottom-[2.6cqw] left-[4cqw] right-[4cqw]">
        <div className="relative h-[0.18cqw] w-full bg-white/25">
          <motion.div className="absolute inset-y-0 left-0 bg-white" style={{ width: fill }} />
        </div>
        <div className="mt-[0.6cqw] grid grid-cols-10 font-sans text-[0.95cqw] font-semibold uppercase tracking-[0.1em] text-white">
          {MONTHS.map((m) => (
            <MonthLabel key={m} month={m} current={month} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function MonthLabel({ month, current }: { month: number; current: MotionValue<number> }) {
  const opacity = useTransform(current, (c) => (c > month - 1 ? 1 : 0.6))
  return (
    <motion.span style={{ opacity }}>
      Month {month}
      {month === 10 && <span className="sr-only"> of 10</span>}
    </motion.span>
  )
}
