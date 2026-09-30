"use client"

import { motion, useTransform } from "framer-motion"
import {
  Bell,
  ChartColumn,
  ChevronDown,
  CircleQuestionMark,
  Database,
  Download,
  Folder,
  Funnel,
  Grid3x3,
  House,
  LayoutGrid,
  Plus,
  Search,
  Settings,
  UserRound,
} from "lucide-react"
import { EASE_OUT, useKeyframes, useReveal, useSceneTime, useStep } from "../film-clock"
import { FILM_FACTS } from "@/data/voyturisteando-film"
import { BrowserWindow, Caption, Cursor, Kicker } from "../film-primitives"
import {
  InterestBars,
  KPIS,
  KpiCard,
  MapLegend,
  ReportCard,
  SearchHeatmap,
  SearchMap,
  TIMING,
} from "./dashboard-charts"

const OPEN_AT = 10.4
const PICK_AT = TIMING.filterFrom - 0.1
const CLOSE_AT = 11.9

const REGIONS = ["Área Metro", "Norte", "Sur", "Este", "Oeste", "Centro"]

function PowerBiGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="h-[1cqw] w-[1cqw]" aria-hidden>
      <rect x="1.5" y="8" width="3.4" height="6.5" rx="0.8" fill="#E8B10A" />
      <rect x="6.3" y="4.6" width="3.4" height="9.9" rx="0.8" fill="#F2C811" />
      <rect x="11.1" y="1.5" width="3.4" height="13" rx="0.8" fill="#FFE750" />
    </svg>
  )
}

function TopBar() {
  return (
    <div className="flex h-[2.3cqw] shrink-0 items-center gap-[0.8cqw] border-b border-[#E1E1E1] bg-[#F7F7F7] px-[0.9cqw]">
      <Grid3x3 className="h-[0.95cqw] w-[0.95cqw] text-[#424242]" strokeWidth={1.8} />
      <span className="flex items-center gap-[0.45cqw]">
        <PowerBiGlyph />
        <span className="text-[0.85cqw] font-semibold text-[#252423]">Power BI</span>
      </span>
      <span className="h-[1cqw] w-px bg-[#D1D1D1]" />
      <span className="text-[0.72cqw] text-[#605E5C]">
        PRTC <span className="px-[0.2cqw]">/</span>
        <span className="text-[#252423]">Turismo interno</span>
      </span>
      <div className="mx-auto flex h-[1.4cqw] w-[20cqw] items-center gap-[0.5cqw] rounded-[0.25cqw] border border-[#E1E1E1] bg-white px-[0.6cqw] text-[0.7cqw] text-[#8A8886]">
        <Search className="h-[0.8cqw] w-[0.8cqw]" strokeWidth={1.8} />
        Buscar
      </div>
      <div className="flex items-center gap-[0.95cqw] text-[#424242]">
        <Bell className="h-[0.9cqw] w-[0.9cqw]" strokeWidth={1.7} />
        <Settings className="h-[0.9cqw] w-[0.9cqw]" strokeWidth={1.7} />
        <Download className="h-[0.9cqw] w-[0.9cqw]" strokeWidth={1.7} />
        <CircleQuestionMark className="h-[0.9cqw] w-[0.9cqw]" strokeWidth={1.7} />
        <span className="flex h-[1.4cqw] w-[1.4cqw] items-center justify-center rounded-full bg-vt-deep text-white">
          <UserRound className="h-[0.8cqw] w-[0.8cqw]" strokeWidth={2} />
        </span>
      </div>
    </div>
  )
}

function Rail() {
  const icons = [House, Plus, Folder, Database, LayoutGrid]
  return (
    <div className="flex w-[2.9cqw] shrink-0 flex-col items-center gap-[1.25cqw] border-r border-[#E1E1E1] bg-[#FAFAFA] pt-[1cqw] text-[#424242]">
      {icons.map((Icon, i) => (
        <Icon key={i} className="h-[1cqw] w-[1cqw]" strokeWidth={1.6} />
      ))}
      <span className="relative flex w-full justify-center text-vt-deep">
        <span className="absolute left-0 top-[-0.2cqw] h-[1.4cqw] w-[0.18cqw] rounded-r-full bg-vt-deep" />
        <ChartColumn className="h-[1cqw] w-[1cqw]" strokeWidth={2} />
      </span>
    </div>
  )
}

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <span
      className={`flex h-[0.7cqw] w-[0.7cqw] items-center justify-center rounded-[0.1cqw] border ${
        checked ? "border-[#252423] bg-[#252423]" : "border-[#8A8886] bg-white"
      }`}
    >
      {checked && (
        <svg viewBox="0 0 10 10" className="h-[0.55cqw] w-[0.55cqw]" aria-hidden>
          <path d="M2 5.2l2 2 4-4.4" fill="none" stroke="#fff" strokeWidth={1.6} strokeLinecap="round" />
        </svg>
      )}
    </span>
  )
}

