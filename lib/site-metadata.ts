import type { Metadata, Viewport } from "next"
import { BASE_URL, OG_LOCALE, routeAlternates, url, type Alternates, type Locale } from "@/lib/i18n"

export const SITE_NAME = "Gabriel René Rodríguez-Rovira"

export const JOB_TITLE: Record<Locale, string> = {
  en: "Digital Strategy & Technology Executive",
  es: "Ejecutivo de Estrategia Digital y Tecnología",
}

const DESCRIPTION: Record<Locale, string> = {
  en: "Digital Strategy & Technology Executive in Puerto Rico. AI speaker and educator. Award-winning work at Cannes Lions, Effie, and El Ojo de Iberoamérica.",
  es: "Ejecutivo de Estrategia Digital y Tecnología en Puerto Rico. Conferencista y educador en IA. Trabajo premiado en Cannes Lions y El Ojo de Iberoamérica.",
}

const KEYWORDS: Record<Locale, string[]> = {
  en: [
    "AI Puerto Rico",
    "artificial intelligence Puerto Rico",
    "AI educator Puerto Rico",
    "AI speaker Puerto Rico",
    "AI strategist Puerto Rico",
    "AI consultant Puerto Rico",
    "digital strategy Puerto Rico",
    "technology executive Puerto Rico",
    "human-centered AI",
    "AI education",
    "AI implementation",
    "advertising Puerto Rico",
    "Cannes Lions Puerto Rico",
    "Gabriel Rodríguez Rovira",
    "gaborene",
    "gabrielrodz",
  ],
  es: [
    "inteligencia artificial Puerto Rico",
    "conferencista de inteligencia artificial Puerto Rico",
    "conferencista IA Puerto Rico",
    "educador en IA Puerto Rico",
    "consultor de inteligencia artificial Puerto Rico",
    "adiestramientos de IA para empresas",
    "estrategia digital Puerto Rico",
    "IA centrada en las personas",
    "publicidad Puerto Rico",
    "Cannes Lions Puerto Rico",
    "Gabriel Rodríguez Rovira",
    "gaborene",
    "gabrielrodz",
  ],
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E6E2DD" },
    { media: "(prefers-color-scheme: dark)", color: "#2B2826" },
  ],
}

export function siteMetadata(locale: Locale): Metadata {
  const title = `${SITE_NAME} | ${JOB_TITLE[locale]}`
  return {
    metadataBase: new URL(BASE_URL),
    title: { default: title, template: `%s | ${SITE_NAME}` },
    description: DESCRIPTION[locale],
    keywords: KEYWORDS[locale],
    authors: [{ name: SITE_NAME, url: BASE_URL }],
    creator: SITE_NAME,
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      alternateLocale: OG_LOCALE[locale === "en" ? "es" : "en"],
      url: url(locale, "home"),
      siteName: SITE_NAME,
      title,
      description: DESCRIPTION[locale],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: DESCRIPTION[locale],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: routeAlternates(locale, "home"),
  }
}

/** Page metadata with a complete Open Graph block, since pages replace the layout's. */
export function pageMetadata({
  locale,
  title,
  description,
  alternates,
  keywords,
  type = "website",
  images,
}: {
  locale: Locale
  title: string
  description: string
  alternates: Alternates
  keywords?: string[]
  type?: "website" | "profile" | "article"
  images?: { url: string; alt: string }[]
}): Metadata {
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    openGraph: {
      type,
      locale: OG_LOCALE[locale],
      siteName: SITE_NAME,
      title: `${title} | ${SITE_NAME}`,
      description,
      url: alternates.canonical,
      ...(images ? { images } : {}),
    },
    alternates,
  }
}

/** Trims long copy to the ~155 characters search results show. */
export function metaDescription(text: string, max = 155): string {
  if (text.length <= max) return text
  const firstSentence = text.match(/^.+?[.!?](?=\s|$)/)?.[0]
  if (firstSentence && firstSentence.length <= max && firstSentence.length >= 80) {
    return firstSentence
  }
  const cut = text.slice(0, max - 1)
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.\s]+$/, "")}…`
}
