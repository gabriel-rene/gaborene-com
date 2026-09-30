"use client"

import { useId } from "react"
import { FILM_FACTS } from "@/data/voyturisteando-film"
import { type LucideIcon, Car, Drama, Globe, Heart, Landmark, Leaf, Menu, Mountain, Sun, UtensilsCrossed, Waves } from "lucide-react"

/*
 * Pieces of the recreated voyturisteando.com, as we would design it today.
 * Everything is sized in cqw so it scales with the film frame.
 */

export type PlaceKind = "playa" | "naturaleza" | "historico" | "gastronomia" | "cultura"

export const KIND_LABEL: Record<PlaceKind, string> = {
  playa: "Playa",
  naturaleza: "Naturaleza",
  historico: "Sitios históricos",
  gastronomia: "Gastronomía",
  cultura: "Cultura",
}

const CATEGORY_ICON: Record<string, LucideIcon> = {
  Naturaleza: Leaf,
  Cultura: Drama,
  Gastronomía: UtensilsCrossed,
  "Sitios históricos": Landmark,
  Agua: Waves,
  Adrenalina: Mountain,
}

/** Homepage category chips with their launch-era counts. */
export const HOME_CATEGORIES = FILM_FACTS.directory.categories.map((c) => ({
  ...c,
  icon: CATEGORY_ICON[c.label] ?? Leaf,
}))

export const PUEBLO = {
  name: "Cabo Rojo",
  region: "Región Oeste",
  places: FILM_FACTS.directory.caboRojoPlaces,
  weather: 84,
}

export interface Place {
  name: string
  kind: PlaceKind
  drive: string
  /** Position on the 1000 × 341 municipality map */
  mx: number
  my: number
}

export const CABO_ROJO_PLACES: Place[] = [
  { name: "Playa Buyé", kind: "playa", drive: "2 h 20 min", mx: 47, my: 247 },
  { name: "Faro Los Morrillos", kind: "historico", drive: "2 h 35 min", mx: 47.5, my: 299.5 },
  { name: "Playa Sucia · La Playuela", kind: "playa", drive: "2 h 40 min", mx: 56, my: 301 },
  { name: "Salinas de Cabo Rojo", kind: "naturaleza", drive: "2 h 30 min", mx: 64, my: 290 },
  { name: "Boquerón", kind: "gastronomia", drive: "2 h 20 min", mx: 66, my: 260 },
  { name: "El Combate", kind: "playa", drive: "2 h 30 min", mx: 45, my: 283 },
  { name: "Balneario de Boquerón", kind: "playa", drive: "2 h 20 min", mx: 57, my: 270 },
  { name: "Playa Joyuda", kind: "playa", drive: "2 h 10 min", mx: 54, my: 222 },
  { name: "Playa Puerto Real", kind: "playa", drive: "2 h 15 min", mx: 54, my: 235 },
]

