import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import caseStudies from "@/data/work"

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected case studies in digital strategy, creative technology, and AI-driven campaigns. Award-winning work from Puerto Rico, Cannes Lions, Effie, El Ojo de Iberoamérica, FIAP, and more.",
  openGraph: {
    title: "Work | Gabriel René Rodríguez-Rovira",
    description:
      "Selected case studies in digital strategy, creative technology, and AI-driven campaigns. Award-winning work from Puerto Rico, Cannes Lions, Effie, El Ojo de Iberoamérica, FIAP, and more.",
    url: "https://gaborene.com/work",
  },
  alternates: {
    canonical: "https://gaborene.com/work",
  },
}

const PLAYLIST_URL =
  "https://www.youtube.com/playlist?list=PL1UFCpUVmHhBJ2R6wjU1OzZagKzCVSBpA"

const FEATURED_SLUGS = ["pasaporte-aventura", "eyetracker"]

const workPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://gaborene.com/work",
  url: "https://gaborene.com/work",
  name: "Work | Gabriel René Rodríguez-Rovira",
  description:
    "Selected case studies in digital strategy, creative technology, and AI-driven campaigns from Puerto Rico.",
  author: { "@id": "https://gaborene.com/#person" },
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
    ],
  },
}

export default function Work() {
  const featured = caseStudies.filter((s) => FEATURED_SLUGS.includes(s.slug))
  const rest = caseStudies.filter((s) => !FEATURED_SLUGS.includes(s.slug))

  return (
    <main className="flex flex-col flex-1 px-8 pt-32 pb-16 max-w-5xl mx-auto w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(workPageSchema) }}
      />
      <div className="flex flex-col gap-12">
        <div className="flex items-end justify-between">
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100">
            Work
          </h1>
          <a
            href={PLAYLIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-stone-400 dark:text-stone-600 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
          >
            Watch all on YouTube
            <ExternalLink size={13} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {featured.map((study) => (
            <Link
              key={study.slug}
              href={`/work/${study.slug}`}
              className="group flex flex-col gap-3"
            >
              <div className="relative aspect-video overflow-hidden bg-stone-100 dark:bg-stone-900">
                <Image
                  src={`https://img.youtube.com/vi/${study.youtubeId}/hqdefault.jpg`}
                  alt={study.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="font-serif text-xl text-stone-900 dark:text-stone-100 group-hover:text-stone-500 dark:group-hover:text-stone-400 transition-colors">
                  {study.title}
                </h2>
                <p className="text-sm text-stone-400 dark:text-stone-600">
                  {study.client}, {study.year}
                </p>
                <p className="text-sm text-stone-500 dark:text-stone-500 leading-relaxed mt-1 line-clamp-2">
                  {study.summary}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 py-4 border-y border-stone-200 dark:border-stone-800">
          {[
            "Cannes Lions",
            "El Ojo de Iberoamérica",
            "The One Show",
            "Clio Awards",
            "Effie Awards",
            "Cúspide Awards",
            "FIAP",
            "SME Digital Awards",
          ].map((award) => (
            <span
              key={award}
              className="text-xs text-stone-400 dark:text-stone-600 uppercase tracking-widest"
            >
              {award}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((study) => (
            <Link
              key={study.slug}
              href={`/work/${study.slug}`}
              className="group flex flex-col gap-3"
            >
              <div className="relative aspect-video overflow-hidden bg-stone-100 dark:bg-stone-900">
                <Image
                  src={`https://img.youtube.com/vi/${study.youtubeId}/hqdefault.jpg`}
                  alt={study.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="font-serif text-lg text-stone-900 dark:text-stone-100 group-hover:text-stone-500 dark:group-hover:text-stone-400 transition-colors">
                  {study.title}
                </h2>
                <p className="text-sm text-stone-400 dark:text-stone-600">
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
