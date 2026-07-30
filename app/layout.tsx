import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"
import { ThemeProvider } from "@/components/theme-provider"
import { MotionProvider } from "@/components/motion-provider"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { SiteStructuredData } from "@/components/structured-data"
import "./globals.css"

const datatype = localFont({
  src: [
    { path: "./fonts/Datatype-Variable.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-datatype",
  display: "swap",
})

const neueYork = localFont({
  src: [
    { path: "./fonts/PPNeueYork-NormalLight.otf", weight: "300", style: "normal" },
    { path: "./fonts/PPNeueYork-NormalLightItalic.otf", weight: "300", style: "italic" },
  ],
  variable: "--font-neue-york",
  display: "swap",
})

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#E0D7D7" },
    { media: "(prefers-color-scheme: dark)", color: "#312424" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://gaborene.com"),
  title: {
    default:
      "Gabriel René Rodríguez-Rovira | Digital Strategy & Technology Executive",
    template: "%s | Gabriel René Rodríguez-Rovira",
  },
  description:
    "Digital Strategy & Technology Executive based in Puerto Rico. Speaker and educator on AI strategy and human-centered design. Award-winning advertising professional | Cannes Lions, Effie, El Ojo de Iberoamérica.",
  keywords: [
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
      "Gabriel René Rodríguez-Rovira | Digital Strategy & Technology Executive",
    description:
      "Digital Strategy & Technology Executive based in Puerto Rico. Speaker and educator on AI strategy and human-centered design. Award-winning advertising professional | Cannes Lions, Effie, El Ojo de Iberoamérica.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Gabriel René Rodríguez-Rovira | Digital Strategy & Technology Executive",
    description:
      "Digital Strategy & Technology Executive based in Puerto Rico. Speaker and educator on AI strategy and human-centered design.",
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
      className={`${datatype.variable} ${neueYork.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 transition-colors">
        <ThemeProvider>
          <MotionProvider>
            <SiteStructuredData />
            <Nav />
            {children}
            <Footer />
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
