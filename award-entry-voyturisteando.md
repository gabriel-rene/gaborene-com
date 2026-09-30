# VoyTuristeando.com — award entry

Entry text in the usual award-form fields, ready to paste. Figures match the case film (`data/voyturisteando-film.ts`).

**Title:** VoyTuristeando.com: Building the map before the game
**Client:** Puerto Rico Tourism Company (Compañía de Turismo de Puerto Rico)
**Duration:** 10 months: 4 to build and launch the directory, then 6 to build and launch Pasaporte a la Aventura
**Suggested categories:** Digital Platform / Website · UX & Interface Design · Data-Driven Solution · Tech Solution Development
**Case film:** 1:58, 1920×1080 (`voyturisteando-case-film.mp4`) · online at gaborene.com/work/voyturisteando

---

## Short synopsis (50 words)

Puerto Rico’s tourism site for residents was a WordPress blog doing a directory’s job. In four months we researched how people really plan trips, migrated 861 unstructured entries into one data model, and launched a pueblo-first directory. Its data on what residents want then shaped the content of Pasaporte a la Aventura, launched six months later.

## Challenge (100 words)

VoyTuristeando.com was the Puerto Rico Tourism Company’s domestic tourism site. It held 637 places, 190 events, 17 offers and 17 posts in one WordPress install, filed under 84 municipality tags for 78 municipalities and 48 overlapping filters. A search for beaches in Cabo Rojo returned nothing. It took 8.4 seconds to load on a phone. The homepage still had lorem ipsum on it. The Tourism Company wanted residents to explore all 78 pueblos, but its own site couldn’t tell anyone what was in them, and it couldn’t tell the Tourism Company anything about what residents wanted.

## Insight (60 words)

We sat with 42 residents in 14 pueblos. People don’t plan by category; they plan by town. Weekend trips get decided on a phone, the night before. And people trust someone from the place more than any listing. The site was organized like a brochure. It needed to be organized like the island.

## Idea / Strategy (70 words)

Build the map before the game. First, give every place on the island a pueblo, a region, a category and a pin, in one data model. Then design a directory around the way residents actually plan: pueblo first, category second, on a phone. Then treat every search and every onboarding answer as a signal, hand that signal back to the Tourism Company, and use it to decide what goes into the passport.

## Execution (150 words)

- **Research (months 1–2):** interviews, ride-alongs and a diary study with 42 residents in 14 pueblos. Affinity synthesis produced three findings; a tree test of the new structure raised task success for “find a beach in Cabo Rojo” from 38% to 91%.
- **Migration (months 2–3):** moved off WordPress/Divi to a headless Strapi v4 CMS with a Next.js front end, AWS S3 media and Cloudflare at the edge, bilingual (ES/EN) from the data model up. 48 filter tags became 6 categories and 39 sub-categories; 84 municipality tags became 78. One scripted import put 426 clean, geocoded places on the map in a single night.
- **Directory (months 3–4):** pueblo-first navigation on an interactive map of all 78 pueblos, category filters, a three-question onboarding quiz for recommendations, and one responsive design system. Launched at 1.4 s on a phone.
- **Data (months 5–10):** a Power BI dashboard fed by searches, quiz answers, saved favorites and listing views, showing what residents search for, their interests by pueblo and region, and when they plan. It became the content engine for the passport: which places to add, which pueblos to push, which categories to lead with.

## Results (80 words)

- Organic search traffic: +212% vs. month one
- Mobile load: 8.4 s → 1.4 s; Lighthouse performance 97
- Average session: 3.6 minutes
- All 78 pueblos with traffic every month
- Directory: 426 places at launch → 1,000+ by month nine
- 184,000 sessions a month and 212,000 searches logged, each tagged with a pueblo
- The dashboard confirmed the research: searches peak Thursday at 9 p.m., the night before the weekend.

In month ten, six months after the directory launched, it became the backbone of Pasaporte a la Aventura: 700+ check-in destinations across all 78 pueblos.

## Why it matters (40 words)

For the first time, the Tourism Company could see what residents look for on their own island, and use it to plan. The map was built. Next, it became a game, and the game showed how people move.

---

## Before you submit

- **Agency credit.** Public records credit the SME Digital Awards 2024 golds for Pasaporte a la Aventura to “Compañía de Turismo de Puerto Rico | KIS”, and VML ran the earlier “Una Isla, 78 Destinos” campaign. Make sure the credits on this entry match what the Tourism Company and the partner agencies agree to.
- **Figures.** Research, launch performance, traffic, dashboard and results figures in the film are estimates you chose to present as fact. Juries can ask for proof. Replace them with your project records where you have them; every figure lives in `data/voyturisteando-film.ts`.
- **Verified from public archives:** 637 / 190 / 17 / 17 legacy entries, 48 filter tags, 84 municipality tags, the lorem ipsum and © 2020 footer, the Strapi / Next.js / S3 / Cloudflare stack, 6 categories and 39 sub-categories, the 426-record one-night import, and 700+ passport destinations by the end of 2023.
