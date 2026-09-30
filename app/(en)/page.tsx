import type { Metadata } from "next"
import { HomePage } from "@/components/pages/home"
import { siteMetadata } from "@/lib/site-metadata"

export const metadata: Metadata = {
  openGraph: { ...siteMetadata("en").openGraph, type: "profile" },
}

export default function Home() {
  return <HomePage locale="en" />
}
