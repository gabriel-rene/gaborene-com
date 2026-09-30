import Link from "next/link"
import Image from "next/image"
import { RoleSelector } from "@/components/role-selector"
import { cardThumbnail } from "@/data/work"
import { getCaseStudies, getIdentities } from "@/lib/content"
import { caseStudyPath, path, type Locale } from "@/lib/i18n"
import { JOB_TITLE } from "@/lib/site-metadata"

const FEATURED_SLUGS = ["eyetracker", "pasaporte-aventura"]

const COPY: Record<Locale, { alsoA: string; selected: string; all: string }> = {
  en: { alsoA: "I am also a", selected: "Selected work", all: "All work" },
  es: { alsoA: "También soy", selected: "Trabajo selecto", all: "Todo el trabajo" },
}

export function HomePage({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  const studies = getCaseStudies(locale)
  const featured = FEATURED_SLUGS.flatMap((slug) => {
    const study = studies.find((s) => s.slug === slug)
    return study ? [study] : []
  })

  return (
    <main className="flex flex-col flex-1 px-8 pt-32 pb-16 max-w-3xl mx-auto w-full">
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100">
            Gabriel René <span className="whitespace-nowrap">Rodríguez-Rovira</span>
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-lg">
            {JOB_TITLE[locale]}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm text-stone-600 dark:text-stone-400 uppercase tracking-widest">
            {copy.alsoA}
          </p>
          <RoleSelector locale={locale} identities={getIdentities(locale)} />
        </div>

        <div className="flex flex-col gap-4 pt-4 border-t border-stone-200 dark:border-stone-800">
          <div className="flex items-end justify-between">
            <p className="text-sm text-stone-600 dark:text-stone-400 uppercase tracking-widest">
              {copy.selected}
            </p>
            <Link
              href={path(locale, "work")}
              className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              {copy.all}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {featured.map((study) => (
              <Link
                key={study.slug}
                href={caseStudyPath(locale, study.slug)}
                className="group flex flex-col gap-2"
              >
                <div className="relative aspect-video overflow-hidden bg-stone-200 dark:bg-stone-800">
                  <Image
                    src={cardThumbnail(study)}
                    alt={study.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 336px"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h2 className="font-serif text-lg text-stone-900 dark:text-stone-100 group-hover:text-stone-500 dark:group-hover:text-stone-400 transition-colors">
                    {study.title}
                  </h2>
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    {study.client}, {study.year}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <p className="text-xs text-stone-600 dark:text-stone-400 uppercase tracking-widest leading-relaxed">
            Cannes Lions Gold · The One Show · El Ojo de Iberoamérica · Effie ·
            FIAP · LUUM
          </p>
        </div>
      </div>
    </main>
  )
}
