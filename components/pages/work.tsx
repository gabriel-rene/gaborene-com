import Link from "next/link"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { cardThumbnail } from "@/data/work"
import { getCaseStudies } from "@/lib/content"
import { caseStudyPath, routeAlternates, url, type Locale } from "@/lib/i18n"
import { pageMetadata, SITE_NAME } from "@/lib/site-metadata"
import { JsonLd } from "@/components/structured-data"

const PLAYLIST_URL =
  "https://www.youtube.com/playlist?list=PL1UFCpUVmHhBJ2R6wjU1OzZagKzCVSBpA"

const FEATURED_SLUGS = ["pasaporte-aventura", "eyetracker"]

const AWARDS = [
  "Cannes Lions",
  "El Ojo de Iberoamérica",
  "The One Show",
  "Clio Awards",
  "Effie Awards",
  "Cúspide Awards",
  "FIAP",
  "SME Digital Awards",
]

const COPY = {
  en: {
    title: "Work",
    description:
      "Case studies in digital strategy, creative technology, and AI-driven campaigns from Puerto Rico. Work awarded at Cannes Lions, Effie, El Ojo, and FIAP.",
    home: "Home",
    watchAll: "Watch all on YouTube",
  },
  es: {
    title: "Trabajo",
    description:
      "Casos de estrategia digital, tecnología creativa y campañas con IA desde Puerto Rico. Trabajo premiado en Cannes Lions, Effie, El Ojo y FIAP.",
    home: "Inicio",
    watchAll: "Ver todo en YouTube",
  },
} satisfies Record<Locale, unknown>

export function workMetadata(locale: Locale) {
  const copy = COPY[locale]
  return pageMetadata({
    locale,
    title: copy.title,
    description: copy.description,
    alternates: routeAlternates(locale, "work"),
  })
}

export function WorkPage({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  const studies = getCaseStudies(locale)
  const featured = studies.filter((s) => FEATURED_SLUGS.includes(s.slug))
  const rest = studies.filter((s) => !FEATURED_SLUGS.includes(s.slug))

  const workPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url(locale, "work"),
    url: url(locale, "work"),
    name: `${copy.title} | ${SITE_NAME}`,
    description: copy.description,
    inLanguage: locale,
    author: { "@id": "https://gaborene.com/#person" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: copy.home, item: url(locale, "home") },
        { "@type": "ListItem", position: 2, name: copy.title, item: url(locale, "work") },
      ],
    },
  }

  return (
    <main className="flex flex-col flex-1 px-8 pt-32 pb-16 max-w-5xl mx-auto w-full">
      <JsonLd data={workPageSchema} />
      <div className="flex flex-col gap-12">
        <div className="flex items-end justify-between gap-4">
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100">
            {copy.title}
          </h1>
          <a
            href={PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
          >
            {copy.watchAll}
            <ExternalLink size={13} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {featured.map((study) => (
            <Link
              key={study.slug}
              href={caseStudyPath(locale, study.slug)}
              className="group flex flex-col gap-3"
            >
              <div className="relative aspect-video overflow-hidden bg-stone-100 dark:bg-stone-900">
                <Image
                  src={cardThumbnail(study)}
                  alt={study.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="font-serif text-xl text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-400 transition-colors">
                  {study.title}
                </h2>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  {study.client}, {study.year}
                </p>
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mt-1 line-clamp-2">
                  {study.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 py-4 border-y border-stone-200 dark:border-stone-800">
          {AWARDS.map((award) => (
            <span
              key={award}
              className="text-xs text-stone-600 dark:text-stone-400 uppercase tracking-widest"
            >
              {award}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((study) => (
            <Link
              key={study.slug}
              href={caseStudyPath(locale, study.slug)}
              className="group flex flex-col gap-3"
            >
              <div className="relative aspect-video overflow-hidden bg-stone-100 dark:bg-stone-900">
                <Image
                  src={cardThumbnail(study)}
                  alt={study.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="font-serif text-lg text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-400 transition-colors">
                  {study.title}
                </h2>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  {study.client}, {study.year}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
