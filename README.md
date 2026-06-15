# Ecoshemill — Static HTML/CSS site

This repository now contains a static conversion of the original Ecoshemill React app.

## Quick start

- Serve the site locally using `npx serve .` (recommended):

```bash
npx serve .
```

- Or use Python's simple server:

```bash
python -m http.server 8080
```

## What changed

- `index.html` replaced with a static homepage and header/footer.
- Added `styles.css` (shared stylesheet).
- Added static pages: `services.html`, `products.html`, `impact.html`, `contact.html`, `updates.html`, `admin.html`.
- Simplified `package.json` for static serving.
- Removed Vite/Tailwind/PostCSS config files (`vite.config.js`, `tailwind.config.js`, `postcss.config.js`).

## Notes

- The original React `src/` folder is still present as a backup in the repository; no source files were deleted.
- Forms and admin pages are static UI only and do not submit to a backend.

## Next steps (optional)

- Remove or archive the `src/` directory to make this a pure static site repository.
- Add asset optimization (image compression, critical CSS) for production.
- Deploy to GitHub Pages, Netlify, or any static host.

If you'd like, I can archive the `src/` directory to `src_backup/` for you.
