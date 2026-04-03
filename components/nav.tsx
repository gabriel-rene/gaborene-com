import Link from "next/link"
import { ThemeToggle } from "./theme-toggle"

export function Nav() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-6 backdrop-blur-[14px] [-webkit-backdrop-filter:blur(14px)]">
      <Link
        href="/"
        className="font-serif text-sm tracking-wide text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-400 transition-colors"
      >
        Gabriel René
      </Link>
      <nav className="flex items-center gap-8">
        <Link
          href="/work"
          className="text-sm text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
        >
          Work
        </Link>
        <Link
          href="/about"
          className="text-sm text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
        >
          About
        </Link>
        <ThemeToggle />
      </nav>
    </header>
  )
}
