import Link from "next/link"
import caseStudies from "@/data/work"
import { caseStudyPath, type Locale } from "@/lib/i18n"

const ALIASES: Record<string, string> = {
  VoyTuristeando: "voyturisteando",
  "The Eye Tracker": "eyetracker",
}

const TITLES: Record<string, string> = {
  ...Object.fromEntries(caseStudies.map((study) => [study.title, study.slug])),
  ...ALIASES,
}

// Longest first, so "VoyTuristeando.com" wins over "VoyTuristeando"
const PATTERN = new RegExp(
  `(${Object.keys(TITLES)
    .sort((a, b) => b.length - a.length)
    .map((title) => title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})`,
)

/**
 * Text with the first mention of each case study linked to it. Pass the same
 * `linked` set to several blocks to link each study once across all of them.
 */
export function LinkedText({
  text,
  locale,
  linked = new Set<string>(),
}: {
  text: string
  locale: Locale
  linked?: Set<string>
}) {
  return text.split(PATTERN).map((part, i) => {
    const slug = TITLES[part]
    if (!slug || linked.has(slug)) return part
    linked.add(slug)
    return (
      <Link
        key={i}
        href={caseStudyPath(locale, slug)}
        className="underline decoration-stone-400 dark:decoration-stone-600 underline-offset-2 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
      >
        {part}
      </Link>
    )
  })
}
