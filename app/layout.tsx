import type { Metadata } from "next"
import { Instrument_Serif } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Nav } from "@/components/nav"
import { SiteStructuredData } from "@/components/structured-data"
import "./globals.css"

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://gaborene.com"),
  title: {
    default:
      "Gabriel René Rodríguez-Rovira — Digital Strategy & Technology Director",
    template: "%s — Gabriel René Rodríguez-Rovira",
  },
  description:
    "Digital Strategy & Technology Director based in Puerto Rico. Speaker and educator on AI strategy and human-centered design. Award-winning advertising professional — Cannes Lions, Effie, El Ojo de Iberoamérica.",
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
      "Gabriel René Rodríguez-Rovira — Digital Strategy & Technology Director",
    description:
      "Digital Strategy & Technology Director based in Puerto Rico. Speaker and educator on AI strategy and human-centered design. Award-winning advertising professional — Cannes Lions, Effie, El Ojo de Iberoamérica.",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Gabriel René Rodríguez-Rovira — Digital Strategy & Technology Director",
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
      className={`${instrumentSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-stone-50 dark:bg-[#4B3B47] text-[#4B3B47] dark:text-stone-100 transition-colors">
        <ThemeProvider>
          <SiteStructuredData />
          <Nav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
