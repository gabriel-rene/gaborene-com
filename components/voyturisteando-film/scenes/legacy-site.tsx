import type { ReactNode } from "react"
import { FILM_FACTS } from "@/data/voyturisteando-film"

/*
 * The voyturisteando.com homepage as it stood in 2022 (WordPress + Divi),
 * rebuilt from archived markup and CSS. Everything is laid out in page
 * coordinates (cqw) so the scene can pin audit notes to exact spots.
 */

export const PAGE_WIDTH = 61
export const PAGE_HEIGHT = 72
/*
 * Section tops, page cqw: fixed header 0–5, hero 5, directory 20, cards 34,
 * offers 46, about 57, footer 64.
 */

const { legacy, municipalities } = FILM_FACTS

const LOGO_PATHS: [string, string][] = [
  ["M13.689.5h1.985L8.624,17H6.982L0,.5H2.053L7.871,14.666Z", "translate(0 -0.156)"],
  ["M41.154,11.791a7.81,7.81,0,0,1-1.711,2.682,9.292,9.292,0,0,1-2.669,1.857,8.019,8.019,0,0,1-3.422.688,8.019,8.019,0,0,1-3.422-.688,8.126,8.126,0,0,1-2.6-1.857,7.811,7.811,0,0,1-1.711-2.682,8.787,8.787,0,0,1,0-6.464,7.811,7.811,0,0,1,1.711-2.682A9.292,9.292,0,0,1,30,.788,8.019,8.019,0,0,1,33.419.1a8.019,8.019,0,0,1,3.422.688,8.126,8.126,0,0,1,2.6,1.857,7.81,7.81,0,0,1,1.711,2.682,8.747,8.747,0,0,1,.616,3.232A8.488,8.488,0,0,1,41.154,11.791Zm-1.78-5.845a6.323,6.323,0,0,0-1.369-2.132,5.562,5.562,0,0,0-2.053-1.444,6.281,6.281,0,0,0-2.6-.55,6.526,6.526,0,0,0-2.6.55,5.916,5.916,0,0,0-1.985,1.444,6.156,6.156,0,0,0-1.3,2.132,8.042,8.042,0,0,0-.411,2.613,7.155,7.155,0,0,0,.479,2.682A6.323,6.323,0,0,0,28.9,13.372a5.562,5.562,0,0,0,2.053,1.444,6.281,6.281,0,0,0,2.6.55,6.526,6.526,0,0,0,2.6-.55,5.916,5.916,0,0,0,1.985-1.444,6.156,6.156,0,0,0,1.3-2.132,6.807,6.807,0,0,0,.479-2.613A7.221,7.221,0,0,0,39.374,5.945Z", "translate(-7.888 -0.031)"],
  ["M59.324,16.936H57.476V10.472L50.7.5h2.259l5.476,8.184L63.979.5H66.1l-6.776,9.9v6.533Z", "translate(-15.997 -0.156)"],
  ["M79.391,5.176H74.6V.5H89.658V5.108H84.867v11.76H79.391Z", "translate(-23.538 -0.156)"],
  ["M98.2,9.578V.5h5.544V9.509c0,2.063,1.027,2.888,2.533,2.888,1.437,0,2.533-.825,2.533-2.82V.5h5.544V9.44c0,5.57-3.217,7.771-8.145,7.771C101.349,17.211,98.2,15.01,98.2,9.578Z", "translate(-30.985 -0.156)"],
  ["M124.3.5h8.008c2.875,0,4.723.756,5.886,1.857a5.241,5.241,0,0,1,1.506,3.92v.069a5.294,5.294,0,0,1-3.217,5.02l3.833,5.57h-6.229l-3.08-4.676h-1.164v4.676h-5.476V.5Zm7.871,7.84c1.3,0,2.122-.619,2.122-1.582V6.689c0-1.032-.821-1.582-2.053-1.582h-2.4V8.34Z", "translate(-39.22 -0.156)"],
  ["M148.8.5h5.476V16.936H148.8Z", "translate(-46.95 -0.156)"],
  ["M157.6,14.335l2.943-3.507a9.285,9.285,0,0,0,5.681,1.926c.958,0,1.369-.275,1.369-.688V12c0-.481-.479-.756-2.259-1.1-3.7-.756-6.913-1.788-6.913-5.3h0c0-3.095,2.4-5.5,6.913-5.5a11.312,11.312,0,0,1,7.392,2.269l-2.669,3.714a8.64,8.64,0,0,0-4.928-1.65c-.821,0-1.164.275-1.164.688v.069c0,.413.411.756,2.19,1.032,4.175.756,6.982,1.994,6.982,5.3v.069c0,3.438-2.806,5.57-7.187,5.57A13.146,13.146,0,0,1,157.6,14.335Z", "translate(-49.727 -0.031)"],
  ["M185.191,5.176H180.4V.5h15.058V5.108h-4.791v11.76h-5.476Z", "translate(-56.921 -0.156)"],
  ["M204.2.5h13.895V4.97h-8.556V6.62h8.008v3.989h-8.008V12.4h8.693v4.47H204.2Z", "translate(-64.43 -0.156)"],
  ["M232.045.3h5.407l6.913,16.5H238.41l-.89-2.2h-5.681l-.821,2.2H225.2Zm4.175,10.453-1.506-3.989-1.506,3.989Z", "translate(-71.056 -0.094)"],
  ["M254.2.5h5.134l5.818,7.221V.5h5.407V16.936H265.7l-6.092-7.565v7.565H254.2V.5Z", "translate(-80.207 -0.156)"],
  ["M280.768.5H287c6.5,0,9.72,3.232,9.72,8.046v.069c0,4.883-3.285,8.321-9.925,8.321H280.7V.5Zm6.366,11.622c2.464,0,4.107-1.032,4.107-3.37V8.684c0-2.338-1.643-3.37-4.107-3.37h-.89v6.877h.89Z", "translate(-88.568 -0.156)"],
  ["M305.8,8.6h0a8.94,8.94,0,0,1,17.865-.069V8.6a8.942,8.942,0,0,1-17.865,0Zm12.321,0h0A3.525,3.525,0,0,0,314.7,4.814a3.433,3.433,0,0,0-3.354,3.645v.069a3.4,3.4,0,1,0,6.776.069Z", "translate(-96.488)"],
  ["M335.2,23.276V20.8h2.122v2.476Z", "translate(-105.764 -6.496)"],
  ["M355.284,15.367a10.887,10.887,0,0,1-1.506.894,12.563,12.563,0,0,1-1.711.619,9.441,9.441,0,0,1-2.053.206,7.616,7.616,0,0,1-3.285-.688,7.655,7.655,0,0,1-2.6-1.788,7.81,7.81,0,0,1-1.711-2.682,8.841,8.841,0,0,1-.616-3.3,8.841,8.841,0,0,1,.616-3.3,7.81,7.81,0,0,1,1.711-2.682,8.959,8.959,0,0,1,2.6-1.857A8.776,8.776,0,0,1,350.014.1,8.388,8.388,0,0,1,352,.306a5.778,5.778,0,0,1,1.643.55,7.692,7.692,0,0,1,1.437.825c.411.344.821.688,1.232,1.1l-1.232,1.375a10.593,10.593,0,0,0-2.259-1.65,6.326,6.326,0,0,0-2.875-.619,7.88,7.88,0,0,0-2.533.481,5.916,5.916,0,0,0-1.985,1.444,6.156,6.156,0,0,0-1.3,2.132,6.917,6.917,0,0,0-.479,2.682,6.917,6.917,0,0,0,.479,2.682,6.576,6.576,0,0,0,1.3,2.132,6.123,6.123,0,0,0,4.518,1.994,6.326,6.326,0,0,0,2.875-.619,10.4,10.4,0,0,0,2.4-1.719l1.232,1.169A6.057,6.057,0,0,1,355.284,15.367Z", "translate(-107.847 -0.031)"],
  ["M382.454,11.791a7.81,7.81,0,0,1-1.711,2.682,9.292,9.292,0,0,1-2.669,1.857,8.86,8.86,0,0,1-6.845,0,8.126,8.126,0,0,1-2.6-1.857,7.81,7.81,0,0,1-1.711-2.682,8.787,8.787,0,0,1,0-6.464,7.81,7.81,0,0,1,1.711-2.682A9.292,9.292,0,0,1,371.3.788a8.86,8.86,0,0,1,6.845,0,8.126,8.126,0,0,1,2.6,1.857,7.81,7.81,0,0,1,1.711,2.682,8.746,8.746,0,0,1,.616,3.232A12.3,12.3,0,0,1,382.454,11.791Zm-1.848-5.845a6.322,6.322,0,0,0-1.369-2.132,6.186,6.186,0,0,0-2.053-1.444,6.281,6.281,0,0,0-2.6-.55,6.526,6.526,0,0,0-2.6.55A5.916,5.916,0,0,0,370,3.814a6.156,6.156,0,0,0-1.3,2.132,8.4,8.4,0,0,0-.479,2.613,7.4,7.4,0,0,0,.479,2.682,6.322,6.322,0,0,0,1.369,2.132,5.562,5.562,0,0,0,2.053,1.444,6.281,6.281,0,0,0,2.6.55,6.526,6.526,0,0,0,2.6-.55,5.916,5.916,0,0,0,1.985-1.444,6.156,6.156,0,0,0,1.3-2.132,8.4,8.4,0,0,0,.479-2.613A7.155,7.155,0,0,0,380.605,5.945Z", "translate(-115.577 -0.031)"],
  ["M404.3,12.4h-.068L398.28,3.663V16.936H396.5V.5h1.848L404.3,9.44,410.258.5h1.848V16.936h-1.848V3.595Z", "translate(-125.106 -0.156)"],
]

function OldLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 287 17.124" className={className} role="img" aria-label="Voy Turisteando">
      {LOGO_PATHS.map(([d, transform]) => (
        <path key={d.slice(0, 24)} d={d} transform={transform || undefined} className="fill-vt-teal" />
      ))}
    </svg>
  )
}

const NAV = ["Home", "Directorio", "Regiones", "Eventos", "Ofertas", "Blog"]

/** Fixed Divi header: info bar + logo + nav. Drawn over the scrolling page. */
export function LegacyHeader() {
  return (
    <div className="absolute inset-x-0 top-0 z-20 font-sans">
      <div className="flex h-[1.3cqw] items-center justify-between bg-vt-deep px-[2.5cqw] text-[0.5cqw] text-white/85">
        <span>Edificio La Princesa, Paseo de La Princesa, Viejo San Juan · 1-800-866-7827</span>
        <span className="flex gap-[0.35cqw]">
          {["f", "ig", "tw", "yt"].map((s) => (
            <span
              key={s}
              className="flex h-[0.85cqw] w-[0.85cqw] items-center justify-center rounded-full bg-white/20 text-[0.4cqw] font-bold"
            >
              {s}
            </span>
          ))}
        </span>
      </div>
      <div className="flex h-[3.7cqw] items-center justify-between bg-white px-[2.5cqw] shadow-[0_0.2cqw_0.6cqw_rgba(0,0,0,0.12)]">
        <OldLogo className="w-[14cqw]" />
        <nav className="flex gap-[1.25cqw] text-[0.62cqw] font-semibold uppercase tracking-[0.06em] text-vt-slate">
          {NAV.map((item, i) => (
            <span key={item} className={i === 0 ? "text-vt-teal" : ""}>
              {item}
            </span>
          ))}
        </nav>
      </div>
    </div>
  )
}