/** Stacked two-line wordmark, heavy geometric caps. */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center font-sans font-black uppercase leading-[0.84] tracking-[-0.02em] text-white ${className}`}>
      <span>Voyturis</span>
      <span>teando</span>
    </div>
  )
}

export function SiteHeader({ active = "Explora" }: { active?: string }) {
  const nav = ["Explora", "Pueblos", "Eventos", "Ofertas", "Pasaporte"]
  return (
    <div className="relative z-20 flex h-[3.6cqw] shrink-0 items-center bg-[#004244] px-[2.2cqw] font-sans">
      <div className="flex w-[18cqw] items-center gap-[1cqw]">
        <span className="flex h-[1.7cqw] w-[1.7cqw] items-center justify-center rounded-full bg-vt-teal text-white">
          <Menu className="h-[0.9cqw] w-[0.9cqw]" strokeWidth={2.4} />
        </span>
        <Wordmark className="text-[0.92cqw]" />
      </div>
      <nav className="flex flex-1 items-center justify-center gap-[1.9cqw] text-[0.78cqw] font-medium text-white/70">
        {nav.map((item) => (
          <span key={item} className={`relative ${item === active ? "text-white" : ""}`}>
            {item}
            {item === active && (
              <span className="absolute -bottom-[0.55cqw] left-0 right-0 h-[0.14cqw] rounded-full bg-vt-sun" />
            )}
          </span>
        ))}
      </nav>
      <div className="flex w-[18cqw] items-center justify-end gap-[0.7cqw] text-[0.72cqw] font-semibold text-white">
        <span className="flex items-center gap-[0.35cqw] rounded-full bg-white/10 px-[0.7cqw] py-[0.3cqw] tabular-nums">
          <Sun className="h-[0.85cqw] w-[0.85cqw] text-vt-sun" strokeWidth={2.4} />
          {PUEBLO.weather}°
        </span>
        <span className="flex items-center gap-[0.3cqw] rounded-full px-[0.5cqw] py-[0.3cqw] text-white/80 ring-1 ring-white/25">
          <Globe className="h-[0.75cqw] w-[0.75cqw]" strokeWidth={2.2} />
          ES<span className="text-white/40">/</span>EN
        </span>
        <span className="rounded-full bg-vt-sun px-[0.85cqw] py-[0.3cqw] text-[#004244]">Entrar</span>
      </div>
    </div>
  )
}

export function CategoryChip({
  icon: Icon,
  label,
  count,
  active = false,
  className = "",
}: {
  icon?: LucideIcon
  label: string
  count?: number
  active?: boolean
  className?: string
}) {
  return (
    <span
      className={`flex h-[1.9cqw] shrink-0 items-center gap-[0.4cqw] whitespace-nowrap rounded-full px-[0.8cqw] font-sans text-[0.74cqw] font-semibold ${
        active ? "bg-vt-sun text-[#004244]" : "bg-white text-[#303030] ring-1 ring-[#E4E9E9]"
      } ${className}`}
    >
      {Icon && <Icon className={`h-[0.85cqw] w-[0.85cqw] ${active ? "text-[#004244]" : "text-vt-teal"}`} strokeWidth={2.2} />}
      {label}
      {count !== undefined && (
        <span className={`tabular-nums ${active ? "text-[#004244]/70" : "text-[#5B6366]"} font-medium`}>{count}</span>
      )}
    </span>
  )
}

/**
 * Stand-in for a place photograph: a small duotone illustration per category,
 * drawn in SVG so it scales cleanly at any size.
 */
export function PlacePhoto({
  kind,
  variant = 0,
  className = "",
}: {
  kind: PlaceKind
  variant?: number
  className?: string
}) {
  const raw = useId()
  const id = raw.replace(/[^a-zA-Z0-9]/g, "")
  return (
    <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" className={`block ${className}`} aria-hidden>
      {kind === "playa" && <Beach id={id} variant={variant % 6} />}
      {kind === "naturaleza" && (
        <>
          <defs>
            <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8FD3C1" />
              <stop offset="1" stopColor="#E6F3E6" />
            </linearGradient>
          </defs>
          <rect width="160" height="100" fill={`url(#${id}s)`} />
          <path d="M0 52 C30 34 52 30 80 44 C104 56 128 34 160 40 V100 H0Z" fill="#2E8C6E" />
          <path d="M0 66 C36 54 70 60 96 56 C124 52 142 60 160 58 V100 H0Z" fill="#12604E" />
          <path d="M0 78 H160 V100 H0Z" fill="#F3C9C2" />
          <path d="M0 84 H160 M0 90 H160 M0 96 H160" stroke="#fff" strokeOpacity="0.55" strokeWidth="0.9" />
          <path d="M42 78 V100 M92 78 V100 M128 78 V100" stroke="#fff" strokeOpacity="0.4" strokeWidth="0.9" />
        </>
      )}
      {kind === "historico" && (
        <>
          <defs>
            <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#E8875A" />
              <stop offset="1" stopColor="#FFE08A" />
            </linearGradient>
          </defs>
          <rect width="160" height="100" fill={`url(#${id}s)`} />
          <path d="M0 74 H160 V100 H0Z" fill="#23A5AC" fillOpacity="0.85" />
          <path d="M60 100 C70 78 86 66 112 64 C130 63 146 68 160 66 V100Z" fill="#B4532F" />
          <g fill="#fff">
            <path d="M108.5 64 L110.5 40 H119.5 L121.5 64Z" fillOpacity="0.92" />
            <rect x="109" y="35" width="12" height="5" fillOpacity="0.92" />
            <path d="M111 35 L115 30.5 L119 35Z" fillOpacity="0.92" />
            <rect x="113.2" y="47" width="3.6" height="4.5" fill="#B4532F" fillOpacity="0.5" />
          </g>
          <path d="M122 36 L150 30 M122 38 L150 44" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.2" />
        </>
      )}
      {kind === "gastronomia" && (
        <>
          <defs>
            <linearGradient id={`${id}s`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F6553A" />
              <stop offset="1" stopColor="#FFB640" />
            </linearGradient>
          </defs>
          <rect width="160" height="100" fill={`url(#${id}s)`} />
          <circle cx="80" cy="62" r="30" fill="#fff" fillOpacity="0.16" />
          <path d="M52 58 H108 C106 74 95 82 80 82 C65 82 54 74 52 58Z" fill="#fff" fillOpacity="0.88" />
          <path d="M70 50 C66 44 74 40 70 32 M80 50 C76 43 84 39 80 30 M90 50 C86 44 94 40 90 32" fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="24" cy="18" r="2" fill="#FFE750" />
          <circle cx="44" cy="12" r="2" fill="#FFE750" />
          <circle cx="116" cy="12" r="2" fill="#FFE750" />
          <circle cx="136" cy="18" r="2" fill="#FFE750" />
          <path d="M14 20 Q34 8 54 12 Q80 18 106 12 Q126 8 146 20" fill="none" stroke="#fff" strokeOpacity="0.35" strokeWidth="0.8" />
        </>
      )}
      {kind === "cultura" && (
        <>
          <defs>
            <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#D9714A" />
              <stop offset="1" stopColor="#FFD970" />
            </linearGradient>
          </defs>
          <rect width="160" height="100" fill={`url(#${id}s)`} />
          <path d="M40 100 V58 A40 40 0 0 1 120 58 V100 H104 V60 A24 24 0 0 0 56 60 V100Z" fill="#fff" fillOpacity="0.22" />
          <path d="M0 88 H160 V100 H0Z" fill="#A4462A" fillOpacity="0.5" />
        </>
      )}
    </svg>
  )
}

