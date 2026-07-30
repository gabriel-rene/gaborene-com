import type { Metadata } from "next"
import press from "@/data/press"
import timeline, { timelineIntro } from "@/data/timeline"

export const metadata: Metadata = {
  title: "About",
  description:
    "Art director turned Digital Strategy & Technology Executive. Based in Puerto Rico. AI speaker and educator at national and international forums, from the El Salvador National Marketing Association to the International Women's Economic Forum.",
  keywords: [
    "AI speaker Puerto Rico",
    "AI educator Puerto Rico",
    "artificial intelligence Puerto Rico",
    "digital strategy executive Puerto Rico",
    "technology executive Puerto Rico",
    "human-centered AI",
    "Gabriel Rodríguez Rovira",
  ],
  openGraph: {
    title: "About | Gabriel René Rodríguez-Rovira",
    description:
      "Art director turned Digital Strategy & Technology Executive. Based in Puerto Rico. AI speaker and educator at forums from the El Salvador National Marketing Association to the International Women's Economic Forum.",
    url: "https://gaborene.com/about",
  },
  alternates: {
    canonical: "https://gaborene.com/about",
  },
}

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://gaborene.com/about",
  url: "https://gaborene.com/about",
  name: "About | Gabriel René Rodríguez-Rovira",
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
        name: "About",
        item: "https://gaborene.com/about",
      },
    ],
  },
}

export default function About() {
  return (
    <main className="flex flex-col flex-1 px-8 pt-32 pb-16 max-w-3xl mx-auto w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
      />
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100">
            About
          </h1>
        </div>

        <div className="flex flex-col gap-8 max-w-xl text-stone-600 dark:text-stone-400 leading-relaxed">
          <p>
            I started as an art director in Puerto Rico, working across local and
            international advertising clients. When the social media era hit, I
            moved toward digital creative and strategy, and never fully left
            either side.
          </p>
          <p>
            I helped bootstrap two small digital agencies, ran political
            campaigns across the Americas (armored vehicles included), and
            directed a team of 40 digital creatives with a $2M budget. Along
            the way I learned to use Salesforce, HubSpot, Excel, and to care
            about the difference between all three.
          </p>
          <p>
            For the last several years I’ve been at de la Cruz, producing digital
            creative work that has won at Cannes, Effie, Ojo, Cúspide, SME, and
            others. The work I’m most proud of tends to live at the edge of
            strategy and technology.
          </p>
          <p>
            I’ve been speaking and educating on AI, specifically on
            human-centered design and implementation, at forums ranging from the
            El Salvador National Marketing Association to the International
            Women’s Economic Forum. The technology is changing us. Understanding
            it is not optional.
          </p>
          <p>
            Outside of work: food nerd, photographer by habit, perpetually
            curious. Based in Puerto Rico.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-stone-600 dark:text-stone-400 uppercase tracking-widest">
              {timelineIntro.sectionLabel}
            </p>
            <h2 className="font-serif text-2xl md:text-3xl text-stone-900 dark:text-stone-100">
              {timelineIntro.heading}
            </h2>
            <p className="text-stone-600 dark:text-stone-400 leading-relaxed max-w-xl mt-2">
              {timelineIntro.body}
            </p>
          </div>
          <ol className="flex flex-col gap-8 border-l border-stone-200 dark:border-stone-800 pl-6">
            {timeline.map((entry) => (
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
            Press
          </p>
          <ul className="flex flex-col gap-2">
            {press.map(({ source, title, url, year, contribution }) => (
              <li key={url}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-0.5"
                >
                  <span className="text-xs text-stone-600 dark:text-stone-400">
                    {source}, {year}
                  </span>
                  <span className="text-sm text-stone-600 dark:text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors leading-snug">
                    {title}
                  </span>
                  {contribution && (
                    <span className="text-xs text-stone-600 dark:text-stone-400 leading-snug mt-0.5">
                      {contribution}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm text-stone-600 dark:text-stone-400 uppercase tracking-widest">
            Contact
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
