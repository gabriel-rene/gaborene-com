"use client"

import { motion, useTransform } from "framer-motion"
import { FILM_FACTS } from "@/data/voyturisteando-film"
import { EASE_OUT, useSceneTime } from "../film-clock"
import { PhoneFrame } from "../film-primitives"

const [FIRST_LEVEL, NEXT_LEVEL] = FILM_FACTS.passport.levels

const STAMPS = [
  { code: "AGU", collected: true },
  { code: "ARE", collected: true },
  { code: "CAY", collected: true },
  { code: "CUL", collected: false },
  { code: "JAY", collected: true },
  { code: "LAJ", collected: false },
  { code: "PON", collected: true },
  { code: "VIE", collected: false },
  { code: "ISA", collected: false },
  { code: "ORO", collected: true },
  { code: "PAT", collected: false },
  { code: "RGR", collected: false },
]

function NfcGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeLinecap="round">
      <path d="M6.5 8.5a5 5 0 0 1 0 7" strokeWidth={1.7} />
      <path d="M10 6a9 9 0 0 1 0 12" strokeWidth={1.7} />
      <path d="M13.5 3.5a13 13 0 0 1 0 17" strokeWidth={1.7} />
      <rect x="17" y="9.5" width="5" height="5" rx="0.8" strokeWidth={1.4} />
    </svg>
  )
}

/**
 * The passport app, glimpsed. Drives its own small beats from scene time:
 * the level bar fills once and the check-in button sends out a single ring.
 */
export function PassportPhone({ arriveAt, className = "" }: { arriveAt: number; className?: string }) {
  const t = useSceneTime()
  const progress = useTransform(t, [arriveAt + 0.6, arriveAt + 1.6], ["18%", "64%"], {
    clamp: true,
    ease: EASE_OUT,
  })
  const ringScale = useTransform(t, [arriveAt + 1.2, arriveAt + 2.2], [1, 1.45], { clamp: true, ease: EASE_OUT })
  const ringOpacity = useTransform(t, [arriveAt + 1.2, arriveAt + 1.3, arriveAt + 2.2], [0, 0.7, 0], {
    clamp: true,
  })

  return (
    <PhoneFrame className={className}>
      <div className="absolute inset-0 flex flex-col bg-[#0B3A40] px-[1.1cqw] font-sans text-white">
        <div className="flex h-[2.3cqw] shrink-0 items-center justify-between px-[0.6cqw] pt-[0.3cqw] text-[0.62cqw] font-semibold">
          <span>9:41</span>
          <span className="flex items-center gap-[0.25cqw]">
            <span className="h-[0.42cqw] w-[0.9cqw] rounded-[0.12cqw] border border-white/80" />
          </span>
        </div>

        <div className="mt-[0.9cqw] flex items-center justify-between">
          <div>
            <p className="whitespace-nowrap text-[0.5cqw] font-semibold uppercase tracking-[0.12em] text-vt-sun">Pasaporte a la Aventura</p>
            <p className="mt-[0.2cqw] text-[1.15cqw] font-semibold leading-tight tracking-[-0.01em]">Mi pasaporte</p>
          </div>
          <span className="flex h-[1.9cqw] w-[1.9cqw] items-center justify-center rounded-full bg-vt-teal text-[0.7cqw] font-semibold">
            GR
          </span>
        </div>

        <div className="mt-[1cqw] rounded-[0.8cqw] bg-white/[0.07] p-[0.8cqw] ring-1 ring-white/10">
          <span className="inline-flex items-center gap-[0.35cqw] rounded-full bg-vt-sun px-[0.6cqw] py-[0.22cqw] text-[0.6cqw] font-semibold text-vt-ink">
            {FIRST_LEVEL}
            <span aria-hidden>→</span>
            {NEXT_LEVEL}
          </span>
          <div className="mt-[0.6cqw] h-[0.3cqw] overflow-hidden rounded-full bg-white/15">
            <motion.div className="h-full rounded-full bg-vt-sun" style={{ width: progress }} />
          </div>
        </div>

        <div className="relative mx-auto mt-[1.6cqw] flex h-[7cqw] w-[7cqw] items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-full border border-vt-sun"
            style={{ scale: ringScale, opacity: ringOpacity }}
          />
          <span className="absolute inset-[-0.5cqw] rounded-full border border-white/15" />
          <span className="flex h-full w-full flex-col items-center justify-center gap-[0.2cqw] rounded-full bg-vt-sun text-vt-ink shadow-[0_0.8cqw_2cqw_-0.4cqw_rgba(255,231,80,0.45)]">
            <NfcGlyph className="h-[1.8cqw] w-[1.8cqw]" />
            <span className="text-[0.78cqw] font-semibold">Check-in</span>
          </span>
        </div>
        <p className="mt-[0.9cqw] text-center text-[0.52cqw] font-medium uppercase tracking-[0.16em] text-white/60">
          QR · NFC · Ubicación
        </p>

        <p className="mt-[1.3cqw] text-[0.72cqw] font-semibold">Mis sellos</p>
        <div className="mt-[0.5cqw] grid grid-cols-4 gap-[0.5cqw]">
          {STAMPS.map((s) => (
            <span
              key={s.code}
              className={`flex aspect-square items-center justify-center rounded-full text-[0.46cqw] font-bold tracking-[0.06em] ${
                s.collected
                  ? "bg-vt-sun text-vt-ink ring-1 ring-inset ring-vt-ink/30 ring-offset-0"
                  : "border border-dashed border-white/30 text-white/40"
              }`}
            >
              {s.code}
            </span>
          ))}
        </div>
      </div>
    </PhoneFrame>
  )
}
