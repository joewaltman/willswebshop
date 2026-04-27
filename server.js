'use strict';

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const SITES_DIR = path.join(ROOT, 'sites');
const SHARED_DIR = path.join(ROOT, 'shared');

const SLUG_RE = /^[a-z0-9-]+$/;
const REFRESH_INTERVAL_MS = 5 * 60 * 1000; // refresh slug cache every 5 minutes

let slugCache = new Set();

function refreshSlugCache() {
  try {
    if (!fs.existsSync(SITES_DIR)) {
      slugCache = new Set();
      return;
    }
    const entries = fs.readdirSync(SITES_DIR, { withFileTypes: true });
    const next = new Set();
    for (const e of entries) {
      if (!e.isDirectory()) continue;
      if (!SLUG_RE.test(e.name)) continue;
      next.add(e.name);
    }
    slugCache = next;
  } catch (err) {
    console.error('[slug-cache] refresh failed:', err.message);
  }
}

refreshSlugCache();
setInterval(refreshSlugCache, REFRESH_INTERVAL_MS).unref();
process.on('SIGHUP', () => {
  console.log('[slug-cache] SIGHUP received, refreshing');
  refreshSlugCache();
});

// Shared assets (CSS, fonts, etc.)
app.use(
  '/shared',
  express.static(SHARED_DIR, {
    maxAge: '7d',
    etag: true,
    dotfiles: 'deny',
  })
);

// Robots: noindex the index page; per-site robots are up to clients.
// (No global /robots.txt — index page itself is noindex'd via meta.)

// Server-rendered index of all sites
app.get('/', (req, res) => {
  const slugs = [...slugCache].sort();
  const items = slugs
    .map(
      (s) =>
        `<li><a href="/${s}/">${s}</a></li>`
    )
    .join('\n      ');

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex">
  <title>Will's Web Shop — site index</title>
  <style>
    :root { color-scheme: dark; }
    * { box-sizing: border-box; }
    html, body { margin: 0; padding: 0; }
    body {
      background: #0e0f12;
      color: #e6e6e6;
      font: 14px/1.5 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      padding: 32px;
      max-width: 720px;
      margin: 0 auto;
    }
    h1 { font-size: 18px; font-weight: 600; margin: 0 0 4px; letter-spacing: .02em; }
    p.sub { color: #8a8f98; margin: 0 0 24px; font-size: 12px; }
    ul { list-style: none; padding: 0; margin: 0; border-top: 1px solid #1f2128; }
    li { border-bottom: 1px solid #1f2128; }
    li a {
      display: block;
      padding: 10px 4px;
      color: #d6d8df;
      text-decoration: none;
    }
    li a:hover { color: #fff; background: #16181d; }
    .empty { color: #8a8f98; font-style: italic; padding: 12px 4px; }
    footer { margin-top: 32px; color: #5a5f68; font-size: 11px; }
  </style>
</head>
<body>
  <h1>Will's Web Shop</h1>
  <p class="sub">internal site index — ${slugs.length} ${slugs.length === 1 ? 'site' : 'sites'}</p>
  ${
    slugs.length > 0
      ? `<ul>\n      ${items}\n    </ul>`
      : `<div class="empty">No sites yet. Drop a folder into <code>sites/</code>.</div>`
  }
  <footer>noindex · ${new Date().toISOString()}</footer>
</body>
</html>
`;
  res.set('Cache-Control', 'no-store');
  res.type('html').send(html);
});

// Per-site routing: /<slug>/...
app.use('/:slug', (req, res, next) => {
  const slug = req.params.slug;

  if (!SLUG_RE.test(slug)) return next();
  if (!slugCache.has(slug)) return next();

  // Reject paths that contain a segment starting with `_` (private files like _profile.md)
  const rest = req.path; // path after /:slug
  const segments = rest.split('/').filter(Boolean);
  if (segments.some((seg) => seg.startsWith('_'))) {
    return next();
  }

  const siteDir = path.join(SITES_DIR, slug);
  return express.static(siteDir, {
    index: 'index.html',
    dotfiles: 'deny',
    fallthrough: true,
  })(req, res, next);
});

// 404 fallback
app.use((req, res) => {
  res.status(404);
  const fallback = path.join(SHARED_DIR, '404.html');
  if (fs.existsSync(fallback)) {
    res.type('html').sendFile(fallback);
  } else {
    res.type('text/plain').send('404 Not Found');
  }
});

app.listen(PORT, () => {
  console.log(`Will's Web Shop listening on http://localhost:${PORT}`);
  console.log(`[slug-cache] tracking ${slugCache.size} site(s)`);
});
