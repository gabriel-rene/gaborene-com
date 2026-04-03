import type { Metadata } from "next"
import { RoleSelector } from "@/components/role-selector"

export const metadata: Metadata = {
  alternates: {
    canonical: "https://gaborene.com",
  },
  openGraph: {
    url: "https://gaborene.com",
    type: "profile",
  },
}

export default function Home() {
  return (
    <main className="flex flex-col flex-1 px-8 pt-32 pb-16 max-w-3xl mx-auto w-full">
      <div className="flex flex-col gap-12 flex-1 min-h-0">
        <div className="flex flex-col gap-2">
          <h1 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100">
            Gabriel René <span className="whitespace-nowrap">Rodríguez-Rovira</span>
          </h1>
          <p className="text-stone-500 dark:text-stone-400 text-lg">
            Digital Strategy & Technology Director
          </p>
        </div>

        <div className="flex flex-col gap-3 flex-1 min-h-0">
          <p className="text-sm text-stone-400 dark:text-stone-600 uppercase tracking-widest">
            I am also a
          </p>
          <RoleSelector />
        </div>
      </div>
    </main>
  )
}
