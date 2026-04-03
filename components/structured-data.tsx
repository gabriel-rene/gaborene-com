const BASE_URL = "https://gaborene.com"

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${BASE_URL}/#person`,
  name: "Gabriel René Rodríguez-Rovira",
  alternateName: ["Gabriel Rene Rodriguez-Rovira", "gaborene"],
  url: BASE_URL,
  email: "gabriel@gaborene.com",
  jobTitle: "Digital Strategy & Technology Director",
  description:
    "Digital Strategy & Technology Director based in Puerto Rico. Speaker and educator on artificial intelligence, human-centered AI design, and emerging technology. Award-winning advertising professional recognized at Cannes Lions, Effie Awards, El Ojo de Iberoamérica, and more.",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Puerto Rico",
    addressCountry: "US",
  },
  knowsAbout: [
    "Artificial Intelligence",
    "AI Strategy",
    "AI Education",
    "Human-Centered AI Design",
    "AI Implementation",
    "Digital Strategy",
    "Technology Direction",
    "Advertising",
    "Creative Direction",
    "Digital Marketing",
    "Augmented Reality",
    "Experiential Marketing",
    "Gamification",
    "Design Thinking",
    "CRM",
    "SEM",
    "SEO",
    "Social Media Strategy",
    "Puerto Rico",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Digital Strategy & Technology Director",
    occupationLocation: {
      "@type": "AdministrativeArea",
      name: "Puerto Rico",
    },
    skills:
      "Digital Strategy, AI Strategy, AI Education, Advertising, Creative Technology",
  },
  award: [
    "Cannes Lions Gold, Mobile Technology / mCommerce",
    "Cannes Lions Bronze, Creative Commerce",
    "Cannes Lions Bronze, Mobile Website",
    "El Ojo de Iberoamérica, Gran Ojo Digital & Social",
    "FIAP Gold, Technological Innovation",
    "The One Show Bronze Pencil, Personalized Digital",
    "Effie Awards Latin America, Finalist",
    "LUUM Awards, Grand Prix",
  ],
  performerIn: [
    {
      "@type": "Event",
      name: "AI and Human-Centered Design Speaker",
      organizer: {
        "@type": "Organization",
        name: "Puerto Rico Association of Advertising Agencies",
        address: { "@type": "PostalAddress", addressRegion: "Puerto Rico" },
      },
    },
    {
      "@type": "Event",
      name: "AI Speaker",
      organizer: {
        "@type": "Organization",
        name: "Puerto Rico Association of Public Relations",
        address: { "@type": "PostalAddress", addressRegion: "Puerto Rico" },
      },
    },
    {
      "@type": "Event",
      name: "AI Panelist and Curriculum Development Consultant",
      organizer: {
        "@type": "EducationalOrganization",
        name: "University of Puerto Rico, Faculty of Communication Studies",
        address: { "@type": "PostalAddress", addressRegion: "Puerto Rico" },
      },
    },
    {
      "@type": "Event",
      name: "AI Speaker and Educator",
      organizer: {
        "@type": "Organization",
        name: "El Salvador National Marketing Association",
      },
    },
    {
      "@type": "Event",
      name: "AI Speaker",
      organizer: {
        "@type": "Organization",
        name: "International Women's Economic Forum",
      },
    },
    {
      "@type": "Event",
      name: "AI Speaker, Puerto Rico Next Tourism Summit",
      organizer: {
        "@type": "Organization",
        name: "Puerto Rico Next Tourism Summit",
        address: { "@type": "PostalAddress", addressRegion: "Puerto Rico" },
      },
    },
    {
      "@type": "Event",
      name: "Recurrent AI Speaker, Chamber of Commerce SMB Forums",
      organizer: {
        "@type": "Organization",
        name: "Puerto Rico Chamber of Commerce",
        address: { "@type": "PostalAddress", addressRegion: "Puerto Rico" },
      },
    },
    {
      "@type": "Event",
      name: "AI Guest, Podcast ADQLEB with Alberto Deida",
      organizer: { "@type": "Organization", name: "ADQLEB Podcast" },
    },
    {
      "@type": "Event",
      name: "AI Guest, Podcast Neptuno Networks The Orbit",
      organizer: { "@type": "Organization", name: "Neptuno Networks" },
    },
  ],
  sameAs: [
    BASE_URL,
    "https://pr.linkedin.com/in/gabrielrene",
    "https://x.com/gabrielrodz",
  ],
  subjectOf: [
    {
      "@type": "NewsArticle",
      headline:
        "Creativity and tech are 'key to present, future evolution' of brands",
      publisher: { "@type": "Organization", name: "News is My Business" },
      url: "https://newsismybusiness.com/creativity-and-tech-are-key-to-present-future-evolution-of-brands/",
      datePublished: "2021-11-11",
    },
    {
      "@type": "NewsArticle",
      headline: "DLC Group enhances AI integration across all departments",
      publisher: { "@type": "Organization", name: "News is My Business" },
      url: "https://newsismybusiness.com/dlc-group-enhances-ai-integration-across-all-departments/",
    },
    {
      "@type": "NewsArticle",
      headline:
        "Gold Lion, two Bronze Lions and seven finalists for de la Cruz in Cannes",
      publisher: {
        "@type": "Organization",
        name: "American Association of Advertising Agencies (4As)",
      },
      url: "https://www.aaaa.org/blog/gold-lion-two-bronze-lions-and-seven-finalists-for-de-la-cruz-in-cannes/",
      datePublished: "2022-06-30",
    },
    {
      "@type": "NewsArticle",
      headline:
        "Asociación de Relacionistas de Puerto Rico anuncia su convención anual 2025",
      description:
        "Listed as speaker: 'La IA y la publicidad: tendencias con Gabriel Rodríguez, Director de Digital Tecnología, De la Cruz Ogilvy.'",
      publisher: {
        "@type": "Organization",
        name: "WAPA TV",
        address: { "@type": "PostalAddress", addressRegion: "Puerto Rico" },
      },
      url: "https://wapa.tv/noticias/negocios/asociaci-n-de-relacionistas-de-puerto-rico-anuncia-su-convenci-n-anual-2025/article_2bfc035b-662a-4c00-9f27-23905de97527.html",
      datePublished: "2025",
    },
  ],
  workExample: [
    {
      "@type": "CreativeWork",
      name: "The Eye Tracker",
      url: "https://www.ogilvy.com/work/eye-tracker",
      description:
        "A geo-referenced mobile tool built on National Hurricane Center storm data, the first street view of a hurricane's projected path, replacing panic buying with personalized supply lists.",
      award: "Cannes Lions Gold, Mobile Technology / mCommerce, 2022",
    },
    {
      "@type": "CreativeWork",
      name: "Reusables",
      url: "https://campaignsoftheworld.com/tech-innovations/reusables-by-supermax/",
      description:
        "AR campaign using computer vision to reveal alternative uses for expired grocery products, redirecting them from landfills.",
    },
    {
      "@type": "CreativeWork",
      name: "Pasaporte a la Aventura",
      url: "https://gaborene.com/work/pasaporte-aventura",
      description:
        "Gamified digital tourism platform for the Puerto Rico Tourism Company using geolocation and RFID across all 78 municipalities.",
    },
  ],
}

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  url: BASE_URL,
  name: "Gabriel René Rodríguez-Rovira",
  description:
    "Portfolio of Gabriel René Rodríguez-Rovira | Digital Strategy & Technology Director and AI educator based in Puerto Rico.",
  author: { "@id": `${BASE_URL}/#person` },
  inLanguage: "en-US",
}

export function SiteStructuredData() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  )
}
