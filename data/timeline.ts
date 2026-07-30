export interface TimelineEntry {
  yearRange: string
  label: string
  headline: string
  body: string
  highlights?: string[]
}

const timeline: TimelineEntry[] = [
  {
    yearRange: "Pre-2001",
    label: "Origin story",
    headline: "Before the brief, there was a kitchen.",
    body: "I grew up in a family that ran a seafood restaurant and a pharmacy, both small-town businesses where relationships mattered as much as the product. I made my first pastelillos at age five, eventually ran the kitchen solo as a teenager, and learned customer service, discipline, and emotional intelligence before I ever knew those were skills. In parallel: drums in bands (paid concerts), DJ at Alfa Rock radio station, voice-over work for ad agencies, and an obsessive relationship with computers that led to building, repairing, and eventually getting certified in computer repair. All of it at the same time. Still can’t do things one at a time.",
  },
  {
    yearRange: "~2000–2001",
    label: "First creative role",
    headline: "Mangrove Magazine",
    body: "I started as a photographer and became Director of Photography within six months. I also handled the webmastering, sold ad space, and helped distribute the magazine, regularly sleeping on the office floor. I left after about a year: they never paid me, and they kept blocking my band gigs. Non-negotiable.",
  },
  {
    yearRange: "December 2001",
    label: "Entry into advertising",
    headline: "First ad agency · 6 months",
    body: "I walked in because they were looking for a messenger. I walked out with a job as a graphic artist: $7.50/hour, 28 hours a week. Minimum wage was $5.15 at the time; my father, a licensed optician, earned $8.75. I saw heaven. Overnight shifts, color separations, print layouts. And a fast-developing love for branding.",
  },
  {
    yearRange: "~2002–2003",
    label: "First agency experience",
    headline: "Nexus · ~2 years",
    body: "I was called in for a voice-over gig, met the Creative Director, and walked out with a full-time offer, same day, same visit. I was 22. I worked overnight every single day on bank and supermarket accounts, and within a year I was earning what my father earned. These were the last remnants of Puerto Rico’s glamorous advertising era: weekly happy hours, real camaraderie, genuine craft. I loved every minute of it, even the parts that were brutal.",
  },
  {
    yearRange: "~2004–2006",
    label: "Political + pharma advertising",
    headline: "IRC · Art Director",
    body: "Political advertising bit me hard. The pace rewired how I think strategically: you have two hours to respond, counterattack, soften, or go on offense. I worked campaigns for governors, senators, and mayors across Puerto Rico, traveled all of Latin America and the United States, and arrived to some meetings in Mexico in bulletproof vans. The pharma side taught discipline and precision. Both together taught me to think like a consumer before I think like a creative.",
  },
  {
    yearRange: "~2006–2007",
    label: "Traditional art direction",
    headline: "JMD · Art Director",
    body: "Traditional work. No good chemistry. Left.",
  },
  {
    yearRange: "2009",
    label: "Freelance + social initiative",
    headline: "Sin Empleo Pero Con Ideas",
    body: "When Puerto Rico’s government laid off more than 17,000 public employees, I went freelance and launched Sin Empleo Pero Con Ideas (“Without a Job But With Ideas”), giving free logo design to every laid-off public employee who wanted to start a business. It got coverage in the island’s principal newspaper and built a small community of contributors. It was one of the first things I did that felt like it mattered beyond the brief.",
  },
  {
    yearRange: "~2010–2014",
    label: "Entrepreneurship",
    headline: "Alternó Digital Agency · Co-founder & Creative Director",
    body: "I co-founded Alternó with two partners as one of Puerto Rico’s first 100% digital agencies. We started as two people and grew to ten in four years. As Creative Director, I built the team, the processes, and the culture, and hired people who went on to do remarkable things: one is now Head of Communications at L’Oréal; another is a successful actress in Madrid. During this chapter I was also diagnosed with ADHD at 29, which explained a lot about how I work and why I’d always needed to be doing seventeen things at once. The agency was eventually acquired.",
  },
  {
    yearRange: "~2014–2015",
    label: "Digital infrastructure",
    headline: "Puerto Rico Tourism · Digital Operations",
    body: "I was brought in to build and scale the digital operation from scratch after another agency won the Puerto Rico Tourism account. We rebuilt the Tourism website with live UGC content pulled from Instagram, Twitter, and Facebook (genuinely the wild west of social media at the time), the first TripAdvisor real-time review integration on the island (TripAdvisor later adopted this as a standard product offering after we asked for it), and the first booking engine ever deployed for Puerto Rico Tourism. One of my proudest professional achievements.",
  },
  {
    yearRange: "~2015–2016",
    label: "Business leadership",
    headline: "Infobanima · ~1 year",
    body: "I made a deliberate pivot to learn the business side. I’d spent too long on the creative and production side and wanted to understand how organizations actually run. The company had 3,500 clients and 300 employees; I managed 40 people and a $2M budget, and presented quarterly to the board. I learned what I needed to learn. After a year I went back to what I love.",
  },
  {
    yearRange: "~2017–present",
    label: "Current chapter",
    headline: "de la Cruz · Ogilvy",
    body: "I joined wanting exposure to a global creative network and stayed because it’s the best possible combination of hustle-culture independence and international structure. My longest tenure anywhere: six-plus years and counting.\n\nThe work here has been the most meaningful of my career. Car Parts for Life, a campaign that spent a year grinding through the global Ogilvy network, got its first real signal a week after launch when someone called to say: “Thanks to you guys, I got a kidney.” That’s the only metric that ever mattered to me.\n\nI’ve also led the island-wide digital mapping project for Puerto Rico Tourism (partnered with Google), built political and government digital strategy for campaigns including the governor’s office, and taken on leadership of the agency’s AI Council: evaluating tools, designing ethical implementation processes, and building internal education programs for a discipline that didn’t exist when I started.\n\nMy current role spans digital strategy, creative direction, production, and AI, all in one seat. Probably the only role that could keep my attention this long.",
    highlights: [
      "Cannes Lions 2022, Gold: The EyeTracker",
      "Cannes Lions 2023, Contender: Reusables",
      "El Ojo de Iberoamérica, Gran Ojo Digital & Social",
      "LUUM Awards 2024, Campaign of the Year: Car Parts for Life",
      "LUUM Awards 2024, Grand Prix (×2): Car Parts for Life",
      "El Ojo de Iberoamérica 2024, Silver (×3): Car Parts for Life",
      "SME Digital Awards 2024, Gold (×4): Pasaporte a la Aventura",
      "The One Show 2023, Bronze Pencil",
      "Effie Awards Latin America, Multiple Finalists",
    ],
  },
]

export const timelineIntro = {
  sectionLabel: "Career",
  heading: "Twenty years of following the dopamine.",
  body: "From a family restaurant in Puerto Rico to a Cannes Gold Lion, the through-line has always been curiosity: obsess, master, move when there’s nothing left to learn.",
  quote:
    "I’m a very curious person who’s always looking for stimulation through work. Luckily, the industry we work in allows for that.",
}

export default timeline
