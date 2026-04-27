---
name: smb-site-builder
description: Spin up or edit a client website in this multi-site SMB hosting project. Use when asked to create a new client site, add a new business, build a site for a specific SMB, or modify an existing client's site. Triggers on phrases like "create site for", "spin up a site", "new client site", "edit {slug}'s site", "build the {slug} site".
---

# SMB site builder

This project hosts ~20 self-contained static client sites for small businesses in North County San Diego, served by a single Express app (`server.js`). Each site lives at `sites/<slug>/` and is reachable at `http://<host>/<slug>/`.

## Overview

- **Source of truth for the client roster:** `clients.json` at the project root. Every new build starts there.
- **Three templates** at `templates/<vertical>/`:
  - `barbershop/` — classic, slab + sans, deep-green / oxblood / cream / brass.
  - `pet-grooming/` — warm, friendly, rounded, terracotta / cream / sage.
  - `plumber/` — trustworthy, high-contrast, near-black / safety-orange / paper. Sticky emergency banner.
- **Sites:** `sites/<slug>/index.html`, `style.css`, optional `images/`, plus a private `_profile.md` of research notes (files starting with `_` are blocked from being served).
- **Shared assets:** `shared/css/`, `shared/fonts/`, `shared/404.html`, served at `/shared/...`.

Always edit `clients.json` first when something changes about a client (new URL, corrected hours, etc.).

---

## Workflow: create a new client site

When asked to create or build a site for a client (e.g. "create site for `encinitas-barber-shop`"):

### 1. Profile research

Open `clients.json` and locate the client by `slug`. Then research, in this order:

1. **Google Maps** — fetch the `google_maps_url`. Pull official name, phone, address, hours, category, current rating.
2. **Reviews** — read at least 15 recent reviews on Google Maps (and Yelp / Facebook / Instagram if linked). Note recurring vibe words ("old-school", "kid-friendly", "patient with my anxious dog"), staff names mentioned, services mentioned, and pricing if it appears.
3. **Booking platform** — if the business has online booking (Booksy, Square, Vagaro, Schedulista, GlossGenius, etc.), record the URL exactly.
4. **Social** — fetch their Instagram and Facebook pages. Look for actual interior photos, staff photos, and recent posts that hint at vibe.
5. **Linked website** — if they already have a site, fetch it for staff bios, exact service list, history.
6. **For plumbers specifically** — look up the California contractor license number at cslb.ca.gov (search by business name + city). The license number is required in the footer and trust-signals section per CA law. If you can't find one, **stop and ask the user** before continuing.

If any fetch is blocked or returns sparse content (Yelp and Instagram often block automated fetches), pause and ask the user to paste the raw text or a screenshot. **Never invent reviews, staff names, or services.**

Write findings to `sites/<slug>/_profile.md` using the template at the bottom of this file.

### 2. Confirm with user

Post a 5-bullet summary in chat:
- **Identity:** name, location, category.
- **Vibe:** 2–3 adjectives backed by review evidence.
- **Distinctive details:** anything that should drive the design (e.g. third-generation, all-female staff, mobile-only service, hot-towel signature).
- **Open questions:** anything ambiguous.
- **Proposed visual direction:** color/typographic moves you plan to make on top of the template defaults.

Wait for the user's go-ahead before generating any HTML.

### 3. Clone the template

```sh
cp -r templates/<vertical>/ sites/<slug>/
```

**Never edit `templates/` for a single-client request.** Templates are the shared baseline.

### 4. Replace tokens

