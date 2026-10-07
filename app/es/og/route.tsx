import { ogImage } from "@/components/og-image"

export const dynamic = "force-static"

export function GET() {
  return ogImage("es")
}