/** Warm duotone stand-in for the autoplay hero video. */
function HeroStill() {
  return (
    <svg viewBox="0 0 610 150" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
      <defs>
        <linearGradient id="legacy-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F2994A" />
          <stop offset="0.55" stopColor="#F7C46C" />
          <stop offset="1" stopColor="#FFE9A8" />
        </linearGradient>
        <linearGradient id="legacy-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#23A5AC" />
          <stop offset="1" stopColor="#0A3237" />
        </linearGradient>
      </defs>
      <rect width="610" height="150" fill="url(#legacy-sky)" />
      <circle cx="400" cy="92" r="30" fill="#FFF3C4" opacity="0.9" />
      <path d="M0 96 L90 88 L150 92 L230 84 L300 95 L610 96 L610 150 L0 150Z" fill="#106B73" opacity="0.55" />
      <rect y="98" width="610" height="52" fill="url(#legacy-sea)" />
      <path d="M300 104 H500 M330 112 H470 M360 120 H440" stroke="#FFE9A8" strokeWidth="1.4" opacity="0.5" />
      <g fill="#0A3237" opacity="0.88">
        <path d="M58 150 C62 120 66 90 76 58 L79 59 C71 92 68 122 66 150Z" />
        <path d="M77 58 C60 50 40 52 26 62 C44 56 60 57 76 61Z M78 57 C84 40 100 32 118 34 C102 40 90 48 80 60Z M77 59 C96 50 116 54 128 66 C112 60 96 58 79 61Z M76 60 C66 70 58 84 56 98 C64 84 70 72 78 62Z M78 58 C70 42 56 34 40 36 C56 42 68 50 76 60Z" />
        <path d="M548 150 C546 128 540 104 528 80 L531 79 C543 102 551 126 554 150Z" />
        <path d="M529 80 C514 70 494 70 480 78 C496 74 512 76 528 83Z M530 79 C534 62 548 54 566 54 C550 60 540 68 532 82Z M530 81 C548 72 568 76 578 88 C562 82 546 80 532 83Z M529 81 C522 92 518 106 518 118 C524 104 528 94 532 84Z" />
      </g>
    </svg>
  )
}

