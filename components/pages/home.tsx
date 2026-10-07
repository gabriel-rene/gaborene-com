import Link from "next/link"
import Image from "next/image"
import { RoleSelector } from "@/components/role-selector"
import { cardThumbnail } from "@/data/work"
import { getCaseStudies, getIdentities } from "@/lib/content"
import { caseStudyPath, path, type Locale } from "@/lib/i18n"
import { JOB_TITLE } from "@/lib/site-metadata"

const FEATURED_SLUGS = ["eyetracker", "pasaporte-aventura"]

const COPY: Record<
  Locale,
  {
    record: string
    alsoA: string
    selected: string
    all: string
    photoAlt: string
  }
> = {
  en: {
    record: "San Juan, Puerto Rico. Twenty-five years in. Seventeen things at once.",
    alsoA: "I am also a",
    selected: "Selected work",
    all: "All work",
    photoAlt: "Gabriel speaking at the El Salvador National Marketing Association",
  },
  es: {
    record: "San Juan, Puerto Rico. Veinticinco años en esto. Diecisiete cosas a la vez.",
    alsoA: "También soy",
    selected: "Trabajo selecto",
    all: "Todo el trabajo",
    photoAlt: "Gabriel dando una charla en la Asociación Nacional de Mercadeo de El Salvador",
  },
}

export function HomePage({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  const studies = getCaseStudies(locale)
  const featured = FEATURED_SLUGS.flatMap((slug) => {
    const study = studies.find((s) => s.slug === slug)
    return study ? [study] : []
  })

  return (
    <main className="flex flex-col flex-1 w-full max-w-3xl mx-auto">
      <section className="px-8 pt-24">
        <h1 className="font-serif text-2xl md:text-3xl leading-tight text-balance text-stone-900 dark:text-stone-100 max-w-[18ch]">
          Gabriel René Rodríguez-Rovira
        </h1>
      </section>

      <section className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-10 gap-y-8 px-8 pt-5 pb-16">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <p className="font-serif text-base leading-snug text-accent text-balance">
              {JOB_TITLE[locale]}
            </p>
            <p className="text-sm text-stone-600 dark:text-stone-400 max-w-md text-pretty">
              {copy.record}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs text-stone-600 dark:text-stone-400">
              {copy.alsoA}
            </p>
            <RoleSelector locale={locale} identities={getIdentities(locale)} />
          </div>
        </div>

        <div className="relative aspect-square w-full max-w-[16rem] lg:max-w-xs lg:justify-self-end lg:sticky lg:top-28 lg:self-start">
          <Image
            src="/speaking/gabo-el-salvador.jpg"
            alt={copy.photoAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className="px-8 py-12 border-t border-stone-200 dark:border-stone-800">
        <div className="flex items-baseline justify-between gap-6 mb-6">
          <h2 className="font-serif text-lg text-stone-900 dark:text-stone-100">
            {copy.selected}
          </h2>
          <Link
            href={path(locale, "work")}
            className="text-xs text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors whitespace-nowrap"
          >
            {copy.all} →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-serif text-base text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-400 transition-colors">
                  {study.title}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  {study.client}, {study.year}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
          Cannes Lions Gold · The One Show · El Ojo de Iberoamérica · Effie · FIAP · LUUM
        </p>
      </section>

    </main>
  )
}
