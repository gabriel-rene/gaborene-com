import type { Metadata } from "next"
import Link from "next/link"
import { SiteDocument } from "@/components/site-document"
import { BASE_URL } from "@/lib/i18n"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "404 | Gabriel René Rodríguez-Rovira",
  robots: { index: false, follow: true },
}

export default function GlobalNotFound() {
  return (
    <SiteDocument locale="en">
      <main className="flex flex-col flex-1 items-center justify-center px-8 pt-32 pb-16 max-w-3xl mx-auto w-full text-center">
        <div className="flex flex-col gap-4">
          <h1 className="font-serif text-2xl md:text-3xl text-stone-900 dark:text-stone-100">
            Not here.
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            This page does not exist. The work, however, is real.
          </p>
          <p lang="es" className="text-stone-600 dark:text-stone-400">
            Esta página no existe. El trabajo, en cambio, es real.
          </p>
          <div className="flex items-center justify-center gap-6 mt-2">
            <Link
              href="/"
              className="font-serif italic text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/es"
              lang="es"
              className="font-serif italic text-stone-900 dark:text-stone-100 hover:text-stone-600 dark:hover:text-stone-400 transition-colors"
            >
              Inicio
            </Link>
          </div>
        </div>
      </main>
    </SiteDocument>
  )
}
