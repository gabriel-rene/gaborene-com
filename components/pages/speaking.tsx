import { SpeakingGallery } from "@/components/speaking-gallery"
import { PressList } from "@/components/press-list"
import { EngagementList } from "@/components/engagement-list"
import { getEngagements, getPress } from "@/lib/content"
import { routeAlternates, url, type Locale } from "@/lib/i18n"
import { pageMetadata, SITE_NAME } from "@/lib/site-metadata"

const COPY = {
  en: {
    title: "Speaking",
    heading: "Speaking",
    description:
      "AI speaker and educator in Puerto Rico. Keynotes, panels, podcasts, and curriculum consulting on human-centered AI design and implementation.",
    keywords: [
      "AI speaker Puerto Rico",
      "AI educator Puerto Rico",
      "AI keynote speaker",
      "human-centered AI",
      "AI conference speaker Puerto Rico",
      "Gabriel Rodríguez Rovira",
    ],
    home: "Home",
    paragraphs: [
      "I speak and teach about technology and AI — specifically the human-centered design and implementation of it. The technology is changing us. Understanding it is not optional.",
      "Audiences have ranged from advertising and public relations associations to university faculties, chambers of commerce, and tourism summits, in Puerto Rico and abroad. The formats: keynotes, panels, podcasts, and curriculum consulting. I’m also on the 2026 organizing committee for Design Dinners.",
    ],
    engagements: "Engagements",
    press: "Press",
    inquiries: "Inquiries",
  },
  es: {
    title: "Conferencias y charlas sobre IA",
    heading: "Charlas",
    description:
      "Conferencista y educador en IA en Puerto Rico. Conferencias, paneles, podcasts y consultoría de currículo sobre IA centrada en las personas.",
    keywords: [
      "conferencista de inteligencia artificial Puerto Rico",
      "conferencista IA Puerto Rico",
      "charlas de inteligencia artificial",
      "educador en IA Puerto Rico",
      "IA centrada en las personas",
      "Gabriel Rodríguez Rovira",
    ],
    home: "Inicio",
    paragraphs: [
      "Doy charlas y enseño sobre tecnología e IA, específicamente sobre cómo diseñarlas e implementarlas con las personas en el centro. La tecnología nos está cambiando. Entenderla no es opcional.",
      "He hablado ante asociaciones de publicidad y relaciones públicas, facultades universitarias, cámaras de comercio y cumbres de turismo, en Puerto Rico y fuera. Los formatos: conferencias, paneles, podcasts y consultoría de currículo. También formo parte del comité organizador de Design Dinners 2026.",
    ],
    engagements: "Participaciones",
    press: "Prensa",
    inquiries: "Invitaciones",
  },
} satisfies Record<Locale, unknown>

export function speakingMetadata(locale: Locale) {
  const copy = COPY[locale]
  return pageMetadata({
    locale,
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
    alternates: routeAlternates(locale, "speaking"),
  })
}

export function SpeakingPage({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  const engagements = getEngagements(locale)
  const aiPress = getPress(locale).filter((item) => item.ai)

  const speakingPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url(locale, "speaking"),
    url: url(locale, "speaking"),
    name: `${copy.title} | ${SITE_NAME}`,
    description: copy.description,
    inLanguage: locale,
    about: { "@id": "https://gaborene.com/#person" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: copy.home, item: url(locale, "home") },
        { "@type": "ListItem", position: 2, name: copy.heading, item: url(locale, "speaking") },
      ],
    },
  }

  return (
    <main className="flex flex-col flex-1 px-8 pt-32 pb-16 max-w-3xl mx-auto w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakingPageSchema) }}
      />
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100">
            {copy.heading}
          </h1>
        </div>

        <div className="flex flex-col gap-8 max-w-xl text-stone-600 dark:text-stone-400 leading-relaxed">
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <SpeakingGallery locale={locale} />

        <div className="flex flex-col gap-4">
          <p className="text-sm text-stone-600 dark:text-stone-400 uppercase tracking-widest">
            {copy.engagements}
          </p>
          <EngagementList engagements={engagements} className="flex flex-col gap-2 max-w-xl" />
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-sm text-stone-600 dark:text-stone-400 uppercase tracking-widest">
            {copy.press}
          </p>
          <PressList items={aiPress} className="max-w-xl" />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-stone-600 dark:text-stone-400 uppercase tracking-widest">
            {copy.inquiries}
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
