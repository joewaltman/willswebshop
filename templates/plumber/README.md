# Plumber template

Trustworthy, no-nonsense, high-contrast. Default palette: near-black + safety-orange + paper.
**The phone number is always the loudest element on the screen.** A pure-CSS sticky banner sits at the top of every viewport and contains the primary `tel:` link. Diagonal stripe + pulsing chevron in the banner.

## Tokens

| Token | Where it appears | Notes |
|---|---|---|
| `{{BUSINESS_NAME}}` | brand, footer, `<title>`, OG | |
| `{{TAGLINE}}` | hero lead, meta description | one short sentence |
| `{{PHONE}}` | sticky banner, hero big-button, area CTA, footer | display format `(760) 555-1234` |
| `{{PHONE_TEL}}` | every `tel:` href | `+17605551234` |
| `{{ADDRESS}}` | area copy, footer | |
| `{{MAP_EMBED_URL}}` | service-area iframe | Google Maps embed URL |
| `{{HOURS_TABLE}}` | inside `.foot__hours` | paste an HTML `<table>` |
| `{{LICENSE_NUMBER}}` | hero list, why-us, footer | CSLB # — required by CA law for plumbing contractors |
| `{{REVIEW_BLOCK}}` | inside `.reviews__grid` | 3–4 `<article class="review">` cards |

This template does NOT use `{{BOOKING_URL}}`, `{{INSTAGRAM_URL}}`, `{{FACEBOOK_URL}}`, `{{STAFF_BLOCK}}`, or `{{SERVICES_BLOCK}}` (services are hard-coded into the template since the categories are standardized in the trade).

## `{{REVIEW_BLOCK}}` snippet

Always **paraphrase** — never quote verbatim.

```html
<article class="review">
  <div class="review__stars" aria-label="5 out of 5">★★★★★</div>
  <p>Burst pipe under the sink at 11pm. Crew was at the door inside the hour, fixed it clean, didn't try to upsell anything. Left the cabinet cleaner than they found it.</p>
  <p class="review__by">— Maria G., Cardiff</p>
</article>
```

## Section order
1. Sticky emergency banner (`<a class="emergency">`) — always visible
2. Topbar (brand + nav + Call now button)
3. Hero (big headline with orange skewed accent block, checklist of benefits, big phone button)
4. Services (6-card grid on near-black band, numbered 01–06)
5. Service area (copy + map)
6. Why us (4 trust-signal cards with orange notch)
7. Reviews (paraphrased, 2-up grid)
8. Footer (giant phone number, address, hours, CSLB#)

## Distinctive moves to lean into
- Sticky banner styling: diagonal hazard-stripe inset, pulsing chevron, oversized phone number on the right.
- Skewed orange accent block in the hero headline.
- Numbered service cards (01–06) on a near-black panel — feels like an industrial service menu.
- Trust-signal cards have an orange notch in the top-right corner — small, tactile, memorable.
- Footer phone number is huge and clickable — the largest type on the page outside the hero headline.

## Images expected
- `og.jpg` (1200×630)

(No gallery, no staff portraits by default — plumbers' sites perform best with copy-first trust signals.)
