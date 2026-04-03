"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const photos = [
  { src: "/speaking/gabo-camara-de-comercio.jpg", alt: "Speaking at Chamber of Commerce" },
  { src: "/speaking/gabo-cud.jpg", alt: "Speaking engagement" },
  { src: "/speaking/gabo-el-salvador.jpg", alt: "El Salvador National Marketing Association" },
  { src: "/speaking/gabo-prnext-summit.jpg", alt: "PR Next Tourism Summit" },
  { src: "/speaking/gabo-turismo.jpg", alt: "Tourism forum" },
]

export function SpeakingGallery() {
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
      <div className="mt-5 inline-flex gap-1.5 p-1.5 rounded-2xl ring-1 ring-stone-200 dark:ring-stone-800">
        {photos.map((photo) => (
          <motion.button
            key={photo.src}
            onClick={() => setSelected(photo)}
            whileHover={{ scale: 1.06, zIndex: 1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="relative w-14 h-14 rounded-xl overflow-hidden ring-1 ring-stone-200 dark:ring-stone-700 flex-shrink-0 cursor-pointer"
            style={{ position: "relative" }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover"
              sizes="56px"
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setSelected(null)}
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
                alt={selected.alt}
                width={480}
                height={480}
                className="w-full h-auto block"
              />
              <button
                onClick={() => setSelected(null)}
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
