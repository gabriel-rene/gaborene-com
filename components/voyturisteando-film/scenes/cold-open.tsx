"use client"

import { motion, useTransform } from "framer-motion"
import type { Municipality } from "@/data/puerto-rico-municipalities"
import { MAP_WIDTH } from "@/data/puerto-rico-municipalities"
import { EASE_OUT, useReveal, useSceneTime } from "../film-clock"
import { IslandMap } from "../film-primitives"

const DRAW_FROM = 0.3
const DRAW_TO = 3.4

function Region({ m }: { m: Municipality }) {
  const t = useSceneTime()
  const at = DRAW_FROM + (m.cx / MAP_WIDTH) * (DRAW_TO - DRAW_FROM - 0.6)
  const opacity = useTransform(t, [at, at + 0.6], [0, 1], { clamp: true, ease: EASE_OUT })
  const fillOpacity = useTransform(t, [at + 0.3, at + 1.2, 5.6, 6.6], [0, 0.9, 0.9, 0.35], { clamp: true })
  return (
    <motion.path
      d={m.d}
      className="fill-vt-teal stroke-vt-mist"
      strokeWidth={0.7}
      style={{ opacity, fillOpacity }}
    />
  )
}

export function ColdOpenScene() {
  const t = useSceneTime()
  const mapScale = useTransform(t, [0, 9], [1.04, 0.96])
  const mapY = useTransform(t, [5.2, 6.8], ["0cqw", "-4cqw"], { clamp: true, ease: EASE_OUT })
  const count = useReveal(0.6, 4.9)
  const handful = useReveal(1.8, 5.4)
  const title = useReveal(5.7, undefined, 1)
  const subtitle = useReveal(6.2, undefined, 1)

  return (
    <div className="absolute inset-0 bg-vt-ink">
      <motion.div className="absolute inset-x-[8cqw] top-[12cqw]" style={{ scale: mapScale, y: mapY }}>
        <IslandMap className="w-full" renderMunicipality={(m) => <Region key={m.name} m={m} />} />
      </motion.div>

      <motion.p
        style={count}
        className="absolute left-[4cqw] top-[4.5cqw] font-serif text-[6.5cqw] leading-none tracking-[-0.02em] text-vt-sun"
      >
        78 municipalities.
      </motion.p>
      <motion.p
        style={handful}
        className="absolute bottom-[6cqw] left-[4cqw] max-w-[46cqw] font-serif text-[2.6cqw] leading-[1.15] text-white"
      >
        Locals call them pueblos. Most of us have seen a handful.
      </motion.p>

      <div className="absolute bottom-[6cqw] left-[4cqw] flex flex-col gap-[1cqw]">
        <motion.h2 style={title} className="font-serif text-[6.5cqw] leading-none tracking-[-0.02em] text-white">
          VoyTuristeando<span className="text-vt-sun">.com</span>
        </motion.h2>
        <motion.p style={subtitle} className="font-serif text-[2.2cqw] leading-tight text-vt-mist">
          Building the map before the game.
        </motion.p>
      </div>
    </div>
  )
}
