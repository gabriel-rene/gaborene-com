"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import type { Locale } from "@/lib/i18n"

const photos = [
  {
    src: "/speaking/gabo-on-stage.jpg",
    alt: {
      en: "On stage, talking about AI",
      es: "En tarima, hablando de IA",
    },
  },
  {
    src: "/speaking/gabo-camara-de-comercio.jpg",
    alt: {
      en: "Speaking at Chamber of Commerce",
      es: "Charla en la Cámara de Comercio",
    },
  },
  {
    src: "/speaking/gabo-cud.jpg",
    alt: {
      en: "Speaking on AI at an industry conference",
      es: "Charla sobre IA en una conferencia de la industria",
    },
  },
  {
    src: "/speaking/gabo-el-salvador.jpg",
    alt: {
      en: "El Salvador National Marketing Association",
      es: "Asociación Nacional de Mercadeo de El Salvador",
    },
  },
  {
    src: "/speaking/gabo-prnext-summit.jpg",
    alt: {
      en: "PR Next Tourism Summit",
      es: "PR Next Tourism Summit",
    },
  },
  {
    src: "/speaking/gabo-turismo.jpg",
    alt: {
      en: "Speaking at a tourism industry forum",
      es: "Charla en un foro de la industria turística",
    },
  },
]

const LABELS: Record<Locale, { view: string; close: string }> = {
  en: { view: "View photo", close: "Close photo" },
  es: { view: "Ver foto", close: "Cerrar foto" },
}

export function SpeakingGallery({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState<(typeof photos)[0] | null>(null)

  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selected])

  return (
    <>
      <div className="relative mt-5 w-full">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-0.5 bg-stone-200 dark:bg-stone-800" />
        <div className="relative grid grid-cols-6 gap-2">
          {photos.map((photo) => (
            <motion.button
              key={photo.src}
              onClick={() => setSelected(photo)}
              whileHover={{ scale: 1.04, zIndex: 1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="relative aspect-square w-full rounded-xl overflow-hidden cursor-pointer"
              aria-label={`${LABELS[locale].view}: ${photo.alt[locale]}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt[locale]}
                fill
                className="object-cover"
                sizes="(max-width: 576px) 17vw, 96px"
              />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setSelected(null)}
            role="dialog"
            aria-modal="true"
            aria-label={selected.alt[locale]}
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/50 backdrop-blur-sm p-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 6 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xs w-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-stone-200 dark:ring-stone-700"
            >
              <Image
                src={selected.src}
                alt={selected.alt[locale]}
                width={480}
                height={480}
                className="w-full h-auto block"
              />
              <button
                onClick={() => setSelected(null)}
                aria-label={LABELS[locale].close}
                className="absolute top-2.5 right-2.5 p-1 rounded-full bg-stone-950/40 text-white hover:bg-stone-950/60 transition-colors"
              >
                <X size={13} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
