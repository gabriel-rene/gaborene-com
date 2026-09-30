import Script from "next/script"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { MotionProvider } from "@/components/motion-provider"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { SiteStructuredData } from "@/components/structured-data"
import { datatype, neueYork } from "@/lib/fonts"
import type { Locale } from "@/lib/i18n"

/** The <html> document shared by the English and Spanish root layouts. */
export function SiteDocument({
  locale,
  children,
}: {
  locale: Locale
  children: React.ReactNode
}) {
  return (
    <html
      lang={locale}
      className={`${datatype.variable} ${neueYork.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 transition-colors">
        <ThemeProvider>
          <MotionProvider>
            <SiteStructuredData />
            <Nav locale={locale} />
            {children}
            <Footer locale={locale} />
          </MotionProvider>
        </ThemeProvider>
        <Analytics />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DQ8RPWNDH5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DQ8RPWNDH5');
          `}
        </Script>
      </body>
    </html>
  )
}
