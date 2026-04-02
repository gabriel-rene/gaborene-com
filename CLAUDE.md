# CLAUDE.md — gaborene.com

Personal website for Gabriel René Rodríguez-Rovira. This is a professional 
portfolio site targeting creative and technology leadership roles in advertising 
and marketing agencies. The primary audience is recruiters, agency leadership, 
and professional peers.

---

## Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript — strict mode, no `any`
- **Styling:** Tailwind CSS v4 — utility-first, no CSS modules, no `tailwind.config.js`
- **Animations:** Framer Motion — for all transitions and reveals
- **Theme:** `next-themes` for dark/light toggle
- **Font:** Instrument Serif (Google Fonts, via `next/font`)
- **Icons:** lucide-react
- **Package manager:** npm
- **Deploy:** Vercel

Do not introduce new dependencies without explicit instruction.

---

## Project structure

```
app/
  layout.tsx        # Root layout, metadata, font, ThemeProvider
  page.tsx          # Landing page
  globals.css       # Tailwind directives + base styles only
  work/
    page.tsx        # Case studies index
    [slug]/
      page.tsx      # Individual case study
  about/
    page.tsx        # Bio page
components/
  # Shared UI components
  # No barrel files (index.ts) unless explicitly requested
data/
  identities.ts     # Role selector content
  work.ts           # Case studies content (to be created)
public/
  # Real assets only — no placeholders
```

---

## Code conventions

- All components are React Server Components by default
- Add `"use client"` only when hooks or browser APIs are required
- No inline styles — Tailwind classes only
- No `<style>` tags in components
- Use `next/image` for all images
- Use `next/link` for all internal navigation
- Metadata is defined server-side in `layout.tsx` or `page.tsx` using the 
  Next.js `metadata` export — never in client components
- No `useEffect` for data that can be derived from props or computed inline
- Prefer named exports for components, default export only for pages

---

## Design system

**Color palette:** Tailwind stone scale  
**Dark mode:** Class-based via `next-themes`, always support both modes  
**Typography:** Instrument Serif throughout — no fallback sans-serif mixing  
**Motion:** Subtle, purposeful — reveal animations on enter, no looping animations  
**Quality bar:** Client-demo ready at all times — no lorem ipsum, no 
placeholder content, no visible layout breaks at any viewport

---

## Content & positioning

The site owner's professional title is **Digital Strategy & Technology 
Director**. Do not use "Creative Technologist" anywhere.

The tone across all copy is: first-person, direct, specific, a little dry. 
No marketing fluff. No superlatives.

The site is in **English**. All code, comments, and variable names are 
in English.

---

## What not to do

- Do not run `git` commands
- Do not modify `data/identities.ts` unless explicitly asked
- Do not install new packages without being asked
- Do not create placeholder or mock content
- Do not use `any` in TypeScript
- Do not add comments that just restate what the code does
- Do not create files outside the structure above unless asked
- Do not remove or change the Instrument Serif font
