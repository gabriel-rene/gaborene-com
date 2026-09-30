export type FilmSceneId =
  | "cold-open"
  | "legacy"
  | "research"
  | "migration"
  | "directory"
  | "launch"
  | "dashboard"
  | "results"
  | "next"

export interface FilmScene {
  id: FilmSceneId
  /** Label in the chapter list under the player */
  chapter: string
  /** Project months this scene covers, 1–10. Null for title cards. */
  months: [number, number] | null
  /** How the scene enters: a dip through the frame background (default) or a left-to-right wipe, used where the background colour changes. */
  enter?: "dip" | "wipe"
  /** Colour of the wipe's leading edge; sun unless the scene itself is yellow. */
  wipeEdge?: "sun" | "ink"
  start: number
  duration: number
}

/**
 * Every figure the film shows. Scenes import from here, so a number changes
 * in one place. Legacy counts come from the archived WordPress sitemaps
 * (July 2022); stack and model details from the live platform.
 */
export const FILM_FACTS = {
  projectMonths: 10,
  municipalities: 78,
  regions: 6,
  legacy: {
    directoryEntries: 637,
    events: 190,
    offers: 17,
    posts: 17,
    totalEntries: 861,
    filterTags: 48,
    municipalityTags: 84,
    homepageClaim: "Más de 220 atracciones",
    copyrightYear: 2020,
    mobileLoadSeconds: 8.4,
    theme: "Divi",
  },
  research: {
    participants: 42,
    municipalities: 14,
    interviewHours: 36,
    treeTestBefore: 38,
    treeTestAfter: 91,
  },
  migration: {
    entriesIn: 861,
    /** Unique places left after deduplication, imported by script in one night */
    importedInOneNight: 426,
    categories: 6,
    subcategories: 39,
    geocodedPercent: 100,
    languages: 2,
    checkInRadiusMi: 0.3,
  },
  directory: {
    /** Places at launch (the import) and by month 9 */
    placesAtLaunch: 426,
    listings: 1000,
    quizQuestions: 3,
    /** Launch-era category counts on the homepage chips. A place can carry several categories. */
    categories: [
      { label: "Naturaleza", count: 98 },
      { label: "Cultura", count: 81 },
      { label: "Gastronomía", count: 75 },
      { label: "Sitios históricos", count: 66 },
      { label: "Agua", count: 61 },
      { label: "Adrenalina", count: 42 },
    ],
    caboRojoPlaces: 23,
  },
  launch: {
    mobileLoadSeconds: 1.4,
    lighthouse: 97,
  },
  dashboard: {
    monthlySessions: 184000,
    searchesLogged: 212000,
    favoritesSaved: 48600,
    eventsAdded: 771,
    /** Share of onboarding-quiz answers, % — all regions and Región Oeste */
    interests: [
      { label: "Naturaleza", all: 24, oeste: 22 },
      { label: "Agua", all: 21, oeste: 31 },
      { label: "Gastronomía", all: 19, oeste: 18 },
      { label: "Cultura", all: 14, oeste: 9 },
      { label: "Sitios históricos", all: 12, oeste: 13 },
      { label: "Adrenalina", all: 10, oeste: 7 },
    ],
    peakSearch: "Thursday, 8–10 p.m.",
  },
  results: {
    /** vs. month 1 */
    organicGrowthPercent: 212,
    sessionMinutes: 3.6,
    municipalitiesWithTraffic: 78,
  },
  passport: {
    destinations: 700,
    checkInsFirstSixMonths: 231581,
    levels: ["Turista", "Explorador", "Aventurero", "Experto", "Embajador"],
  },
} as const

/** Scene transitions take this many seconds. */
export const SCENE_OVERLAP = 0.6

const SCENE_PLAN: Omit<FilmScene, "start">[] = [
  { id: "cold-open", chapter: "Open", months: null, duration: 9 },
  { id: "legacy", chapter: "The old site", months: [1, 1], duration: 14 },
  { id: "research", chapter: "Research", months: [1, 2], duration: 18, enter: "wipe" },
  { id: "migration", chapter: "Migration", months: [2, 3], duration: 17.5, enter: "wipe" },
  { id: "directory", chapter: "Directory", months: [3, 4], duration: 19 },
  { id: "launch", chapter: "Launch", months: [4, 4], duration: 7 },
  { id: "dashboard", chapter: "Data", months: [5, 9], duration: 18 },
  { id: "results", chapter: "Results", months: [9, 9], duration: 7, enter: "wipe", wipeEdge: "ink" },
  { id: "next", chapter: "Next", months: [10, 10], duration: 13.5, enter: "wipe" },
]

export const FILM_SCENES: FilmScene[] = SCENE_PLAN.reduce<FilmScene[]>((scenes, scene) => {
  const previous = scenes[scenes.length - 1]
  const start = previous ? previous.start + previous.duration - SCENE_OVERLAP : 0
  scenes.push({ ...scene, start: Math.round(start * 100) / 100 })
  return scenes
}, [])

const last = FILM_SCENES[FILM_SCENES.length - 1]
export const FILM_DURATION = last.start + last.duration

export function sceneAt(t: number): FilmScene {
  let current = FILM_SCENES[0]
  for (const scene of FILM_SCENES) if (t >= scene.start) current = scene
  return current
}
