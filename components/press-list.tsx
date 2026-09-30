import type { PressItem } from "@/data/press"

export function PressList({
  items,
  className = "",
}: {
  items: PressItem[]
  className?: string
}) {
  return (
    <ul className={`flex flex-col gap-2 ${className}`}>
      {items.map(({ source, title, url, year, contribution }) => (
        <li key={url}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-0.5"
          >
            <span className="text-xs text-stone-600 dark:text-stone-400">
              {source}, {year}
            </span>
            <span className="text-sm text-stone-600 dark:text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-100 transition-colors leading-snug">
              {title}
            </span>
            {contribution && (
              <span className="text-xs text-stone-600 dark:text-stone-400 leading-snug mt-0.5">
                {contribution}
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  )
}
