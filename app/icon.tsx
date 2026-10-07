import { siteIcon } from "@/components/site-icon"

export const size = { width: 64, height: 64 }
export const contentType = "image/png"

export default function Icon() {
  return siteIcon(size.width)
}
