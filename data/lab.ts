export interface LabProject {
  name: string
  description: string
  stack: string
  github?: string
}

const labProjects: LabProject[] = [
  {
    name: "Margin Muse",
    description:
      "A writing editor that feels like paper, where the AI asks questions about your prose instead of rewriting it. My working thesis on human-centered AI, shipped as a product: the machine interrogates, the human writes.",
    stack: "Next.js · Tiptap · Anthropic API",
    github: "https://github.com/gabriel-rene/margin-muse",
  },
  {
    name: "Conversations",
    description:
      "A platform that transforms years of WhatsApp history (text and voice notes) between two co-parents into a vectorized, queryable knowledge base with visualization and a RAG interface. Built with consent from both sides, PII redaction as a first-class pipeline stage, and three audiences from one pipeline: a private archive for me and my daughter, a redacted public piece, and a feed of ideas worth keeping.",
    stack:
      "Python · Presidio · Supabase pgvector · Gemini · Claude · Next.js · D3",
  },
  {
    name: "Personal Corpus",
    description:
      "A local-first, queryable archive of everything I’ve authored across channels and time: tweets, WhatsApp messages, voice notes, journal entries, blog posts, and podcast turns, normalized into a single timeline. A private second brain, and a legacy archive for my daughter. Nothing leaves the machine.",
    stack: "Python · local embeddings",
  },
  {
    name: "World Cup 26",
    description:
      "Visualizes World Cup 2026 data against public country data, GDP, population, weather, looking for fun correlations. Built because the question was fun.",
    stack: "TypeScript",
    github: "https://github.com/gabriel-rene/world-cup-26",
  },
  {
    name: "El Ancón de Loíza",
    description:
      "A 3D reconstruction of the hand-powered river ferry that crossed the Río Grande de Loíza from the 1820s until a bridge replaced it in 1986. Pick a decade and watch the ferry, the mangroves and the crossing change. Every detail comes from a sourced research dossier; anything inferred is labeled as inferred. Work in progress.",
    stack: "React Three Fiber · TypeScript · OpenStreetMap",
    github: "https://github.com/gabriel-rene/ancon-de-loiza",
  },
  {
    name: "Style Repo",
    description:
      "A browsable reference library of graphic design, illustration and typographic styles, from Victorian ephemera to WPA posters. One YAML file per style, enriched from Getty AAT, Wikidata and open-license museum images. Dates and origins that I can’t verify stay out.",
    stack: "Astro · Node · SQLite · Wikidata",
    github: "https://github.com/gabriel-rene/style-repo",
  },
  {
    name: "gaborene.com",
    description:
      "This site. Statically generated, obsessively small, and part of the experiment: designed and built end to end with AI in the loop.",
    stack: "Next.js · Tailwind · Framer Motion",
    github: "https://github.com/gabriel-rene/gaborene-com",
  },
]

export default labProjects
