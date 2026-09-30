"use client"

import { type ComponentType, useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react"
import {
  type AnimationPlaybackControls,
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion"
import { Maximize, Minimize, Pause, Play, RotateCcw } from "lucide-react"
import { FILM_DURATION, FILM_SCENES, type FilmScene, sceneAt } from "@/data/voyturisteando-film"
import { EASE_IN_OUT, FilmTimeProvider, SceneStartProvider, useFilmTime } from "./film-clock"
import { FilmChrome } from "./film-chrome"
import { ColdOpenScene } from "./scenes/cold-open"
import { LegacyScene } from "./scenes/legacy"
import { ResearchScene } from "./scenes/research"
import { MigrationScene } from "./scenes/migration"
import { DirectoryScene } from "./scenes/directory"
import { LaunchScene } from "./scenes/launch"
import { DashboardScene } from "./scenes/dashboard"
import { ResultsScene } from "./scenes/results"
import { NextScene } from "./scenes/next"

const SCENE_COMPONENTS: Record<FilmScene["id"], ComponentType> = {
  "cold-open": ColdOpenScene,
  legacy: LegacyScene,
  research: ResearchScene,
  migration: MigrationScene,
  directory: DirectoryScene,
  launch: LaunchScene,
  dashboard: DashboardScene,
  results: ResultsScene,
  next: NextScene,
}

const FADE = 0.6
/** Frame shown before playback when autoplay is off (reduced motion). */
const POSTER_TIME = 7.4

declare global {
  interface Window {
    __film?: { duration: number; seek: (seconds: number) => Promise<void> }
  }
}

function mountedScenesAt(t: number): FilmScene["id"][] {
  return FILM_SCENES.filter((s) => t >= s.start - 0.05 && t <= s.start + s.duration + 0.05).map(
    (s) => s.id
  )
}

function SceneLayer({ scene }: { scene: FilmScene }) {
  const Component = SCENE_COMPONENTS[scene.id]
  return (
    <SceneStartProvider value={scene.start}>
      <SceneFade scene={scene}>
        <Component />
      </SceneFade>
    </SceneStartProvider>
  )
}

/*
 * Scene entrances: "dip" (default) fades the outgoing scene to the frame
 * background, then fades the next one in, so two busy scenes never overlap;
 * "wipe" reveals the next scene left to right over the outgoing one, used
 * where the background colour changes.
 */
function SceneFade({ scene, children }: { scene: FilmScene; children: React.ReactNode }) {
  const end = scene.start + scene.duration
  const isFirst = scene.start === 0
  const isLast = end >= FILM_DURATION
  const index = FILM_SCENES.indexOf(scene)
  const nextWipes = FILM_SCENES[index + 1]?.enter === "wipe"
  const wipes = scene.enter === "wipe"
  const time = useFilmTime()
  const half = FADE / 2
  const opacity = useTransform(
    time,
    [scene.start + half, scene.start + FADE, end - FADE, end - half],
    [isFirst || wipes ? 1 : 0, 1, 1, isLast || nextWipes ? 1 : 0],
    { clamp: true }
  )
  const wipe = useTransform(time, [scene.start, scene.start + FADE], [0, 100], {
    clamp: true,
    ease: EASE_IN_OUT,
  })
  const clipPath = useTransform(wipe, (w) => (wipes ? `inset(0 ${100 - w}% 0 0)` : "none"))
  const edgeLeft = useTransform(wipe, (w) => `${w}%`)
  const edgeOpacity = useTransform(wipe, (w) => (wipes && w > 0 && w < 100 ? 1 : 0))
  return (
    <>
      <motion.div className="absolute inset-0 isolate" style={{ opacity, clipPath }}>
        {children}
      </motion.div>
      {wipes && (
        <motion.div
          className={`absolute inset-y-0 z-[5] w-[0.35cqw] -translate-x-full ${
            scene.wipeEdge === "ink" ? "bg-vt-ink" : "bg-vt-sun"
          }`}
          style={{ left: edgeLeft, opacity: edgeOpacity }}
        />
      )}
    </>
  )
}

const subscribeToNothing = () => () => {}
const isRecordMode = () => new URLSearchParams(window.location.search).has("record")

function formatTime(seconds: number) {
  const s = Math.max(0, Math.floor(seconds))
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`
}

export function FilmPlayer() {
  const time = useMotionValue(0)
  const controls = useRef<AnimationPlaybackControls | null>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)
  const [fullscreen, setFullscreen] = useState(false)
  const reduceMotion = useReducedMotion()
  const [playing, setPlaying] = useState(false)
  const recording = useSyncExternalStore(subscribeToNothing, isRecordMode, () => false)
  const [mounted, setMounted] = useState<FilmScene["id"][]>(() => mountedScenesAt(0))
  const [activeId, setActiveId] = useState<FilmScene["id"]>(FILM_SCENES[0].id)
  const [clock, setClock] = useState("0:00")
  const userPaused = useRef(false)

  useMotionValueEvent(time, "change", (t) => {
    const next = mountedScenesAt(t)
    if (next.join() !== mounted.join()) setMounted(next)
    const active = sceneAt(t).id
    if (active !== activeId) setActiveId(active)
    const label = formatTime(t)
    if (label !== clock) setClock(label)
  })

  const stop = useCallback(() => {
    controls.current?.stop()
    controls.current = null
    setPlaying(false)
  }, [])

  const play = useCallback(() => {
    controls.current?.stop()
    if (time.get() >= FILM_DURATION - 0.05) time.set(0)
    const remaining = FILM_DURATION - time.get()
    setPlaying(true)
    controls.current = animate(time, FILM_DURATION, {
      duration: remaining,
      ease: "linear",
      onComplete: () => setPlaying(false),
    })
  }, [time])

  const seek = useCallback(
    (seconds: number) => {
      const wasPlaying = controls.current !== null
      controls.current?.stop()
      controls.current = null
      time.set(Math.min(Math.max(seconds, 0), FILM_DURATION))
      if (wasPlaying) play()
    },
    [play, time]
  )

  useEffect(() => {
    if (recording) {
      window.__film = {
        duration: FILM_DURATION,
        seek: (seconds) =>
          new Promise((resolve) => {
            time.set(seconds)
            requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
          }),
      }
    }
  }, [recording, time])

  useEffect(() => {
    const frame = frameRef.current
    if (recording || reduceMotion || !frame) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        const canPlay = !userPaused.current && time.get() < FILM_DURATION - 0.05
        if (entry.isIntersecting && canPlay && controls.current === null) play()
        else if (!entry.isIntersecting && controls.current) stop()
      },
      { threshold: 0.3 }
    )
    observer.observe(frame)
    return () => observer.disconnect()
  }, [play, stop, recording, reduceMotion, time])

  useEffect(() => () => controls.current?.stop(), [])

  useEffect(() => {
    if (reduceMotion) time.set(POSTER_TIME)
  }, [reduceMotion, time])

  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement === shellRef.current)
    document.addEventListener("fullscreenchange", onChange)
    return () => document.removeEventListener("fullscreenchange", onChange)
  }, [])

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    else shellRef.current?.requestFullscreen()
  }

  const toggle = () => {
    if (playing) {
      userPaused.current = true
      stop()
    } else {
      userPaused.current = false
      play()
    }
  }

  const progress = useTransform(time, [0, FILM_DURATION], ["0%", "100%"])
  const ended = !playing && clock === formatTime(FILM_DURATION)

  return (
    <FilmTimeProvider value={time}>
      <div className={recording ? "fixed inset-0 z-[100] bg-black" : "flex flex-col gap-3"}>
        <div
          ref={shellRef}
          className={
            recording
              ? "h-full"
              : "[&:fullscreen]:flex [&:fullscreen]:items-center [&:fullscreen]:justify-center [&:fullscreen]:bg-black"
          }
        >
          <div
            ref={frameRef}
            className={`@container relative w-full overflow-hidden bg-vt-ink select-none ${
              recording ? "h-full" : "aspect-video [:fullscreen_&]:w-[min(100vw,177.78vh)]"
            }`}
            aria-label="VoyTuristeando.com case study film"
            role="region"
          >
            {FILM_SCENES.filter((s) => mounted.includes(s.id)).map((scene) => (
              <SceneLayer key={scene.id} scene={scene} />
            ))}
            <FilmChrome />
            {!recording && (
              <button
                type="button"
                onClick={toggle}
                className="absolute inset-0 z-20 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-vt-sun"
                aria-label={playing ? "Pause film" : "Play film"}
              >
                {!playing && !ended && (
                  <span className="absolute left-1/2 top-1/2 flex h-[8cqw] w-[8cqw] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-vt-sun text-vt-ink shadow-[0_0.6cqw_2cqw_rgba(0,0,0,0.35)]">
                    <Play className="ml-[0.4cqw] h-[3.2cqw] w-[3.2cqw] fill-current" />
                  </span>
                )}
                {ended && (
                  <span className="absolute bottom-[4cqw] right-[4cqw] flex items-center gap-[0.8cqw] rounded-full bg-white/10 px-[1.6cqw] py-[0.9cqw] font-sans text-[1cqw] font-semibold uppercase tracking-[0.14em] text-white ring-1 ring-white/25">
                    <RotateCcw className="h-[1.2cqw] w-[1.2cqw]" />
                    Replay
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        {!recording && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={toggle}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-stone-300 text-stone-900 transition-colors hover:bg-stone-200 dark:border-stone-700 dark:text-stone-100 dark:hover:bg-stone-800"
                aria-label={playing ? "Pause film" : "Play film"}
              >
                {playing ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
              </button>
              <div
                className="relative h-1 flex-1 cursor-pointer rounded-full bg-stone-300 dark:bg-stone-700"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  seek(((e.clientX - rect.left) / rect.width) * FILM_DURATION)
                }}
                role="presentation"
              >
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-stone-900 dark:bg-stone-100"
                  style={{ width: progress }}
                />
              </div>
              <span className="w-20 shrink-0 text-right text-xs tabular-nums text-stone-600 dark:text-stone-400">
                {clock} / {formatTime(FILM_DURATION)}
              </span>
              <button
                type="button"
                onClick={toggleFullscreen}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-stone-600 transition-colors hover:bg-stone-200 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100"
                aria-label={fullscreen ? "Exit full screen" : "Full screen"}
              >
                {fullscreen ? <Minimize size={15} /> : <Maximize size={15} />}
              </button>
            </div>
            <nav aria-label="Film chapters" className="flex flex-wrap gap-x-4 gap-y-1">
              {FILM_SCENES.map((scene) => (
                <button
                  key={scene.id}
                  type="button"
                  onClick={() => {
                    userPaused.current = false
                    seek(scene.start + 0.01)
                    if (controls.current === null) play()
                  }}
                  aria-current={activeId === scene.id ? "true" : undefined}
                  className={`text-xs uppercase tracking-widest transition-colors ${
                    activeId === scene.id
                      ? "text-stone-900 dark:text-stone-100"
                      : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
                  }`}
                >
                  {scene.chapter}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </FilmTimeProvider>
  )
}
