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
  layout.tsx           # Root layout, metadata, fonts, ThemeProvider, viewport
  page.tsx             # Landing page: role selector + featured work
  not-found.tsx        # Custom 404
  opengraph-image.tsx  # Generated OG/social share image (next/og)
  globals.css          # Tailwind directives, brand palette, base styles only
  robots.ts
  sitemap.ts
  fonts/               # Font files (Datatype + licensed PP) — never move into public/
  work/
    page.tsx           # Case studies index
    [slug]/
      page.tsx         # Individual case study
  about/
    page.tsx           # Bio + press + contact
  speaking/
    page.tsx           # AI speaking & education: engagements, gallery, inquiries
components/
  # Shared UI components — no barrel files (index.ts) unless requested
data/
  identities.ts        # Role selector content
  work.ts              # Case studies content
  timeline.ts          # Career timeline content (not yet rendered by any page)
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

The site is in **English**. All code, comments, and variable names are 
in English. Use typographic quotes/apostrophes (’ “ ”) in copy.

---

## What not to do

- Do not run `git` commands
- Do not modify `data/identities.ts` unless explicitly asked
- Do not install new packages without being asked
- Do not create placeholder or mock content
- Do not use `any` in TypeScript
- Do not add comments that just restate what the code does
- Do not create files outside the structure above unless asked
- Do not remove or change the Datatype / PP Neue York fonts
- Do not put font files in `public/` — they are licensed and must not be 
  directly downloadable
