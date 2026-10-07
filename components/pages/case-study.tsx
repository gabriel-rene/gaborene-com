import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { ogThumbnail } from "@/data/work"
import { FilmPlayer } from "@/components/voyturisteando-film/film-player"
import { getCaseStudies } from "@/lib/content"
import {
  caseStudyAlternates,
  caseStudyPath,
  caseStudyUrl,
  path,
  url,
  type Locale,
} from "@/lib/i18n"
import { metaDescription, pageMetadata } from "@/lib/site-metadata"
import { JsonLd } from "@/components/structured-data"

const COPY: Record<
  Locale,
  { home: string; work: string; role: string; recognition: string; next: string }
> = {
  en: {
    home: "Home",
    work: "Work",
    role: "My role",
    recognition: "Recognition",
    next: "Watch next",
  },
  es: {
    home: "Inicio",
    work: "Trabajo",
    role: "Mi rol",
    recognition: "Reconocimientos",
    next: "Lo que sigue",
  },
}

export function caseStudyMetadata(locale: Locale, slug: string) {
  const study = getCaseStudies(locale).find((s) => s.slug === slug)
  if (!study) return {}
  return pageMetadata({
    locale,
    title: study.title,
    description: metaDescription(study.summary),
    alternates: caseStudyAlternates(locale, slug),
    images: [{ url: ogThumbnail(study), alt: study.title }],
  })
}

export function CaseStudyPage({ locale, slug }: { locale: Locale; slug: string }) {
  const copy = COPY[locale]
  const studies = getCaseStudies(locale)
  const study = studies.find((s) => s.slug === slug)
  if (!study) notFound()
  const next = study.next ? studies.find((s) => s.slug === study.next) : undefined

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": caseStudyUrl(locale, study.slug),
    url: caseStudyUrl(locale, study.slug),
    name: study.title,
    description: study.summary,
    inLanguage: locale,
    author: { "@id": "https://gaborene.com/#person" },
    dateCreated: String(study.year),
    genre: study.category,
    locationCreated: {
      "@type": "AdministrativeArea",
      name: "Puerto Rico",
    },
    ...(study.awards && study.awards.length > 0 ? { award: study.awards } : {}),
    ...(study.youtubeId
      ? {
          video: {
            "@type": "VideoObject",
            name: study.title,
            description: study.summary,
            thumbnailUrl: ogThumbnail(study),
            embedUrl: `https://www.youtube-nocookie.com/embed/${study.youtubeId}`,
            uploadDate: `${String(study.year).slice(0, 4)}-01-01`,
          },
        }
      : { image: `https://gaborene.com${ogThumbnail(study)}` }),
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: copy.home, item: url(locale, "home") },
        { "@type": "ListItem", position: 2, name: copy.work, item: url(locale, "work") },
        {
          "@type": "ListItem",
          position: 3,
          name: study.title,
          item: caseStudyUrl(locale, study.slug),
        },
      ],
    },
  }

  return (
    <main
      className={`flex flex-col flex-1 px-8 pt-32 pb-16 mx-auto w-full ${
        study.film ? "max-w-5xl" : "max-w-3xl"
      }`}
    >
      <JsonLd data={caseStudySchema} />
      <div className="flex flex-col gap-10">
        <Link
          href={path(locale, "work")}
          className="flex items-center gap-1.5 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors w-fit"
        >
          <ArrowLeft size={13} />
          {copy.work}
        </Link>

        <div className="flex flex-col gap-3">
          <p className="text-sm text-stone-600 dark:text-stone-400 uppercase tracking-widest">
            {study.client}, {study.year}
          </p>
          <h1 className="font-serif text-[1.75rem] sm:text-2xl md:text-3xl text-stone-900 dark:text-stone-100">
            {study.title}
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed">
            {study.summary}
          </p>
          {study.role && (
            <p className="text-sm text-stone-600 dark:text-stone-400">
              <span className="uppercase tracking-widest text-xs">{copy.role}</span>{" "}
              · {study.role}
            </p>
          )}
        </div>

        {study.film === "voyturisteando" && <FilmPlayer />}

        {study.youtubeId && (
          <div className="aspect-video w-full">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${study.youtubeId}`}
              title={study.title}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        )}

        <div className="flex flex-col gap-6 max-w-xl">
          {study.pullQuote && (
            <blockquote className="border-l-2 border-stone-300 dark:border-stone-700 pl-5 py-1">
              <p className="font-serif italic text-2xl text-stone-900 dark:text-stone-100 leading-snug">
                “{study.pullQuote.quote}”
              </p>
              <cite className="not-italic block mt-2 text-sm text-stone-600 dark:text-stone-400">
                {study.pullQuote.attribution}
              </cite>
            </blockquote>
          )}
          <p className="text-stone-600 dark:text-stone-400 leading-relaxed whitespace-pre-line">
            {study.body}
          </p>

          {study.awards && study.awards.length > 0 && (
            <div className="flex flex-col gap-2 pt-4 border-t border-stone-200 dark:border-stone-800">
              <p className="text-xs text-stone-600 dark:text-stone-400 uppercase tracking-widest">
                {copy.recognition}
              </p>
              <ul className="flex flex-col gap-1">
                {study.awards.map((award) => (
                  <li key={award} className="text-sm text-stone-600 dark:text-stone-400">
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {next && (
            <Link
              href={caseStudyPath(locale, next.slug)}
              className="group flex flex-col gap-1 pt-4 border-t border-stone-200 dark:border-stone-800"
            >
              <span className="text-xs text-stone-600 dark:text-stone-400 uppercase tracking-widest">
                {copy.next}
              </span>
              <span className="flex items-center gap-2 font-serif text-2xl text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-400 transition-colors">
                {next.title}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </span>
              <span className="text-sm text-stone-600 dark:text-stone-400">
                {next.client}, {next.year}
              </span>
            </Link>
          )}
        </div>
      </div>
    </main>
  )
}
