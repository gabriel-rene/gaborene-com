import type { Engagement } from "@/data/identities"

export function EngagementList({
  engagements,
  className = "",
}: {
  engagements: Engagement[]
  className?: string
}) {
  return (
    <ul className={className}>
      {engagements.map(({ label, url }) => (
        <li
          key={label}
          className="text-sm text-stone-600 dark:text-stone-400 before:content-['—'] before:mr-2 leading-snug"
        >
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-stone-400 dark:decoration-stone-600 underline-offset-2 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
            >
              {label}
            </a>
          ) : (
            label
          )}
        </li>
      ))}
    </ul>
  )
}
