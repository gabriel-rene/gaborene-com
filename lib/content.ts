import type { Locale } from "@/lib/i18n"
import caseStudies, { type CaseStudy } from "@/data/work"
import caseStudiesEs from "@/data/work.es"
import identities, { type Engagement, type Identity } from "@/data/identities"
import identitiesEs from "@/data/identities.es"
import timeline, { timelineIntro, type TimelineEntry } from "@/data/timeline"
import timelineEs, { timelineIntroEs } from "@/data/timeline.es"
import press, { type PressItem } from "@/data/press"
import pressContributionsEs from "@/data/press.es"
import labProjects, { type LabProject } from "@/data/lab"
import labDescriptionsEs from "@/data/lab.es"

const CLIENTS_ES: Record<string, string> = {
  "Puerto Rico Tourism Company": "Compañía de Turismo de Puerto Rico",
}

export function getCaseStudies(locale: Locale): CaseStudy[] {
  if (locale === "en") return caseStudies
  return caseStudies.map((study) => ({
    ...study,
    ...caseStudiesEs[study.slug],
    client: CLIENTS_ES[study.client] ?? study.client,
  }))
}

export function getIdentities(locale: Locale): Identity[] {
  return locale === "en" ? identities : identitiesEs
}

/** The speaking role is the only identity with a list of engagements. */
export function getEngagements(locale: Locale): Engagement[] {
  return getIdentities(locale).find((i) => i.engagements)?.engagements ?? []
}

export function getTimeline(locale: Locale): {
  intro: typeof timelineIntro
  entries: TimelineEntry[]
} {
  return locale === "en"
    ? { intro: timelineIntro, entries: timeline }
    : { intro: timelineIntroEs, entries: timelineEs }
}

export function getPress(locale: Locale): PressItem[] {
  if (locale === "en") return press
  return press.map((item) => ({
    ...item,
    contribution: pressContributionsEs[item.url] ?? item.contribution,
  }))
}

export function getLabProjects(locale: Locale): LabProject[] {
  if (locale === "en") return labProjects
  return labProjects.map((project) => ({
    ...project,
    description: labDescriptionsEs[project.name] ?? project.description,
  }))
}
