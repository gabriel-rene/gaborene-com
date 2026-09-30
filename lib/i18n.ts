export type Locale = "en" | "es"

export const BASE_URL = "https://gaborene.com"

const ROUTES = {
  home: { en: "/", es: "/es" },
  work: { en: "/work", es: "/es/trabajo" },
  speaking: { en: "/speaking", es: "/es/conferencias" },
  lab: { en: "/lab", es: "/es/lab" },
  about: { en: "/about", es: "/es/sobre-mi" },
} as const

export type RouteKey = keyof typeof ROUTES

export function path(locale: Locale, key: RouteKey): string {
  return ROUTES[key][locale]
}

export function caseStudyPath(locale: Locale, slug: string): string {
  return `${ROUTES.work[locale]}/${slug}`
}

function absolute(pathname: string): string {
  return pathname === "/" ? BASE_URL : `${BASE_URL}${pathname}`
}

export function url(locale: Locale, key: RouteKey): string {
  return absolute(path(locale, key))
}

export function caseStudyUrl(locale: Locale, slug: string): string {
  return absolute(caseStudyPath(locale, slug))
}

export type Alternates = {
  canonical: string
  languages: Record<Locale | "x-default", string>
}

/** Canonical plus hreflang links for a page that exists in both languages. */
export function alternates(locale: Locale, paths: Record<Locale, string>): Alternates {
  return {
    canonical: absolute(paths[locale]),
    languages: {
      en: absolute(paths.en),
      es: absolute(paths.es),
      "x-default": absolute(paths.en),
    },
  }
}

export function routeAlternates(locale: Locale, key: RouteKey) {
  return alternates(locale, ROUTES[key])
}

export function caseStudyAlternates(locale: Locale, slug: string) {
  return alternates(locale, {
    en: caseStudyPath("en", slug),
    es: caseStudyPath("es", slug),
  })
}

/** The same page in the other language. English-only pages map to their nearest Spanish parent. */
export function counterpartPath(pathname: string): string {
  const clean = pathname.replace(/\/+$/, "") || "/"
  const isSpanish = clean === "/es" || clean.startsWith("/es/")

  for (const { en, es } of Object.values(ROUTES)) {
    if (clean === en) return es
    if (clean === es) return en
  }

  const from = isSpanish ? ROUTES.work.es : ROUTES.work.en
  const to = isSpanish ? ROUTES.work.en : ROUTES.work.es
  if (clean.startsWith(`${from}/`)) return `${to}${clean.slice(from.length)}`

  if (clean.startsWith(`${ROUTES.lab.en}/`)) return ROUTES.lab.es

  return isSpanish ? ROUTES.home.en : ROUTES.home.es
}

export const OG_LOCALE: Record<Locale, string> = { en: "en_US", es: "es_PR" }
