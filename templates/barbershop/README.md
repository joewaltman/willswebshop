# Barbershop template

Classic, slab-serif display + clean sans body. Default palette: deep forest green / oxblood / cream / brass.
Designed for traditional, established shops — heavy horizontal rules between sections, vintage badge in the hero, asymmetric service-list dotted-leaders.

## Tokens

| Token | Where it appears | Example |
|---|---|---|
| `{{BUSINESS_NAME}}` | masthead, hero, footer, `<title>` | "Encinitas Barber Shop" |
| `{{TAGLINE}}` | masthead sub-line, hero lead, meta description | "A traditional shop since 1962." |
| `{{PHONE}}` | hero CTA, footer (display format) | "(760) 555-1234" |
| `{{PHONE_TEL}}` | `tel:` href values | "+17605551234" |
| `{{ADDRESS}}` | visit section, footer | "123 Main St, Encinitas, CA 92024" |
| `{{MAP_EMBED_URL}}` | Google Maps `<iframe src>` | `https://www.google.com/maps/embed?pb=...` |
| `{{HOURS_TABLE}}` | inside `.hours` div — paste an HTML `<table>` | see below |
| `{{SERVICES_BLOCK}}` | inside `.services__table` — rows of services | see below |
| `{{STAFF_BLOCK}}` | inside `.barbers__grid` — `<article class="barber">` cards | see below |
| `{{BOOKING_URL}}` | masthead "Book a chair" + hero "Book online" | external booking platform URL |
| `{{INSTAGRAM_URL}}` | visit section social links | full https URL |
| `{{FACEBOOK_URL}}` | visit section social links | full https URL |

This template does NOT use `{{LICENSE_NUMBER}}` or `{{REVIEW_BLOCK}}` (no review section by default).

## Block snippets

**`{{HOURS_TABLE}}`:**
```html
<table>
  <tr><th>Mon</th><td>9:00am – 7:00pm</td></tr>
  <tr><th>Tue – Fri</th><td>9:00am – 7:00pm</td></tr>
  <tr><th>Sat</th><td>8:00am – 5:00pm</td></tr>
  <tr><th>Sun</th><td>Closed</td></tr>
</table>
```

**`{{SERVICES_BLOCK}}`:**
```html
<div class="row">
  <span class="row__name">Haircut</span>
  <span class="row__dots"></span>
  <span class="row__price">$35</span>
</div>
<div class="row">
  <span class="row__name">Hot lather shave</span>
  <span class="row__dots"></span>
  <span class="row__price">$45</span>
  <p class="row__desc">Steamed towels, straight razor, post-shave balm.</p>
</div>
```

**`{{STAFF_BLOCK}}`:**
```html
<article class="barber">
  <img src="images/staff-1.jpg" alt="Portrait of barber Ramon" loading="lazy" width="320" height="320">
  <h3>Ramon</h3>
  <p class="barber__role">Owner · Master Barber</p>
  <p>Third-generation barber. Known for classic tapers and beard sculpting.</p>
</article>
```

## Section order (don't reshuffle without reason)
1. Masthead (centered logo + nav)
2. Hero (split — copy left, framed mark right)
3. Services & prices table (dotted leaders)
4. Meet the barbers (3-card grid)
5. Gallery (3-col grid, 6 images)
6. Visit (hours + map)
7. Footer (deep-green band)

## Distinctive moves to lean into per client
- Custom typographic logotype in `.brand__name` (consider tightening letter-spacing or swapping in `Playfair Display`/`DM Serif Display` for a different feel).
- Brass-accent rule beneath section subheads.
- Asymmetric "framed mark" hero panel — replace the `★` with a custom mark / shop number / shop crest.
- Heavy horizontal rules between sections (don't soften these).

## Images expected
Put real client photos at `images/`:
- `og.jpg` (1200×630, social card)
- `staff-1.jpg`, `staff-2.jpg`, `staff-3.jpg` (square portraits, 320+ px)
- `shop-1.jpg` … `shop-6.jpg` (4:3 landscape, 800+ px)
