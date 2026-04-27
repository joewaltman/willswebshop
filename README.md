# Will's Web Shop

Multi-site static SMB hosting on a single Express server. ~20 self-contained client sites for North County San Diego small businesses, each served at its own URL slug from one Node process.

## Local dev

```sh
npm install
npm start
```

Open <http://localhost:3000/>. The index page lists every folder in `sites/` as a link. Each site is reachable at `/<slug>/`.

## Project layout

```
WillsWebShop/
├── server.js                          Express app — slug routing, static serving
├── package.json
├── clients.json                       Source of truth for the client roster
├── README.md
├── .gitignore
├── shared/
│   ├── 404.html                       Global 404 page
│   ├── css/                           Shared CSS (currently empty — drop in shared/util.css etc.)
│   └── fonts/                         Self-hosted fonts (currently empty)
├── templates/                         Don't edit per-client. Clone from these.
│   ├── barbershop/
│   ├── pet-grooming/
│   └── plumber/
├── sites/                             One folder per client. Slug = URL.
│   ├── encinitas-barber-shop/
│   │   ├── index.html
│   │   ├── style.css
│   │   ├── _profile.md                Private (not served)
│   │   └── images/
│   └── ... (19 more)
└── .claude/skills/smb-site-builder/
    └── SKILL.md                       Workflow for spinning up new client sites
```

## Add a new client site

1. Edit `clients.json` first. Add an entry with `slug`, `template`, `google_business_name`, `google_maps_url`, `neighborhood`, and any notes.
2. Invoke the `smb-site-builder` skill in chat, e.g. "create site for `<slug>`". Or follow the manual steps in `.claude/skills/smb-site-builder/SKILL.md`.
3. The skill will research the business, write `sites/<slug>/_profile.md`, summarize findings, then build the site after confirmation.

The skill is designed to **never invent** reviews, staff names, prices, or licenses. If a fetch is blocked or sparse, it pauses and asks for raw text or a screenshot.

## Edit an existing site

Touch only `sites/<slug>/`. Never touch `templates/` or `shared/` for a single-client request — those are shared infrastructure. Update `_profile.md` first with the new fact, then propagate to `index.html` / `style.css`. See the `Workflow: edit existing site` section in `SKILL.md` for the full protocol.

## URL conventions

- `sites/<slug>/index.html` → `/<slug>/`
- `sites/<slug>/style.css` → `/<slug>/style.css`
- `sites/<slug>/images/photo.jpg` → `/<slug>/images/photo.jpg`
- Slugs must match `^[a-z0-9-]+$`.

## Private files

Files or directories whose name starts with `_` are blocked from the static handler. Anything with a path segment starting with `_` (e.g. `_profile.md`, `_drafts/notes.md`) returns 404. Use this for research notes, drafts, anything not for public consumption.

`server.js` also denies dotfiles (anything starting with `.`).

## Slug cache

The server caches the list of valid slugs at boot for routing. If you add a new folder under `sites/` while the server is running, either:

- restart the server, or
- send `SIGHUP` to the running process: `kill -HUP <pid>`, or
- wait up to 5 minutes (the cache auto-refreshes on a timer).

## Robots / SEO

- The internal index page at `/` is `<meta name="robots" content="noindex">` so it doesn't get crawled.
- Per-site robots are up to each site's own `robots.txt` if needed — the server doesn't enforce a global rule.
- Each rendered client site should keep its own meta tags (title, description, OG) accurate.

## Railway deploy

This project is built to be one-click deployable to Railway:

1. Push the repo to GitHub.
2. In Railway, **New Project → Deploy from GitHub repo** and select this repo.
3. Railway's Nixpacks builder auto-detects Node from `package.json` (`engines.node >= 18`).
4. Railway runs the `start` script (`node server.js`).
5. `PORT` is injected automatically — `server.js` reads `process.env.PORT || 3000`.
6. Set a custom domain in **Settings → Domains**, or use the provided `*.up.railway.app` subdomain.

No `Dockerfile` or `railway.json` is required.

> Joe handles all production deploys. Don't push to Railway from a Claude session.

## Site status

| Slug | Template | Status |
|---|---|---|
| `encinitas-barber-shop` | barbershop | **Built** — verified Coast Hwy 101 location, working pending photos & social links |
| `le-plumbing-encinitas` | plumber | **Draft** — public sources couldn't verify the business; placeholder copy with a draft banner. See `_profile.md` for blocking questions. |
| (18 others) | various | Folder + `.gitkeep` only, awaiting research |

## Useful one-liners

```sh
# All sites in clients.json
node -e "console.log(require('./clients.json').clients.map(c => c.slug).join('\n'))"

# Test the server is up after deploy
curl -s -o /dev/null -w "%{http_code}\n" https://your-railway-url.up.railway.app/

# Force the slug cache to refresh
kill -HUP $(pgrep -f "node server.js")
```
