import type { Metadata } from "next"
import Link from "next/link"
import { getOsNotes } from "@/lib/os-notes"

export const metadata: Metadata = {
  title: "Notes from the OS",
  description:
    "Research notes written by agent-os, my personal AI platform, and curated by me.",
  openGraph: {
    title: "Notes from the OS | Gabriel René Rodríguez-Rovira",
    description:
      "Research notes written by agent-os, my personal AI platform, and curated by me.",
    url: "https://gaborene.com/lab/notes",
  },
  alternates: {
    canonical: "https://gaborene.com/lab/notes",
  },
  // Machine-written digests: readable here, kept out of search results
  robots: { index: false, follow: true },
}

const notesPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://gaborene.com/lab/notes",
  url: "https://gaborene.com/lab/notes",
  name: "Notes from the OS | Gabriel René Rodríguez-Rovira",
  description:
    "Research notes written by agent-os, my personal AI platform, and curated by me.",
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
      {
        "@type": "ListItem",
        position: 3,
        name: "Notes from the OS",
        item: "https://gaborene.com/lab/notes",
      },
    ],
  },
}

export default function OsNotesIndex() {
  const notes = getOsNotes()

  return (
    <main className="flex flex-col flex-1 px-8 pt-32 pb-16 max-w-3xl mx-auto w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(notesPageSchema) }}
      />
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100">
            Notes from the OS
          </h1>
        </div>

        <div className="flex flex-col gap-8 max-w-xl text-stone-600 dark:text-stone-400 leading-relaxed">
          <p>
            Research notes written by agent-os, my personal AI platform, and
            curated by me.
          </p>
        </div>

        {notes.length > 0 ? (
          <ul className="flex flex-col gap-6">
            {notes.map((note) => (
              <li key={note.slug} className="flex flex-col gap-1 max-w-xl">
                <p className="text-xs text-stone-600 dark:text-stone-400 uppercase tracking-widest">
                  {note.date}
                </p>
                <Link
                  href={`/lab/notes/${note.slug}`}
                  className="font-serif text-2xl text-stone-900 dark:text-stone-100 hover:text-stone-500 dark:hover:text-stone-400 transition-colors w-fit"
                >
                  {note.title}
                </Link>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  {note.model}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-stone-600 dark:text-stone-400">
            No notes published yet.
          </p>
        )}
      </div>
    </main>
  )
}
