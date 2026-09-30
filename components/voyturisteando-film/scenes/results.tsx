"use client"

import type { ReactNode } from "react"
import { motion, useTransform } from "framer-motion"
import { FILM_FACTS } from "@/data/voyturisteando-film"
import { EASE_OUT, useCounter, useReveal, useSceneTime } from "../film-clock"
import { IslandMap, Kicker } from "../film-primitives"

/** The scene enters with a wipe, so the first figure is already in place at t = 0. */
const FIRST = -0.3
const STAGGER = 0.15
const COUNT = 1.7

function Result({
  index,
  figure,
  label,
}: {
  index: number
  figure: ReactNode
  label: string
}) {
  const at = FIRST + index * STAGGER
  const t = useSceneTime()
  const reveal = useReveal(at, undefined, 1.4)
  const rule = useTransform(t, [at - 0.2, at + 0.8], [0, 1], { clamp: true, ease: EASE_OUT })
  return (
    <motion.div style={reveal} className="relative flex flex-col gap-[1.1cqw] pt-[1.4cqw]">
      <motion.span style={{ scaleX: rule }} className="absolute inset-x-0 top-0 h-[0.2cqw] origin-left bg-vt-ink" />
      <p className="flex items-baseline font-[family-name:var(--font-neue-york)] text-[10.5cqw] font-light leading-[0.8] tracking-[-0.035em] text-vt-ink">
        {figure}
      </p>
      <p className="max-w-[40cqw] font-sans text-[1.25cqw] font-medium leading-snug text-vt-ink">{label}</p>
    </motion.div>
  )
}

export function ResultsScene() {
  const { results, directory, municipalities } = FILM_FACTS
  const start = Math.max(0, FIRST)
  const growth = useCounter(results.organicGrowthPercent, start, FIRST + COUNT, { prefix: "+" })
  const minutes = useCounter(results.sessionMinutes, FIRST + STAGGER, FIRST + STAGGER + COUNT, {
    decimals: 1,
  })
  const pueblos = useCounter(results.municipalitiesWithTraffic, FIRST + 2 * STAGGER, FIRST + 2 * STAGGER + COUNT)
  const places = useCounter(directory.listings, FIRST + 3 * STAGGER, FIRST + 3 * STAGGER + COUNT, {
    start: directory.placesAtLaunch,
  })

  const t = useSceneTime()
  const drift = useTransform(t, [0, 7], ["1cqw", "-1cqw"])

  return (
    <div className="absolute inset-0 isolate overflow-hidden bg-vt-sun">
      <motion.div style={{ x: drift }} className="absolute -right-[8cqw] top-[27cqw] w-[60cqw]">
        <IslandMap
          className="w-full"
          renderMunicipality={(m) => (
            <path key={m.name} d={m.d} className="fill-vt-ink/[0.07] stroke-vt-sun" strokeWidth={1.2} />
          )}
        />
      </motion.div>

      <div className="absolute left-[4cqw] top-[7.6cqw]">
        <Kicker className="text-vt-ink">Month 9 · Results</Kicker>
      </div>

      <div className="absolute left-[4cqw] right-[4cqw] top-[11.4cqw] grid grid-cols-2 gap-x-[6cqw] gap-y-[3.6cqw]">
        <Result
          index={0}
          figure={
            <>
              <motion.span>{growth}</motion.span>
              <span className="ml-[0.3cqw] text-[6.4cqw]">%</span>
            </>
          }
          label="organic search traffic vs. month 1"
        />
        <Result
          index={1}
          figure={
            <>
              <motion.span>{minutes}</motion.span>
              <span className="ml-[1cqw] text-[4.4cqw] tracking-[-0.02em]">min</span>
            </>
          }
          label="average session"
        />
        <Result
          index={2}
          figure={
            <>
              <motion.span>{pueblos}</motion.span>
              <span className="ml-[0.2cqw] text-[6.4cqw] opacity-45">/{municipalities}</span>
            </>
          }
          label="pueblos with traffic, every month"
        />
        <Result
          index={3}
          figure={
            <>
              <motion.span>{places}</motion.span>
              <span className="ml-[0.2cqw] text-[6.4cqw]">+</span>
            </>
          }
          label={`places on the map by month 9, up from ${directory.placesAtLaunch.toLocaleString("en-US")} at launch`}
        />
      </div>

    </div>
  )
}
