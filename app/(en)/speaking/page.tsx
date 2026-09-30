import { SpeakingPage, speakingMetadata } from "@/components/pages/speaking"

export const metadata = speakingMetadata("en")

export default function Speaking() {
  return <SpeakingPage locale="en" />
}
