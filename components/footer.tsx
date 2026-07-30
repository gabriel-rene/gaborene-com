import Link from "next/link"

export function Footer() {
  return (
    <footer className="px-8 py-10 mt-auto border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-3xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-stone-600 dark:text-stone-400 uppercase tracking-widest">
            Exploring a role or booking a talk?
          </p>
          <a
            href="mailto:gabriel@gaborene.com"
            className="font-serif italic text-lg text-stone-900 dark:text-stone-100 hover:text-stone-500 dark:hover:text-stone-400 transition-colors w-fit"
          >
            gabriel@gaborene.com
          </a>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="https://pr.linkedin.com/in/gabrielrene"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://x.com/gabrielrodz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          >
            X / Twitter
          </a>
          <a
            href="https://github.com/gabriel-rene"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          >
            GitHub
          </a>
          <Link
            href="/speaking"
            className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          >
            Speaking
          </Link>
        </div>
      </div>
    </footer>
  )
}