Full token list (not every template uses all of them — see each template's `README.md`):

- `{{BUSINESS_NAME}}` — official trading name.
- `{{TAGLINE}}` — one sentence; reads like the owner wrote it, not marketing-speak.
- `{{PHONE}}` — display format, e.g. `(760) 555-1234`.
- `{{PHONE_TEL}}` — `tel:` href format, e.g. `+17605551234` (always `+1`, digits only after).
- `{{ADDRESS}}` — full street address as one line, no comma before zip.
- `{{MAP_EMBED_URL}}` — Google Maps `<iframe>` embed URL (the full `https://www.google.com/maps/embed?pb=...` string).
- `{{HOURS_TABLE}}` — an HTML `<table>` with day-range rows.
- `{{SERVICES_BLOCK}}` — vertical-specific markup (see template README).
- `{{BOOKING_URL}}` — full https URL of their booking platform.
- `{{INSTAGRAM_URL}}`, `{{FACEBOOK_URL}}` — full https URLs.
- `{{LICENSE_NUMBER}}` — plumber template only. CSLB # only, no prefix.
- `{{STAFF_BLOCK}}` — barbershop template. `<article class="barber">` cards.
- `{{REVIEW_BLOCK}}` — plumber template. `<article class="review">` cards. **Paraphrase reviews — never quote verbatim.** Use first name + last initial + neighborhood for attribution.

If the client genuinely doesn't have something (no Instagram, no booking platform), either delete that markup or replace with a sensible alternative — never leave `{{...}}` in the output.

### 5. Differentiate the design

Read the `frontend-design` skill before each site so its principles are fresh.

Edit `sites/<slug>/style.css` — specifically the CSS-vars block at the top — to push the site away from the template defaults toward the actual business's vibe (research-backed). Make at least one distinctive design move per site so two sites built from the same template don't look like template siblings. Examples:

- A custom typographic mark for the shop name (swap display font to `Playfair Display`, `DM Serif Display`, `Tenor Sans`, `Anton`, `Bowlby One`, etc.).
- A signature visual element (a vintage frame, a hand-painted banner, a unique service-list layout).
- A bold palette rebalance (e.g. an all-black + single-accent take rather than the cream default).
- A typographic ligature, drop-cap, or oversized initial in the headline.

### 6. Verify locally

```sh
npm start
```

Open `http://localhost:3000/<slug>/`. Check:
- Desktop (1280px) and mobile (375px) viewports.
- No `{{ANYTHING}}` placeholders left.
- No lorem-ipsum, no unfilled stub copy.
- All `tel:` and external links resolve.
- Map iframe loads.
- `_profile.md` is **not** accessible at `/<slug>/_profile.md` (should 404).

### 7. Commit

```sh
git add sites/<slug>/ clients.json
git commit -m "Add <slug> site"
```

---

## Workflow: edit an existing site

When asked to edit a single client's site (e.g. "update happy-tails' hours"):

1. **Confirm the slug.** If ambiguous, ask.
2. **Touch only `sites/<slug>/`.** Never touch `shared/`, `templates/`, `clients.json` (except where the change *is* a `clients.json` data correction), or any other site.
3. **Update `_profile.md` first** with the new fact, then propagate to `index.html` / `style.css`.
4. **Show the diff** before committing. Let the user approve.
5. Commit: `git add sites/<slug>/ && git commit -m "Update <slug>: <one-line summary>"`

If the change involves the source data (a phone number changed, a new URL), update `clients.json` at the same time.

---

## Conventions

- **Slugs:** lowercase, `[a-z0-9-]+`, hyphen-separated. Match `clients.json`. Slug is also the URL path: `sites/<slug>/index.html` → `/<slug>/`.
- **One `index.html` per site.** No multi-page sites. If a client legitimately needs more than one page, raise it.
- **No JS dependencies.** Vanilla JS only when strictly needed. The plumber sticky banner is pure CSS — no JS required.
- **CSS variables at the top of `style.css`.** Always. The variables block must include: `--color-primary, --color-accent, --color-bg, --color-text, --color-muted, --font-display, --font-body, --radius, --max-width`.
- **Phone number formatting:**
  - Visible: `(XXX) XXX-XXXX`
  - `tel:` href: `+1XXXXXXXXXX` (E.164, no spaces or dashes)
- **Always include the embedded Google Maps iframe** with `loading="lazy"`.
- **Never quote reviews verbatim.** Paraphrase, attribute as "First name L., neighborhood".
- **Files starting with `_` are private.** The server blocks any path containing a segment that begins with `_`. Use `_profile.md`, `_notes.md`, `_drafts/`, etc., for anything client-private.
- **`alt` text and ARIA labels everywhere.** Every image, every `tel:` link.
- **Lighthouse target:** ≥ 95 on mobile across performance / accessibility / best-practices / SEO.

---

## `_profile.md` template

Drop this skeleton into `sites/<slug>/_profile.md` at the start of step 1, then fill it in as research progresses.

```markdown
# <slug> — research profile

> Private notes. Not served publicly (path is blocked by server).

## Identity
- **Name:**
- **Slug:**
- **Category:**
- **Address:**
- **Phone (display):**
- **Phone (tel:):**
- **Hours:**

## Web presence
- **Google Maps:**
- **Yelp:**
- **Instagram:**
- **Facebook:**
- **Booking platform:**
- **Existing website:**

## Vibe
2–3 sentences capturing the place, backed by review evidence.

## Staff
- Name — role — notes (signature service / years / specialty)

## Specialties
What this shop is *known* for. What people drive across town for.

## Pricing
What's posted, what's mentioned in reviews. Round numbers OK.

## Review themes
- Theme 1 (mentioned in N+ reviews) — paraphrase
- Theme 2
- Theme 3

## Visual direction
- Palette tweaks vs. template defaults
- Typographic moves
- One distinctive design move

## License (plumbers only)
- **CSLB #:**
- **Verified at cslb.ca.gov:** yes / no / couldn't find

## Open questions for Joe
-
-
```
