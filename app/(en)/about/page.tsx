import { AboutPage, aboutMetadata } from "@/components/pages/about"

export const metadata = aboutMetadata("en")

export default function About() {
  return <AboutPage locale="en" />
}
