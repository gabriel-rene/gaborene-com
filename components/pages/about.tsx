import { PressList } from "@/components/press-list"
import { getPress, getTimeline } from "@/lib/content"
import { routeAlternates, url, type Locale } from "@/lib/i18n"
import { pageMetadata, SITE_NAME } from "@/lib/site-metadata"

const COPY = {
  en: {
    title: "About",
    description:
      "Art director turned Digital Strategy & Technology Executive in Puerto Rico. AI speaker and educator at forums across the Americas.",
    keywords: [
      "AI speaker Puerto Rico",
      "AI educator Puerto Rico",
      "artificial intelligence Puerto Rico",
      "digital strategy executive Puerto Rico",
      "technology executive Puerto Rico",
      "human-centered AI",
      "Gabriel Rodríguez Rovira",
    ],
    home: "Home",
    paragraphs: [
      "I started as an art director in Puerto Rico, working across local and international advertising clients. When the social media era hit, I moved toward digital creative and strategy, and never fully left either side.",
      "I helped bootstrap two small digital agencies, ran political campaigns across the Americas (armored vehicles included), and directed a team of 40 digital creatives with a $2M budget. Along the way I learned to use Salesforce, HubSpot, Excel, and to care about the difference between all three.",
      "For the last several years I’ve been at de la Cruz, producing digital creative work that has won at Cannes, Effie, Ojo, Cúspide, SME, and others. The work I’m most proud of tends to live at the edge of strategy and technology.",
      "I’ve been speaking and educating on technology and AI, specifically on human-centered design and implementation, at forums ranging from the Puerto Rico Advertising Conference to the El Salvador National Marketing Association and the International Women’s Economic Forum. I’m also on the 2026 organizing committee for Design Dinners. The technology is changing us. Understanding it is not optional.",
      "Outside of work: food nerd, photographer by habit, perpetually curious. Based in Puerto Rico.",
    ],
    press: "Press",
    contact: "Contact",
  },
  es: {
    title: "Sobre mí",
    description:
      "De director de arte a Ejecutivo de Estrategia Digital y Tecnología en Puerto Rico. Conferencista y educador en IA en foros por toda América.",
    keywords: [
      "conferencista de inteligencia artificial Puerto Rico",
      "educador en IA Puerto Rico",
      "inteligencia artificial Puerto Rico",
      "estrategia digital Puerto Rico",
      "ejecutivo de tecnología Puerto Rico",
      "IA centrada en las personas",
      "Gabriel Rodríguez Rovira",
    ],
    home: "Inicio",
    paragraphs: [
      "Empecé como director de arte en Puerto Rico, trabajando para clientes publicitarios locales e internacionales. Cuando llegó la era de las redes sociales, me moví hacia lo creativo y la estrategia digital, y nunca solté del todo ninguno de los dos lados.",
      "Ayudé a levantar dos agencias digitales pequeñas, trabajé campañas políticas por las Américas (vehículos blindados incluidos) y dirigí un equipo de 40 creativos digitales con un presupuesto de $2M. En el camino aprendí a usar Salesforce, HubSpot y Excel, y a que me importe la diferencia entre los tres.",
      "Llevo varios años en de la Cruz, produciendo trabajo creativo digital que ha ganado en Cannes, Effie, Ojo, Cúspide, SME y otros. El trabajo del que más orgulloso estoy suele vivir en la frontera entre la estrategia y la tecnología.",
      "He dado charlas y educado sobre tecnología e IA, específicamente sobre su diseño e implementación centrados en las personas, en foros que van desde la Puerto Rico Advertising Conference hasta la Asociación Nacional de Mercadeo de El Salvador y el International Women’s Economic Forum. También formo parte del comité organizador de Design Dinners 2026. La tecnología nos está cambiando. Entenderla no es opcional.",
      "Fuera del trabajo: nerd de la comida, fotógrafo por costumbre, curioso a tiempo completo. Vivo en Puerto Rico.",
    ],
    press: "Prensa",
    contact: "Contacto",
  },
} satisfies Record<Locale, unknown>

export function aboutMetadata(locale: Locale) {
  const copy = COPY[locale]
  return pageMetadata({
    locale,
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
    type: "profile",
    alternates: routeAlternates(locale, "about"),
  })
}

export function AboutPage({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  const { intro, entries } = getTimeline(locale)
  const press = getPress(locale)

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": url(locale, "about"),
    url: url(locale, "about"),
    name: `${copy.title} | ${SITE_NAME}`,
    inLanguage: locale,
    about: { "@id": "https://gaborene.com/#person" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: copy.home, item: url(locale, "home") },
        { "@type": "ListItem", position: 2, name: copy.title, item: url(locale, "about") },
      ],
    },
  }

  return (
    <main className="flex flex-col flex-1 px-8 pt-32 pb-16 max-w-3xl mx-auto w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100">
            {copy.title}
          </h1>
        </div>

        <div className="flex flex-col gap-8 max-w-xl text-stone-600 dark:text-stone-400 leading-relaxed">
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-stone-600 dark:text-stone-400 uppercase tracking-widest">
              {intro.sectionLabel}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-stone-900 dark:text-stone-100">
              {intro.heading}
            </h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed max-w-xl mt-2">
              {intro.body}
            </p>
          </div>
          <ol className="flex flex-col gap-8 border-l border-stone-200 dark:border-stone-800 pl-6">
            {entries.map((entry) => (
              <li key={entry.headline} className="flex flex-col gap-1.5 max-w-xl">
                <p className="text-xs text-stone-600 dark:text-stone-400 uppercase tracking-widest">
                  {entry.yearRange} · {entry.label}
                </p>
                <h3 className="font-serif text-xl text-stone-900 dark:text-stone-100">
                  {entry.headline}
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed whitespace-pre-line">
                  {entry.body}
                </p>
                {entry.highlights && (
                  <ul className="mt-2 flex flex-col gap-1">
                    {entry.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="text-xs text-stone-600 dark:text-stone-400 uppercase tracking-wider"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-sm text-stone-600 dark:text-stone-400 uppercase tracking-widest">
            {copy.press}
          </p>
          <PressList items={press} />
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-stone-600 dark:text-stone-400 uppercase tracking-widest">
            {copy.contact}
          </p>
          <a
            href="mailto:gabriel@gaborene.com"
            className="font-serif italic text-stone-900 dark:text-stone-100 hover:text-stone-500 dark:hover:text-stone-400 transition-colors"
          >
            gabriel@gaborene.com
          </a>
          <div className="flex gap-4 mt-1">
            <a
              href="https://pr.linkedin.com/in/gabrielrene"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://x.com/gabrielrodz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
            >
              X / Twitter
            </a>
            <a
              href="https://github.com/gabriel-rene"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}