function Hero() {
  return (
    <section className="absolute inset-0 overflow-hidden">
      <HeroStill />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,50,55,0.15),rgba(10,50,55,0.05)_50%,rgba(10,50,55,0.45))]" />
      <div className="absolute inset-x-0 top-[3.6cqw] flex flex-col items-center text-center font-black uppercase leading-[0.95] tracking-[-0.01em] text-white drop-shadow-[0_0.15cqw_0.3cqw_rgba(0,0,0,0.35)]">
        <span className="text-[2.35cqw]">La aventura te espera</span>
        <span className="text-[2.35cqw]">
          cerca de ti. <span className="text-vt-sun">¡Explora!</span>
        </span>
        <span className="mt-[0.9cqw] rounded-[0.2cqw] bg-vt-sun px-[1.1cqw] py-[0.4cqw] text-[0.6cqw] font-extrabold tracking-[0.08em] text-vt-ink drop-shadow-none">
          Descubre más
        </span>
      </div>
      <div className="absolute inset-x-[2.5cqw] bottom-[0.8cqw] flex items-center gap-[0.6cqw] text-[0.45cqw] text-white/85">
        <svg viewBox="0 0 10 10" className="h-[0.6cqw] w-[0.6cqw] fill-white">
          <path d="M1 0 L10 5 L1 10Z" />
        </svg>
        <span className="tabular-nums">0:07 / 0:30</span>
        <span className="relative h-[0.12cqw] flex-1 bg-white/30">
          <span className="absolute inset-y-0 left-0 w-[23%] bg-white" />
        </span>
        <span className="font-mono">quiero_volver_home.mp4</span>
      </div>
    </section>
  )
}

