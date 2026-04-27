# Le Plumbing Encinitas — research profile

**Status:** DRAFT — could not verify business in public sources. Do not preview to client until questions below are answered.
**Slug:** `le-plumbing-encinitas`
**Template:** `plumber`

---

## Identity

- **Name:** Le Plumbing Encinitas
- **Address:** Encinitas, CA — exact street address NOT confirmed
- **Phone:** placeholder `(000) 000-0000` · `tel:+10000000000`
- **CSLB License #:** placeholder `0000000` (CA Business & Professions Code §7030.5 requires the real number on advertising; do NOT publish until verified at cslb.ca.gov)
- **Hours:** placeholder Mon–Fri 7–6, Sat 8–4, Sun emergency, 24/7 emergency line

## Web presence

- **Website:** none confirmed
- **Booking platform:** none confirmed
- **Instagram / Facebook:** none confirmed

## Vibe (3 adjectives)

Trustworthy · responsive · no-nonsense (template defaults — confirm with Joe whether positioning should shift)

## Staff

Unknown. Did not surface owner name, lead plumber, or crew size in research.

## Specialties / signature services

Template defaults used (residential, commercial, 24-hour emergency, drain/sewer, water heaters, repipe/remodel). Confirm with Joe whether this business actually offers all six categories.

## Pricing

Not advertised. "Up-front flat-rate pricing" copy retained from template.

## Review themes (paraphrased — never quote verbatim)

**Flag from clients.json:** "Reviews look templated." Public Google reviews for this business name returned generic, possibly inauthentic patterns. All review cards on the live page are placeholder text — do NOT attempt to paraphrase the templated reviews until Joe confirms they reflect real customers.

## Visual direction

Plumber template defaults (near-black + safety-orange + paper). Site-specific tweaks on this build:

1. Yellow caution-tape DRAFT banner across the very top of the page.
2. Punchier orange (`#ff6a00`) and deeper near-black (`#0e1014`).
3. Dashed-outlined placeholder review cards on a faintly tinted background.
4. Soft pulse animation on the call buttons (respects `prefers-reduced-motion`).

## 5 blocking questions for Joe

1. **Does this business actually exist?** Public sources didn't surface a verifiable Encinitas plumbing business under this name. Possible the name is slightly off — e.g. "LE Plumbing", "Le Plumbing & Heating", a contractor's first/last name. Confirm before any further work.
2. **Real phone number?** Need the actual number for `tel:` link, sticky banner, hero CTA, footer.
3. **Real CSLB license number?** Required by CA law to publish. Look up at cslb.ca.gov by business name + city before going live.
4. **Are the templated-looking reviews actually from real customers?** If yes, paraphrase 3–4 into the review cards. If no, leave the placeholder cards or remove the reviews section entirely.
5. **Exact street address** for the map iframe and the footer (currently shows generic Encinitas embed).

## Sources

- WebSearch on "Le Plumbing Encinitas" — no clear, verifiable result
- clients.json notes: "Reviews look templated — flag for verification before publishing"
- Plumber-vertical knowledge: CA license requirement is from B&P Code §7030.5 (publishing license # in advertising)

## How to clear DRAFT status

1. Joe answers the 5 questions above.
2. Replace every `(000) 000-0000` and `0000000` with real values across `index.html`, `style.css` is fine as-is.
3. Replace placeholder review cards with paraphrased real reviews (drop the `review--placeholder` class).
4. Update map iframe `src` to the verified street address.
5. Remove the `<div class="draft-banner">` block from `index.html` and the corresponding `.draft-banner` rule from `style.css` (optional — it doesn't render once removed).
6. Remove `<meta name="robots" content="noindex">` from `<head>`.
