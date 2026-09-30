import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { marked } from "marked"
import { getOsNotes } from "@/lib/os-notes"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getOsNotes().map((note) => ({ slug: note.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const note = getOsNotes().find((n) => n.slug === slug)
  if (!note) return {}
  return {
    title: note.title,
    description: note.title,
    openGraph: {
      title: `${note.title} | Gabriel René Rodríguez-Rovira`,
      description: note.title,
      url: `https://gaborene.com/lab/notes/${slug}`,
    },
    alternates: {
      canonical: `https://gaborene.com/lab/notes/${slug}`,
    },
    robots: { index: false, follow: true },
  }
}

export default async function OsNote({ params }: Props) {
  const { slug } = await params
  const note = getOsNotes().find((n) => n.slug === slug)
  if (!note) notFound()

  const html = await marked.parse(note.body)

  const noteSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://gaborene.com/lab/notes/${note.slug}`,
    url: `https://gaborene.com/lab/notes/${note.slug}`,
    name: note.title,
    headline: note.title,
    author: { "@id": "https://gaborene.com/#person" },
    datePublished: note.date,
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
        {
          "@type": "ListItem",
          position: 4,
          name: note.title,
          item: `https://gaborene.com/lab/notes/${note.slug}`,
        },
      ],
    },
  }

  return (
    <main className="flex flex-col flex-1 px-8 pt-32 pb-16 max-w-3xl mx-auto w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(noteSchema) }}
      />
      <div className="flex flex-col gap-10">
        <Link
          href="/lab/notes"
          className="flex items-center gap-1.5 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors w-fit"
        >
          <ArrowLeft size={13} />
          Notes from the OS
        </Link>

        <div className="flex flex-col gap-4">
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100">
            {note.title}
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Written by agent-os ({note.model}) · curated by Gabriel ·{" "}
            {note.date}
            {note.sourceUrl && (
              <>
                {" "}
                ·{" "}
                <a
                  href={note.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  source
                </a>
              </>
            )}
          </p>
        </div>

        <div
          className="flex flex-col gap-4 max-w-xl text-stone-600 dark:text-stone-400 leading-relaxed [&_h1]:font-serif [&_h1]:text-3xl [&_h1]:text-stone-900 dark:[&_h1]:text-stone-100 [&_h1]:mt-4 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-stone-900 dark:[&_h2]:text-stone-100 [&_h2]:mt-4 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:text-stone-900 dark:[&_h3]:text-stone-100 [&_h3]:mt-2 [&_p]:leading-relaxed [&_a]:underline [&_a]:hover:text-stone-900 dark:[&_a]:hover:text-stone-100 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:leading-relaxed [&_strong]:text-stone-900 dark:[&_strong]:text-stone-100 [&_code]:text-sm [&_code]:bg-stone-100 dark:[&_code]:bg-stone-900 [&_code]:px-1 [&_code]:py-0.5 [&_blockquote]:border-l-2 [&_blockquote]:border-stone-300 dark:[&_blockquote]:border-stone-700 [&_blockquote]:pl-5"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </main>
  )
}
