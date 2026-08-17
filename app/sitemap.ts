import type { MetadataRoute } from "next"
import caseStudies from "@/data/work"
import { getOsNotes } from "@/lib/os-notes"

const BASE_URL = "https://gaborene.com"

// Bump when site content meaningfully changes
const CONTENT_UPDATED = new Date("2026-07-13")

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyUrls: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${BASE_URL}/work/${study.slug}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  const osNoteUrls: MetadataRoute.Sitemap = getOsNotes().map((note) => ({
    url: `${BASE_URL}/lab/notes/${note.slug}`,
    lastModified: CONTENT_UPDATED,
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/speaking`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/lab`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/lab/notes`,
      lastModified: CONTENT_UPDATED,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...caseStudyUrls,
    ...osNoteUrls,
  ]
}
