import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center px-8 pt-32 pb-16 max-w-3xl mx-auto w-full text-center">
      <div className="flex flex-col gap-4">
        <h1 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100">
          Aquí no es.
        </h1>
        <p className="text-stone-600 dark:text-stone-400">
          Esta página no existe. El trabajo, en cambio, es real.
        </p>
        <div className="flex items-center justify-center gap-6 mt-2">
          <Link
            href="/es"
            className="font-serif italic text-stone-900 dark:text-stone-100 hover:text-stone-500 dark:hover:text-stone-400 transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/es/trabajo"
            className="font-serif italic text-stone-900 dark:text-stone-100 hover:text-stone-500 dark:hover:text-stone-400 transition-colors"
          >
            Trabajo
          </Link>
        </div>
      </div>
    </main>
  )
}
