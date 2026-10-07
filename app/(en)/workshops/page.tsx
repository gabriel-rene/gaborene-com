import { WorkshopsPage, workshopsMetadata } from "@/components/pages/workshops"

export const metadata = workshopsMetadata("en")

export default function Workshops() {
  return <WorkshopsPage locale="en" />
}
