import type { Metadata } from "next"
import localFont from "next/font/local"
import { ThemeProvider } from "@/components/theme-provider"
import { Nav } from "@/components/nav"
import { SiteStructuredData } from "@/components/structured-data"
import "./globals.css"

const editorialOld = localFont({
  src: [
    { path: "../public/fonts/PPEditorialOld-Ultralight.otf", weight: "200", style: "normal" },
    { path: "../public/fonts/PPEditorialOld-UltralightItalic.otf", weight: "200", style: "italic" },
    { path: "../public/fonts/PPEditorialOld-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/fonts/PPEditorialOld-Italic.otf", weight: "400", style: "italic" },
    { path: "../public/fonts/PPEditorialOld-Bold.otf", weight: "700", style: "normal" },
    { path: "../public/fonts/PPEditorialOld-BoldItalic.otf", weight: "700", style: "italic" },
  ],
  variable: "--font-editorial-old",
})

const neueYork = localFont({
  src: [
    { path: "../public/fonts/PPNeueYork-NormalLight.otf", weight: "300", style: "normal" },
    { path: "../public/fonts/PPNeueYork-NormalLightItalic.otf", weight: "300", style: "italic" },
    { path: "../public/fonts/PPNeueYork-NormalMedium.otf", weight: "500", style: "normal" },
    { path: "../public/fonts/PPNeueYork-NormalMediumItalic.otf", weight: "500", style: "italic" },
  ],
  variable: "--font-neue-york",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://gaborene.com"),
  title: {
    default:
      "Gabriel René Rodríguez-Rovira | Digital Strategy & Technology Director",
    template: "%s | Gabriel René Rodríguez-Rovira",
  },
  description:
    "Digital Strategy & Technology Director based in Puerto Rico. Speaker and educator on AI strategy and human-centered design. Award-winning advertising professional | Cannes Lions, Effie, El Ojo de Iberoamérica.",
  keywords: [
    "AI Puerto Rico",
    "artificial intelligence Puerto Rico",
    "AI educator Puerto Rico",
    "AI speaker Puerto Rico",
    "AI strategist Puerto Rico",
    "AI consultant Puerto Rico",
    "digital strategy Puerto Rico",
    "technology director Puerto Rico",
    "human-centered AI",
    "AI education",
    "AI implementation",
    "advertising Puerto Rico",
    "Cannes Lions Puerto Rico",
    "Gabriel Rodríguez Rovira",
    "gaborene",
  ],
  authors: [
    {
      name: "Gabriel René Rodríguez-Rovira",
      url: "https://gaborene.com",
    },
  ],
  creator: "Gabriel René Rodríguez-Rovira",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gaborene.com",
    siteName: "Gabriel René Rodríguez-Rovira",
    title:
      "Gabriel René Rodríguez-Rovira | Digital Strategy & Technology Director",
    description:
      "Digital Strategy & Technology Director based in Puerto Rico. Speaker and educator on AI strategy and human-centered design. Award-winning advertising professional | Cannes Lions, Effie, El Ojo de Iberoamérica.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Gabriel René Rodríguez-Rovira | Digital Strategy & Technology Director",
    description:
      "Digital Strategy & Technology Director based in Puerto Rico. Speaker and educator on AI strategy and human-centered design.",
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
  alternates: {
    canonical: "https://gaborene.com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${editorialOld.variable} ${neueYork.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 transition-colors">
        <ThemeProvider>
          <SiteStructuredData />
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
