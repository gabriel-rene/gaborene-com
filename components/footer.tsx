import Link from "next/link"
import { path, type Locale } from "@/lib/i18n"

const COPY: Record<Locale, { prompt: string; speaking: string }> = {
  en: { prompt: "Exploring a role or booking a talk?", speaking: "Speaking" },
  es: { prompt: "¿Una posición o una charla?", speaking: "Charlas" },
}

export function Footer({ locale }: { locale: Locale }) {
  const copy = COPY[locale]
  return (
    <footer className="px-8 py-10 mt-auto border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-3xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-xs text-stone-600 dark:text-stone-400">
            {copy.prompt}
          </p>
          <a
            href="mailto:gabriel@gaborene.com"
            className="font-serif text-base text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-400 transition-colors w-fit break-all sm:break-normal"
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
            href={path(locale, "speaking")}
            className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          >
            {copy.speaking}
          </Link>
        </div>
      </div>
    </footer>
  )
}