function Slicer({ label, value, width, active = false }: { label: string; value: string; width: string; active?: boolean }) {
  return (
    <div className={`flex flex-col gap-[0.2cqw] ${width}`}>
      <span className="text-[0.6cqw] text-[#605E5C]">{label}</span>
      <span
        className={`flex h-[1.35cqw] items-center justify-between rounded-[0.15cqw] border bg-white px-[0.5cqw] text-[0.68cqw] text-[#252423] ${
          active ? "border-[#252423]" : "border-[#C8C6C4]"
        }`}
      >
        {value}
        <ChevronDown className="h-[0.7cqw] w-[0.7cqw] text-[#605E5C]" />
      </span>
    </div>
  )
}

function RegionSlicer() {
  const step = useStep([OPEN_AT, PICK_AT, CLOSE_AT])
  const open = step === 0 || step === 1
  const picked = step >= 1
  const listOpacity = useKeyframes([OPEN_AT, OPEN_AT + 0.12, CLOSE_AT - 0.1, CLOSE_AT], [0, 1, 1, 0])
  return (
    <div className="relative">
      <Slicer label="Región" value={picked ? "Oeste" : "Todas"} width="w-[8.5cqw]" active={open} />
      {open && (
        <motion.div
          style={{ opacity: listOpacity }}
          className="absolute left-0 top-full z-20 mt-[0.2cqw] w-[8.5cqw] rounded-[0.15cqw] border border-[#E1E1E1] bg-white py-[0.3cqw] shadow-[0_0.4cqw_1.2cqw_rgba(0,0,0,0.16)]"
        >
          {["Seleccionar todo", ...REGIONS].map((r) => {
            const checked = picked ? r === "Oeste" : r === "Seleccionar todo"
            return (
              <div
                key={r}
                className={`flex h-[1.3cqw] items-center gap-[0.45cqw] px-[0.55cqw] text-[0.66cqw] text-[#252423] ${
                  r === "Oeste" && step === 0 ? "bg-[#F3F2F1]" : ""
                }`}
              >
                <Checkbox checked={checked} />
                {r}
              </div>
            )
          })}
        </motion.div>
      )}
    </div>
  )
}

function PageTabs() {
  const tabs = ["Resumen", "Regiones", "Intereses", "Eventos"]
  return (
    <div className="flex h-[1.8cqw] shrink-0 items-stretch gap-[0.2cqw] border-t border-[#E1E1E1] bg-[#F7F7F7] px-[0.8cqw] text-[0.66cqw]">
      {tabs.map((tab, i) => (
        <span
          key={tab}
          className={`flex items-center px-[0.8cqw] ${
            i === 0
              ? "border-b-[0.15cqw] border-vt-deep bg-white font-semibold text-[#252423]"
              : "text-[#605E5C]"
          }`}
        >
          {tab}
        </span>
      ))}
      <span className="flex items-center px-[0.4cqw] text-[#605E5C]">
        <Plus className="h-[0.75cqw] w-[0.75cqw]" />
      </span>
    </div>
  )
}

function FiltersPane() {
  return (
    <div className="flex w-[1.7cqw] shrink-0 flex-col items-center gap-[0.6cqw] border-l border-[#E1E1E1] bg-white pt-[0.9cqw] text-[#605E5C]">
      <Funnel className="h-[0.8cqw] w-[0.8cqw]" strokeWidth={1.8} />
      <span className="text-[0.62cqw] [writing-mode:vertical-rl]">Filtros</span>
    </div>
  )
}

function FocusScrim() {
  const { focusFrom, focusTo } = TIMING
  const opacity = useKeyframes([focusFrom, focusFrom + 0.6, focusTo - 0.5, focusTo], [0, 0.3, 0.3, 0])
  return <motion.div style={{ opacity }} className="pointer-events-none absolute inset-0 z-10 bg-vt-ink" />
}

