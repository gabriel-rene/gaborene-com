"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import type { Identity } from "@/data/identities"
import { path, type Locale } from "@/lib/i18n"
import { SpeakingGallery } from "@/components/speaking-gallery"
import { EngagementList } from "@/components/engagement-list"

const MORE_ON_SPEAKING: Record<Locale, string> = {
  en: "More on speaking",
  es: "Más sobre mis charlas",
}

export function RoleSelector({
  locale,
  identities,
}: {
  locale: Locale
  identities: Identity[]
}) {
  const [active, setActive] = useState<Identity | null>(identities[0])

  return (
    <div className="flex flex-col gap-6">
      <ul className="flex flex-col">
        {identities.map((identity) => {
          const isActive = active?.role === identity.role
          return (
            <li key={identity.role}>
              <button
                onClick={() => setActive(isActive ? null : identity)}
                aria-pressed={isActive}
                className={`text-left font-serif text-base md:text-lg leading-snug transition-colors ${
                  isActive
                    ? "text-stone-900 dark:text-stone-100"
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
                }`}
              >
                {identity.role}
                {identity.suffix && isActive && (
                  <span className="block sm:inline text-xs text-stone-600 dark:text-stone-400">
                    {identity.suffix}
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>

      <div>
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.role}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="max-w-xl"
            >
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed whitespace-pre-line text-pretty">
                {active.description}
              </p>
              {active.engagements && (
                <>
                  <EngagementList
                    engagements={active.engagements}
                    className="mt-6 space-y-1.5"
                  />
                  <SpeakingGallery locale={locale} />
                  <Link
                    href={path(locale, "speaking")}
                    className="inline-block mt-5 text-xs text-stone-600 dark:text-stone-400 underline underline-offset-4 decoration-stone-400 dark:decoration-stone-600 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                  >
                    {MORE_ON_SPEAKING[locale]}
                  </Link>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
