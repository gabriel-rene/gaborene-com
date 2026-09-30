"use client"

import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import type { Locale } from "@/lib/i18n"

export function ThemeToggle({ locale }: { locale: Locale }) {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={locale === "es" ? "Cambiar tema" : "Toggle theme"}
      className="text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
    >
      <Sun size={18} className="hidden dark:block" />
      <Moon size={18} className="dark:hidden" />
    </button>
  )
}
