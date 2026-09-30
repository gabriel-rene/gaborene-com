"use client"

import { createContext, useContext, useState } from "react"
import {
  type EasingFunction,
  type MotionValue,
  cubicBezier,
  useMotionValueEvent,
  useTransform,
} from "framer-motion"

const FilmTimeContext = createContext<MotionValue<number> | null>(null)
const SceneStartContext = createContext(0)

export const FilmTimeProvider = FilmTimeContext.Provider
export const SceneStartProvider = SceneStartContext.Provider

export const EASE_OUT: EasingFunction = cubicBezier(0.22, 1, 0.36, 1)
export const EASE_IN_OUT: EasingFunction = cubicBezier(0.65, 0, 0.35, 1)

/** Absolute film time in seconds. */
export function useFilmTime(): MotionValue<number> {
  const time = useContext(FilmTimeContext)
  if (!time) throw new Error("useFilmTime must be used inside the film player")
  return time
}

/** Seconds since the current scene started. */
export function useSceneTime(): MotionValue<number> {
  const time = useFilmTime()
  const start = useContext(SceneStartContext)
  return useTransform(time, (t) => t - start)
}

/** 0 → 1 between two scene-local times, clamped. */
export function useTween(
  from: number,
  to: number,
  ease: EasingFunction = EASE_OUT
): MotionValue<number> {
  const t = useSceneTime()
  return useTransform(t, [from, to], [0, 1], { ease, clamp: true })
}

/** Interpolates scene-local keyframes. `times` must be ascending. */
export function useKeyframes(
  times: number[],
  values: number[],
  ease: EasingFunction = EASE_IN_OUT
): MotionValue<number> {
  const t = useSceneTime()
  return useTransform(t, times, values, { ease, clamp: true })
}

/** Fade + rise in at `at`, optional fade out at `until`. For motion `style`. */
export function useReveal(at: number, until?: number, distance = 1.2) {
  const t = useSceneTime()
  const times = until === undefined ? [at, at + 0.6] : [at, at + 0.6, until - 0.4, until]
  const opacityValues = until === undefined ? [0, 1] : [0, 1, 1, 0]
  const yValues = until === undefined ? [distance, 0] : [distance, 0, 0, -distance / 2]
  const opacity = useTransform(t, times, opacityValues, { clamp: true, ease: EASE_OUT })
  const y = useTransform(t, times, yValues, { clamp: true, ease: EASE_OUT })
  const yCqw = useTransform(y, (v) => `${v}cqw`)
  return { opacity, y: yCqw }
}

/**
 * Index of the last scene-local time that has passed (-1 before the first).
 * Re-renders only when the index changes — use it for discrete UI states
 * such as clicks, page swaps, and filter changes.
 */
export function useStep(times: number[]): number {
  const t = useSceneTime()
  const indexAt = (value: number) => {
    let index = -1
    for (let i = 0; i < times.length; i++) if (value >= times[i]) index = i
    return index
  }
  const [step, setStep] = useState(() => indexAt(t.get()))
  useMotionValueEvent(t, "change", (value) => {
    const next = indexAt(value)
    if (next !== step) setStep(next)
  })
  return step
}

/** Types `text` out between two scene-local times. Re-renders per character. */
export function useTypedText(text: string, from: number, to: number): string {
  const t = useSceneTime()
  const countAt = (value: number) =>
    Math.round(Math.min(1, Math.max(0, (value - from) / (to - from))) * text.length)
  const [count, setCount] = useState(() => countAt(t.get()))
  useMotionValueEvent(t, "change", (value) => {
    const next = countAt(value)
    if (next !== count) setCount(next)
  })
  return text.slice(0, count)
}

/** A number that counts up between two scene-local times, formatted en-US. */
export function useCounter(
  to: number,
  from: number,
  until: number,
  options: { start?: number; decimals?: number; suffix?: string; prefix?: string } = {}
): MotionValue<string> {
  const { start = 0, decimals = 0, suffix = "", prefix = "" } = options
  const progress = useTween(from, until, EASE_OUT)
  return useTransform(progress, (p) => {
    const value = start + (to - start) * p
    return `${prefix}${value.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}${suffix}`
  })
}
