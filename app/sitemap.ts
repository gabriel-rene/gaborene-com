import type { MetadataRoute } from "next"
import caseStudies from "@/data/work"

const BASE_URL = "https://gaborene.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudyUrls: MetadataRoute.Sitemap = caseStudies.map((study) => ({
    url: `${BASE_URL}/work/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...caseStudyUrls,
  ]
}
