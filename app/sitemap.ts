import type { MetadataRoute } from "next"
import caseStudies from "@/data/work"
import { getOsNotes } from "@/lib/os-notes"

const BASE_URL = "https://gaborene.com"

// Bump the matching date when a page's content meaningfully changes
const UPDATED = {
  home: new Date("2026-09-30"),
  about: new Date("2026-09-02"),
  work: new Date("2026-09-30"),
  speaking: new Date("2026-09-02"),
  lab: new Date("2026-08-17"),
  caseStudyDefault: new Date("2026-07-13"),
}

const CASE_STUDY_UPDATED: Record<string, Date> = {
  voyturisteando: new Date("2026-09-30"),
}

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyUrls: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${BASE_URL}/work/${study.slug}`,
    lastModified: CASE_STUDY_UPDATED[study.slug] ?? UPDATED.caseStudyDefault,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const osNotes = getOsNotes()
  const osNoteUrls: MetadataRoute.Sitemap = osNotes.map((note) => ({
    url: `${BASE_URL}/lab/notes/${note.slug}`,
    lastModified: new Date(note.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  const latestNote = osNotes.reduce(
    (latest, note) => (note.date > latest ? note.date : latest),
    "",
  )

  return [
    {
      url: BASE_URL,
      lastModified: UPDATED.home,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: UPDATED.about,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: UPDATED.work,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/speaking`,
      lastModified: UPDATED.speaking,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/lab`,
      lastModified: UPDATED.lab,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/lab/notes`,
      lastModified: latestNote ? new Date(latestNote) : UPDATED.lab,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...caseStudyUrls,
    ...osNoteUrls,
  ]
}
