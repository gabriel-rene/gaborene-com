import Link from "next/link"
import { path, type Locale, type RouteKey } from "@/lib/i18n"
import { ThemeToggle } from "./theme-toggle"
import { LanguageSwitch } from "./language-switch"

const LINKS: { key: RouteKey; label: Record<Locale, string> }[] = [
  { key: "work", label: { en: "Work", es: "Trabajo" } },
  { key: "speaking", label: { en: "Speaking", es: "Charlas" } },
  { key: "lab", label: { en: "Lab", es: "Lab" } },
  { key: "about", label: { en: "About", es: "Sobre mí" } },
]

export function Nav({ locale }: { locale: Locale }) {
  return (
    <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 px-8 py-6 backdrop-blur-[14px] [-webkit-backdrop-filter:blur(14px)]">
      <Link
        href={path(locale, "home")}
        className="order-1 font-serif text-sm tracking-wide text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-400 transition-colors"
      >
        Gabriel René
      </Link>
      <nav className="order-3 flex w-full items-center gap-6 sm:order-2 sm:ml-auto sm:w-auto sm:gap-8">
        {LINKS.map(({ key, label }) => (
          <Link
            key={key}
            href={path(locale, key)}
            className="whitespace-nowrap text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
          >
            {label[locale]}
          </Link>
        ))}
      </nav>
      <div className="order-2 flex items-center gap-6 sm:order-3 sm:gap-8">
        <LanguageSwitch locale={locale} />
        <ThemeToggle locale={locale} />
      </div>
    </header>
  )
}
