import { LabPage, labMetadata } from "@/components/pages/lab"

export const metadata = labMetadata("en")

export default function Lab() {
  return <LabPage locale="en" />
}
