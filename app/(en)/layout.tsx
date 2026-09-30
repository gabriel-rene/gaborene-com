import { SiteDocument } from "@/components/site-document"
import { siteMetadata } from "@/lib/site-metadata"
import "../globals.css"

export { viewport } from "@/lib/site-metadata"

export const metadata = siteMetadata("en")

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <SiteDocument locale="en">{children}</SiteDocument>
}
