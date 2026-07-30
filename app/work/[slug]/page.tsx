import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import caseStudies, { ogThumbnail } from "@/data/work"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = caseStudies.find((s) => s.slug === slug)
  if (!study) return {}
  return {
    title: study.title,
    description: study.summary,
    openGraph: {
      title: `${study.title} | Gabriel René Rodríguez-Rovira`,
      description: study.summary,
      url: `https://gaborene.com/work/${slug}`,
      images: [
        {
          url: ogThumbnail(study.youtubeId),
          alt: study.title,
        },
      ],
    },
    alternates: {
      canonical: `https://gaborene.com/work/${slug}`,
    },
  }
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params
  const study = caseStudies.find((s) => s.slug === slug)
  if (!study) notFound()

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `https://gaborene.com/work/${study.slug}`,
    url: `https://gaborene.com/work/${study.slug}`,
    name: study.title,
    description: study.summary,
    author: { "@id": "https://gaborene.com/#person" },
    dateCreated: String(study.year),
    genre: study.category,
    locationCreated: {
      "@type": "AdministrativeArea",
      name: "Puerto Rico",
    },
    ...(study.awards && study.awards.length > 0
      ? { award: study.awards }
      : {}),
    video: {
      "@type": "VideoObject",
      name: study.title,
      description: study.summary,
      thumbnailUrl: ogThumbnail(study.youtubeId),
      embedUrl: `https://www.youtube-nocookie.com/embed/${study.youtubeId}`,
      uploadDate: `${String(study.year).slice(0, 4)}-01-01`,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://gaborene.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Work",
          item: "https://gaborene.com/work",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: study.title,
          item: `https://gaborene.com/work/${study.slug}`,
        },
      ],
    },
  }

  return (
    <main className="flex flex-col flex-1 px-8 pt-32 pb-16 max-w-3xl mx-auto w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }}
      />
      <div className="flex flex-col gap-10">
        <Link
          href="/work"
          className="flex items-center gap-1.5 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors w-fit"
        >
          <ArrowLeft size={13} />
          Work
        </Link>

        <div className="flex flex-col gap-3">
          <p className="text-sm text-stone-600 dark:text-stone-400 uppercase tracking-widest">
            {study.client}, {study.year}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100">
            {study.title}
          </h1>
          <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed">
            {study.summary}
          </p>
          {study.role && (
            <p className="text-sm text-stone-600 dark:text-stone-400">
              <span className="uppercase tracking-widest text-xs">
                My role
              </span>{" "}
              · {study.role}
            </p>
          )}
        </div>

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
                Recognition
              </p>
              <ul className="flex flex-col gap-1">
                {study.awards.map((award) => (
                  <li
                    key={award}
                    className="text-sm text-stone-600 dark:text-stone-400"
                  >
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
