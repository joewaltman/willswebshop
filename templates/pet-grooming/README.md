# Pet-grooming template

Warm, friendly. Generous rounded radii, hand-drawn underline accents.
Default palette: terracotta + cream + sage. Display in Fraunces (with optical-size axis), body in Nunito.

## Tokens

| Token | Where it appears | Notes |
|---|---|---|
| `{{BUSINESS_NAME}}` | logo, footer, `<title>`, OG | |
| `{{TAGLINE}}` | hero lead, meta description | one short sentence |
| `{{PHONE}}` | hero CTA, footer | display format `(760) 555-1234` |
| `{{PHONE_TEL}}` | `tel:` href | `+17605551234` |
| `{{ADDRESS}}` | visit, footer | |
| `{{MAP_EMBED_URL}}` | `<iframe src>` | Google Maps embed URL |
| `{{HOURS_TABLE}}` | inside `.hours` | paste an HTML `<table>` |
| `{{SERVICES_BLOCK}}` | inside `.services` | one or more `<section class="tier">` blocks (see below) |
| `{{BOOKING_URL}}` | hero, topbar, policy CTA | external booking platform |
| `{{INSTAGRAM_URL}}` / `{{FACEBOOK_URL}}` | visit social row | |

This template does NOT use `{{LICENSE_NUMBER}}`, `{{STAFF_BLOCK}}`, or `{{REVIEW_BLOCK}}`. Skip them in `clients.json` for grooming clients.

## `{{SERVICES_BLOCK}}` snippet

```html
<section class="tier">
  <header class="tier__head">
    <h3>Bath &amp; brush</h3>
    <p>Bath, blow-dry, brush-out, ear cleaning, nail trim.</p>
  </header>
  <ul class="tier__sizes">
    <li><span class="tier__size">Small</span><span class="tier__price">$45</span><span class="tier__note">under 20 lb</span></li>
    <li><span class="tier__size">Medium</span><span class="tier__price">$60</span><span class="tier__note">20–50 lb</span></li>
    <li><span class="tier__size">Large</span><span class="tier__price">$80</span><span class="tier__note">50–80 lb</span></li>
    <li><span class="tier__size">XL</span><span class="tier__price">$95+</span><span class="tier__note">over 80 lb</span></li>
  </ul>
</section>
```

## Section order
1. Topbar (paw logo + nav + book button)
2. Hero (photo right with rotated stickers, copy left)
3. Services tiers (one card per service, 4-column size grid inside each)
4. Vaccination & intake policy (sage band, 3 cards)
5. Happy clients gallery (3-col, slight tile rotations)
6. Visit (hours + map)
7. Footer

## Distinctive moves to lean into
- The hand-drawn underline accent (`.underline`) — re-tint by changing the stroke color in the inline SVG inside `style.css`.
- Rotated stickers on the hero photo — swap copy ("since 1998", "5★ on Yelp", "voted best of NC", etc.).
- Tile rotation in the gallery — looks like polaroids on a fridge.
- Replace the inline paw SVG in the logo with the client's actual mark when one exists.

## Images expected
- `og.jpg` (1200×630)
- `hero-pet.jpg` — the headline photo (square, 900+ px)
- `pet-1.jpg` … `pet-6.jpg` — gallery (square, 600+ px)
