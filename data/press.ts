export interface PressItem {
  source: string
  title: string
  url: string
  year: string
  contribution?: string
  /** Surfaced in the Press list on the Speaking page. */
  ai?: boolean
}

const press: PressItem[] = [
  {
    source: "The World (PRI)",
    title: "Please help",
    url: "https://theworld.org/stories/2017/10/11/please-help-headline",
    year: "2017",
    contribution:
      "Ground liaison — sourced communities, interview subjects, and government contacts for international press coverage of Hurricane María.",
  },
  {
    source: "New York Magazine / Intelligencer",
    title: "Hurricane Maria: A Man-Made Disaster",
    url: "https://nymag.com/intelligencer/2017/12/hurricane-maria-man-made-disaster.html",
    year: "2017",
    contribution:
      "Ground liaison — sourced communities, interview subjects, and government contacts for international press coverage of Hurricane María.",
  },
  {
    source: "News is My Business",
    title:
      "Creativity and tech are 'key to present, future evolution' of brands",
    url: "https://newsismybusiness.com/creativity-and-tech-are-key-to-present-future-evolution-of-brands/",
    year: "2021",
  },
  {
    source: "4As (American Assoc. of Advertising Agencies)",
    title:
      "Gold Lion, two Bronze Lions and seven finalists for de la Cruz in Cannes",
    url: "https://www.aaaa.org/blog/gold-lion-two-bronze-lions-and-seven-finalists-for-de-la-cruz-in-cannes/",
    year: "2022",
  },
  {
    source: "Ogilvy",
    title: "The Eye Tracker, Featured Work",
    url: "https://www.ogilvy.com/work/eye-tracker",
    year: "2022",
  },
  {
    source: "News is My Business",
    title: "DLC Group enhances AI integration across all departments",
    url: "https://newsismybusiness.com/dlc-group-enhances-ai-integration-across-all-departments/",
    year: "2025",
    ai: true,
  },
  {
    source: "WAPA TV",
    title: "Asociación de Relacionistas de Puerto Rico, Convención Anual 2025",
    url: "https://wapa.tv/noticias/negocios/asociaci-n-de-relacionistas-de-puerto-rico-anuncia-su-convenci-n-anual-2025/article_2bfc035b-662a-4c00-9f27-23905de97527.html",
    year: "2025",
    contribution:
      "Pre-convention workshop speaker — “La IA y la publicidad: tendencias.”",
    ai: true,
  },
  {
    source: "El Vocero",
    title:
      "Consumidores confían más en anuncios creados por personas que en IA",
    url: "https://www.elvocero.com/economia/consumidores-conf-an-m-s-en-anuncios-creados-por-personas-que-en-ia/article_336355bf-adfd-4bf0-94b0-fd853385cecd.html",
    year: "2026",
    contribution:
      "Quoted on AI disclosure, perceived authenticity, and the human work required to keep audience trust.",
    ai: true,
  },
]

export default press
