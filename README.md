# Ikon Technologies marketing site

Next.js App Router rebuild of [ikontechnologies.com](https://www.ikontechnologies.com/), using the Agave-inspired visual system in `app/styles-agave.css`.

```bash
npm install
npm run dev
```

Open http://localhost:3010 (port 3010 so it does not collide with other local Next apps).

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local site at http://localhost:3010 |
| `npm run build` | Production build |
| `npm run test:e2e` | Playwright flows (home, demo form, dealer login, mobile nav) |

The previous static homepage is in `archive/index.html`. Media lives in `public/assets/`.
