import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { getLabProjects } from "@/lib/content"
import { routeAlternates, url, type Locale } from "@/lib/i18n"
import { pageMetadata, SITE_NAME } from "@/lib/site-metadata"

const COPY = {
  en: {
    title: "Lab",
    description:
      "Personal projects in AI, archives, and product: a human-centered writing editor, a vectorized conversation archive, a local-first personal corpus.",
    keywords: [
      "AI experiments",
      "human-centered AI",
      "AI product design",
      "RAG",
      "personal archive",
      "Gabriel Rodríguez Rovira",
    ],
    home: "Home",
    intro:
      "I build to understand. These are personal projects, made on nights and weekends, mostly with AI in the loop. That last part is the point: I teach human-centered AI implementation because I practice it.",
    private: "Private",
    notesTitle: "Notes from the OS",
    notesBody: "Research digests written by the machine, curated by me.",
  },
  es: {
    title: "Lab",
    description:
      "Proyectos personales de IA, archivos y producto: un editor de texto centrado en las personas, un archivo de conversaciones vectorizado y más.",
    keywords: [
      "experimentos con inteligencia artificial",
      "IA centrada en las personas",
      "diseño de productos con IA",
      "RAG",
      "archivo personal",
      "Gabriel Rodríguez Rovira",
    ],
    home: "Inicio",
    intro:
      "Construyo para entender. Estos son proyectos personales, hechos de noche y en fines de semana, casi siempre con IA en el proceso. Eso último es el punto: enseño implementación de IA centrada en las personas porque la practico.",
    private: "Privado",
    notesTitle: "Notes from the OS",
    notesBody: "Resúmenes de investigación escritos por la máquina, curados por mí. En inglés.",
  },
} satisfies Record<Locale, unknown>

export function labMetadata(locale: Locale) {
  const copy = COPY[locale]
  return pageMetadata({
    locale,
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
    alternates: routeAlternates(locale, "lab"),
  })
}

export function LabPage({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  const projects = getLabProjects(locale)

  const labPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": url(locale, "lab"),
    url: url(locale, "lab"),
    name: `${copy.title} | ${SITE_NAME}`,
    description: copy.description,
    inLanguage: locale,
    author: { "@id": "https://gaborene.com/#person" },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: copy.home, item: url(locale, "home") },
        { "@type": "ListItem", position: 2, name: copy.title, item: url(locale, "lab") },
      ],
    },
  }

  return (
    <main className="flex flex-col flex-1 px-8 pt-32 pb-16 max-w-3xl mx-auto w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(labPageSchema) }}
      />
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100">
            {copy.title}
          </h1>
        </div>

        <div className="flex flex-col gap-8 max-w-xl text-stone-600 dark:text-stone-400 leading-relaxed">
          <p>{copy.intro}</p>
        </div>

        <ul className="flex flex-col gap-10">
          {projects.map((project) => (
            <li key={project.name} className="flex flex-col gap-2 max-w-xl">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-serif text-2xl text-stone-900 dark:text-stone-100">
                  {project.name}
                </h2>
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors shrink-0"
                  >
                    GitHub
                    <ExternalLink size={13} />
                  </a>
                ) : (
                  <span className="text-xs text-stone-600 dark:text-stone-400 uppercase tracking-widest shrink-0">
                    {copy.private}
                  </span>
                )}
              </div>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                {project.description}
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400 uppercase tracking-widest">
                {project.stack}
              </p>
            </li>
          ))}
        </ul>

        <Link
          href="/lab/notes"
          hrefLang={locale === "en" ? undefined : "en"}
          className="group flex flex-col gap-2 max-w-xl pt-8 border-t border-stone-200 dark:border-stone-800"
        >
          <h2 className="font-serif text-2xl text-stone-900 dark:text-stone-100 group-hover:text-stone-500 dark:group-hover:text-stone-400 transition-colors flex items-center gap-2">
            <span lang="en">{copy.notesTitle}</span>
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </h2>
          <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
            {copy.notesBody}
          </p>
        </Link>
      </div>
    </main>
  )
}