const SUNS = [
  { cx: 112, cy: 44, r: 15 },
  { cx: 40, cy: 44, r: 10 },
  { cx: 80, cy: 58, r: 18 },
  { cx: 38, cy: 40, r: 13 },
  { cx: 120, cy: 40, r: 11 },
  { cx: 58, cy: 38, r: 14 },
]

function Palm({ x, flip = false }: { x: number; flip?: boolean }) {
  return (
    <g transform={`translate(${x} 0) scale(${flip ? -1 : 1} 1)`} fill="#fff" fillOpacity="0.3">
      <path d="M0 90 C1 72 3 60 8 48 L10 49 C5.5 61 3.5 72 3 90Z" />
      <path d="M9 48 C0 42 -10 44 -16 50 C-7 46 1 47 8 50Z" />
      <path d="M9 48 C16 40 26 40 32 45 C24 43 16 45 10 50Z" />
      <path d="M9 48 C4 38 -4 34 -10 35 C-2 38 4 42 8 49Z" />
      <path d="M9 48 C14 37 22 33 28 34 C20 38 14 43 10 49Z" />
    </g>
  )
}

/** Six beach compositions so a grid of beaches never repeats itself. */
function Beach({ id, variant }: { id: string; variant: number }) {
  const sunset = variant === 2
  const sun = SUNS[variant]
  const sand =
    variant === 1
      ? "M0 74 C30 90 100 96 160 80 V110 H0Z"
      : `M0 ${86 - variant * 2} C40 ${74 + variant} 90 82 160 ${76 + variant * 2} V110 H0Z`
  const shore = sand.replace(/ V110 H0Z$/, "")
  return (
    <>
      <defs>
        <linearGradient id={`${id}s`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sunset ? "#F29A63" : "#5CC4C4"} />
          <stop offset="0.6" stopColor={sunset ? "#FFE3A0" : "#FFF0A6"} />
        </linearGradient>
        <linearGradient id={`${id}w`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={sunset ? "#1C8E96" : "#23A5AC"} />
          <stop offset="1" stopColor="#0B6E75" />
        </linearGradient>
      </defs>
      <rect width="160" height="100" fill={`url(#${id}s)`} />
      <g transform="translate(0 -8)">
      <circle cx={sun.cx} cy={sun.cy} r={sun.r} fill="#FFE750" />
      {variant === 4 && <path d="M14 57 C20 50 30 48 40 52 C44 54 47 56 50 57Z" fill="#0B6E75" fillOpacity="0.75" />}
      {variant === 1 && (
        <g>
          <path d="M160 42 C150 43 140 50 128 57 L160 57Z" fill="#0E5F63" />
          <path d="M160 49 C152 50 146 53 140 57 L160 57Z" fill="#0A3237" fillOpacity="0.35" />
        </g>
      )}
      <path d="M0 56 H160 V110 H0Z" fill={`url(#${id}w)`} />
      {sunset && (
        <g stroke="#FFE750" strokeLinecap="round">
          <path d="M66 61 H94" strokeWidth="1.6" strokeOpacity="0.8" />
          <path d="M71 65 H89" strokeWidth="1.4" strokeOpacity="0.6" />
          <path d="M75 69 H85" strokeWidth="1.2" strokeOpacity="0.45" />
        </g>
      )}
      <path d="M0 64 Q20 61 40 64 T80 64 T120 64 T160 64" fill="none" stroke="#fff" strokeOpacity={sunset ? 0.18 : 0.35} strokeWidth="1.4" />
      <path d="M20 71 Q35 68.5 50 71 T80 71 T110 71 T140 71" fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="1.2" />
      {variant === 5 && (
        <g fill="#fff">
          <path d="M92 64 H110 L107 67.5 H95Z" fillOpacity="0.9" />
          <path d="M100 63 V48 L108 62Z" fillOpacity="0.7" />
          <path d="M122 67 H134 L132 69.5 H124Z" fillOpacity="0.75" />
          <path d="M127 66 V56 L132.5 65.5Z" fillOpacity="0.55" />
        </g>
      )}
      <path d={sand} fill="#F6E4AE" />
      <path d={shore} fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.2" />
      {variant === 3 && (
        <g>
          <path d="M52 81 L60 75 L68 81Z" fill="#FFE750" />
          <path d="M60 81 V89" stroke="#0B6E75" strokeOpacity="0.5" strokeWidth="0.8" />
          <path d="M80 84 L87 79 L94 84Z" fill="#fff" fillOpacity="0.9" />
          <path d="M87 84 V91" stroke="#0B6E75" strokeOpacity="0.5" strokeWidth="0.8" />
        </g>
      )}
      {variant === 0 && <Palm x={24} />}
      {variant === 3 && <Palm x={136} flip />}
      {variant === 4 && <Palm x={140} flip />}
      </g>
    </>
  )
}

export function SaveButton({ className = "", filled = false }: { className?: string; filled?: boolean }) {
  return (
    <span className={`flex items-center justify-center rounded-full bg-white/90 text-[#004244] shadow-[0_0.1cqw_0.4cqw_rgba(0,0,0,0.12)] ${className}`}>
      <Heart className="h-[55%] w-[55%]" strokeWidth={2.2} fill={filled ? "#F92A15" : "none"} stroke={filled ? "#F92A15" : "currentColor"} />
    </span>
  )
}

/** Directory card: photo, category, name, drive time. */
export function PlaceCard({ place, variant = 0 }: { place: Place; variant?: number }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[0.6cqw] bg-white shadow-[0_0.15cqw_0.6cqw_rgba(0,66,68,0.08)] ring-1 ring-[#E4E9E9]">
      <div className="relative min-h-0 flex-1">
        <PlacePhoto kind={place.kind} variant={variant} className="absolute inset-0 h-full w-full" />
        <SaveButton className="absolute right-[0.5cqw] top-[0.5cqw] h-[1.35cqw] w-[1.35cqw]" />
      </div>
      <div className="flex flex-col gap-[0.22cqw] px-[0.75cqw] pb-[0.65cqw] pt-[0.55cqw] font-sans">
        <span className="text-[0.56cqw] font-bold uppercase tracking-[0.12em] text-vt-teal">{KIND_LABEL[place.kind]}</span>
        <span className="truncate text-[0.88cqw] font-bold leading-tight tracking-[-0.01em] text-[#303030]">{place.name}</span>
        <span className="flex items-center gap-[0.3cqw] text-[0.64cqw] text-[#5B6366]">
          <Car className="h-[0.75cqw] w-[0.75cqw]" strokeWidth={2} />
          {place.drive} desde San Juan
        </span>
      </div>
    </div>
  )
}

