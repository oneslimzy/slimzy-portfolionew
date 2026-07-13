# Slimzy Concepts — Portfolio Site

Plain HTML/CSS/JS. No build step — just open `index.html` in a browser,
or upload the whole folder to any host (Vercel, Netlify, GitHub Pages).

## Files
- `index.html` — page structure/content
- `styles.css` — all design (colors, fonts, spacing) — edit tokens at the top of the file
- `script.js` — your project data + small interactions (filters, nav, contact form)
- `images/` — put your thumbnails, photos and logos here

## Add a video project
Open `script.js`, find `videoProjects` near the top, and copy/edit one block:

```js
{
  category: "Launch Video",       // used as the filter tag
  title: "Vaultly App Launch",
  desc: "One-line description of the edit.",
  thumb: "images/vaultly-launch.jpg",   // leave "" for a placeholder look
  link: "https://vimeo.com/your-video"  // where the card links to
}
```

## Add a branding project
Same idea, in `brandingProjects`. These now feed the **Frame Wall** — the
moving strip of tiles in the Branding section (mirrors the reference site's
Frame Wall). Add as many as you like; the wall repeats and loops them
automatically:

```js
{
  category: "Fintech",
  title: "Vaultly Brand Identity",
  desc: "Logo, color system and guidelines.",
  thumb: "images/vaultly-brand.jpg",
  mark: "V",                      // fallback letter shown if no thumb yet
  link: "https://behance.net/your-project"
}
```

Save the file, refresh the page — the gallery and filter buttons rebuild
automatically. No other code needs to change.

## Change colors / fonts
Everything lives in the `:root` block at the top of `styles.css`:
- `--accent` — lime, used for the video/motion side
- `--gold` — used for the branding/identity side
- `--font-display` / `--font-body` — swap in any Google Font by updating
  the `<link>` in `index.html` and the font name here

## Contact form
The form has no backend — it opens the visitor's email app pre-filled
with their details, addressed to `slimzyconcept@gmail.com`. If you later
want real form submissions (saved to a database or sent via a service
like Formspree), that's a small script.js change — just ask.

## Social links
Already wired to:
- Email: slimzyconcept@gmail.com
- X: @slimzycpt
- Instagram: @slimzy.cpt

Update these in `index.html` (search for the links) and in the footer if
your handles ever change.
