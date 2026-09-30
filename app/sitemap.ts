import type { MetadataRoute } from "next"
import caseStudies from "@/data/work"
import {
  caseStudyAlternates,
  routeAlternates,
  type Locale,
  type RouteKey,
} from "@/lib/i18n"

// Bump the matching date when a page's content meaningfully changes
const UPDATED = {
  home: new Date("2026-09-30"),
  about: new Date("2026-09-30"),
  work: new Date("2026-09-30"),
  speaking: new Date("2026-09-30"),
  lab: new Date("2026-09-30"),
  caseStudyDefault: new Date("2026-09-30"),
}

const PAGES: { key: RouteKey; updated: Date; priority: number }[] = [
  { key: "home", updated: UPDATED.home, priority: 1 },
  { key: "about", updated: UPDATED.about, priority: 0.9 },
  { key: "work", updated: UPDATED.work, priority: 0.9 },
  { key: "speaking", updated: UPDATED.speaking, priority: 0.8 },
  { key: "lab", updated: UPDATED.lab, priority: 0.7 },
]

const LOCALES: Locale[] = ["en", "es"]

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = PAGES.flatMap(({ key, updated, priority }) =>
    LOCALES.map((locale) => {
      const { canonical, languages } = routeAlternates(locale, key)
      return {
        url: canonical,
        lastModified: updated,
        changeFrequency: "monthly" as const,
        priority,
        alternates: { languages: { en: languages.en, es: languages.es } },
      }
    }),
  )

  const studies = caseStudies.flatMap((study) =>
    LOCALES.map((locale) => {
      const { canonical, languages } = caseStudyAlternates(locale, study.slug)
      return {
        url: canonical,
        lastModified: UPDATED.caseStudyDefault,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: { languages: { en: languages.en, es: languages.es } },
      }
    }),
  )

  return [...pages, ...studies]
}
