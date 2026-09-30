import type { Metadata } from "next"
import caseStudies from "@/data/work"
import { CaseStudyPage, caseStudyMetadata } from "@/components/pages/case-study"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return caseStudyMetadata("es", slug)
}

export default async function CasoDeEstudio({ params }: Props) {
  const { slug } = await params
  return <CaseStudyPage locale="es" slug={slug} />
}
