export interface CaseStudy {
  slug: string
  title: string
  client: string
  year: number | string
  category: string
  youtubeId: string
  summary: string
  body: string
  awards?: string[]
}

const caseStudies: CaseStudy[] = [
  {
    slug: "car-parts-for-life",
    title: "Car Parts for Life",
    client: "Fundación Stefano Steenbakkers Betancourt",
    year: 2024,
    category: "Social Impact",
    youtubeId: "xOA6ckt_QNw",
    summary:
      "A social impact campaign that uses donated car parts as a visual metaphor for organ donation — showing cars that have received 'transplants' from other vehicles to inspire registrations at donaorganos.com.",
    body: `In collaboration with partners like Plaza Las Américas and Plaza Del Caribe, the initiative features cars that have received "transplants" of spare parts from other vehicles. This visual storytelling simplifies the concept of organ donation and inspires registrations through the website donaorganos.com.

The campaign was created for the Fundación Stefano Steenbakkers Betancourt by de la Cruz (Ogilvy), and has been recognized for its creativity and positive social impact across several major festivals.`,
    awards: [
      "LUUM Awards 2024 — Campaign of the Year",
      "LUUM Awards 2024 — Grand Prix: Causes / Partnerships to Achieve Goals",
      "LUUM Awards 2024 — Grand Prix: Institutional Communication",
      "LUUM Awards 2024 — Gold (×4): Society, Campaigns, Solidarity",
      "LUUM Awards 2024 — Silver: Essence of the Message",
      "El Ojo de Iberoamérica 2024 — Silver (×3): Media, Sustainable, Health & Pharma",
      "El Ojo de Iberoamérica 2024 — Bronze (×2): Media, Vía Pública",
      "Effie Awards Latin America 2025 — Finalist: Engaged Community",
      "Effie Awards Latin America 2025 — Finalist: Positive Impact",
      "SME Digital Awards 2025 — Featured Winner",
    ],
  },
  {
    slug: "summon-the-king",
    title: "Summon the King",
    client: "Burger King Puerto Rico",
    year: 2024,
    category: "Experiential",
    youtubeId: "piQBrN6vMrU",
    summary:
      "A Halloween campaign built around the legend of a 'haunted' Burger King. Customers visited closed restaurant locations and performed a ritual — saying 'Burger King' three times — to unlock a free Whopper. Turned ghost stories into the busiest nights those restaurants had seen.",
    body: `To generate interest around Halloween, Burger King launched a campaign in Puerto Rico centered on the legend of a haunted restaurant. They collaborated with a popular ghost-hunting podcast duo to document an investigation of the location, and encouraged customers to visit closed Burger King locations to perform a ritual — saying "Burger King" three times — in order to receive a free Whopper.

The campaign used billboards and TV spots to drive traffic to these closed locations, resulting in an immersive experience where the stores were reopened for the promotion.

The campaign successfully turned previously closed restaurants into the busiest locations in town within just two nights.`,
  },
  {
    slug: "pasaporte-aventura",
    title: "Pasaporte a la Aventura",
    client: "Puerto Rico Tourism Company",
    year: "2023–2025",
    category: "Digital Product",
    youtubeId: "9OajWYkrwHQ",
    summary:
      "A gamified digital tourism platform that turned a popular physical passport into a mobile experience — using geolocation and RFID to drive exploration across Puerto Rico's 78 municipalities, with badges, competition, and monthly prizes.",
    body: `In 2021, the Puerto Rico Tourism Company launched "Una Isla, 78 Destinos" — a campaign featuring a physical tourism passport designed to boost local exploration. The passport unexpectedly became a sensation, revealing a public appetite for interactive and competitive exploration. But it had real limitations: hard to carry, impossible to update with new events, and supply frequently failed to meet demand.

In 2023, the Puerto Rico Tourism Company unveiled Passport to Adventure — a gamified digital platform allowing users to explore over 700 destinations, collect digital badges, and compete for monthly prizes. Groundbreaking use of geolocation technology coupled with RFID-enabled signage facilitated physical check-ins at locations across the island.

Using Design Thinking methodology, the platform was built around user-centric and accessible design on mobile devices. The initiative was an unprecedented success — boosting the local economy across all 78 municipalities and generating crucial data on local tourist behavior to inform future improvements.`,
    awards: [
      "SME Digital Awards 2024 — Gold: Digital User Experience and Interface Design",
      "SME Digital Awards 2024 — Gold: Tech Solution Development",
    ],
  },
  {
    slug: "reusables",
    title: "Reusables",
    client: "SuperMax",
    year: 2022,
    category: "AR Campaign",
    youtubeId: "8SFiQcivBv8",
    summary:
      "An AR campaign that reframes 'use by' labels — using computer vision to reveal alternative uses for expired grocery products and redirect them from landfills.",
    body: `Nearly one-third of all food sold at grocery stores ends up in the trash when items reach their "use by" date. These dates create a false sense of urgency, and many consumers treat them as hard expiration dates when they're only estimates of peak quality.

SuperMax — the biggest online grocery store in Puerto Rico — created REUSABLES to shift that behavior. Using augmented reality on Instagram and the reusables.ai website, customers could point their smartphone camera at the labels of participating products. The filter instantly transformed the label to display alternative uses for the product after expiration — preventing it from going to landfill. The "Use By" label became a "Use For" prompt.

When alternative uses were shown, users could visit the site to view tutorials on how to apply each life hack. The campaign reframed a waste problem as an opportunity, using technology to create behavioral change at the point of purchase.`,
    awards: [
      "FIAP Awards 2023 — Bronze: Best Sustainability Campaign",
      "FIAP Awards 2023 — Bronze: Mobile Innovation",
      "FIAP Awards 2023 — Bronze: Best Program Launch Strategy",
      "Cannes Lions 2023 — Contender",
    ],
  },
  {
    slug: "night-mission",
    title: "Night Mission",
    client: "Burger King Puerto Rico",
    year: 2022,
    category: "Experiential / AR",
    youtubeId: "rCgDxve6fcI",
    summary:
      "An immersive offline experience tying Burger King Puerto Rico to the Call of Duty: Modern Warfare II launch — AR night-vision filters, remodeled restaurants, and in-game rewards, exclusive to the island.",
    body: `In late 2022, Burger King announced a collaboration with Call of Duty: Modern Warfare II. The game was one of the most anticipated releases in the industry, and the partnership raised expectations on both sides.

Based on the fact that Call of Duty was promoted primarily as a night battle game, Burger King created an immersive offline experience available only in Puerto Rico. Selected restaurant locations were remodeled to look like scenes from the game. An AR filter let customers use their phones to navigate the space through night-vision goggles, finding hidden clues to win rewards — discounts, limited-edition combos, rewards on the BK® App, and exclusive in-game skins.

For one month, the campaign connected the virtual game with real-world restaurant experiences, generating thousands of visits and millions of interactions.`,
    awards: [
      "SME Digital Awards 2023 — Silver: Gamification",
      "FIAP Awards 2023 — Bronze: Innovation",
      "Effie Awards Latin America 2023 — Finalist",
    ],
  },
  {
    slug: "eyetracker",
    title: "The EyeTracker",
    client: "SuperMax",
    year: 2022,
    category: "Digital Product",
    youtubeId: "5WQrcKJkTO8",
    summary:
      "A geo-referenced mobile tool that replaces hurricane panic-buying with a personalized supply list — built on storm trajectory data from the National Hurricane Center and the first-ever street view of a hurricane's projected path.",
    body: `Puerto Rico's grocery stores face a predictable crisis before every hurricane: panic buying clears shelves and leaves later shoppers with nothing. SuperMax, in partnership with de la Cruz Ogilvy, set out to change that behavior.

The Eye Tracker integrates storm trajectory data from the National Hurricane Center with Google technology to generate a personalized preparation list for each household. It factors in the storm's location, pressure, wind speed, and the household's specific composition to recommend the precise quantity of essential items — eliminating the impulse to overstock.

The platform introduced the first-ever street view experience of a hurricane's projected path, allowing users to visually comprehend the impact area before deciding what to buy. Users could then purchase suggested items directly through the platform for delivery or in-store pickup.

The result was a calmer, more rational approach to storm preparation — and essential supplies that stayed available for the entire community.`,
    awards: [
      "Cannes Lions 2022 — Gold: Mobile (Mobile Technology / mCommerce)",
      "Cannes Lions 2022 — Bronze: Creative Commerce",
      "Cannes Lions 2022 — Bronze: Mobile Website",
      "The One Show 2023 — Bronze Pencil: Personalized Digital",
      "FIAP Awards 2022 — Gold: Technological Innovation",
      "FIAP Awards 2022 — Silver: Mobile Innovation",
      "FIAP Awards 2022 — Silver: Technological Production",
      "El Ojo de Iberoamérica — Gran Ojo Digital & Social",
    ],
  },
  {
    slug: "hit3001",
    title: "Hit3001",
    client: "Departamento de Desarrollo Económico de Puerto Rico",
    year: 2014,
    category: "Campaign",
    youtubeId: "A4sbaI7P_Q4",
    summary:
      "To launch an entrepreneurship initiative, the government of Puerto Rico replaced the governor's traditional New Year's speech with an unreleased film about Roberto Clemente — and filled the commercial breaks with pitches from young Puerto Rican entrepreneurs.",
    body: `The government of Puerto Rico needed to communicate a local entrepreneurship plan in a way that would actually reach people. The solution was to replace the governor's traditional New Year's address with the unreleased film Chasing 3000 — about baseball legend Roberto Clemente — and use the commercial breaks not for advertising, but for business pitches from young Puerto Rican entrepreneurs.

The film aired on Telemundo without commercials. During the broadcast, audiences were presented with the entrepreneurs' ideas. At the end of the film, viewers were invited to vote — via web or SMS — for the idea they believed could become the country's next "hit."

Following the broadcast, the featured entrepreneurs participated in a national media tour. The winning company received official guidance from the Department of Economic Development, serving as a model case study for Puerto Rico's emerging entrepreneurial class.`,
    awards: [
      "Cannes Lions 2014 — Bronze Lion",
      "Clio Awards 2014 — Bronze",
      "FIAP — Silver",
      "El Sol Festival — Silver",
      "SME Digital Awards 2014 & 2016 — Silver: Best Digital Execution of Social Responsibility Campaign",
    ],
  },
  {
    slug: "hagamos-brillar",
    title: "Hagamos Brillar a San Juan",
    client: "Scotch-Brite / 3M",
    year: 2013,
    category: "Community Campaign",
    youtubeId: "GijvcjPvB7M",
    summary:
      "A community cleanup initiative in Viejo San Juan, coinciding with 3M's 50th anniversary in Puerto Rico — mobilizing volunteers to clean and beautify public spaces and foster long-term civic responsibility.",
    body: `The campaign coincided with 3M's 50th anniversary in Puerto Rico and centered on a community cleanup in Viejo San Juan. The effort focused on encouraging civic responsibility by having volunteers — including employees, family, and friends — actively clean and beautify public spaces to foster a better environment for the capital's residents.

Beyond the cleanup event itself, the initiative invited citizens to maintain a long-term commitment to keeping community spaces clean, done in collaboration with local government.`,
  },
]

export default caseStudies
