import type { Metadata } from "next"
import { ExternalLink } from "lucide-react"
import labProjects from "@/data/lab"

export const metadata: Metadata = {
  title: "Lab",
  description:
    "Personal projects and experiments in AI, archives, and product: a human-centered writing editor, a vectorized conversation archive, a local-first personal corpus, and more.",
  keywords: [
    "AI experiments",
    "human-centered AI",
    "AI product design",
    "RAG",
    "personal archive",
    "Gabriel Rodríguez Rovira",
  ],
  openGraph: {
    title: "Lab | Gabriel René Rodríguez-Rovira",
    description:
      "Personal projects and experiments in AI, archives, and product.",
    url: "https://gaborene.com/lab",
  },
  alternates: {
    canonical: "https://gaborene.com/lab",
  },
}

const labPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://gaborene.com/lab",
  url: "https://gaborene.com/lab",
  name: "Lab | Gabriel René Rodríguez-Rovira",
  description:
    "Personal projects and experiments in AI, archives, and product.",
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
        name: "Lab",
        item: "https://gaborene.com/lab",
      },
    ],
  },
}

export default function Lab() {
  return (
    <main className="flex flex-col flex-1 px-8 pt-32 pb-16 max-w-3xl mx-auto w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(labPageSchema) }}
      />
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100">
            Lab
          </h1>
        </div>

        <div className="flex flex-col gap-8 max-w-xl text-stone-600 dark:text-stone-400 leading-relaxed">
          <p>
            I build to understand. These are personal projects, made on nights
            and weekends, mostly with AI in the loop. That last part is the
            point: I teach human-centered AI implementation because I practice
            it.
          </p>
        </div>

        <ul className="flex flex-col gap-10">
          {labProjects.map((project) => (
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
                    Private
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
      </div>
    </main>
  )
}
