# Adhikari Group — Next.js + Strapi Project Spec

This file is the single source of truth for this project. Reference it in every
Antigravity prompt instead of re-explaining requirements each time.

**Stack:** Next.js (Pages Router), React, JavaScript, Strapi (running at
http://localhost:1337 during development), plain CSS ported from the existing
site (`styles.css`).

**Principle:** Next.js controls design and layout. Strapi controls editable
content. No business content (company names, news text, job listings) should
ever be hardcoded into a `.js` file — it must come from a Strapi fetch.

---

## Strapi content types — current status

### Already built (do not recreate — extend if needed)
| Type | Fields already in place | Public permission |
|---|---|---|
| `Vacancy` | title, department, description, applyLink | find, findOne |
| `NewsPost` | title, content, summary, coverImage | find, findOne |
| `ContactSubmission` | fullName, email, phone, organization, inquirySubject, message | create only |

**Recommended additions before building the frontend** (add via Content-Type
Builder, same process as before):
- `Vacancy`: add `slug` (UID field, based on title), `location` (short text),
  `employmentType` (short text), `responsibilities` (rich text),
  `requirements` (rich text), `deadline` (date), `isActive` (boolean, default true)
- `NewsPost`: add `slug` (UID, based on title), `category` (short text),
  `publishedAt` field already exists automatically in Strapi — no need to add it manually

### Still to build
| Type | Kind | Fields | Public permission |
|---|---|---|---|
| `About` | Single Type | whoWeAreTitle, whoWeAreContent (rich text), ourStoryTitle, ourStoryContent (rich text) | find |
| `Company` | Collection | name, slug (UID), tagline, category, shortDesc, fullDesc (rich text), logo (media), coverImage (media), website | find, findOne |
| `Brand` | Collection | name, slug (UID), origin, relationship, shortDesc, fullDesc (rich text), logo (media), website | find, findOne |
| `Gallery` | Single Type | images (media, multiple) | find |
| `Policy` | Collection | title, slug (UID), content (rich text) | find, findOne |
| `ChairmanMessage` | Single Type | name, designation, photo (media), shortMessage, fullMessage (rich text) | find |
| `Leader` | Collection | name, position, photo (media), shortBio, fullBio (rich text), displayOrder (number) | find, findOne |
| `SiteSettings` | Single Type | siteName, logo, favicon, phone, email, address, officeHours, facebook, instagram, linkedin, youtube | find |
| `HomepageContent` | Single Type | heroTitle, heroSubtitle, heroImage, aboutTitle, aboutContent, businessesSectionTitle, brandsSectionTitle, chairmanSectionTitle, careersTitle, careersDescription, contactCTA | find |

**Note on Strapi 5 response format:** responses are flattened — `data.fieldName`
directly, no `.attributes` wrapper (that was a Strapi 4 pattern). Confirm this
against your actual running instance before building each page regardless.

---

## Site navigation and routes

```
/                              Home
/about/who-we-are              -> About single type
/about/our-story                -> About single type
/companies                      -> Company collection (grid)
/companies/[slug]                -> Company detail
/brands                         -> Brand collection (grid)
/brands/[slug]                   -> Brand detail
/media/news-events               -> NewsPost collection (list)
/media/news-events/[slug]         -> NewsPost detail
/media/gallery                   -> Gallery single type
/career/vacancies                -> Vacancy collection (list, isActive only)
/career/vacancies/[slug]          -> Vacancy detail
/career/policies                 -> Policy collection (list)
/career/policies/[slug]           -> Policy detail
/contact                         -> Contact form, posts to ContactSubmission
```

One shared `Layout` component (Header with About/Media/Career dropdowns +
Footer) used by every page — never duplicate nav markup per page.

## Homepage sections
Hero -> Who We Are teaser -> Our Businesses (featured companies) -> Our Brands
(featured) -> Chairman's Message -> Group at a Glance (stats) -> Careers/
Contact CTA -> Footer. Pull hero text, section titles, and stats from
`HomepageContent`/`SiteSettings` — do not invent numbers; use placeholders
until real values are added in Strapi.

## Cross-cutting requirements
- Import and reuse the existing `styles.css` colors/fonts/spacing — do not
  replace the visual identity with a generic template.
- `/lib/strapi.js` (or `api.js`) holds all fetch logic — no repeated inline
  fetch calls inside components.
- `/lib/media.js` holds a `getStrapiMediaUrl(image)` helper that handles
  absolute URLs, relative Strapi URLs, and missing images without ever
  rendering a broken `<img>`.
- Every list/collection page shows a friendly empty state ("Companies coming
  soon") instead of crashing when Strapi has no entries yet.
- Every `[slug]` page shows a real 404 if the slug doesn't match any entry.
- SEO: per-page `<title>` and meta description, generated from Strapi content
  on dynamic pages (e.g. "{Company Name} | Adhikari Group").
- `NEXT_PUBLIC_STRAPI_URL=http://localhost:1337` in `.env.local` — never
  hardcode the API URL inline. `.env.local` is never committed to git.
- No custom admin dashboard inside Next.js — Strapi's own admin is the only
  editing interface.

---

## Build order (use as separate Antigravity prompts, not one combined request)

1. Inspect the reference site (`index.html`, `styles.css`, `app.js`, `data.js`)
   and the running Strapi API; confirm real field names and response shape.
2. Scaffold Next.js (Pages Router) with the shared Layout, nav, and footer only
   — no page content yet.
3. Build Companies + Brands (index + detail pages).
4. Build Media (News & Events + Gallery).
5. Build Career (Vacancies + Policies).
6. Build About, Chairman's Message, Leadership, Site Settings wiring.
7. Build the Home page, pulling from HomepageContent + featured items from the
   collections above.
8. Build the Contact form and wire it to ContactSubmission.
9. SEO pass, responsive check, empty/error states, 404 page.
10. Manual test of every route with Strapi empty, partially filled, and fully
    filled; test mobile nav and dropdowns.
11. Deploy: Next.js to Vercel, Strapi to a real host (Render/Railway) with a
    production database, environment variables set on both.
