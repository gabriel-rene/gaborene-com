import type { Metadata } from "next"
import { SpeakingGallery } from "@/components/speaking-gallery"
import identities from "@/data/identities"

export const metadata: Metadata = {
  title: "Speaking",
  description:
    "AI speaker and educator based in Puerto Rico. Talks, panels, podcasts, and curriculum consulting on human-centered AI design and implementation, for audiences from advertising and PR associations to university faculties, chambers of commerce, and tourism summits.",
  keywords: [
    "AI speaker Puerto Rico",
    "AI educator Puerto Rico",
    "AI keynote speaker",
    "human-centered AI",
    "AI conference speaker Puerto Rico",
    "Gabriel Rodríguez Rovira",
  ],
  openGraph: {
    title: "Speaking | Gabriel René Rodríguez-Rovira",
    description:
      "AI speaker and educator based in Puerto Rico. Talks, panels, podcasts, and curriculum consulting on human-centered AI design and implementation.",
    url: "https://gaborene.com/speaking",
  },
  alternates: {
    canonical: "https://gaborene.com/speaking",
  },
}

const speakingPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://gaborene.com/speaking",
  url: "https://gaborene.com/speaking",
  name: "Speaking | Gabriel René Rodríguez-Rovira",
  description:
    "AI speaking and education: talks, panels, podcasts, and curriculum consulting on human-centered AI design and implementation.",
  about: { "@id": "https://gaborene.com/#person" },
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
        name: "Speaking",
        item: "https://gaborene.com/speaking",
      },
    ],
  },
}

export default function Speaking() {
  const engagements =
    identities.find((i) => i.role === "educator on AI")?.engagements ?? []

  return (
    <main className="flex flex-col flex-1 px-8 pt-32 pb-16 max-w-3xl mx-auto w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakingPageSchema) }}
      />
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100">
            Speaking
          </h1>
        </div>

        <div className="flex flex-col gap-8 max-w-xl text-stone-600 dark:text-stone-400 leading-relaxed">
          <p>
            I speak and teach about AI — specifically the human-centered design
            and implementation of it. The technology is changing us.
            Understanding it is not optional.
          </p>
          <p>
            Audiences have ranged from advertising and public relations
            associations to university faculties, chambers of commerce, and
            tourism summits, in Puerto Rico and abroad. The formats: keynotes,
            panels, podcasts, and curriculum consulting.
          </p>
        </div>

        <SpeakingGallery />

        <div className="flex flex-col gap-4">
          <p className="text-sm text-stone-600 dark:text-stone-400 uppercase tracking-widest">
            Engagements
          </p>
          <ul className="flex flex-col gap-2 max-w-xl">
            {engagements.map((engagement) => (
              <li
                key={engagement}
                className="text-sm text-stone-600 dark:text-stone-400 before:content-['—'] before:mr-2 leading-snug"
              >
                {engagement}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-stone-600 dark:text-stone-400 uppercase tracking-widest">
            Inquiries
          </p>
          <a
            href="mailto:gabriel@gaborene.com"
            className="font-serif italic text-stone-900 dark:text-stone-100 hover:text-stone-500 dark:hover:text-stone-400 transition-colors w-fit"
          >
            gabriel@gaborene.com
          </a>
        </div>
      </div>
    </main>
  )
}