const FILTER_CHIPS = [
  "Playas",
  "playa",
  "Beaches",
  "Hoteles",
  "Hoteles verdes",
  "Paradores",
  "Posadas",
  "Naturaleza",
  "Ecoturismo",
  "Agroturismo",
  "Náutico",
  "Deportes acuáticos",
]
const MUNICIPALITY_CHIPS = [
  "Aguadilla",
  "Cayey",
  "cayey-2",
  "Maricao",
  "maricao-2",
  "Porta del Sol",
  "Oeste",
  "Ponce",
  "Isabela",
  "Rincón",
]

function Chips({ items, more }: { items: string[]; more: number }) {
  return (
    <div className="flex flex-wrap gap-[0.3cqw]">
      {items.map((c) => (
        <span
          key={c}
          className="rounded-full border border-[#D6D6D6] bg-white px-[0.5cqw] py-[0.12cqw] text-[0.5cqw] text-vt-slate"
        >
          {c}
        </span>
      ))}
      <span className="rounded-full bg-[#EDEDED] px-[0.5cqw] py-[0.12cqw] text-[0.5cqw] font-semibold text-vt-slate">
        +{more}
      </span>
    </div>
  )
}

function Directory({ searchPanel }: { searchPanel: ReactNode }) {
  return (
    <section className="absolute inset-x-0 top-[20cqw] h-[14cqw] bg-white">
      <p className="absolute left-[2.5cqw] top-[1cqw] text-[1cqw] font-extrabold text-vt-teal">
        ¡Bienvenido al directorio de Voy Turisteando!
      </p>
      <p className="absolute left-[2.5cqw] top-[2.45cqw] w-[54cqw] text-[0.56cqw] leading-[1.45] text-vt-slate">
        Usa el buscador para descubrir la variedad de hospederías, atracciones, gastronomía, y experiencias que
        tienes pa’ disfrutar en los {municipalities} destinos de tu Isla.
      </p>
      <div className="absolute left-[2.5cqw] top-[4.4cqw] h-[9cqw] w-[24.5cqw]">{searchPanel}</div>
      <div className="absolute left-[29.5cqw] top-[4.4cqw] w-[29cqw]">
        <p className="mb-[0.35cqw] text-[0.5cqw] font-bold uppercase tracking-[0.1em] text-vt-slate">Categorías</p>
        <Chips items={FILTER_CHIPS} more={legacy.filterTags - FILTER_CHIPS.length} />
      </div>
      <div className="absolute left-[29.5cqw] top-[8.4cqw] w-[29cqw]">
        <p className="mb-[0.35cqw] text-[0.5cqw] font-bold uppercase tracking-[0.1em] text-vt-slate">Municipios</p>
        <Chips items={MUNICIPALITY_CHIPS} more={legacy.municipalityTags - MUNICIPALITY_CHIPS.length} />
      </div>
    </section>
  )
}

const CARDS = [
  {
    title: "Hospederías",
    text: "Encuentra los mejores lugares donde te puedas quedar, hospedar, vacacionar y explorar tu Isla.",
    tone: "sun",
  },
  {
    title: "Atracciones",
    text: `${legacy.homepageClaim} para que explores y aventurees alrededor de tu Isla.`,
    tone: "teal",
  },
  {
    title: "Excursiones",
    text: "Desde recorridos aéreos sobre las montañas, hasta experiencias únicas por las bahías bioluminiscentes.",
    tone: "sun",
  },
  {
    title: "Ofertas",
    text: "Descubre las mejores ofertas para reservaciones en hoteles y paradores alrededor de toda la Isla.",
    tone: "teal",
  },
] as const

