# CLAUDE.md — gaborene.com

Personal website for Gabriel René Rodríguez-Rovira. This is a professional 
portfolio site targeting creative and technology leadership roles in advertising 
and marketing agencies. The primary audience is recruiters, agency leadership, 
and professional peers.

---

## Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript — strict mode, no `any`
- **Styling:** Tailwind CSS v4 — utility-first, no CSS modules, no `tailwind.config.js`
- **Animations:** Framer Motion — for all transitions and reveals
- **Theme:** `next-themes` for dark/light toggle
- **Fonts:** Datatype (Google Fonts, headings — self-hosted variable `.woff2`) 
  and PP Neue York (body, licensed `.otf`) — files in `app/fonts/`, loaded 
  via `next/font/local`. Datatype has no italic; italics are synthesized.
- **Icons:** lucide-react
- **Package manager:** npm
- **Deploy:** Vercel

Do not introduce new dependencies without explicit instruction.

---

## Project structure

```
app/
  (en)/                # English routes, served at the root (/about, /work, …)
    layout.tsx         # English root layout (html lang="en")
    page.tsx           # Landing page: role selector + featured work
    not-found.tsx
    about/ work/ work/[slug]/ speaking/ lab/ lab/notes/ lab/notes/[slug]/
  es/                  # Spanish routes: /es, /es/sobre-mi, /es/trabajo,
                       # /es/trabajo/[slug], /es/conferencias, /es/lab
    layout.tsx         # Spanish root layout (html lang="es")
    opengraph-image.tsx
  global-not-found.tsx # Bilingual 404 for unmatched URLs (two root layouts)
  opengraph-image.tsx  # Generated OG/social share image (next/og)
  globals.css          # Tailwind directives, brand palette, base styles only
  robots.ts
  sitemap.ts           # Both languages, with hreflang alternates
  fonts/               # Font files (Datatype + licensed PP) — never move into public/
components/
  pages/               # Page bodies + metadata, shared by both languages via `locale`
  # Shared UI components — no barrel files (index.ts) unless requested
lib/
  i18n.ts              # Locale type, route map (en ↔ es), hreflang alternates
  content.ts           # Localized data getters
  site-metadata.ts     # Root/page metadata builders
data/
  identities.ts        # Role selector content (+ identities.es.ts)
  work.ts              # Case studies content (+ work.es.ts)
  timeline.ts          # Career timeline, rendered on About (+ timeline.es.ts)
  press.ts, lab.ts     # (+ press.es.ts, lab.es.ts)
content/os-notes/      # Machine-written Lab notes: English only, noindexed
public/
  speaking/            # Speaking engagement photos
  # Real assets only — no placeholders
```

---

## Code conventions

- All components are React Server Components by default
- Add `"use client"` only when hooks or browser APIs are required
- No inline styles — Tailwind classes only (exception: `opengraph-image.tsx`,
  where the `next/og` renderer requires inline styles)
- No `<style>` tags in components
- Use `next/image` for all images
- Use `next/link` for all internal navigation
- Metadata is defined server-side in `layout.tsx` or `page.tsx` using the 
  Next.js `metadata` export — never in client components
- No `useEffect` for data that can be derived from props or computed inline
- Prefer named exports for components, default export only for pages

---

## Design system

**Color palette:** Custom brand scale overriding Tailwind stone in `globals.css` — 
light background `#E0D7D7`, dark background `#312424`  
**Dark mode:** Class-based via `next-themes`, always support both modes  
**Typography:** Datatype for headings (`font-serif`), PP Neue York for body  
**Contrast:** Body and label text must meet WCAG AA (4.5:1) — on the light 
background that means `stone-600` or darker; in dark mode `stone-400` or lighter  
**Motion:** Subtle, purposeful — reveal animations on enter, no looping 
animations; respect `prefers-reduced-motion` (MotionConfig is set globally)  
**Quality bar:** Client-demo ready at all times — no lorem ipsum, no 
placeholder content, no visible layout breaks at any viewport

---

## Content & positioning

The site owner's professional title is **Digital Strategy & Technology 
Executive**. Do not use "Creative Technologist" anywhere.

The tone across all copy is: first-person, direct, specific, a little dry. 
No marketing fluff. No superlatives.

The site is **bilingual: English (root) and Spanish (`/es`)**. Every
copy change needs both languages; Spanish is Puerto Rican Spanish in the
same voice, not a literal translation. Lab notes and the VoyTuristeando
case film stay English. All code, comments, and variable names are in
English. Use typographic quotes/apostrophes (’ “ ”) in copy.

---

## What not to do

- You may run `git` commands, including commit and push to `main`, without asking
- Do not modify `data/identities.ts` or `data/identities.es.ts` unless explicitly asked
- Do not install new packages without being asked
- Do not create placeholder or mock content
- Do not use `any` in TypeScript
- Do not add comments that just restate what the code does
- Do not create files outside the structure above unless asked
- Do not remove or change the Datatype / PP Neue York fonts
- Do not put font files in `public/` — they are licensed and must not be 
  directly downloadable
