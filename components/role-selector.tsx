"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import identities, { type Identity } from "@/data/identities"
import { SpeakingGallery } from "@/components/speaking-gallery"

export function RoleSelector() {
  const [active, setActive] = useState<Identity | null>(identities[0])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {identities.map((identity) => (
          <button
            key={identity.role}
            onClick={() =>
              setActive(active?.role === identity.role ? null : identity)
            }
            aria-pressed={active?.role === identity.role}
            className={`font-serif text-lg italic transition-colors ${
              active?.role === identity.role
                ? "text-stone-900 dark:text-stone-100"
                : "text-stone-600 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
            }`}
          >
            {identity.role}
            {identity.suffix && active?.role === identity.role && (
              <span className="not-italic text-sm">{identity.suffix}</span>
            )}
          </button>
        ))}
      </div>

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
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed whitespace-pre-line">
                {active.description}
              </p>
              {active.engagements && (
                <ul className="mt-4 space-y-1">
                  {active.engagements.map((e) => (
                    <li
                      key={e}
                      className="text-sm text-stone-600 dark:text-stone-400 before:content-['—'] before:mr-2"
                    >
                      {e}
                    </li>
                  ))}
                </ul>
              )}
              {active.role === "educator on AI" && (
                <>
                  <SpeakingGallery />
                  <Link
                    href="/speaking"
                    className="inline-block mt-4 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                  >
                    More on speaking
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
