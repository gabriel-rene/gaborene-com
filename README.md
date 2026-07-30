# gaborene.com

Personal portfolio of Gabriel René Rodríguez-Rovira — Digital Strategy & 
Technology Executive based in Puerto Rico.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, fully static)
- TypeScript (strict)
- Tailwind CSS v4
- Framer Motion
- `next-themes` for dark/light mode
- Deployed on Vercel

## Development

```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # production build
npm run lint
```

## Structure

- `app/` — routes: landing, `/work` (case studies), `/work/[slug]`, `/about`
- `data/` — all site content as typed TypeScript (case studies, identities)
- `components/` — shared UI
- `app/opengraph-image.tsx` — social share image generated at build time
- SEO: `robots.ts`, `sitemap.ts`, JSON-LD structured data per page

All content is real work; there is no CMS — editing `data/*.ts` and 
redeploying is the publishing workflow.