function Report() {
  return (
    <div className="absolute inset-0 flex flex-col bg-white font-sans font-normal text-[#252423]">
      <TopBar />
      <div className="flex min-h-0 flex-1">
        <Rail />
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="min-h-0 flex-1 bg-[#EAEAEA] p-[0.6cqw]">
            <div className="relative flex h-full flex-col gap-[0.6cqw] bg-white p-[0.9cqw]">
              <FocusScrim />
              <div className="flex h-[2.3cqw] shrink-0 items-end justify-between">
                <div className="flex flex-col gap-[0.15cqw]">
                  <p className="text-[1.25cqw] font-semibold leading-none tracking-[-0.005em]">
                    Turismo interno · Intereses de residentes
                  </p>
                  <p className="text-[0.62cqw] text-[#605E5C]">
                    Fuente: búsquedas, quiz y vistas en voyturisteando.com
                  </p>
                </div>
                <div className="flex items-end gap-[0.7cqw]">
                  <RegionSlicer />
                  <Slicer label="Periodo" value="Últimos 6 meses" width="w-[9.5cqw]" />
                  <Slicer label="Dispositivo" value="Todos" width="w-[7.5cqw]" />
                </div>
              </div>
              <div className="grid h-[4cqw] shrink-0 grid-cols-5 gap-[0.6cqw]">
                {KPIS.map((kpi, i) => (
                  <KpiCard key={kpi.label} kpi={kpi} index={i} />
                ))}
              </div>
              <div className="flex min-h-0 flex-1 gap-[0.6cqw]">
                <ReportCard
                  at={TIMING.mapCard}
                  title="Interés y búsquedas por pueblo"
                  aside={<MapLegend />}
                  className="w-[57%]"
                >
                  <div className="absolute inset-x-0 bottom-0 top-[0.6cqw] flex items-center justify-center">
                    <SearchMap />
                  </div>
                </ReportCard>
                <div className="flex min-w-0 flex-1 flex-col gap-[0.6cqw]">
                  <ReportCard at={TIMING.barsCard} title="Intereses (quiz de onboarding)" className="flex-1">
                    <InterestBars />
                  </ReportCard>
                  <ReportCard at={TIMING.heatCard} title="Búsquedas por día y hora" className="flex-[1.1]" focus>
                    <SearchHeatmap />
                  </ReportCard>
                </div>
              </div>
            </div>
          </div>
          <PageTabs />
        </div>
        <FiltersPane />
      </div>
    </div>
  )
}

export function DashboardScene() {
  const t = useSceneTime()
  const kicker = useReveal(-0.4, 2.8)
  const headline = useReveal(-0.3, 2.8, 1)
  const rise = useTransform(t, [2.2, 3.2], [51, 0], { clamp: true, ease: EASE_OUT })
  const riseY = useTransform(rise, (v) => `${v}cqw`)
  const scale = useTransform(t, [2.2, 3.2], [0.94, 1], { clamp: true, ease: EASE_OUT })
  const cursorOpacity = useKeyframes([12.4, 12.9], [1, 0])

  return (
    <div className="absolute inset-0 isolate bg-vt-ink">
      <div className="absolute left-[4cqw] top-[15cqw] flex flex-col gap-[1.2cqw]">
        <motion.div style={kicker}>
          <Kicker className="text-vt-teal">Months 5–9 · Data</Kicker>
        </motion.div>
        <motion.h2
          style={headline}
          className="font-serif text-[6.4cqw] leading-[0.95] tracking-[-0.02em] text-white"
        >
          Every search
          <br />was a signal.
        </motion.h2>
      </div>

      <motion.div
        className="absolute left-[7cqw] top-[6.4cqw] h-[36.6cqw] w-[86cqw] origin-top"
        style={{ y: riseY, scale }}
      >
        <BrowserWindow url="app.powerbi.com · PRTC · Turismo interno" className="h-full w-full">
          <Report />
          <motion.div className="absolute inset-0" style={{ opacity: cursorOpacity }}>
            <Cursor
              keys={[
                { t: 9.75, x: 78, y: 62 },
                { t: 10.35, x: 69.4, y: 15.2 },
                { t: 10.4, x: 69.4, y: 15.2, click: true },
                { t: 11.1, x: 68.2, y: 39.5 },
                { t: 11.2, x: 68.2, y: 39.5, click: true },
                { t: 12.4, x: 66, y: 60 },
              ]}
            />
          </motion.div>
        </BrowserWindow>
      </motion.div>

      <Caption at={3.4} until={6.9}>
        Every search carried a pueblo. Every quiz answer, an interest.
      </Caption>
      <Caption at={7.2} until={10}>
        Peak search: {FILM_FACTS.dashboard.peakSearch} Planning the weekend.
      </Caption>
      <Caption at={13.4} until={17.4}>
        What residents looked for became the passport’s content plan.
      </Caption>
    </div>
  )
}
