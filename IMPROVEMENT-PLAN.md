# gaborene.com — Optimization Plan

Goal: make the site maximally hireable for Digital Strategy & Technology
Executive roles (recruiters, agency leadership, speaking bookers).
Audited 2026-07-13 against local code and the live production deploy.

Status legend: [ ] todo · [x] done

---

## P0 — Ship the fix that already exists (deploy gap)

The production site is a stale build (sitemap lastmod 2026-04-03). Everything
below is already fixed in the local working tree but NOT live:

- Live `<title>` still says "Technology Director" (local says Executive)
- `/speaking` returns 404 in production
- No OG/social share image in production (local has `opengraph-image.tsx`)
- Security headers in `next.config.ts` not live (only Vercel's HSTS is served)
- Only 1 JSON-LD block live vs. full Person/WebSite/per-page schema locally

- [ ] Review + commit the working tree (owner runs git per CLAUDE.md)
- [ ] Deploy to Vercel and re-verify: title, /speaking 200, og-image 200,
      headers present, JSON-LD count

## P0 — Domain / canonical mismatch (SEO-critical)

`https://gaborene.com` 308-redirects to `https://www.gaborene.com`, but every
canonical tag, OG url, sitemap entry, robots sitemap line, and schema `@id`
points to the apex. Google is told the canonical is a URL that redirects.

- [ ] In Vercel domain settings, make `gaborene.com` the primary domain and
      redirect `www` → apex (matches all code URLs; no code change needed)
- [ ] After the flip, verify `curl -I https://www.gaborene.com` 308s to apex
- [ ] Submit the domain property in Google Search Console, request reindex

---

## P1 — Hireability (content)

- [x] **Contact everywhere.** Homepage has zero contact info. Add a site
      footer (email, LinkedIn, X) rendered on every page, plus a short CTA
      block on the homepage ("Exploring a leadership role or a speaking
      slot? gabriel@gaborene.com").
- [x] **Role attribution on case studies.** Add a `role` field to
      `CaseStudy` (e.g. "Digital strategy and production lead") and render
      it on `/work/[slug]`. Recruiters currently can't tell what Gabriel
      did on these campaigns — this is the single biggest content gap.
- [x] **Render the career timeline.** `data/timeline.ts` is complete,
      well-written, and used by nothing. Render it on /about (or a
      dedicated section). Before rendering: it says "My current title is
      Creative Technologist," which CLAUDE.md forbids — rewrite that entry
      to Digital Strategy & Technology Executive framing.
- [ ] **Downloadable résumé.** One-page PDF linked from About and footer.
- [x] **Proof-of-work for the builder claim.** Done as /lab page: Margin
      Muse, Conversations, Personal Corpus, World Cup 26, and this site,
      with GitHub links where public.
- [x] **Testimonial / signal quotes.** The Car Parts for Life "Thanks to
      you guys, I got a kidney" story (already in timeline.ts) belongs on
      the case study page. Add 1–2 professional quotes if available.
- [x] **Copy consistency pass.** identities.ts says "helped bootstrap 2
      small digital agencies"; about says "co-founded two"; timeline names
      one (Alternó). Pick one truth. Also fix relative-time drift ("last
      8 years" in identities.ts) — use absolute anchors.

## P1 — SEO

- [x] Per-case-study OG images: use the YouTube thumbnail
      (`https://img.youtube.com/vi/<id>/maxresdefault.jpg`) via the
      `openGraph.images` metadata field on `/work/[slug]`.
- [x] Add `VideoObject` to case-study JSON-LD (name, description,
      thumbnailUrl, embedUrl) — the work is all YouTube-backed.
- [ ] Add a headshot: `image` on the Person schema + a real photo on
      /about (recruiters want a face; speaking photos exist but are wide).
- [x] Sitemap: replace blanket `new Date()` lastModified with real
      per-entry dates (fake freshness can hurt crawl trust).
- [ ] Keep an eye on Search Console after the P0 domain flip; expect
      re-canonicalization to take a few weeks.

## P2 — Security

- [x] Add `Content-Security-Policy` to `next.config.ts`. Workable static
      policy: `default-src 'self'; script-src 'self' 'unsafe-inline';
      style-src 'self' 'unsafe-inline'; img-src 'self' img.youtube.com
      data:; font-src 'self'; frame-src www.youtube-nocookie.com;
      connect-src 'self'; base-uri 'self'; form-action 'self';
      frame-ancestors 'none'` (verify nothing breaks in preview first).
- [ ] Existing headers (nosniff, X-Frame-Options, Referrer-Policy,
      Permissions-Policy) go live with the P0 deploy — verify.
- [ ] Accepted tradeoff (no action): plaintext mailto + email in JSON-LD
      is harvestable; fine for a portfolio that wants to be contacted.
- Attack surface is already minimal: fully static, no forms, no API
  routes, external links use `rel="noopener noreferrer"`, YouTube via
  nocookie domain. Dependencies current (Next 16.2.10).

## P2 — Performance

- [x] Font audit: 10 OTF files (~1.2 MB) are bundled and several are
      preloaded. Check whether Ultralight (200) and BoldItalic are
      actually used; drop unused weights. If the PP license permits,
      convert to WOFF2 (~50–60% smaller). Keep files in `app/fonts/`.
- [x] Downsize `public/speaking/*.jpg` sources (272–592 KB each) to
      ≤1200px wide (~80% quality). Vercel image optimization resizes at
      serve time, but smaller sources cut the largest-size variants.
- [ ] Optional: lite-YouTube facade on case pages (thumbnail + click to
      load iframe) to cut third-party JS. `loading="lazy"` already set —
      low priority.

## P2 — Code cleanness

- [x] Delete dead components: `components/content-glitch.tsx` and
      `components/tile-background.tsx` (imported by nothing).
- [x] Move the inline press array out of `app/about/page.tsx` into
      `data/press.ts`.
- [x] Simplify `FEATURED_SLUGS.flatMap(...filter...)` in `app/page.tsx`
      to a `find`-based lookup.
- [x] Real alt text for `gabo-cud.jpg` ("Speaking engagement") and
      `gabo-turismo.jpg` ("Tourism forum") in `speaking-gallery.tsx`.

---

## Explicitly out of scope (for now)

- Spanish version / hreflang — site is English per CLAUDE.md; revisit only
  if targeting local PR clients directly.
- Blog/writing section — highest-leverage long-term SEO move for the "AI
  educator" positioning, but only worth it with a real publishing cadence.
- Contact form — mailto is fine; a form adds spam surface with no gain.
