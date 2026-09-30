import type { Metadata } from "next"
import { HomePage } from "@/components/pages/home"
import { siteMetadata } from "@/lib/site-metadata"

export const metadata: Metadata = {
  openGraph: { ...siteMetadata("es").openGraph, type: "profile" },
}

export default function Inicio() {
  return <HomePage locale="es" />
}
