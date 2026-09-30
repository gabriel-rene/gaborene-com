"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { counterpartPath, type Locale } from "@/lib/i18n"

const LABEL: Record<Locale, { text: string; aria: string; lang: Locale }> = {
  en: { text: "ES", aria: "Leer en español", lang: "es" },
  es: { text: "EN", aria: "Read in English", lang: "en" },
}

export function LanguageSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname()
  const { text, aria, lang } = LABEL[locale]

  return (
    <Link
      href={counterpartPath(pathname)}
      hrefLang={lang}
      lang={lang}
      aria-label={aria}
      className="text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
    >
      {text}
    </Link>
  )
}
