import Link from "next/link"

export default function NotFound() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center px-8 pt-32 pb-16 max-w-3xl mx-auto w-full text-center">
      <div className="flex flex-col gap-4">
        <h1 className="font-serif text-4xl md:text-5xl text-stone-900 dark:text-stone-100">
          Not here.
        </h1>
        <p className="text-stone-600 dark:text-stone-400">
          This page does not exist. The work, however, is real.
        </p>
        <div className="flex items-center justify-center gap-6 mt-2">
          <Link
            href="/"
            className="font-serif italic text-stone-900 dark:text-stone-100 hover:text-stone-500 dark:hover:text-stone-400 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/work"
            className="font-serif italic text-stone-900 dark:text-stone-100 hover:text-stone-500 dark:hover:text-stone-400 transition-colors"
          >
            Work
          </Link>
        </div>
      </div>
    </main>
  )
}