function Cards() {
  return (
    <section className="absolute inset-x-0 top-[34cqw] h-[12cqw] bg-[#F8F8F8]">
      <p className="absolute left-[2.5cqw] top-[1cqw] text-[1.25cqw] font-black uppercase leading-none tracking-[-0.01em] text-vt-teal">
        Una Isla, {municipalities} destinos.
      </p>
      <p className="absolute left-[2.5cqw] top-[2.55cqw] text-[0.56cqw] text-vt-slate">
        Turistea seguro por {municipalities} destinos llenos de experiencias, gastronomía y lugares únicos en el mundo.
      </p>
      <div className="absolute inset-x-[2.5cqw] top-[4cqw] grid h-[7cqw] grid-cols-4 gap-[0.8cqw]">
        {CARDS.map((card) => (
          <div
            key={card.title}
            className={`flex flex-col rounded-[0.25cqw] p-[0.8cqw] ${
              card.tone === "sun" ? "bg-vt-sun text-vt-ink" : "bg-vt-teal text-white"
            }`}
          >
            <p className="text-[0.78cqw] font-black uppercase tracking-[0.02em]">{card.title}</p>
            <p className="mt-[0.35cqw] text-[0.5cqw] leading-[1.4] opacity-90">{card.text}</p>
            <span
              className={`mt-auto self-start rounded-[0.15cqw] border px-[0.5cqw] py-[0.15cqw] text-[0.42cqw] font-bold uppercase tracking-[0.08em] ${
                card.tone === "sun" ? "border-vt-ink/60" : "border-white/70"
              }`}
            >
              Descubre más
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

const OFFERS = [
  { name: "Parador El Faro, Aguadilla", price: "$119", tone: "from-[#F2994A] to-[#106B73]" },
  { name: "Holiday Inn Mayagüez", price: "$125", tone: "from-[#23A5AC] to-[#0A3237]" },
  { name: "Parador Villas del Mar Hau, Isabela", price: "$299", tone: "from-[#F7C46C] to-[#23A5AC]" },
  { name: "Verdanza Hotel, Carolina", price: "$349", tone: "from-[#106B73] to-[#F2994A]" },
]

function Offers() {
  return (
    <section className="absolute inset-x-0 top-[46cqw] h-[11cqw] bg-white">
      <p className="absolute left-[2.5cqw] top-[1cqw] text-[1.05cqw] font-black text-vt-teal">
        ¡Tenemos las mejores ofertas!
      </p>
      <p className="absolute left-[2.5cqw] top-[2.4cqw] text-[0.56cqw] text-vt-slate">
        A continuación descubrirás los lugares más trending para visitar y aventurar en tus vacaciones.
      </p>
      <div className="absolute inset-x-[2.5cqw] top-[3.7cqw] grid grid-cols-4 gap-[0.8cqw]">
        {OFFERS.map((o) => (
          <div key={o.name} className="overflow-hidden rounded-[0.25cqw] border border-[#E6E6E6] bg-white">
            <div className={`relative h-[4cqw] bg-gradient-to-br ${o.tone}`}>
              <span className="absolute right-[0.4cqw] top-[0.4cqw] rounded-[0.15cqw] bg-vt-sun px-[0.4cqw] py-[0.1cqw] text-[0.6cqw] font-black text-vt-ink">
                {o.price}
              </span>
              <span className="absolute bottom-[0.3cqw] left-[0.4cqw] text-[0.4cqw] font-bold uppercase tracking-[0.1em] text-white/90">
                Oferta 2022
              </span>
            </div>
            <p className="truncate px-[0.5cqw] py-[0.45cqw] text-[0.52cqw] font-bold text-vt-slate">{o.name}</p>
          </div>
        ))}
      </div>
      <span className="absolute left-[0.8cqw] top-[5cqw] text-[0.9cqw] text-vt-slate/60">‹</span>
      <span className="absolute right-[0.8cqw] top-[5cqw] text-[0.9cqw] text-vt-slate/60">›</span>
      <div className="absolute inset-x-0 top-[10cqw] flex justify-center gap-[0.3cqw]">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={`h-[0.3cqw] w-[0.3cqw] rounded-full ${i === 0 ? "bg-vt-teal" : "bg-[#D6D6D6]"}`} />
        ))}
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="absolute inset-x-0 top-[57cqw] h-[7cqw] border-t border-[#EDEDED] bg-white">
      <div className="absolute left-[2.5cqw] top-[1cqw] w-[16.5cqw] rounded-[0.25cqw] border border-[#E6E6E6] p-[0.6cqw]">
        <p className="text-[0.48cqw] font-bold uppercase tracking-[0.1em] text-vt-teal">Los más Buscados</p>
        <div className="mt-[0.45cqw] flex items-center gap-[0.5cqw]">
          <span className="h-[2.2cqw] w-[2.2cqw] shrink-0 rounded-[0.15cqw] bg-gradient-to-br from-[#F7C46C] to-[#23A5AC]" />
          <span className="flex flex-col">
            <span className="text-[0.62cqw] font-bold text-vt-slate">Luquillo Beach</span>
            <span className="text-[0.5cqw] text-vt-slate/80">Septiembre 30, 2018</span>
          </span>
        </div>
      </div>
      <div className="absolute left-[22cqw] top-[1cqw] w-[36.5cqw]">
        <p className="text-[0.8cqw] font-extrabold text-vt-slate">Sobre Voy Turisteando</p>
        <p className="mt-[0.3cqw] text-[0.56cqw] leading-[1.45] text-vt-slate">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa cum
          sociis natoque.
        </p>
        <div className="mt-[0.6cqw] flex gap-[0.3cqw]">
          <span className="flex h-[1.3cqw] flex-1 items-center rounded-[0.15cqw] border border-[#D6D6D6] px-[0.5cqw] text-[0.5cqw] text-vt-slate/70">
            Tu email
          </span>
          <span className="flex h-[1.3cqw] items-center rounded-[0.15cqw] bg-vt-teal px-[0.8cqw] text-[0.48cqw] font-bold uppercase tracking-[0.08em] text-white">
            Suscríbete
          </span>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="absolute inset-x-0 top-[64cqw] h-[8cqw] bg-vt-teal text-white">
      <div className="absolute left-[2.5cqw] top-[1cqw] w-[15cqw] text-[0.5cqw] leading-[1.5]">
        <p className="mb-[0.3cqw] text-[0.62cqw] font-extrabold uppercase tracking-[0.06em]">Contáctanos</p>
        <p>Edificio La Princesa,</p>
        <p>Paseo de La Princesa, Viejo San Juan</p>
        <p>infocenter@tourism.pr.gov</p>
      </div>
      <div className="absolute left-[19cqw] top-[1cqw] w-[16cqw] text-[0.5cqw] leading-[1.5] text-white/90">
        <p>Viejo San Juan · 787-722-1709</p>
        <p>Aeropuerto LMM · 787-791-1014</p>
        <p>Porta del Sol (oeste) · 787-851-7070</p>
        <p>Porta Caribe (sur) · 787-290-2911</p>
      </div>
      <p className="absolute right-[2.5cqw] top-[1.2cqw] w-[18cqw] text-right text-[1cqw] font-black uppercase leading-[1.05]">
        Tu Isla es tu mejor vacación
      </p>
      <div className="absolute inset-x-0 bottom-0 flex h-[1.6cqw] items-center bg-vt-slate px-[2.5cqw] text-[0.5cqw] text-white/85">
        © {legacy.copyrightYear}. Todos los derechos reservados. VoyTuristeando.com
      </div>
    </footer>
  )
}

/** Scrolling page body (sits under the fixed header). */
export function LegacyPage({ searchPanel }: { searchPanel: ReactNode }) {
  return (
    <div className="absolute inset-x-0 top-0 h-[72cqw] bg-white font-sans">
      <div className="absolute inset-x-0 top-[5cqw] h-[15cqw]">
        <Hero />
      </div>
      <Directory searchPanel={searchPanel} />
      <Cards />
      <Offers />
      <About />
      <Footer />
    </div>
  )
}
