import { SpeakingPage, speakingMetadata } from "@/components/pages/speaking"

export const metadata = speakingMetadata("es")

export default function Conferencias() {
  return <SpeakingPage locale="es" />
}
